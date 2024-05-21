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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const express_session_1 = __importDefault(require("express-session"));
const config_1 = __importDefault(require("./app/config"));
const app = (0, express_1.default)();
app.use('/uploads', express_1.default.static('uploads'));
app.use('/qr_code', express_1.default.static('qr_code'));
// parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: config_1.default.jwt_refresh_secret, // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true in a production environment with HTTPS
        httpOnly: true,
        domain: config_1.default.client_url,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        path: '/',
    },
}));
app.use((0, cors_1.default)({
    origin: [config_1.default.client_url],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));
// routes
// swaggerDocs(app, Number(config.port));
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send('hello from behind');
}));
app.use(globalErrorHandler_1.default);
// Not found
// app.use(notFound);
exports.default = app;
