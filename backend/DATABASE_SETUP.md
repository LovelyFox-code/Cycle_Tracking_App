# Database Setup Guide

This guide will help you set up your Supabase database and populate it with the initial data for your Women's Health app.

## Prerequisites

1. **Supabase Project**: Make sure you have a Supabase project set up
2. **Environment Variables**: Ensure your `.env` file has the correct Supabase credentials
3. **Node.js**: Make sure you have Node.js installed

## Quick Setup

### Option 1: Automated Setup (Recommended)

Run the full setup process which will guide you through each step:

```bash
cd backend
npm run setup:full
```

This will:
1. Show you the database schema to copy to Supabase
2. Wait for you to apply the schema
3. Check the database connection
4. Seed the database with all your existing data

### Option 2: Manual Setup

If you prefer to run each step manually:

#### Step 1: Set up the Database Schema

```bash
npm run setup:schema
```

This will display the SQL schema. Copy and paste it into your Supabase SQL Editor and run it.

#### Step 2: Verify Database Connection

```bash
npm run setup:check
```

This will test if your database connection is working properly.

#### Step 3: Seed the Database

```bash
npm run setup:seed
```

This will populate your database with all the existing data from your frontend data files.

## Database Schema Overview

The database includes the following tables:

### Content Tables
- **`cycle_phases`**: Menstrual cycle phases (menstrual, follicular, ovulation, luteal)
- **`workouts`**: Exercise routines with metadata
- **`recipes`**: Nutrition recipes with ingredients and instructions
- **`recovery_items`**: Recovery and wellness activities
- **`shop_categories`**: Product categories for the shop
- **`shop_items`**: Products available in the shop

### User Tables
- **`users`**: User profiles and preferences
- **`user_cycles`**: Individual user cycle tracking
- **`user_activities`**: Completed activities for points tracking
- **`user_goals`**: User-defined goals and progress

## Data Being Seeded

The seeding script will populate your database with:

### Cycle Phases (4 items)
- Menstrual phase with rest-focused recommendations
- Follicular phase with energy-building content
- Ovulation phase with peak performance guidance
- Luteal phase with mood and stress support

### Workouts (9 items)
- Various workout types: yoga, cardio, strength, HIIT, pilates
- Different intensity levels and cycle phase targeting
- Premium and free content options

### Recipes (7 items)
- Hormone-balancing breakfast options
- Anti-inflammatory lunch recipes
- Energy-boosting snacks
- Magnesium-rich dinners
- Brain food and meal prep guides

### Recovery Items (7 items)
- Meditation and breathing exercises
- Stretching routines
- Sleep hygiene practices
- Stress management techniques

### Shop Items (12 items)
- Supplements (multivitamins, iron, cycle balance)
- Apparel (leggings, sports bras, tank tops)
- Equipment (yoga mats, resistance bands, dumbbells)
- Wellness products (diffusers, heat pads, sleep masks)

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check your `.env` file has correct Supabase URL and anon key
   - Verify your Supabase project is active
   - Ensure your IP is not blocked by Supabase

2. **Schema Errors**
   - Make sure you're running the schema in the correct Supabase project
   - Check that the UUID extension is available in your Supabase instance
   - Verify you have the necessary permissions

3. **Seeding Errors**
   - Ensure the schema has been applied successfully
   - Check that all required tables exist
   - Verify the data format matches the expected schema

### Debugging Commands

```bash
# Check database connection
npm run setup:check

# View the schema without applying
npm run setup:schema

# Run seeding with verbose output
npm run seed
```

## Environment Variables

Make sure your `.env` file contains:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Next Steps

After successful seeding:

1. **Test the API**: Start your backend server and test the endpoints
2. **Update Frontend**: Modify your frontend to fetch data from the API instead of local files
3. **Add Authentication**: Implement user authentication and authorization
4. **Monitor Usage**: Set up logging and monitoring for your database

## API Endpoints

Once seeded, you can access your data through these endpoints:

- `GET /api/cycle-phases` - Get all cycle phases
- `GET /api/workouts` - Get all workouts
- `GET /api/recipes` - Get all recipes
- `GET /api/recovery` - Get all recovery items
- `GET /api/shop/categories` - Get shop categories
- `GET /api/shop/items` - Get shop items

## Support

If you encounter any issues:

1. Check the console output for specific error messages
2. Verify your Supabase project settings
3. Ensure all environment variables are correctly set
4. Check that your database has the necessary permissions

For additional help, refer to the Supabase documentation or your project's README files. 