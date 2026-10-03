(function() {
  'use strict';

  const CONFIG = window.CONFIG;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ========== Toast System ==========
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

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

    const langCurrent = document.querySelector('.lang-current');
    if (langCurrent) langCurrent.textContent = lang.toUpperCase();
  }

  function getNestedValue(obj, path) {
    return path ? path.split('.').reduce((o, k) => o?.[k], obj) : undefined;
  }

  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'id' ? 'en' : 'id');
      showToast(currentLang === 'id' ? 'Bahasa: Indonesia' : 'Language: English');
    });
  }

  // ========== Hydrate from CONFIG ==========
  function applyConfig() {
    if (!CONFIG) return;
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
  }

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

  // ========== Background Music & Vinyl Pill ==========
  const musicAudio = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');

  function toggleMusic() {
    if (!musicAudio) return;
    if (musicAudio.paused) {
      musicAudio.play().then(() => {
        if (musicToggle) {
          musicToggle.classList.add('playing');
          musicToggle.setAttribute('aria-pressed', 'true');
        }
        showToast('🎵 Musik diputar');
      }).catch(() => {
        showToast('Klik layar untuk memutar musik');
      });
    } else {
      musicAudio.pause();
      if (musicToggle) {
        musicToggle.classList.remove('playing');
        musicToggle.setAttribute('aria-pressed', 'false');
      }
      showToast('🔇 Musik dijeda');
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', toggleMusic);
  }

  // ========== Cover Open ==========
  const openBtn = document.getElementById('open-invitation');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      document.body.classList.add('invitation-opened');
      
      const coupleSection = document.getElementById('couple');
      if (coupleSection) {
        coupleSection.scrollIntoView({ behavior: 'smooth' });
      }

      if (musicAudio && musicAudio.paused) {
        musicAudio.play().then(() => {
          if (musicToggle) {
            musicToggle.classList.add('playing');
            musicToggle.setAttribute('aria-pressed', 'true');
          }
        }).catch(() => {});
      }
    });
  }

  // ========== Bottom Dock Active Scroll Spy ==========
  const sections = document.querySelectorAll('section[id]');
  const dockItems = document.querySelectorAll('.dock-item');

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        dockItems.forEach(item => {
          if (item.dataset.target === id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => scrollSpyObserver.observe(s));

  // ========== Countdown Timer ==========
  const akadDate = (CONFIG && CONFIG.events && CONFIG.events.akad) ? CONFIG.events.akad.date : '2026-12-12';
  const akadTime = (CONFIG && CONFIG.events && CONFIG.events.akad) ? CONFIG.events.akad.timeStart : '08:00';
  const targetDate = new Date(`${akadDate}T${akadTime}:00`).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (!daysEl) return;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ========== Add to Calendar (.ics) ==========
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
      const event = btn.dataset.event;
      if (!event || !CONFIG.events[event]) return;
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
      showToast('📅 Jadwal kalender diunduh!');
    });
  });

  // ========== Gallery Lightbox ==========
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    }
  }

  if (lightbox) {
    const closeBtn = lightbox.querySelector('.lightbox-close');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }

  // ========== Digital Gift Copy ==========
  document.querySelectorAll('.copy-btn-action').forEach(btn => {
    btn.addEventListener('click', async () => {
      const acc = btn.dataset.copy;
      if (!acc) return;
      try {
        await navigator.clipboard.writeText(acc);
        showToast(`✅ No. Rekening ${acc} berhasil disalin!`);
      } catch (e) {
        const t = document.createElement('textarea');
        t.value = acc;
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
        showToast(`✅ No. Rekening ${acc} berhasil disalin!`);
      }
    });
  });

  // ========== RSVP & Wishes Live Feed ==========
  const rsvpForm = document.getElementById('rsvp-form');
  const defaultWishes = [
    { name: "Rian & Nabila", attendance: "attend", message: "Selamat menempuh hidup baru Fakari & Aghita! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin!", time: "2 jam yang lalu" },
    { name: "Dimas Pratama", attendance: "attend", message: "Barakallah Fakari! Lancar sampai hari H bro! Can't wait to be there! 🎉", time: "5 jam yang lalu" },
    { name: "Sarah & Keluarga", attendance: "attend", message: "Happy wedding Aghita & Fakari! Bahagia selalu sampai kakek nenek ✨", time: "1 hari yang lalu" }
  ];

  function renderGuestbook(messages) {
    const list = document.getElementById('guestbook-list');
    if (!list) return;

    const data = (messages && messages.length > 0) ? messages : defaultWishes;

    list.innerHTML = data.map(msg => {
      const safeName = escapeHtml(msg.name || 'Tamu');
      const safeMsg = escapeHtml(msg.message || '');
      const isAttend = msg.attendance === 'attend';
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(safeName)}&background=967646&color=fff&size=68&bold=true`;

      return `
        <div class="guestbook-item">
          <div class="guestbook-user-row">
            <img src="${avatarUrl}" class="guestbook-avatar" alt="${safeName}" loading="lazy">
            <span class="guestbook-name-title">${safeName}</span>
            <span class="guestbook-badge-status ${isAttend ? '' : 'not-attend'}">
              ${isAttend ? '🎉 Hadir' : '🙏 Berhalangan'}
            </span>
          </div>
          <p class="guestbook-text">${safeMsg}</p>
        </div>
      `;
    }).join('');
  }

  async function loadGuestbook() {
    try {
      const scriptUrl = CONFIG?.googleAppsScript?.guestbookUrl;
      if (scriptUrl && !scriptUrl.includes('YOUR_SCRIPT_ID')) {
        const response = await fetch(scriptUrl);
        const messages = await response.json();
        renderGuestbook(messages);
      } else {
        renderGuestbook(defaultWishes);
      }
    } catch (e) {
      renderGuestbook(defaultWishes);
    }
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(rsvpForm);
      const name = formData.get('name');
      const attendance = formData.get('attendance');
      const message = formData.get('message');

      if (!name || !message) {
        showToast('⚠️ Mohon isi nama dan pesan doa');
        return;
      }

      const newEntry = { name, attendance, message, time: 'Baru saja' };
      defaultWishes.unshift(newEntry);
      renderGuestbook(defaultWishes);

      showToast('💌 Terima kasih atas doa restunya!');
      rsvpForm.reset();

      // Submit to Google Apps Script if URL provided
      const rsvpUrl = CONFIG?.googleAppsScript?.rsvpUrl;
      if (rsvpUrl && !rsvpUrl.includes('YOUR_SCRIPT_ID')) {
        try {
          fetch(rsvpUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, attendance, message, timestamp: new Date().toISOString() })
          });
        } catch (err) {}
      }
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  loadGuestbook();

})();
