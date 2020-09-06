import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import Models from '../models';

const { UserGroup } = Models;

const getUserGroups = async (req: Request, res: Response, next:any) => {
    UserGroup.findAll()
        .then((ug: any) => res.status(201).send(ug))
        .catch((error: any) => next(error))
}

const getUserGroupById = async (req: Request, res: Response, next:any) => {
    UserGroup.findByPk(req.params.id)
        .then((ug: any) => res.status(201).send(ug))
        .catch((error: any) => next(error))
}

const addUsersToGroup = async (req: Request, res: Response, next:any) => {
    let { userId, groupId } = req.body;
    return UserGroup
        .create({
            id: uuidv4(),
            userId,
            groupId
        })
        .then((ug: any) => res.status(201).send(ug))
        .catch((error: any) => next(error));
}

const deleteUserGroup = async (req: Request, res: Response, next:any) => {
    return UserGroup.destroy({
        where: {
            userId: req.params.id
        }
    }).then(() => res.status(200).send("User Group deleted successfully"))
        .catch((error) => next(error));
}

const deleteGroupRecords = async (req: Request, res: Response, next:any) => {
    return UserGroup.destroy({
        where: {
            groupId: req.params.id
        }
    }).then(() => res.status(200).send("Group Records deleted successfully"))
        .catch((error) => next(error));
}

const deleteUserRecords = async (req: Request, res: Response, next:any) => {
    console.log("delete user records");
    return UserGroup.destroy({
        where: {
            userId: req.params.id
        }
    }).then(() => res.status(200).send("User Records deleted successfully"))
        .catch((error) => next(error));
}

export {
    getUserGroups,
    getUserGroupById,
    addUsersToGroup,
    deleteUserGroup,
    deleteGroupRecords,
    deleteUserRecords
}
