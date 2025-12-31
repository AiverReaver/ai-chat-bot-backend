

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Notes
I Have provided .env.example file. Please create a .env file in the root directory and add the required environment variables.
I am using Postgres as database.
I Decided to Create conversation API so that when user starts a new chat a new conversation is created in the database and all the messages related to that conversation are stored in the messages table with a foreign key reference to the conversation table.

## Project setup

```bash
$ pnpm install
$ pnpm run mikro:up
$ pnpm run start:dev

```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
