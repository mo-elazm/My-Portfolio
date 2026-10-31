import fs from "node:fs";
import { chromium } from "playwright-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = "http://127.0.0.1:5173/";
const OUT = "qa";
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const configs = [
	{ name: "desktop-dark-en", width: 1440, height: 900, theme: "dark", language: "en" },
	{ name: "desktop-light-en", width: 1440, height: 900, theme: "light", language: "en" },
	{ name: "desktop-dark-ar", width: 1440, height: 900, theme: "dark", language: "ar" },
	{ name: "laptop-dark-en", width: 1280, height: 800, theme: "dark", language: "en" },
	{ name: "tablet-dark-en", width: 1024, height: 768, theme: "dark", language: "en" },
	{ name: "narrow-dark-en", width: 900, height: 800, theme: "dark", language: "en" },
	{ name: "mobile-dark-en", width: 390, height: 844, theme: "dark", language: "en" },
	{ name: "mobile-light-ar", width: 390, height: 844, theme: "light", language: "ar" },
];

const sections = ["home", "about", "experience", "skills", "work", "certifications", "contact"];

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const results = [];

for (const config of configs) {
	const context = await browser.newContext({
		viewport: { width: config.width, height: config.height },
		deviceScaleFactor: 1,
	});
	await context.addInitScript(
		({ theme, language }) => {
			window.localStorage.setItem(
				"mo-portfolio-preferences",
				JSON.stringify({ state: { theme, language }, version: 0 }),
			);
		},
		{ theme: config.theme, language: config.language },
	);

	const page = await context.newPage();
	const errors = [];
	page.on("console", (msg) => {
		if (msg.type() === "error") errors.push(msg.text());
	});
	page.on("pageerror", (err) => errors.push(`PAGEERROR: ${err.message}`));

	await page.goto(BASE, { waitUntil: "networkidle" });
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(500);

	const pre = await page.evaluate(() => ({
		lang: document.documentElement.lang,
		dir: document.documentElement.dir,
		theme: document.documentElement.dataset.theme,
		scrollY: window.scrollY,
		scrollWidth: document.documentElement.scrollWidth,
		clientWidth: document.documentElement.clientWidth,
		scrollHeight: document.documentElement.scrollHeight,
	}));

	await page.evaluate(async () => {
		const height = document.documentElement.scrollHeight;
		for (let y = 0; y < height; y += 500) {
			window.scrollTo(0, y);
			await new Promise((resolve) => setTimeout(resolve, 45));
		}
		window.scrollTo(0, document.documentElement.scrollHeight);
		await new Promise((resolve) => setTimeout(resolve, 250));
		window.scrollTo(0, 0);
	});
	await page.waitForTimeout(1100);

	const metrics = await page.evaluate((sectionIds) => {
		const visible = (el) => {
			const style = getComputedStyle(el);
			return style.display !== "none" && style.visibility !== "hidden";
		};
		const offenders = [...document.querySelectorAll("body *")]
			.filter((el) => {
				if (!visible(el)) return false;
				const style = getComputedStyle(el);
				if (style.position === "fixed" || style.pointerEvents === "none") return false;
				const rect = el.getBoundingClientRect();
				if (rect.width === 0 || rect.height === 0) return false;
				return rect.right > window.innerWidth + 1.5 || rect.left < -1.5;
			})
			.slice(0, 12)
			.map((el) => {
				const rect = el.getBoundingClientRect();
				return {
					tag: el.tagName.toLowerCase(),
					cls: String(el.className).slice(0, 90),
					left: Math.round(rect.left),
					right: Math.round(rect.right),
					width: Math.round(rect.width),
				};
			});

		const boxes = Object.fromEntries(
			sectionIds.map((id) => {
				const el = document.getElementById(id);
				if (!el) return [id, null];
				const rect = el.getBoundingClientRect();
				return [id, { top: Math.round(rect.top + scrollY), height: Math.round(rect.height) }];
			}),
		);

		const imageIssues = [...document.querySelectorAll("img")].map((img) => ({
			src: img.currentSrc.split("/").pop(),
			ok: img.complete && img.naturalWidth > 0,
			w: img.naturalWidth,
			h: img.naturalHeight,
			renderW: Math.round(img.getBoundingClientRect().width),
			renderH: Math.round(img.getBoundingClientRect().height),
		}));

		return {
			lang: document.documentElement.lang,
			dir: document.documentElement.dir,
			theme: document.documentElement.dataset.theme,
			scrollY: window.scrollY,
			scrollWidth: document.documentElement.scrollWidth,
			clientWidth: document.documentElement.clientWidth,
			scrollHeight: document.documentElement.scrollHeight,
			horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
			offenders,
			boxes,
			imageIssues,
			mailto: [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute("href")),
			certButtons: document.querySelectorAll("#certifications button").length,
			hiddenReveals: [...document.querySelectorAll("[data-reveal]")].filter(
				(el) => getComputedStyle(el).opacity !== "1",
			).length,
		};
	}, sections);

	const shots = [];
	for (const id of sections) {
		const locator = page.locator(`#${id}`);
		if ((await locator.count()) === 0) continue;
		const path = `${OUT}/${config.name}-${id}.jpeg`;
		await locator.scrollIntoViewIfNeeded();
		await page.waitForTimeout(650);
		await locator.screenshot({ path, type: "jpeg", quality: 76 });
		shots.push(path);
	}

	const footer = page.locator("footer");
	await footer.scrollIntoViewIfNeeded();
	await page.waitForTimeout(400);
	await page.screenshot({ path: `${OUT}/${config.name}-footer.jpeg`, type: "jpeg", quality: 76 });

	// Scroll-to-top after refresh check.
	await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
	await page.waitForTimeout(250);
	const beforeReload = await page.evaluate(() => window.scrollY);
	await page.reload({ waitUntil: "networkidle" });
	await page.waitForTimeout(1200);
	const afterReload = await page.evaluate(() => window.scrollY);

	results.push({ name: config.name, pre, metrics, beforeReload, afterReload, errors, shots });
	await context.close();
}

