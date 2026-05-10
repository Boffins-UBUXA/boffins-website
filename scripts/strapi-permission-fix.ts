// @ts-nocheck
/**
 * STRAPI PERMISSION FIX SCRIPT
 * Automatically configures Public role permissions for migration
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

const contentTypes = [
  { uid: "api::site-setting.site-setting", actions: ["find"] },
  { uid: "api::home-page.home-page", actions: ["find"] },
  { uid: "api::blog-page.blog-page", actions: ["find"] },
  { uid: "api::about-page.about-page", actions: ["find"] },
  { uid: "api::contact-page.contact-page", actions: ["find"] },
  { uid: "api::contact-submission.contact-submission", actions: ["create"] },
  { uid: "api::service-page.service-page", actions: ["find"] },
  { uid: "api::case-study-page.case-study-page", actions: ["find"] },
  { uid: "api::blog-post.blog-post", actions: ["find", "findOne", "create", "update", "delete"] },
  { uid: "api::case-study.case-study", actions: ["find", "findOne", "create", "update", "delete"] },
  { uid: "api::service-division.service-division", actions: ["find", "findOne", "create", "update", "delete"] },
];

async function fixPermissions() {
  console.log("🔧 Strapi Permission Fix Script\n");

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("❌ Admin credentials required!");
    console.error("Add STRAPI_ADMIN_EMAIL and STRAPI_ADMIN_PASSWORD to your .env file");
    process.exit(1);
  }

  // Login
  console.log("🔐 Logging in as admin...");
  let adminToken;
  try {
    const loginRes = await fetch(`${STRAPI_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    });
    const loginData = await loginRes.json();
    
    if (loginData?.data?.token) {
      adminToken = loginData.data.token;
      console.log("✅ Admin login successful\n");
    } else {
      console.error("❌ Login failed:", JSON.stringify(loginData));
      process.exit(1);
    }
  } catch (e) {
    console.error("❌ Login error:", e.message);
    process.exit(1);
  }

  // Get current Public role
  console.log("📋 Fetching Public role...");
  let publicRoleId;
  let currentPermissions = {};
  
  try {
    const rolesRes = await fetch(`${STRAPI_URL}/admin/roles`, {
      headers: { "Authorization": `Bearer ${adminToken}` }
    });
    const rolesData = await rolesRes.json();
    
    const publicRole = rolesData?.data?.find(r => r.name === "Public");
    if (!publicRole) {
      console.error("❌ Public role not found");
      process.exit(1);
    }
    
    publicRoleId = publicRole.id;
    console.log(`✅ Found Public role (ID: ${publicRoleId})\n`);
  } catch (e) {
    console.error("❌ Error fetching roles:", e.message);
    process.exit(1);
  }

  // Build permissions
  console.log("🔨 Building permissions...");
  const permissions = {};
  
  for (const ct of contentTypes) {
    permissions[ct.uid] = {};
    for (const action of ct.actions) {
      permissions[ct.uid][action] = true;
    }
  }

  console.log("\n📝 Permissions to set:");
  for (const [uid, actions] of Object.entries(permissions)) {
    const actionList = Object.keys(actions).join(", ");
    console.log(`  - ${uid}: ${actionList}`);
  }

  // Update Public role permissions
  console.log("\n🔄 Updating Public role permissions...");
  
  try {
    const permissionsArray = [];
    
    for (const ct of contentTypes) {
      for (const action of ct.actions) {
        permissionsArray.push({
          action: action,
          subject: ct.uid,
        });
      }
    }

    const updateRes = await fetch(`${STRAPI_URL}/admin/roles/${publicRoleId}/permissions`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${adminToken}`
      },
      body: JSON.stringify({ permissions: permissionsArray })
    });

    if (updateRes.ok) {
      const updateData = await updateRes.json();
      console.log("✅ Permissions updated successfully!\n");
    } else {
      const errorText = await updateRes.text();
      console.error("❌ Failed to update permissions:", errorText);
      console.log("\n💡 Manual setup required. See: scripts/STRAPI_PERMISSIONS_SETUP.md");
      process.exit(1);
    }
  } catch (e) {
    console.error("❌ Error updating permissions:", e.message);
    console.log("\n💡 Manual setup required. See: scripts/STRAPI_PERMISSIONS_SETUP.md");
    process.exit(1);
  }

  // Test the permissions
  console.log("🧪 Testing permissions...");
  
  const testEndpoints = [
    { path: "/api/home-page", method: "GET" },
    { path: "/api/service-page", method: "GET" },
    { path: "/api/case-study-page", method: "GET" },
    { path: "/api/blog-posts", method: "GET" },
    { path: "/api/blog-posts", method: "POST", expectError: true },
  ];

  for (const ep of testEndpoints) {
    try {
      const res = await fetch(`${STRAPI_URL}${ep.path}`, {
        method: ep.method,
        headers: { "Content-Type": "application/json" }
      });
      
      if (res.status === 200 || res.status === 400 || res.status === 405) {
        console.log(`  ✅ ${ep.method} ${ep.path}: ${res.status} (accessible)`);
      } else if (res.status === 403) {
        console.log(`  ❌ ${ep.method} ${ep.path}: ${res.status} (still forbidden)`);
      } else if (res.status === 401) {
        console.log(`  ⚠️ ${ep.method} ${ep.path}: ${res.status} (unauthorized)`);
      } else {
        console.log(`  ⚠️ ${ep.method} ${ep.path}: ${res.status}`);
      }
    } catch (e) {
      console.log(`  ❌ ${ep.method} ${ep.path}: ${e.message}`);
    }
  }

  console.log("\n✨ Permission fix complete!");
  console.log("\n💡 Next steps:");
  console.log("  1. Run: npm run strapi:diagnose (to verify)");
  console.log("  2. Run: npm run strapi:sync (to migrate content)");
}

fixPermissions().catch(console.error);
