import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import cookieParser from 'cookie-parser';
import logger from 'morgan';

import loginRouter from './routes/login.js';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import rotaLeiloes from './routes/leiloes.js';
import rotaLances from './routes/lances.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/leiloes', rotaLeiloes);
app.use('/lances', rotaLances);
app.use('/login', loginRouter);

export default app;

