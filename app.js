import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import plantsRouter from './routes/plants.js';
import authRouter from './routes/auth.js';
import mercadopagoRouter from './routes/mercadopago.js';
import initDb from './model/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const allowedOrigins = [
  'https://juanpablosq.github.io',
  'http://localhost:5173',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imageDir = '/uploads/clients/images';
const dirPath = path.join(__dirname, imageDir);

app.use(cors(corsOptions));
app.use(imageDir, express.static(dirPath));
app.use(logger('dev'));
app.use(json({ limit: '50mb', extended: true }));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/plants', plantsRouter);
app.use('/auth', authRouter);
app.use('/mercadopago', mercadopagoRouter);

app.use('/force-error', (req, res, next) => {
  const error = new Error('Forced Internal Server Error');
  error.status = 500;
  next(error);
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

initDb();

export default app;
