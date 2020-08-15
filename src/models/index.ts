import { Sequelize } from "sequelize";
import userModel from './user';
import groupModel from './group';

const sequelize = new Sequelize(
  "postgres://asdrdbbr:az0-Ot6N-fILlzBQxgTUoO5Vygv_VliD@raja.db.elephantsql.com:5432/asdrdbbr"
);

const Models = {
  User : userModel(sequelize),
  Group : groupModel(sequelize)
};

export { sequelize };

export default Models;
