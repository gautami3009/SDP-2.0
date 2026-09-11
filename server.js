import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const BASE_DIR = path.join(__dirname, 'stitch_temple_smart_darshan_portal', 'stitch_temple_smart_darshan_portal');

// Canonical mapping of paths to page directories
const ROUTE_PAGES = {
  '/': 'dham_bimlal_home',
  '/home': 'dham_bimlal_home',
  '/mandir-information': 'dham_bimlal_mandir_information_portal_comprehensive_guide',
  '/services': 'dham_bimlal_seva_darshan_pilgrim_services',
  '/the-ten-sevas': 'dham_bimlal_the_ten_sacred_sevas_nishkama_bhakti_1',
  '/the-ten-sevas-2': 'dham_bimlal_the_ten_sacred_sevas_nishkama_bhakti_2',
  '/plan-your-darshan': 'dham_bimlal_plan_your_darshan',
  '/darshan-suvidha': 'dham_bimlal_darshan_suvidha_sanctum_access',
  '/news-and-events': 'dham_bimlal_news_events_festival_living_calendar',
  '/announcements': 'dham_bimlal_news_events_peeth_announcements',
  '/gallery': 'dham_bimlal_sacred_gallery_historical_archive',
  '/about': 'dham_bimlal_about_the_sacred_peeth_sanctuary',
  '/swamiji-chronicle': 'mandir_parichay_swamiji_s_sacred_chronicle',
  '/donation': 'dham_bimlal_trust_transparency_donation_global_governance',
  '/seva-contribution': 'dham_bimlal_seva_contribution_trust_transparency',
  '/contact': 'dham_bimlal_visit_the_dham_contact_location',
  '/visit': 'dham_bimlal_visit_the_dham_contact_location',
  '/travel-guide': 'dham_bimlal_visit_the_dham_contact_location',
  '/elder-mode': 'dham_bimlal_accessible_pilgrimage_elder_mode',
  '/mobile': 'dham_bimlal_mobile_sacred_threshold_official',
  '/multilingual': 'dham_bimlal_multilingual_architecture_sacred_threshold',
  '/pilgrim-ux': 'dham_bimlal_pilgrim_ux_masterwork_10_journeys_audited',
  '/sacred-threshold': 'dham_bimlal_sacred_threshold_masterwork'
};

// Static files (screenshots, assets, audio, js)
app.use('/static', express.static(BASE_DIR));
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/audio', express.static(path.join(__dirname, 'public', 'audio')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/temple_trust_logo.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, 'temple_trust_logo.jpg'));
});
app.get('/logo.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, 'temple_trust_logo.jpg'));
});

