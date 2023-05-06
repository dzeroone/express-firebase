import express, { Express, Request, Response } from 'express';
var app: Express = express()

import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import authRouter from './routes/auth.router';
import userRouter from './routes/user.router';
import todoRouter from './routes/todo.router';

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter)
app.use('/users', userRouter);
app.use('/todos', todoRouter)

//Define request response in root URL (/)
app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})

//Launch listening server on port 8081
app.listen(8081, function () {
  console.log('app listening on port 8081!')
})