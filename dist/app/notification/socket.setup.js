"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = void 0;
const outlet_model_1 = __importDefault(require("../modules/Outlet/outlet.model"));
let users = [];
function setupSocket(io) {
    const addUser = (userId, socketId) => {
        // eslint-disable-next-line no-unused-expressions
        !users.some(user => user.userId === userId) &&
            users.push({ userId, socketId });
    };
    const removeUser = (socketId) => {
        users = users.filter(user => user.socketId !== socketId);
    };
    const getUser = (userId) => {
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
        socket.on('sendNotification', ({ storeId, outLetId, tableId }) => __awaiter(this, void 0, void 0, function* () {
            try {
                // }
                const outlet = yield outlet_model_1.default.findById(outLetId);
                const user = getUser(outlet === null || outlet === void 0 ? void 0 : outlet.admin.toString());
                const time = Date.now();
                io.to(user === null || user === void 0 ? void 0 : user.socketId).emit('getNotification', {
                    tableId,
                    time,
                    message: 'waiter call from',
                });
            }
            catch (error) {
                throw Error();
            }
        }));
        socket.on('disconnect', () => {
            console.log('a user disconnected');
            removeUser(socket.id);
            io.emit('getUser', users);
        });
    });
}
exports.setupSocket = setupSocket;
