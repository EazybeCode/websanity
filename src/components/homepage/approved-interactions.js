/* Generated from the approved v366 prototype. Content interactions only. */
export function runApprovedInteractions(environment) {
const {translate = (text) => text, document, window, IntersectionObserver, MutationObserver, requestAnimationFrame, setTimeout, clearTimeout, matchMedia, addEventListener, listen} = environment;
document.querySelectorAll('#companies .company-logo img').forEach(img => { const fallback = () => img.parentElement.classList.add('fallback'); listen(img, 'error', fallback); if (img.complete && !img.naturalWidth)
    fallback(); });
(() => { const grid = document.querySelector('.mp-grid'); if (!grid || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches)
    return; const cards = [...grid.querySelectorAll('.mp-tile')]; grid.classList.add('mp-assemble-ready'); const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) {
    entry.target.classList.add('mp-arrived');
    observer.unobserve(entry.target);
} }); }, { threshold: .18, rootMargin: '0px 0px -30px 0px' }); cards.forEach(card => observer.observe(card)); })();
(() => { const scenes = document.querySelectorAll('.s199-scene'); if (!('IntersectionObserver' in window)) {
    scenes.forEach(s => s.classList.add('s199-visible'));
    return;
} const observer = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) {
    e.target.classList.add('s199-visible');
    observer.unobserve(e.target);
} }), { threshold: .25 }); scenes.forEach(s => observer.observe(s)); })();
(() => { const cards = document.querySelectorAll('#agents .compact-agent-grid>article'); if (!('IntersectionObserver' in window)) {
    cards.forEach(c => c.classList.add('a202-visible'));
    return;
} const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) {
    e.target.classList.add('a202-visible');
    io.unobserve(e.target);
} }), { threshold: .2 }); cards.forEach(c => io.observe(c)); })();
(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window))
        return;
    const boxes = [...document.querySelectorAll('[data-box-entrance]')];
    const reveal = el => { el.classList.add('b220-arrived'); observer.unobserve(el); };
    const observer = new IntersectionObserver(entries => { for (const entry of entries)
        if (entry.isIntersecting)
            reveal(entry.target); }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    for (const el of boxes) {
        if (el.getBoundingClientRect().top < innerHeight)
            continue;
        el.classList.add('b220-ready');
        observer.observe(el);
    }
    function finish() { boxes.forEach(reveal); }
    listen(reduced, 'change', () => { if (reduced.matches)
        finish(); });
    new MutationObserver(() => { if (document.body.classList.contains('paused'))
        finish(); }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    listen(document, 'focusin', e => { const el = e.target.closest('[data-box-entrance]'); if (el)
        reveal(el); });
})();
(() => { const links = [...document.querySelectorAll('.m221-sidebar a')], rows = links.map(a => document.querySelector(a.hash)); function sync() { let index = 0; rows.forEach((r, i) => { if (r.getBoundingClientRect().top < innerHeight * .45)
    index = i; }); links.forEach((a, i) => { if (i === index)
    a.setAttribute('aria-current', 'true');
else
    a.removeAttribute('aria-current'); }); } let pending = false; addEventListener('scroll', () => { if (pending)
    return; pending = true; requestAnimationFrame(() => { sync(); pending = false; }); }, { passive: true }); sync(); })();
