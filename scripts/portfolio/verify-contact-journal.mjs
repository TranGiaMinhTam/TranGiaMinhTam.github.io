import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const phaseIndex = process.argv.indexOf("--phase");
const phase = phaseIndex >= 0 ? process.argv[phaseIndex + 1] : "source";
const findings = [];
const add = (code, target, message) =>
  findings.push({ code, severity: "error", target, message });
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const sha = (relative) =>
  crypto
    .createHash("sha256")
    .update(fs.readFileSync(path.join(root, relative)))
    .digest("hex");
const walk = (relative) => {
  const directory = path.join(root, relative);
  return fs.existsSync(directory)
    ? fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const child = path.join(relative, entry.name);
        return entry.isDirectory()
          ? walk(child)
          : [child.replaceAll("\\", "/")];
      })
    : [];
};

const contactFiles = walk("src/portfolio/contact").filter(
  (file) => !file.includes(".test."),
);
const journalFiles = walk("src/portfolio/journal").filter(
  (file) => !file.includes(".test."),
);
if (contactFiles.length !== 6)
  add(
    "U07-SCP-001",
    "src/portfolio/contact",
    `Expected 6 non-test Contact files; found ${contactFiles.length}.`,
  );
if (journalFiles.length !== 10)
  add(
    "U07-SCP-002",
    "src/portfolio/journal",
    `Expected 10 non-test Journal files; found ${journalFiles.length}.`,
  );

const sourceText = [
  ...contactFiles,
  ...journalFiles,
  "src/portfolio/model/researchNoteCatalog.ts",
]
  .map(read)
  .join("\n");
for (const [code, pattern, message] of [
  [
    "U07-CNT-001",
    /minhtamtrangia@gmail\.com/,
    "Verified recipient is missing.",
  ],
  [
    "U07-CNT-002",
    /Portfolio opportunity enquiry/,
    "Approved mailto subject is missing.",
  ],
  [
    "U07-LZY-001",
    /import\(['"]\.\/JournalRouteEntry['"]\)/,
    "Journal presentation is not dynamically imported.",
  ],
])
  if (!pattern.test(sourceText)) add(code, "src/portfolio", message);

for (const [code, pattern, message] of [
  [
    "U07-SEC-001",
    /dangerouslySetInnerHTML|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/,
    "Runtime network or unsafe markup surface detected.",
  ],
  [
    "U07-SEC-002",
    /\b(?:localStorage|sessionStorage|indexedDB|sendBeacon)\b/,
    "Draft persistence or telemetry surface detected.",
  ],
  [
    "U07-REL-001",
    /journalPosts|first-local-journal|wordpress(?:\.com)?|nham\s+hung|50\+\s*participants|data\s+engineer/i,
    "Former-owner or unsupported content detected.",
  ],
  [
    "U07-SEC-003",
    /(?:https?:|javascript:|data:)/i,
    "Remote or unsafe URL literal detected in U-07 source.",
  ],
])
  if (pattern.test(sourceText))
    add(code, "src/portfolio/contact-journal", message);

const appHash = sha("src/App.tsx");
const preflight = JSON.parse(read("artifacts/portfolio/u07/preflight.json"));
if (phase !== "active" && appHash !== preflight.protectedHashes["src/App.tsx"])
  add(
    "U07-GATE-001",
    "src/App.tsx",
    "Live entry changed before rendered candidate approval.",
  );
const appText = read("src/App.tsx");
if (
  phase === "active" &&
  (!appText.includes("contactBodyRegistry") ||
    !appText.includes("JournalRoute"))
)
  add("U07-ACT-001", "src/App.tsx", "Combined U-07 activation is missing.");
if (sha("package-lock.json") !== "46c5271e0ef6101dbe3dd45399c3c615a2755c4e8139d80c3efb0a71c6389971")
  add("U07-DEP-001", "package-lock.json", "Dependency lockfile changed.");

const catalogText = read("src/portfolio/model/researchNoteCatalog.ts");
if ((catalogText.match(/slug:\s*researchNoteSlug\(/g) ?? []).length !== 0)
  add(
    "U07-NOT-003",
    "src/portfolio/model/researchNoteCatalog.ts",
    "The removed project note is still published.",
  );
const bodyText = read("src/portfolio/contact/sectionBodies.tsx");
if ((bodyText.match(/^\s{2}contact:/gm) ?? []).length !== 1)
  add(
    "U07-OWN-001",
    "src/portfolio/contact/sectionBodies.tsx",
    "Contact registry must own exactly one body.",
  );

const inventory = JSON.parse(
  read("artifacts/portfolio/u07/cleanup-inventory.json"),
);
if (
  inventory.targets.length !== 12 ||
  inventory.deletionAuthorized !== false ||
  inventory.targets.some(({ disposition }) => disposition !== "retain")
) {
  add(
    "U07-CLN-001",
    "artifacts/portfolio/u07/cleanup-inventory.json",
    "Cleanup inventory must retain all twelve exact targets.",
  );
}
for (const target of inventory.targets) {
  if (
    !fs.existsSync(path.join(root, target.path)) ||
    sha(target.path) !== target.sha256
  )
    add(
      "U07-CLN-002",
      target.path,
      "Retained legacy target changed or is missing.",
    );
  const recovery = path.join(
    "artifacts/portfolio/u07/recovery/legacy",
    target.path === "src/templates/journalPostPages.test.tsx"
      ? `${target.path}.payload`
      : target.path,
  );
  if (
    !fs.existsSync(path.join(root, recovery)) ||
    sha(recovery) !== target.sha256
  )
    add(
      "U07-RCV-001",
      recovery,
      "Legacy recovery payload is missing or mismatched.",
    );
}

if (phase === "candidate" || phase === "active") {
  const reportPath =
    phase === "active"
      ? "artifacts/portfolio/u07/active.json"
      : "artifacts/portfolio/u07/candidate.json";
  if (!fs.existsSync(path.join(root, reportPath)))
    add("U07-PER-001", reportPath, "Candidate measurement report is missing.");
  else {
    const report = JSON.parse(read(reportPath));
    if (
      report.findings.length ||
      !report.absoluteBudgetsPass ||
      !report.noRegression
    )
      add("U07-PER-002", reportPath, "Candidate measurement gate failed.");
    if (!report.lazyEntry || report.lazyEntry === "not-applicable")
      add(
        "U07-LZY-002",
        reportPath,
        "Journal lazy manifest classification is missing.",
      );
    if (report.comparison.evidenceGrowthBytes !== 0)
      add("U07-EVD-001", reportPath, "U-07 evidence asset growth is not zero.");
  }
}

findings.sort(
  (left, right) =>
    left.code.localeCompare(right.code) ||
    left.target.localeCompare(right.target),
);
const report = {
  schemaVersion: 1,
  check: "contact-journal",
  phase,
  contactFileCount: contactFiles.length,
  journalFileCount: journalFiles.length,
  productionNoteCount: 0,
  cleanupTargetCount: inventory.targets.length,
  u07EvidenceBytes: 0,
  findings,
  counts: { errors: findings.length, warnings: 0 },
  canProceed: findings.length === 0,
};
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.canProceed ? 0 : 1;
