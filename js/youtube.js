/* huesky.fi: YouTube-video ladataan vasta, kun kävijä painaa toistoa.
   Ennen sitä sivulla on vain oma kansikuva, eikä YouTubeen tai Googleen lähde pyyntöjä. */
(function () {
  var buttons = document.querySelectorAll('.yt-facade[data-yt]');
  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.className = 'yt-frame';
      frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(btn.getAttribute('data-yt')) + '?autoplay=1&rel=0';
      frame.title = btn.getAttribute('data-title') || 'YouTube-video';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.setAttribute('allowfullscreen', '');
      btn.parentNode.replaceChild(frame, btn);
      frame.focus();
    });
  });
})();
