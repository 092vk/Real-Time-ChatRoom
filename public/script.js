console.log("script is running")

let nickname = document.getElementById('nickname')
let roomName = document.getElementById('room')
let setup = document.getElementById('setup')
let chatArea = document.getElementById('chatArea')
let messageInput = document.getElementById('messageInput')
let chat = document.getElementById('chat')


let socket = io('http://localhost:5757');

document.getElementById('join').onclick = () => {
    console.log("join was clicked")
    const nicknamei = nickname.value;
    const roomNamei = roomName.value;
    if (!nicknamei || !roomNamei) return alert("Please fill both fields");

    socket.emit('joinRoom', { roomNamei, nicknamei });
    document.setup.style.display = 'none';
    document.chatArea.style.display = 'block';
};

socket.on('userJoined', msg => {
    addMessage(`[INFO] ${msg}`);
});

socket.on('userLeft', msg => {
    addMessage(`[INFO] ${msg}`);
});

socket.on('userDisconnected', msg => {
    addMessage(`[INFO] ${msg}`);
});

socket.on('chatHistory', (messages) => {
    messages.forEach(m => addMessage(`${m.sender}: ${m.message}`));
});

document.getElementById('send').onclick = () => {
    const message = messageInput.value;
    if (!message) return;
    socket.emit('sendMessage', message);
    document.messageInput.value = '';
};

document.getElementById('leave').onclick = () => {
    socket.emit('leaveRoom');
    document.chatArea.style.display = 'none';
    document.setup.style.display = 'block';
    document.chat.innerHTML = '';
    document.messageInput.value = '';
};

socket.on('receiveMessage', data => {
    addMessage(`${data.sender}: ${data.message}`);
});

function addMessage(msg) {
    const chat = document.getElementById('chat');
    chat.innerHTML += msg + '<br/>';
    chat.scrollTop = chat.scrollHeight;
}

document.getElementById('disconnect').onclick = () => {
    socket.disconnect();
    alert("Disconnected from server");
    chatArea.style.display = 'none';
    setup.style.display = 'none';
    document.getElementById('rejoin').style.display = 'block';
    document.chat.innerHTML = '';
    messageInput.value = '';
};

document.getElementById('reconnect').onclick = () => {
    socket = io('http://localhost:5757');
    chatArea.style.display = 'none';
    setup.style.display = 'block';
    alert("Reconnected with the server");
    document.getElementById('rejoin').style.display = 'none';
    nickname.value='';
    roomName.value='';
};