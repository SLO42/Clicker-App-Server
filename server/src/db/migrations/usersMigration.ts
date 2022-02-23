import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    const tableName = "users"
    await knex.raw("create extension if not exists \"uuid-ossp\"");

    await knex.schema.createTable(tableName, (table: any) => {
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

export async function down(knex: Knex): Promise<void> {
    await knex.raw("drop extension if exists \"uuid-ossp\"");
    await knex.schema.dropTable("users");
}