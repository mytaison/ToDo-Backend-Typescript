// General way
// const express = require("express");
// using Typescript
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { taskRouter } from './src/tasks/tasks.router';

// Configuration
dotenv.config();

// Create Database Connection
export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true,
  entities: [Task],
});

// Instantiate Express App
const app: Express = express();
// Define Server Port
const port = process.env.PORT;
// Parse Request Body
app.use(bodyParser.json());
// Use CORS
app.use(cors());

// Create a Default Route
app.get('/', (req: Request, res: Response) => {
  // console.log(req);
  res.status(200).send('To-Do API Server built with Express & TypeScript');
});
app.use('/', taskRouter);

// Initializing AppDataSource
AppDataSource.initialize()
  .then(() => {
    // TypeORM is connected to database.
    console.log('DataSource has been initialized');
    // Start listening to the requests on the defined port
    app.listen(port);
  })
  .catch((err) => {
    console.error('Error during DataSource initialization.', err);
  });
