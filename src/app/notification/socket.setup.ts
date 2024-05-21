/* eslint-disable no-console */
import { Server as SocketServer } from 'socket.io';
import Outlet from '../modules/Outlet/outlet.model';

type TUser = {
  userId: string;
  socketId: string;
};

let users: TUser[] = [];

export function setupSocket(io: SocketServer) {
  const addUser = (userId: string, socketId: string) => {
    // eslint-disable-next-line no-unused-expressions
    !users.some(user => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId: string) => {
    users = users.filter(user => user.socketId !== socketId);
  };

  const getUser = (userId: string) => {
    return users.find(user => user.userId === userId);
  };

  io.on('connection', socket => {
    // when connect
    console.log('user connected');

    // take userId and socketId from User
    socket.on('addUser', userId => {
      addUser(userId, socket.id);
      io.emit('getUser', users);
    });

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    socket.on('sendNotification', async ({ storeId, outLetId, tableId }) => {
      try {
        // }
        const outlet = await Outlet.findById(outLetId);

        const user = getUser(outlet?.admin.toString() as string);

        const time = Date.now();
        io.to(user?.socketId as string).emit('getNotification', {
          tableId,
          time,
          message: 'waiter call from',
        });
      } catch (error) {
        throw Error();
      }
    });
    socket.on('disconnect', () => {
      console.log('a user disconnected');
      removeUser(socket.id);
      io.emit('getUser', users);
    });
  });
}
