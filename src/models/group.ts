import { Model, DataTypes } from "sequelize";

const GroupModel = (sequelize: any) => {
    class Group extends Model { }

    Group.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Group'
    });
    return Group;
}

export default GroupModel;