// Lightbox interaction on one desktop config.
{
	const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
	await context.addInitScript(() => {
		window.localStorage.setItem(
			"mo-portfolio-preferences",
			JSON.stringify({ state: { theme: "dark", language: "en" }, version: 0 }),
		);
	});
	const page = await context.newPage();
	const errors = [];
	page.on("console", (msg) => {
		if (msg.type() === "error") errors.push(msg.text());
	});
	page.on("pageerror", (err) => errors.push(`PAGEERROR: ${err.message}`));
	await page.goto(BASE, { waitUntil: "networkidle" });
	await page.locator("#certifications").scrollIntoViewIfNeeded();
	await page.waitForTimeout(900);
	await page.locator("#certifications button").first().click();
	await page.waitForTimeout(1200);
	const dialogInfo = await page.evaluate(() => {
		const dialog = document.querySelector('[role="dialog"]');
		if (!dialog) return null;
		const img = dialog.querySelector("img");
		const rect = dialog.getBoundingClientRect();
		return {
			exists: true,
			ariaLabel: dialog.getAttribute("aria-label"),
			img: img ? { src: img.currentSrc.split("/").pop(), ok: img.complete && img.naturalWidth > 0 } : null,
			box: { w: Math.round(rect.width), h: Math.round(rect.height) },
			scrollHeight: document.documentElement.scrollHeight,
			bodyOverflow: getComputedStyle(document.body).overflow,
			text: dialog.innerText.slice(0, 500),
		};
	});
	await page.screenshot({ path: `${OUT}/lightbox-ibm.jpeg`, type: "jpeg", quality: 78 });
	await page.keyboard.press("ArrowRight");
	await page.waitForTimeout(800);
	const second = await page.evaluate(() => {
		const dialog = document.querySelector('[role="dialog"]');
		return dialog ? dialog.innerText.slice(0, 200) : null;
	});
	await page.screenshot({ path: `${OUT}/lightbox-eraasoft.jpeg`, type: "jpeg", quality: 78 });
	await page.keyboard.press("Escape");
	await page.waitForTimeout(500);
	const closed = await page.evaluate(() => ({
		dialog: Boolean(document.querySelector('[role="dialog"]')),
		bodyOverflow: getComputedStyle(document.body).overflow,
	}));
	results.push({ name: "lightbox", dialogInfo, second, closed, errors });
	await context.close();
}

await browser.close();
fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
