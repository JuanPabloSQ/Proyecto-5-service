import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import clientsRouter from './routes/clients.js';
import institutionsRouter from './routes/institutions.js';
import authRouter from './routes/auth.js';
import initDb from './model/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const corsOptions = app.get('env') === 'development' ? {} : {
  origin: process.env.WEB_UI_URL,
}

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

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clients', clientsRouter);
app.use('/institutions', institutionsRouter);
app.use('/auth', authRouter);

// TESTO DE ERRORES
app.use('/force-error', (req, res, next) => {
  const error = new Error('Forced Internal Server Error');
  error.status = 500;
  next(error);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

initDb();

export default app;
