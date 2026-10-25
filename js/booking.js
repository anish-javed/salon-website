/* ==========================================================
   CLIPPER – booking.js
   4-step booking: branch → services → date & time → name.
   At the end it opens WhatsApp with a ready-made message.
   ========================================================== */

(function () {
  var root = document.getElementById('booking');
  if (!root) return;

  /* The "notebook": everything the visitor chooses is stored here */
  var booking = { branch: null, services: [], date: '', time: '', name: '' };
  var current = 0;                       // which step we are on (0 to 3)
  var steps = root.querySelectorAll('.step');
  var dots = root.querySelectorAll('.dot');
  var errorEl = document.getElementById('bookError');
  var backBtn = document.getElementById('backBtn');
  var nextBtn = document.getElementById('nextBtn');

  /* ----- Step 1: branch cards ----- */
  var branchBox = document.getElementById('branchChoices');
  branchBox.innerHTML = BRANCHES.map(function (b) {
    return '<button type="button" class="choice" data-id="' + b.id + '"><strong>' + icon('pin') + ' ' + b.name + '</strong>' +
      '<small>' + b.address + '</small></button>';
  }).join('');
  branchBox.addEventListener('click', function (e) {
    var c = e.target.closest('.choice');
    if (!c) return;
    booking.branch = c.getAttribute('data-id');
    branchBox.querySelectorAll('.choice').forEach(function (x) { x.classList.toggle('selected', x === c); });
    errorEl.textContent = '';
  });

  /* ----- Step 2: services (grouped by category) ----- */
  var svcBox = document.getElementById('serviceChoices');
  svcBox.innerHTML = CATEGORIES.map(function (c) {
    return '<div class="group-title">' + c.label + '</div><div class="service-list">' +
      SERVICES.filter(function (s) { return s.cat === c.id; }).map(function (s) {
        return '<label class="service-row"><input type="checkbox" value="' + s.id + '">' +
          '<span class="info"><strong>' + s.name + '</strong><small>' + s.desc + '</small></span>' +
          '<span class="price">' + rupees(s.price) + '</span></label>';
      }).join('') + '</div>';
  }).join('');
  svcBox.addEventListener('change', function (e) {
    var id = e.target.value, i = booking.services.indexOf(id);
    if (e.target.checked && i < 0) booking.services.push(id);
    if (!e.target.checked && i > -1) booking.services.splice(i, 1);
    e.target.closest('.service-row').classList.toggle('checked', e.target.checked);
    updateMini();
    errorEl.textContent = '';
  });

  function totals() {
    var t = booking.services.reduce(function (sum, id) { return sum + findService(id).price; }, 0);
    return { total: t, after: t * (1 - SITE.discount) };
  }
  function updateMini() {
    var t = totals();
    document.getElementById('miniTotal').innerHTML =
      '<span>' + booking.services.length + ' selected</span><span>' + rupees(t.total) +
      ' → <span class="gold">' + rupees(t.after) + '</span> with ' + SITE.code + '</span>';
  }

  /* ----- Step 3: date and time slots ----- */
  var dateInput = document.getElementById('bookDate');
  var slotBox = document.getElementById('slots');

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  var now = new Date();
  var todayStr = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
  var max = new Date(now.getTime() + 60 * 86400000);   // allow booking up to 60 days ahead
  dateInput.min = todayStr;
  dateInput.max = max.getFullYear() + '-' + pad(max.getMonth() + 1) + '-' + pad(max.getDate());

  function slotLabel(h, m) {
    return ((h + 11) % 12 + 1) + ':' + pad(m) + ' ' + (h < 12 ? 'AM' : 'PM');
  }
  function drawSlots() {
    var isToday = dateInput.value === todayStr;
    var html = '';
    for (var h = 11; h <= 21; h++) {
      [0, 30].forEach(function (m) {
        var past = isToday && (h * 60 + m) <= (new Date().getHours() * 60 + new Date().getMinutes());
        var label = slotLabel(h, m);
        if (past && booking.time === label) booking.time = '';   // chosen time already passed today
        html += '<button type="button" class="slot' + (booking.time === label ? ' selected' : '') + '"' + (past ? ' disabled' : '') + '>' + label + '</button>';
      });
    }
    slotBox.innerHTML = html;
  }
  dateInput.addEventListener('change', function () {
    booking.date = dateInput.value;
    drawSlots();
    errorEl.textContent = '';
  });
  slotBox.addEventListener('click', function (e) {
    var s = e.target.closest('.slot');
    if (!s || s.disabled) return;
    booking.time = s.textContent;
    slotBox.querySelectorAll('.slot').forEach(function (x) { x.classList.toggle('selected', x === s); });
    errorEl.textContent = '';
  });
  drawSlots();

  /* ----- Step 4: name + summary ----- */
  var nameInput = document.getElementById('bookName');
  nameInput.addEventListener('input', function () { booking.name = nameInput.value.trim(); errorEl.textContent = ''; });

  function prettyDate() {
    var p = booking.date.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
  function buildMessage() {
    var b = findBranch(booking.branch), t = totals();
    var names = booking.services.map(function (id) { return findService(id).name; }).join(', ');
    return 'Hello Clipper ' + b.name + '! I would like to book an appointment.\n\n' +
      'Name: ' + booking.name + '\n' +
      'Branch: ' + b.name + '\n' +
      'Services: ' + names + '\n' +
      'Date: ' + prettyDate() + '\n' +
      'Time: ' + booking.time + '\n' +
      'Estimated total: ' + rupees(t.total) + ' (' + rupees(t.after) + ' after 10% online discount)\n' +
      'Discount code: ' + SITE.code + '\n\nPlease confirm. Thank you!';
  }
  function drawSummary() {
    var b = findBranch(booking.branch), t = totals();
    document.getElementById('summary').innerHTML =
      '<div class="line"><span>Name</span><span>' + escapeHTML(booking.name) + '</span></div>' +
      '<div class="line"><span>Branch</span><span>' + b.name + '</span></div>' +
      '<div class="line"><span>Services</span><span>' + booking.services.map(function (id) { return findService(id).name; }).join(', ') + '</span></div>' +
      '<div class="line"><span>When</span><span>' + prettyDate() + ', ' + booking.time + '</span></div>' +
      '<div class="line"><span>Total</span><span>' + rupees(t.total) + '</span></div>' +
      '<div class="line"><span>Code <span class="code-chip">' + SITE.code + '</span></span><span class="gold"><strong>' + rupees(t.after) + '</strong></span></div>';
  }
  function escapeHTML(s) {
    return s.replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }

  /* ----- Moving between steps ----- */
  function validate() {
    if (current === 0 && !booking.branch) return 'Please choose a branch.';
    if (current === 1 && !booking.services.length) return 'Please choose at least one service.';
    if (current === 2) {
      if (!booking.date) return 'Please pick a date.';
      if (!booking.time) return 'Please pick a time.';
    }
    if (current === 3) {
      booking.name = nameInput.value.trim();
      if (booking.name.length < 2) return 'Please type your name.';
    }
    return '';
  }

  function show(n) {
    current = n;
    steps.forEach(function (s, i) { s.classList.toggle('active', i === n); });
    dots.forEach(function (d, i) {
      d.classList.toggle('current', i === n);
      d.classList.toggle('done', i < n);
    });
    document.getElementById('progressFill').style.width = (n / (dots.length - 1) * 86) + '%';
    backBtn.style.visibility = n === 0 ? 'hidden' : 'visible';
    nextBtn.innerHTML = n === 3 ? icon('whatsapp') + ' Book on WhatsApp' : 'Next ' + icon('arrow');
    nextBtn.classList.toggle('green', n === 3);
    document.getElementById('summaryBox').hidden = n !== 3;
    if (n === 3) drawSummary();
    errorEl.textContent = '';
    if (started) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  var started = false;

  nextBtn.addEventListener('click', function () {
    var err = validate();
    if (err) { errorEl.textContent = err; return; }
    if (current < 3) { show(current + 1); return; }
    // Last step: open WhatsApp with the ready-made message
    drawSummary();
    var link = waLink(buildMessage());
    document.getElementById('waFallback').href = link;
    document.getElementById('doneNote').hidden = false;
    window.open(link, '_blank', 'noopener');
  });
  backBtn.addEventListener('click', function () { if (current > 0) show(current - 1); });
  nameInput.addEventListener('input', function () { if (current === 3) drawSummary(); });

  /* ----- Pre-fill from the address, e.g. book.html?branch=dha&services=h-fade,b-trim ----- */
  var params = new URLSearchParams(location.search);
  var pb = params.get('branch');
  if (pb && findBranch(pb)) {
    booking.branch = pb;
    branchBox.querySelector('[data-id="' + pb + '"]').classList.add('selected');
  }
  (params.get('services') || '').split(',').forEach(function (id) {
    var box = svcBox.querySelector('input[value="' + id + '"]');
    if (box && findService(id)) { box.checked = true; box.closest('.service-row').classList.add('checked'); booking.services.push(id); }
  });
  updateMini();
  show(booking.branch ? (booking.services.length ? 2 : 1) : 0);
  started = true;
})();
