"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const Joi = __importStar(require("@hapi/joi"));
const express_joi_validation_1 = require("express-joi-validation");
const UserService_1 = require("../services/UserService");
const validator = express_joi_validation_1.createValidator();
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
router.get("/", UserService_1.getUsers);
router.get("/:id", UserService_1.getUserById);
router.post("/create", validator.body(schema), UserService_1.createUser);
router.put("/update/:id", UserService_1.updateUser);
router.delete("/delete/:id", UserService_1.deleteUser);
exports.default = router;
