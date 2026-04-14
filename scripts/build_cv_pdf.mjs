import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import MarkdownItDeflist from "markdown-it-deflist";
import LinkAttributes from "markdown-it-link-attributes";
import { parse } from "node-html-parser";
import PDFDocument from "pdfkit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const markdown = (() => {
  const md = new MarkdownIt({ html: true, linkify: true });

  md.use(MarkdownItDeflist);
  md.use(LinkAttributes, {
    matcher: (link) => /^https?:\/\//.test(link),
    attrs: {
      target: "_blank",
      rel: "noopener",
    },
  });

  return md;
})();

function parseArgs(argv) {
  const options = {
    markdown: "_resume/CV_Yonghao Tan.md",
    includeOutput: "_includes/generated/cv-resume-body.html",
    htmlOutput: "files/CV_Yonghao Tan.html",
    pdfOutput: "files/CV_Yonghao Tan.pdf",
    title: "Yonghao Tan CV",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) continue;

    const key = arg.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for argument: ${arg}`);
    }
    index += 1;

    if (key === "markdown") options.markdown = value;
    else if (key === "include-output") options.includeOutput = value;
    else if (key === "html-output") options.htmlOutput = value;
    else if (key === "output") options.pdfOutput = value;
    else if (key === "pdf-output") options.pdfOutput = value;
    else if (key === "title") options.title = value;
    else if (key === "backup-dir") {
      // Accepted for compatibility with older wrappers. No-op.
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function repoPath(relativeOrAbsolute) {
  return path.isAbsolute(relativeOrAbsolute)
    ? relativeOrAbsolute
    : path.resolve(repoRoot, relativeOrAbsolute);
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function resolveDeflist(html) {
  const dlReg = /<dl>([\s\S]*?)<\/dl>/g;
  const dlList = html.match(dlReg);

  if (dlList === null) return html;

  for (const dl of dlList) {
    const newDl = dl.replace(/<\/dd>\n<dt>/g, "</dd>\n</dl>\n<dl>\n<dt>");
    html = html.replace(dl, newDl);
  }

  return html;
}

function resolveHeader(html, frontmatterData) {
  let header = "";

  if (frontmatterData.name) {
    header += `<h1>${escapeHtml(frontmatterData.name)}</h1>\n`;
  }

  if (Array.isArray(frontmatterData.header)) {
    const count = frontmatterData.header.length;

    for (let index = 0; index < count; index += 1) {
      const item = frontmatterData.header[index];
      if (!item || !item.text) continue;

      header += item.newLine ? "<br>\n" : "";
      header += `<span class="resume-header-item${
        index === count - 1 || frontmatterData.header[index + 1]?.newLine ? " no-separator" : ""
      }">`;

      if (item.link) {
        header += `<a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
          item.text,
        )}</a>`;
      } else {
        header += escapeHtml(item.text);
      }

      header += "</span>\n";
    }
  }

  return `<div class="resume-header">\n${header}</div>\n${html}`;
}

function renderResume(sourcePath) {
  const markdownSource = fs.readFileSync(sourcePath, "utf8");
  const { content, data } = matter(markdownSource);
  let bodyHtml = markdown.render(content);
  bodyHtml = resolveDeflist(bodyHtml);
  bodyHtml = resolveHeader(bodyHtml, data);
  return { bodyHtml, data };
}

function buildHtmlDocument(title, cssText, bodyHtml) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <style>
${cssText}
    </style>
  </head>
  <body class="cv-resume-export">
    <div id="markdown-resume-export">
${bodyHtml}
    </div>
  </body>
