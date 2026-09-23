import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();
const argument = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
};
const dist = path.resolve(root, argument("--dist", "dist"));
const baselinePath = path.resolve(
  root,
  argument("--baseline", "artifacts/portfolio/u01/baseline.json"),
);
const outputValue = argument("--output");
const outputPath = outputValue ? path.resolve(root, outputValue) : undefined;
const javascriptBudget = Number(argument("--javascript-budget", "460800"));
const cssBudget = Number(argument("--css-budget", "76800"));
const regressionPercent = Number(argument("--regression-percent", "10"));
const javascriptRegressionPercent = Number(
  argument("--javascript-regression-percent", String(regressionPercent)),
);
const cssRegressionValue = argument(
  "--css-regression-percent",
  String(regressionPercent),
);
const cssRegressionPercent =
  cssRegressionValue === "none" ? undefined : Number(cssRegressionValue);
const lazyEntryName = argument("--lazy-entry");
const lazyJavascriptBudget = Number(argument("--lazy-javascript-budget", "0"));
const lazyCssBudget = Number(argument("--lazy-css-budget", "0"));
const evidenceGrowthBudget = Number(
  argument("--evidence-growth-budget", String(Number.POSITIVE_INFINITY)),
);
const manifestPath = path.join(dist, ".vite/manifest.json");

if (!fs.existsSync(manifestPath))
  throw new Error("Missing dist/.vite/manifest.json; run npm run build first.");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
const entryRecord = Object.entries(manifest).find(([, item]) => item.isEntry);
if (!entryRecord) throw new Error("Vite manifest has no entry record.");
const [entryKey] = entryRecord;

const collectStaticFiles = (key, files = new Set(), visited = new Set()) => {
  if (visited.has(key)) return files;
  visited.add(key);
  const item = manifest[key];
  if (!item) return files;
  files.add(item.file);
  for (const css of item.css ?? []) files.add(css);
  for (const imported of item.imports ?? [])
    collectStaticFiles(imported, files, visited);
  return files;
};
const initial = collectStaticFiles(entryKey);
const lazyRecord = lazyEntryName
  ? Object.entries(manifest).find(
      ([key, item]) =>
        key.includes(lazyEntryName) || item.src?.includes(lazyEntryName),
    )
  : undefined;
const lazy = lazyRecord ? collectStaticFiles(lazyRecord[0]) : new Set();
for (const file of initial) lazy.delete(file);
const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((item) => {
    const resolved = path.join(directory, item.name);
    return item.isDirectory() ? walk(resolved) : [resolved];
  });
