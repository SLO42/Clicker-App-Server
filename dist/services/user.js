"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const UserRepository_1 = require("../db/repos/UserRepository");
const getUserProfile = async (id) => {
    const user = await (0, UserRepository_1.findUserById)(id);
    const profile = {
        name: user.name,
        email: user.email,
        verified: user.verified,
        permissions: user.permissions,
    };
    return profile;
};
exports.getUserProfile = getUserProfile;
