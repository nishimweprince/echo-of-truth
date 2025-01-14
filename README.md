# Echo of Truth Service Documentation

## Overview
Echo of Truth is a Node.js/TypeScript service that manages poems with PostgreSQL database integration. The service provides REST API endpoints for creating, fetching, updating, and deleting poems.

## Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_NAME=echooftruth
PORT=8080
```

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | PostgreSQL host | localhost |
| DB_PORT | PostgreSQL port | 5432 |
| DB_USER | Database username | - |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | echooftruth |
| PORT | Application port | 8080 |

## Project Structure

```
src/
├── entities/         # Base entities and shared models
├── helpers/          # Utility functions and helpers
├── middlewares/      # Express middlewares
├── poems/           # Poem module (routes, controllers, services)
├── types/           # TypeScript type definitions
├── app.ts           # Express application setup
├── data-source.ts   # TypeORM configuration
└── server.ts        # Application entry point
```

## API Endpoints

### Poems

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/poems` | Create a new poem |
| GET | `/api/poems` | Fetch poems with pagination |
| GET | `/api/poems/:messageId` | Get poem by message ID |
| DELETE | `/api/poems` | Delete a poem |

## Database Schema

### Poem Entity

The Poem entity includes:
- `id`: UUID primary key
- `text`: The poem content
- `messageId`: Associated message UUID
- `wallet`: Optional wallet address
- `status`: Enum (SUBMITTED/REVIEWED)
- Timestamps (createdAt, updatedAt)

## Error Handling

The application uses custom error classes for different scenarios:
- ValidationError (400)
- UnauthorizedError (401)
- ForbiddenError (403)
- NotFoundError (404)
- ConflictError (409)

## Logging

The application uses Winston for logging with different levels:
- Error logs: `logs/error.log`
- Activity logs: `logs/activities.log`
- Critical logs: `logs/critical.log`
- Console logs (debug level)

## Development

### Available Scripts

- `npm run build`: Compile TypeScript to JavaScript
- `npm run dev`: Start development server with hot-reload
- `npm start`: Install dependencies, build, and start production server

### TypeScript Configuration

The project uses TypeScript with strict type checking and decorators enabled. Configuration can be found in `tsconfig.json`.

## Performance

The application uses Node.js clustering to take advantage of multiple CPU cores:
