# Strapi Migration Scripts

This directory contains scripts to migrate Boffins Technology website content to Strapi CMS.

## Scripts Overview

### 1. `strapi-migrator.ts` - Main Migration Script
Creates content types, components, and seeds all website content into Strapi.

**Usage:**
```bash
npm run strapi:sync
```

### 2. `strapi-diagnostic.ts` - Diagnostic Tool
Checks Strapi connectivity, authentication, and available API endpoints.

**Usage:**
```bash
npm run strapi:diagnose
```

### 3. `strapi-permission-fix.ts` - Automatic Permission Fix
Automatically configures Public role permissions in Strapi for migration access.

**Usage:**
```bash
npm run strapi:fix-permissions
```

## Prerequisites

1. **Strapi Instance Running**: Ensure your Strapi instance is running at `http://localhost:1337` (or configured URL)
2. **Admin Access**: You must have admin credentials or an API token with full permissions
3. **Environment Variables**: Create a `.env` file in the project root with:

```env
STRAPI_URL=http://localhost:1337
STRAPI_ADMIN_EMAIL=your-admin-email@example.com
STRAPI_ADMIN_PASSWORD=your-admin-password
# OR use an API token (recommended for production)
STRAPI_API_TOKEN=your-strapi-api-token-here
```

## Creating an API Token (Recommended)

Instead of using admin credentials, you can create a persistent API token:

1. Log into Strapi Admin Panel
2. Navigate to **Settings** > **API Tokens**
3. Click **Create new API Token**
4. Set permissions:
   - **Content Manager**: All permissions (find, findOne, create, update, delete)
   - **Content Type Builder**: All permissions (if creating content types)
   - **Upload**: All permissions (if uploading media)
5. Copy the generated token
6. Add to your `.env` file as `STRAPI_API_TOKEN`

## Migration Process

### Step 1: Run Diagnostic (Optional but Recommended)
```bash
npm run strapi:diagnose
```

This will:
- Verify Strapi is running and accessible
- Test authentication
- Check available API endpoints
- List existing content types

### Step 2: Fix Permissions (If Needed)
If the diagnostic shows 403 Forbidden errors:

```bash
npm run strapi:fix-permissions
```

This will automatically configure the Public role permissions needed for migration.

**OR** manually set permissions following `scripts/STRAPI_PERMISSIONS_SETUP.md`

### Step 3: Run Migration
```bash
npm run strapi:sync
```

The script will:
1. ✅ Authenticate with Strapi
2. 📦 Create components (SEO, Hero, Stats, etc.)
3. 📄 Create content types (Home Page, About Page, Blog Posts, etc.)
4. 🌱 Seed single types (Home, About, Contact pages)
5. 🌿 Seed collection types (Blog Posts, Case Studies, Service Divisions)

### Expected Output

**First Run:**
```
🚀 Starting Strapi migration for Boffins Technology...
🔐 Logging in as Strapi admin...
✅ Admin login successful

📦 Creating components...
✅ Component created: shared.seo
✅ Component created: sections.hero
...

📄 Creating content types...
✅ Content type created: Home Page
✅ Content type created: About Page
...

🌱 Seeding single types...
✅ Created single type: Home Page
✅ Created single type: About Page
✅ Created single type: Contact Page

🌿 Seeding collection types...
  → Seeding /api/blog-posts (6 items)
✅ Seeded Blog Post: Building Scalable Web Applications...
...

✨ Migration complete!
```

**Subsequent Runs:**
You'll see warnings like:
```
⚠️ Component create error (shared.seo): component.alreadyExists
⚠️ Content type create error (Home Page): name `home-page` is already being used
```

These are **normal** and expected. The script skips already-existing content types.

## Troubleshooting

### 401 Unauthorized Errors

**Cause**: Invalid or expired authentication token

**Solutions:**
1. Verify your admin credentials or API token in `.env`
2. Run `npm run strapi:diagnose` to test authentication
3. Create a new API token in Strapi Admin > Settings > API Tokens
4. Ensure the token has **full permissions** for:
   - Content Manager (all actions)
   - Content Type Builder (all actions)
   - Upload (all actions)

### 405 Method Not Allowed Errors

**Cause**: Strapi's REST API doesn't support direct POST/PUT operations for content creation

**Solutions:**
The updated migration script now automatically falls back to the Content Manager API when it encounters 405 errors. This should resolve the issue automatically.

If you still see 405 errors:
1. Check that the Content Manager plugin is enabled in Strapi
2. Verify your API token has Content Manager permissions
3. Run the diagnostic script to check available endpoints

### Content Type Already Exists

**This is normal on re-runs.** The script safely skips existing content types.

If you want to **reset** and start fresh:
1. Go to Strapi Admin > Settings > Roles
2. Delete all content types you want to reset
3. Re-run the migration script

### Server Restart Timeouts

Strapi automatically restarts when content types are modified. The script waits for this, but:

- If you see `❌ Server timeout`, wait a few seconds and re-run
- Check Strapi's console for any errors during restart
- Ensure Strapi has enough memory/CPU resources

### Media Files Not Uploading

The migration script creates **string references** to media files, not actual uploads.

**To upload media files:**
1. Go to Strapi Admin > Media Library
2. Upload your images/files manually
3. Update the content to reference the uploaded media

## Content Types Created

### Single Types
- **Home Page** (`/api/home-page`)
- **About Page** (`/api/about-page`)
- **Contact Page** (`/api/contact-page`)

### Collection Types
- **Blog Post** (`/api/blog-posts`)
- **Case Study** (`/api/case-studies`)
- **Service Division** (`/api/service-divisions`)

### Components
- `shared.seo` - SEO metadata
- `sections.hero` - Hero sections
- `sections.stat-item` - Statistics items
- `sections.value-item` - Company values
- `sections.leadership-item` - Leadership team
- `sections.milestone-item` - Company milestones
- `sections.contact-item` - Contact information
- `sections.service-feature` - Service features
- `sections.portfolio-item` - Portfolio projects
- `sections.testimonial-item` - Customer testimonials
- `sections.process-step` - Process steps
- `sections.program-item` - Academy programs
- `sections.success-story` - Success stories
- `sections.product-item` - Product items
- `sections.application-item` - Application items

## Advanced Usage

### Force Re-seed Existing Content
The script currently skips existing items. To force updates:

1. Open `strapi-migrator.ts`
2. Find the `collectionSeeds` array
3. Change the last parameter in `upsertCollectionItem` from `false` to `true`

### Customize Seed Data
Edit `strapi-data.ts` to modify what content gets seeded.

### Add New Content Types
1. Add the content type schema to the `contentTypes` object in `strapi-migrator.ts`
2. Add seed data to `strapi-data.ts`
3. Add to the `singleTypeSeeds` or `collectionSeeds` arrays
4. Run the migration script

## Support

If you encounter issues:
1. Run `npm run strapi:diagnose` and check the output
2. Check Strapi's server logs for errors
3. Verify your `.env` configuration
4. Ensure Strapi version is compatible (v4.x or v5.x)

## Migration Script Architecture

The updated migration script includes:

1. **Token Refresh Logic**: Automatically refreshes expired admin tokens
2. **Content Manager API Fallback**: Falls back to Content Manager API when REST API fails
3. **Better Error Handling**: Distinguishes between auth errors, not found, and method errors
4. **Diagnostic Tool**: Standalone script to troubleshoot Strapi connectivity and permissions
5. **Retry Logic**: Automatically retries failed operations with fresh tokens

## Version History

- **v2.0** (Current): Added token refresh, Content Manager API fallback, diagnostic tool
- **v1.0**: Initial migration script with basic REST API support
