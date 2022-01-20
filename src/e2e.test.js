import puppeteer from "puppeteer";

describe("App.js", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
        args: ['--no-sandbox',
               '--window-size=1920,1080'],
        timeout: 10000
    });

    page = await browser.newPage();
    await page._client.send('Emulation.clearDeviceMetricsOverride');
    await page.goto("http://localhost:4571");
  });

  describe('Test the Splash screen', () => {
    it('should display all required text', async () => {
      expect(await page.$eval("#continueClick", (e) => e.textContent)).toBe("click to continue...");
      expect(await page.$eval("#touchIcon", (e) => e.textContent)).toBe("touch_app");
      expect(await page.$eval("#playHelp", (e) => e.textContent)).toBe("Play the virtual keys using your keyboard, or by clicking on them!");
      expect(await page.$eval("#splashText", (e) => e.textContent)).toBe("mélodie");
    });

    it('should clear the Splash screen when clicked', async () => {
      await page.waitForSelector("#splash");

      await page.screenshot({ path: './src/screenshots/splashScreen.png' });
      await page.mouse.click(132, 103, { button: 'left' });
      await page.waitForTimeout(1000);
  
      await page.screenshot({ path: './src/screenshots/home.png' });
    });
  });

  describe('Test the Metronome', () => {
    it('should focus on the BPM input and change to a valid value', async () => {
      await page.hover('#bpmInput');
      await page.focus('#bpmInput');
  
      await page.screenshot({ path: './src/screenshots/metronome/focused.png' });     
      await page.type('#bpmInput', '2');
  
      expect(await page.$eval("#bpmInput", (e) => e.value)).toBe("502");
  
      await page.screenshot({ path: './src/screenshots/metronome/502.png' }); 
      
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
  
      await page.type('#bpmInput', '5');
      expect(await page.$eval("#bpmInput", (e) => e.value)).toBe("5");
  
      await page.screenshot({ path: './src/screenshots/metronome/5.png' }); 
    });
  
    it('should change BPM value to 1 if the input is empty and mouse clicks outside', async () => {
      await page.keyboard.press('Backspace');
      await page.mouse.click(132, 103, { button: 'left' });
  
      expect(await page.$eval("#bpmInput", (e) => e.value)).toBe("1");
      await page.screenshot({ path: './src/screenshots/metronome/emptyTo1.png' });
    });
  
    it('should not allow the user to enter a value over 1000', async () => {
      await page.type('#bpmInput', '9');
      await page.type('#bpmInput', '9');
      await page.type('#bpmInput', '9');
  
      expect(await page.$eval("#bpmInput", (e) => e.value)).toBe("199");
      await page.screenshot({ path: './src/screenshots/metronome/199.png' }); 
    });

    it('should change icon from a play button to a pause button if clicked', async () => {
      expect(await page.$eval("#play", (e) => e.textContent)).toBe("play_arrow");
      await page.click('#play');
      expect(await page.$eval("#play", (e) => e.textContent)).toBe("pause");

      await page.screenshot({ path: './src/screenshots/metronome/playing.png' });

      await page.click('#play');
      expect(await page.$eval("#play", (e) => e.textContent)).toBe("play_arrow");
    });
  });

  describe('Testing the volume slider', () => {
    it('should hover over the volume slider and move it to the right', async () => {
      
      await page.hover('#volume');
      await page.screenshot({ path: './src/screenshots/volume/hover.png' });
      
      await page.mouse.down();    
      await page.mouse.move(1920, 1080);
      await page.mouse.up();

      await page.screenshot({ path: './src/screenshots/volume/movedRight.png' });

      expect(await page.$eval("#volume", (e) => e.value)).toBe("100");
    });

    it('should hover over the volume slider move it to the left', async () => {
      await page.hover('#volume');

      await page.mouse.down();    
      await page.mouse.move(0, 0);
      await page.mouse.up();

      await page.screenshot({ path: './src/screenshots/volume/movedLeft.png' });

      expect(await page.$eval("#volume", (e) => e.value)).toBe("1");
    });
  });

  describe('Testing the note bubble', () => {
    it('should display a piano emoji by default', async () => {
      expect(await page.$eval("#current", (e) => e.textContent)).toBe("🎹");
      await page.screenshot({ path: './src/screenshots/bubble/default.png' });
    });

    it('should display the equivalent piano note based on the keyboard key pressed', async () => {  
        await page.keyboard.press('a');
        expect(await page.$eval("#current", (e) => e.textContent)).toBe("B4");

        await page.screenshot({ path: './src/screenshots/bubble/a.png' });

        await page.keyboard.press('D');
        expect(await page.$eval("#current", (e) => e.textContent)).toBe("D#5");

        await page.screenshot({ path: './src/screenshots/bubble/D.png' });

        await page.keyboard.press('2');
        expect(await page.$eval("#current", (e) => e.textContent)).toBe("D2");

        await page.screenshot({ path: './src/screenshots/bubble/2.png' });

        await page.keyboard.press('m');
        expect(await page.$eval("#current", (e) => e.textContent)).toBe("C7");

        await page.screenshot({ path: './src/screenshots/bubble/m.png' });
    });
  });

  describe('Test Keyboard keys', () => {
    it('should hover over white keyboard keys and change their colour (visual)', async () => {
      const whiteA = await page.$eval("#key-a", (e) => e.textContent);
      expect(whiteA).toBe("a");
  
      await page.hover('#key-a');
      await page.screenshot({ path: './src/screenshots/keys/hover-a.png' });
  
      const white2 = await page.$eval("#key-2", (e) => e.textContent);
      expect(white2).toBe("2");
  
      await page.hover('#key-2');
      await page.screenshot({ path: './src/screenshots/keys/hover-2.png' });
  
      const whiteM = await page.$eval("#key-m", (e) => e.textContent);
      expect(whiteM).toBe("m");
  
      await page.hover('#key-m');
      await page.screenshot({ path: './src/screenshots/keys/hover-m.png' });
    });
  
    it('should hover over black keyboard keys and change their colour (visual)', async () => {
      const blackQ = await page.$eval("#black-Q", (e) => e.textContent);
      expect(blackQ).toBe("Q");
  
      await page.hover('#black-Q');
      await page.screenshot({ path: './src/screenshots/keys/hover-Q.png' });
  
      const blackL = await page.$eval("#black-L", (e) => e.textContent);
      expect(blackL).toBe("L");
  
      await page.hover('#black-L');
      await page.screenshot({ path: './src/screenshots/keys/hover-L.png' });
  
      const blackE = await page.$eval("#black-E", (e) => e.textContent);
      expect(blackE).toBe("E");
  
      await page.hover('#black-E');
      await page.screenshot({ path: './src/screenshots/keys/hover-E.png' });
    });
  
    it('should add the blackPressed class when a keyboard press plays a black piano key', async () => {
      expect(await page.$eval("#black-H", (e) => e.className)).toBe("black_key");
      await page.keyboard.press('H');
      expect(await page.$eval("#black-H", (e) => e.className)).toBe("black_key blackPressed");
      await page.screenshot({ path: './src/screenshots/keys/pressed-E.png' });
  
      expect(await page.$eval("#black-O", (e) => e.className)).toBe("black_key");
      await page.keyboard.press('O');
      expect(await page.$eval("#black-O", (e) => e.className)).toBe("black_key blackPressed");
      await page.screenshot({ path: './src/screenshots/keys/pressed-O.png' });
  
      expect(await page.$eval("#black-V", (e) => e.className)).toBe("black_key");
      await page.keyboard.press('V');
      expect(await page.$eval("#black-V", (e) => e.className)).toBe("black_key blackPressed");
      await page.screenshot({ path: './src/screenshots/keys/pressed-V.png' });
    });
  
    it('should add the keyPressed class when a keyboard press plays a white piano key', async () => {
      expect(await page.$eval("#key-n", (e) => e.className)).toBe("key");
      await page.keyboard.press('n');
      expect(await page.$eval("#key-n", (e) => e.className)).toBe("key keyPressed");
      
      expect(await page.$eval("#key-d", (e) => e.className)).toBe("key");
      await page.keyboard.press('d');
      expect(await page.$eval("#key-d", (e) => e.className)).toBe("key keyPressed");
  
      expect(await page.$eval("#key-s", (e) => e.className)).toBe("key");
      await page.keyboard.press('s');
      expect(await page.$eval("#key-s", (e) => e.className)).toBe("key keyPressed");
    });
  });

  afterAll(() => browser.close());
});

