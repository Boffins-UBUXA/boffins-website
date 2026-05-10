# Strapi Permissions Setup Guide

## Issue: 403 Forbidden Errors

Your diagnostic shows **403 Forbidden** errors when accessing collection types like Blog Posts. This is a **permissions issue** in Strapi.

## Solution: Configure Role Permissions

### Step 1: Access Strapi Admin Panel
1. Open your browser to `http://localhost:1337/admin`
2. Log in with your admin credentials

### Step 2: Configure Public Role Permissions

The Strapi REST API requires permissions for the **Public** role (unauthenticated access):

1. Go to **Settings** (left sidebar)
2. Under **USERS & PERMISSIONS PLUGIN**, click **Roles**
3. Click **Public** role
4. Scroll to **Permissions**
5. Find your content types and enable permissions:

#### For Each Content Type:

**Home Page (api::home-page.home-page)**
- ✅ find (single type)

**About Page (api::about-page.about-page)**
- ✅ find (single type)

**Contact Page (api::contact-page.contact-page)**
- ✅ find (single type)

**Blog Post (api::blog-post.blog-post)**
- ✅ find
- ✅ findOne
- ✅ create
- ✅ update
- ✅ delete

**Case Study (api::case-study.case-study)**
- ✅ find
- ✅ findOne
- ✅ create
- ✅ update
- ✅ delete

**Service Division (api::service-division.service-division)**
- ✅ find
- ✅ findOne
- ✅ create
- ✅ update
- ✅ delete

6. Click **Save** (top right)

### Step 3: Configure Authenticated Role (Optional)

If you want authenticated users to also have access:

1. Go back to **Settings** > **Roles**
2. Click **Authenticated** role
3. Enable the same permissions as Public
4. Click **Save**

### Step 4: Test with Diagnostic Script

After saving permissions:

```bash
npm run strapi:diagnose
```

You should now see:
```
✅ Blog Posts (collection): 200 OK
✅ Blog Posts (POST): 200 OK (or 400/405 if body is missing)
```

### Step 5: Re-run Migration

```bash
npm run strapi:sync
```

## Alternative: Use API Token (Recommended)

Instead of configuring public permissions, create an API token with full access:

### Step 1: Create API Token
1. Go to **Settings** > **API Tokens**
2. Click **Create new API Token**
3. Set:
   - **Name**: Migration Token
   - **Description**: Token for content migration
   - **Token duration**: No limit (or set expiry)
   - **Permissions**: 
     - ✅ Content Manager: `find`, `findOne`, `create`, `update`, `delete`
     - ✅ Content Type Builder: All permissions
     - ✅ Upload: All permissions
4. Click **Save**
5. **Copy the token immediately** (you won't see it again!)

### Step 2: Add to .env
```env
STRAPI_API_TOKEN=your_token_here
```

### Step 3: Re-run Migration
```bash
npm run strapi:sync
```

The script will use the API token instead of admin login, which bypasses role permissions.

## Troubleshooting

### Still Getting 403 After Setting Permissions?

1. **Clear Strapi cache**:
   ```bash
   # In your Strapi directory
   rm -rf .cache build
   npm run build
   npm run start
   ```

2. **Check you edited the right role**:
   - Public role = anonymous access
   - Authenticated role = logged-in users
   - Make sure you're testing with the right authentication

3. **Verify token has permissions**:
   - Go to **Settings** > **API Tokens**
   - Click your token
   - Ensure all required permissions are checked

### Getting 405 Method Not Allowed?

This means the endpoint exists but doesn't support the HTTP method:

- **POST to create**: Should work on `/api/{collection-name}`
- **PUT to update**: Should work on `/api/{collection-name}/{id}`

If you get 405, your Strapi version might use different endpoints. Check your Strapi version:
```bash
# In Strapi directory
npm list @strapi/strapi
```

- **Strapi v4.x**: Uses standard REST API
- **Strapi v5.x**: May use Document Service API (different endpoints)

### Getting 401 Unauthorized?

- Check your `.env` file has correct credentials
- Try creating a new API token
- Check the token hasn't expired

## Quick Permissions Checklist

Run this checklist in Strapi Admin:

- [ ] Settings > Roles > Public
- [ ] For each content type, enable required permissions:
  - [ ] Single types: `find`
  - [ ] Collection types: `find`, `findOne`, `create`, `update`, `delete`
- [ ] Click **Save**
- [ ] Test with `npm run strapi:diagnose`
- [ ] Re-run migration with `npm run strapi:sync`

## Need More Help?

Run the diagnostic script for detailed endpoint status:
```bash
npm run strapi:diagnose
```

Check Strapi server logs for detailed error messages:
```bash
# In your Strapi directory
npm run develop
```

Look for permission errors in the console output.
