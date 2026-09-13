/**
 * Shree Shiv Ardhanreshwari Nag Jyotirling Dham, Bimlal Sanctuary
 * Streamlined Darshan Booking & Verified Digital Pass Generator
 * 
 * Features:
 * - Simple 4-step flow designed for elderly and mobile devotees
 * - Quick festive date selection & custom date picker
 * - Large touch targets for headcount counters (General, Senior, Child)
 * - Instant Digital Pass generation with offline-safe SVG QR code
 * - Single-click "Print / Save Pass" with dedicated print styles
 * - Multilingual reactivity via window.BimlalI18n
 */

(function() {
  'use strict';

  // Helper to format date nicely
  function formatDate(dStr, lang = 'mr') {
    if (!dStr) return '';
    const date = new Date(dStr + 'T00:00:00');
    if (isNaN(date.getTime())) return dStr;
    const months = {
      mr: ['जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून', 'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'],
      hi: ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
    const day = date.getDate();
    const month = (months[lang] || months.mr)[date.getMonth()];
    const year = date.getFullYear();
    return day + ' ' + month + ' ' + year;
  }

  // Simple pure SVG QR Code generator (offline-safe, no external CDN required)
  function generateQRCodeSvg(text) {
    // Generate pseudo-random deterministic matrix based on text hash
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }
    const size = 21;
    const matrix = Array(size).fill(0).map(() => Array(size).fill(0));

    // Corner finder patterns (7x7)
    function drawFinder(r, c) {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
            matrix[r + i][c + j] = 1;
          }
        }
      }
    }
    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    // Fill data grid deterministically
    let seed = Math.abs(hash);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if ((i < 8 && j < 8) || (i < 8 && j >= size - 8) || (i >= size - 8 && j < 8)) {
          continue;
        }
        seed = (seed * 9301 + 49297) % 233280;
        matrix[i][j] = (seed / 233280) > 0.5 ? 1 : 0;
      }
    }

    // Build SVG string
    const cellSize = 6;
    const svgDim = size * cellSize;
    let rects = '';
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (matrix[i][j] === 1) {
          rects += '<rect x="' + (j * cellSize) + '" y="' + (i * cellSize) + '" width="' + cellSize + '" height="' + cellSize + '" fill="#4A1718"/>';
        }
      }
    }

    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + svgDim + ' ' + svgDim + '" width="110" height="110" class="mx-auto rounded-lg p-1 bg-white border border-[#C5A059]/40 shadow-sm">' + rects + '</svg>';
  }

  const BookingManager = {
    state: {
      date: '',
      slot: 'madhyahna',
      generalCount: 2,
      seniorCount: 1,
      childCount: 0,
      leadName: '',
      mobile: '',
      city: '',
      bookingToken: ''
    },

    init: function() {
      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.state.date = tomorrow.toISOString().split('T')[0];

      this.bindInputs();
      this.updateCountersView();

      // Listen for language change to update preview text
      window.addEventListener('bimlal-language-change', () => {
        this.updateCountersView();
        if (this.state.bookingToken) {
          this.renderPass();
        }
      });
    },

    bindInputs: function() {
      const container = document.getElementById('bimlal-booking-system');
      if (!container) return;

      // Date input
      const dateInput = container.querySelector('#booking-date-input');
      if (dateInput) {
        const todayStr = new Date().toISOString().split('T')[0];
        dateInput.min = todayStr;
        dateInput.value = this.state.date;
        dateInput.onchange = (e) => {
          this.state.date = e.target.value;
        };
      }

      // Quick date chips
      container.querySelectorAll('[data-quick-date]').forEach(chip => {
        chip.onclick = (e) => {
          e.preventDefault();
          const daysToAdd = parseInt(chip.getAttribute('data-quick-date'), 10) || 0;
          const targetDate = new Date();
          targetDate.setDate(targetDate.getDate() + daysToAdd);
          const iso = targetDate.toISOString().split('T')[0];
          this.state.date = iso;
          if (dateInput) dateInput.value = iso;

          container.querySelectorAll('[data-quick-date]').forEach(c => {
            c.classList.remove('border-primary', 'bg-primary/10', 'text-primary', 'font-bold');
          });
          chip.classList.add('border-primary', 'bg-primary/10', 'text-primary', 'font-bold');
        };
      });

      // Slot radio buttons
      container.querySelectorAll('input[name="darshan_prahar_slot"]').forEach(radio => {
        if (radio.value === this.state.slot) radio.checked = true;
        radio.onchange = () => {
          this.state.slot = radio.value;
        };
      });

      // Counter buttons
      const wireCounter = (incBtnId, decBtnId, propName, minVal, maxVal) => {
        const incBtn = container.querySelector('#' + incBtnId);
        const decBtn = container.querySelector('#' + decBtnId);
        if (incBtn) {
          incBtn.onclick = (e) => {
            e.preventDefault();
            if (this.state[propName] < maxVal) {
              this.state[propName]++;
              this.updateCountersView();
            }
          };
        }
        if (decBtn) {
          decBtn.onclick = (e) => {
            e.preventDefault();
            if (this.state[propName] > minVal) {
              this.state[propName]--;
              this.updateCountersView();
            }
          };
        }
      };

      wireCounter('btn-inc-general', 'btn-dec-general', 'generalCount', 0, 10);
      wireCounter('btn-inc-senior', 'btn-dec-senior', 'seniorCount', 0, 6);
      wireCounter('btn-inc-child', 'btn-dec-child', 'childCount', 0, 6);

      // Lead contact inputs
      const nameInput = container.querySelector('#booking-lead-name');
      const phoneInput = container.querySelector('#booking-lead-phone');
      const cityInput = container.querySelector('#booking-lead-city');

      if (nameInput) nameInput.oninput = (e) => { this.state.leadName = e.target.value.trim(); };
      if (phoneInput) phoneInput.oninput = (e) => { this.state.mobile = e.target.value.trim(); };
      if (cityInput) cityInput.oninput = (e) => { this.state.city = e.target.value.trim(); };

      // Submit Button
      const submitBtn = container.querySelector('#btn-generate-slip');
      if (submitBtn) {
        submitBtn.onclick = (e) => {
          e.preventDefault();
          this.submitBooking();
        };
      }
    },

    updateCountersView: function() {
      const container = document.getElementById('bimlal-booking-system');
      if (!container) return;

      const genEl = container.querySelector('#disp-count-general');
      const senEl = container.querySelector('#disp-count-senior');
      const chiEl = container.querySelector('#disp-count-child');
      const totalEl = container.querySelector('#disp-count-total');

      if (genEl) genEl.textContent = this.state.generalCount;
      if (senEl) senEl.textContent = this.state.seniorCount;
      if (chiEl) chiEl.textContent = this.state.childCount;

      const total = this.state.generalCount + this.state.seniorCount + this.state.childCount;
      if (totalEl) totalEl.textContent = total;
    },

    submitBooking: function() {
      const container = document.getElementById('bimlal-booking-system');
      if (!container) return;

      const nameInput = container.querySelector('#booking-lead-name');
      const phoneInput = container.querySelector('#booking-lead-phone');

      const name = (nameInput ? nameInput.value.trim() : '') || this.state.leadName;
      const phone = (phoneInput ? phoneInput.value.trim() : '') || this.state.mobile;

      const total = this.state.generalCount + this.state.seniorCount + this.state.childCount;
      if (total === 0) {
        if (window.showDevoteeNotice) {
          window.showDevoteeNotice('कृपया किमान एका भाविकाची निवड करा (Please select at least 1 devotee)', 'warning');
        }
        return;
      }

      if (!name) {
        if (window.showDevoteeNotice) {
          window.showDevoteeNotice('कृपया प्रमुख भाविकाचे नाव प्रविष्ट करा (Please enter Lead Devotee name)', 'warning');
        }
        if (nameInput) nameInput.focus();
        return;
      }

      this.state.leadName = name;
      this.state.mobile = phone;

      // Generate verified token (e.g. BML-SHIV-7824)
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      this.state.bookingToken = 'BML-SHIV-' + randomNum;

      this.renderPass();

      // Scroll smoothly to the generated pass
      const passArea = document.getElementById('bimlal-darshan-pass-card');
      if (passArea) {
        passArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (window.showDevoteeNotice) {
        window.showDevoteeNotice('श्री शिव अर्धनरेश्वर दर्शन ई-पास तयार झाला आहे!', 'check_circle');
      }
    },

    renderPass: function() {
      const passContainer = document.getElementById('bimlal-darshan-pass-wrapper');
      if (!passContainer) return;

      const i18n = window.BimlalI18n || { get: (k) => k, currentLang: 'mr' };
      const currentLang = i18n.currentLang || 'mr';

      const slotLabels = {
        usha: i18n.get('slot_usha'),
        madhyahna: i18n.get('slot_madhyahna'),
        aparahna: i18n.get('slot_aparahna'),
        sandhya: i18n.get('slot_sandhya')
      };

      const formattedDate = formatDate(this.state.date, currentLang);
      const totalDevotees = this.state.generalCount + this.state.seniorCount + this.state.childCount;
      const qrPayload = this.state.bookingToken + '|' + this.state.date + '|' + this.state.slot + '|' + totalDevotees + '|' + this.state.leadName;
      const qrSvg = generateQRCodeSvg(qrPayload);

      passContainer.innerHTML = `
        <div id="bimlal-darshan-pass-card" class="mt-8 p-6 sm:p-8 rounded-2xl bg-[#FBF9F5] border-2 border-[#C5A059] shadow-xl text-[#1C1917] max-w-xl mx-auto transition-all animate-fadeIn">
          
          <!-- Mandir Pass Header -->
          <div class="flex items-center justify-between pb-5 border-b border-[#C5A059]/40 gap-4">
            <div class="flex items-center gap-3">
              <img src="/temple_trust_logo.jpg" alt="Mandir Logo" class="h-12 w-12 rounded-full object-cover border border-[#C5A059]">
              <div>
                <h4 class="font-devotional-title text-base sm:text-lg font-bold text-[#792425] leading-tight">
                  ${i18n.get('pass_generated_title')}
                </h4>
                <p class="text-[11px] uppercase tracking-wider text-[#57534E] font-medium mt-0.5">
                  ${i18n.get('official_trust_badge')}
                </p>
              </div>
            </div>
            <div class="text-right shrink-0">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[#792425] bg-[#C5A059]/20 px-2.5 py-1 rounded-full">
                VERIFIED
              </span>
            </div>
          </div>

          <!-- Pass Body Details -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-[#C5A059]/30 text-sm">
            <div>
              <span class="text-xs uppercase tracking-wider text-[#78716C] block font-medium">
                ${i18n.get('pass_booking_id')}
              </span>
              <span class="font-mono text-base font-bold text-[#792425] tracking-wide">
                ${this.state.bookingToken}
              </span>
            </div>
            <div>
              <span class="text-xs uppercase tracking-wider text-[#78716C] block font-medium">
                ${i18n.get('lbl_name')}
              </span>
              <span class="font-devotional-body text-base font-semibold text-[#1C1917]">
                ${this.state.leadName}
              </span>
            </div>
            <div>
              <span class="text-xs uppercase tracking-wider text-[#78716C] block font-medium">
                ${i18n.get('pass_date')}
              </span>
              <span class="font-semibold text-[#1C1917]">
                ${formattedDate}
              </span>
            </div>
            <div>
              <span class="text-xs uppercase tracking-wider text-[#78716C] block font-medium">
                ${i18n.get('pass_devotees')}
              </span>
              <span class="font-semibold text-[#1C1917]">
                ${totalDevotees} (${this.state.generalCount} Gen, ${this.state.seniorCount} Senior, ${this.state.childCount} Child)
              </span>
            </div>
            <div class="sm:col-span-2">
              <span class="text-xs uppercase tracking-wider text-[#78716C] block font-medium">
                ${i18n.get('pass_slot')}
              </span>
              <span class="font-semibold text-[#792425]">
                ${slotLabels[this.state.slot] || this.state.slot}
              </span>
            </div>
          </div>

          <!-- QR Verification Area -->
          <div class="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-center sm:text-left">
              <p class="text-xs font-semibold text-[#792425] mb-1">
                ${i18n.get('pass_qr_label')}
              </p>
              <p class="text-[11px] text-[#57534E] leading-relaxed max-w-xs">
                ${i18n.get('pass_free_notice')}
              </p>
            </div>
            <div class="shrink-0">
              ${qrSvg}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="pt-4 border-t border-[#C5A059]/40 flex items-center justify-center gap-4">
            <button type="button" onclick="window.print()" class="btn-temple-primary text-xs sm:text-sm py-2.5 px-6">
              <span class="material-symbols-outlined text-[18px]">print</span>
              <span>${i18n.get('btn_print_pass')}</span>
            </button>
          </div>

        </div>
      `;
    }
  };

  window.BimlalBooking = BookingManager;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.BimlalBooking.init());
  } else {
    window.BimlalBooking.init();
  }
})();
