# Quick Start: Strapi Migration

## Step 1: Start Strapi
```bash
# In your Strapi project directory
cd path/to/my-strapi-project
npm run develop
```

Wait for Strapi to start at `http://localhost:1337`

## Step 2: Run Migration
```bash
# In your boffins-website directory
cd path/to/boffins-website
npm run strapi:sync
```

## Step 3: Publish Content
1. Open `http://localhost:1337/admin`
2. Login with your admin credentials
3. Go to each content type
4. Review and click "Publish" on draft entries

## Step 4: Verify
- Check Blog Posts: Should see 6 posts
- Check Case Studies: Should see 1 study (Ubuxa)
- Check Service Divisions: Should see 5 divisions
- Check Single Types: Homepage, About, Contact should be populated

## Done! 🎉

Your Strapi CMS is now populated with all website data.

---

## Optional: Use Strapi in Next.js

### 1. Create `.env.local`
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_generated_token
```

### 2. Update Pages to Fetch from Strapi
Example for blog:
```typescript
import { getBlogPosts } from '@/lib/strapi'

// In your page component
const posts = await getBlogPosts()
```

### 3. Build and Test
```bash
npm run build
npm run dev
```

---

## Common Issues

**Strapi not running?**
```bash
cd path/to/my-strapi-project
npm run develop
```

**Need to install ts-node?**
```bash
npm install -D ts-node
```

**Permission errors?**
- Generate API token in Strapi Admin
- Set `STRAPI_TOKEN` environment variable

**Content already exists?**
- Safe to ignore - script handles duplicates
- Or delete entries in Strapi and re-run
