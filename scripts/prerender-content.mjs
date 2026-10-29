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

function videoMimeType(url) {
  const extension = new URL(url, SITE_URL).pathname.split(".").pop().toLowerCase();
  return { mp4: "video/mp4", mov: "video/quicktime", webm: "video/webm" }[extension];
}

function buildMetaTags({ title, description, image, url, type, video, videoWidth, videoHeight }) {
  const absImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const absVideo = video ? new URL(video, SITE_URL).href : null;
  return [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:image" content="${escapeHtml(absImage)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="${type}" />`,
    ...(video ? [
      `<meta property="og:video" content="${escapeHtml(absVideo)}" />`,
      ...(absVideo.startsWith("https:") ? [`<meta property="og:video:secure_url" content="${escapeHtml(absVideo)}" />`] : []),
      `<meta property="og:video:type" content="${videoMimeType(video)}" />`,
      ...(videoWidth && videoHeight ? [
        `<meta property="og:video:width" content="${videoWidth}" />`,
        `<meta property="og:video:height" content="${videoHeight}" />`,
      ] : []),
    ] : []),
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
    const video = fm.previewMedia && videoMimeType(fm.previewMedia) ? fm.previewMedia : undefined;
    const url = `${SITE_URL}/${section}/${slug}`;
    const pageTitle = `${fm.title} — ${SITE_TITLE}`;
    const metaTags = buildMetaTags({
      title: fm.title,
      description: fm.description,
      image,
      url,
      type: "article",
      video,
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
  video: "/og/video.mp4",
  videoWidth: 1920,
  videoHeight: 1080,
});
writeFileSync(distIndex, injectHead(shell, { title: SITE_TITLE, metaTags: rootMeta }), "utf8");
console.log(`[prerender] root index.html patched`);

for (const section of ["work", "play", "photos"]) {
  const title = `${section[0].toUpperCase()}${section.slice(1)} — ${SITE_TITLE}`;
  const metaTags = buildMetaTags({
    title,
    description: SITE_DESCRIPTION,
    image: DEFAULT_OG,
    url: `${SITE_URL}/${section}`,
    type: "website",
  });
  const outDir = join(distDir, section);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), injectHead(shell, { title, metaTags }), "utf8");
  console.log(`[prerender] ${section} -> ${DEFAULT_OG}`);
}
console.log(`[prerender] done (${total} post${total === 1 ? "" : "s"})`);
