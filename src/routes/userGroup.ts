import * as express from 'express';
import * as Joi from "@hapi/joi";
import { createValidator } from "express-joi-validation";
import {getUserGroups, getUserGroupById, addUsersToGroup, deleteUserGroup } from "../controller/userGroupController";

const userGroupRouter = express.Router();
// const schema = Joi.object({
//   login: Joi.string().required(),
//   password: Joi.string()
//     .pattern(new RegExp("^[a-zA-Z0-9_]+$"))
//     .required(),
//   age: Joi.number()
//     .integer()
//     .min(4)
//     .max(130)
//     .required()
// });

userGroupRouter.get("/", getUserGroups);
userGroupRouter.get("/:id", getUserGroupById);
userGroupRouter.post("/create", addUsersToGroup);
userGroupRouter.delete("/delete/:id", deleteUserGroup);

export default userGroupRouter;