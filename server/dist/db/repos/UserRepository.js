"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.findAllUsers = exports.insertUser = void 0;
const utils_1 = require("../../utils/utils");
const errors_1 = require("../../utils/errors");
const db_1 = __importDefault(require("../db"));
const defaultUserProperties = [
    'id',
    'name',
    'email',
    'googleId',
    'verified',
    'permissions'
];
const insertUser = async (user) => {
    return (0, db_1.default)('users').insert(user).returning(defaultUserProperties);
};
exports.insertUser = insertUser;
const findAllUsers = async () => {
    return (0, db_1.default)('users').select();
};
exports.findAllUsers = findAllUsers;
const findUserById = async (id) => {
    const user = await (0, db_1.default)('users')
        .where({
        id,
        deleted: false,
    })
        .first();
    (0, utils_1.ensure)(user !== undefined, errors_1.ResourceNotFound, 'user', id);
    return user;
};
exports.findUserById = findUserById;
