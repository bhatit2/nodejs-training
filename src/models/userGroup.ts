import { Model, DataTypes } from "sequelize";

const UserGroupModel = (sequelize: any) => {
    class UserGroup extends Model { }

    UserGroup.init({
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        groupId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    }, {
        sequelize,
        modelName: 'UserGroup'
    });
    return UserGroup;
}

export default UserGroupModel;
