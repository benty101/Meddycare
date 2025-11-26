# MeddyCare Technical Architecture

## Table of Contents
1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Authentication System](#authentication-system)
4. [Database Architecture](#database-architecture)
5. [API Routes](#api-routes)
6. [Security](#security)
7. [Deployment](#deployment)

## System Overview

MeddyCare is a care marketplace platform connecting families with self-employed carers. The platform operates as an introductory agency and is not CQC regulated.

### Core Features
- **Dual-sided marketplace**: Family and carer portals
- **Smart matching algorithm**: AI-powered carer-family matching
- **Care management**: Logs, plans, health records
- **Real-time messaging**: In-platform communication
- **Application tracking**: Job applications and hiring workflow

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide icons
- **Fonts**: Fraunces (headings), Manrope (body)

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth

### Infrastructure
- **Hosting**: Vercel
- **Database**: Supabase (PostgreSQL + Connection Pooler)
- **Storage**: Supabase Storage
- **Email**: Supabase (SMTP)

## Authentication System

### Architecture
The platform uses **Supabase Authentication** for all user management.

#### Flow
1. **Sign Up**: `/api/auth/signup` → Creates Supabase auth user + Prisma user record
2. **Login**: `/api/auth/login` → Returns JWT access token
3. **API Calls**: Client sends `Bearer ${token}` in Authorization header
4. **Verification**: API routes use `lib/api-auth.ts` helpers

#### Key Files
- `lib/supabase-auth.ts` - Supabase auth functions
- `lib/api-auth.ts` - API route authentication helpers
- `app/api/auth/login/route.ts` - Login endpoint
- `app/api/auth/signup/route.ts` - Signup endpoint

#### Auth Helpers
```typescript
// For any authenticated user
const user = await requireAuth(req);
if (user instanceof NextResponse) return user;

// For role-specific routes
const user = await requireRole(req, ['family']);
if (user instanceof NextResponse) return user;
```

### Token Management
- **Client**: Stores token in `localStorage.setItem('token', data.token)`
- **API**: Verifies via `supabaseAdmin.auth.getUser(token)`
- **Expiry**: 7 days (configured in Supabase)

## Database Architecture

### Connection Strategy
```
DATABASE_URL → Supabase Connection Pooler (port 6543)
DIRECT_URL → Direct connection (port 5432) for migrations
```

### Schema Overview

#### Core Tables
- **User**: Base authentication table
- **Family**: Family member profiles
- **Carer**: Carer profiles with specializations
- **CareRecipient**: Care recipients (elderly, disabled, etc.)

#### Matching System
- **CareRequest**: Family care requests
- **Match**: System-generated matches
- **CarerApplication**: Carer applications to requests
- **CarePlacement**: Active care arrangements

#### Care Management
- **CareLog**: Daily care activity logs
- **CarePlan**: Care plans per placement
- **HealthRecord**: Health data tracking

#### Communication
- **Message**: Direct messages between users
- **Notification**: System notifications

### Key Relationships
```
User (1) → (1) Family
User (1) → (1) Carer
Family (1) → (M) CareRecipient
Family (1) → (M) CareRequest
CareRequest (1) → (M) Match
CareRequest (1) → (M) CarerApplication
Match (1) → (1) CarePlacement (when hired)
```

## API Routes

### Authentication (`/api/auth/*`)
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Care Requests (`/api/care-requests/*`)
- `GET /api/care-requests` - List family's requests
- `POST /api/care-requests` - Create new request
- `GET /api/care-requests/[id]/matches` - View matches

### Applications (`/api/applications/*`)
- `GET /api/applications` - Carer's applications
- `POST /api/applications` - Apply to request

### Jobs (`/api/jobs`)
- `GET /api/jobs` - Available jobs for carers

### Care Management
- `GET /api/care-logs` - View care logs
- `POST /api/care-logs` - Create care log
- `GET /api/care-plans` - View care plan
- `POST /api/care-plans` - Update care plan
- `GET /api/health-records` - View health records
- `POST /api/health-records` - Add health record

### Messaging (`/api/inbox/*`)
- `GET /api/inbox/messages/[userId]` - Conversation with user
- `POST /api/inbox/messages` - Send message
- `GET /api/inbox/notifications` - User notifications

### User Profile
- `GET /api/user/profile` - Get user profile with stats

## Security

### Headers
All routes protected by security headers (configured in `next.config.ts`):
- **X-Frame-Options**: DENY (prevent clickjacking)
- **X-Content-Type-Options**: nosniff (prevent MIME sniffing)
- **Strict-Transport-Security**: Force HTTPS
- **Permissions-Policy**: Restrict browser features
- **Referrer-Policy**: Control referrer information

### Authentication Security
- **JWT tokens**: Issued by Supabase, verified server-side
- **Role-based access**: `requireRole()` helper enforces permissions
- **Token verification**: Every API call validates via Supabase Admin
- **No client trust**: All authorization done server-side

### Database Security
- **Connection pooling**: PgBouncer for production
- **Parameterized queries**: Prisma prevents SQL injection
- **Row-level security**: Supabase RLS (to be configured)

### Input Validation
- All API routes validate input
- Prisma schema enforces data types
- Email/password validation via Zod schemas

## Deployment

### Environment Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Database
DATABASE_URL=postgresql://xxx@xxx.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://xxx@db.xxx.supabase.co:5432/postgres

# App
NEXT_PUBLIC_APP_URL=https://meddycare.com
```

### Build Process
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Build application
npm run build

# Start production server
npm start
```

### Vercel Deployment
1. Connect GitHub repository
2. Add environment variables
3. Configure build command: `npx prisma generate && next build`
4. Deploy

### Database Migrations
```bash
# Create migration
npx prisma migrate dev --name migration_name

# Apply to production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

## Performance Optimizations

### Database
- ✅ Connection pooler for scalability
- ✅ Indexed foreign keys
- ✅ Efficient query patterns with Prisma

### Frontend
- ✅ Next.js Image optimization
- ✅ Font optimization (Fraunces, Manrope)
- ⏳ React Server Components (planned)
- ⏳ Route prefetching

### API
- ✅ Parallel data fetching
- ✅ Efficient Prisma includes
- ⏳ Response caching (planned)

## Monitoring & Debugging

### Logs
```bash
# View API logs
npm run dev

# Check Prisma queries
DATABASE_URL=xxx npx prisma studio
```

### Common Issues
1. **Auth errors**: Check `SUPABASE_SERVICE_ROLE_KEY` is set
2. **Database errors**: Verify connection pooler URL
3. **Migration errors**: Use `DIRECT_URL` for migrations

---

**Last Updated**: November 25, 2025
**Version**: 1.0.0
