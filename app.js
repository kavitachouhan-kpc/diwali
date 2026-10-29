// Renders the homepage from data.js and wires up the interactions seen on the live site.
const $ = (sel, root = document) => root.querySelector(sel);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const STAR = '<svg width="12" height="12" viewBox="0 0 14 13" fill="currentColor" aria-hidden="true"><path d="M7 0 8.65 4.73l5.01.1-4 3.03 1.46 4.8L7 9.8l-4.11 2.86 1.45-4.8-3.99-3.03 5.01-.1L7 0Z"/></svg>';

const state = { cart: {}, count: 0 };
const product = key => (Array.isArray(key) ? key : P[key]);

/* ---------- Static images ---------- */
$('#logoImg').src = img(DATA.logo, 300);
$('#heroMobile').src = img(DATA.heroMobile, 1000);
$('#heroDesktop').srcset = img(DATA.heroDesktop, 1920);
$('#rosemaryMobile').src = img(DATA.rosemaryBanner.mobile, 1000);
$('#rosemaryDesktop').srcset = img(DATA.rosemaryBanner.desktop, 1920);
$('#monsoonBanner').src = img(DATA.monsoonBanner.mobile, 1000);
$('#promiseImg').src = img(DATA.promise.image, 720);
$('#promiseText').innerHTML = DATA.promise.html;
$('#footerStrip').src = img(DATA.footerStrip, 1000);

const tiles = (list, w, extra = '') => list.map(([file, href, label]) =>
  `<a href="#" data-href="${href}" aria-label="${esc(label || '')}"${extra}><img src="${img(file, w)}" alt="${esc(label || '')}" loading="lazy"></a>`).join('');

$('#catGrid').innerHTML = tiles(DATA.shopByCategories, 300);
$('#lookingFor').innerHTML = tiles(DATA.lookingFor, 400);
$('#archGrid').innerHTML = tiles(DATA.shopByCategory, 300);
$('#ingredients').innerHTML = tiles(DATA.ingredients, 400);
$('#b2p1').innerHTML = DATA.buy2pay1.map(([f, alt]) => `<a href="#"><img src="${img(f, 700)}" alt="${esc(alt)}" loading="lazy"></a>`).join('');
$('#b2p1Dots').innerHTML = DATA.buy2pay1.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('');
$('#iowName').textContent = DATA.ingredientOfWeek.name;
$('#iowTrack').innerHTML = DATA.ingredientOfWeek.slides.map(f => `<a href="#"><img src="${img(f, 600)}" alt="" loading="lazy"></a>`).join('');
$('#celebRow').innerHTML = DATA.celebs.map(([f, href, label]) =>
  `<a href="#" data-href="${href}"><img src="${img(f, 800)}" alt="${esc(label)}" loading="lazy"></a>`).join('');
$('#testiRow').innerHTML = DATA.testimonials.map(([f, href]) =>
  `<a href="#" data-href="${href}"><img src="${img(f, 800)}" alt="Customer testimonial" loading="lazy"></a>`).join('');

/* ---------- Product cards ---------- */
function parsePrice(text) {
  const nums = text.match(/₹[\d,]+/g) || [];
  return { from: /^From/.test(text), price: nums[0] || '', mrp: nums[1] || '', off: (text.match(/\d+% OFF/) || [''])[0] };
}

function ctaHTML(p) {
  const handle = p[0];
  const qty = state.cart[handle];
  if (qty) return `<div class="qty" data-handle="${handle}"><button data-act="dec" aria-label="Decrease">−</button><span>${qty}</span><button data-act="inc" aria-label="Increase">+</button></div>`;
  const needsShade = /shade/i.test(p[7]);
  return `<button data-act="add" data-handle="${handle}">${needsShade ? 'Select Shade <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m1 1 5 5 5-5"/></svg>' : 'Add To Cart →'}</button>`;
}

function cardHTML(key) {
  const p = product(key);
  const [handle, image, offer, brand, rating, count, title, variant, benefit, priceText] = p;
  const pr = parsePrice(priceText);
  const tags = [offer ? `<span class="offer">B1G1FREE</span>` : '', brand ? `<span class="brand">${esc(brand)}</span>` : ''].filter(Boolean);
  return `<article class="card">
    <a class="card-img" href="#" data-href="/products/${handle}"><img src="${img(image, 500)}" alt="${esc(title)}" loading="lazy"></a>
    <div class="card-head">
      <div class="tag-swap${tags.length < 2 ? ' single' : ''}">${tags.join('')}</div>
      ${rating ? `<span class="rating">${STAR}${rating}<small>(${count})</small></span>` : ''}
    </div>
    <a class="card-title" href="#" data-href="/products/${handle}">${esc(title)}</a>
    <div class="card-variant">${esc(variant)}</div>
    ${benefit ? `<div class="card-benefit">${esc(benefit)}</div>` : ''}
    <div class="price-row">${pr.from ? 'From' : ''}<span class="price">${pr.price}</span>${pr.mrp ? `<s>${pr.mrp}</s><span class="off">${pr.off}</span>` : '<span class="price-dash"></span>'}</div>
    <div class="card-cta">${ctaHTML(p)}</div>
  </article>`;
}

