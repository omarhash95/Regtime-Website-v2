# Regtime Builder

A comprehensive platform for affordable housing development, combining marketing site with authenticated project management tools. Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## 🎯 Platform Overview

**Regtime Builder** is a dual-purpose application:
- **Public Marketing Site**: Modern, professional website showcasing Regtime's services
- **Authenticated Dashboard**: Full-featured project management tools for NYC affordable housing development

## 🚀 Features

### Public Website
- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Brand Integration**: Complete Regtime brand asset implementation
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Analytics Ready**: Google Analytics 4 and HubSpot tracking integration
- **Lead Generation**: HubSpot form integration
- **Performance Optimized**: Optimized images and fonts
- **Accessibility**: WCAG AA compliant with proper semantic markup
- **SEO Optimized**: Complete meta tags, Open Graph, and structured data

### Authenticated Dashboard
- **Supabase Authentication**: Secure email/password authentication
- **Project Management**: Track development projects with milestones
- **Property Search**: Search NYC properties by BBL or address
- **FAR Calculator**: Calculate floor area ratio for development
- **Compliance Tracking**: Monitor zoning and regulatory compliance
- **Team Collaboration**: Multi-user projects with role-based access
- **Data Import/Export**: Excel integration for bulk operations
- **Real-time Updates**: Live data synchronization across users

## 📁 Project Structure

```
├── app/
│   ├── (dashboard)/            # Protected dashboard routes
│   │   ├── dashboard/          # Main dashboard
│   │   │   ├── projects/       # Project management
│   │   │   ├── property-search/
│   │   │   ├── far-calculator/
│   │   │   ├── project-management/
│   │   │   ├── import-export/
│   │   │   └── help/
│   │   └── layout.tsx          # Dashboard layout with AppShell
│   ├── (site)/                 # Public marketing pages
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── contact/page.tsx
│   │   └── privacy/page.tsx
│   ├── api/                    # API routes
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── properties/
│   ├── auth/login/             # Login page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── app/                    # Dashboard components
│   │   └── AppShell.tsx        # Navigation shell
│   ├── brand/                  # Brand components
│   ├── sections/               # Page sections
│   └── ui/                     # Reusable UI components
├── lib/
│   ├── auth/                   # Authentication
│   │   └── AuthProvider.tsx
│   ├── supabase/               # Database clients
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils.ts
├── public/
│   ├── fonts/                  # Aspekta font family
│   └── [brand assets]
├── middleware.ts               # Route protection
└── [config files]
```

## 🎨 Brand Implementation

### Fonts
- **Aspekta**: Primary brand font loaded via `next/font/local`
- **Weights**: 300, 400, 500, 600, 700
- **CSS Variables**: `--font-aspekta` applied globally

### Colors (Tailwind Tokens)
- `brand.primary`: #4A90E2 (Alice Blue)
- `brand.secondary`: #5F9EA0 (Cadet)
- `brand.accent`: #F0E68C (Maize)
- `brand.night`: #2C3E50 (Night)

### Logo Usage
- **Header**: Lockup Alice Blue (32px desktop, 24px mobile)
- **Footer**: Lockup White on dark background
- **Favicon**: IconMark Alice Blue
- **Social/OG**: IconMark Alice Blue

## 🔧 Environment Variables

See `.env.local.example` for all available options. Required variables:

```env
# Supabase (Required for dashboard)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=48321391

# NYC Open Data API (Optional, for property search)
NYC_OPEN_DATA_APP_TOKEN=your_app_token
NYC_GEOCLIENT_SUBSCRIPTION_KEY=your_geoclient_key
```

## 🚀 Getting Started

### Quick Start (5 minutes)
See [QUICK_START.md](./QUICK_START.md) for detailed setup instructions.

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up database**:
   - Apply migration from `/tmp/regtime_schema.sql` to your Supabase project
   - See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for details

