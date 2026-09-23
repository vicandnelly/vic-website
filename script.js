// ============================================
// Victoria George — one-page video portfolio
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Footer year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Nav scroll state ---
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // --- Reveal on scroll ---
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 6) * 60}ms`;
    revealObserver.observe(el);
  });

  // --- Video carousel ---
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsWrap = document.getElementById('carouselDots');

  if (carousel) {
    const reels = Array.from(carousel.querySelectorAll('.reel'));

    // build dot indicators
    reels.forEach((reel, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to video ${i + 1}`);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => {
        reel.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    const setActiveDot = () => {
      const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      reels.forEach((reel, i) => {
        const dist = Math.abs((reel.offsetLeft + reel.clientWidth / 2) - carouselCenter);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      dots.forEach((d, i) => d.classList.toggle('is-active', i === closest));
    };
    carousel.addEventListener('scroll', () => {
      window.requestAnimationFrame(setActiveDot);
    }, { passive: true });

    // arrow navigation — scroll by one card width
    const scrollByCard = (dir) => {
      const cardWidth = reels[0] ? reels[0].getBoundingClientRect().width + 24 : 400;
      carousel.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
    };
    prevBtn.addEventListener('click', () => scrollByCard(-1));
    nextBtn.addEventListener('click', () => scrollByCard(1));

    // click-to-play, pause other videos when one plays
    const videos = Array.from(carousel.querySelectorAll('.reel__video'));
    videos.forEach(video => {
      const wrap = video.closest('.reel__video-wrap');
      const playBtn = wrap.querySelector('.reel__play');

      const play = () => {
        videos.forEach(v => { if (v !== video) v.pause(); });
        video.play();
      };

      playBtn.addEventListener('click', play);
      video.addEventListener('click', () => {
        if (video.paused) play(); else video.pause();
      });
      video.addEventListener('play', () => wrap.classList.add('is-playing'));
      video.addEventListener('pause', () => wrap.classList.remove('is-playing'));
      video.addEventListener('ended', () => wrap.classList.remove('is-playing'));
    });
  }

  // --- Contact form ---
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;
      note.textContent = '';
      note.style.color = '';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          note.textContent = "Thanks! Your message is on its way — I'll get back to you within 48 hours.";
          form.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          note.textContent = data.errors?.map(err => err.message).join(', ') || 'Something went wrong. Please try again or email me directly.';
          note.style.color = '#e57373';
        }
      } catch (err) {
        note.textContent = 'Network error. Please check your connection and try again.';
        note.style.color = '#e57373';
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // --- Smooth anchor scroll offset for fixed nav ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

});
