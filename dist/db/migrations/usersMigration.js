"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    const tableName = "users";
    await knex.raw("create extension if not exists \"uuid-ossp\"");
    await knex.schema.createTable(tableName, (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("googleId");
        table.string("string", [128]).notNullable();
        table.string("email", [128]).notNullable();
        table.boolean('verified').notNullable().defaultTo(false);
        table.string('verificationCode', [64]);
        table.string('securityCode', [64]);
        table.enu('permissions', ['basic', 'admin']).defaultTo('basic');
        table.boolean('deleted').notNullable().defaultTo(false);
        table.string('salt');
        table.string('hash', [512]);
        table.timestamps(false, true);
    });
}
exports.up = up;
async function down(knex) {
    await knex.raw("drop extension if exists \"uuid-ossp\"");
    await knex.schema.dropTable("users");
}
exports.down = down;
