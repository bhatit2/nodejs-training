import { Sequelize } from "sequelize";
import userModel from './user';
import groupModel from './group';
import userGroupModel from './userGroup';
const dotenv = require("dotenv");

// get config vars
dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRESQL as string);

const Models = {
  User : userModel(sequelize),
  Group : groupModel(sequelize),
  UserGroup : userGroupModel(sequelize)
};

export { sequelize };

export default Models;
