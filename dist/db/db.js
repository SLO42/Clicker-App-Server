"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const config_1 = require("../config");
const pg_1 = __importDefault(require("pg"));
const knex_paginate_1 = require("knex-paginate");
const db = (0, knex_1.default)(config_1.config.database);
const PG_DECIMAL_OID = 1700;
pg_1.default.types.setTypeParser(PG_DECIMAL_OID, parseFloat);
(0, knex_paginate_1.attachPaginate)();
exports.default = db;
