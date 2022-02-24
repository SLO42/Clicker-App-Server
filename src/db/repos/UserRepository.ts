import { User } from "../../types/user";
import { ensure } from "../../utils/utils";
import { ResourceNotFound } from "../../utils/errors";
import db from '../db';

const defaultUserProperties = [
    'id',
    'name',
    'email',
    'googleId',
    'verified',
    'permissions'
];

export const insertUser = async (user: Omit<User, 'id'>): Promise<any> => {
    return db('users').insert(user).returning(defaultUserProperties);
};

export const findAllUsers = async (): Promise<User[]> => {
    return db('users').select();
};

export const findUserById = async (id: string): Promise<User> => {
    const user = await db('users')
    .where({
        id,
        deleted: false,
    })
    .first();
    ensure(user !== undefined, ResourceNotFound, 'user', id);
    return user;
};

export const findUserByEmail = async (email: string): Promise<User> => {
    const user = await db('users')
    .where({
        email,
        deleted: false,
    })
    .first();
    ensure(user !== undefined, ResourceNotFound, 'user', email);
    return user;
};

export const findUserByGoogleId = async (googleId: string): Promise<User> => {
    return db('users')
    .where({
        googleId,
        deleted: false,
    })
    .first();
};

export const findUserByEmailAndUpdate = async (
    email: string,
    data: object,
): Promise<User> => {
    const [user] = await db('users')
    .where({
        email,
        deleted: false,
    })
    .first()
    .update(data)
    .returning(defaultUserProperties);
    return user;
};

export const findUserByIdAndUpdate = async (id: string, data: object): Promise<User> => {
    const [user] = await db('users')
    .where({
        id,
        deleted: false,
    })
    .first()
    .update(data)
    .returning(defaultUserProperties);
    return user;
};

export const setUserVerified = async (id: string): Promise<any> => {
    const user = await db('users')
    .where({
        id,
    })
    .update({
        verified: true,
        verificationCode: null,
    });
    ensure(user !== undefined, ResourceNotFound, 'user', id);
    return user;
};

export const removeUser = async (id: string): Promise<User> => {
    const updatedUser = await findUserByIdAndUpdate(id, {
        permissions: 'basic',
        deleted: true,
    });
    return updatedUser;
};