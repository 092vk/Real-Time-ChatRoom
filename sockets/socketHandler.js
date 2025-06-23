export default (io, db) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', async ({ roomName, nickname }) => {
      let [user] = await db.User.findOrCreate({ where: { nickname } });
      
      let [room] = await db.Room.findOrCreate({ where: { name: roomName } });

      socket.user = user;
      socket.room = room;
      socket.join(room.id.toString());

      let messages = await db.Message.findAll({
        where: { RoomId: room.id },
        include: db.User,
        order: [['createdAt', 'ASC']]
      });

      socket.emit('chatHistory', messages.map(msg => ({
        sender: msg.User.nickname,
        message: msg.content
      })));

      io.to(room.id.toString()).emit('userJoined', `${nickname} joined the room`);
    });

    socket.on('sendMessage', async (messageContent) => {
      if (!socket.user || !socket.room) return;

      await db.Message.create({
        content: messageContent,
        RoomId: socket.room.id,
        UserId: socket.user.id
      });

      io.to(socket.room.id.toString()).emit('receiveMessage', {
        sender: socket.user.nickname,
        message: messageContent
      });
    });

    socket.on('leaveRoom', () => {
      if (socket.user && socket.room) {
        io.to(socket.room.id.toString()).emit('userLeft', `${socket.user.nickname} left the room`);
        socket.leave(socket.room.id.toString());
      }
    });

    socket.on('disconnect', () => {
        if (socket.user && socket.room) {
            io.to(socket.room.id.toString()).emit('userDisconnected', `${socket.user.nickname} disconnected from the server`);
        }
        console.log(`Socket ${socket.id} disconnected`);
    });

  });
};
