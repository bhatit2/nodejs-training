import { Sequelize } from "sequelize";
import userModel from './user';
import groupModel from './group';
import userGroupModel from './userGroup';

const sequelize = new Sequelize(
  "postgres://asdrdbbr:az0-Ot6N-fILlzBQxgTUoO5Vygv_VliD@raja.db.elephantsql.com:5432/asdrdbbr"
);

const Models = {
  User : userModel(sequelize),
  Group : groupModel(sequelize),
  UserGroup : userGroupModel(sequelize)
};

export { sequelize };

export default Models;
