// @ts-nocheck
/**
 * STRAPI MIGRATOR
 * -------------------------------------------------------
 * Creates:
 * - components
 * - single types
 * - collection types
 * - seeds all content from strapi-data.ts
 *
 * Based on proven working pattern
 */

const fs = require("fs");
const path = require("path");

// Dynamically require the ts file after registering ts-node
require("ts-node").register({
  transpileOnly: true,
  compilerOptions: { module: "commonjs", moduleResolution: "node" },
});

const { strapiData } = require("./strapi-data");

// -----------------------------------------------------
// ENV LOADING
// -----------------------------------------------------
try {
  const envPath = path.resolve(__dirname, "../.env");
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf8");
    envConfig.split("\n").forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^['"](.*)['"]$/, "$1");
        process.env[key] = value;
      }
    });
  }
} catch (e) {
  console.log("⚠️ Could not load .env file");
}

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const ADMIN_EMAIL = process.env.STRAPI_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD;
let activeToken = process.env.STRAPI_API_TOKEN;
let adminToken = null;

// -----------------------------------------------------
// HELPERS
// -----------------------------------------------------
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function safeStringify(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

async function getAdminToken() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log("⚠️ No admin email/password in env. Using API token if available.");
    return null;
  }

  console.log(`🔐 Logging in as Strapi admin (${ADMIN_EMAIL})...`);

  try {
    const response = await fetch(`${STRAPI_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    });

    const data = await response.json();

    if (data?.data?.token) {
      adminToken = data.data.token;
      console.log("✅ Admin login successful");
      return data.data.token;
    }

    console.error("❌ Admin login failed:", safeStringify(data));
    return null;
  } catch (error) {
    console.error("❌ Error connecting to login endpoint:", error.message);
    return null;
  }
}

async function strapiRequest(endpoint, method = "GET", body) {
  const headers = {
    "Content-Type": "application/json",
  };

  const isContentAPI = endpoint.startsWith("/api/");
  const isAdminAPI =
    endpoint.startsWith("/admin") ||
    endpoint.startsWith("/content-type-builder") ||
    endpoint.startsWith("/content-manager");

  // Use API token for public REST /api routes
  // Use admin token only for admin/content-type-builder routes
  const token = isContentAPI ? activeToken : adminToken || activeToken;

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${STRAPI_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Only refresh admin token for admin routes, not /api routes
  if (response.status === 401 && isAdminAPI && !endpoint.startsWith("/admin/login")) {
    console.log("⚠️ Admin token expired, refreshing...");
    await delay(2000);

    const newToken = await getAdminToken();

    if (newToken) {
      headers["Authorization"] = `Bearer ${newToken}`;

      const retryResponse = await fetch(`${STRAPI_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!retryResponse.ok) {
        const errorText = await retryResponse.text();
        throw new Error(`${method} ${endpoint} -> ${retryResponse.status} ${retryResponse.statusText} - ${errorText}`);
      }

      const text = await retryResponse.text();
      return text ? JSON.parse(text) : null;
    }
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${method} ${endpoint} -> ${response.status} ${response.statusText} - ${errorText}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function waitForServer(maxRetries = 40) {
  console.log("⏳ Waiting for Strapi to restart...");
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(`${STRAPI_URL}/admin`, { method: "HEAD" });
      if (res.ok || res.status === 200 || res.status === 302 || res.status === 403) {
        console.log("✅ Strapi is back up");
        return;
      }
    } catch (_) {}

    process.stdout.write(".");
    await delay(2500);
  }

  console.log("\n❌ Server restart timeout");
  throw new Error("Server timeout");
}

async function createComponent(uid, schema) {
  const [category] = uid.split(".");
  try {
    await strapiRequest("/content-type-builder/components", "POST", {
      component: {
        category,
        displayName: schema.displayName,
        icon: schema.icon || "puzzle-piece",
        attributes: schema.attributes,
      },
    });
    console.log(`✅ Component created: ${uid}`);
    await waitForServer();
  } catch (e) {
    if (
      e.message.includes("already exists") ||
      e.message.includes("has already been taken") ||
      e.message.includes("Name already exists")
    ) {
      console.log(`ℹ️ Component already exists: ${uid}`);
      return;
    }
    console.log(`⚠️ Component create error (${uid}): ${e.message}`);
  }
}

