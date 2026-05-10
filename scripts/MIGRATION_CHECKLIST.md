# Strapi Migration Checklist

Use this checklist to track your migration progress.

## Pre-Migration

- [ ] Strapi project created and running locally
  - Command: `npx create-strapi-app@latest my-strapi-project --quickstart`
  - Admin user registered at `http://localhost:1337/admin`
  - Server running: `npm run develop`

- [ ] ts-node installed in boffins-website project
  - Command: `npm install -D ts-node`

- [ ] Backup current lib/data files (optional but recommended)
  - [ ] `lib/data/landing-page.ts`
  - [ ] `lib/data/about-data.ts`
  - [ ] `lib/data/blog-data.ts`
  - [ ] `lib/data/case-studies.ts`
  - [ ] `lib/data/contact-data.ts`
  - [ ] `lib/data/bespoke.ts`
  - [ ] `lib/data/academy.ts`
  - [ ] `lib/data/hardware.ts`
  - [ ] `lib/data/media.ts`
  - [ ] `lib/data/products.ts`

## Migration Execution

- [ ] Run migration script
  - Option 1: `npm run strapi:sync`
  - Option 2: `scripts\migrate.bat` (Windows)
  
- [ ] Verify migration output
  - [ ] No critical errors in console
  - [ ] All content types created successfully
  - [ ] All components created successfully
  - [ ] Data seeding completed

## Post-Migration Verification

### Content Types Created
- [ ] Homepage (Single Type)
- [ ] About Page (Single Type)
- [ ] Contact Page (Single Type)
- [ ] Blog Post (Collection Type)
- [ ] Case Study (Collection Type)
- [ ] Service Division (Collection Type)

### Components Created (14 total)
- [ ] shared.seo
- [ ] shared.button
- [ ] sections.hero
- [ ] sections.stat-item
- [ ] sections.feature-item
- [ ] sections.testimonial-item
- [ ] sections.process-step
- [ ] sections.timeline-item
- [ ] sections.contact-item
- [ ] sections.portfolio-item
- [ ] sections.service-feature
- [ ] sections.program-item
- [ ] sections.success-story
- [ ] sections.product-item
- [ ] sections.application-item
- [ ] sections.leadership-item

### Data Verification in Strapi Admin
Login to `http://localhost:1337/admin` and verify:

#### Single Types
- [ ] **Homepage** populated with:
  - [ ] Hero section (title, subtitle, description, image)
  - [ ] Stats (4 items)
  - [ ] Features (5 items)
  - [ ] CTA title and description

- [ ] **About Page** populated with:
  - [ ] Hero section
  - [ ] Mission title and description
  - [ ] Vision title and description
  - [ ] Values (4 items)
  - [ ] Leadership team (4 members)
  - [ ] Milestones (7 items)

- [ ] **Contact Page** populated with:
  - [ ] Hero section (badge, title, subtitle, description)
  - [ ] Contact info (4 items)
  - [ ] Office title, description, map URL

#### Collection Types
- [ ] **Blog Posts** (6 posts)
  - [ ] All posts have title, slug, excerpt, content
  - [ ] Author, category, publishedAt, readTime populated
  - [ ] Images paths set

- [ ] **Case Studies** (1 study)
  - [ ] Ubuxa case study with all sections
  - [ ] Sections JSON complete

- [ ] **Service Divisions** (5 divisions)
  - [ ] Bespoke Division
    - [ ] Hero, stats, services, portfolio, testimonials, process
  - [ ] Academy
    - [ ] Hero, stats, programs, success stories
  - [ ] Hardware Division
    - [ ] Hero, stats, services, applications, ubuxaIoTPro
  - [ ] Media Company
    - [ ] Hero, stats, services, portfolio, testimonials
  - [ ] Product Division
    - [ ] Hero, stats, products, testimonials

## Content Publishing

- [ ] Publish Homepage
- [ ] Publish About Page
- [ ] Publish Contact Page
- [ ] Publish all Blog Posts (6)
- [ ] Publish Case Study (1)
- [ ] Publish all Service Divisions (5)

## API Configuration

- [ ] Generate API Token
  - [ ] Go to Settings > API Tokens
  - [ ] Create new token with appropriate permissions
  - [ ] Copy and save token securely

- [ ] Create `.env.local` in Next.js project
  ```env
  NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
  STRAPI_API_TOKEN=your_token_here
  ```

## Next.js Integration (Future Work)

- [ ] Update `lib/strapi.ts` with additional fetch functions
- [ ] Update homepage to fetch from Strapi
- [ ] Update about page to fetch from Strapi
- [ ] Update contact page to fetch from Strapi
- [ ] Update blog pages to fetch from Strapi
- [ ] Update case studies to fetch from Strapi
- [ ] Update service pages to fetch from Strapi
- [ ] Test all pages with Strapi data
- [ ] Update build process to handle Strapi connection

## Testing

- [ ] Homepage displays correctly with Strapi data
- [ ] About page displays correctly with Strapi data
- [ ] Contact page displays correctly with Strapi data
- [ ] Blog listing shows all posts
- [ ] Blog detail pages work
- [ ] Case studies display correctly
- [ ] All service division pages work
- [ ] No console errors
- [ ] Images load correctly
- [ ] Links work correctly

## Production Deployment

- [ ] Set up production Strapi instance
- [ ] Run migration on production Strapi
- [ ] Update production environment variables
- [ ] Test production Next.js with production Strapi
- [ ] Set up Strapi backups
- [ ] Set up monitoring
- [ ] Document deployment process

## Cleanup (Optional)

- [ ] Remove or archive old lib/data files
- [ ] Update documentation
- [ ] Remove migration scripts (or keep for future use)
- [ ] Clean up .gitignore if needed

## Notes

Add any notes or issues encountered during migration:

---

**Date Migrated:** _______________

**Strapi Version:** _______________

**Migration Script Version:** _______________

**Issues Encountered:**
- 
- 
- 

**Resolution:**
- 
- 
- 

---

**Status:** [ ] In Progress | [ ] Completed | [ ] Needs Review
