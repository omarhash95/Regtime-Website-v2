# Database Setup Instructions

## Overview
This document provides instructions for setting up the Supabase database schema and creating the admin user.

## Prerequisites
- Supabase project created and configured in `.env` file
- Supabase CLI installed (optional, for local development)

## Database Schema Migration

The database schema is defined in `/tmp/regtime_schema.sql`. It includes:

- **users_profile**: Extended user profiles linked to Supabase auth
- **properties**: NYC property data with zoning information
- **projects**: Development project tracking
- **compliance_records**: Zoning and regulatory compliance
- **project_milestones**: Project timeline milestones
- **project_team_members**: Team member assignments
- **project_activities**: Activity logging

## Applying the Migration

### Option 1: Supabase Dashboard (Recommended)
1. Log in to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `/tmp/regtime_schema.sql`
4. Paste into the SQL Editor and run the migration

### Option 2: Supabase CLI
```bash
supabase db push
```

## Creating the Admin User

### Step 1: Sign Up via Supabase Auth
1. Navigate to your Supabase project dashboard
2. Go to Authentication > Users
3. Click "Add User"
4. Create a user with:
   - Email: `admin@regtime.com`
   - Password: `password` (or your preferred password)
5. Note the User ID (UUID)

### Step 2: Create User Profile
In the SQL Editor, run:

```sql
INSERT INTO users_profile (id, email, username, first_name, last_name, role)
VALUES (
  'YOUR_USER_ID_HERE',
  'admin@regtime.com',
  'admin',
  'Admin',
  'User',
  'admin'
);
```

## Login Credentials

After setup, you can log in with:
- **Username/Email**: `admin` or `admin@regtime.com`
- **Password**: `password` (or the password you set)

## Security Notes

1. Change the default admin password immediately after first login
2. All tables have Row Level Security (RLS) enabled
3. Users can only access their own data or projects they're assigned to
4. Admin users have elevated permissions via the `user_role` enum

## Troubleshooting

### Migration Errors
- If you encounter "already exists" errors, the migration is idempotent and safe to re-run
- Check that the `uuid-ossp` extension is enabled

### Authentication Issues
- Verify that the Supabase URL and anon key are correct in `.env`
- Check that the user exists in Supabase Auth
- Ensure the user profile was created in `users_profile` table

## Next Steps

1. Apply the database migration
2. Create the admin user
3. Log in to the application at `/auth/login`
4. Navigate to `/dashboard` to access the application
