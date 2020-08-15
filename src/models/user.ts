import { Model, DataTypes } from "sequelize";

const UserModel = (sequelize: any) => {
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
    return User;
}

export default UserModel;
