import express, { NextFunction } from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/users";
import groupRouter from './routes/groups';
import usergroupRouter from './routes/userGroup';
import { sequelize } from "./models";
import * as winston from 'winston';
const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
      new winston.transports.Console()
  ]
});
// override console.log with winston logger
console.log = (args : any) => logger.info.call(logger, args);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
} 
const app = express();


const requestLogger =  (req:any, res:any, done:NextFunction) => {
  logger.info(`request : ${req.method} ${req.originalUrl}`);
  logger.info(`params : ${JSON.stringify(req.params)}`);
  done();
}

const errorHandler = (err:any, req:any, res:any, next:any) =>{
  logger.error(err);
  res.status(500).send(err);
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use("/users", userRouter);
app.use("/groups" , groupRouter);
app.use("/usergroups", usergroupRouter);
app.use(errorHandler);

sequelize.sync().then(() => {
  testConnection().then(() => {
    app.listen(3001, () => {
      console.log("listening on port %s... 3001");
    });
  });
});
