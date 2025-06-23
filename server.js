const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');
const db = require('./models');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

require('./sockets/socketHandler')(io, db);

// Sync database
db.sequelize.sync().then(() => {
  console.log("Database synced");
  server.listen(5757, () => console.log('Server listening on http://localhost:5757'));
});