/**
 * Shree Shiv Ardhanreshwari Nag Jyotirling Dham, Bimlal Sanctuary
 * Seasonal Pilgrim Packing Checklist Tailored to Dang Sanctuary Climate
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'bimlal_packing_checklist_v1';
  let activeSeason = 'monsoon';

  const SEASON_CONFIG = {
    monsoon: {
      icon: 'rainy',
      badgeClass: 'bg-blue-50 text-blue-900 border-blue-200',
      ctxTitleKey: 'packing_ctx_title_monsoon',
      ctxDescKey: 'packing_ctx_desc_monsoon',
      items: [
        {
          id: 'monsoon_1',
          icon: 'rainy',
          titleKey: 'packing_item_monsoon_1_title',
          descKey: 'packing_item_monsoon_1_desc',
          tag: { mr: 'पावसाळी विशेष', hi: 'वर्षा विशेष', en: 'Rain Essential', gu: 'વરસાદી વિશેષ' }
        },
        {
          id: 'monsoon_2',
          icon: 'hiking',
          titleKey: 'packing_item_monsoon_2_title',
          descKey: 'packing_item_monsoon_2_desc',
          tag: { mr: 'सुरक्षा', hi: 'सुरक्षा', en: 'Safety', gu: 'સુરક્ષા' }
        },
        {
          id: 'monsoon_3',
          icon: 'waterproof',
          titleKey: 'packing_item_monsoon_3_title',
          descKey: 'packing_item_monsoon_3_desc',
          tag: { mr: 'जलरोधक', hi: 'जलरोधक', en: 'Waterproof', gu: 'વોટરપ્રૂફ' }
        },
        {
          id: 'monsoon_4',
          icon: 'dry_cleaning',
          titleKey: 'packing_item_monsoon_4_title',
          descKey: 'packing_item_monsoon_4_desc',
          tag: { mr: 'गर्भगृह मर्यादा', hi: 'गर्भगृह मर्यादा', en: 'Sanctum Code', gu: 'ગર્ભગૃહ મર્યાદા' }
        },
        {
          id: 'monsoon_5',
          icon: 'sanitizer',
          titleKey: 'packing_item_monsoon_5_title',
          descKey: 'packing_item_monsoon_5_desc',
          tag: { mr: 'अरण्य काळजी', hi: 'वन सुरक्षा', en: 'Forest Care', gu: 'જંગલ કાળજી' }
        }
      ]
    },
    winter: {
      icon: 'ac_unit',
      badgeClass: 'bg-indigo-50 text-indigo-900 border-indigo-200',
      ctxTitleKey: 'packing_ctx_title_winter',
      ctxDescKey: 'packing_ctx_desc_winter',
      items: [
        {
          id: 'winter_1',
          icon: 'severe_cold',
          titleKey: 'packing_item_winter_1_title',
          descKey: 'packing_item_winter_1_desc',
          tag: { mr: '१०°-१४° से. गारठा', hi: '१०°-१४° से. ठंड', en: '10°-14°C Cold', gu: '૧૦°-૧૪° સે. ઠંડી' }
        },
        {
          id: 'winter_2',
          icon: 'checkroom',
          titleKey: 'packing_item_winter_2_title',
          descKey: 'packing_item_winter_2_desc',
          tag: { mr: '४ प्रहर जागरण', hi: '४ प्रहर जागरण', en: 'Night Vigil', gu: '૪ પ્રહર જાગરણ' }
        },
        {
          id: 'winter_3',
          icon: 'flashlight_on',
          titleKey: 'packing_item_winter_3_title',
          descKey: 'packing_item_winter_3_desc',
          tag: { mr: 'अरण्य वाट', hi: 'जंगल मार्ग', en: 'Forest Path', gu: 'જંગલ માર્ગ' }
        },
        {
          id: 'winter_4',
          icon: 'spa',
          titleKey: 'packing_item_winter_4_title',
          descKey: 'packing_item_winter_4_desc',
          tag: { mr: 'त्वचा रक्षण', hi: 'त्वचा रक्षा', en: 'Skin Protection', gu: 'ત્વચા રક્ષણ' }
        },
        {
          id: 'winter_5',
          icon: 'local_cafe',
          titleKey: 'packing_item_winter_5_title',
          descKey: 'packing_item_winter_5_desc',
          tag: { mr: 'आरोग्य', hi: 'स्वास्थ्य', en: 'Health', gu: 'આરોગ્ય' }
        }
      ]
    },
    summer: {
      icon: 'wb_sunny',
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
      ctxTitleKey: 'packing_ctx_title_summer',
      ctxDescKey: 'packing_ctx_desc_summer',
      items: [
        {
          id: 'summer_1',
          icon: 'styler',
          titleKey: 'packing_item_summer_1_title',
          descKey: 'packing_item_summer_1_desc',
          tag: { mr: 'सुती सात्विकता', hi: 'सूती सात्विकता', en: 'Pure Cotton', gu: 'સુતરાઉ સાત્વિકતા' }
        },
        {
          id: 'summer_2',
          icon: 'wb_sunny',
          titleKey: 'packing_item_summer_2_title',
          descKey: 'packing_item_summer_2_desc',
          tag: { mr: 'ऊन संरक्षण', hi: 'धूप से बचाव', en: 'Sun Guard', gu: 'તડકા રક્ષણ' }
        },
        {
          id: 'summer_3',
          icon: 'water_bottle',
          titleKey: 'packing_item_summer_3_title',
          descKey: 'packing_item_summer_3_desc',
          tag: { mr: 'जलपान', hi: 'जलपान', en: 'Hydration', gu: 'જળપાન' }
        },
        {
          id: 'summer_4',
          icon: 'local_pharmacy',
          titleKey: 'packing_item_summer_4_title',
          descKey: 'packing_item_summer_4_desc',
          tag: { mr: 'ऊर्जा संतुलन', hi: 'ऊर्जा संतुलन', en: 'Energy', gu: 'ઊર્જા સંતુલન' }
        },
        {
          id: 'summer_5',
          icon: 'do_not_step',
          titleKey: 'packing_item_summer_5_title',
          descKey: 'packing_item_summer_5_desc',
          tag: { mr: 'फरशी रक्षण', hi: 'पत्थर सुरक्षा', en: 'Heated Steps', gu: 'ફરસ રક્ષણ' }
        }
      ]
    },
    all_season: {
      icon: 'verified',
      badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      ctxTitleKey: 'packing_ctx_title_all_season',
      ctxDescKey: 'packing_ctx_desc_all_season',
      items: [
        {
          id: 'all_season_1',
          icon: 'self_improvement',
          titleKey: 'packing_item_all_season_1_title',
          descKey: 'packing_item_all_season_1_desc',
          tag: { mr: 'नित्य मर्यादा', hi: 'नित्य मर्यादा', en: 'Mandatory', gu: 'નિત્ય મર્યાદા' }
        },
        {
          id: 'all_season_2',
          icon: 'shopping_bag',
          titleKey: 'packing_item_all_season_2_title',
          descKey: 'packing_item_all_season_2_desc',
          tag: { mr: 'स्वच्छता', hi: 'स्वच्छता', en: 'Sanctity', gu: 'સ્વચ્છતા' }
        },
        {
          id: 'all_season_3',
          icon: 'medication',
          titleKey: 'packing_item_all_season_3_title',
          descKey: 'packing_item_all_season_3_desc',
          tag: { mr: 'औषधोपचार', hi: 'दवाई स्टॉक', en: 'Pharmacy Note', gu: 'દવાઓ' }
        },
        {
          id: 'all_season_4',
          icon: 'payments',
          titleKey: 'packing_item_all_season_4_title',
          descKey: 'packing_item_all_season_4_desc',
          tag: { mr: 'नेटवर्क मर्यादा', hi: 'नेटवर्क नोट', en: 'Network Note', gu: 'નેટવર્ક મર્યાદા' }
        },
        {
          id: 'all_season_5',
          icon: 'recycling',
          titleKey: 'packing_item_all_season_5_title',
          descKey: 'packing_item_all_season_5_desc',
          tag: { mr: 'पर्यावरण', hi: 'पर्यावरण', en: 'Eco Sanctuary', gu: 'પર્યાવરણ' }
        }
      ]
    }
  };

  function getSavedState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('[Bimlal Packing] LocalStorage error', e);
    }
  }

  function getI18nText(key, fallback = '') {
    if (window.BimlalI18n && typeof window.BimlalI18n.get === 'function') {
      const val = window.BimlalI18n.get(key);
      if (val && val !== key) return val;
    }
    return fallback;
  }

  function getCurrentLang() {
    if (window.BimlalI18n && window.BimlalI18n.currentLang) {
      return window.BimlalI18n.currentLang;
    }
    return document.documentElement.getAttribute('lang') || 'mr';
  }

  function renderContextCallout() {
    const config = SEASON_CONFIG[activeSeason];
    if (!config) return;

    const iconEl = document.getElementById('packing-context-icon');
    const titleEl = document.getElementById('packing-context-title');
    const descEl = document.getElementById('packing-context-desc');

    if (iconEl) iconEl.textContent = config.icon;
    if (titleEl) {
      titleEl.textContent = getI18nText(config.ctxTitleKey, 'हवामान वैशिष्ट्य');
    }
    if (descEl) {
      descEl.textContent = getI18nText(config.ctxDescKey, 'सह्याद्रीच्या दाट अरण्यातील वातावरणानुसार आवश्यक साहित्य सोबत ठेवावे.');
    }
  }

  function updateCardDOM(card, item, isChecked, lang) {
    card.className = `packing-item-card p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
      isChecked 
        ? 'bg-[#F0FDF4] border-emerald-500/40 shadow-2xs' 
        : 'bg-[#FAF2E4] border-[#C5A059]/25 hover:border-[#C5A059]/50 hover:bg-[#FDF8EE]'
    }`;
    card.setAttribute('aria-checked', isChecked ? 'true' : 'false');

    const btn = card.querySelector('.packing-checkbox-btn');
    if (btn) {
      btn.className = `packing-checkbox-btn shrink-0 w-6 h-6 rounded-md border flex items-center justify-center transition-all mt-0.5 cursor-pointer ${
        isChecked 
          ? 'bg-emerald-600 border-emerald-600 text-white scale-105' 
          : 'bg-[#FAF2E4] border-[#C5A059]/50 text-transparent hover:border-primary'
      }`;
      setTimeout(() => btn.classList.remove('scale-105'), 180);
    }

    const iconBox = card.querySelector('.packing-icon-box');
    if (iconBox) {
      iconBox.className = `packing-icon-box w-8 h-8 rounded-lg shrink-0 flex items-center justify-center transition-colors ${
        isChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-[#792425]/10 text-primary'
      }`;
    }

    const titleEl = card.querySelector('.packing-item-title');
    if (titleEl) {
      titleEl.className = `packing-item-title font-devotional-title text-sm sm:text-base font-bold transition-all ${
        isChecked ? 'text-emerald-950 line-through opacity-80' : 'text-[#1C1917]'
      }`;
    }

    const descEl = card.querySelector('.packing-item-desc');
    if (descEl) {
      descEl.className = `packing-item-desc text-xs leading-relaxed transition-all ${
        isChecked ? 'text-emerald-900/70' : 'text-[#57534E]'
      }`;
    }

    const tagEl = card.querySelector('.packing-item-tag');
    if (tagEl) {
      tagEl.className = `packing-item-tag text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border transition-all ${
        isChecked ? 'bg-emerald-100/70 text-emerald-800 border-emerald-300' : 'bg-[#C5A059]/15 text-[#792425] border-[#C5A059]/30'
      }`;
    }
  }

  function renderItems() {
    const container = document.getElementById('packing-items-container');
    if (!container) return;

    const config = SEASON_CONFIG[activeSeason];
    if (!config) return;

    const state = getSavedState();
    const lang = getCurrentLang();
    container.innerHTML = '';

    config.items.forEach((item, index) => {
      const isChecked = !!state[item.id];
      const title = getI18nText(item.titleKey, 'साहित्य नाव');
      const desc = getI18nText(item.descKey, 'साहित्याची माहिती');
      const tagText = (item.tag && item.tag[lang]) ? item.tag[lang] : (item.tag?.mr || '');

      const card = document.createElement('div');
      card.className = `packing-item-card p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
        isChecked 
          ? 'bg-[#F0FDF4] border-emerald-500/40 shadow-2xs' 
          : 'bg-[#FAF2E4] border-[#C5A059]/25 hover:border-[#C5A059]/50 hover:bg-[#FDF8EE]'
      }`;
      card.setAttribute('role', 'checkbox');
      card.setAttribute('aria-checked', isChecked ? 'true' : 'false');
      card.setAttribute('tabindex', '0');
      card.setAttribute('data-item-id', item.id);

      card.innerHTML = `
        <button type="button" 
                class="packing-checkbox-btn shrink-0 w-6 h-6 rounded-md border flex items-center justify-center transition-all mt-0.5 cursor-pointer ${
                  isChecked 
                    ? 'bg-emerald-600 border-emerald-600 text-white' 
                    : 'bg-[#FAF2E4] border-[#C5A059]/50 text-transparent hover:border-primary'
                }"
                aria-label="${isChecked ? 'Uncheck' : 'Check'} ${title}">
          <span class="material-symbols-outlined text-[16px] font-bold leading-none">check</span>
        </button>

        <div class="packing-icon-box w-8 h-8 rounded-lg shrink-0 flex items-center justify-center transition-colors ${
          isChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-[#792425]/10 text-primary'
        }">
          <span class="material-symbols-outlined text-[18px]">${item.icon}</span>
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center justify-between gap-1.5 mb-1">
            <h4 class="packing-item-title font-devotional-title text-sm sm:text-base font-bold transition-all ${
              isChecked ? 'text-emerald-950 line-through opacity-80' : 'text-[#1C1917]'
            }">
              ${title}
            </h4>
            ${tagText ? `
              <span class="packing-item-tag text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border transition-all ${
                isChecked ? 'bg-emerald-100/70 text-emerald-800 border-emerald-300' : 'bg-[#C5A059]/15 text-[#792425] border-[#C5A059]/30'
              }">
                ${tagText}
              </span>
            ` : ''}
          </div>
          <p class="packing-item-desc text-xs leading-relaxed transition-all ${
            isChecked ? 'text-emerald-900/70' : 'text-[#57534E]'
          }">
            ${desc}
          </p>
        </div>
      `;

      // Click to toggle with smooth transition
      const toggle = (e) => {
        e.preventDefault();
        const curState = getSavedState();
        const newState = !curState[item.id];
        curState[item.id] = newState;
        saveState(curState);

        // Update this card's DOM in-place for fluid animation
        updateCardDOM(card, item, newState, lang);

        // Animate the progress bar and percentage
        updateProgress();

        if (newState && window.showDevoteeNotice) {
          const checkMsg = lang === 'en' ? 'Item packed!' : (lang === 'hi' ? 'सामग्री तैयार!' : 'साहित्य तयार!');
          window.showDevoteeNotice(checkMsg, 'task_alt');
        }
      };

      card.addEventListener('click', toggle);
      card.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          toggle(e);
        }
      });

      container.appendChild(card);
    });

    updateProgress();
  }

  function toDevanagariNumerals(str) {
    const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return String(str).replace(/[0-9]/g, w => devanagariDigits[+w]);
  }

  function updateProgress() {
    const config = SEASON_CONFIG[activeSeason];
    if (!config) return;

    const state = getSavedState();
    const total = config.items.length;
    let checked = 0;
    config.items.forEach(it => {
      if (state[it.id]) checked++;
    });

    const progressEl = document.getElementById('packing-progress-text');
    const percentEl = document.getElementById('packing-progress-percent');
    const fillEl = document.getElementById('packing-progress-fill');
    const progressContainer = document.getElementById('packing-progressbar-container');

    const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
    const isComplete = (checked === total && total > 0);

    // Smoothly animate progress fill width & glow
    if (fillEl) {
      fillEl.style.width = `${pct}%`;
      if (isComplete) {
        fillEl.className = 'h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]';
      } else {
        fillEl.className = 'h-full rounded-full bg-gradient-to-r from-[#C5A059] via-[#D49B28] to-emerald-600 transition-all duration-500 ease-out shadow-xs';
      }
    }

    if (progressContainer) {
      progressContainer.setAttribute('aria-valuenow', String(pct));
      if (isComplete) {
        progressContainer.classList.add('border-emerald-500', 'shadow-[0_0_12px_rgba(16,185,129,0.25)]');
      } else {
        progressContainer.classList.remove('border-emerald-500', 'shadow-[0_0_12px_rgba(16,185,129,0.25)]');
      }
    }

    const lang = getCurrentLang();
    const pctStr = (lang === 'en') ? `${pct}%` : `${toDevanagariNumerals(pct)}%`;
    if (percentEl) {
      percentEl.textContent = pctStr;
      if (isComplete) {
        percentEl.className = 'text-[11px] font-bold text-emerald-700 transition-all duration-300 scale-105';
      } else {
        percentEl.className = 'text-[11px] font-bold text-[#792425] transition-all duration-300';
      }
    }

    if (progressEl) {
      if (isComplete) {
        const donePattern = getI18nText('packing_progress_done', '{total}/{total} परिपूर्ण! यात्रा सिद्ध ॐ');
        const numStr = (lang === 'en') ? `${total}/${total}` : `${toDevanagariNumerals(total)}/${toDevanagariNumerals(total)}`;
        progressEl.textContent = donePattern.replace('{total}/{total}', numStr);
        progressEl.className = 'flex items-center gap-1 font-bold text-emerald-700 text-xs transition-colors duration-300';
      } else {
        const pat = getI18nText('packing_progress_pattern', '{checked}/{total} साहित्य तयार');
        const cStr = (lang === 'en') ? String(checked) : toDevanagariNumerals(checked);
        const tStr = (lang === 'en') ? String(total) : toDevanagariNumerals(total);
        progressEl.textContent = pat.replace('{checked}', cStr).replace('{total}', tStr);
        progressEl.className = 'flex items-center gap-1 font-semibold text-[#1C1917] text-xs transition-colors duration-300';
      }
    }
  }

  function switchSeason(newSeason) {
    if (!SEASON_CONFIG[newSeason] || newSeason === activeSeason) return;
    activeSeason = newSeason;

    // Update tab styling
    document.querySelectorAll('.packing-season-tab').forEach(btn => {
      const season = btn.getAttribute('data-season-tab');
      const isCurrent = season === activeSeason;
      btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      if (isCurrent) {
        btn.className = 'packing-season-tab px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold bg-[#792425] text-white shadow-xs';
      } else {
        btn.className = 'packing-season-tab px-3 py-1.5 rounded-lg transition-all cursor-pointer text-[#57534E] hover:text-[#792425]';
      }
    });

    renderContextCallout();
    renderItems();
  }

  function resetCurrentSeason() {
    const config = SEASON_CONFIG[activeSeason];
    if (!config) return;

    const state = getSavedState();
    config.items.forEach(it => {
      delete state[it.id];
    });
    saveState(state);
    renderItems();
    updateProgress();

    const lang = getCurrentLang();
    const notice = lang === 'en' ? 'Season checklist reset' : (lang === 'hi' ? 'सूची रीसेट कर दी गई है' : 'साहित्य सूची पूर्ववत केली आहे');
    if (window.showDevoteeNotice) {
      window.showDevoteeNotice(notice, 'restart_alt');
    }
  }

  function init() {
    // Bind Tab buttons
    document.querySelectorAll('.packing-season-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const season = btn.getAttribute('data-season-tab');
        if (season) switchSeason(season);
      });
    });

    // Reset button
    const resetBtn = document.getElementById('packing-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetCurrentSeason();
      });
    }

    // Render initially
    renderContextCallout();
    renderItems();

    // Listen for language changes
    window.addEventListener('bimlal-language-change', () => {
      renderContextCallout();
      renderItems();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.BimlalPacking = {
    switchSeason,
    reset: resetCurrentSeason,
    refresh: () => {
      renderContextCallout();
      renderItems();
    }
  };
})();
