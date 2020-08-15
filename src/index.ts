import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/users";
import groupRouter from './routes/groups';
import { sequelize } from "./models";

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
} 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/groups" , groupRouter);

sequelize.sync().then(() => {
  testConnection().then(() => {
    app.listen(3001, () => {
      console.log("listening on port %s... 3001");
    });
  });
});