async function createContentType(uid, schema) {
  try {
    await strapiRequest("/content-type-builder/content-types", "POST", {
      contentType: {
        singularName: schema.singularName,
        pluralName: schema.pluralName,
        displayName: schema.displayName,
        kind: schema.kind,
        draftAndPublish: schema.draftAndPublish ?? true,
        attributes: schema.attributes,
      },
    });
    console.log(`✅ Content type created: ${schema.displayName}`);
    await waitForServer();
  } catch (e) {
    if (
      e.message.includes("already exists") ||
      e.message.includes("has already been taken") ||
      e.message.includes("Name already exists")
    ) {
      console.log(`ℹ️ Content type already exists: ${schema.displayName}`);
      return;
    }
    console.log(`⚠️ Content type create error (${schema.displayName}): ${e.message}`);
  }
}

async function upsertSingleType(endpoint, data, label) {
  if (!data) {
    console.log(`ℹ️ Skip ${label}: no data`);
    return;
  }

  try {
    // First, try to GET the single type to see if it exists
    const existing = await strapiRequest(endpoint, "GET");

  if (existing && existing.data) {
  await strapiRequest(endpoint, "PUT", { data });
  console.log(`✅ Updated single type: ${label}`);
} else {
  await strapiRequest(endpoint, "PUT", { data });
  console.log(`✅ Created single type: ${label}`);
}
  } catch (e) {
    // If it's a 401 and we're using admin token, try using API token instead
    if (e.message.includes("401") || e.message.includes("Unauthorized")) {
      console.log(`⚠️ Auth error for ${label}, trying with API token...`);
      // Save current admin token and try using API token from env
      const savedAdminToken = adminToken;
      if (activeToken) {
        adminToken = null; // Force use of API token
        try {
          const existing = await strapiRequest(endpoint, "GET");
          if (existing && existing.data) {
            const id = existing.data.id || existing.data.documentId;
            await strapiRequest(`${endpoint}/${id}`, "PUT", { data });
            console.log(`✅ Updated single type: ${label}`);
          } else {
            await strapiRequest(endpoint, "POST", { data });
            console.log(`✅ Created single type: ${label}`);
          }
          adminToken = savedAdminToken; // Restore admin token
          return;
        } catch (retryError) {
          console.error(`❌ Retry failed for ${label}: ${retryError.message}`);
          adminToken = savedAdminToken; // Restore admin token
        }
      }
    }

    // If GET failed but it's a 404 or similar, try to create
    if (e.message.includes("404") || e.message.includes("Not Found")) {
      try {
        await strapiRequest(endpoint, "POST", { data });
        console.log(`✅ Created single type: ${label}`);
      } catch (createError) {
        console.error(`❌ Failed to create single type ${label}: ${createError.message}`);
      }
    } else if (!e.message.includes("401") && !e.message.includes("Unauthorized")) {
      // Don't show this error again if we already handled auth errors above
      console.error(`❌ Failed single type ${label}: ${e.message}`);
    }
  }
}

async function findExisting(collectionEndpoint, uniqueField, value) {
  try {
    const endpoint = `${collectionEndpoint}?filters[${uniqueField}][$eq]=${encodeURIComponent(value)}`;
    const published = await strapiRequest(`${endpoint}&status=published`, "GET");
    if (published?.data?.[0]) return published.data[0];

    const draft = await strapiRequest(`${endpoint}&status=draft`, "GET");
    return draft?.data?.[0] || null;
  } catch {
    return null;
  }
}

async function createCollectionItem(collectionEndpoint, item, label) {
  try {
    await strapiRequest(`${collectionEndpoint}?status=published`, "POST", { data: item });
    console.log(`✅ Seeded ${label}`);
  } catch (e) {
    // If we get 405, the endpoint might not support POST via REST API
    // Try using Content Manager API endpoint instead
    if (e.message.includes("405") || e.message.includes("Method Not Allowed")) {
      console.log(`⚠️ REST API not supported for ${label}, trying Content Manager API...`);
      try {
        // Map REST endpoint to Content Manager collection type UID
        const endpointToUidMap = {
          "/api/blog-posts": "api::blog-post.blog-post",
          "/api/case-studies": "api::case-study.case-study",
          "/api/service-divisions": "api::service-division.service-division",
        };

        const contentTypeUid = endpointToUidMap[collectionEndpoint];
        if (!contentTypeUid) {
          console.error(`❌ No Content Manager mapping found for ${collectionEndpoint}`);
          throw new Error(`No Content Manager mapping for ${collectionEndpoint}`);
        }

        const cmEndpoint = `/api/content-manager/collection-types/${contentTypeUid}`;
        await strapiRequest(cmEndpoint, "POST", item);
        console.log(`✅ Seeded ${label} via Content Manager API`);
        return;
      } catch (cmError) {
        console.error(`❌ Failed ${label} (Content Manager API): ${cmError.message}`);
        throw cmError; // Re-throw to handle in caller
      }
    } else if (e.message.includes("401") || e.message.includes("Unauthorized")) {
      // Auth error - re-throw to let caller handle it
      throw e;
    } else {
      console.error(`❌ Failed ${label}: ${e.message}`);
      throw e; // Re-throw to handle in caller
    }
  }
}

