import assert from 'node:assert/strict';

const baseUrl = process.env.BASE_URL || 'http://localhost:3100';

async function request(path) {
  return fetch(`${baseUrl}${path}`, { redirect: 'manual' });
}

async function read(path) {
  const response = await request(path);
  return {
    response,
    body: await response.text(),
  };
}

function assertCanonical(html, canonical) {
  assert.match(html, new RegExp(`rel="canonical" href="${canonical.replaceAll('.', '\\.')}"`));
}

const root = await read('/');
assert.equal(root.response.status, 200);
assertCanonical(root.body, 'https://www.flinx.site');
assert.match(root.body, /hrefLang="en" href="https:\/\/www\.flinx\.site"/);

const german = await read('/de');
assert.equal(german.response.status, 200);
assertCanonical(german.body, 'https://www.flinx.site/de');

const englishDuplicate = await request('/en');
assert.ok(
  [301, 308, 404].includes(englishDuplicate.status),
  `/en should redirect or 404, got ${englishDuplicate.status}`,
);

for (const path of ['/xx', '/not-a-language']) {
  const invalid = await request(path);
  assert.equal(invalid.status, 404, `${path} should return 404`);
}

const sitemap = await read('/sitemap.xml');
assert.equal(sitemap.response.status, 200);
assert.match(sitemap.body, /https:\/\/www\.flinx\.site<\/loc>/);
assert.match(sitemap.body, /https:\/\/www\.flinx\.site\/de<\/loc>/);
assert.doesNotMatch(sitemap.body, /https:\/\/www\.flinx\.site\/en<\/loc>/);

console.log('SEO smoke checks passed');
