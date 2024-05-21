"use strict";
/* eslint-disable no-console */
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
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const socket_io_1 = require("socket.io");
const socket_setup_1 = require("./app/notification/socket.setup");
const mongoose_1 = __importDefault(require("mongoose"));
const notFount_1 = __importDefault(require("./app/middlewares/notFount"));
const swagger_1 = __importDefault(require("./app/utils/swagger"));
let server;
let io;
// hello
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            console.log('Connected to database');
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`Server running on port`, config_1.default.port);
            });
            (0, swagger_1.default)(app_1.default, Number(config_1.default.port));
            app_1.default.use(notFount_1.default);
            // Set up CORS options
            const corsOptions = {
                origin: config_1.default.client_url, // Specify the URL of your React app
                methods: ['GET', 'POST'], // Specify allowed HTTP methods
            };
            // Attach Socket.IO to the server
            io = new socket_io_1.Server(server, {
                cors: corsOptions,
            });
            (0, socket_setup_1.setupSocket)(io);
        }
        catch (error) {
            console.log(error);
            console.log('connection faild');
        }
    });
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
