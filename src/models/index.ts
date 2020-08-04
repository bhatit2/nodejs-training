import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  "postgres://asdrdbbr:az0-Ot6N-fILlzBQxgTUoO5Vygv_VliD@raja.db.elephantsql.com:5432/asdrdbbr"
);

class User extends Model { }

User.init({
  login: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
  },
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User'
});

export { sequelize };

export default User;
