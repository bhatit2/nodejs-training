import * as express from 'express';
import * as Joi from "@hapi/joi";
import { createValidator } from "express-joi-validation";
import {createGroup, getGroupById, getGroups, deleteGroup, updateGroup} from "../controller/groupController";
import {deleteGroupRecords} from '../controller/userGroupController';
// const validator = createValidator();
const groupRouter = express.Router();
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

groupRouter.get("/", getGroups);
groupRouter.get("/:id", getGroupById);
// router.post("/create", validator.body(schema), createUser);
groupRouter.post("/create", createGroup);
groupRouter.put("/update/:id", updateGroup);
groupRouter.delete("/delete/:id",[ deleteGroup, deleteGroupRecords]);

export default groupRouter;