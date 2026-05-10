// @ts-nocheck
/**
 * STRAPI DIAGNOSTIC SCRIPT
 * Checks Strapi version, available endpoints, and permissions
 */

require("ts-node").register({
  transpileOnly: true,
  compilerOptions: { module: "commonjs", moduleResolution: "node" },
});

const fs = require("fs");
const path = require("path");

// Load .env
try {
  const envPath = path.resolve(__dirname, "../.env");
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf8");
    envConfig.split("\n").forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim().replace(/^['"](.*)['"]$/, "$1");
      }
    });
  }
} catch (e) {}

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const ADMIN_EMAIL = process.env.STRAPI_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD;

async function diagnose() {
  console.log("🔍 Strapi Diagnostic Tool\n");
  console.log(`Strapi URL: ${STRAPI_URL}\n`);

  // 1. Check if Strapi is running
  try {
    const healthCheck = await fetch(`${STRAPI_URL}/admin`, { method: "HEAD" });
    console.log(`✅ Strapi is running (${healthCheck.status} ${healthCheck.statusText})`);
  } catch (e) {
    console.error(`❌ Cannot reach Strapi at ${STRAPI_URL}`);
    console.error(e.message);
    process.exit(1);
  }

  // 2. Login as admin
  let adminToken = null;
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    console.log(`\n🔐 Attempting admin login...`);
    try {
      const loginRes = await fetch(`${STRAPI_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
      });
      const loginData = await loginRes.json();
      
      if (loginData?.data?.token) {
        adminToken = loginData.data.token;
        console.log("✅ Admin login successful");
      } else {
        console.error("❌ Admin login failed:", JSON.stringify(loginData));
      }
    } catch (e) {
      console.error("❌ Login error:", e.message);
    }
  } else {
    console.log("⚠️ No admin credentials in .env");
  }

  // 3. Try different API endpoints
  console.log("\n📡 Testing API endpoints...");
  
  const testEndpoints = [
    { path: "/api", method: "GET", desc: "Root API" },
    { path: "/api/site-setting", method: "GET", desc: "Site Setting (single type)" },
    { path: "/api/home-page", method: "GET", desc: "Home Page (single type)" },
    { path: "/api/blog-page", method: "GET", desc: "Blog Page (single type)" },
    { path: "/api/service-page", method: "GET", desc: "Service Page (single type)" },
    { path: "/api/case-study-page", method: "GET", desc: "Case Study Page (single type)" },
    { path: "/api/contact-submissions", method: "POST", desc: "Contact Submissions (POST)", needsAuth: true },
    { path: "/api/blog-posts", method: "GET", desc: "Blog Posts (collection)" },
    { path: "/api/blog-posts", method: "POST", desc: "Blog Posts (POST)", needsAuth: true },
    { path: "/api/content-manager/content-types", method: "GET", desc: "Content Manager content-types", needsAuth: true },
    { path: "/api/content-manager/collection-types", method: "GET", desc: "Content Manager collection-types", needsAuth: true },
  ];

  for (const ep of testEndpoints) {
    try {
      const headers = { "Content-Type": "application/json" };
      if (ep.needsAuth && adminToken) {
        headers["Authorization"] = `Bearer ${adminToken}`;
      }

      const res = await fetch(`${STRAPI_URL}${ep.path}`, { method: ep.method, headers });
      const status = res.status;
      
      if (status === 200) {
        console.log(`  ✅ ${ep.desc}: ${status} OK`);
        if (!ep.needsAuth || adminToken) {
          try {
            const data = await res.json();
            if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
              console.log(`     → Found ${data.data.length} items`);
            } else if (data?.data) {
              console.log(`     → Single type exists`);
            }
          } catch {}
        }
      } else if (status === 401) {
        console.log(`  ⚠️ ${ep.desc}: ${status} Unauthorized (check credentials)`);
      } else if (status === 403) {
        console.log(`  ⚠️ ${ep.desc}: ${status} Forbidden (check user permissions in Strapi Admin > Settings > Roles > Public/Authenticated)`);
      } else if (status === 404) {
        console.log(`  ❌ ${ep.desc}: ${status} Not Found`);
      } else if (status === 405) {
        console.log(`  ❌ ${ep.desc}: ${status} Method Not Allowed (endpoint doesn't support ${ep.method})`);
      } else {
        console.log(`  ⚠️ ${ep.desc}: ${status} ${res.statusText}`);
      }
    } catch (e) {
      console.log(`  ❌ ${ep.desc}: ${e.message}`);
    }
  }

  // 4. Check content types
  if (adminToken) {
    console.log("\n📋 Checking content types...");
    try {
      const res = await fetch(`${STRAPI_URL}/api/content-manager/content-types`, {
        headers: { "Authorization": `Bearer ${adminToken}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data?.data) {
          console.log(`✅ Found ${data.data.length} content types:`);
          data.data.forEach(ct => {
            console.log(`  - ${ct.uid} (${ct.kind})`);
          });
        }
      }
    } catch (e) {
      console.log("⚠️ Could not fetch content types:", e.message);
    }
  }

  console.log("\n✨ Diagnostic complete!");
  console.log("\n💡 Recommendations:");
  console.log("  - If you see 405 errors, use Content Manager API endpoints");
  console.log("  - If you see 401 errors, check your API token or admin credentials");
  console.log("  - If you see 403 errors, check user permissions in Strapi Admin");
}

diagnose().catch(console.error);
