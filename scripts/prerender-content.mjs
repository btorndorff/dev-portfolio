import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const distIndex = join(distDir, "index.html");

const SECTIONS = ["work", "play"];

const SITE_URL = (process.env.SITE_URL || "https://benorndorff.me").replace(/\/$/, "");
const DEFAULT_OG = "/og/default.png";
const SITE_TITLE = "Ben Orndorff";
const SITE_DESCRIPTION = "Ben Orndorff — work, play, photos.";

function extractFrontmatter(source) {
  const match = source.match(/export\s+const\s+frontmatter\s*=\s*(\{[\s\S]*?\n\})\s*;?/);
  if (!match) return null;
  const ctx = { value: null };
  vm.createContext(ctx);
  vm.runInContext(`value = ${match[1]}`, ctx, { timeout: 1000 });
  return ctx.value;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildMetaTags({ title, description, image, url, type }) {
  const absImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  return [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:image" content="${escapeHtml(absImage)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(absImage)}" />`,
  ].join("\n    ");
}

function injectHead(html, { title, metaTags }) {
  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = out.replace("</head>", `    ${metaTags}\n  </head>`);
  return out;
}

const shell = readFileSync(distIndex, "utf8");

let total = 0;
for (const section of SECTIONS) {
  const contentDir = join(root, "src/content", section);
  let files;
  try {
    files = readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  } catch {
    console.warn(`[prerender] no content dir for ${section}, skipping`);
    continue;
  }

  for (const file of files) {
    const source = readFileSync(join(contentDir, file), "utf8");
    const fm = extractFrontmatter(source);
    if (!fm) {
      console.warn(`[prerender] skipping ${section}/${file}: no frontmatter`);
      continue;
    }
    if (fm.hidden) continue;

    const slug = fm.slug;
    const image = fm.ogImage || DEFAULT_OG;
    const url = `${SITE_URL}/${section}/${slug}`;
    const pageTitle = `${fm.title} — ${SITE_TITLE}`;
    const metaTags = buildMetaTags({
      title: fm.title,
      description: fm.description,
      image,
      url,
      type: "article",
    });
    const html = injectHead(shell, { title: pageTitle, metaTags });
    const outDir = join(distDir, section, slug);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "index.html"), html, "utf8");
    console.log(`[prerender] ${section}/${slug} -> ${image}`);
    total += 1;
  }
}

const rootMeta = buildMetaTags({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  image: DEFAULT_OG,
  url: `${SITE_URL}/`,
  type: "website",
});
writeFileSync(distIndex, injectHead(shell, { title: SITE_TITLE, metaTags: rootMeta }), "utf8");
console.log(`[prerender] root index.html patched`);
console.log(`[prerender] done (${total} post${total === 1 ? "" : "s"})`);