async function upsertCollectionItem(
  collectionEndpoint,
  item,
  uniqueField,
  labelValue,
  allowUpdate = false
) {
  const existing = await findExisting(collectionEndpoint, uniqueField, item[uniqueField]);

  if (!existing) {
    return createCollectionItem(collectionEndpoint, item, labelValue);
  }

  if (!allowUpdate) {
    console.log(`ℹ️ Skip existing: ${labelValue}`);
    return;
  }

  try {
    const id = existing.documentId || existing.id;
    const updateEndpoint = `${collectionEndpoint}/${id}?status=published`;
    await strapiRequest(updateEndpoint, "PUT", { data: item });
    console.log(`🔁 Updated ${labelValue}`);
  } catch (e) {
    // If REST API update fails, try Content Manager API
    if (e.message.includes("405") || e.message.includes("Method Not Allowed") || e.message.includes("404")) {
      console.log(`⚠️ REST API update not supported for ${labelValue}, trying Content Manager API...`);
      try {
        const endpointToUidMap = {
          "/api/blog-posts": "api::blog-post.blog-post",
          "/api/case-studies": "api::case-study.case-study",
          "/api/service-divisions": "api::service-division.service-division",
        };
        
        const contentTypeUid = endpointToUidMap[collectionEndpoint];
        if (!contentTypeUid) {
          throw new Error(`No Content Manager mapping for ${collectionEndpoint}`);
        }
        
        const id = existing.documentId || existing.id;
        const cmEndpoint = `/api/content-manager/collection-types/${contentTypeUid}/${id}`;
        await strapiRequest(cmEndpoint, "PUT", item);
        console.log(`🔁 Updated ${labelValue} via Content Manager API`);
        return;
      } catch (cmError) {
        console.error(`❌ Failed update ${labelValue} (Content Manager API): ${cmError.message}`);
      }
    } else {
      console.error(`❌ Failed update ${labelValue}: ${e.message}`);
    }
  }
}