(() => { const section = document.getElementById('integrations'), buttons = [...section.querySelectorAll('.c209-brands>button')]; function lum(hex) { const c = hex.slice(1).match(/../g).map(x => parseInt(x, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4); return c[0] * .2126 + c[1] * .7152 + c[2] * .0722; } function select(b) { const l = lum(b.dataset.crmBg), dark = lum('#080d16'), ink = (l + .05) / (dark + .05) > 1.05 / (l + .05) ? '#080d16' : '#ffffff'; section.style.setProperty('--crm-bg', b.dataset.crmBg); section.style.setProperty('--crm-accent', b.dataset.crmAccent); section.style.setProperty('--crm-ink', ink); buttons.forEach(x => x.setAttribute('aria-pressed', String(x === b))); const img = section.querySelector('.crm-real258 img'); img.src = b.dataset.crmScreen; img.alt = b.dataset.crmName + ': ' + b.dataset.crmView; section.querySelector('.crm-real258').href = b.dataset.crmScreen; section.querySelector('.c209-foot a').href = b.dataset.crmScreen; section.querySelector('.c209-foot span').textContent = b.dataset.crmName + ' · ' + b.dataset.crmView; } buttons.forEach(b => listen(b, 'click', () => select(b))); select(buttons[0]); })();
(() => { const stories = [...document.querySelectorAll('#insights .sales-story299')], panels = [...document.querySelectorAll('#insights .sales-live299')]; function select(index) { stories.forEach((el, i) => { el.classList.toggle('is-active', i === index); el.querySelector('button').setAttribute('aria-current', i === index ? 'step' : 'false'); panels[i].hidden = i !== index; }); } function sync() { if (innerWidth <= 540)
    return; let active = 0; stories.forEach((el, i) => { if (el.getBoundingClientRect().top < innerHeight * .5)
    active = i; }); select(active); } stories.forEach((el, i) => listen(el.querySelector('button'), 'click', () => { select(i); if (innerWidth > 540)
    el.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); })); let pending = false; addEventListener('scroll', () => { if (!pending) {
    pending = true;
    requestAnimationFrame(() => { pending = false; sync(); });
} }, { passive: true }); addEventListener('resize', sync); sync(); })();
(() => { if (matchMedia('(prefers-reduced-motion: reduce)').matches)
    return; const seen = new WeakSet(); function show(el, delay = 0) { if (seen.has(el))
    return; seen.add(el); el.style.setProperty('--first-delay306', delay + 'ms'); el.classList.add('first-box306'); } if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (!e.isIntersecting)
        return; const group = e.target; [...group.children].forEach((el, i) => show(el, i * 90)); observer.unobserve(group); }), { threshold: .2 });
    document.querySelectorAll('#home .hero-channel-highlights,#customer-proof314 .hero-trust').forEach(el => observer.observe(el));
    const cards = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting && e.target.dataset.depth === '0') {
        const scene = e.target.querySelector('.outreach-scene');
        [...scene.querySelectorAll('.o209-product-head,.o209-field,.o209-message,.o209-result')].forEach((el, i) => show(el, i * 75));
    } }), { threshold: .3 });
    document.querySelectorAll('#automation .portal-card303').forEach(card => { cards.observe(card); new MutationObserver(() => { if (card.dataset.depth === '0') {
        const rect = card.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < innerHeight)
            [...card.querySelectorAll('.o209-product-head,.o209-field,.o209-message,.o209-result')].forEach((el, i) => show(el, i * 75));
    } }).observe(card, { attributes: true, attributeFilter: ['data-depth'] }); });
} })();
(() => { const host = document.getElementById('original-nav'), root = host?.shadowRoot; if (root) {
    const style = document.createElement('style');
    style.textContent = ':host{background:transparent!important}.landing{background:transparent!important}' + '.nav'.repeat(20) + '{background:#10213b!important;background-image:none!important;border-bottom:1px solid transparent!important;box-shadow:none!important;backdrop-filter:none!important;transition:background .25s,border-color .25s,box-shadow .25s!important}' + '.nav'.repeat(20) + '.n216-scrolled{background:#101723!important;border-bottom-color:#26364c!important;box-shadow:0 6px 24px #09152420!important}';
    root.append(style);
} if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window))
    return; const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting)
    e.target.classList.add('motion-on308'); e.target.style.setProperty('--motion-play308', e.isIntersecting ? 'running' : 'paused'); }), { threshold: .22 }); document.querySelectorAll('#problems .mp-illustration,#phones .m221-visual').forEach(el => observer.observe(el)); })();
(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const states = [...document.querySelectorAll('.outreach-section')].map(section => { const points = [...section.querySelectorAll('.outreach-story-point')], scenes = [...section.querySelectorAll('.outreach-scene')]; const state = { section, points, scenes, index: 0, elapsed: 0, visible: false, hold: 0 }; function select(index) { state.index = index; state.elapsed = 0; state.hold = 0; points.forEach((point, j) => { point.classList.toggle('active', j === index); point.querySelector('button').setAttribute('aria-expanded', j === index); point.querySelector('.story-toggle').textContent = j === index ? '−' : '+'; point.querySelector('.story-progress i').style.transform = 'scaleX(0)'; scenes[j].classList.toggle('active', j === index); scenes[j].setAttribute('aria-hidden', j !== index); }); } state.select = select; points.forEach((p, j) => listen(p.querySelector('button'), 'click', () => select(j))); new IntersectionObserver(entries => { state.visible = entries[0].isIntersecting; }, { threshold: 0.1 }).observe(section); return state; });
    let previous = 0;
    function tick(now) { const dt = previous ? Math.min(now - previous, 100) : 0; previous = now; states.forEach(s => { if (!s.visible || reduced || document.hidden || document.body.classList.contains('paused'))
        return; if (s.elapsed < 7000) {
        s.elapsed = Math.min(7000, s.elapsed + dt);
        s.points[s.index].querySelector('.story-progress i').style.transform = 'scaleX(' + s.elapsed / 7000 + ')';
    }
    else {
        s.hold += dt;
        if (s.hold >= 450)
            s.select((s.index + 1) % s.points.length);
    } }); requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
})();
(() => { const hero = document.getElementById('home'); if (!hero)
    return; const reduced = matchMedia('(prefers-reduced-motion: reduce)'); let seen = false; function update(visible) { hero.classList.toggle('hero-visible342', visible && !document.hidden); if (visible && !seen && !reduced.matches) {
    seen = true;
    hero.classList.add('hero-enter342');
} } if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => update(entries[0].isIntersecting), { threshold: .05 }).observe(hero);
}
else {
    update(true);
} listen(document, 'visibilitychange', () => { const rect = hero.getBoundingClientRect(); update(rect.bottom > 0 && rect.top < innerHeight); }); })();

}
