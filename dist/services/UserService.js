"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const uuid_1 = require("uuid");
const models_1 = __importDefault(require("../models"));
const express_joi_validation_1 = require("express-joi-validation");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    models_1.default.findAll()
        .then((users) => res.status(201).send(users))
        .catch((error) => res.status(400).send(error));
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    models_1.default.findByPk(req.params.id)
        .then((users) => res.status(201).send(users))
        .catch((error) => res.status(400).send(error));
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { login, password, age } = req.body;
    return models_1.default
        .create({
        id: uuid_1.v4(),
        login,
        password,
        age,
        isDeleted: false
    })
        .then((student) => res.status(201).send(student))
        .catch((error) => res.status(400).send(error));
});
exports.createUser = createUser;
const updateUser = (req, res) => {
    return models_1.default
        .findByPk(req.params.id)
        .then(user => {
        if (!user) {
            return res.status(404).send({
                message: 'User Not Found',
            });
        }
        let updatedUser = Object.assign(Object.assign({}, user), req.body);
        return user
            .update(updatedUser)
            .then(() => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
    })
        .catch((error) => res.status(400).send(error));
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.default
        .findByPk(req.params.id)
        .then((user) => {
        if (!user) {
            return res.status(404).send({
                message: 'User Not Found',
            });
        }
        user.isDeleted = true;
        return user
            .update(user)
            .then(() => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
    })
        .catch((error) => res.status(400).send(error));
});
exports.deleteUser = deleteUser;
