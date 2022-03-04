import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	const tableName = "users";
	await knex.raw("create extension if not exists \"uuid-ossp\"");

	await knex.schema.createTable(tableName, (table: any) => {
		table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
		table.string("googleId");
		table.string("name", [128]).notNullable().defaultTo("N/A");
		table.string("email", [128]).notNullable();
		table.boolean("verified").notNullable().defaultTo(false);
		table.string("verificationCode", [64]);
		table.string("securityCode", [64]);
		table.string("permissions").defaultTo("basic");
		table.boolean("deleted").notNullable().defaultTo(false);
		table.string("salt");
		table.string("hash", [512]);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable("users");
	await knex.raw("drop extension if exists \"uuid-ossp\"");
}
