import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import Models from '../models';
import {
  ContainerTypes,
  ValidatedRequest,
  ValidatedRequestSchema,
} from "express-joi-validation";

const { User } = Models;
interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
  };
}
const getUsers = async (req: Request, res: Response, next:any) => {
  User.findAll()
    .then((users) => {
      res.status(201).send(users);
      next();
    })
    .catch((error) => next(error))
}

const getUserById = async (req: Request, res: Response, next:any) => {
  User.findByPk(req.params.id)
    .then((users) => res.status(201).send(users))
    .catch((error) => next(error))
}

const createUser = async (req: ValidatedRequest<UserRequestSchema>, res: Response, next: any) => {
  let { login, password, age } = req.body;
  return User
    .create({
      id: uuidv4(),
      login,
      password,
      age,
      isDeleted: false
    })
    .then((student) => res.status(201).send(student))
    .catch((error) => next(error));
}

const updateUser = (req: Request, res: Response, next:any) => {
  return User
    .findByPk(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      let updatedUser = { ...user, ...req.body };
      return User
        .update(updatedUser, {
          where: {
            id: req.params.id
          }
        })
        .then(() => res.status(200).send(updatedUser))
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
}

const deleteUser = async (req: Request, res: Response, next: any) => {
  return User
    .update({
      isDeleted: true
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.status(200).send("User deleted successfully");
      next();
    })
    .catch((error) => next(error));

}

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
