# Deployment Checklist

## Pre-Deployment Setup

### ✅ Database Setup
- [ ] Apply database migration from `/tmp/regtime_schema.sql` to Supabase
- [ ] Verify all tables were created successfully
- [ ] Verify RLS policies are enabled
- [ ] Create admin user in Supabase Auth (email: admin@regtime.com)
- [ ] Insert admin user profile into `users_profile` table
- [ ] Test database connection from application

### ✅ Environment Variables
- [ ] Verify `.env` has correct Supabase URL
- [ ] Verify `.env` has correct Supabase anon key
- [ ] Add any production-specific environment variables
- [ ] Never commit `.env` to version control

### ✅ Authentication
- [ ] Test login with admin credentials
- [ ] Verify redirect to dashboard after login
- [ ] Test logout functionality
- [ ] Verify middleware protects dashboard routes
- [ ] Test unauthenticated access redirects to login

### ✅ Build Verification
- [ ] Run `npm run build` successfully
- [ ] Check build output for errors
- [ ] Verify all pages compiled
- [ ] Check bundle sizes are reasonable
- [ ] Test production build locally: `npm run start`

## Security Checklist

### 🔒 Authentication Security
- [ ] Change default admin password from "password"
- [ ] Verify session cookies are HTTPOnly
- [ ] Confirm middleware validates all dashboard routes
- [ ] Test that expired sessions redirect to login

### 🔒 Database Security
- [ ] Confirm RLS is enabled on all tables
- [ ] Test RLS policies block unauthorized access
- [ ] Verify users can only access their own data
- [ ] Test project team member access permissions

### 🔒 API Security
- [ ] All API routes validate authentication
- [ ] No sensitive data exposed in client code
- [ ] Error messages don't leak sensitive information
- [ ] CORS configured appropriately

### 🔒 Environment Security
- [ ] `.env` is in `.gitignore`
- [ ] No API keys or secrets in code
- [ ] Supabase keys are for correct environment
- [ ] Use service role key only on server-side

## Functionality Testing

### 📱 Public Pages
- [ ] Homepage loads correctly
- [ ] About page accessible
- [ ] Services page accessible
- [ ] Contact page accessible
- [ ] Privacy page accessible
- [ ] All images load correctly
- [ ] Navigation works properly

### 📱 Authentication
- [ ] Login page displays correctly
- [ ] Login with username works
- [ ] Login with email works
- [ ] Invalid credentials show error
- [ ] Successful login redirects to dashboard
- [ ] Logout returns to homepage

### 📱 Dashboard
- [ ] Dashboard home displays metrics
- [ ] Sidebar navigation works
- [ ] Mobile menu opens/closes correctly
- [ ] All dashboard pages load:
  - [ ] Projects page
  - [ ] Property Search page
  - [ ] FAR Calculator page
  - [ ] Project Management page
  - [ ] Import/Export page
  - [ ] Help page

### 📱 Responsive Design
- [ ] Test on mobile (375px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1920px width)
- [ ] Sidebar collapses on mobile
- [ ] All text is readable
- [ ] No horizontal scroll
- [ ] Touch targets are adequate size

### 📱 Performance
- [ ] Page load times < 3 seconds
- [ ] Images are optimized
- [ ] Fonts load without flash
- [ ] No console errors
- [ ] No console warnings (except benign ones)

## Accessibility

### ♿ WCAG Compliance
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Alt text on all images
- [ ] Form labels present
- [ ] Error messages are clear

### ♿ Assistive Technology
- [ ] Screen reader can navigate site
- [ ] ARIA labels where appropriate
- [ ] Semantic HTML elements used
- [ ] Heading hierarchy correct

## Production Deployment

### 🚀 Pre-Deploy
- [ ] All tests passing
- [ ] Build succeeds
- [ ] Documentation is complete
- [ ] Team reviewed changes

### 🚀 Deploy
- [ ] Choose hosting platform (Vercel/Netlify/etc.)
- [ ] Configure environment variables
- [ ] Set up custom domain
- [ ] Configure SSL certificate
- [ ] Deploy application
- [ ] Verify deployment succeeded

### 🚀 Post-Deploy
- [ ] Test production URL loads
- [ ] Test login on production
- [ ] Verify database connection works
- [ ] Check analytics are tracking
- [ ] Monitor error logs
- [ ] Verify all pages work
- [ ] Test on real devices

## Monitoring & Maintenance

### 📊 Monitoring
- [ ] Set up error tracking (Sentry/etc.)
- [ ] Configure uptime monitoring
- [ ] Set up performance monitoring
- [ ] Enable analytics tracking
- [ ] Configure log aggregation

### 📊 Maintenance
- [ ] Document deployment process
- [ ] Create backup strategy
- [ ] Plan update schedule
- [ ] Set up staging environment
- [ ] Document rollback procedure

## Team Handoff

### 📚 Documentation
- [ ] Share `QUICK_START.md` with team
- [ ] Share `MIGRATION_COMPLETE.md`
- [ ] Share `DATABASE_SETUP.md`
- [ ] Document any custom workflows
- [ ] Create troubleshooting guide

### 📚 Knowledge Transfer
- [ ] Demo application to team
- [ ] Explain architecture decisions
- [ ] Review database schema
- [ ] Explain authentication flow
- [ ] Show where to find logs

### 📚 Access
- [ ] Grant team access to Supabase
- [ ] Share admin credentials securely
- [ ] Grant access to hosting platform
- [ ] Share analytics access
- [ ] Document support contacts

## Emergency Procedures

### 🆘 If Something Goes Wrong
1. Check error logs in Supabase
2. Check browser console for errors
3. Verify environment variables
4. Check Supabase status page
5. Rollback to previous version if needed
6. Contact support if critical

### 🆘 Common Issues
- **Can't login**: Check Supabase credentials, verify user exists
- **Database errors**: Check RLS policies, verify migration applied
- **404 errors**: Check routes exist, verify build completed
- **Blank pages**: Check console errors, verify API responses

## Success Criteria

### ✅ All Must Pass
- [ ] Application builds successfully
- [ ] All pages load without errors
- [ ] Authentication works correctly
- [ ] Database queries succeed
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Security checks pass
- [ ] Team can access and use

---

## Deployment Sign-off

**Deployed by**: _________________
**Date**: _________________
**Environment**: _________________
**Version**: _________________
**All checks passed**: ☐ Yes ☐ No

**Notes**:
_______________________________________
_______________________________________
_______________________________________
