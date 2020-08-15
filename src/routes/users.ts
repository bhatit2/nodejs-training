import * as express from 'express';
import * as Joi from "@hapi/joi";
import { createValidator } from "express-joi-validation";
import {createUser, deleteUser, updateUser, getUserById, getUsers} from "../controller/userController";

const validator = createValidator();
const userRouter = express.Router();
const schema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9_]+$"))
    .required(),
  age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .required()
});

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/create", validator.body(schema), createUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;