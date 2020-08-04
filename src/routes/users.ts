import * as express from 'express';
import * as Joi from "@hapi/joi";
import { createValidator } from "express-joi-validation";
import {createUser, deleteUser, updateUser, getUserById, getUsers} from "../controller/userController";

const validator = createValidator();
const router = express.Router();
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

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/create", validator.body(schema), createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;