
// MOBILE NAV
function toggleMobileNav() {
  var links = document.getElementById('navLinks');
  var toggle = document.getElementById('navToggle');
  links.classList.toggle('open');
  toggle.classList.toggle('open');
}
// Close mobile nav when a link is clicked
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      document.getElementById('navLinks').classList.remove('open');
      document.getElementById('navToggle').classList.remove('open');
    });
  });
});

// MODAL
function openModal() {
  document.getElementById('hireModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('hireModal').classList.remove('open');
  document.body.style.overflow = '';
}

// PROJECTS MODAL
function openProjectsModal() {
  document.getElementById('projectsModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeProjectsModal() {
  document.getElementById('projectsModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function() {
  // Close modals on backdrop click
  document.getElementById('hireModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  document.getElementById('projectsModal').addEventListener('click', function(e) {
    if (e.target === this) closeProjectsModal();
  });
  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      document.getElementById('navLinks').classList.remove('open');
      document.getElementById('navToggle').classList.remove('open');
    });
  });
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeModal(); closeProjectsModal(); }
});

// PARTICLES
(function() {
  var c = document.getElementById('particles');
  if (!c) return;
  var ctx = c.getContext('2d');
  var pts = [], w, h;
  function resize() { w = c.width = window.innerWidth; h = c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  function rand(a, b) { return Math.random() * (b - a) + a; }
  for (var i = 0; i < 70; i++) {
    pts.push({ x: rand(0,1), y: rand(0,1), vx: rand(-.00015,.00015), vy: rand(-.00015,.00015), r: rand(.8,2), a: rand(.3,.8) });
  }
  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x = (p.x + p.vx + 1) % 1;
      p.y = (p.y + p.vy + 1) % 1;
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99,130,255,' + p.a + ')';
      ctx.fill();
    }
    for (var i = 0; i < pts.length; i++) {
      for (var j = i + 1; j < pts.length; j++) {
        var dx = (pts[i].x - pts[j].x) * w;
        var dy = (pts[i].y - pts[j].y) * h;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 160) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(99,102,241,' + ((1 - d / 160) * 0.2) + ')';
          ctx.lineWidth = 0.5;
          ctx.moveTo(pts[i].x * w, pts[i].y * h);
          ctx.lineTo(pts[j].x * w, pts[j].y * h);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

// TYPING EFFECT
(function() {
  var roles = ['Software Engineer', 'MERN Stack Developer', 'React Developer', 'C++ Programmer', 'Problem Solver'];
  var el = document.getElementById('typed-role');
  if (!el) return;
  var ri = 0, ci = 0, deleting = false;
  function tick() {
    var cur = roles[ri];
    if (!deleting) {
      el.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { deleting = true; setTimeout(tick, 1800); return; }
    } else {
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(tick, deleting ? 45 : 80);
  }
  setTimeout(tick, 600);
})();

// SCROLL REVEAL
(function() {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately
    els.forEach(function(el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target); // Stop watching once visible
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function(el) { io.observe(el); });
})();

// NAV ACTIVE STATE ON SCROLL
(function() {
  var sections = document.querySelectorAll('section[id], div[id="hero"]');
  var navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;
    sections.forEach(function(sec) {
      var top = sec.offsetTop - 100;
      var bottom = top + sec.offsetHeight;
      var id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(function(a) {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id) a.style.color = 'var(--cyan)';
        });
      }
    });
  });
})();

