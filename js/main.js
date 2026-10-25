/* ==========================================================
   CLIPPER – main.js  (runs on every page)
   Builds the banner, header, footer and WhatsApp button,
   fills icons, and makes things animate when you scroll.
   ========================================================== */

(function () {
  var page = document.body.getAttribute('data-page') || 'home';

  /* Safe wrappers: localStorage can be blocked in some browsers */
  function store(key, value) {
    try { if (value === undefined) return localStorage.getItem(key); localStorage.setItem(key, value); } catch (e) { return null; }
  }

  /* ---------- 1. Offer banner (can be closed, remembered) ---------- */
  var bannerHTML = '';
  if (store('clipperBannerClosed') !== '1') {
    bannerHTML =
      '<div class="offer-banner" id="offerBanner" role="region" aria-label="Special offer">' +
      icon('tag') + ' Book online and get <strong>10% OFF</strong> – use code <b>' + SITE.code + '</b>' +
      '<button type="button" id="closeBanner" aria-label="Close offer banner">' + icon('close') + '</button></div>';
  }

  /* ---------- 2. Header ---------- */
  var links = [
    ['home', 'index.html', 'Home'],
    ['services', 'services.html', 'Services & Prices'],
    ['branches', 'branches.html', 'Branches'],
    ['about', 'about.html', 'About Us']
  ];
  var navItems = links.map(function (l) {
    return '<li><a href="' + l[1] + '"' + (l[0] === page ? ' class="active" aria-current="page"' : '') + '>' + l[2] + '</a></li>';
  }).join('');

  var headerHTML =
    bannerHTML +
    '<header class="site-header"><div class="container nav">' +
    '<a class="logo" href="index.html" aria-label="Clipper home">' + icon('scissors') + 'CLIPPER</a>' +
    '<button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false">' + icon('menu') + '</button>' +
    '<ul class="nav-links" id="navLinks">' + navItems +
    '<li><a class="btn small" href="book.html">Book Online</a></li></ul></div></header>';

  var headerSlot = document.getElementById('site-header');
  if (headerSlot) headerSlot.innerHTML = headerHTML;

  /* ---------- 3. Footer + floating WhatsApp button ---------- */
  var footerSlot = document.getElementById('site-footer');
  if (footerSlot) {
    footerSlot.innerHTML =
      '<footer class="site-footer"><div class="container">' +
      '<div class="footer-grid">' +
      '<div><a class="logo" href="index.html">' + icon('scissors') + 'CLIPPER</a>' +
      '<p class="muted" style="margin-top:10px">Premium grooming for men in Lahore since 2005.</p></div>' +
      '<div><h4>Explore</h4><ul>' + links.map(function (l) { return '<li><a href="' + l[1] + '">' + l[2] + '</a></li>'; }).join('') +
      '<li><a href="book.html">Book Online</a></li></ul></div>' +
      '<div><h4>Branches</h4><ul>' + BRANCHES.map(function (b) { return '<li><a href="branches.html?b=' + b.id + '">' + b.name + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h4>Contact</h4><ul><li>' + icon('phone') + ' <a href="tel:' + SITE.phoneLink + '">' + SITE.phone + '</a></li>' +
      '<li>' + icon('whatsapp') + ' <a href="' + waLink('Hello Clipper! I have a question.') + '" target="_blank" rel="noopener">WhatsApp us</a></li>' +
      '<li>' + icon('clock') + ' Open daily, 10 AM – 10 PM</li></ul></div></div>' +
      '<p class="demo-note">This is a demo website. All names, addresses, prices and phone numbers are made up.</p>' +
      '</div></footer>' +
      '<a class="wa-float" href="' + waLink('Hello Clipper! I would like some information.') + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' +
      icon('whatsapp') + '<span>Chat with us</span></a>';
  }

  /* ---------- 4. Fill in icons: <span data-icon="scissors"></span> ---------- */
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    el.insertAdjacentHTML('afterbegin', icon(el.getAttribute('data-icon')));
  });

  /* ---------- 5. Close banner / open menu ---------- */
  var closeBtn = document.getElementById('closeBanner');
  if (closeBtn) closeBtn.addEventListener('click', function () {
    document.getElementById('offerBanner').remove();
    store('clipperBannerClosed', '1');
  });

  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn) menuBtn.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });

  /* ---------- 6. Scroll animations ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Numbers that count up: <b data-count="4">0</b> */
  var counters = document.querySelectorAll('[data-count]');
  function runCounter(el) {
    var target = +el.getAttribute('data-count');
    var suffix = el.getAttribute('data-suffix') || '';
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 1400, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { runCounter(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || ''); });
  }

  /* ---------- 7. Refer a friend buttons (loyalty section) ---------- */
  document.querySelectorAll('[data-refer]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var url = location.protocol.indexOf('http') === 0 ? location.origin + location.pathname.replace(/[^/]*$/, '') : SITE.fallbackUrl;
      var msg = 'Hey! I get my haircuts at Clipper in Lahore – you should try it. Book online with code ' + SITE.code +
        ' and get 10% off: ' + url;
      window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  });
})();
