/* ==========================================================
   CLIPPER – services.js
   Tabs + price calculator (Services & Prices page)
   and the "popular services" cards on the Home page.
   ========================================================== */

(function () {
  /* ----- Popular services on Home page ----- */
  var popular = document.getElementById('popular');
  if (popular) {
    popular.innerHTML = ['h-fade', 'b-shape', 's-gold', 'p-gent'].map(function (id, i) {
      var s = findService(id);
      var ic = { hair: 'scissors', beard: 'beard', skin: 'sparkle', packages: 'gift' }[s.cat];
      return '<article class="card reveal d' + (i % 4) + '"><div class="big-icon">' + icon(ic) + '</div>' +
        '<h3>' + s.name + '</h3><p class="muted">' + s.desc + '</p>' +
        '<p class="price-tag">' + rupees(s.price) + '</p>' +
        '<a class="btn ghost small" href="book.html?services=' + s.id + '">Book this</a></article>';
    }).join('');
  }

  /* ----- Tabs + calculator ----- */
  var tabsEl = document.getElementById('tabs');
  if (!tabsEl) return;

  var listEl = document.getElementById('serviceList');
  var calcItems = document.getElementById('calcItems');
  var selected = [];            // ids of ticked services, in the order ticked
  var currentCat = 'hair';

  // Build the four tab buttons
  tabsEl.innerHTML = CATEGORIES.map(function (c) {
    return '<button class="tab" role="tab" data-cat="' + c.id + '" aria-selected="false">' + c.label + '</button>';
  }).join('');

  function showTab(cat) {
    currentCat = cat;
    tabsEl.querySelectorAll('.tab').forEach(function (t) {
      t.setAttribute('aria-selected', t.getAttribute('data-cat') === cat);
    });
    listEl.innerHTML = SERVICES.filter(function (s) { return s.cat === cat; }).map(function (s) {
      var on = selected.indexOf(s.id) > -1;
      return '<label class="service-row' + (on ? ' checked' : '') + '">' +
        '<input type="checkbox" value="' + s.id + '"' + (on ? ' checked' : '') + '>' +
        '<span class="info"><strong>' + s.name + (s.tag ? ' <span class="gold">· ' + s.tag + '</span>' : '') + '</strong><small>' + s.desc + '</small></span>' +
        '<span class="price">' + rupees(s.price) + '</span></label>';
    }).join('');
  }

  // Click on a tab
  tabsEl.addEventListener('click', function (e) {
    var b = e.target.closest('.tab');
    if (b) showTab(b.getAttribute('data-cat'));
  });

  // Tick / untick a service
  listEl.addEventListener('change', function (e) {
    var id = e.target.value;
    var i = selected.indexOf(id);
    if (e.target.checked && i < 0) selected.push(id);
    if (!e.target.checked && i > -1) selected.splice(i, 1);
    e.target.closest('.service-row').classList.toggle('checked', e.target.checked);
    updateCalc();
  });

  // Recalculate the total every time something changes
  function updateCalc() {
    var total = 0;
    calcItems.innerHTML = selected.length ? selected.map(function (id) {
      var s = findService(id);
      total += s.price;
      return '<li><span>' + s.name + '</span><span>' + rupees(s.price) + '</span></li>';
    }).join('') : '<li class="empty">Tick services to see your total.</li>';

    var after = total * (1 - SITE.discount);
    document.getElementById('calcTotal').textContent = rupees(total);
    document.getElementById('calcAfter').textContent = rupees(after);
    document.getElementById('calcSave').textContent = total ? 'You save ' + rupees(total - after) + ' when you book online!' : 'Book online and save 10%.';
    var book = document.getElementById('calcBook');
    book.href = selected.length ? 'book.html?services=' + selected.join(',') : 'book.html';
    book.textContent = selected.length ? 'Book these services' : 'Book Online';
  }

  document.getElementById('calcClear').addEventListener('click', function () {
    selected = [];
    showTab(currentCat);
    updateCalc();
  });

  // Allow ?tab=skin in the address
  var wanted = new URLSearchParams(location.search).get('tab');
  showTab(CATEGORIES.some(function (c) { return c.id === wanted; }) ? wanted : 'hair');
  updateCalc();
})();
