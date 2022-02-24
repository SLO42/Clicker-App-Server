import { Response } from 'express';

export class ResourceNotFound extends Error {
    constructor(resourceName: string, resourceId: number | string) {
        super(`${resourceName} with id "${resourceId}" was not found.`);
        Object.setPrototypeOf(this, ResourceNotFound.prototype);
    }
}

export class ResourceExistsError extends Error {
    constructor(resourceName: string) {
        super(`${resourceName} already exists`);
        Object.setPrototypeOf(this, ResourceExistsError.prototype);
    }
}
export const handleErrorResponse = (
    error: any,
    res: Response,
    statusCode = 500,
    message?: string,
) => {
    const errorMessage = message || error.message;
    console.error(errorMessage, error);
    res.status(statusCode).json({ message: errorMessage, ...error });
    };