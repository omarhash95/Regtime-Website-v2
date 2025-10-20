# Complete Setup Instructions

Your Supabase project is configured with:
- **URL**: https://nzjmhnesxjijfwloqouc.supabase.co
- **Anon Key**: Already configured in `.env`

Follow these steps to complete the setup:

---

## Step 1: Apply Database Migration (2 minutes)

### Option A: Using Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/nzjmhnesxjijfwloqouc
   - Login with your Supabase account

2. **Navigate to SQL Editor**
   - In the left sidebar, click **"SQL Editor"**
   - Click **"New Query"**

3. **Copy and Paste the Migration**
   - Open the file: `/tmp/regtime_schema.sql`
   - Copy ALL the contents (it's a long file ~600 lines)
   - Paste into the SQL Editor

4. **Run the Migration**
   - Click **"Run"** button (or press Cmd/Ctrl + Enter)
   - Wait for completion (should take 5-10 seconds)
   - You should see "Success. No rows returned" or similar

5. **Verify Tables Were Created**
   - In left sidebar, click **"Table Editor"**
   - You should see these new tables:
     - users_profile
     - properties
     - projects
     - compliance_records
     - project_milestones
     - project_team_members
     - project_activities

---

## Step 2: Create Admin User (1 minute)

### In Supabase Dashboard:

1. **Navigate to Authentication**
   - In left sidebar, click **"Authentication"**
   - Click **"Users"** tab

2. **Add New User**
   - Click **"Add User"** button (top right)
   - Select **"Create new user"**

3. **Enter User Details**
   - **Email**: `admin@regtime.com`
   - **Password**: `password`
   - **Auto Confirm User**: ✅ Check this box
   - Click **"Create User"**

4. **Copy the User ID**
   - After creation, you'll see the user in the list
   - Click on the user to view details
   - **Copy the User ID (UUID)** - it looks like: `550e8400-e29b-41d4-a716-446655440000`
   - You'll need this in the next step!

---

## Step 3: Create User Profile (30 seconds)

### In Supabase Dashboard:

1. **Go Back to SQL Editor**
   - Click **"SQL Editor"** in left sidebar
   - Click **"New Query"**

2. **Run This SQL** (replace YOUR_USER_ID with the UUID you copied):

```sql
INSERT INTO users_profile (id, email, username, first_name, last_name, role)
VALUES (
  'YOUR_USER_ID_HERE',  -- Paste the UUID you copied from Step 2
  'admin@regtime.com',
  'admin',
  'Admin',
  'User',
  'admin'
);
```

3. **Execute**
   - Click **"Run"**
   - You should see "Success. 1 rows affected" or similar

4. **Verify**
   - Go to **"Table Editor"** → **"users_profile"**
   - You should see your admin user row

---

## Step 4: Test the Application (1 minute)

### Start Development Server:

```bash
npm run dev
```

### Test Login:

1. **Open Your Browser**
   - Navigate to: http://localhost:3000

2. **Click Login or Go to Login Page**
   - Click any "Sign In" button, or
   - Go directly to: http://localhost:3000/auth/login

3. **Login with Admin Credentials**
   - **Username**: `admin` (or `admin@regtime.com`)
   - **Password**: `password`
   - Click **"Sign In"**

4. **Verify Redirect**
   - You should be redirected to: http://localhost:3000/dashboard
   - You should see the dashboard with metrics and navigation

---

## Step 5: Verify Dashboard Features (2 minutes)

### Test Each Dashboard Page:

1. **Dashboard Home** (you're already here)
   - Should see: metrics cards, quick actions, recent activity

2. **Projects** (click in sidebar)
   - Should see: sample projects with progress bars
   - URL: http://localhost:3000/dashboard/projects

3. **Property Search** (click in sidebar)
   - Should see: BBL and Address search tabs
   - URL: http://localhost:3000/dashboard/property-search

4. **FAR Calculator** (click in sidebar)
   - Should see: input fields for lot size and FAR ratio
   - URL: http://localhost:3000/dashboard/far-calculator

5. **Project Management** (click in sidebar)
   - Should see: milestone tracking with status badges
   - URL: http://localhost:3000/dashboard/project-management

6. **Import/Export** (click in sidebar)
   - Should see: upload and download interfaces
   - URL: http://localhost:3000/dashboard/import-export

7. **Help** (click in sidebar)
   - Should see: FAQ and support resources
   - URL: http://localhost:3000/dashboard/help

### Test Logout:

1. **Click User Icon** at bottom of sidebar
2. **Click "Sign Out"**
3. **Verify Redirect** to homepage

### Test Protected Routes:

1. **While Logged Out**, try to access: http://localhost:3000/dashboard
2. **Should Redirect** to: http://localhost:3000/auth/login
3. **This confirms** middleware is protecting routes correctly

---

## Troubleshooting

### Can't Login?

**Check these:**
- ✅ User exists in Supabase Auth (Authentication → Users)
- ✅ User profile exists in users_profile table (Table Editor → users_profile)
- ✅ Password is correct: `password`
- ✅ Browser console shows no errors (F12 → Console)

**Common fixes:**
- Clear browser cookies and try again
- Check `.env` has correct Supabase URL and key
- Restart dev server: `npm run dev`

### Database Errors?

**Check these:**
- ✅ Migration ran successfully in SQL Editor
- ✅ All 7 tables exist (Table Editor)
- ✅ RLS is enabled on all tables

**Common fixes:**
- Re-run the migration from `/tmp/regtime_schema.sql`
- Check Supabase logs: Project Settings → Logs

### Page Not Found (404)?

**Check these:**
- ✅ Dev server is running: `npm run dev`
- ✅ No build errors in terminal
- ✅ URL is correct (check for typos)

**Common fixes:**
- Restart dev server
- Clear `.next` folder: `rm -rf .next && npm run dev`

### Blank Pages or No Styling?

**Check these:**
- ✅ Browser console for errors (F12)
- ✅ CSS is loading (check Network tab)
- ✅ Tailwind is configured correctly

**Common fixes:**
- Hard refresh: Cmd/Ctrl + Shift + R
- Clear browser cache
- Restart dev server

---

## Quick Reference

### URLs
- **Homepage**: http://localhost:3000
- **Login**: http://localhost:3000/auth/login
- **Dashboard**: http://localhost:3000/dashboard
- **Supabase Project**: https://supabase.com/dashboard/project/nzjmhnesxjijfwloqouc

### Credentials
- **Username**: `admin` or `admin@regtime.com`
- **Password**: `password`

### Files
- **Migration SQL**: `/tmp/regtime_schema.sql`
- **Environment**: `.env` (already configured)
- **Documentation**:
  - `QUICK_START.md`
  - `MIGRATION_COMPLETE.md`
  - `DATABASE_SETUP.md`

### Commands
- **Install**: `npm install`
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Production**: `npm run start`

---

## Success Checklist

- [ ] Database migration applied successfully
- [ ] All 7 tables visible in Supabase Table Editor
- [ ] Admin user created in Supabase Auth
- [ ] Admin user profile created in users_profile table
- [ ] Dev server running without errors
- [ ] Can login with admin credentials
- [ ] Dashboard loads and shows metrics
- [ ] All 7 dashboard pages accessible
- [ ] Logout redirects to homepage
- [ ] Protected routes redirect to login when logged out

---

## Next Steps After Setup

1. **Change Admin Password**
   - Go to dashboard
   - Update password from default

2. **Create Sample Data** (Optional)
   - Add test projects
   - Add test properties
   - Explore features

3. **Connect NYC Open Data API** (Optional)
   - Add API keys to `.env`
   - See `.env.local.example` for variables

4. **Deploy to Production**
   - Follow `DEPLOYMENT_CHECKLIST.md`
   - Deploy to Vercel/Netlify
   - Configure production environment

5. **Invite Team Members**
   - Add users in Supabase Auth
   - Create user profiles
   - Assign to projects

---

## Support

If you encounter any issues not covered here:

1. Check browser console for errors (F12)
2. Check Supabase logs in dashboard
3. Review documentation files
4. Check that all environment variables are set

**Having trouble?** The most common issues are:
- Migration not applied completely
- User profile not created
- Environment variables missing
- Browser cache issues

---

**Ready to start?** Begin with Step 1 above!