// -----------------------------------------------------
// COMPONENT SCHEMAS
// -----------------------------------------------------
const components = {
  "shared.seo": {
    category: "shared",
    displayName: "SEO",
    attributes: {
      metaTitle: { type: "string" },
      metaDescription: { type: "text" },
      keywords: { type: "text" },
    },
  },

  "sections.hero": {
    category: "sections",
    displayName: "Hero",
    attributes: {
      badge: { type: "string" },
      title: { type: "string" },
      subtitle: { type: "string" },
      description: { type: "text" },
      image: { type: "string" },
      primaryCtaLabel: { type: "string" },
      primaryCtaUrl: { type: "string" },
      secondaryCtaLabel: { type: "string" },
      secondaryCtaUrl: { type: "string" },
    },
  },

  "sections.stat-item": {
    category: "sections",
    displayName: "Stat Item",
    attributes: {
      icon: { type: "string" },
      value: { type: "string" },
      label: { type: "string" },
    },
  },

  "sections.value-item": {
    category: "sections",
    displayName: "Value Item",
    attributes: {
      icon: { type: "string" },
      title: { type: "string" },
      description: { type: "text" },
    },
  },

  "sections.benefit-item": {
    category: "sections",
    displayName: "Benefit Item",
    attributes: {
      icon: { type: "string" },
      title: { type: "string" },
      description: { type: "text" },
    },
  },

  "sections.leadership-item": {
    category: "sections",
    displayName: "Leadership Item",
    attributes: {
      name: { type: "string" },
      role: { type: "string" },
      description: { type: "text" },
      image: { type: "string" },
      imageAlt: { type: "string" },
    },
  },

  "sections.milestone-item": {
    category: "sections",
    displayName: "Milestone Item",
    attributes: {
      year: { type: "string" },
      title: { type: "string" },
      description: { type: "text" },
    },
  },

  "sections.contact-item": {
    category: "sections",
    displayName: "Contact Item",
    attributes: {
      icon: { type: "string" },
      title: { type: "string" },
      details: { type: "text" },
      color: { type: "string" },
    },
  },

  "sections.contact-division-item": {
    category: "sections",
    displayName: "Contact Division Item",
    attributes: {
      name: { type: "string" },
      description: { type: "text" },
      email: { type: "email" },
      icon: { type: "string" },
      socialMedia: { type: "json" },
    },
  },

  "sections.form-option": {
    category: "sections",
    displayName: "Form Option",
    attributes: {
      label: { type: "string" },
      value: { type: "string" },
    },
  },

  "sections.service-feature": {
    category: "sections",
    displayName: "Service Feature",
    attributes: {
      icon: { type: "string" },
      title: { type: "string" },
      description: { type: "text" },
      features: { type: "json" },
      featured: { type: "boolean", default: false },
      color: { type: "string" },
    },
  },

  "sections.portfolio-item": {
    category: "sections",
    displayName: "Portfolio Item",
    attributes: {
      name: { type: "string" },
      client: { type: "string" },
      description: { type: "text" },
      image: { type: "string" },
      technologies: { type: "json" },
      features: { type: "json" },
      link: { type: "string" },
      category: { type: "string" },
      industry: { type: "string" },
      service: { type: "string" },
      results: { type: "string" },
      metrics: { type: "json" },
    },
  },

  "sections.testimonial-item": {
    category: "sections",
    displayName: "Testimonial Item",
    attributes: {
      name: { type: "string" },
      company: { type: "string" },
      image: { type: "string" },
      content: { type: "text" },
      rating: { type: "integer" },
      project: { type: "string" },
      product: { type: "string" },
    },
  },

  "sections.process-step": {
    category: "sections",
    displayName: "Process Step",
    attributes: {
      stepNumber: { type: "string" },
      title: { type: "string" },
      description: { type: "text" },
    },
  },

  "sections.program-item": {
    category: "sections",
    displayName: "Program Item",
    attributes: {
      title: { type: "string" },
      duration: { type: "string" },
      level: { type: "string" },
      description: { type: "text" },
      skills: { type: "json" },
      projects: { type: "integer" },
      color: { type: "string" },
    },
  },

  "sections.success-story": {
    category: "sections",
    displayName: "Success Story",
    attributes: {
      name: { type: "string" },
      program: { type: "string" },
      role: { type: "string" },
      content: { type: "text" },
      salary: { type: "string" },
      image: { type: "string" },
    },
  },

  "sections.product-item": {
    category: "sections",
    displayName: "Product Item",
    attributes: {
      icon: { type: "string" },
      name: { type: "string" },
      tagline: { type: "string" },
      description: { type: "text" },
      features: { type: "json" },
      benefits: { type: "json" },
      image: { type: "string" },
      website: { type: "string" },
      color: { type: "string" },
      category: { type: "string" },
    },
  },

  "sections.application-item": {
    category: "sections",
    displayName: "Application Item",
    attributes: {
      industry: { type: "string" },
      description: { type: "text" },
      benefits: { type: "json" },
      image: { type: "string" },
    },
  },
};

