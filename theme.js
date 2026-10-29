// Diwali theme review switch: sets html[data-theme] and remembers the choice (?theme=… or localStorage).
const THEMES = [
  { id: '', name: 'Current site', desc: 'No festive theme — as live today', swatch: 'linear-gradient(135deg,#fff 50%,#00726c 50%)' },
  // Final three (theme-mix.css). Earlier explorations (maroon … slantglow) still exist in theme*.css; re-add entries to bring them back.
  { id: 'curtain', base: 'starry', curtain: true, name: 'Curtain Lights', desc: 'Navy curtain-light panels on a white page', swatch: 'repeating-linear-gradient(90deg,#071637 0 6px,#ffd76a 6px 8px)', banner: true },
  { id: 'curtainday', base: 'starry', curtain: true, name: 'Curtain Day', desc: 'Fully light page; curtain lights in banner blue', swatch: 'repeating-linear-gradient(90deg,#eef3fc 0 6px,#2f5fd0 6px 8px)', banner: true },
  { id: 'curtainnight', base: 'starry', curtain: true, name: 'Curtain Night', desc: 'Whole homepage in navy with curtain lights & gold headings', swatch: 'radial-gradient(circle at 70% 30%,#ffd76a 12%,transparent 14%),#071637', banner: true },
];
// Independent review options layered on top of any theme (html[data-timer], html[data-divider])
const OPTIONS = {
  timer: { label: 'Timer', values: [['', 'Live red'], ['gold', 'Gold'], ['blue', 'Blue']] },
  divider: { label: 'Divider', values: [['', 'Theme default'], ['dots', 'Dotted']] },
};
const DIWALI_BANNER = 'assets/diwali-banner.webp';

(function () {
  // Decorative elements the themes can switch on
  const header = document.getElementById('siteHeader');
  header.insertAdjacentHTML('beforeend', '<div class="dw dw-lights"></div><div class="dw dw-garland"></div>');
  const cats = document.querySelector('[data-sec="categories"]');
  cats.insertAdjacentHTML('afterbegin', '<div class="dw dw-lanterns"><i></i><i></i><i></i><i></i></div>');
  const fireworks = '<div class="dw dw-fw"><i></i><i></i><i></i></div>';
  [cats, ...document.querySelectorAll('.product-section')].forEach(el => el.insertAdjacentHTML('afterbegin', fireworks));
  // Rows that become navy panels in the Starry set
  ['trending', 'makeupFest', 'newArrivals', 'sets'].forEach(k => document.querySelector(`[data-collection="${k}"]`).classList.add('sp'));

  // Banner swap for the navy themes; keep the live banner to restore
  const heroImg = document.getElementById('heroMobile');
  const heroSrc = document.getElementById('heroDesktop');
  const liveBanner = { src: heroImg.src, srcset: heroSrc.srcset, alt: heroImg.alt };
  function setBanner(on) {
    document.documentElement.classList.toggle('has-banner', on);
    heroImg.src = on ? DIWALI_BANNER : liveBanner.src;
    heroImg.alt = on ? "Season's Favourite — Oh so Creme Bullet Lipstick" : liveBanner.alt;
    heroImg.width = on ? 641 : 1000; heroImg.height = on ? 728 : 650;
    heroSrc.srcset = on ? DIWALI_BANNER : liveBanner.srcset;
  }

  const read = () => {
    const q = new URLSearchParams(location.search).get('theme');
    if (q !== null) return q;
    try { return localStorage.getItem('pilgrim-diwali-theme') || ''; } catch { return ''; }
  };
  let current = Math.max(0, THEMES.findIndex(t => t.id === read()));

  const box = document.createElement('div');
  box.className = 'review';
  box.innerHTML = `
    <div class="review-panel" role="listbox" aria-label="Diwali themes">
      <h5>Diwali theme</h5>
      ${THEMES.map((t, i) => (t.id === 'curtain' ? '<h5>Finalists</h5>' : '') + `<button class="rv-opt" data-i="${i}" role="option"><span class="rv-swatch" style="background:${t.swatch}"></span><span><b>${i ? i + '. ' : ''}${t.name}</b><small>${t.desc}</small></span></button>`).join('')}
      <h5>Elements</h5>
      ${Object.entries(OPTIONS).map(([k, o]) => `<div class="rv-row"><span>${o.label}</span>${o.values.map(([v, l]) => `<button class="rv-chip" data-k="${k}" data-v="${v}">${l}</button>`).join('')}</div>`).join('')}
      <p class="rv-hint">Divider shows in the curtain themes · ← / → keys switch themes</p>
    </div>
    <div class="review-pill">
      <button data-step="-1" aria-label="Previous theme">‹</button>
      <button class="rv-name" aria-label="Choose theme"><span class="rv-dot"></span><span class="rv-label"></span></button>
      <button data-step="1" aria-label="Next theme">›</button>
    </div>`;
  document.body.appendChild(box);

  function apply(i) {
    current = (i + THEMES.length) % THEMES.length;
    const t = THEMES[current];
    if (t.id) document.documentElement.dataset.theme = t.id;
    else delete document.documentElement.dataset.theme;
    setBanner(!!t.banner);
    document.documentElement.classList.toggle('starry-base', t.base === 'starry');
    document.documentElement.classList.toggle('curtain-base', !!t.curtain);
    box.querySelector('.rv-label').textContent = `${current ? current + '/' + (THEMES.length - 1) + ' · ' : ''}${t.name}`;
    box.querySelector('.rv-dot').style.background = t.swatch;
    box.querySelectorAll('.rv-opt').forEach((b, j) => b.classList.toggle('on', j === current));
    try { localStorage.setItem('pilgrim-diwali-theme', t.id); } catch {}
    const url = new URL(location.href);
    t.id ? url.searchParams.set('theme', t.id) : url.searchParams.delete('theme');
    history.replaceState(null, '', url);
  }

  function setOption(k, v) {
    if (v) document.documentElement.dataset[k] = v;
    else delete document.documentElement.dataset[k];
    box.querySelectorAll(`.rv-chip[data-k="${k}"]`).forEach(c => c.classList.toggle('on', c.dataset.v === v));
    try { localStorage.setItem('pilgrim-diwali-' + k, v); } catch {}
    const url = new URL(location.href);
    v ? url.searchParams.set(k, v) : url.searchParams.delete(k);
    history.replaceState(null, '', url);
  }
  Object.keys(OPTIONS).forEach(k => {
    const q = new URLSearchParams(location.search).get(k);
    let v = q;
    if (v === null) { try { v = localStorage.getItem('pilgrim-diwali-' + k) || ''; } catch { v = ''; } }
    setOption(k, OPTIONS[k].values.some(([x]) => x === v) ? v : '');
  });

  box.addEventListener('click', e => {
    const chip = e.target.closest('.rv-chip');
    if (chip) { setOption(chip.dataset.k, chip.dataset.v); return; }
    const step = e.target.closest('[data-step]');
    const opt = e.target.closest('.rv-opt');
    if (step) apply(current + +step.dataset.step);
    else if (opt) { apply(+opt.dataset.i); box.classList.remove('open'); }
    else if (e.target.closest('.rv-name')) box.classList.toggle('open');
  });
  document.addEventListener('click', e => { if (!box.contains(e.target)) box.classList.remove('open'); });
  document.addEventListener('keydown', e => {
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight') apply(current + 1);
    if (e.key === 'ArrowLeft') apply(current - 1);
  });

  apply(current);
})();