document.querySelectorAll('.product-section').forEach(section => {
  const c = DATA[section.dataset.collection];
  const hasTabs = c.tabs.length > 1;
  section.innerHTML = `
    <div class="container">
      <div class="ps-head">
        <div><h3>${esc(c.title)}</h3><h2>${esc(c.sub)}</h2></div>
        <a class="view-all" href="#" data-href="${c.tabs[0][1]}">${esc(c.cta)}</a>
      </div>
      ${hasTabs ? `<div class="tabs" role="tablist">${c.tabs.map((t, i) => `<button class="tab${i ? '' : ' active'}" role="tab" data-i="${i}">${esc(t[0])}</button>`).join('')}</div>` : ''}
    </div>
    <div class="rail"></div>`;
  const rail = $('.rail', section);
  const show = i => {
    rail.innerHTML = c.tabs[i][2].map(cardHTML).join('');
    rail.scrollLeft = 0;
    rail.classList.remove('fade-in'); void rail.offsetWidth; rail.classList.add('fade-in');
    $('.view-all', section).dataset.href = c.tabs[i][1];
  };
  show(0);
  section.addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    section.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === tab));
    show(+tab.dataset.i);
  });
});

/* ---------- Cart interactions ---------- */
function refreshCTAs(handle) {
  document.querySelectorAll('.card').forEach(card => {
    const a = card.querySelector('.card-img');
    if (a.dataset.href !== '/products/' + handle) return;
    const key = Object.keys(P).find(k => P[k][0] === handle);
    card.querySelector('.card-cta').innerHTML = ctaHTML(P[key]);
  });
}

function updateCount(delta) {
  state.count = Math.max(0, state.count + delta);
  const badge = $('#cartCount');
  badge.textContent = state.count;
  badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump');
  // B1G1 progress copy mirrors the live site's mini-cart nudge.
  const tiers = [...document.querySelectorAll('#tiers li')];
  tiers.forEach(li => li.classList.toggle('done', state.count >= +li.dataset.n));
  const next = tiers.find(li => state.count < +li.dataset.n);
  $('#offerBar span').innerHTML = next
    ? `Add <b class="teal" id="offerNeed">${+next.dataset.n - state.count}</b> more eligible product/s to avail <b class="teal">${next.textContent}</b>`
    : `<b class="teal">Buy 3 Get 3 Free</b> unlocked!`;
}

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 1600);
}

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-act]');
  if (btn) {
    const handle = btn.dataset.handle || btn.closest('.qty').dataset.handle;
    const act = btn.dataset.act;
    const max = 3;
    const q = state.cart[handle] || 0;
    if (act === 'add' || act === 'inc') {
      if (q >= max) return toast('Max 3 units per product');
      state.cart[handle] = q + 1; updateCount(1);
      if (act === 'add') toast('Added to cart');
    } else if (act === 'dec') {
      state.cart[handle] = q - 1; updateCount(-1);
      if (!state.cart[handle]) delete state.cart[handle];
    }
    refreshCTAs(handle);
    return;
  }
  // Prototype: keep links on-page; log the real destination.
  const link = e.target.closest('a[href="#"]');
  if (link) { e.preventDefault(); if (link.dataset.href) toast('→ ' + link.dataset.href); }
});

/* ---------- Countdown ---------- */
const end = new Date(DATA.saleEnds).getTime();
const pad = n => String(n).padStart(2, '0');
function tick() {
  let s = Math.max(0, Math.floor((end - Date.now()) / 1000));
  // Once the real end time passes, loop a 24h window so the prototype keeps ticking.
  if (s === 0) s = 86400 - (Math.floor(Date.now() / 1000) % 86400);
  $('#countdown').textContent = `${pad(Math.floor(s / 3600))}h ${pad(Math.floor(s / 60) % 60)}m ${pad(s % 60)}s`;
}
tick(); setInterval(tick, 1000);

/* ---------- Search placeholder typing ---------- */
(function typeHints() {
  const input = $('#searchInput');
  let w = 0, c = 0, deleting = false;
  setInterval(() => {
    if (document.activeElement === input) return;
    const word = DATA.searchHints[w];
    c += deleting ? -1 : 1;
    input.placeholder = 'Search For ' + word.slice(0, c);
    if (!deleting && c === word.length + 8) deleting = true; // brief hold
    if (deleting && c <= 0) { deleting = false; w = (w + 1) % DATA.searchHints.length; }
  }, 110);
})();

