/* ==========================================================
   CLIPPER – branches.js
   Branch finder (Branches page) and branch cards (Home page).
   ========================================================== */

(function () {
  /* ----- Home page: four small branch cards ----- */
  var teaser = document.getElementById('branchTeaser');
  if (teaser) {
    teaser.innerHTML = BRANCHES.map(function (b, i) {
      return '<a class="card reveal d' + (i % 4) + '" href="branches.html?b=' + b.id + '" style="text-decoration:none;color:inherit">' +
        '<div class="big-icon">' + icon('pin') + '</div><h3>' + b.name + '</h3>' +
        '<p class="muted">' + b.address + '</p><span class="gold">View branch ' + icon('arrow') + '</span></a>';
    }).join('');
  }

  /* ----- Branches page: the finder ----- */
  var buttons = document.getElementById('areaButtons');
  if (!buttons) return;
  var card = document.getElementById('branchCard');
  var mapBox = document.getElementById('mapBox');

  buttons.innerHTML = BRANCHES.map(function (b) {
    return '<button type="button" class="tab" data-id="' + b.id + '" aria-pressed="false">' + b.name + '</button>';
  }).join('');

  function show(id) {
    var b = findBranch(id);
    buttons.querySelectorAll('.tab').forEach(function (t) {
      var on = t.getAttribute('data-id') === id;
      t.setAttribute('aria-selected', on);
      t.setAttribute('aria-pressed', on);
    });
    card.innerHTML =
      '<h3>Clipper ' + b.name + '</h3><ul>' +
      '<li>' + icon('pin') + '<span>' + b.address + '</span></li>' +
      '<li>' + icon('clock') + '<span>' + b.hours + '</span></li>' +
      '<li>' + icon('phone') + '<span>' + b.phone + '</span></li></ul>' +
      '<div class="btn-row"><a class="btn" href="tel:' + b.phoneLink + '">' + icon('phone') + ' Call now</a>' +
      '<a class="btn ghost" href="book.html?branch=' + b.id + '">' + icon('calendar') + ' Book here</a></div>';
    // Google Maps "search" embed: just changes the text after q=
    mapBox.innerHTML = '<iframe title="Map of Clipper ' + b.name + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ' +
      'src="https://maps.google.com/maps?q=' + encodeURIComponent(b.map) + '&z=14&output=embed"></iframe>';
  }

  buttons.addEventListener('click', function (e) {
    var t = e.target.closest('.tab');
    if (t) show(t.getAttribute('data-id'));
  });

  var wanted = new URLSearchParams(location.search).get('b');
  show(findBranch(wanted) ? wanted : BRANCHES[0].id);
})();
