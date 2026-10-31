import fs from "node:fs";
import { createCanvas } from "@napi-rs/canvas";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import sharp from "sharp";

const outDir = "public/certificates";
fs.mkdirSync(outDir, { recursive: true });

// Full, uncropped portrait for the about/hero frame.
await sharp("E:/63190.webp")
	.resize(1200, 1200, { fit: "inside" })
	.webp({ quality: 86 })
	.toFile("public/mohamed-portrait.webp");

// EraaSoft certificate scan (already upright per inspection).
await sharp("E:/CamScanner 10-31-2026 13.06.jpg.jpeg")
	.resize(1800, null, { withoutEnlargement: true })
	.flatten({ background: "#ffffff" })
	.jpeg({ quality: 88, mozjpeg: true })
	.toFile(`${outDir}/eraasoft-certificate.jpg`);

// IBM certificate PDF -> high-res raster.
const data = new Uint8Array(fs.readFileSync("E:/Artboard 47.pdf"));
const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
const page = await doc.getPage(1);
const viewport = page.getViewport({ scale: 2.4 });
const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
const context = canvas.getContext("2d");
context.fillStyle = "#ffffff";
context.fillRect(0, 0, canvas.width, canvas.height);

await page.render({ canvasContext: context, viewport, canvas }).promise;

fs.writeFileSync(`${outDir}/ibm-certificate.png`, canvas.toBuffer("image/png"));
await sharp(`${outDir}/ibm-certificate.png`)
	.resize(1800, null, { withoutEnlargement: true })
	.flatten({ background: "#ffffff" })
	.jpeg({ quality: 90, mozjpeg: true })
	.toFile(`${outDir}/ibm-certificate.jpg`);
fs.rmSync(`${outDir}/ibm-certificate.png`);

for (const file of [
	"public/mohamed-portrait.webp",
	`${outDir}/eraasoft-certificate.jpg`,
	`${outDir}/ibm-certificate.jpg`,
]) {
	const meta = await sharp(file).metadata();
	console.log(file, meta.width, meta.height, `${Math.round(fs.statSync(file).size / 1024)} kB`);
}