</html>
`;
}

function normalizeText(text) {
  return text.replace(/\u00a0/g, " ").replace(/[ \t]+\n/g, "\n").replace(/[ \t]{2,}/g, " ").trim();
}

function buildHeaderLines(headerItems) {
  const lines = [[]];
  for (const item of headerItems ?? []) {
    if (!item?.text) continue;
    if (item.newLine && lines[lines.length - 1].length > 0) {
      lines.push([]);
    }
    lines[lines.length - 1].push(item.text);
  }
  return lines.map((line) => line.join(" | ")).filter(Boolean);
}

function pageBottom(doc) {
  return doc.page.height - doc.page.margins.bottom;
}

function ensureSpace(doc, heightNeeded) {
  if (doc.y + heightNeeded <= pageBottom(doc)) return;
  doc.addPage();
}

function textContent(node) {
  return normalizeText(node.textContent ?? "");
}

function looksLikeDate(text) {
  return /(present|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|\d{4})/i.test(text);
}

function drawSectionHeading(doc, title) {
  ensureSpace(doc, 32);
  doc.fillColor("#000000").font("Helvetica-Bold").fontSize(13);
  doc.text(title, doc.page.margins.left, doc.y, {
    width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
  });

  const ruleY = doc.y + 3;
  doc
    .moveTo(doc.page.margins.left, ruleY)
    .lineTo(doc.page.width - doc.page.margins.right, ruleY)
    .lineWidth(1)
    .strokeColor("#000000")
    .stroke();

  doc.y = ruleY + 8;
}

function drawParagraph(doc, text, options = {}) {
  if (!text) return;

  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  doc.font(options.font ?? "Helvetica").fontSize(options.fontSize ?? 10.5).fillColor("#000000");
  ensureSpace(doc, doc.heightOfString(text, { width, lineGap: 1 }) + 4);
  doc.text(text, doc.page.margins.left, doc.y, { width, lineGap: 1 });
  doc.y += options.after ?? 4;
}

function drawBullets(doc, listElement) {
  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const items = listElement.querySelectorAll("li").map((item) => textContent(item)).filter(Boolean);

  doc.font("Helvetica").fontSize(10.2).fillColor("#000000");
  for (const item of items) {
    const bulletText = `- ${item}`;
    ensureSpace(doc, doc.heightOfString(bulletText, { width, indent: 12, lineGap: 1 }) + 2);
    doc.text(bulletText, doc.page.margins.left, doc.y, {
      width,
      indent: 12,
      lineGap: 1,
    });
    doc.y += 2;
  }
  doc.y += 4;
}

function drawDefinitionList(doc, dlElement, sectionTitle) {
  const entries = dlElement.childNodes.filter((node) => node.nodeType === 1);
  const term = textContent(entries.find((node) => node.tagName === "DT"));
  const descriptions = entries
    .filter((node) => node.tagName === "DD")
    .map((node) => textContent(node))
    .filter(Boolean);

  if (!term) return;

  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const rightWidth = 125;
  const leftWidth = width - rightWidth - 8;
  const firstDescription = descriptions[0] ?? "";
  const lastDescription = descriptions[descriptions.length - 1] ?? "";

  if (descriptions.length === 1 && looksLikeDate(firstDescription)) {
    const blockHeight = Math.max(
      doc.heightOfString(term, { width: leftWidth }),
      doc.heightOfString(firstDescription, { width: rightWidth }),
    );
    ensureSpace(doc, blockHeight + 6);
    doc.font("Helvetica-Bold").fontSize(10.7).text(term, doc.page.margins.left, doc.y, { width: leftWidth });
    doc
      .font("Helvetica-Bold")
      .fontSize(10.2)
      .text(firstDescription, doc.page.width - doc.page.margins.right - rightWidth, doc.y - blockHeight + doc.currentLineHeight(), {
        width: rightWidth,
        align: "right",
      });
    doc.y += 6;
    return;
  }

  if (descriptions.length === 2 && sectionTitle === "Research Experience") {
    const titleHeight = doc.heightOfString(term, { width: leftWidth });
    const metaHeight = doc.heightOfString(lastDescription, { width: rightWidth });
    const subtitleHeight = firstDescription ? doc.heightOfString(firstDescription, { width }) : 0;
    ensureSpace(doc, Math.max(titleHeight, metaHeight) + subtitleHeight + 8);

    const startY = doc.y;
    doc.font("Helvetica-Bold").fontSize(10.7).text(term, doc.page.margins.left, startY, { width: leftWidth });
    doc
      .font("Helvetica-Bold")
      .fontSize(10.2)
      .text(lastDescription, doc.page.width - doc.page.margins.right - rightWidth, startY, {
        width: rightWidth,
        align: "right",
      });

    if (firstDescription) {
      const subtitleY = startY + Math.max(titleHeight, metaHeight) + 1;
      doc.font("Helvetica").fontSize(10.1).text(firstDescription, doc.page.margins.left, subtitleY, { width });
      doc.y = doc.y + 5;
    } else {
      doc.y = startY + Math.max(titleHeight, metaHeight) + 5;
    }

    return;
  }

  let estimatedHeight = doc.heightOfString(term, { width }) + 4;
  for (const description of descriptions) {
    estimatedHeight += doc.heightOfString(description, { width }) + 2;
  }
  ensureSpace(doc, estimatedHeight + 4);

  doc.font("Helvetica-Bold").fontSize(10.7).text(term, doc.page.margins.left, doc.y, { width });
  doc.y += 2;

  for (const description of descriptions) {
    doc.font("Helvetica").fontSize(10.1).text(description, doc.page.margins.left, doc.y, { width });
    doc.y += 2;
  }

  doc.y += 2;
}

async function buildPdf(pdfPath, bodyHtml, frontmatterData, title) {
  ensureDir(pdfPath);

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 42, right: 45, bottom: 40, left: 45 },
    info: { Title: title, Author: frontmatterData.name || "Yonghao Tan" },
    compress: false,
  });

  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  doc.fillColor("#000000").font("Helvetica-Bold").fontSize(24);
  doc.text(frontmatterData.name || "Yonghao Tan", {
    align: "center",
    characterSpacing: 2,
  });
  doc.moveDown(0.15);

  const headerLines = buildHeaderLines(frontmatterData.header);
  doc.font("Helvetica").fontSize(10.2);
  for (const line of headerLines) {
    doc.text(line, {
      align: "center",
    });
  }

  const dividerY = doc.y + 6;
  doc
    .moveTo(doc.page.margins.left, dividerY)
    .lineTo(doc.page.width - doc.page.margins.right, dividerY)
    .lineWidth(1)
    .strokeColor("#000000")
    .stroke();
  doc.y = dividerY + 10;

  const root = parse(bodyHtml.replace(/<sup>(.*?)<\/sup>/gi, "^$1"));
  let currentSection = "";

  for (const node of root.childNodes) {
    if (node.nodeType !== 1) continue;

    if (node.tagName === "DIV" && node.getAttribute("class") === "resume-header") {
      continue;
    }

    if (node.tagName === "H2") {
      currentSection = textContent(node);
      drawSectionHeading(doc, currentSection);
      continue;
    }

    if (node.tagName === "DL") {
      drawDefinitionList(doc, node, currentSection);
      continue;
    }

    if (node.tagName === "UL") {
      drawBullets(doc, node);
      continue;
    }

    if (node.tagName === "P") {
      const paragraphText = textContent(node);
      drawParagraph(doc, paragraphText, {
        font: paragraphText.startsWith("* ") || paragraphText.startsWith("*") ? "Helvetica-Oblique" : "Helvetica",
        after: 5,
      });
    }
  }

  doc.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const markdownPath = repoPath(options.markdown);
  const includeOutputPath = repoPath(options.includeOutput);
  const htmlOutputPath = repoPath(options.htmlOutput);
  const pdfOutputPath = repoPath(options.pdfOutput);
  const cssPath = repoPath("assets/css/cv-resume.css");

  if (!fs.existsSync(markdownPath)) {
    throw new Error(`Resume markdown source not found: ${markdownPath}`);
  }

  const { bodyHtml, data } = renderResume(markdownPath);
  const cssText = fs.readFileSync(cssPath, "utf8");

  ensureDir(includeOutputPath);
  fs.writeFileSync(includeOutputPath, `<div id="markdown-resume-preview">\n${bodyHtml}\n</div>\n`);
  console.log(`Include generated: ${includeOutputPath}`);

  ensureDir(htmlOutputPath);
  fs.writeFileSync(htmlOutputPath, buildHtmlDocument(options.title, cssText, bodyHtml), "utf8");
  console.log(`HTML generated: ${htmlOutputPath}`);

  await buildPdf(pdfOutputPath, bodyHtml, data, options.title);
  console.log(`PDF generated: ${pdfOutputPath}`);
}

main().catch((error) => {
  console.error(`build_cv_pdf.mjs failed: ${error.message}`);
  process.exitCode = 1;
});
