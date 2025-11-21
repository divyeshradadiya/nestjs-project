# Task Management API

A NestJS application for managing tasks and teams with API key authentication.

## Features

- API key authentication for secure access
- Create and manage teams with members
- Create, read, and update tasks
- Assign tasks to team members
- Change task status and properties

## Technologies Used

- NestJS
- TypeORM
- MySQL database
- API Key authentication
- Class-validator for validation

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```
API_KEY=your-secret-api-key-12345
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=Divyesh@123
DB_NAME=task_management
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

### Teams
- `POST /teams` - Create a new team with members
- `GET /teams` - Get all teams

### Tasks
- `POST /tasks` - Create a new task
- `GET /tasks` - Get all tasks with assignee info
- `PUT /tasks/:id` - Update a task

**All endpoints require API key authentication via `x-api-key` header.**

## Demo with Postman

Import the `postman_collection.json` file into Postman.

Set the variables:
- `base_url` to `http://localhost:3000`
- `api_key` to `your-secret-api-key-12345` (or your custom API key from .env)

### Steps:
1. Create a team with members
2. Create tasks and assign to team members
3. Get all tasks with assignee information
4. Update task status and properties

## Database

The application uses MySQL database. Make sure you have MySQL installed and running locally, and create the database:

```sql
CREATE DATABASE task_management;
```

The application will automatically create tables using TypeORM synchronize feature.

**Note:** For production, set `synchronize: false` in `app.module.ts` and use migrations.

## License

This project is MIT licensed.