// -----------------------------------------------------
// CONTENT TYPE SCHEMAS
// -----------------------------------------------------
const contentTypes = {
  // ---------------------------------------------------
  // SINGLE TYPES
  // ---------------------------------------------------
  "api::home-page.home-page": {
    singularName: "home-page",
    pluralName: "home-pages",
    displayName: "Home Page",
    kind: "singleType",
    attributes: {
      route: { type: "string" },
      seo: { type: "component", repeatable: false, component: "shared.seo" },
      hero: { type: "component", repeatable: false, component: "sections.hero" },
      stats: { type: "component", repeatable: true, component: "sections.stat-item" },
      features: { type: "json" },
      divisionsTitle: { type: "string" },
      divisionsSubtitle: { type: "text" },
      featuresTitle: { type: "string" },
      featuresDescription: { type: "text" },
      featuresImage: { type: "string" },
      featuresImageAlt: { type: "string" },
      featuresCtaLabel: { type: "string" },
      featuresCtaUrl: { type: "string" },
      ctaTitle: { type: "string" },
      ctaDescription: { type: "text" },
    },
  },

  "api::site-setting.site-setting": {
    singularName: "site-setting",
    pluralName: "site-settings",
    displayName: "Site Setting",
    kind: "singleType",
    draftAndPublish: true,
    attributes: {
      brandName: { type: "string" },
      logoSrc: { type: "string" },
      logoAlt: { type: "string" },
      navigation: { type: "json" },
      footerDescription: { type: "text" },
      footerDivisionsTitle: { type: "string" },
      footerDivisions: { type: "json" },
      footerQuickLinksTitle: { type: "string" },
      footerQuickLinks: { type: "json" },
      footerContactTitle: { type: "string" },
      footerContactItems: { type: "json" },
      socialLinks: { type: "json" },
      copyrightText: { type: "string" },
    },
  },

  "api::about-page.about-page": {
    singularName: "about-page",
    pluralName: "about-pages",
    displayName: "About Page",
    kind: "singleType",
    attributes: {
      route: { type: "string" },
      seo: { type: "component", repeatable: false, component: "shared.seo" },
      hero: { type: "component", repeatable: false, component: "sections.hero" },
      missionTitle: { type: "string" },
      missionDescription: { type: "text" },
      visionTitle: { type: "string" },
      visionDescription: { type: "text" },
      values: { type: "component", repeatable: true, component: "sections.value-item" },
      valuesTitle: { type: "string" },
      valuesSubtitle: { type: "text" },
      leadership: { type: "component", repeatable: true, component: "sections.leadership-item" },
      leadershipTitle: { type: "string" },
      leadershipSubtitle: { type: "text" },
      milestones: { type: "component", repeatable: true, component: "sections.milestone-item" },
      milestonesTitle: { type: "string" },
      milestonesSubtitle: { type: "text" },
      collaboration: { type: "json" },
      ctaTitle: { type: "string" },
      ctaDescription: { type: "text" },
      ctaPrimaryLabel: { type: "string" },
      ctaPrimaryUrl: { type: "string" },
      ctaSecondaryLabel: { type: "string" },
      ctaSecondaryUrl: { type: "string" },
    },
  },

  "api::contact-page.contact-page": {
    singularName: "contact-page",
    pluralName: "contact-pages",
    displayName: "Contact Page",
    kind: "singleType",
    attributes: {
      route: { type: "string" },
      seo: { type: "component", repeatable: false, component: "shared.seo" },
      hero: { type: "component", repeatable: false, component: "sections.hero" },
      heroBadge: { type: "string" },
      contactInfo: { type: "component", repeatable: true, component: "sections.contact-item" },
      formTitle: { type: "string" },
      formDescription: { type: "text" },
      firstNameLabel: { type: "string" },
      firstNamePlaceholder: { type: "string" },
      lastNameLabel: { type: "string" },
      lastNamePlaceholder: { type: "string" },
      emailLabel: { type: "string" },
      emailPlaceholder: { type: "string" },
      phoneLabel: { type: "string" },
      phonePlaceholder: { type: "string" },
      companyLabel: { type: "string" },
      companyPlaceholder: { type: "string" },
      serviceLabel: { type: "string" },
      servicePlaceholder: { type: "string" },
      serviceOptions: { type: "component", repeatable: true, component: "sections.form-option" },
      messageLabel: { type: "string" },
      messagePlaceholder: { type: "text" },
      submitLabel: { type: "string" },
      submittingLabel: { type: "string" },
      toastCloseLabel: { type: "string" },
      validationErrorTitle: { type: "string" },
      validationErrorDescription: { type: "text" },
      successTitle: { type: "string" },
      successDescription: { type: "text" },
      errorTitle: { type: "string" },
      errorDescription: { type: "text" },
      mailRecipient: { type: "email" },
      mailSubjectPrefix: { type: "string" },
      divisionsTitle: { type: "string" },
      divisionsDescription: { type: "text" },
      divisions: { type: "component", repeatable: true, component: "sections.contact-division-item" },
      socialAriaLabelTemplate: { type: "string" },
      officeTitle: { type: "string" },
      officeDescription: { type: "text" },
      officeMapUrl: { type: "text" },
      officeMapTitle: { type: "string" },
    },
  },

  "api::blog-page.blog-page": {
    singularName: "blog-page",
    pluralName: "blog-pages",
    displayName: "Blog Page",
    kind: "singleType",
    draftAndPublish: true,
    attributes: {
      route: { type: "string" },
      seo: { type: "component", repeatable: false, component: "shared.seo" },
      heroBadge: { type: "string" },
      heroTitle: { type: "string" },
      heroHighlightedTitle: { type: "string" },
      heroDescription: { type: "text" },
      searchPlaceholder: { type: "string" },
      searchButtonLabel: { type: "string" },
      featuredTitle: { type: "string" },
      featuredDescription: { type: "text" },
      featuredEmptyTitle: { type: "string" },
      featuredEmptyDescription: { type: "text" },
      featuredCtaLabel: { type: "string" },
      latestTitle: { type: "string" },
      searchResultsLabelTemplate: { type: "string" },
      divisionResultsLabelTemplate: { type: "string" },
      noArticlesTitle: { type: "string" },
      noArticlesSearchDescription: { type: "text" },
      noArticlesDefaultDescription: { type: "text" },
      clearFiltersLabel: { type: "string" },
      loadMoreLabel: { type: "string" },
      loadingLabel: { type: "string" },
      divisionsTitle: { type: "string" },
      allDivisionsLabel: { type: "string" },
      newsletterTitle: { type: "string" },
      newsletterDescription: { type: "text" },
      newsletterPlaceholder: { type: "string" },
      newsletterSubmitLabel: { type: "string" },
      newsletterSubmittingLabel: { type: "string" },
      toastCloseLabel: { type: "string" },
      invalidEmailTitle: { type: "string" },
      invalidEmailDescription: { type: "text" },
      subscribeSuccessTitle: { type: "string" },
      subscribeSuccessDescription: { type: "text" },
      detailBackLabel: { type: "string" },
      detailNotFoundTitle: { type: "string" },
      relatedTitle: { type: "string" },
      relatedDescription: { type: "text" },
      publishedInLabel: { type: "string" },
    },
  },

  "api::contact-submission.contact-submission": {
    singularName: "contact-submission",
    pluralName: "contact-submissions",
    displayName: "Contact Submission",
    kind: "collectionType",
    draftAndPublish: false,
    attributes: {
      firstName: { type: "string", required: true },
      lastName: { type: "string", required: true },
      email: { type: "email", required: true },
      phone: { type: "string" },
      company: { type: "string" },
      service: { type: "string" },
      serviceLabel: { type: "string" },
      message: { type: "text", required: true },
      recipient: { type: "email" },
      subject: { type: "string" },
      source: { type: "string" },
      status: { type: "enumeration", enum: ["new", "read", "replied", "archived"], default: "new" },
      metadata: { type: "json" },
    },
  },

  "api::service-page.service-page": {
    singularName: "service-page",
    pluralName: "service-pages",
    displayName: "Service Page",
    kind: "singleType",
    attributes: {
      route: { type: "string" },
      seo: { type: "component", repeatable: false, component: "shared.seo" },
      hero: { type: "component", repeatable: false, component: "sections.hero" },
      divisionsTitle: { type: "string" },
      divisionsSubtitle: { type: "text" },
      divisionCardCtaLabel: { type: "string" },
      divisionMoreLabel: { type: "string" },
      divisionLessLabel: { type: "string" },
      benefitsTitle: { type: "string" },
      benefitsSubtitle: { type: "text" },
      benefits: { type: "component", repeatable: true, component: "sections.benefit-item" },
      benefitSeeMoreLabel: { type: "string" },
      benefitSeeLessLabel: { type: "string" },
      processTitle: { type: "string" },
      processDescription: { type: "text" },
      processSteps: { type: "component", repeatable: true, component: "sections.process-step" },
      processImage: { type: "string" },
      processImageAlt: { type: "string" },
      processMoreLabel: { type: "string" },
      processLessLabel: { type: "string" },
      processViewAllLabel: { type: "string" },
      ctaTitle: { type: "string" },
      ctaDescription: { type: "text" },
      ctaPrimaryLabel: { type: "string" },
      ctaPrimaryUrl: { type: "string" },
      ctaSecondaryLabel: { type: "string" },
      ctaSecondaryUrl: { type: "string" },
    },
  },

  "api::case-study-page.case-study-page": {
    singularName: "case-study-page",
    pluralName: "case-study-pages",
    displayName: "Case Study Page",
    kind: "singleType",
    attributes: {
      route: { type: "string" },
      seo: { type: "component", repeatable: false, component: "shared.seo" },
      heroBadgeLabel: { type: "string" },
      heroTitle: { type: "string" },
      heroHighlightedTitle: { type: "string" },
      heroDescription: { type: "text" },
      featuredTitle: { type: "string" },
      featuredSubtitle: { type: "text" },
      featuredCardCtaLabel: { type: "string" },
      allTitle: { type: "string" },
      singleCountLabel: { type: "string" },
      pluralCountLabel: { type: "string" },
      cardCtaLabel: { type: "string" },
      fallbackCategoryLabel: { type: "string" },
      fallbackImage: { type: "string" },
      notFoundTitle: { type: "string" },
      detailBackLabel: { type: "string" },
      detailVisitProjectFallbackLabel: { type: "string" },
      detailCtaTitle: { type: "string" },
      detailCtaDescription: { type: "text" },
      detailCtaPrimaryLabel: { type: "string" },
      detailCtaPrimaryUrl: { type: "string" },
      detailCtaSecondaryLabel: { type: "string" },
      detailCtaSecondaryUrl: { type: "string" },
    },
  },

  // ---------------------------------------------------
  // COLLECTION TYPES
  // ---------------------------------------------------
  "api::blog-post.blog-post": {
    singularName: "blog-post",
    pluralName: "blog-posts",
    displayName: "Blog Post",
    kind: "collectionType",
    draftAndPublish: true,
    attributes: {
      externalId: { type: "string" },
      title: { type: "string", required: true },
      slug: { type: "uid", targetField: "title", required: true },
      excerpt: { type: "text" },
      content: { type: "richtext" },
      author: { type: "string" },
      category: { type: "string" },
      publishDate: { type: "datetime" },
      readTime: { type: "string" },
      image: { type: "string" },
    },
  },

  "api::case-study.case-study": {
    singularName: "case-study",
    pluralName: "case-studies",
    displayName: "Case Study",
    kind: "collectionType",
    draftAndPublish: true,
    attributes: {
      externalId: { type: "string" },
      title: { type: "string", required: true },
      slug: { type: "uid", targetField: "title", required: true },
      subtitle: { type: "string" },
      intro: { type: "text" },
      image: { type: "string" },
      category: { type: "string" },
      client: { type: "string" },
      ctaUrl: { type: "string" },
      ctaText: { type: "string" },
      sections: { type: "json" },
      rawData: { type: "json" },
    },
  },

  "api::service-division.service-division": {
    singularName: "service-division",
    pluralName: "service-divisions",
    displayName: "Service Division",
    kind: "collectionType",
    draftAndPublish: true,
    attributes: {
      externalId: { type: "string" },
      name: { type: "string", required: true },
      slug: { type: "uid", targetField: "name", required: true },
      description: { type: "text" },
      icon: { type: "string" },
      color: { type: "string" },
      hero: { type: "component", repeatable: false, component: "sections.hero" },
      stats: { type: "component", repeatable: true, component: "sections.stat-item" },
      services: { type: "component", repeatable: true, component: "sections.service-feature" },
      programs: { type: "component", repeatable: true, component: "sections.program-item" },
      products: { type: "component", repeatable: true, component: "sections.product-item" },
      portfolio: { type: "component", repeatable: true, component: "sections.portfolio-item" },
      testimonials: { type: "component", repeatable: true, component: "sections.testimonial-item" },
      process: { type: "component", repeatable: true, component: "sections.process-step" },
      successStories: { type: "component", repeatable: true, component: "sections.success-story" },
      applications: { type: "component", repeatable: true, component: "sections.application-item" },
      features: { type: "json" },
      platforms: { type: "json" },
      learningOptions: { type: "json" },
      cta: { type: "json" },
      ubuxaIoTPro: { type: "json" },
      rawData: { type: "json" },
    },
  },
};

