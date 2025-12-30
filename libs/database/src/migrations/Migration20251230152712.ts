import { Migration } from '@mikro-orm/migrations';

export class Migration20251230152712 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "openai";`);
    this.addSql(`create table "openai"."conversations" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null default now(), constraint "conversations_pkey" primary key ("id"));`);

    this.addSql(`create table "openai"."messages" ("id" uuid not null default gen_random_uuid(), "conversation_id" uuid not null, "sender" text not null, "text" text not null, "created_at" timestamptz not null default now(), constraint "messages_pkey" primary key ("id"));`);

    this.addSql(`alter table "openai"."messages" add constraint "messages_conversation_id_foreign" foreign key ("conversation_id") references "openai"."conversations" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "openai"."messages" drop constraint "messages_conversation_id_foreign";`);

    this.addSql(`drop table if exists "openai"."conversations" cascade;`);

    this.addSql(`drop table if exists "openai"."messages" cascade;`);

    this.addSql(`drop schema if exists "openai";`);
  }

}
