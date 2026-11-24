'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const puppeteer = require('puppeteer-core');

const projectRoot = path.resolve(__dirname, '..');
const edgeCandidates = [
  path.join(process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)', 'Microsoft/Edge/Application/msedge.exe'),
  path.join(process.env.ProgramFiles || 'C:\\Program Files', 'Microsoft/Edge/Application/msedge.exe')
];
const edgePath = edgeCandidates.find((candidate) => fs.existsSync(candidate));

if (!edgePath) {
  throw new Error('Microsoft Edge was not found. Set EDGE_PATH to the installed Edge executable.');
}

function createStaticServer() {
  return http.createServer((request, response) => {
    const pathname = new URL(request.url, 'http://127.0.0.1').pathname;
    if (pathname === '/favicon.ico') {
      response.writeHead(204).end();
      return;
    }

    const relativePath = pathname === '/' ? 'index.html' : decodeURIComponent(pathname.slice(1));
    const filePath = path.resolve(projectRoot, relativePath);
    if (!filePath.startsWith(projectRoot + path.sep)) {
      response.writeHead(403).end();
      return;
    }

    fs.readFile(filePath, (error, contents) => {
      if (error) {
        response.writeHead(404).end('Not found');
        return;
      }
      const extension = path.extname(filePath).toLowerCase();
      const mime = extension === '.css' ? 'text/css' : extension === '.html' ? 'text/html; charset=utf-8' : 'application/octet-stream';
      response.writeHead(200, { 'Content-Type': mime }).end(contents);
    });
  });
}

async function main() {
  const server = createStaticServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const baseUrl = 'http://127.0.0.1:' + server.address().port;
  let browser;

  try {
    browser = await puppeteer.launch({
      executablePath: edgePath,
      headless: true,
      args: ['--no-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    const pageErrors = [];
    let mockedApiRequests = 0;
    let payloadHasExpectedFields = true;
    const mockResponses = [
      { status: 400, body: { success: false, message: 'Mock rejection' } },
      { status: 200, body: { success: true, message: 'Mock success' } }
    ];

    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const url = new URL(request.url());
      if (url.hostname === 'api.web3forms.com' && url.pathname === '/submit') {
        mockedApiRequests += 1;
        const postData = request.postData() || '';
        const requiredNames = ['access_key', 'name', 'email', 'domain', 'message', 'subject'];
        payloadHasExpectedFields = payloadHasExpectedFields && requiredNames.every((name) => postData.includes('name="' + name + '"'));
        const mock = mockResponses.shift() || { status: 500, body: { success: false } };
        setTimeout(() => {
          request.respond({
            status: mock.status,
            contentType: 'application/json',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Accept'
            },
            body: JSON.stringify(mock.body)
          }).catch(() => {});
        }, 150);
        return;
      }
      request.continue().catch(() => {});
    });

    const response = await page.goto(baseUrl + '/', { waitUntil: 'networkidle2', timeout: 30000 });
    assert.equal(response.status(), 200, 'homepage should load');
    assert.equal(await page.title(), 'Контур — студия программной инженерии');
    assert.equal(await page.$eval('link[href="css/style.css"]', (link) => Boolean(link.sheet)), true, 'compiled CSS should load');

    const anchorsValid = await page.evaluate(() => Array.from(document.querySelectorAll('a[href^="#"]')).every((link) => {
      const href = link.getAttribute('href');
      return href === '#' || Boolean(document.querySelector(href));
    }));
    assert.equal(anchorsValid, true, 'all in-page links should resolve');

    await page.setViewport({ width: 1440, height: 900 });
    const desktopFits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    assert.equal(desktopFits, true, 'desktop layout should not overflow horizontally');

    await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
    const mobileFits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    assert.equal(mobileFits, true, 'mobile layout should not overflow horizontally');
    await page.setViewport({ width: 1440, height: 900 });

    await page.click('#submit-button');
    assert.equal(await page.$eval('#contact-form', (form) => form.checkValidity()), false, 'required fields should be validated');
    assert.equal(mockedApiRequests, 0, 'invalid form must not make an API request');

    await page.$eval('#name', (field) => { field.value = 'Тестовая проверка'; });
    await page.$eval('#email', (field) => { field.value = 'not-an-email'; });
    await page.$eval('#message', (field) => { field.value = 'Локальная имитация отправки'; });
    assert.equal(await page.$eval('#email', (field) => field.validity.typeMismatch), true, 'email format should be validated');
    await page.click('#submit-button');
    assert.equal(mockedApiRequests, 0, 'invalid email must not make an API request');

    const radios = await page.$$('input[name="domain"]');
    await radios[1].click();
    await page.$eval('#email', (field) => { field.value = 'test@example.invalid'; });
    await page.click('#submit-button');
    await page.waitForFunction(() => document.querySelector('#submit-button').disabled, { timeout: 3000 });
    assert.match(await page.$eval('#submit-button', (button) => button.textContent), /ОТПРАВКА/);
    await page.waitForFunction(() => !document.querySelector('#form-error').classList.contains('hidden'), { timeout: 5000 });
    assert.equal(await page.$eval('#confirmation-msg', (element) => element.classList.contains('hidden')), true, 'failed response must not show success');
    assert.equal(await page.$eval('#submit-button', (button) => !button.disabled), true, 'submit should be re-enabled after failure');
    assert.equal(await page.$eval('#name', (field) => field.value), 'Тестовая проверка', 'failed submission should preserve entered data');

    await page.click('#submit-button');
    await page.waitForFunction(() => !document.querySelector('#confirmation-msg').classList.contains('hidden'), { timeout: 5000 });
    assert.equal(await page.$eval('#form-error', (element) => element.classList.contains('hidden')), true, 'success should clear the error');
    assert.equal(await page.$eval('#name', (field) => field.value), '', 'successful submission should clear the form');
    assert.equal(await page.$eval('input[name="access_key"]', (field) => Boolean(field.value)), true, 'key should remain available after form reset');
    assert.equal(mockedApiRequests, 2, 'only valid submissions should reach the local mock');
    assert.equal(payloadHasExpectedFields, true, 'mocked payload should include the expected form fields');
    assert.deepEqual(pageErrors, [], 'page should have no uncaught JavaScript errors');

    process.stdout.write('E2E passed: page/CSS, anchors, desktop/mobile layout, validation, mocked API failure/retry/success. Requests handled locally: ' + mockedApiRequests + '.\n');
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

main().catch((error) => {
  process.stderr.write('E2E failed: ' + error.message + '\n');
  process.exitCode = 1;
});