// -----------------------------------------------------
// SEED MAP
// -----------------------------------------------------
const singleTypeSeeds = [
  { endpoint: "/api/site-setting", data: () => strapiData.siteSetting, label: "Site Setting" },
  { endpoint: "/api/home-page", data: () => strapiData.homePage, label: "Home Page" },
  { endpoint: "/api/blog-page", data: () => strapiData.blogPage, label: "Blog Page" },
  { endpoint: "/api/about-page", data: () => strapiData.aboutPage, label: "About Page" },
  { endpoint: "/api/contact-page", data: () => strapiData.contactPage, label: "Contact Page" },
  { endpoint: "/api/service-page", data: () => strapiData.servicePage, label: "Service Page" },
  { endpoint: "/api/case-study-page", data: () => strapiData.caseStudyPage, label: "Case Study Page" },
];

const collectionSeeds = [
  {
    endpoint: "/api/blog-posts",
    items: () => strapiData.blogPosts || [],
    uniqueField: "externalId",
    label: (item) => `Blog Post: ${item.title}`,
  },
  {
    endpoint: "/api/case-studies",
    items: () => strapiData.caseStudies || [],
    uniqueField: "externalId",
    label: (item) => `Case Study: ${item.title}`,
  },
  {
    endpoint: "/api/service-divisions",
    items: () => strapiData.serviceDivisions || [],
    uniqueField: "externalId",
    label: (item) => `Service Division: ${item.name}`,
  },
];

