import knex from "knex";
import { config } from "../config";
import pg from "pg";
import { attachPaginate } from 'knex-paginate';

const db = knex(config.database);
const PG_DECIMAL_OID = 1700;
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);
attachPaginate();

export default db;