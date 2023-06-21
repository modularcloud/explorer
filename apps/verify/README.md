## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Prisma

Prisma is an open-source database toolkit that simplifies database management, schema definition, and migrations. It allows you to interact with your database through a type-safe and auto-generated query builder.

The npx prisma generate command is used to generate the Prisma client. Prisma generates a client library based on your database schema, which provides type-safe methods for interacting with your database. This command should be executed whenever your schema changes.

To generate the Prisma client, run the following command:

```bash
npx prisma generate
```

The npx prisma migrate command is used to manage database migrations. Migrations allow you to evolve your database schema over time without losing data. With Prisma, you can create new migrations, apply them, and revert them if necessary.

To create a new migration, run the following command:

```bash
npx prisma migrate dev --name <migration_name>
```

To apply pending migrations to the database, run:

```bash
npx prisma migrate deploy
```