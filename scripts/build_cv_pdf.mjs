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

const FONT_SERIF = "Times-Roman";
const FONT_SERIF_BOLD = "Times-Bold";
const FONT_SERIF_ITALIC = "Times-Italic";

function parseArgs(argv) {
  const options = {
    markdown: "_resume/CV_Yonghao Tan.md",
    includeOutput: "_includes/generated/cv-resume-body.html",
    htmlOutput: "files/CV_Yonghao_Tan.html",
    pdfOutput: "files/CV_Yonghao_Tan.pdf",
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

function normalizeSectionTitle(title) {
  return normalizeText(title).toLowerCase();
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

function textHeight(doc, text, { width, font = FONT_SERIF, fontSize = 9.4, lineGap = 0.6 }) {
  if (!text) return 0;
  doc.font(font).fontSize(fontSize);
  return doc.heightOfString(text, { width, lineGap });
}

function drawText(
  doc,
  text,
  x,
  y,
  { width, font = FONT_SERIF, fontSize = 9.4, lineGap = 0.6, align = "left", color = "#26211b" } = {},
) {
  if (!text) return;
  doc.font(font).fontSize(fontSize).fillColor(color).text(text, x, y, { width, lineGap, align });
}

function looksLikeDate(text) {
  return /(present|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|\d{4})/i.test(text);
}

function drawSectionHeading(doc, title) {
  const nearTop = doc.y <= doc.page.margins.top + 8;
  const topGap = nearTop ? 0 : 7;
  ensureSpace(doc, 24 + topGap);
  if (!nearTop) {
    doc.y += topGap;
  }
  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  drawText(doc, title.toUpperCase(), doc.page.margins.left, doc.y, {
    width,
    font: FONT_SERIF_BOLD,
    fontSize: 11.9,
    lineGap: 0,
    color: "#231e19",
  });

  const ruleY = doc.y + 1.5;
  doc
    .moveTo(doc.page.margins.left, ruleY)
    .lineTo(doc.page.width - doc.page.margins.right, ruleY)
    .lineWidth(0.6)
    .strokeColor("#b8ad9e")
    .stroke();

  doc.y = ruleY + 6;
}

function drawLeftRightBlock(
  doc,
  leftText,
  rightText,
  {
    leftFont = FONT_SERIF_BOLD,
    leftSize = 10.65,
    leftColor = "#231e19",
    rightFont = FONT_SERIF_ITALIC,
    rightSize = 9.75,
    rightColor = "#5f5548",
    rightWidth = 140,
    lineGap = 0.6,
    after = 2,
  } = {},
) {
  const totalWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const leftWidth = totalWidth - rightWidth - 10;
  const leftHeight = textHeight(doc, leftText, {
    width: leftWidth,
    font: leftFont,
    fontSize: leftSize,
    lineGap,
  });
  const rightHeight = textHeight(doc, rightText, {
    width: rightWidth,
    font: rightFont,
    fontSize: rightSize,
    lineGap,
  });

  ensureSpace(doc, Math.max(leftHeight, rightHeight) + after + 2);

  const startY = doc.y;
  drawText(doc, leftText, doc.page.margins.left, startY, {
    width: leftWidth,
    font: leftFont,
    fontSize: leftSize,
    lineGap,
    color: leftColor,
  });

  if (rightText) {
    drawText(doc, rightText, doc.page.width - doc.page.margins.right - rightWidth, startY + 0.2, {
      width: rightWidth,
      font: rightFont,
      fontSize: rightSize,
      lineGap,
      align: "right",
      color: rightColor,
    });
  }

  doc.y = startY + Math.max(leftHeight, rightHeight) + after;
}

function drawStackedLines(doc, lines, { font = FONT_SERIF, fontSize = 9.7, color = "#3e372f", gap = 1.5, after = 2 } = {}) {
  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const textLines = lines.filter(Boolean);
  if (!textLines.length) return;

  let estimatedHeight = 0;
  for (const line of textLines) {
    estimatedHeight += textHeight(doc, line, { width, font, fontSize, lineGap: 0.6 }) + gap;
  }
  ensureSpace(doc, estimatedHeight + after);

  for (const line of textLines) {
    drawText(doc, line, doc.page.margins.left, doc.y, {
      width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
      font,
      fontSize,
      lineGap: 0.6,
      color,
    });
    doc.y += gap;
  }
  doc.y += after;
}

function drawParagraph(doc, text, options = {}) {
  if (!text) return;

  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const font = options.font ?? FONT_SERIF;
  const fontSize = options.fontSize ?? 9.7;
  const lineGap = options.lineGap ?? 0.75;
  const color = options.color ?? "#2c2620";
  ensureSpace(doc, textHeight(doc, text, { width, font, fontSize, lineGap }) + (options.after ?? 3));
  drawText(doc, text, doc.page.margins.left, doc.y, { width, font, fontSize, lineGap, color });
  doc.y += options.after ?? 3;
}

function drawBullets(doc, listElement) {
  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const items = listElement.querySelectorAll("li").map((item) => textContent(item)).filter(Boolean);

  doc.font(FONT_SERIF).fontSize(9.55).fillColor("#2f2821");
  for (const item of items) {
    const bulletText = `• ${item}`;
    ensureSpace(doc, doc.heightOfString(bulletText, { width, indent: 11, lineGap: 0.75 }) + 1);
    doc.text(bulletText, doc.page.margins.left, doc.y, {
      width,
      indent: 11,
      lineGap: 0.75,
    });
    doc.y += 0.9;
  }
  doc.y += 4.5;
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
  const firstDescription = descriptions[0] ?? "";
  const lastDescription = descriptions[descriptions.length - 1] ?? "";
  const section = normalizeSectionTitle(sectionTitle);

  if (section === "research experience") {
    drawLeftRightBlock(doc, term, lastDescription, {
      leftFont: FONT_SERIF_BOLD,
      leftSize: 10.8,
      rightFont: FONT_SERIF_ITALIC,
      rightSize: 9.8,
      rightWidth: 150,
      after: 1.8,
    });
    if (firstDescription) {
      drawParagraph(doc, firstDescription, {
        font: FONT_SERIF_ITALIC,
        fontSize: 9.75,
        color: "#4a4137",
        after: 2.4,
      });
    }
    return;
  }

  if (section === "publications") {
    let estimatedHeight = textHeight(doc, term, { width, font: FONT_SERIF_BOLD, fontSize: 10.1, lineGap: 0.75 }) + 2;
    if (firstDescription) {
      estimatedHeight += textHeight(doc, firstDescription, { width, font: FONT_SERIF, fontSize: 9.45, lineGap: 0.7 }) + 1.5;
    }
    if (descriptions[1]) {
      estimatedHeight += textHeight(doc, descriptions[1], { width, font: FONT_SERIF_ITALIC, fontSize: 9.35, lineGap: 0.7 }) + 1.5;
    }
    ensureSpace(doc, estimatedHeight + 4);

    drawParagraph(doc, term, {
      font: FONT_SERIF_BOLD,
      fontSize: 10.1,
      lineGap: 0.65,
      after: 1.2,
    });
    if (firstDescription) {
      drawParagraph(doc, firstDescription, {
        font: FONT_SERIF,
        fontSize: 9.45,
        color: "#3c352d",
        after: 1.2,
      });
    }
    if (descriptions[1]) {
      drawParagraph(doc, descriptions[1], {
        font: FONT_SERIF_ITALIC,
        fontSize: 9.35,
        color: "#5a5146",
        after: 4,
      });
    }
    return;
  }

  if (descriptions.length === 1 && looksLikeDate(firstDescription)) {
    drawLeftRightBlock(doc, term, firstDescription, {
      leftFont: FONT_SERIF_BOLD,
      leftSize: 10.45,
      rightFont: FONT_SERIF_ITALIC,
      rightSize: 9.65,
      rightWidth: 142,
      after: 2.6,
    });
    return;
  }

  if (section === "education" && descriptions.length === 1) {
    drawLeftRightBlock(doc, term, firstDescription, {
      leftFont: FONT_SERIF_BOLD,
      leftSize: 10.4,
      rightFont: FONT_SERIF_ITALIC,
      rightSize: 9.55,
      rightWidth: 130,
      after: 2.4,
    });
    return;
  }

  drawParagraph(doc, term, {
    font: FONT_SERIF_BOLD,
    fontSize: 10.3,
    after: descriptions.length ? 1.6 : 3,
  });
  if (descriptions.length) {
    drawStackedLines(doc, descriptions, {
      font: FONT_SERIF,
      fontSize: 9.55,
      color: "#433b32",
      gap: 1.5,
      after: 3.2,
    });
  }
}

async function buildPdf(pdfPath, bodyHtml, frontmatterData, title) {
  ensureDir(pdfPath);

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 42, right: 48, bottom: 36, left: 48 },
    info: { Title: title, Author: frontmatterData.name || "Yonghao Tan" },
    compress: false,
  });

  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  const displayName = (frontmatterData.name || "Yonghao Tan").toUpperCase();
  const nameX = doc.page.margins.left;
  const nameY = doc.y;
  const nameWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const nameFontSize = 22.5;
  drawText(doc, displayName, nameX, nameY, {
    width: nameWidth,
    font: FONT_SERIF_BOLD,
    fontSize: nameFontSize,
    lineGap: 0,
    align: "center",
  });

  const renderedNameWidth = doc.font(FONT_SERIF_BOLD).fontSize(nameFontSize).widthOfString(displayName);
  const underlinePadding = 2;
  const underlineStartX = nameX + Math.max(0, (nameWidth - renderedNameWidth) / 2) - underlinePadding;
  const underlineEndX = nameX + Math.min(nameWidth, (nameWidth + renderedNameWidth) / 2) + underlinePadding;
  const underlineY = nameY + 23.5;
  doc
    .moveTo(underlineStartX, underlineY)
    .lineTo(underlineEndX, underlineY)
    .lineWidth(0.85)
    .strokeColor("#231e19")
    .stroke();

  doc.y += 6;

  const headerLines = buildHeaderLines(frontmatterData.header);
  doc.font(FONT_SERIF).fontSize(9.55).fillColor("#4d453b");
  for (const line of headerLines) {
    doc.text(line, {
      align: "center",
      lineGap: 0.45,
    });
  }

  const dividerY = doc.y + 4;
  doc
    .moveTo(doc.page.margins.left, dividerY)
    .lineTo(doc.page.width - doc.page.margins.right, dividerY)
    .lineWidth(0.7)
    .strokeColor("#b8ad9e")
    .stroke();
  doc.y = dividerY + 8;

  const root = parse(bodyHtml.replace(/<sup>(.*?)<\/sup>/gi, "^$1"));
  let currentSection = "";

  for (const node of root.childNodes) {
    if (node.nodeType !== 1) continue;

    if (node.tagName === "DIV" && node.getAttribute("class") === "resume-header") {
      continue;
    }

    if (node.tagName === "H2") {
      const nextSection = textContent(node);
      if (normalizeSectionTitle(nextSection) === "publications") {
        doc.addPage();
      }
      currentSection = nextSection;
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
        font: paragraphText.startsWith("* ") || paragraphText.startsWith("*") ? FONT_SERIF_ITALIC : FONT_SERIF,
        fontSize: paragraphText.startsWith("Supervisor:") ? 9.35 : 9.65,
        color: paragraphText.startsWith("Supervisor:") ? "#4a4137" : "#2c2620",
        after: 3,
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
