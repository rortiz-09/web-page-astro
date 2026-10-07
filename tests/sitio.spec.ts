import { test, expect } from '@playwright/test';

const paginas = [
  '/',
  '/nosotros',
  '/planes/hogar',
  '/planes/pyme',
  '/cobertura',
  '/contacto',
  '/privacidad',
  '/terminos',
];

for (const ruta of paginas) {
  test(`${ruta} carga sin errores`, async ({ page }) => {
    const errores: string[] = [];
    page.on('pageerror', (e) => errores.push(e.message));
    page.on('console', (m) => m.type() === 'error' && errores.push(m.text()));

    const res = await page.goto(ruta);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator('h1').first()).toBeVisible();

    // Sin scroll horizontal (rompe en móvil).
    const desborde = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(desborde, 'scroll horizontal').toBeLessThanOrEqual(1);

    // Imágenes que no cargaron.
    const rotas = await page.$$eval('img', (imgs) =>
      imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
    );
    expect(rotas, 'imágenes rotas').toEqual([]);

    expect(errores, 'errores de consola').toEqual([]);
  });
}

test('los enlaces internos no dan 404', async ({ page, request }) => {
  const vistos = new Set<string>();
  for (const ruta of paginas) {
    await page.goto(ruta);
    const hrefs = await page.$$eval('a[href^="/"]', (as) =>
      as.map((a) => a.getAttribute('href')!.split('#')[0]),
    );
    hrefs.filter(Boolean).forEach((h) => vistos.add(h));
  }
  const rotos: string[] = [];
  for (const href of vistos) {
    const r = await request.get(href);
    if (r.status() >= 400) rotos.push(`${href} -> ${r.status()}`);
  }
  expect(rotos).toEqual([]);
});

test('ruta inexistente muestra la página 404', async ({ page }) => {
  const res = await page.goto('/no-existe-xyz');
  expect(res?.status()).toBe(404);
});
