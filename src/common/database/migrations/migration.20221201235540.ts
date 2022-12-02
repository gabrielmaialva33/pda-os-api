import { Migration } from '@mikro-orm/migrations';

export class Migration20221201235540 extends Migration {
  async up(): Promise<void> {
    this.addSql('create extension if not exists "uuid-ossp";');

    this.addSql(
      'create table "roles" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "deleted_at" timestamptz(0) null, "name" varchar(50) not null, "slug" varchar(50) not null, "description" varchar(255) not null, constraint "roles_pkey" primary key ("id"));',
    );
    this.addSql('comment on table "roles" is \'Role Table\';');
    this.addSql('comment on column "roles"."name" is \'Role Name\';');
    this.addSql(
      'alter table "roles" add constraint "roles_name_unique" unique ("name");',
    );

    this.addSql(
      'create table "users" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "deleted_at" timestamptz(0) null, "first_name" varchar(80) not null, "last_name" varchar(80) not null, "full_name" varchar(160) generated always as (first_name || \' \' || last_name) stored null, "email" varchar(255) not null, "user_name" varchar(50) not null, "password" varchar(118) not null, "avatar" varchar(255) null, "is_online" boolean not null default false, "code" varchar(8) null, "cpf" varchar(14) null, "phone" varchar(20) null, constraint "users_pkey" primary key ("id"));',
    );
    this.addSql('comment on table "users" is \'UserEntity Table\';');
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");',
    );
    this.addSql(
      'alter table "users" add constraint "users_user_name_unique" unique ("user_name");',
    );

    this.addSql(
      'create table "logs" ("id" uuid not null default uuid_generate_v4(), "ip" varchar(255) null, "remote_ip" varchar(255) null, "remote_port" int null, "remote_family" varchar(255) null, "method" varchar(255) null, "url" varchar(255) null, "protocol" varchar(255) null, "parameters" jsonb null, "query" jsonb null, "headers" jsonb null, "created_at" timestamptz(0) not null default now(), "user_id" uuid null, constraint "logs_pkey" primary key ("id"));',
    );
    this.addSql(
      'comment on table "logs" is \'request logs for the application\';',
    );
    this.addSql(
      'comment on column "logs"."ip" is \'ip address of the request\';',
    );
    this.addSql('comment on column "logs"."method" is \'request method\';');
    this.addSql('comment on column "logs"."url" is \'request url\';');
    this.addSql(
      'comment on column "logs"."parameters" is \'request parameters\';',
    );
    this.addSql('comment on column "logs"."query" is \'request query\';');
    this.addSql('comment on column "logs"."headers" is \'request headers\';');
    this.addSql(
      'comment on column "logs"."user_id" is \'user who made the request\';',
    );

    this.addSql(
      'create table "users_roles" ("id" uuid not null default uuid_generate_v4(), "user_id" uuid null, "role_id" uuid null, "assigned_at" timestamptz(0) not null default now(), constraint "users_roles_pkey" primary key ("id", "user_id", "role_id"));',
    );
    this.addSql(
      'comment on table "users_roles" is \'UserEntity Role Pivot Table\';',
    );

    this.addSql(
      'alter table "logs" add constraint "logs_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "users_roles" add constraint "users_roles_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "users_roles" add constraint "users_roles_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "users_roles" drop constraint "users_roles_role_id_foreign";',
    );

    this.addSql(
      'alter table "users_roles" drop constraint "users_roles_role_id_foreign";',
    );

    this.addSql('alter table "logs" drop constraint "logs_user_id_foreign";');

    this.addSql(
      'alter table "users_roles" drop constraint "users_roles_user_id_foreign";',
    );

    this.addSql(
      'alter table "users_roles" drop constraint "users_roles_user_id_foreign";',
    );

    this.addSql('drop table if exists "roles" cascade;');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "logs" cascade;');

    this.addSql('drop table if exists "users_roles" cascade;');
  }
}