// Helper script injected into every page to provide client-side routing,
// audio ambience, language feedback, elder mode toggle, and booking modals
const CLIENT_ENHANCEMENT_SCRIPT = `
<!-- AI Studio Pilgrim Client Runtime & Interactivity Enhancements -->
<!-- Devotional Fonts: Devanagari & Latin -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Mukta:wght@300;400;500;600;700&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

<!-- Bimlal Devotional Design System -->
<link rel="stylesheet" href="/css/bimlal-design-system.css">

<!-- Centralized Official Bimlal Sacred Audio System -->
<script src="/js/bimlal-audio-config.js"></script>
<script src="/js/bimlal-audio.js"></script>

<!-- Centralized Multilingual (मराठी • हिन्दी • English) System -->
<script src="/js/bimlal-i18n.js"></script>

<!-- Streamlined Darshan Booking & Digital Pass System -->
<script src="/js/bimlal-booking.js"></script>
<style>
  /* Elder Mode Global High-Contrast Large Text Support */
  body.elder-mode-active {
    font-size: 18px !important;
    line-height: 1.8 !important;
  }
  body.elder-mode-active h1, body.elder-mode-active .font-headline-2xl {
    font-size: 3.25rem !important;
    line-height: 1.25 !important;
  }
  body.elder-mode-active p, body.elder-mode-active .font-body-md, body.elder-mode-active .font-body-sm {
    font-size: 1.15rem !important;
    line-height: 1.75 !important;
  }
  body.elder-mode-active a, body.elder-mode-active button {
    font-size: 1.05rem !important;
    padding-top: 0.75rem !important;
    padding-bottom: 0.75rem !important;
  }

  /* Devotee Toast */
  #devotee-toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 99999;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    transform: translateY(150%);
    opacity: 0;
  }
  #devotee-toast.show {
    transform: translateY(0);
    opacity: 1;
  }
</style>

<div id="devotee-toast" class="bg-primary text-on-primary px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-sacred-copper/40 max-w-md">
  <span class="material-symbols-outlined text-[24px] text-sacred-copper shrink-0" id="toast-icon">temple_hindu</span>
  <span class="text-sm font-medium leading-snug" id="toast-text">Om Namah Shivaya</span>
</div>

<script>
(function() {
  // 1. Navigation Path Map
  const pathMap = {
    'home': '/',
    'mandir-information': '/mandir-information',
    'services': '/services',
    'the-ten-sevas': '/the-ten-sevas',
    'plan-your-darshan': '/plan-your-darshan',
    'darshan-types': '/plan-your-darshan',
    'darshan-suvidha': '/darshan-suvidha',
    'news-and-events': '/news-and-events',
    'gallery': '/gallery',
    'about': '/about',
    'donation': '/donation',
    'contact': '/contact',
    'travel-guide': '/contact',
    'elder-mode': '/elder-mode'
  };

  function updateNavHighlights(currentPath) {
    const activeClasses = ['bg-primary-container', 'text-on-primary', 'font-bold'];
    const inactiveClasses = ['text-on-surface-variant'];

    document.querySelectorAll('header nav [data-path]').forEach(link => {
      const target = link.getAttribute('data-path');
      const targetUrl = pathMap[target];
      const isCurrent = (targetUrl === currentPath) || (target === 'home' && currentPath === '/');

      if (isCurrent) {
        link.setAttribute('aria-current', 'page');
        activeClasses.forEach(c => link.classList.add(c));
        inactiveClasses.forEach(c => link.classList.remove(c));
      } else {
        link.removeAttribute('aria-current');
        activeClasses.forEach(c => link.classList.remove(c));
        inactiveClasses.forEach(c => link.classList.add(c));
      }
    });
  }

  async function seamlessNavigate(url, push = true) {
    if (!url || url === '#' || url.startsWith('javascript:')) return;
    const cleanUrl = url.split('#')[0];
    const currentClean = window.location.pathname.replace(/\\/$/, '') || '/';
    const targetClean = cleanUrl.replace(/\\/$/, '') || '/';

    if (url.includes('#') && (cleanUrl === '' || targetClean === currentClean)) {
      const hash = url.substring(url.indexOf('#'));
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        window.location.href = url;
        return;
      }
      const html = await resp.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const curMain = document.querySelector('main');
      const newMain = doc.querySelector('main');
      if (curMain && newMain) {
        curMain.innerHTML = newMain.innerHTML;
        curMain.className = newMain.className;
        if (doc.title) document.title = doc.title;
        if (push) {
          window.history.pushState({ path: url }, '', url);
        }
        window.scrollTo(0, 0);

        const newPath = window.location.pathname.replace(/\\/$/, '') || '/';
        updateNavHighlights(newPath);
        bindPageInteractions();
        if (window.BimlalI18n) {
          window.BimlalI18n.setLanguage(window.BimlalI18n.currentLang, false);
          window.BimlalI18n.bindButtons();
        }
        if (window.BimlalBooking) {
          window.BimlalBooking.init();
        }
        if (window.BimlalAudio) {
          window.BimlalAudio.syncExistingPageButtons();
          window.BimlalAudio.updateUI();
        }
      } else {
        window.location.href = url;
      }
    } catch (e) {
      window.location.href = url;
    }
  }

  window.addEventListener('popstate', () => {
    seamlessNavigate(window.location.pathname, false);
  });

  function bindPageInteractions() {
    const curPath = window.location.pathname.replace(/\\/$/, '') || '/';

    // Rewire data-path anchors and buttons
    document.querySelectorAll('[data-path]').forEach(el => {
      const target = el.getAttribute('data-path');
      const url = pathMap[target];
      if (url) {
        if (el.tagName === 'A') {
          el.setAttribute('href', url);
        }
        el.onclick = function(e) {
          e.preventDefault();
          seamlessNavigate(url);
        };
      }
    });

    // Wire Book Darshan buttons across pages
    document.querySelectorAll('a, button').forEach(btn => {
      const href = btn.getAttribute('href');
      const txt = btn.textContent || '';
      if (href === '#darshan-types' || txt.includes('Book Smart Darshan') || txt.includes('Plan Your Darshan')) {
        if (curPath !== '/plan-your-darshan') {
          btn.onclick = function(e) {
            e.preventDefault();
            seamlessNavigate('/plan-your-darshan');
          };
        }
      }
    });

    // Wire Travel guide links
    document.querySelectorAll('a[href="#travel-guide"]').forEach(btn => {
      if (curPath !== '/contact') {
        btn.onclick = function(e) {
          e.preventDefault();
          seamlessNavigate('/contact');
        };
      }
    });

    // Wire internal links for continuous audio experience
    document.querySelectorAll('a[href^="/"]').forEach(a => {
      const href = a.getAttribute('href');
      if (href && !href.startsWith('/audio') && !href.startsWith('/public') && !href.startsWith('/static') && !href.startsWith('/assets') && !href.endsWith('.jpg') && !href.endsWith('.pdf')) {
        a.onclick = function(e) {
          e.preventDefault();
          seamlessNavigate(href);
        };
      }
    });
  }

  const currentPath = window.location.pathname.replace(/\\/$/, '') || '/';
  updateNavHighlights(currentPath);
  bindPageInteractions();

  // 3. Devotee Toast Helper
  window.showDevoteeNotice = function(message, icon = 'temple_hindu') {
    const toast = document.getElementById('devotee-toast');
    const toastText = document.getElementById('toast-text');
    const toastIcon = document.getElementById('toast-icon');
    if (!toast || !toastText) return;
    toastText.textContent = message;
    if (toastIcon) toastIcon.textContent = icon;
    toast.classList.add('show');
    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => toast.classList.remove('show'), 3800);
  };

  // 4. Elder Mode Toggle
  const isElderPage = currentPath === '/elder-mode';
  if (localStorage.getItem('bimlal_elder_mode') === 'true' || isElderPage) {
    document.body.classList.add('elder-mode-active');
  }

  document.querySelectorAll('button, a').forEach(btn => {
    const txt = btn.textContent || '';
    const hasElderIcon = btn.querySelector('.material-symbols-outlined')?.textContent.trim() === 'elderly';
    if (txt.includes('Elder Mode') || hasElderIcon || btn.hasAttribute('data-elder-toggle')) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const isActive = document.body.classList.toggle('elder-mode-active');
        localStorage.setItem('bimlal_elder_mode', isActive);
        if (isActive) {
          showDevoteeNotice('Elder Mode (Bada Akshar) Activated: 125% High-Contrast View Enabled', 'elderly');
        } else {
          showDevoteeNotice('Standard View Mode Restored', 'visibility');
        }
      });
    }
  });

  // 5. Connect Centralized Multilingual Architecture (मराठी • हिन्दी • English)
  const langKeyMap = {
    'EN': 'en',
    'en': 'en',
    'मरा': 'mr',
    'mr': 'mr',
    'हिं': 'hi',
    'hi': 'hi'
  };

  document.querySelectorAll('header button, [data-lang-btn]').forEach(b => {
    const key = b.getAttribute('data-lang-btn') || b.textContent.trim();
    const targetLang = langKeyMap[key];
    if (targetLang) {
      b.onclick = function(e) {
        e.preventDefault();
        if (window.BimlalI18n) {
          window.BimlalI18n.setLanguage(targetLang, true);
        }
      };
    }
  });

  // 6. Connect Centralized Official Bimlal Sacred Audio System
  if (window.BimlalAudio) {
    window.BimlalAudio.syncExistingPageButtons();
    window.BimlalAudio.updateUI();
  }

  // 7. Offline Travel Pass trigger
  document.querySelectorAll('a, button').forEach(el => {
    if ((el.textContent || '').includes('Offline Travel Pass')) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        showDevoteeNotice('Preparing Offline Travel Pass for Ahwa / Bimlal Sanctuary...', 'download_for_offline');
        setTimeout(() => {
          window.print();
        }, 500);
      });
    }
  });

})();
</script>
`;

