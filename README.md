# MeddyCare - Care Marketplace Platform

MeddyCare is a cutting-edge care marketplace connecting families with qualified self-employed carers. As an introductory agency, we facilitate meaningful connections while maintaining the highest standards of service quality.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn
- PostgreSQL (via Supabase)
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/meddycare.git
cd meddycare

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
meddycare/
├── app/                      # Next.js 16 App Router
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── care-requests/  # Care request management
│   │   ├── applications/   # Carer applications
│   │   └── ...
│   ├── dashboard/          # User dashboards
│   │   ├── family/        # Family portal
│   │   └── carer/         # Carer portal
│   ├── login/             # Login pages
│   └── ...
├── components/            # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                   # Utility libraries
│   ├── prisma.ts         # Prisma client
│   ├── supabase-auth.ts  # Supabase authentication
│   ├── api-auth.ts       # API authentication helpers
│   └── matching.ts       # Matching algorithm
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
├── scripts/              # Utility scripts
└── styles/              # Global styles
```

## 🔐 Authentication

MeddyCare uses **Supabase Authentication** for secure user management.

### User Roles
- **Family**: Post care requests, view matches, hire carers
- **Carer**: Browse jobs, apply to requests, manage placements
- **Admin**: Platform administration (future)

### Authentication Flow
1. User signs up via `/api/auth/signup`
2. Supabase creates auth user
3. Prisma stores user profile
4. Login returns JWT access token
5. Client stores token in localStorage
6. API routes verify token via Supabase

## 🗄️ Database

### Technology
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Connection**: Pooled (production) + Direct (migrations)

### Key Entities
- **User**: Authentication & profiles
- **Family / Carer**: Role-specific data
- **CareRequest**: Family care needs
- **Match**: System-generated matches
- **CarePlacement**: Active care arrangements
- **CareLog**: Daily care tracking

### Running Migrations

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply to production
npx prisma migrate deploy

# Open Prisma Studio
npx prisma studio
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma generate  # Generate Prisma client
npx prisma migrate dev  # Create & apply migration
npx prisma studio    # Open database GUI

# Testing
npm run test         # Run tests
npm run test:watch   # Watch mode
```

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for Next.js
- **Prettier**: Auto-formatting on save
- **Naming**:
  - Components: PascalCase
  - Files: kebab-case
  - Hooks: camelCase with 'use' prefix

## 🔒 Security

### Production Security Headers
✅ Configured in `next.config.ts`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security
- Permissions-Policy
- Referrer-Policy

### Best Practices
- ✅ Server-side authentication verification
- ✅ Role-based access control
- ✅ Parameterized queries (Prisma)
- ✅ Connection pooling
- ⏳ Rate limiting (planned)
- ⏳ CSRF protection (planned)

## 📦 API Routes

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Care Requests
- `GET /api/care-requests` - List requests
- `POST /api/care-requests` - Create request

### Applications
- `GET /api/applications` - Carer applications
- `POST /api/applications` - Apply to job

### Jobs
- `GET /api/jobs` - Available jobs for carers

See [TECHNICAL_ARCHITECTURE.md](./TECHNICAL_ARCHITECTURE.md) for complete API documentation.

## 🌐 Environment Variables

### Required Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Database
DATABASE_URL=postgresql://xxx@xxx.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://xxx@db.xxx.supabase.co:5432/postgres

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Copy `.env.example` and fill in your values.

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import project to Vercel
   - Connect GitHub repository

2. **Configure Environment**
   - Add all environment variables
   - Set build command: `npx prisma generate && next build`

3. **Deploy**
   - Push to main branch
   - Auto-deploys on every commit

### Manual Deployment

```bash
# Build application
npm run build

# Start production server
npm start
```

## 📊 Monitoring

### Development
```bash
# View logs
npm run dev

# Database GUI
npx prisma studio
```

### Production
- Vercel Analytics: Automatic
- Supabase Dashboard: Database metrics
- Error tracking: Sentry (planned)

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push branch: `git push origin feature/amazing-feature`
4. Open Pull Request

### Commit Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Maintenance

## 📝 Documentation

- [Technical Architecture](./TECHNICAL_ARCHITECTURE.md) - System design & architecture
- [API Documentation](./docs/API.md) - Complete API reference (planned)
- [Database Schema](./docs/DATABASE.md) - Data model documentation (planned)

## 🐛 Troubleshooting

### Common Issues

**Authentication Errors**
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Check token expiry (7 days default)

**Database Connection**
- Ensure connection pooler URL is correct
- Use DIRECT_URL for migrations only

**Build Errors**
- Run `npx prisma generate` before building
- Clear `.next` folder: `rm -rf .next`

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/meddycare/issues)
- **Email**: hello@meddycare.com
- **Documentation**: [Technical Docs](./TECHNICAL_ARCHITECTURE.md)

## 📄 License

Proprietary - All Rights Reserved © 2025 MeddyCare

---

**Built with** ❤️ **by the MeddyCare Team**

*Connecting families with compassionate carers*
