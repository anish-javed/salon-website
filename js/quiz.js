/* ==========================================================
   CLIPPER – quiz.js
   "Find your style": 3 questions, points per haircut,
   the haircut with the most points wins.
   ========================================================== */

(function () {
  var box = document.getElementById('quiz');
  if (!box) return;

  var step = 0;
  var scores = {};          // e.g. { classic: 5, fade: 3 }

  function addPoints(pts) {
    Object.keys(pts).forEach(function (k) { scores[k] = (scores[k] || 0) + pts[k]; });
  }

  function showQuestion() {
    var q = QUIZ[step];
    box.innerHTML =
      '<div class="quiz-top"><span>Question ' + (step + 1) + ' of ' + QUIZ.length + '</span><span>Find your style</span></div>' +
      '<div class="quiz-bar"><div style="width:' + (step / QUIZ.length * 100) + '%"></div></div>' +
      '<h3>' + q.q + '</h3><div class="quiz-options">' +
      q.options.map(function (o, i) { return '<button type="button" class="choice" data-i="' + i + '">' + o.t + '</button>'; }).join('') +
      '</div>';
    // animate the bar to the next position
    requestAnimationFrame(function () {
      box.querySelector('.quiz-bar div').style.width = ((step + 1) / QUIZ.length * 100) + '%';
    });
  }

  function showResult() {
    // find the style with the highest score (the first one wins a tie)
    var best = Object.keys(STYLES).reduce(function (a, b) { return (scores[b] || 0) > (scores[a] || 0) ? b : a; });
    var st = STYLES[best], svc = findService(st.service);
    box.innerHTML =
      '<div class="quiz-result"><span class="eyebrow">Your perfect match</span>' + haircutSVG(best) +
      '<h3>' + st.name + '</h3><p class="muted">' + st.text + '</p>' +
      '<p class="price-tag">' + svc.name + ' – ' + rupees(svc.price) + '</p>' +
      '<div class="btn-row" style="justify-content:center">' +
      '<a class="btn" href="book.html?services=' + svc.id + '">' + icon('calendar') + ' Book this</a>' +
      '<button type="button" class="btn ghost" id="quizRetake">Retake quiz</button></div></div>';
  }

  box.addEventListener('click', function (e) {
    var opt = e.target.closest('.choice');
    if (opt) {
      addPoints(QUIZ[step].options[+opt.getAttribute('data-i')].pts);
      step++;
      if (step < QUIZ.length) showQuestion(); else showResult();
    }
    if (e.target.closest('#quizRetake')) { step = 0; scores = {}; showQuestion(); }
  });

  showQuestion();
})();
