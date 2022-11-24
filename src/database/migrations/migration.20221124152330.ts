import { Migration } from '@mikro-orm/migrations';

export class Migration20221124152330 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "deleted_at" timestamptz(0) null, "first_name" varchar(80) not null, "last_name" varchar(80) not null, "full_name" varchar(160) generated always as (first_name || \' \' || last_name) stored null, "email" varchar(255) not null, "user_name" varchar(50) not null, "password" varchar(118) not null, "is_online" boolean not null default false, constraint "users_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");',
    );
    this.addSql(
      'alter table "users" add constraint "users_user_name_unique" unique ("user_name");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }
}
