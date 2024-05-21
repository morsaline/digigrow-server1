import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import session from 'express-session';
import config from './app/config';
const app: Application = express();
app.use('/uploads', express.static('uploads'));
app.use('/qr_code', express.static('qr_code'));

// parsers
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: config.jwt_refresh_secret as string, // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true in a production environment with HTTPS
      httpOnly: true,
      domain: config.client_url,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      path: '/',
    },
  }),
);

app.use(
  cors({
    origin: [config.client_url as string],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }),
);

// routes
// swaggerDocs(app, Number(config.port));
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  res.status(200).send('hello from behind');
});

app.use(globalErrorHandler);

// Not found
// app.use(notFound);
export default app;
