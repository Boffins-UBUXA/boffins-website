Strapi Setup & Migration Guide
This guide will help you set up a local Strapi instance and automatically migrate your website's content using the "friendly command" we created.

1. Set up Strapi (Locally)
If you haven't already, create a new Strapi project. Run this command in a separate directory (outside your Next.js project):

npx create-strapi-app@latest my-strapi-project --quickstart
This will create a folder my-strapi-project, install dependencies, and automatically start the server at http://localhost:1337.

Important:

Wait for the Admin registration page to open.
Create your first admin user.
Keep this server running.
2. Run the Migration Command
Once Strapi is running and you are logged in as admin, go back to your Boffins Website project terminal.

Run the following command to create the data structure and upload your content:

npx ts-node scripts/strapi-migrator.ts
What this does:
Creates Content Types: Automatically sets up Service Division, Blog Post, etc.
Creates Components: Sets up shared components like Hero, SEO, Buttons.
Seeds Data: Uploads all the content we extracted from your site (Blog posts, Service pages, etc.).
3. Connecting the Frontend
After migration, you will need to update your Next.js app to fetch data from Strapi instead of the local @/lib/data files.

Install SDK: npm install qs (useful for Strapi queries).
Environment Variables: Create .env.local in your Next.js project:
STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_generated_token_here
(You can generate a persistent API Token in Strapi Admin > Settings > API Tokens)
Troubleshooting
"Content Type already exists": The script tries to be safe, but if you run it multiple times, you might see errors. This is normal.
Server Restarting: Strapi auto-restarts when Content Types are changed. The script puts in delays to handle this, but if it fails, just run it again.
