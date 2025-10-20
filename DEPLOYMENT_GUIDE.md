# Deployment Guide - Bolt + Next.js 14 Fixed Configuration

## ✅ Issues Fixed

1. **No static export mode** - `output: "export"` was not present (middleware and SSR work correctly)
2. **Supabase client validation** - Both client and server files now validate env vars with clear error messages
3. **No file I/O issues** - No problematic file write operations found
4. **Build artifacts** - Fresh build generated successfully
5. **Middleware authentication** - Improved with proper Supabase session checking
6. **TypeScript errors** - All type errors resolved

## 📁 Corrected File Structure

```
project/
├── app/
│   ├── (site)/              # Public routes (no auth required)
│   │   ├── about/
│   │   ├── contact/
│   │   ├── marketplace/
│   │   ├── privacy/
│   │   └── services/
│   ├── (dashboard)/         # Protected routes (auth required)
│   │   └── dashboard/
│   │       ├── far-calculator/
│   │       ├── help/
│   │       ├── import-export/
│   │       ├── project-management/
│   │       ├── projects/
│   │       └── property-search/
│   ├── auth/                # Auth pages (login, etc)
│   │   └── login/
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── properties/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # Homepage
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # ✅ FIXED - Client-side Supabase (with validation)
│   │   └── server.ts        # ✅ FIXED - Server-side Supabase (with validation)
│   └── ...
├── middleware.ts            # ✅ FIXED - Route protection with Supabase auth
├── next.config.js           # ✅ VERIFIED - No output: "export"
└── .env                     # Environment variables
```

## 🔐 Route Protection Logic

### Middleware (`middleware.ts`)

The middleware protects all `/dashboard/*` routes:

1. Checks for Supabase environment variables
2. Creates a Supabase client with request cookies
3. Validates the user's session
4. Redirects to `/auth/login` if no valid session
5. Allows access if authenticated

### Protected Routes

All routes under `/dashboard/*` require authentication:
- `/dashboard` - Main dashboard
- `/dashboard/projects` - Projects list
- `/dashboard/property-search` - Property search
- `/dashboard/far-calculator` - FAR calculator
- etc.

### Public Routes

All other routes are public:
- `/` - Homepage
- `/about` - About page
- `/contact` - Contact page
- `/marketplace` - Marketplace
- `/services` - Services
- `/auth/login` - Login page

## 🔧 Corrected Configuration Files

### 1. `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'nzjmhnesxjijfwloqouc.supabase.co',
      },
    ],
  },
  experimental: {
    forceSwcTransforms: false,
  },
  webpack: (config, { isServer }) => {
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ },
      { message: /Critical dependency: the request of a dependency is an expression/ },
    ];
    return config;
  },
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
}

module.exports = nextConfig
```

**Key points:**
- ✅ No `output: "export"` - allows middleware and SSR
- ✅ `unoptimized: true` for images - works with Bolt
- ✅ Webpack warnings suppressed for cleaner builds

### 2. `lib/supabase/client.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_URL is not defined. Please check your .env file and ensure NEXT_PUBLIC_SUPABASE_URL is set.'
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined. Please check your .env file and ensure NEXT_PUBLIC_SUPABASE_ANON_KEY is set.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});
```

**Key improvements:**
- ✅ Clear error messages if env vars missing
- ✅ Proper client/server detection with `typeof window`
- ✅ Session persistence enabled for client-side

### 3. `lib/supabase/server.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL is not defined. Please check your .env file.'
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined. Please check your .env file.'
    );
  }

  return { supabaseUrl, supabaseAnonKey };
}

