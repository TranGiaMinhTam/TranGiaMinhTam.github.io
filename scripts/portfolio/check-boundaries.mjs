import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceRoot = path.join(root, "src/portfolio");
const modeIndex = process.argv.indexOf("--mode");
const requestedMode = modeIndex >= 0 ? process.argv[modeIndex + 1] : "auto";
const findings = [];
const inspectExtensions = new Set([".ts", ".tsx", ".css"]);

const walk = (directory) =>
  fs.existsSync(directory)
    ? fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const resolved = path.join(directory, entry.name);
        return entry.isDirectory() ? walk(resolved) : [resolved];
      })
    : [];

const add = (code, target, message) =>
  findings.push({
    code,
    severity: "error",
    target: path.relative(root, target).replaceAll("\\", "/"),
    message,
  });

for (const file of walk(sourceRoot).filter(
  (item) =>
    inspectExtensions.has(path.extname(item)) && !/\.test\.[^.]+$/.test(item),
)) {
  const text = fs.readFileSync(file, "utf8");
  if (
    /from\s+['"](?:@chakra-ui|tailwindcss|@tailwindcss|\.\.\/\.\.\/templates)/.test(
      text,
    )
  )
    add(
      "BND-001",
      file,
      "Prohibited UI framework or rejected-presentation import.",
    );
  if (/assets\/minh-tam\/source\//.test(text))
    add(
      "EVD-004",
      file,
      "Raw source evidence is referenced by the publishable boundary.",
    );
  if (/\b(?:javascript|data):/i.test(text))
    add("BND-002", file, "Unsafe URL scheme detected.");
  if (/!important\b/.test(text))
    add("BND-003", file, "Routine !important usage detected.");
  if (
    /\b(?:card|timeline|ledger|sidebar|casebook|notebook|quarto)(?:__|--|-)/i.test(
      text,
    )
  )
    add("BND-004", file, "Rejected generic presentation selector detected.");
}

const activeText = ["src/App.tsx", "src/main.tsx"]
  .map((entry) =>
    fs.existsSync(path.join(root, entry))
      ? fs.readFileSync(path.join(root, entry), "utf8")
      : "",
  )
  .join("\n");
const shellIsActive = /PortfolioExperience/.test(activeText);
const mode =
  requestedMode === "auto"
    ? shellIsActive
      ? "active"
      : "inactive"
    : requestedMode;
if (mode === "inactive" && shellIsActive)
  add(
    "MIG-001",
    path.join(root, "src/App.tsx"),
    "Scientific shell is active before candidate approval.",
  );
if (mode === "active" && !shellIsActive)
  add(
    "MIG-002",
    path.join(root, "src/App.tsx"),
    "Scientific shell is not present in the active entry.",
  );
if (
  mode === "active" &&
  /(?:Provider|App\.css|index\.css|getPortfolioTemplate|usePortfolioLayout|templates\/)/.test(
    activeText,
  )
) {
  add(
    "BND-005",
    path.join(root, "src/App.tsx"),
    "Rejected presentation remains reachable from the active entry.",
  );
}

if (mode === "candidate") {
  const candidateEntry = path.join(
    root,
    "scripts/portfolio/candidate/main.tsx",
  );
  if (
    !fs.existsSync(candidateEntry) ||
    !/PortfolioExperience/.test(fs.readFileSync(candidateEntry, "utf8"))
  ) {
    add(
      "MIG-003",
      candidateEntry,
      "Isolated candidate entry is missing the scientific shell.",
    );
  }
  if (shellIsActive)
    add(
      "MIG-001",
      path.join(root, "src/App.tsx"),
      "Scientific shell is active before candidate approval.",
    );
}

if (
  mode === "identity-source" ||
  mode === "identity-candidate" ||
  mode === "identity-active"
) {
  const identityRoot = path.join(sourceRoot, "identity");
  const identitySource = walk(identityRoot)
    .filter(
      (item) =>
        inspectExtensions.has(path.extname(item)) &&
        !/\.test\.[^.]+$/.test(item),
    )
    .map((item) => fs.readFileSync(item, "utf8"))
    .join("\n");
  for (const [code, pattern, message] of [
    [
      "U03-BND-001",
      /from\s+['"][^'"]*(?:\/data\/|templates\/|@chakra-ui|tailwindcss)/,
      "U-03 imports legacy data or rejected presentation.",
    ],
    [
      "U03-SEC-001",
      /dangerouslySetInnerHTML|<foreignObject|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/,
      "U-03 contains unsafe markup or a runtime network surface.",
    ],
    [
      "U03-BND-002",
      /portfolio\/(?:research|academic|tools|fieldwork|contact|journal)\//,
      "U-03 imports a later presentation domain.",
    ],
  ])
    if (pattern.test(identitySource)) add(code, identityRoot, message);

  const bodiesPath = path.join(identityRoot, "sectionBodies.tsx");
  const bodyText = fs.existsSync(bodiesPath)
    ? fs.readFileSync(bodiesPath, "utf8")
    : "";
  const bodyKeys = [...bodyText.matchAll(/^\s{2}(identity|questions):/gm)].map(
    (match) => match[1],
  );
  if (bodyKeys.join(",") !== "identity,questions")
    add(
      "U03-OWN-001",
      bodiesPath,
      "Expected exactly identity and questions body registrations.",
    );

  if (mode === "identity-candidate") {
    const candidateEntry = path.join(
      root,
      "scripts/portfolio/identity-candidate/main.tsx",
    );
    if (
      !fs.existsSync(candidateEntry) ||
      !/identityQuestionBodyRegistry/.test(
        fs.readFileSync(candidateEntry, "utf8"),
      )
    )
      add(
        "U03-CAN-001",
        candidateEntry,
        "U-03 candidate entry is missing its body registry.",
      );
    const preflightPath = path.join(
      root,
      "artifacts/portfolio/u03/preflight.json",
    );
    if (fs.existsSync(preflightPath)) {
      const preflight = JSON.parse(fs.readFileSync(preflightPath, "utf8"));
      const currentAppHash = crypto
        .createHash("sha256")
        .update(fs.readFileSync(path.join(root, "src/App.tsx")))
        .digest("hex");
      if (currentAppHash !== preflight.activeEntry.appSha256)
        add(
          "U03-GATE-001",
          path.join(root, "src/App.tsx"),
          "Live body registration changed before candidate approval.",
        );
    }
  }
  if (
    mode === "identity-active" &&
    !/identityQuestionBodyRegistry/.test(
      fs.readFileSync(path.join(root, "src/App.tsx"), "utf8"),
    )
  )
    add(
      "U03-ACT-001",
      path.join(root, "src/App.tsx"),
      "U-03 body registry is not active.",
    );
}

if (
  mode === "research-source" ||
  mode === "research-candidate" ||
  mode === "research-active"
) {
  const researchRoot = path.join(sourceRoot, "research");
  const researchSource = walk(researchRoot)
    .filter(
      (item) =>
        inspectExtensions.has(path.extname(item)) &&
        !/\.test\.[^.]+$/.test(item),
    )
    .map((item) => fs.readFileSync(item, "utf8"))
    .join("\n");
  for (const [code, pattern, message] of [
    [
      "U04-BND-001",
      /from\s+['"][^'"]*(?:\/data\/|templates\/|@chakra-ui|tailwindcss)/,
      "U-04 imports legacy data or rejected presentation.",
    ],
    [
      "U04-BND-002",
      /from\s+['"][^'"]*(?:\/identity\/|\/academics\/|\/impact\/|\/contact\/|\/journal\/)/,
      "U-04 imports an earlier or later presentation domain.",
    ],
    [
      "U04-SEC-001",
      /dangerouslySetInnerHTML|<foreignObject|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/,
      "U-04 contains unsafe markup or a runtime network surface.",
    ],
    [
      "U04-EVD-001",
      /assets\/minh-tam\/source\//,
      "U-04 references raw source evidence.",
    ],
    [
      "U04-REL-003",
      /journalPosts|first-local-journal|wordpress(?:\.com)?|nham\s+hung/i,
      "U-04 reaches former-owner writing.",
    ],
  ])
    if (pattern.test(researchSource)) add(code, researchRoot, message);

  const bodiesPath = path.join(researchRoot, "sectionBodies.tsx");
  const bodyText = fs.existsSync(bodiesPath)
    ? fs.readFileSync(bodiesPath, "utf8")
    : "";
  const bodyKeys = [
    ...bodyText.matchAll(
      /^\s{2}'(computational-projects|laboratory-research|data-stories)':/gm,
    ),
  ].map((match) => match[1]);
  if (
    bodyKeys.join(",") !==
    "computational-projects,laboratory-research,data-stories"
  )
    add(
      "U04-OWN-001",
      bodiesPath,
      "Expected exactly three U-04 body registrations.",
    );

  if (mode === "research-source" || mode === "research-candidate") {
    const preflightPath = path.join(
      root,
      "artifacts/portfolio/u04/preflight.json",
    );
    if (fs.existsSync(preflightPath)) {
      const preflight = JSON.parse(fs.readFileSync(preflightPath, "utf8"));
      const currentAppHash = crypto
        .createHash("sha256")
        .update(fs.readFileSync(path.join(root, "src/App.tsx")))
        .digest("hex");
      if (currentAppHash !== preflight.activeEntry.appSha256)
        add(
          "U04-GATE-001",
          path.join(root, "src/App.tsx"),
          "Live body registration changed before candidate approval.",
        );
    }
  }
  if (mode === "research-candidate") {
    const candidateEntry = path.join(
      root,
      "scripts/portfolio/research-candidate/main.tsx",
    );
    const candidateText = fs.existsSync(candidateEntry)
      ? fs.readFileSync(candidateEntry, "utf8")
      : "";
    if (
      !/identityQuestionBodyRegistry/.test(candidateText) ||
      !/researchDataBodyRegistry/.test(candidateText) ||
      !/composePortfolioBodyRegistries/.test(candidateText)
    )
      add(
        "U04-CAN-001",
        candidateEntry,
        "U-04 candidate registry composition is incomplete.",
      );
  }
  if (mode === "research-active") {
    const appText = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
    if (
      !/researchDataBodyRegistry/.test(appText) ||
      !/composePortfolioBodyRegistries/.test(appText)
    )
      add(
        "U04-ACT-001",
        path.join(root, "src/App.tsx"),
        "U-04 body registry is not active.",
      );
  }
}

if (
  mode === "academic-source" ||
  mode === "academic-candidate" ||
  mode === "academic-active"
) {
  const academicRoot = path.join(sourceRoot, "academics");
  const academicSource = walk(academicRoot)
    .filter(
      (item) =>
        inspectExtensions.has(path.extname(item)) &&
        !/\.test\.[^.]+$/.test(item),
    )
    .map((item) => fs.readFileSync(item, "utf8"))
    .join("\n");
  for (const [code, pattern, message] of [
    [
      "U05-BND-001",
      /from\s+['"][^'"]*(?:\/data\/|templates\/|@chakra-ui|tailwindcss)/,
      "U-05 imports legacy data or rejected presentation.",
    ],
    [
      "U05-BND-002",
      /from\s+['"][^'"]*(?:\/identity\/|\/research\/|\/impact\/|\/contact\/|\/journal\/)/,
      "U-05 imports another presentation domain.",
    ],
    [
      "U05-SEC-001",
      /dangerouslySetInnerHTML|<foreignObject|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/,
      "U-05 contains unsafe markup or a runtime network surface.",
    ],
    [
      "U05-EVD-001",
      /assets\/minh-tam\/source\//,
      "U-05 references raw source evidence.",
    ],
    [
      "U05-REL-003",
      /journalPosts|first-local-journal|wordpress(?:\.com)?|nham\s+hung/i,
      "U-05 reaches former-owner writing.",
    ],
  ])
    if (pattern.test(academicSource)) add(code, academicRoot, message);

  const bodiesPath = path.join(academicRoot, "sectionBodies.tsx");
  const bodyText = fs.existsSync(bodiesPath)
    ? fs.readFileSync(bodiesPath, "utf8")
    : "";
  const bodyKeys = [
    ...bodyText.matchAll(/^\s{2}'(academic-trajectory|evidence-library)':/gm),
  ].map((match) => match[1]);
  if (bodyKeys.join(",") !== "academic-trajectory,evidence-library")
    add(
      "U05-OWN-001",
      bodiesPath,
      "Expected exactly two U-05 body registrations.",
    );

  if (mode === "academic-source" || mode === "academic-candidate") {
    const preflightPath = path.join(
      root,
      "artifacts/portfolio/u05/preflight.json",
    );
    if (fs.existsSync(preflightPath)) {
      const preflight = JSON.parse(fs.readFileSync(preflightPath, "utf8"));
      const currentAppHash = crypto
        .createHash("sha256")
        .update(fs.readFileSync(path.join(root, "src/App.tsx")))
        .digest("hex");
      if (currentAppHash !== preflight.activeEntry.sha256)
        add(
          "U05-GATE-001",
          path.join(root, "src/App.tsx"),
          "Live body registration changed before candidate approval.",
        );
    }
  }
  if (mode === "academic-candidate") {
    const candidateEntry = path.join(
      root,
      "scripts/portfolio/academic-candidate/main.tsx",
    );
    const candidateText = fs.existsSync(candidateEntry)
      ? fs.readFileSync(candidateEntry, "utf8")
      : "";
    if (
      !/identityQuestionBodyRegistry/.test(candidateText) ||
      !/researchDataBodyRegistry/.test(candidateText) ||
      !/academicEvidenceBodyRegistry/.test(candidateText) ||
      !/composePortfolioBodyRegistries/.test(candidateText)
    )
      add(
        "U05-CAN-001",
        candidateEntry,
        "U-05 candidate registry composition is incomplete.",
      );
  }
  if (mode === "academic-active") {
    const appText = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
    if (
      !/academicEvidenceBodyRegistry/.test(appText) ||
      !/composePortfolioBodyRegistries/.test(appText)
    )
      add(
        "U05-ACT-001",
        path.join(root, "src/App.tsx"),
        "U-05 body registry is not active.",
      );
  }
}

if (
  mode === "tools-fieldwork-source" ||
  mode === "tools-fieldwork-candidate" ||
  mode === "tools-fieldwork-active"
) {
  const impactRoot = path.join(sourceRoot, "impact");
  const impactSource = walk(impactRoot)
    .filter(
      (item) =>
        inspectExtensions.has(path.extname(item)) &&
        !/\.test\.[^.]+$/.test(item),
    )
    .map((item) => fs.readFileSync(item, "utf8"))
    .join("\n");
  for (const [code, pattern, message] of [
    [
      "U06-BND-001",
      /from\s+['"][^'"]*(?:\/data\/|templates\/|@chakra-ui|tailwindcss)/,
      "U-06 imports legacy data or rejected presentation.",
    ],
    [
      "U06-BND-002",
      /from\s+['"][^'"]*(?:\/identity\/|\/research\/|\/academics\/|\/contact\/|\/journal\/)/,
      "U-06 imports another presentation domain.",
    ],
    [
      "U06-SEC-001",
      /dangerouslySetInnerHTML|<foreignObject|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/,
      "U-06 contains unsafe markup or a runtime network surface.",
    ],
    [
      "U06-EVD-001",
      /assets\/minh-tam\//,
      "U-06 directly references a published or raw asset.",
    ],
    [
      "U06-REL-001",
      /(?:awards|gallery|videos)\.ts|components\/Awards|journalPosts|wordpress(?:\.com)?|nham\s+hung/i,
      "U-06 reaches excluded legacy or former-owner content.",
    ],
  ])
    if (pattern.test(impactSource)) add(code, impactRoot, message);

  const bodiesPath = path.join(impactRoot, "sectionBodies.tsx");
  const bodyText = fs.existsSync(bodiesPath)
    ? fs.readFileSync(bodiesPath, "utf8")
    : "";
  const bodyKeys = [
    ...bodyText.matchAll(/^\s{2}'?(tools|fieldwork-leadership)'?:/gm),
  ].map((match) => match[1]);
  if (bodyKeys.join(",") !== "tools,fieldwork-leadership")
    add(
      "U06-OWN-001",
      bodiesPath,
      "Expected exactly two U-06 body registrations.",
    );

  if (
    mode === "tools-fieldwork-source" ||
    mode === "tools-fieldwork-candidate"
  ) {
    const preflightPath = path.join(
      root,
      "artifacts/portfolio/u06/preflight.json",
    );
    if (fs.existsSync(preflightPath)) {
      const preflight = JSON.parse(fs.readFileSync(preflightPath, "utf8"));
      const currentAppHash = crypto
        .createHash("sha256")
        .update(fs.readFileSync(path.join(root, "src/App.tsx")))
        .digest("hex");
      if (currentAppHash !== preflight.activeEntry.sha256)
        add(
          "U06-GATE-001",
          path.join(root, "src/App.tsx"),
          "Live body registration changed before candidate approval.",
        );
    }
  }
  if (mode === "tools-fieldwork-candidate") {
    const candidateEntry = path.join(
      root,
      "scripts/portfolio/tools-fieldwork-candidate/main.tsx",
    );
    const candidateText = fs.existsSync(candidateEntry)
      ? fs.readFileSync(candidateEntry, "utf8")
      : "";
    for (const registry of [
      "identityQuestionBodyRegistry",
      "researchDataBodyRegistry",
      "academicEvidenceBodyRegistry",
      "toolsFieldworkBodyRegistry",
      "composePortfolioBodyRegistries",
    ]) {
      if (!candidateText.includes(registry))
        add(
          "U06-CAN-001",
          candidateEntry,
          `U-06 candidate is missing ${registry}.`,
        );
    }
  }
  if (mode === "tools-fieldwork-active") {
    const appText = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
    if (
      !/toolsFieldworkBodyRegistry/.test(appText) ||
      !/composePortfolioBodyRegistries/.test(appText)
    )
      add(
        "U06-ACT-001",
        path.join(root, "src/App.tsx"),
        "U-06 body registry is not active.",
      );
  }
}

if (
  mode === "contact-journal-source" ||
  mode === "contact-journal-candidate" ||
  mode === "contact-journal-active"
) {
  const contactRoot = path.join(sourceRoot, "contact");
  const journalRoot = path.join(sourceRoot, "journal");
  const u07Files = [
    ...walk(contactRoot),
    ...walk(journalRoot),
    path.join(sourceRoot, "model/researchNoteCatalog.ts"),
  ].filter(
    (item) =>
      inspectExtensions.has(path.extname(item)) && !/\.test\.[^.]+$/.test(item),
  );
  const u07Source = u07Files
    .map((item) => fs.readFileSync(item, "utf8"))
    .join("\n");
  for (const [code, pattern, message] of [
    [
      "U07-BND-001",
      /from\s+['"][^'"]*(?:\/data\/|templates\/|@chakra-ui|tailwindcss)/,
      "U-07 imports legacy data or rejected presentation.",
    ],
    [
      "U07-SEC-001",
      /dangerouslySetInnerHTML|<foreignObject|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/,
      "U-07 contains unsafe markup or a runtime network surface.",
    ],
    [
      "U07-SEC-002",
      /\b(?:localStorage|sessionStorage|indexedDB|sendBeacon)\b/,
      "U-07 contains a prohibited draft persistence or telemetry surface.",
    ],
    [
      "U07-REL-001",
      /journalPosts|first-local-journal|wordpress(?:\.com)?|nham\s+hung|50\+\s*participants|data\s+engineer/i,
      "U-07 reaches former-owner or unsupported content.",
    ],
    [
      "U07-EVD-001",
      /assets\/minh-tam\/source\//,
      "U-07 references raw source evidence.",
    ],
  ])
    if (pattern.test(u07Source)) add(code, contactRoot, message);

  const bodiesPath = path.join(contactRoot, "sectionBodies.tsx");
  const bodyText = fs.existsSync(bodiesPath)
    ? fs.readFileSync(bodiesPath, "utf8")
    : "";
  const bodyKeys = [...bodyText.matchAll(/^\s{2}'?(contact)'?:/gm)].map(
    (match) => match[1],
  );
  if (bodyKeys.join(",") !== "contact")
    add(
      "U07-OWN-001",
      bodiesPath,
      "Expected exactly one Contact body registration.",
    );

  const entryPath =
    mode === "contact-journal-candidate"
      ? path.join(root, "scripts/portfolio/contact-journal-candidate/main.tsx")
      : path.join(root, "src/App.tsx");
  const entryText = fs.existsSync(entryPath)
    ? fs.readFileSync(entryPath, "utf8")
    : "";
  if (mode === "contact-journal-source") {
    const preflight = JSON.parse(
      fs.readFileSync(
        path.join(root, "artifacts/portfolio/u07/preflight.json"),
        "utf8",
      ),
    );
    const currentAppHash = crypto
      .createHash("sha256")
      .update(fs.readFileSync(path.join(root, "src/App.tsx")))
      .digest("hex");
    if (currentAppHash !== preflight.protectedHashes["src/App.tsx"])
      add(
        "U07-GATE-001",
        path.join(root, "src/App.tsx"),
        "Live entry changed before rendered candidate approval.",
      );
  }
  if (mode === "contact-journal-candidate") {
    for (const contract of [
      "identityQuestionBodyRegistry",
      "researchDataBodyRegistry",
      "academicEvidenceBodyRegistry",
      "toolsFieldworkBodyRegistry",
      "contactBodyRegistry",
      "composePortfolioBodyRegistries",
      "JournalRoute",
    ]) {
      if (!entryText.includes(contract))
        add("U07-CAN-001", entryPath, `U-07 candidate is missing ${contract}.`);
    }
  }
  if (mode === "contact-journal-active") {
    if (
      !/contactBodyRegistry/.test(entryText) ||
      !/JournalRoute/.test(entryText)
    )
      add(
        "U07-ACT-001",
        entryPath,
        "U-07 Contact registry or Journal route is not active.",
      );
  }

  const journalEntry = path.join(journalRoot, "JournalRouteEntry.tsx");
  const routeText = fs.existsSync(path.join(journalRoot, "JournalRoute.tsx"))
    ? fs.readFileSync(path.join(journalRoot, "JournalRoute.tsx"), "utf8")
    : "";
  if (!/import\(['"]\.\/JournalRouteEntry['"]\)/.test(routeText))
    add(
      "U07-LAZY-001",
      journalEntry,
      "Journal entry is not behind the approved dynamic import.",
    );
  const staticEntryText = entryText + "\n" + routeText;
  if (/from\s+['"][^'"]*JournalRouteEntry/.test(staticEntryText))
    add(
      "U07-LAZY-002",
      entryPath,
      "Journal presentation is statically imported by the initial entry graph.",
    );

  const lockHash = crypto
    .createHash("sha256")
    .update(fs.readFileSync(path.join(root, "package-lock.json")))
    .digest("hex");
  if (
    lockHash !==
    "46c5271e0ef6101dbe3dd45399c3c615a2755c4e8139d80c3efb0a71c6389971"
  )
    add(
      "U07-DEP-001",
      path.join(root, "package-lock.json"),
      "Dependency lockfile changed during U-07.",
    );
}

const distRaw = path.join(root, "dist/assets/minh-tam/source");
if (fs.existsSync(distRaw))
  add("EVD-004", distRaw, "Raw evidence appears in deployable output.");

if (mode === "source-governance") {
  const browserEntries = [
    "src/App.tsx",
    "src/main.tsx",
    "src/portfolio/index.ts",
  ];
  for (const relative of browserEntries) {
    const target = path.join(root, relative);
    const text = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";
    if (/source-governance|portfolio\/archive|assets\/generated\/minh-tam|archive-manifest\.json/.test(text))
      add(
        "U01-BND-001",
        target,
        "U-01 contracts, generated catalog, or tooling entered an active browser entry before downstream approval.",
      );
  }

  const distRoot = path.join(root, "dist");
  for (const target of walk(distRoot)) {
    const relative = path.relative(distRoot, target).replaceAll("\\", "/");
    if (/minh-tam\/source|archive-manifest|source-governance|source-governance\.pbt|arbitraries\.mjs/i.test(relative))
      add("U01-BND-002", target, "Protected source or Node/PBT implementation appears in deployable output.");
    if (/\.(?:js|css|html|json)$/u.test(target)) {
      const text = fs.readFileSync(target, "utf8");
      if (/scripts\/portfolio\/source-governance|source-governance\.pbt|assets\/minh-tam\/source\//.test(text))
        add("U01-BND-003", target, "Deployable text references protected source or Node/PBT implementation.");
    }
  }
}

if (
  mode === "resume-content-source" ||
  mode === "resume-content-candidate" ||
  mode === "resume-content-active"
) {
  const resumeRoot = path.join(sourceRoot, "resume");
  const resumeSource = walk(resumeRoot)
    .filter(
      (item) =>
        inspectExtensions.has(path.extname(item)) &&
        !/\.test\.[^.]+$/.test(item),
    )
    .map((item) => fs.readFileSync(item, "utf8"))
    .join("\n");
  for (const [code, pattern, message] of [
    [
      "U03R-SEC-001",
      /dangerouslySetInnerHTML|<iframe|<dialog|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/,
      "Resume content adds unsafe markup, runtime networking, or a later-unit preview surface.",
    ],
    [
      "U03R-EVD-001",
      /assets\/minh-tam\/source\//,
      "Resume content references protected raw evidence.",
    ],
    [
      "U03R-PDF-001",
      /assets\/documents\/resume\.pdf/,
      "Resume content references the unrelated stale PDF.",
    ],
  ])
    if (pattern.test(resumeSource)) add(code, resumeRoot, message);

  if (mode === "resume-content-source") {
    if (/portfolio\/resume|resumeAction|resumeDownload/.test(activeText))
      add(
        "U03R-GATE-001",
        path.join(root, "src/App.tsx"),
        "Resume content is active before candidate approval.",
      );
  }

  if (mode === "resume-content-candidate") {
    const candidateEntry = path.join(
      root,
      "scripts/portfolio/resume-content-candidate/main.tsx",
    );
    const candidateText = fs.existsSync(candidateEntry)
      ? fs.readFileSync(candidateEntry, "utf8")
      : "";
    for (const contract of [
      "resumeContentSelection",
      "resumeDownload",
      "decorateRegistryWithResumeContent",
      "toMastheadResumeAction",
      "createIdentityQuestionBodyRegistry",
    ]) {
      if (!candidateText.includes(contract))
        add(
          "U03R-CAN-001",
          candidateEntry,
          `Resume candidate is missing ${contract}.`,
        );
    }
    const recoveryManifest = path.join(
      root,
      ".aidlc-recovery/resume-led-content-integration/manifest.json",
    );
    if (fs.existsSync(recoveryManifest)) {
      const recovery = JSON.parse(fs.readFileSync(recoveryManifest, "utf8"));
      const appState = recovery.targetStates.find(
        ({ path: target }) => target === "src/App.tsx",
      );
      const currentHash = crypto
        .createHash("sha256")
        .update(fs.readFileSync(path.join(root, "src/App.tsx")))
        .digest("hex");
      if (!appState || currentHash !== appState.sha256)
        add(
          "U03R-GATE-002",
          path.join(root, "src/App.tsx"),
          "Active composition changed after preflight and before candidate approval.",
        );
    }
  }

  if (mode === "resume-content-active") {
    for (const contract of [
      "resumeContentSelection",
      "resumeDownload",
      "decorateRegistryWithResumeContent",
      "toMastheadResumeAction",
    ]) {
      if (!activeText.includes(contract))
        add(
          "U03R-ACT-001",
          path.join(root, "src/App.tsx"),
          `Active composition is missing ${contract}.`,
        );
    }
  }
}

findings.sort(
  (a, b) => a.code.localeCompare(b.code) || a.target.localeCompare(b.target),
);
const report = {
  schemaVersion: 1,
  check: "portfolio-boundaries",
  mode,
  findings,
  counts: { errors: findings.length, warnings: 0 },
  canProceed: findings.length === 0,
};
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.canProceed ? 0 : 1;
