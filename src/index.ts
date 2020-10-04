import express, { NextFunction } from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/users";
import groupRouter from './routes/groups';
import usergroupRouter from './routes/userGroup';
import { sequelize } from "./models";
import * as winston from 'winston';
import * as jwt from 'jsonwebtoken';

var cors = require('cors');
const dotenv = require("dotenv");

// get config vars
dotenv.config();

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
      new winston.transports.Console()
  ]
});

// override console.log with winston logger
// console.log = (args : any) => logger.info.call(logger, args);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
} 
const app = express();

const requestLogger =  (req:any, res:any, next:NextFunction) => {
  logger.info(`request : ${req.method} ${req.originalUrl}`);
  logger.info(`params : ${JSON.stringify(req.params)}`);
  next();
}

const errorHandler = (err:any, req:any, res:any, next:any) =>{
  logger.error(err);
  res.status(500).send(err);
};

const authenticateToken = (req:any, res:any, next:any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err:any, user:any)=> {
      if(err) return res.sendStatus(403);
      req.user = user;
      next();
  })
}
app.use(cors({
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}));
app.use(bodyParser.json());
app.post('/login', function(req, res, next){
  const username = req.body.username;
  const user = { name : username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string);
  res.json({accessToken});
  next();
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
// app.use();
app.use("/users", authenticateToken, userRouter);
app.use("/groups" , authenticateToken, groupRouter);
app.use("/usergroups", authenticateToken, usergroupRouter);
app.use(errorHandler);

sequelize.sync().then(() => {
  testConnection().then(() => {
    app.listen(3001, () => {
      console.log("listening on port %s... 3001");
    });
  });
});
