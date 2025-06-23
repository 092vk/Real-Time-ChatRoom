import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from './models/index.js';
import socketHandler from './sockets/socketHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

// serving the frontend for monolithic architecture
app.use(express.static(join(__dirname, 'public')));

socketHandler(io, db);

db.sequelize.sync().then(() => {
  console.log("Database synced");
  server.listen(5757, () => console.log('Server listening on http://localhost:5757'));
});