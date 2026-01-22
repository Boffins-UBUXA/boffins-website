const { strapiData } = require('./strapi-data');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN; // Optional if using public permissions or just dev mode for content types

// Helper for API requests
async function strapiRequest(endpoint: string, method: string = 'GET', body?: any) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (API_TOKEN) {
        headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    try {
        const response = await fetch(`${STRAPI_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Strapi Request Failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        // Some endpoints return 204 No Content
        if (response.status === 204) return null;
        return await response.json();
    } catch (error) {
        console.error(`Error requesting ${endpoint}:`, error);
        throw error;
    }
}

// --- Schema Definitions ---

const components = {
    'shared.seo': {
        category: 'shared',
        displayName: 'SEO',
        attributes: {
            metaTitle: { type: 'string' },
            metaDescription: { type: 'text' },
            keywords: { type: 'text' },
        }
    },
    'shared.button': {
        category: 'shared',
        displayName: 'Button',
        attributes: {
            label: { type: 'string' },
            url: { type: 'string' },
            variant: { type: 'enumeration', enum: ['default', 'outline', 'ghost'] },
        }
    },
    'elements.feature-item': {
        category: 'elements',
        displayName: 'Feature Item',
        attributes: {
            title: { type: 'string' },
            description: { type: 'text' },
            icon: { type: 'string' },
        }
    },
    'sections.hero': {
        category: 'sections',
        displayName: 'Hero',
        attributes: {
            title: { type: 'string' },
            subtitle: { type: 'text' },
            image: { type: 'media', multiple: false, allowedTypes: ['images'] },
            introText: { type: 'text' },
        }
    },
    'sections.features': {
        category: 'sections',
        displayName: 'Features List',
        attributes: {
            title: { type: 'string' },
            items: { type: 'component', repeatable: true, component: 'elements.feature-item' }
        }
    }
};

const contentTypes = {
    'api::service-division.service-division': {
        singularName: 'service-division',
        pluralName: 'service-divisions',
        displayName: 'Service Division',
        kind: 'collectionType',
        attributes: {
            name: { type: 'string', required: true },
            slug: { type: 'uid', targetField: 'name' },
            introText: { type: 'text' },
            hero: { type: 'component', repeatable: false, component: 'sections.hero' },
            servicesList: { type: 'component', repeatable: true, component: 'elements.feature-item' },
            // Simplified for demo: mapping complex structures to JSON or staying with specific components if time permits
            // For this script, we'll keep it simple to ensure success
        }
    },
    'api::blog-post.blog-post': {
        singularName: 'blog-post',
        pluralName: 'blog-posts',
        displayName: 'Blog Post',
        kind: 'collectionType',
        attributes: {
            title: { type: 'string', required: true },
            slug: { type: 'uid', targetField: 'title' },
            content: { type: 'richtext' },
            category: { type: 'string' },
            author: { type: 'string' },
            date: { type: 'date' },
            readTime: { type: 'string' },
        }
    }
};

// --- Migration Logic ---

async function migrate() {
    console.log('🚀 Starting Strapi Migration...');

    // 1. Create Components
    console.log('📦 Creating Components...');
    for (const [uid, schema] of Object.entries(components)) {
        try {
            // Check if exists logic omitted for brevity, simpler to try create and catch "already exists" or use update
            // converting 'shared.seo' -> 'shared' category and 'seo' name
            const [category, name] = uid.split('.');

            // API for Content Type Builder is usually /content-type-builder/components
            // Note: This requires the server to auto-restart, which might kill this script if running locally against a reloading server.
            // Best practice is to construct the JSON schema locally, but for this "friendly command" we try API.
            // If API fails due to reload, we warn user.

            await strapiRequest('/content-type-builder/components', 'POST', {
                component: {
                    category,
                    displayName: schema.displayName,
                    icon: 'puzzle-piece',
                    attributes: schema.attributes,
                }
            });
            console.log(`✅ Component ${uid} created`);
            // Wait for server reload if needed
            await new Promise(r => setTimeout(r, 2000));
        } catch (e) {
            console.log(`⚠️  Component ${uid} might already exist or failed:`, (e as Error).message);
        }
    }

    // 2. Create Content Types
    console.log('📄 Creating Content Types...');
    for (const [uid, schema] of Object.entries(contentTypes)) {
        try {
            await strapiRequest('/content-type-builder/content-types', 'POST', {
                contentType: {
                    singularName: schema.singularName,
                    pluralName: schema.pluralName,
                    displayName: schema.displayName,
                    kind: schema.kind,
                    attributes: schema.attributes,
                }
            });
            console.log(`✅ Content Type ${schema.displayName} created`);
            await new Promise(r => setTimeout(r, 2000));
        } catch (e) {
            console.log(`⚠️  Content Type ${schema.displayName} might already exist or failed:`, (e as Error).message);
        }
    }

    // 3. Seed Data
    console.log('🌱 Seeding Data...');

    // Seed Service Divisions
    for (const division of strapiData.serviceDivisions) {
        try {
            // adapt data structure to schema
            const entry = {
                name: division.name,
                slug: division.slug,
                introText: division.introText,
                servicesList: division.servicesList,
            };

            await strapiRequest('/api/service-divisions', 'POST', { data: entry });
            console.log(`   + Service Division: ${division.name}`);
        } catch (e) {
            console.error(`   - Failed to seed ${division.name}`, (e as Error).message);
        }
    }

    // Seed Blog Posts
    for (const post of strapiData.blogPosts) {
        try {
            await strapiRequest('/api/blog-posts', 'POST', { data: post });
            console.log(`   + Blog Post: ${post.title}`);
        } catch (e) {
            console.error(`   - Failed to seed ${post.title}`, (e as Error).message);
        }
    }

    console.log('✨ Migration Completed!');
    console.log('👉 Go to your Strapi Admin panel to verify (http://localhost:1337/admin)');
}

migrate().catch(console.error);
