# Quick Start Guide

Get up and running with Regtime Builder in 5 minutes.

## Prerequisites
- Node.js 18+ installed
- Supabase project created (already configured in `.env`)

## Step 1: Install Dependencies (30 seconds)
```bash
npm install
```

## Step 2: Apply Database Migration (2 minutes)

### Option A: Using Supabase Dashboard (Recommended)
1. Open your Supabase project dashboard
2. Navigate to: **SQL Editor**
3. Copy the contents of `/tmp/regtime_schema.sql`
4. Paste into SQL Editor and click **Run**

### Option B: Using SQL File
```bash
# If you have psql installed
psql $DATABASE_URL < /tmp/regtime_schema.sql
```

## Step 3: Create Admin User (1 minute)

### In Supabase Dashboard:
1. Go to **Authentication** → **Users**
2. Click **"Add User"**
3. Enter:
   - Email: `admin@regtime.com`
   - Password: `password`
4. Click **"Create User"**
5. **Copy the User ID** (UUID)

### Create User Profile:
In **SQL Editor**, run (replace `YOUR_USER_ID`):
```sql
INSERT INTO users_profile (id, email, username, first_name, last_name, role)
VALUES (
  'YOUR_USER_ID',  -- Paste the UUID from step 4
  'admin@regtime.com',
  'admin',
  'Admin',
  'User',
  'admin'
);
```

## Step 4: Start Development Server (10 seconds)
```bash
npm run dev
```

## Step 5: Login (30 seconds)
1. Open browser to: http://localhost:3000
2. Click **"Sign In"** or go to: http://localhost:3000/auth/login
3. Enter:
   - Username: `admin`
   - Password: `password`
4. Click **"Sign In"**

**You're in!** 🎉

## What You'll See

### Dashboard Home
- Project metrics and stats
- Quick action cards
- Recent activity feed

### Available Tools
- **Projects** - Manage development projects
- **Property Search** - Search NYC properties by BBL or address
- **FAR Calculator** - Calculate floor area ratio
- **Project Management** - Track milestones and timelines
- **Import/Export** - Upload/download data
- **Help** - FAQ and documentation

## Next Steps

### 1. Explore the Dashboard
Navigate through the sidebar to explore all features.

### 2. Test Property Search
- Go to **Property Search**
- Try BBL: `1-00123-0001` (sample format)
- Or enter an NYC address

### 3. Create a Project
- Go to **Projects**
- Click **"New Project"**
- Fill in project details
- Start tracking milestones

### 4. Customize
- Update brand colors in `tailwind.config.ts`
- Modify dashboard cards in `/app/(dashboard)/dashboard/page.tsx`
- Add new features in `/app/(dashboard)/dashboard/[feature]/page.tsx`

## Troubleshooting

### Login Not Working?
- Check `.env` has correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Verify user exists in Supabase Auth dashboard
- Ensure user profile was created in `users_profile` table

### Database Errors?
- Confirm migration was applied successfully
- Check Supabase logs in dashboard
- Verify RLS policies are enabled

### Build Errors?
```bash
rm -rf .next node_modules
npm install
npm run build
```

## File Locations

- **Login Page**: `/app/auth/login/page.tsx`
- **Dashboard Layout**: `/app/(dashboard)/layout.tsx`
- **Dashboard Home**: `/app/(dashboard)/dashboard/page.tsx`
- **Navigation Shell**: `/components/app/AppShell.tsx`
- **Auth Logic**: `/lib/auth/AuthProvider.tsx`
- **Middleware**: `/middleware.ts`
- **API Routes**: `/app/api/`

## Default Credentials

**Username**: `admin`
**Password**: `password`

⚠️ **Security Note**: Change the password immediately after first login in production!

## Production Deployment

When ready to deploy:

```bash
npm run build
```

Then deploy the `.next` folder to:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

## Need Help?

- 📖 See `MIGRATION_COMPLETE.md` for full documentation
- 🗄️ See `DATABASE_SETUP.md` for database details
- 🔧 Check `/components/app/` for dashboard code
- 🌐 Check `/app/api/` for API endpoints

---

**Estimated Setup Time**: 5 minutes
**Difficulty**: Easy
**Prerequisites**: Supabase account
