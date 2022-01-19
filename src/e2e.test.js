import puppeteer from "puppeteer";

describe("App.js", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        timeout: 10000
    });

    page = await browser.newPage();
  });

  it("contains the app name text", async () => {
    await page.goto("http://localhost:4571");
    await page.waitForSelector(".noselect");

    const text = await page.$eval("#splashText", (e) => e.textContent);
    expect(text).toContain("mélodie");
  });

  afterAll(() => browser.close());
});

