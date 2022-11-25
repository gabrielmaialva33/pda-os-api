import { Migration } from '@mikro-orm/migrations';

export class Migration20221125021427 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "roles" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "deleted_at" timestamptz(0) null, "name" varchar(50) not null, "slug" varchar(50) not null, "description" varchar(255) not null, constraint "roles_pkey" primary key ("id"));');

    this.addSql('create table "users" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "deleted_at" timestamptz(0) null, "first_name" varchar(80) not null, "last_name" varchar(80) not null, "full_name" varchar(160) generated always as (first_name || \' \' || last_name) stored null, "email" varchar(255) not null, "user_name" varchar(50) not null, "password" varchar(118) not null, "is_online" boolean not null default false, constraint "users_pkey" primary key ("id"));');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    this.addSql('alter table "users" add constraint "users_user_name_unique" unique ("user_name");');

    this.addSql('create table "users_roles" ("id" uuid not null default uuid_generate_v4(), "user_entity_id" uuid not null, "role_entity_id" uuid not null, "assigned_at" timestamptz(0) not null default now(), constraint "users_roles_pkey" primary key ("id"));');

    this.addSql('alter table "users_roles" add constraint "users_roles_user_entity_id_foreign" foreign key ("user_entity_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_roles" add constraint "users_roles_role_entity_id_foreign" foreign key ("role_entity_id") references "roles" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users_roles" drop constraint "users_roles_role_entity_id_foreign";');

    this.addSql('alter table "users_roles" drop constraint "users_roles_user_entity_id_foreign";');

    this.addSql('drop table if exists "roles" cascade;');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "users_roles" cascade;');
  }

}
