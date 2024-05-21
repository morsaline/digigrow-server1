import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../../package.json';
import swaggerDocument from '../../../swagger.json';
import config from '../config';
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
      version: version,
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
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Application, port: number) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`Docs available at ${config.base_url}/${port}/docs`);
}
export default swaggerDocs;
