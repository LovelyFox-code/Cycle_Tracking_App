# Authentication Setup

## Backend Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the backend directory with the following variables:
   ```
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   JWT_SECRET=your_jwt_secret_key_here
   PORT=3001
   NODE_ENV=development
   ```

3. **Database Schema**
   Make sure your Supabase database has the following columns in the `users` table:
   - `id` (uuid, primary key)
   - `email` (text, unique)
   - `full_name` (text)
   - `password_hash` (text)
   - `dietary_preference` (text, nullable)
   - `theme_preference` (text, default: 'light')
   - `notifications_enabled` (boolean, default: true)
   - `reset_token` (text, nullable)
   - `reset_token_expires` (timestamp, nullable)
   - `created_at` (timestamp, default: now())

4. **Start the Server**
   ```bash
   npm run dev
   ```

## Frontend Setup

1. **Install Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

## Authentication Flow

1. **Welcome Screen** (`/auth`) - Users choose to sign in or create account
2. **Login Screen** (`/auth/login`) - Existing users sign in
3. **Register Screen** (`/auth/register`) - New users create account
4. **Forgot Password** (`/auth/forget`) - Users reset their password

## API Endpoints

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/forgot-password` - Send password reset email
- `POST /api/v1/auth/reset-password` - Reset password with token
- `GET /api/v1/auth/verify` - Verify JWT token

## Features

- ✅ User registration with email and password
- ✅ User login with JWT token generation
- ✅ Password hashing with bcrypt
- ✅ Forgot password functionality
- ✅ Password reset with secure tokens
- ✅ Token-based authentication middleware
- ✅ Protected routes
- ✅ Modern UI with theme support
- ✅ Form validation
- ✅ Error handling
- ✅ AsyncStorage for token persistence

## Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT tokens with expiration (7 days)
- Secure password reset tokens (1 hour expiration)
- Input validation with Zod schemas
- CORS enabled
- Error messages that don't reveal sensitive information 