/* ---------- Carousels: dots + progress ---------- */
const b2p1 = $('#b2p1');
b2p1.addEventListener('scroll', () => {
  const step = b2p1.firstElementChild.offsetWidth + 12;
  const i = Math.round(b2p1.scrollLeft / step);
  document.querySelectorAll('#b2p1Dots i').forEach((d, j) => d.classList.toggle('on', j === i));
}, { passive: true });

const testi = $('#testiRow');
testi.addEventListener('scroll', () => {
  const max = testi.scrollWidth - testi.clientWidth;
  const ratio = max ? testi.scrollLeft / max : 0;
  $('#testiProgress').style.transform = `translateX(${ratio * 400}%)`;
}, { passive: true });

/* ---------- Shoppable videos ---------- */
$('#videoRow').innerHTML = DATA.videos.map(([src, poster, key], i) => {
  const p = product(key);
  return `<div class="vcard" data-i="${i}">
    ${poster ? `<img class="poster" src="${img(poster, 600)}" alt="" loading="lazy">` : ''}
    <video src="${src}#t=0.1" muted loop playsinline preload="${poster ? 'none' : 'metadata'}"></video>
    <button class="play" aria-label="Play video"><svg width="18" height="20" viewBox="0 0 18 20"><path d="M2 1.5v17L16.5 10 2 1.5Z" fill="none" stroke="#111" stroke-width="2" stroke-linejoin="round"/></svg></button>
    <button class="shop-chip"><svg width="18" height="16" viewBox="0 0 24 20" fill="#111"><path d="M1 2v7.6L11.4 20 22 9.4 11.6 0H3a2 2 0 0 0-2 2Zm5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/></svg>Shop this video</button>
    <div class="vprod"><img src="${img(p[1], 200)}" alt=""><div><b>${esc(p[6])}</b>${parsePrice(p[9]).price}<br><button data-act="add" data-handle="${p[0]}">Add to cart →</button></div></div>
  </div>`;
}).join('');
document.querySelectorAll('.vcard').forEach(card => {
  const video = $('video', card);
  card.addEventListener('click', e => {
    if (e.target.closest('.shop-chip')) { card.classList.add('show-prod'); return; }
    if (e.target.closest('.vprod')) return;
    if (video.paused) {
      document.querySelectorAll('.vcard video').forEach(v => { if (v !== video) { v.pause(); v.closest('.vcard').classList.remove('playing'); } });
      video.play(); card.classList.add('playing');
      const poster = $('.poster', card); if (poster) poster.remove();
    } else { video.pause(); card.classList.remove('playing'); }
  });
});

/* ---------- Menu drawer + desktop nav ---------- */
$('#drawerList').innerHTML = DATA.menu.map(([label, href, children]) => children
  ? `<li><details><summary>${esc(label)}</summary><ul>${children.map(c => `<li><a href="#">${esc(c)}</a></li>`).join('')}</ul></details></li>`
  : `<li><a href="#" data-href="${href}">${esc(label)}</a></li>`).join('');
$('#deskNav').innerHTML = DATA.menu.map(([label, href]) => `<a href="#" data-href="${href}">${esc(label)}</a>`).join('');
const setMenu = open => document.body.classList.toggle('menu-open', open);
$('#menuBtn').addEventListener('click', () => setMenu(true));
$('#drawerClose').addEventListener('click', () => setMenu(false));
$('#drawerBackdrop').addEventListener('click', () => setMenu(false));

/* ---------- Offer sheet ---------- */
const setSheet = open => document.body.classList.toggle('sheet-open', open);
$('#offerBar').addEventListener('click', () => setSheet(true));
$('#sheetBackdrop').addEventListener('click', () => setSheet(false));

/* ---------- Footer ---------- */
$('#footerCols').innerHTML = Object.entries(DATA.footer).map(([head, links]) =>
  `<div><h4>${head}</h4><ul>${links.map(([l, h, perk]) => `<li><a href="#" data-href="${h}">${esc(l)}</a>${perk ? `<span class="perk">${perk}</span>` : ''}</li>`).join('')}</ul></div>`).join('');

/* ---------- Bottom nav hides on scroll down, returns on scroll up ---------- */
let lastY = scrollY;
addEventListener('scroll', () => {
  const y = scrollY;
  if (Math.abs(y - lastY) < 8) return;
  document.body.classList.toggle('nav-hidden', y > lastY && y > 200);
  lastY = y;
}, { passive: true });