// -----------------------------------------------------
// DATA NORMALIZATION BEFORE SEEDING
// -----------------------------------------------------
function normalizeSeedData() {
  if (Array.isArray(strapiData.blogPosts)) {
    strapiData.blogPosts = strapiData.blogPosts.map((item) => ({
      ...item,
      slug: item.slug || slugify(item.title),
    }));
  }

  if (Array.isArray(strapiData.caseStudies)) {
    strapiData.caseStudies = strapiData.caseStudies.map((item) => ({
      ...item,
      slug: item.slug || slugify(item.title),
    }));
  }

  if (Array.isArray(strapiData.serviceDivisions)) {
    strapiData.serviceDivisions = strapiData.serviceDivisions.map((item) => ({
      ...item,
      slug: item.slug || slugify(item.name),
    }));
  }
}

// -----------------------------------------------------
// MIGRATION FLOW
// -----------------------------------------------------
async function migrate() {
  console.log("🚀 Starting Strapi migration for Boffins Technology...");

  const adminJwt = await getAdminToken();
  if (!adminJwt && !activeToken) {
    console.error("❌ No admin JWT and no API token found. Cannot proceed.");
    console.error("Please add STRAPI_ADMIN_EMAIL and STRAPI_ADMIN_PASSWORD to your .env file");
    console.error("OR create an API token in Strapi Admin > Settings > API Tokens");
    process.exit(1);
  }

  // Token is already set from getAdminToken() above
  console.log("\n✅ Authentication ready");

  normalizeSeedData();

  // 1) CREATE COMPONENTS
  console.log("\n📦 Creating components...");
  for (const [uid, schema] of Object.entries(components)) {
    await createComponent(uid, schema);
  }

  // 2) CREATE CONTENT TYPES
  console.log("\n📄 Creating content types...");
  for (const [uid, schema] of Object.entries(contentTypes)) {
    await createContentType(uid, schema);
  }

  // 3) SEED SINGLE TYPES
  console.log("\n🌱 Seeding single types...");
  for (const seed of singleTypeSeeds) {
    await upsertSingleType(seed.endpoint, seed.data(), seed.label);
  }

  // 4) SEED COLLECTION TYPES
  console.log("\n🌿 Seeding collection types...");
  for (const seed of collectionSeeds) {
    const items = seed.items();
    console.log(`\n  → Seeding ${seed.endpoint} (${items.length} items)`);
    for (const [index, item] of items.entries()) {
      try {
        await upsertCollectionItem(seed.endpoint, item, seed.uniqueField, seed.label(item), true);
        // Add delay between items to avoid rate limiting
        if (index < items.length - 1) {
          await delay(1500);
        }
      } catch (error) {
        console.error(`❌ Error seeding ${seed.label(item)}: ${error.message}`);
        // If we hit rate limit, wait longer and retry
        if (error.message.includes("429") || error.message.includes("RateLimit")) {
          console.log("⚠️ Rate limited, waiting 10 seconds...");
          await delay(10000);
          try {
            await upsertCollectionItem(seed.endpoint, item, seed.uniqueField, seed.label(item), true);
          } catch (retryError) {
            console.error(`❌ Retry failed for ${seed.label(item)}: ${retryError.message}`);
          }
        }
      }
    }
  }

  console.log("\n✨ Migration complete!");
  console.log("ℹ️ Media fields were created as file pickers where relevant.");
  console.log("ℹ️ Local image/file string paths were not auto-uploaded. Upload them in Strapi Media Library.");
  console.log("\n📊 Summary:");
  console.log(`  - ${singleTypeSeeds.length} Single Types seeded`);
  console.log(`  - ${(strapiData.blogPosts || []).length} Blog Posts seeded`);
  console.log(`  - ${(strapiData.caseStudies || []).length} Case Studies seeded`);
  console.log(`  - ${(strapiData.serviceDivisions || []).length} Service Divisions seeded`);
}

migrate().catch((error) => {
  console.error("\n❌ Migration crashed:");
  console.error(error?.message || error);
  process.exit(1);
});
