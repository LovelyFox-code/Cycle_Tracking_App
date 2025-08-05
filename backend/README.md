# Women's Health API Backend

This is the backend API for the Women's Health application, built with Express, TypeScript, and Supabase.

## Project Structure

```
backend/
├── src/
│   ├── api/           # API routes and controllers
│   ├── config/        # Configuration files
│   ├── db/            # Database connections
│   ├── middleware/    # Express middleware
│   ├── models/        # Data models
│   ├── schema/        # Validation schemas
│   ├── services/      # Business logic services
│   └── index.ts       # Main application entry point
├── docs/              # Documentation
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file based on `.env-sample` and add your Supabase credentials
5. Start the development server: `npm run dev`

## Available Scripts

- `npm run dev`: Start the development server with hot-reloading
- `npm run build`: Build the TypeScript code to JavaScript
- `npm start`: Start the production server from the built code

## API Endpoints

### Health Check

- `GET /api/v1/health`: Check API status

### User Endpoints

- `GET /api/v1/users`: Get all users
- `GET /api/v1/users/:id`: Get a specific user by ID
- `POST /api/v1/users`: Create a new user
- `PUT /api/v1/users/:id`: Update a user
- `DELETE /api/v1/users/:id`: Delete a user

### Cycle Tracking Endpoints

- `GET /api/v1/users/:userId/cycles`: Get all cycles for a user
- `GET /api/v1/users/:userId/cycles/current`: Get current cycle for a user
- `POST /api/v1/cycles`: Create a new cycle
- `PUT /api/v1/cycles/:id`: Update a cycle
- `DELETE /api/v1/cycles/:id`: Delete a cycle

### Content Endpoints

#### Workouts
- `GET /api/v1/workouts`: Get all workouts
- `GET /api/v1/workouts/:id`: Get a specific workout
- `GET /api/v1/workouts/phase/:phase`: Get workouts by cycle phase

#### Recipes
- `GET /api/v1/recipes`: Get all recipes
- `GET /api/v1/recipes/:id`: Get a specific recipe
- `GET /api/v1/recipes/phase/:phase`: Get recipes by cycle phase
- `GET /api/v1/recipes/dietary/:dietary`: Get recipes by dietary preference

#### Recovery
- `GET /api/v1/recovery`: Get all recovery practices
- `GET /api/v1/recovery/:id`: Get a specific recovery practice
- `GET /api/v1/recovery/phase/:phase`: Get recovery practices by cycle phase

#### Recommendations
- `GET /api/v1/recommendations/:phase`: Get personalized content recommendations by phase

## Request Validation

This API uses [Zod](https://github.com/colinhacks/zod) for request validation. All endpoints that accept user input have validation schemas defined in the `schema` directory.

- Validation is applied as middleware to routes
- Schemas validate request body, query parameters, and URL parameters
- Failed validation returns a 400 Bad Request with detailed error information

For more information, see the [validation documentation](./docs/validation.md).

## Environment Variables

- `PORT`: The port the server will run on (default: 3001)
- `NODE_ENV`: The environment (development, production)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Database Schema

This project uses Supabase as the database provider. The database schema includes:

### Users Table
```sql
create table users (
  id uuid primary key references auth.users(id),
  full_name text,
  email text,
  dietary_preference text,
  theme_preference text,
  notifications_enabled boolean default true,
  created_at timestamp default now()
);
```

### Cycles Table
```sql
create table cycles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  start_date date not null,
  current_phase text not null,
  day_of_cycle int,
  notes text,
  created_at timestamp default now()
);
```

### Content Tables
```sql
-- Workouts
create table content_workouts (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  phase_tags text[], -- e.g. ['follicular', 'luteal']
  type text,         -- e.g. 'yoga', 'cardio'
  is_premium boolean default false,
  image_url text
);

-- Recipes
create table content_recipes (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  dietary_tags text[], -- e.g. ['vegan', 'gluten_free']
  phase_tags text[],
  is_premium boolean default false,
  image_url text
);

-- Recovery practices
create table content_recovery (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  phase_tags text[],
  is_premium boolean default false,
  video_url text
);
```