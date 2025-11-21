# Task Management API

A NestJS application for managing tasks and teams with JWT authentication.

## Features

- User authentication with JWT tokens
- Create and manage teams with members
- Create, read, and update tasks
- Assign tasks to team members
- Change task status and properties

## Technologies Used

- NestJS
- TypeORM
- SQLite (for demo, can be changed to MySQL/MSSQL/MongoDB)
- JWT for authentication
- Class-validator for validation

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```
JWT_SECRET=mySecretKey
USERNAME=admin
PASSWORD=admin123
DB_TYPE=sqlite
DB_NAME=task.db
```

## Running the app

```bash
# development
npm run start:dev

# production
npm run start:prod
```

The app will run on http://localhost:3000

## API Endpoints

### Authentication

- `POST /auth/login` - Login with username and password

### Teams

- `POST /teams` - Create a new team with members
- `GET /teams` - Get all teams

### Tasks

- `POST /tasks` - Create a new task
- `GET /tasks` - Get all tasks with assignee info
- `PUT /tasks/:id` - Update a task

All endpoints except login require Bearer token authentication.

## Demo with Postman

Import the `postman_collection.json` file into Postman.

Set the `base_url` variable to `http://localhost:3000`

1. Login to get the token
2. Create a team
3. Create tasks and assign to team members
4. Update task status

## Database

Uses SQLite for simplicity. To change to MySQL:

1. Update `.env`: `DB_TYPE=mysql`, add `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`
2. Install `mysql2`: `npm install mysql2`
3. Remove `sqlite3` from dependencies

For production, set `synchronize: false` in `app.module.ts` and use migrations.

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## License

This project is MIT licensed.
