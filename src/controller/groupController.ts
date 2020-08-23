import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import Models from '../models';
import {
    ContainerTypes,
    ValidatedRequest,
    ValidatedRequestSchema,
} from "express-joi-validation";

const { Group } = Models;

const getGroups = async (req: Request, res: Response) => {
    Group.findAll()
        .then((groups) => res.status(201).send(groups))
        .catch((error) => res.status(400).send(error))
}

const getGroupById = async (req: Request, res: Response) => {
    Group.findByPk(req.params.id)
        .then((groups) => res.status(201).send(groups))
        .catch((error) => res.status(400).send(error))
}

const createGroup = async (req: Request, res: Response) => {
    let { name, permissions } = req.body;
    return Group
        .create({
            id: uuidv4(),
            name,
            permissions
        })
        .then((group) => res.status(201).send(group))
        .catch((error) => res.status(400).send(error));
}

const updateGroup = (req: Request, res: Response) => {
    return Group
        .findByPk(req.params.id)
        .then(group => {
            if (!group) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }
            let updatedGroup = { ...group, ...req.body };
            return Group
                .update(updatedGroup, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).send(updatedGroup))
                .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
}

const deleteGroup = async (req: Request, res: Response, next:any) => {
    return Group.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).send("Group deleted successfully");
        next();
    })
        .catch((error) => res.status(400).send(error));
}

export {
    getGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup
}
