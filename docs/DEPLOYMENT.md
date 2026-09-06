# Deployment Guide

Guide for deploying AI Career Roadmap to production.

## Prerequisites

- GitHub account with repository
- Heroku account (for backend)
- Vercel or Netlify account (for frontend)
- Domain name (optional)

## Production Checklist

- [ ] Update `.env` with production values
- [ ] Set `NODE_ENV=production` in backend
- [ ] Update `REACT_APP_API_URL` in frontend
- [ ] Test all API endpoints
- [ ] Optimize images and assets
- [ ] Set up error logging
- [ ] Configure CORS for production domain
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure monitoring and alerts

## Backend Deployment (Heroku)

### Step 1: Prepare for Deployment

Create `Procfile` in root directory:

```
web: cd server && npm install && npm start
```

### Step 2: Create Heroku App

```bash
heroku login
heroku create ai-career-roadmap
```

### Step 3: Set Environment Variables

```bash
heroku config:set JWT_SECRET=your_super_secret_key
heroku config:set NODE_ENV=production
heroku config:set PORT=5000
```

### Step 4: Deploy

```bash
git push heroku main
```

### Step 5: Verify Deployment

```bash
heroku logs --tail
heroku open
```

## Frontend Deployment (Vercel)

### Step 1: Configure Build Settings

In `client/package.json`, ensure build script exists:
```json
"scripts": {
  "build": "react-scripts build"
}
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Select `client` as root directory

### Step 3: Configure Environment Variables

In Vercel dashboard, add:
```
REACT_APP_API_URL=https://your-heroku-app.herokuapp.com/api
```

### Step 4: Deploy

Vercel will automatically deploy on push to `main` branch.

## Alternative: Docker Deployment

### Backend Dockerfile

Create `server/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Frontend Dockerfile

Create `client/Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Deploy with Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      JWT_SECRET: ${JWT_SECRET}
      PORT: 5000

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend
```

Deploy:
```bash
docker-compose up -d
```

## Environment Variables for Production

### Backend

```
PORT=5000
NODE_ENV=production
JWT_SECRET=your_very_secure_random_key_here_at_least_32_characters
DB_PATH=./database/career_roadmap.db
CORS_ORIGIN=https://your-frontend-domain.com
LOG_LEVEL=info
```

### Frontend

```
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_ENVIRONMENT=production
```

## Database Migration to Production

### Option 1: Use SQLite (Recommended for small apps)

Ensure database backup strategy:

```bash
# Create backup before deployment
cp database/career_roadmap.db database/career_roadmap.db.backup
```

### Option 2: Migrate to PostgreSQL

1. Create PostgreSQL database on cloud provider (AWS RDS, Heroku Postgres, etc.)
2. Update database connection in `server/database/init.js`
3. Run migration scripts
4. Update environment variables with database URL

## Monitoring & Logging

### Set Up Error Tracking

#### With Sentry

```bash
npm install @sentry/node @sentry/tracing
```

Add to `server.js`:

```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

app.use(Sentry.Handlers.errorHandler());
```

## Performance Optimization

### Enable Compression

```javascript
import compression from 'compression';

app.use(compression());
```

### Caching Headers

```javascript
app.use((req, res, next) => {
  if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico)$/)) {
    res.set('Cache-Control', 'public, max-age=31536000');
  }
  next();
});
```

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set secure headers (Helmet.js)
- [ ] Implement rate limiting
- [ ] Validate and sanitize inputs
- [ ] Use environment variables for secrets
- [ ] Keep dependencies updated
- [ ] Enable CORS properly
- [ ] Implement CSRF protection
- [ ] Use secure cookies
- [ ] Regular security audits

## Backup & Disaster Recovery

### Database Backups

```bash
# Daily backup script
cd server
cp database/career_roadmap.db database/backups/career_roadmap.db.$(date +%Y%m%d-%H%M%S)
```

### Configuration Backup

Store environment variables securely:
- Heroku: Use Config Vars
- Vercel: Use Environment Variables
- AWS: Use Secrets Manager

## Rollback Plan

If deployment fails:

```bash
# Heroku
heroku releases
heroku rollback v10  # Rollback to previous version

# Vercel
# Automatically keeps previous deployments
# Redeploy from previous commit if needed
```

## Monitoring URLs

- Backend Health Check: `GET https://your-api.com/api/health`
- Frontend: `https://your-frontend.com`
- Database Backups: Scheduled daily

## Support & Troubleshooting

Common deployment issues and solutions:

1. **Build fails on Heroku**
   - Check `Procfile` is in root directory
   - Verify Node version compatibility
   - Check `package.json` scripts

2. **Frontend can't connect to backend**
   - Verify `REACT_APP_API_URL` in Vercel
   - Check CORS settings in backend
   - Verify backend is running

3. **Database connection errors**
   - Check database path in `.env`
   - Verify database file permissions
   - Check database initialization

## Next Steps

After deployment:

1. Set up monitoring (Sentry, DataDog, etc.)
2. Configure automated backups
3. Set up SSL certificates
4. Configure custom domain
5. Set up CI/CD pipeline
6. Monitor performance metrics
7. Regular security audits
