/* HueSky – galleriakuvien lightbox.
   Klikkaus avaa kuvan isona. Nuolet, Esc ja pyyhkäisy toimivat.
   Ilman JavaScriptiä linkki avaa ison kuvan sellaisenaan. */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.gallery a.lightbox-link'));
  if (!links.length) return;
  var en = (document.documentElement.lang || '').indexOf('en') === 0;
  var T = en
    ? { close: 'Close', prev: 'Previous image', next: 'Next image', dialog: 'Image viewer' }
    : { close: 'Sulje', prev: 'Edellinen kuva', next: 'Seuraava kuva', dialog: 'Kuvakatselu' };

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', T.dialog);
  box.innerHTML =
    '<div class="lb-count" aria-live="polite"></div>' +
    '<button type="button" class="lb-close" aria-label="' + T.close + '">&times;</button>' +
    '<button type="button" class="lb-prev" aria-label="' + T.prev + '">&lsaquo;</button>' +
    '<figure class="lb-figure"><img class="lb-img" alt=""><figcaption class="lb-caption"></figcaption></figure>' +
    '<button type="button" class="lb-next" aria-label="' + T.next + '">&rsaquo;</button>';
  document.body.appendChild(box);

  var img = box.querySelector('.lb-img');
  var cap = box.querySelector('.lb-caption');
  var count = box.querySelector('.lb-count');
  var closeBtn = box.querySelector('.lb-close');
  var group = [], idx = 0, opener = null, x0 = null;

  function groupOf(a) {
    var g = a.closest('.gallery');
    return links.filter(function (l) { return l.closest('.gallery') === g; });
  }
  function preload(i) {
    var n = group[(i + group.length) % group.length];
    if (n) { var p = new Image(); p.src = n.href; }
  }
  function show(i) {
    idx = (i + group.length) % group.length;
    var a = group[idx];
    var thumb = a.querySelector('img');
    var fc = a.closest('figure').querySelector('figcaption');
    img.src = a.href;
    img.alt = thumb ? thumb.alt : '';
    cap.textContent = fc ? fc.textContent : '';
    count.textContent = group.length > 1 ? (idx + 1) + ' / ' + group.length : '';
    box.classList.toggle('lb-single', group.length < 2);
    preload(idx + 1); preload(idx - 1);
  }
  function open(a) {
    opener = a;
    group = groupOf(a);
    box.hidden = false;
    document.documentElement.classList.add('lb-open');
    show(group.indexOf(a));
    closeBtn.focus();
  }
  function close() {
    box.hidden = true;
    document.documentElement.classList.remove('lb-open');
    img.removeAttribute('src');
    if (opener) opener.focus();
  }

  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
      e.preventDefault();
      open(a);
    });
  });
  closeBtn.addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
  box.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
  box.addEventListener('click', function (e) {
    if (e.target === box || e.target.classList.contains('lb-figure')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowRight') { show(idx + 1); }
    else if (e.key === 'ArrowLeft') { show(idx - 1); }
    else if (e.key === 'Tab') {
      var f = Array.prototype.slice.call(box.querySelectorAll('button')).filter(function (b) {
        return b.offsetParent !== null;
      });
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50 && group.length > 1) show(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();
