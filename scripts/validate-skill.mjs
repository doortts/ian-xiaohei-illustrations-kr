#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(message) {
  failures.push(message);
}

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function assertFile(relativePath) {
  if (!exists(relativePath)) {
    fail(`Missing required file: ${relativePath}`);
  }
}

function assertIncludes(relativePath, text, label = text) {
  const content = readText(relativePath);
  if (!content.includes(text)) {
    fail(`${relativePath} is missing required text: ${label}`);
  }
}

function readJson(relativePath) {
  try {
    return JSON.parse(readText(relativePath));
  } catch (error) {
    fail(`${relativePath} is not valid JSON: ${error.message}`);
    return {};
  }
}

function parseFrontmatter(relativePath) {
  const content = readText(relativePath);
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);

  if (!match) {
    fail(`${relativePath} is missing YAML frontmatter`);
    return {};
  }

  const fields = {};
  for (const line of match[1].split("\n")) {
    const field = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (field) {
      fields[field[1]] = field[2].trim();
    }
  }

  return fields;
}

function pngDimensions(relativePath) {
  const buffer = fs.readFileSync(path.join(repoRoot, relativePath));
  const pngSignature = "89504e470d0a1a0a";

  if (buffer.subarray(0, 8).toString("hex") !== pngSignature) {
    fail(`${relativePath} is not a PNG file`);
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function validateSkillShape() {
  const requiredFiles = [
    "pet-sketch-illustrations/SKILL.md",
    "pet-sketch-illustrations/agents/openai.yaml",
    "pet-sketch-illustrations/references/style-dna.md",
    "pet-sketch-illustrations/references/pet-character-ip.md",
    "pet-sketch-illustrations/references/composition-patterns.md",
    "pet-sketch-illustrations/references/prompt-template.md",
    "pet-sketch-illustrations/references/qa-checklist.md",
    "pet-sketch-illustrations/assets/character-reference-sheet.png",
    "pet-sketch-illustrations/VERSION",
    "CHANGELOG.md",
    "package.json",
    "NOTICE.md",
    "LICENSE",
    "evals/behavior-cases.json"
  ];

  for (const file of requiredFiles) {
    assertFile(file);
  }

  const frontmatter = parseFrontmatter("pet-sketch-illustrations/SKILL.md");
  if (frontmatter.name !== "pet-sketch-illustrations") {
    fail("SKILL.md frontmatter name must be pet-sketch-illustrations");
  }

  const description = frontmatter.description ?? "";
  for (const phrase of ["기술 글 본문 삽화", "손그림 삽화 구상", "shot lists", "edit/remove-title"]) {
    if (!description.includes(phrase)) {
      fail(`SKILL.md description should include trigger phrase: ${phrase}`);
    }
  }

  const openaiYaml = readText("pet-sketch-illustrations/agents/openai.yaml");
  for (const phrase of ["display_name:", "short_description:", "default_prompt:", "allow_implicit_invocation: true"]) {
    if (!openaiYaml.includes(phrase)) {
      fail(`agents/openai.yaml is missing ${phrase}`);
    }
  }
}

function validateVersionTracking() {
  const packageJson = readJson("package.json");
  const packageVersion = packageJson.version;
  const skillVersion = readText("pet-sketch-illustrations/VERSION").trim();
  const changelog = readText("CHANGELOG.md");

  if (!packageVersion || !/^\d+\.\d+\.\d+$/.test(packageVersion)) {
    fail("package.json version must be a semver string like 0.1.0");
  }

  if (skillVersion !== packageVersion) {
    fail(`Skill bundle VERSION (${skillVersion}) must match package.json version (${packageVersion})`);
  }

  if (!changelog.includes(`## ${packageVersion} - `)) {
    fail(`CHANGELOG.md must include a heading for package version ${packageVersion}`);
  }
}

function validateReferenceCoverage() {
  const skill = readText("pet-sketch-illustrations/SKILL.md");
  const references = [
    "references/style-dna.md",
    "references/pet-character-ip.md",
    "references/composition-patterns.md",
    "references/prompt-template.md",
    "references/qa-checklist.md",
    "assets/character-reference-sheet.png",
    "assets/examples/"
  ];

  for (const reference of references) {
    if (!skill.includes(reference)) {
      fail(`SKILL.md does not mention bundled resource: ${reference}`);
    }
  }
}

function validateBehaviorEvalFixtures() {
  const evalFile = "evals/behavior-cases.json";
  const behavior = readJson(evalFile);
  const cases = behavior.cases;
  const validOutcomes = new Set(["plan_only", "generate", "edit", "save", "out_of_scope"]);
  const requiredModes = ["plan_only", "generate", "edit", "save"];
  const seenIds = new Set();
  const seenModes = new Set();
  const seenGenerateCounts = new Set();
  let hasOutOfScopeCase = false;

  if (!Array.isArray(cases) || cases.length === 0) {
    fail(`${evalFile} must define a non-empty cases array`);
    return;
  }

  for (const testCase of cases) {
    if (!testCase || typeof testCase !== "object") {
      fail(`${evalFile} contains a non-object case`);
      continue;
    }

    const label = testCase.id || "<missing id>";
    if (!/^[a-z0-9-]+$/.test(testCase.id || "")) {
      fail(`${evalFile} case ${label} must use a lowercase hyphenated id`);
    }

    if (seenIds.has(testCase.id)) {
      fail(`${evalFile} contains duplicate case id: ${testCase.id}`);
    }
    seenIds.add(testCase.id);

    if (typeof testCase.request !== "string" || testCase.request.trim().length < 10) {
      fail(`${evalFile} case ${label} must include a realistic request`);
    }

    if (!validOutcomes.has(testCase.expected_mode)) {
      fail(`${evalFile} case ${label} has invalid expected_mode: ${testCase.expected_mode}`);
    } else if (testCase.expected_mode === "out_of_scope") {
      hasOutOfScopeCase = true;
    } else {
      seenModes.add(testCase.expected_mode);
    }

    if (!Array.isArray(testCase.expected_references)) {
      fail(`${evalFile} case ${label} must include expected_references`);
    }

    if (!Array.isArray(testCase.required_output_fields) || testCase.required_output_fields.length === 0) {
      fail(`${evalFile} case ${label} must include required_output_fields`);
    }

    if (testCase.expected_mode === "generate") {
      if (!Number.isInteger(testCase.expected_image_count) || testCase.expected_image_count < 1) {
        fail(`${evalFile} generate case ${label} must include expected_image_count`);
      } else {
        seenGenerateCounts.add(testCase.expected_image_count);
      }
    }

    if (testCase.expected_mode === "save" && testCase.expected_save_root !== "<workspace-root>/assets/<article-slug>-illustrations/") {
      fail(`${evalFile} save case ${label} must assert the workspace-root save destination`);
    }

    if (!Array.isArray(testCase.source_must_include) || testCase.source_must_include.length === 0) {
      fail(`${evalFile} case ${label} must include source_must_include assertions`);
      continue;
    }

    for (const assertion of testCase.source_must_include) {
      if (!assertion || typeof assertion.path !== "string" || typeof assertion.text !== "string") {
        fail(`${evalFile} case ${label} has an invalid source_must_include assertion`);
        continue;
      }

      if (!exists(assertion.path)) {
        fail(`${evalFile} case ${label} points to missing source file: ${assertion.path}`);
        continue;
      }

      assertIncludes(assertion.path, assertion.text, `${label}: ${assertion.text}`);
    }
  }

  for (const mode of requiredModes) {
    if (!seenModes.has(mode)) {
      fail(`${evalFile} must include a behavior case for mode: ${mode}`);
    }
  }

  if (!seenGenerateCounts.has(3)) {
    fail(`${evalFile} must include a generate case for the default 3-image count`);
  }

  if (!seenGenerateCounts.has(4)) {
    fail(`${evalFile} must include a generate case for an explicit requested count`);
  }

  if (!hasOutOfScopeCase) {
    fail(`${evalFile} must include an out_of_scope trigger-boundary case`);
  }
}

function sha256(relativePath) {
  const buffer = fs.readFileSync(path.join(repoRoot, relativePath));
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function validateStyleCalibrationExamples() {
  const expectedNames = [
    "01-two-breakpoints.png",
    "02-sort-by-purpose.png",
    "03-one-fish-many-uses.png",
    "04-handoff-path.png",
    "05-information-well.png",
    "06-idea-press.png",
    "07-content-fermentation.png",
    "08-trust-bridge.png"
  ];
  const topExamplesDir = "examples/images";
  const skillExamplesDir = "pet-sketch-illustrations/assets/examples";

  if (!exists(topExamplesDir) || !exists(skillExamplesDir)) {
    fail("Style calibration directories examples/images and pet-sketch-illustrations/assets/examples must exist");
    return;
  }

  for (const name of expectedNames) {
    const topRelative = `${topExamplesDir}/${name}`;
    const skillRelative = `${skillExamplesDir}/${name}`;
    assertFile(topRelative);
    assertFile(skillRelative);

    if (exists(topRelative) && exists(skillRelative) && sha256(topRelative) !== sha256(skillRelative)) {
      fail(`Style calibration example drift: ${topRelative} and ${skillRelative} differ`);
    }
  }
}

function validateCharacterReferenceSheet() {
  const relativePath = "pet-sketch-illustrations/assets/character-reference-sheet.png";
  if (!exists(relativePath)) {
    fail(`Missing character reference sheet: ${relativePath}`);
    return;
  }

  const dimensions = pngDimensions(relativePath);
  if (!dimensions) {
    return;
  }

  const aspectRatio = dimensions.width / dimensions.height;
  if (Math.abs(aspectRatio - 16 / 9) > 0.01) {
    fail(`${relativePath} is ${dimensions.width}x${dimensions.height}, not close enough to 16:9`);
  }
}

validateSkillShape();
validateVersionTracking();
validateReferenceCoverage();
validateBehaviorEvalFixtures();
validateStyleCalibrationExamples();
validateCharacterReferenceSheet();

if (failures.length > 0) {
  console.error("Skill validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Skill validation passed.");
