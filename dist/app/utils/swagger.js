"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const package_json_1 = require("../../../package.json");
const swagger_json_1 = __importDefault(require("../../../swagger.json"));
const config_1 = __importDefault(require("../config"));
const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Digigrow API Documentation',
            description: 'API endpoints for digigrow services documented on swagger',
            contact: {
                name: 'Md. Israfil',
                email: 'webdevisrafil@gmail.com',
                url: '',
            },
            version: package_json_1.version,
        },
        basePath: '/api/v1',
        servers: [
            {
                url: '/api/v1',
                // description: 'Local server',
            },
        ],
    },
    apis: ['../routes/*.ts', '../modules/*.ts'],
    explorer: true,
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`Docs available at ${config_1.default.base_url}/${port}/docs`);
}
exports.default = swaggerDocs;
