"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const development_1 = require("./development");
const producion_1 = require("./producion");
const configObject = (() => {
    switch (process.env.NODE_ENV) {
        case "production":
            return (0, producion_1.getProdConfig)();
        case "dev":
            return (0, development_1.getDevConfig)();
        default:
            throw TypeError('Invalid environment');
    }
})();
exports.config = Object.freeze({ ...configObject });
