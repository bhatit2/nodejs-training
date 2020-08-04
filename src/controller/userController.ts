import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import User from '../models';
import {
  ContainerTypes,
  ValidatedRequest,
  ValidatedRequestSchema,
} from "express-joi-validation";

interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
  };
}
  const getUsers = async (req: Request, res: Response) =>{
    User.findAll()
    .then((users) => res.status(201).send(users))
    .catch((error) => res.status(400).send(error))
  }

  const getUserById = async (req: Request, res: Response) => {
    User.findByPk(req.params.id)
    .then((users) => res.status(201).send(users))
    .catch((error) => res.status(400).send(error))
  }

  const createUser = async (req : ValidatedRequest<UserRequestSchema>, res: Response) => {
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
      .catch((error) => res.status(400).send(error));
  }

  const updateUser = (req: Request, res: Response) => {
    return User
      .findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        let updatedUser = { ...user, ...req.body };
        return user
          .update(updatedUser)
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

  const deleteUser = async (req: Request, res: Response) => {
    return User
      .findByPk(req.params.id)
      .then((user: any) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        user.isDeleted = true;
        return user
          .update(user)
          .then(() => res.status(200).send(user))
          .catch((error: any) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

  export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  }
