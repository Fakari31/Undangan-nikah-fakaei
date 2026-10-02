(function() {
  'use strict';

  const CONFIG = window.CONFIG;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ========== I18n ==========
  let currentLang = localStorage.getItem('wedding-lang') || 'id';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('wedding-lang', lang);
    document.documentElement.lang = lang === 'id' ? 'id' : 'en';
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = getNestedValue(CONFIG.text[lang], key);
      if (text) el.textContent = text;
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const text = getNestedValue(CONFIG.text[lang], key);
      if (text) el.placeholder = text;
    });

    document.querySelector('.lang-current').textContent = lang.toUpperCase();
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce((o, k) => o?.[k], obj);
  }

  // ========== Hydrate from CONFIG ==========
  // Static HTML text stays as the no-JS fallback; CONFIG is the single source of truth.
  function applyConfig() {
    document.querySelectorAll('[data-config]').forEach(el => {
      const value = getNestedValue(CONFIG, el.dataset.config);
      if (typeof value === 'string') el.textContent = value;
    });

    document.querySelectorAll('[data-config-parent]').forEach(el => {
      const { father, mother } = getNestedValue(CONFIG, el.dataset.configParent) || {};
      if (father) el.textContent = `${father} & ${mother}`;
    });

    document.querySelectorAll('[data-config-link]').forEach(el => {
      const value = getNestedValue(CONFIG, el.dataset.configLink);
      if (value) el.href = value;
    });

    document.querySelectorAll('[data-config-attr]').forEach(el => {
      const [key, attr] = el.dataset.configAttr.split(':');
      const value = getNestedValue(CONFIG, key);
      if (value) el.setAttribute(attr, value);
    });
  }

  document.getElementById('lang-toggle').addEventListener('click', () => {
    setLanguage(currentLang === 'id' ? 'en' : 'id');
  });

  applyConfig();
  setLanguage(currentLang);

  // ========== Parse Guest Name (?to=...) ==========
  const urlParams = new URLSearchParams(window.location.search);
  const guestNameParam = urlParams.get('to') || urlParams.get('u') || urlParams.get('n') || '';
  const guestName = guestNameParam.trim();

  const guestNameEl = document.getElementById('cover-guest-name');
  if (guestNameEl) {
    if (guestName) {
      guestNameEl.textContent = guestName;
      document.title = `The Wedding of Fakari & Aghita - ${guestName}`;
      
      const rsvpNameInput = document.getElementById('rsvp-name');
      if (rsvpNameInput && !rsvpNameInput.value) {
        rsvpNameInput.value = guestName;
      }
    } else {
      guestNameEl.textContent = 'Tamu Undangan';
    }
  }

  // ========== Cover Open ==========
  const coverSection = document.getElementById('cover');
  const openBtn = document.getElementById('open-invitation');
  const musicAudio = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');

  openBtn.addEventListener('click', () => {
    document.body.classList.add('invitation-opened');
    coverSection.style.minHeight = '50vh';
    
    if (!prefersReducedMotion) {
      coverSection.style.transition = 'min-height 1s ease';
    }

    setTimeout(() => {
      document.getElementById('couple').scrollIntoView({ behavior: 'smooth' });
    }, 600);

    if (musicAudio.paused) {
      musicAudio.play().catch(() => {});
      musicToggle.classList.add('playing');
      musicToggle.setAttribute('aria-pressed', 'true');
    }
  });

  // ========== Layered Parallax ==========
  if (!prefersReducedMotion) {
    const parallaxBg = document.querySelector('.parallax-bg');
    const parallaxContent = document.querySelector('.parallax-content');
    let ticking = false;

    function updateParallax() {
      const scrolled = window.scrollY;
      const coverHeight = coverSection.offsetHeight;
      
      if (scrolled < coverHeight) {
        const progress = scrolled / coverHeight;
        parallaxBg.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
        parallaxContent.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0)`;
        parallaxContent.style.opacity = 1 - (progress * 0.8);
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ========== Scroll Reveal ==========
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.section > .container').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ========== Countdown ==========
  const targetDate = new Date(`${CONFIG.events.akad.date}T${CONFIG.events.akad.timeStart}:00`).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById('countdown-days').textContent = '00';
      document.getElementById('countdown-hours').textContent = '00';
      document.getElementById('countdown-minutes').textContent = '00';
      document.getElementById('countdown-seconds').textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
    document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ========== Add to Calendar ==========
  function generateICS(event) {
    const eventData = CONFIG.events[event];
    const startDate = new Date(`${eventData.date}T${eventData.timeStart}:00`);
    const endDate = new Date(`${eventData.date}T${eventData.timeEnd}:00`);
    
    const formatDate = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${event === 'akad' ? 'Akad Nikah' : 'Resepsi'} Fakari & Aghita
DESCRIPTION:Pernikahan Fakari & Aghita
LOCATION:${eventData.address}
END:VEVENT
END:VCALENDAR`;
  }

  document.querySelectorAll('.add-calendar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const event = e.target.dataset.event;
      const icsContent = generateICS(event);
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fakari-aghita-${event}.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  });

  // ========== Gallery Lightbox ==========
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

  // ========== RSVP Form ==========
  const rsvpForm = document.getElementById('rsvp-form');

  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(rsvpForm);
    const data = {
      name: formData.get('name'),
      attendance: formData.get('attendance'),
      guests: formData.get('guests') || '0',
      message: formData.get('message'),
      timestamp: new Date().toISOString()
    };

    const submitBtn = rsvpForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '...';

    try {
      const response = await fetch(CONFIG.googleAppsScript.rsvpUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      showFormStatus('success', getNestedValue(CONFIG.text[currentLang], 'rsvp.success'));
      rsvpForm.reset();
      loadGuestbook();
    } catch (error) {
      showFormStatus('error', getNestedValue(CONFIG.text[currentLang], 'rsvp.error'));
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  function showFormStatus(type, message) {
    const existing = rsvpForm.querySelector('.form-status');
    if (existing) existing.remove();
    
    const status = document.createElement('div');
    status.className = `form-status ${type}`;
    status.textContent = message;
    rsvpForm.appendChild(status);
    
    setTimeout(() => status.remove(), 5000);
  }

  // ========== Guestbook ==========
  async function loadGuestbook() {
    const list = document.getElementById('guestbook-list');
    list.innerHTML = `<p class="guestbook-loading">${getNestedValue(CONFIG.text[currentLang], 'guestbook.loading')}</p>`;

    try {
      const response = await fetch(CONFIG.googleAppsScript.guestbookUrl);
      const messages = await response.json();
      
      if (!messages || messages.length === 0) {
        list.innerHTML = `<p class="guestbook-empty">${getNestedValue(CONFIG.text[currentLang], 'guestbook.empty')}</p>`;
        return;
      }

      list.innerHTML = messages.map(msg => `
        <div class="guestbook-item">
          <div class="guestbook-header">
            <span class="guestbook-name">${escapeHtml(msg.name)}</span>
            <span class="guestbook-badge ${msg.attendance === 'not-attend' ? 'not-attend' : ''}">
              ${msg.attendance === 'attend' ? 'Hadir' : 'Tidak Hadir'}
            </span>
          </div>
          <p class="guestbook-message">${escapeHtml(msg.message)}</p>
        </div>
      `).join('');
    } catch (error) {
      list.innerHTML = `<p class="guestbook-empty">${getNestedValue(CONFIG.text[currentLang], 'guestbook.empty')}</p>`;
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  loadGuestbook();

  // ========== Digital Envelope ==========
  document.getElementById('copy-bank').addEventListener('click', async () => {
    const accountNumber = CONFIG.bank.accountNumber;
    
    try {
      await navigator.clipboard.writeText(accountNumber);
      const btn = document.getElementById('copy-bank');
      const originalText = btn.textContent;
      btn.textContent = getNestedValue(CONFIG.text[currentLang], 'envelope.copied');
      
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = accountNumber;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  });

  // ========== Background Music ==========
  musicToggle.addEventListener('click', () => {
    if (musicAudio.paused) {
      musicAudio.play().catch(() => {});
      musicToggle.classList.add('playing');
      musicToggle.setAttribute('aria-pressed', 'true');
    } else {
      musicAudio.pause();
      musicToggle.classList.remove('playing');
      musicToggle.setAttribute('aria-pressed', 'false');
    }
  });

  // Try autoplay muted
  if (CONFIG.music.autoplay && !prefersReducedMotion) {
    musicAudio.play().catch(() => {
      // Autoplay blocked, wait for user interaction
    });
  }

  // ========== Smooth Scroll for Anchor Links ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();