const artifacts = walk(dist)
  .map((file) => {
    const relative = path.relative(dist, file).replaceAll("\\", "/");
    const bytes = fs.readFileSync(file);
    const isInitial = initial.has(relative) || relative === "index.html";
    const isLazy = lazy.has(relative);
    const category =
      isInitial && relative.endsWith(".js")
        ? "initial-javascript"
        : isInitial && relative.endsWith(".css")
          ? "initial-css"
          : isInitial
            ? "other-initial"
            : isLazy && relative.endsWith(".js")
              ? "lazy-javascript"
              : isLazy && relative.endsWith(".css")
                ? "lazy-css"
                : /\.(?:pdf|png|jpe?g|webp|avif)$/i.test(relative)
                  ? "evidence-asset"
                  : relative.endsWith(".js")
                    ? "lazy-javascript"
                    : "other-deployable";
    return {
      path: relative,
      category,
      initial: isInitial,
      bytes: bytes.length,
      gzipBytes: zlib.gzipSync(bytes, { level: 9, mtime: 0 }).length,
    };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

const total = (category) =>
  artifacts
    .filter((item) => item.category === category)
    .reduce((sum, item) => sum + item.bytes, 0);
const javascriptBytes = total("initial-javascript");
const cssBytes = total("initial-css");
const lazyJavascriptBytes = lazyEntryName ? total("lazy-javascript") : 0;
const lazyCssBytes = lazyEntryName ? total("lazy-css") : 0;
const evidenceAssetBytes = total("evidence-asset");
const baselineJs = baseline.entryGraph.javascript.bytes;
const baselineCss = baseline.entryGraph.css.bytes;
const percent = (current, previous) =>
  previous === 0
    ? current === 0
      ? 0
      : null
    : Number((((current - previous) / previous) * 100).toFixed(4));
const findings = [];
if (javascriptBytes > javascriptBudget)
  findings.push({
    code: "PER-001",
    severity: "error",
    target: "initial-javascript",
    message: `Initial JavaScript exceeds ${javascriptBudget.toLocaleString("en-US")} bytes.`,
  });
if (cssBytes > cssBudget)
  findings.push({
    code: "PER-002",
    severity: "error",
    target: "initial-css",
    message: `Initial CSS exceeds ${cssBudget.toLocaleString("en-US")} bytes.`,
  });
if (javascriptBytes > baselineJs * (1 + javascriptRegressionPercent / 100))
  findings.push({
    code: "PER-004",
    severity: "error",
    target: "initial-javascript",
    message: `Initial JavaScript regressed by more than ${javascriptRegressionPercent} percent.`,
  });
if (
  cssRegressionPercent !== undefined &&
  cssBytes > baselineCss * (1 + cssRegressionPercent / 100)
)
  findings.push({
    code: "PER-004",
    severity: "error",
    target: "initial-css",
    message: `Initial CSS regressed by more than ${cssRegressionPercent} percent.`,
  });
if (lazyEntryName && !lazyRecord)
  findings.push({
    code: "PER-005",
    severity: "error",
    target: lazyEntryName,
    message: "Configured lazy entry is missing from the Vite manifest.",
  });
if (lazyEntryName && lazyJavascriptBytes > lazyJavascriptBudget)
  findings.push({
    code: "PER-006",
    severity: "error",
    target: "lazy-javascript",
    message: `Lazy JavaScript exceeds ${lazyJavascriptBudget.toLocaleString("en-US")} bytes.`,
  });
if (lazyEntryName && lazyCssBytes > lazyCssBudget)
  findings.push({
    code: "PER-007",
    severity: "error",
    target: "lazy-css",
    message: `Lazy CSS exceeds ${lazyCssBudget.toLocaleString("en-US")} bytes.`,
  });
const baselineEvidenceBytes = baseline.evidenceAssetBytes ?? evidenceAssetBytes;
const evidenceGrowthBytes = evidenceAssetBytes - baselineEvidenceBytes;
if (evidenceGrowthBytes > evidenceGrowthBudget)
  findings.push({
    code: "PER-008",
    severity: "error",
    target: "evidence-assets",
    message: `Evidence assets grew by more than ${evidenceGrowthBudget.toLocaleString("en-US")} bytes.`,
  });
const report = {
  schemaVersion: 1,
  measuredAt: new Date().toISOString(),
  manifest: ".vite/manifest.json",
  artifacts,
  totals: {
    javascriptBytes,
    cssBytes,
    lazyJavascriptBytes,
    lazyCssBytes,
    otherInitialBytes: total("other-initial"),
    evidenceAssetBytes,
    deployableBytes: artifacts.reduce((sum, item) => sum + item.bytes, 0),
  },
  budgets: {
    javascriptBytes: javascriptBudget,
    cssBytes: cssBudget,
    javascriptRegressionPercent,
    cssRegressionPercent: cssRegressionPercent ?? "not-applicable",
    lazyJavascriptBytes: lazyEntryName
      ? lazyJavascriptBudget
      : "not-applicable",
    lazyCssBytes: lazyEntryName ? lazyCssBudget : "not-applicable",
    evidenceGrowthBytes: Number.isFinite(evidenceGrowthBudget)
      ? evidenceGrowthBudget
      : "not-applicable",
  },
  comparison: {
    baselineJavascriptBytes: baselineJs,
    baselineCssBytes: baselineCss,
    baselineEvidenceAssetBytes: baselineEvidenceBytes,
    javascriptChangePercent: percent(javascriptBytes, baselineJs),
    cssChangePercent: percent(cssBytes, baselineCss),
    evidenceGrowthBytes,
  },
  lazyEntry: lazyRecord
    ? {
        manifestKey: lazyRecord[0],
        source: lazyRecord[1].src ?? lazyRecord[0],
        files: [...lazy].sort(),
      }
    : lazyEntryName
      ? null
      : "not-applicable",
  findings,
  absoluteBudgetsPass: findings.every(
    (item) => !["PER-001", "PER-002"].includes(item.code),
  ),
  noRegression: findings.every((item) => item.code !== "PER-004"),
};
const serialized = `${JSON.stringify(report, null, 2)}\n`;
if (outputPath) fs.writeFileSync(outputPath, serialized);
console.log(serialized.trimEnd());
process.exitCode = findings.length === 0 ? 0 : 1;