3. **Create admin user**:
   - Create user in Supabase Auth: `admin@regtime.com` / `password`
   - Insert profile into `users_profile` table
   - See [QUICK_START.md](./QUICK_START.md) for SQL commands

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Login to dashboard**:
   - Navigate to http://localhost:3000/auth/login
   - Login with username: `admin`, password: `password`
   - Access dashboard at http://localhost:3000/dashboard

6. **Build for production**:
   ```bash
   npm run build
   ```

## 📊 Performance

The website is optimized for:
- **Core Web Vitals**: Excellent LCP, FID, and CLS scores
- **SEO**: Complete meta tags and structured data
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized images, fonts, and code splitting

## 🔗 Pages

### Public Pages (No Authentication)
- **Home** (`/`): Hero, features, stats, and CTA sections
- **About** (`/about`): Company story, values, team, and stats
- **Services** (`/services`): Product offerings and pricing
- **Contact** (`/contact`): Contact forms and information
- **Marketplace** (`/marketplace`): Market overview
- **Privacy** (`/privacy`): Privacy policy and legal information

### Authenticated Pages (Dashboard)
- **Dashboard Home** (`/dashboard`): Overview, metrics, quick actions
- **Projects** (`/dashboard/projects`): Project management interface
- **Property Search** (`/dashboard/property-search`): NYC property search
- **FAR Calculator** (`/dashboard/far-calculator`): Floor area ratio calculator
- **Project Management** (`/dashboard/project-management`): Milestone tracking
- **Import/Export** (`/dashboard/import-export`): Data tools
- **Help** (`/dashboard/help`): FAQ and support

## 🔐 Authentication & Security

### Supabase Authentication
- Email/password authentication
- Session management with HTTPOnly cookies
- Automatic redirect for unauthenticated users
- Protected routes via middleware

### Database Security
- Row Level Security (RLS) on all tables
- Users can only access their own data
- Project-based access control
- Role-based permissions (admin, manager, architect, analyst, viewer)

### API Security
- All protected routes validate authentication
- Consistent JSON error responses
- No sensitive data in client code
- Type-safe API contracts

## 📱 Responsive Design

- **Mobile**: Optimized navigation and content layout
- **Tablet**: Balanced grid systems and typography
- **Desktop**: Full-featured layout with hover states
- **Breakpoints**: Tailwind's responsive system

## 🔍 SEO Features

- Complete meta tags and Open Graph
- Structured data markup
- Semantic HTML structure
- Optimized images with alt text
- Clean URL structure

## 🛠️ Development

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Component-based architecture
- Comprehensive documentation

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State**: React Context API
- **Data Fetching**: React Query ready
- **Icons**: Lucide React

### Performance
- Server-side rendering where appropriate
- Static page pre-rendering
- Image optimization
- Font optimization with `next/font`
- Lazy loading for heavy components

## 📈 Analytics

### Google Analytics 4
- Automatic page view tracking
- Event tracking ready
- Privacy-compliant implementation

### HubSpot Tracking
- Visitor identification
- Form submission tracking
- Lead scoring integration

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get up and running in 5 minutes
- **[MIGRATION_COMPLETE.md](./MIGRATION_COMPLETE.md)** - Full migration documentation
- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Database schema and setup
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Pre-deployment checklist
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Complete implementation details
- **[.env.local.example](./.env.local.example)** - Environment variable template

## 🗄️ Database Schema

The application uses Supabase (PostgreSQL) with the following tables:
- **users_profile**: Extended user profiles
- **properties**: NYC property data
- **projects**: Development projects
- **compliance_records**: Compliance tracking
- **project_milestones**: Timeline milestones
- **project_team_members**: Team assignments
- **project_activities**: Activity logging

All tables have Row Level Security (RLS) enabled. See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for details.

## 🔑 Default Credentials

**Username**: `admin`
**Password**: `password`

⚠️ **Important**: Change the default password immediately after first login!

## 🚀 Deployment

The application is ready for deployment to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- Any Node.js hosting platform

Build command: `npm run build`
Start command: `npm run start`

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for complete deployment guide.

## 📄 License

This project is proprietary to Regtime. All rights reserved.