function servePage(res, pageFolder) {
  let filePath = path.join(BASE_DIR, pageFolder, 'code.html');
  if ((pageFolder === 'dham_bimlal_home' || pageFolder === 'home') && fs.existsSync(path.join(__dirname, 'index.html'))) {
    filePath = path.join(__dirname, 'index.html');
  }
  if (!fs.existsSync(filePath)) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Page Not Found - Shiv Ardhanreshwari Dham</title><meta name="viewport" content="width=device-width, initial-scale=1"></head>
      <body style="font-family:serif; text-align:center; padding: 4rem; background:#FBF9F5; color:#4A1718;">
        <h1>404 - Page Not Found</h1>
        <p>The sacred sanctuary path could not be located.</p>
        <a href="/" style="display:inline-block; margin-top:1rem; padding:0.5rem 1.5rem; background:#792425; color:white; border-radius:8px; text-decoration:none;">Return to Mandir Home</a>
      </body>
      </html>
    `);
  }

  let html = fs.readFileSync(filePath, 'utf-8');

  // Ensure title and metadata are synchronized
  const pageTitle = '<title>Shiv Ardhanreshwari Nag Jyotirling Dham, Bimlal - Official Sanctuary Portal</title>\n<meta name="description" content="Official Web Portal for Shiv Ardhanreshwari Nag Jyotirling Dham, Bimlal Sanctuary in Dang, Gujarat with Smart Darshan, Mandir Information, Seva, and Pilgrim Guidance.">';
  
  if (html.includes('<title>')) {
    html = html.replace(/<title>.*?<\/title>/i, pageTitle);
  } else {
    html = html.replace('<head>', '<head>\n' + pageTitle);
  }

  // Inject client enhancement script before closing body tag
  if (html.includes('</body>')) {
    html = html.replace('</body>', `${CLIENT_ENHANCEMENT_SCRIPT}\n</body>`);
  } else {
    html += CLIENT_ENHANCEMENT_SCRIPT;
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
}

// Register explicit canonical routes
Object.entries(ROUTE_PAGES).forEach(([routePath, pageFolder]) => {
  app.get(routePath, (req, res) => servePage(res, pageFolder));
});

// Dynamic route lookup for any additional folder name directly
app.get('/:pageName', (req, res) => {
  const pageName = req.params.pageName;
  const directPath = path.join(BASE_DIR, pageName, 'code.html');
  if (fs.existsSync(directPath)) {
    return servePage(res, pageName);
  }
  // If not matched, redirect to home
  res.redirect('/');
});

app.listen(PORT, HOST, () => {
  console.log(`[Dham Bimlal] Sacred Darshan Portal server running at http://${HOST}:${PORT}`);
});
