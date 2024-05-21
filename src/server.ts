/* eslint-disable no-console */

import app from './app';
import config from './app/config';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';

import { setupSocket } from './app/notification/socket.setup';
import mongoose from 'mongoose';
import notFound from './app/middlewares/notFount';
import swaggerDocs from './app/utils/swagger';

let server: Server;
let io: SocketServer;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    console.log('Connected to database');
    server = app.listen(config.port, () => {
      console.log(`Server running on port`, config.port);
    });
    swaggerDocs(app, Number(config.port));

    app.use(notFound);

    // Set up CORS options
    const corsOptions = {
      origin: config.client_url, // Specify the URL of your React app
      methods: ['GET', 'POST'], // Specify allowed HTTP methods
    };

    // Attach Socket.IO to the server
    io = new SocketServer(server, {
      cors: corsOptions,
    });

    setupSocket(io);
  } catch (error) {
    console.log(error);
    console.log('connection faild');
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`😡 unhandledRejection is detected, shuttin down....`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😡 uncaughtException is detected, shuttin down....`);
  process.exit(1);
});
