"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = exports.ResourceExistsError = exports.ResourceNotFound = void 0;
class ResourceNotFound extends Error {
    constructor(resourceName, resourceId) {
        super(`${resourceName} with id "${resourceId}" was not found.`);
        Object.setPrototypeOf(this, ResourceNotFound.prototype);
    }
}
exports.ResourceNotFound = ResourceNotFound;
class ResourceExistsError extends Error {
    constructor(resourceName) {
        super(`${resourceName} already exists`);
        Object.setPrototypeOf(this, ResourceExistsError.prototype);
    }
}
exports.ResourceExistsError = ResourceExistsError;
const handleErrorResponse = (error, res, statusCode = 500, message) => {
    const errorMessage = message || error.message;
    console.error(errorMessage, error);
    res.status(statusCode).json({ message: errorMessage, ...error });
};
exports.handleErrorResponse = handleErrorResponse;
