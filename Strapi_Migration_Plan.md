Strapi Migration Plan
This plan details how to migrate the Boffins Technology website content to a headless Strapi CMS, ensuring all pages (Home, About, Services, Contact, Blog) are covered.

1. Strapi Data Structure
We will organize content into Single Types (for unique pages), Collection Types (for repeatable content), and Components (for reusable UI sections).

A. Shared Components (Reusable Parts)
Category	Component Name	Fields
Shared	seo	metaTitle (Text), metaDescription (Text), keywords (Text)
Shared	button	label (String), url (String), variant (Enum: default, outline, ghost)
Shared	social_link	platform (String), url (String), icon (String)
Sections	hero	title (Text), subtitle (Text), image (Media), bgGradient (String), buttons (Component: shared.button - repeatable)
Sections	stats	items (Component: elements.stat_item - repeatable)
Sections	process	title (String), description (Text), steps (Component: elements.step_item - repeatable)
Sections	testimonials	title (String), items (Component: elements.testimonial - repeatable)
Elements	stat_item	value (String), label (String), icon (String)
Elements	step_item	stepNumber (String), title (String), description (Text), icon (String)
Elements	testimonial	name (String), company (String), content (Text), rating (Integer), image (Media)
B. Collection Types (Dynamic Content)
1. Blog Post (api::blog-post.blog-post)
title, slug, excerpt, content (Rich Text), coverImage, author, category, publishedAt, readTime
2. Service Division (api::service-division.service-division)
Replaces individual pages like /services/bespoke, /services/education
name (String) e.g., "Bespoke Division"
slug (UID) e.g., "bespoke"
hero (Component: sections.hero)
introText (Text)
servicesList (Component: sections.features - repeatable)
portfolio (Component: sections.portfolio-grid)
process (Component: sections.process)
testimonials (Component: sections.testimonials)
seo (Component: shared.seo)
3. Team Member (api::team-member.team-member)
name, role, bio, photo, socialLinks
C. Single Types (Unique Pages)
1. Homepage (api::homepage.homepage)
hero (Component: sections.hero)
stats (Component: sections.stats)
divisions (Relation/Component)
features (Component: sections.features)
cta (Component: sections.cta)
seo (Component: shared.seo)
2. Services Landing Page (api::services-page.services-page)
hero (Component: sections.hero)
divisionsGrid (Component: sections.features)
benefits (Component: sections.features)
process (Component: sections.process)
cta (Component: sections.cta)
seo (Component: shared.seo)
3. Contact Page (api::contact-page.contact-page)
hero (Component: sections.hero)
contactInfo (Component: elements.contact-item - repeatable)
officeLocation (Component: elements.map-location)
seo (Component: shared.seo)
4. About Page (api::about-page.about-page)
mission (Component: sections.content-block)
vision (Component: sections.content-block)
history (Component: sections.timeline)
seo (Component: shared.seo)
2. Migration Automation ("The Friendly Command")
We will create a script scripts/strapi-migrator.ts that handles the entire setup.

How it handles the "Missing" Pages
Extraction: I will manually extract the hardcoded data from 
app/services/bespoke/page.tsx
 (and other sibling pages) and include it in the seed data JSON within the script.
Structure Creation: The script will automatically create the ServiceDivision collection type to house this data.
Seeding: It will upload entries for "Bespoke", "Academy", "Hardware", etc., effectively moving them from hardcoded React components to dynamic Strapi entries.
Execution
# This single command will set up the entire schema and upload all content
npx ts-node scripts/strapi-migrator.ts