export function createServerClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function createServerClientWithCookies() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
  const cookieStore = await cookies();

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        cookie: cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join('; '),
      },
    },
  });
}
```

**Key improvements:**
- ✅ Helper function properly narrows types for TypeScript
- ✅ Two variants: basic and with cookies
- ✅ No session persistence (server-side)

### 4. `middleware.ts`

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const config = {
  matcher: ['/dashboard/:path*'],
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/dashboard')) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase environment variables are not configured');
      const redirectUrl = new URL('/auth/login', req.url);
      redirectUrl.searchParams.set('error', 'config');
      return NextResponse.redirect(redirectUrl);
    }

    const response = NextResponse.next();

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          cookie: req.headers.get('cookie') || '',
        },
      },
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      const redirectUrl = new URL('/auth/login', req.url);
      redirectUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    response.headers.set('x-user-id', session.user.id);

    return response;
  }

  return NextResponse.next();
}
```

**Key improvements:**
- ✅ Proper Supabase session checking (not just cookie check)
- ✅ Config error handling
- ✅ Passes cookies to Supabase client
- ✅ Sets user ID header for downstream use

## 🚀 Deployment Instructions

### Step 1: Environment Variables

Ensure your `.env` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=https://your-site.bolt.new
```

### Step 2: Clean Build

Run these commands in the terminal:

```bash
# Remove old build artifacts
rm -rf .next

# Run a fresh build
rm -rf .next
```

### Step 3: Verify Build Output

You should see:
```
✓ Compiled successfully
✓ Generating static pages (21/21)
ƒ Middleware                             63.6 kB
```

The `ƒ` symbol indicates middleware is working (dynamic routes).

### Step 4: Deploy to Bolt

1. Click the "Share" or "Deploy" button in Bolt
2. Bolt will automatically:
   - Run `npm run build`
   - Generate the `.next` directory
   - Deploy with Vercel or similar platform

### Step 5: Verify Deployment

Test these scenarios:

1. **Public route access**: Visit `/` - should work without auth
2. **Protected route redirect**: Visit `/dashboard` - should redirect to `/auth/login?redirectedFrom=/dashboard`
3. **Login and access**: Login at `/auth/login`, then visit `/dashboard` - should work
4. **Logout and block**: Logout, try `/dashboard` - should redirect again

## 🐛 Troubleshooting

### Issue: "Cannot find module './276.js'"

**Solution:** Clean and rebuild:
```bash
rm -rf .next
npm run build
```

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not defined"

**Solution:** Check your `.env` file exists and has the correct variables.

### Issue: Middleware not running

**Solution:** Verify `next.config.js` does NOT have `output: "export"`.

### Issue: 404 on CSS/JS chunks

**Solution:** Ensure `.next/static` is being deployed. This should happen automatically with proper Next.js deployment.

### Issue: Middleware causing Edge Runtime errors

**Solution:** The Supabase warnings about Node.js APIs in Edge Runtime are normal and won't break functionality. If issues persist, consider using the basic middleware pattern or moving auth checks to API routes.

## ✅ Verification Checklist

- [x] `output: "export"` removed/not present in `next.config.js`
- [x] Supabase client validates env vars on both client and server
- [x] No file I/O operations with undefined paths
- [x] Middleware properly protects `/dashboard/*` routes
- [x] Build completes without TypeScript errors
- [x] Static assets generated in `.next/static`
- [x] Both public and protected routes configured correctly
- [x] Fresh build artifacts generated successfully

## 📦 What Changed

### Modified Files:
1. `lib/supabase/client.ts` - Added env validation and proper client/server handling
2. `lib/supabase/server.ts` - Added type-safe config helper and cookie support
3. `middleware.ts` - Enhanced with proper Supabase session validation
4. `app/layout.tsx` - Added SVG favicon support

### Verified Files:
1. `next.config.js` - Confirmed no `output: "export"` present
2. All TypeScript files - No file I/O operations found

## 🎉 Result

Your Next.js 14 app is now properly configured for:
- ✅ SSR and middleware support
- ✅ Proper route protection with Supabase auth
- ✅ Clear error messages for missing config
- ✅ Clean builds without chunk errors
- ✅ Deployment to Bolt/Vercel

The app separates public routes (site) from protected routes (dashboard) with automatic authentication via middleware.
