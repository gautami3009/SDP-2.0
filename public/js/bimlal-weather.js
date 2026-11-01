/**
 * Shree Shiv Ardhanreshwari Nag Jyotirling Dham, Bimlal Sanctuary
 * Dang Sanctuary Live Microclimate & Severe Weather Pilgrim Safety Guidance
 */

(function() {
  'use strict';

  // Microclimate Severe Thresholds for Sahyadri Dang Mountain Forest
  const HUMIDITY_ALERT_THRESHOLD = 85; // % - Condensation on cave steps, heavy fog, moss slippage
  const WIND_ALERT_THRESHOLD = 20;     // km/h - Strong valley wind gusts, forest tree shelter caution

  let currentWeather = null;
  let liveWeatherSnapshot = null;
  let isFetching = false;
  let isAlertDismissed = false;
  let simulationIndex = 0; // 0 = Live, 1 = Severe Storm, 2 = High Wind, 3 = High Humidity, 4 = Normal Clear

  const CONDITION_I18N_MAP = {
    clear: 'weather_cond_clear',
    partly_cloudy: 'weather_cond_partly_cloudy',
    fog: 'weather_cond_fog',
    rain: 'weather_cond_rain',
    rain_showers: 'weather_cond_rain_showers',
    thunderstorm: 'weather_cond_thunderstorm'
  };

  // Test simulation profiles allowing visitors and testers to evaluate the alert overlay easily
  const SIMULATION_PRESETS = [
    {
      name: 'Live Baseline',
      isLive: true
    },
    {
      name: 'Severe Storm (High Wind & Extreme Humidity)',
      temperature: 22,
      feelsLike: 25,
      humidity: 94,
      windSpeed: 28,
      precipitation: 4.8,
      conditionKey: 'thunderstorm',
      icon: 'thunderstorm',
      advisoryKey: 'weather_advisory_thunderstorm',
      updatedAt: 'Live Alert Demo'
    },
    {
      name: 'Sahyadri Ghat High Winds',
      temperature: 24,
      feelsLike: 25,
      humidity: 68,
      windSpeed: 32,
      precipitation: 0.0,
      conditionKey: 'partly_cloudy',
      icon: 'air',
      advisoryKey: 'weather_advisory_cloudy',
      updatedAt: 'Wind Alert Demo'
    },
    {
      name: 'Valley Cloudburst & Deep Humidity',
      temperature: 21,
      feelsLike: 24,
      humidity: 96,
      windSpeed: 12,
      precipitation: 3.2,
      conditionKey: 'rain',
      icon: 'rainy',
      advisoryKey: 'weather_advisory_rain',
      updatedAt: 'Humidity Alert Demo'
    },
    {
      name: 'Clear & Calm Sky (Normal Weather)',
      temperature: 26,
      feelsLike: 27,
      humidity: 58,
      windSpeed: 9,
      precipitation: 0.0,
      conditionKey: 'clear',
      icon: 'sunny',
      advisoryKey: 'weather_advisory_clear',
      updatedAt: 'Calm Sky Demo'
    }
  ];

  function getTranslation(key, fallback = '') {
    if (window.BimlalI18n && typeof window.BimlalI18n.get === 'function') {
      const val = window.BimlalI18n.get(key);
      if (val !== undefined && val !== null) return val;
    }
    return fallback;
  }

  async function fetchWeather(forceRefresh = false) {
    if (isFetching) return;
    isFetching = true;

    const refreshIcon = document.getElementById('bimlal-weather-refresh-icon');
    const weatherBody = document.getElementById('bimlal-weather-body');
    if (refreshIcon) refreshIcon.classList.add('animate-spin');

    if (weatherBody) {
      weatherBody.classList.remove('weather-active-state');
      weatherBody.classList.add('weather-loading-state');
    }

    try {
      const url = forceRefresh ? '/api/weather?refresh=1' : '/api/weather';
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      liveWeatherSnapshot = data;

      // If user is currently running a manual simulation preset, keep preset active
      if (simulationIndex === 0) {
        currentWeather = data;
        renderWeather(data);
      }
    } catch (err) {
      console.warn('[Bimlal Weather] Network fallback activated:', err.message);
      if (!liveWeatherSnapshot) {
        liveWeatherSnapshot = {
          location: 'Dang Sanctuary, Bimlal',
          elevationMeters: 463,
          temperature: 25,
          feelsLike: 27,
          humidity: 88, // Natural monsoon forest microclimate
          windSpeed: 14,
          precipitation: 0.2,
          conditionKey: 'rain_showers',
          icon: 'rainy',
          advisoryKey: 'weather_advisory_rain',
          updatedAt: '04:00 pm'
        };
      }
      if (simulationIndex === 0) {
        currentWeather = liveWeatherSnapshot;
        renderWeather(currentWeather);
      }
    } finally {
      isFetching = false;
      if (refreshIcon) refreshIcon.classList.remove('animate-spin');
      if (weatherBody) {
        requestAnimationFrame(() => {
          weatherBody.classList.remove('weather-loading-state');
          weatherBody.classList.add('weather-active-state');
        });
      }
    }
  }

  /**
   * Evaluates if conditions exceed severe microclimate safety thresholds
   */
  function evaluateSevereWeather(data) {
    if (!data) return { isSevere: false };

    const humidity = Number(data.humidity) || 0;
    const windSpeed = Number(data.windSpeed) || 0;
    const conditionKey = data.conditionKey || '';
    const isThunderstorm = conditionKey === 'thunderstorm';

    const humidityExceeded = humidity >= HUMIDITY_ALERT_THRESHOLD;
    const windExceeded = windSpeed >= WIND_ALERT_THRESHOLD;
    const isSevere = humidityExceeded || windExceeded || isThunderstorm;

    return {
      isSevere,
      humidityExceeded,
      windExceeded,
      isThunderstorm,
      humidity,
      windSpeed
    };
  }

  /**
   * Renders the Severe Weather Alert overlay & compact banners
   */
  function updateSevereWeatherUI(data) {
    const alertOverlay = document.getElementById('bimlal-weather-alert-overlay');
    const miniBanner = document.getElementById('bimlal-weather-alert-mini-banner');
    const miniPill = document.getElementById('bimlal-weather-mini-pill');
    const humidityCard = document.getElementById('bimlal-humidity-card');
    const windCard = document.getElementById('bimlal-wind-card');
    const triggerBadge = document.getElementById('bimlal-alert-trigger-badge');
    const triggerText = document.getElementById('bimlal-alert-trigger-text');
    const miniAlertDetails = document.getElementById('bimlal-mini-alert-details');

    const severe = evaluateSevereWeather(data);

    // Visual indicators on micro-stat tiles
    if (humidityCard) {
      if (severe.humidityExceeded) {
        humidityCard.classList.add('weather-metric-warning');
      } else {
        humidityCard.classList.remove('weather-metric-warning');
      }
    }

    if (windCard) {
      if (severe.windExceeded) {
        windCard.classList.add('weather-metric-warning');
      } else {
        windCard.classList.remove('weather-metric-warning');
      }
    }

    if (!severe.isSevere) {
      // Normal weather - hide all alerts
      if (alertOverlay) {
        alertOverlay.classList.add('hidden');
        alertOverlay.setAttribute('aria-hidden', 'true');
      }
      if (miniBanner) miniBanner.classList.add('hidden');
      if (miniPill) miniPill.classList.add('hidden');
      return;
    }

    // Determine cause description text
    let causeKey = 'weather_alert_active_trigger_both';
    let causeDetails = '';
    if (severe.humidityExceeded && severe.windExceeded) {
      causeKey = 'weather_alert_active_trigger_both';
      causeDetails = `${getTranslation('weather_humidity_label', 'आर्द्रता')}: ${severe.humidity}% · ${getTranslation('weather_wind_label', 'वारा')}: ${severe.windSpeed} km/h`;
    } else if (severe.humidityExceeded) {
      causeKey = 'weather_alert_active_trigger_humidity';
      causeDetails = `${getTranslation('weather_humidity_label', 'आर्द्रता')}: ${severe.humidity}% (> ${HUMIDITY_ALERT_THRESHOLD}%)`;
    } else if (severe.windExceeded) {
      causeKey = 'weather_alert_active_trigger_wind';
      causeDetails = `${getTranslation('weather_wind_label', 'वारा')}: ${severe.windSpeed} km/h (> ${WIND_ALERT_THRESHOLD} km/h)`;
    } else if (severe.isThunderstorm) {
      causeKey = 'weather_cond_thunderstorm';
      causeDetails = getTranslation('weather_cond_thunderstorm', 'गडगडाटासह वादळी पाऊस');
    }

    const causeString = `${getTranslation(causeKey, 'गंभीर हवामान सावधानता')} (${causeDetails})`;
    if (triggerText) {
      triggerText.textContent = causeString;
    }
    if (miniAlertDetails) {
      miniAlertDetails.textContent = `${causeDetails} · ${getTranslation('weather_alert_rule1_title', 'पाषाण पायऱ्या व घाट सावधगिरी')}`;
    }

    // Display appropriate mode based on dismissal state
    if (isAlertDismissed) {
      if (alertOverlay) {
        alertOverlay.classList.add('hidden');
        alertOverlay.setAttribute('aria-hidden', 'true');
      }
      if (miniBanner) {
        miniBanner.classList.remove('hidden');
        miniBanner.classList.add('flex');
      }
      if (miniPill) {
        miniPill.classList.remove('hidden');
        miniPill.classList.add('inline-flex');
      }
    } else {
      if (alertOverlay) {
        alertOverlay.classList.remove('hidden');
        alertOverlay.setAttribute('aria-hidden', 'false');
      }
      if (miniBanner) miniBanner.classList.add('hidden');
      if (miniPill) {
        miniPill.classList.remove('hidden');
        miniPill.classList.add('inline-flex');
      }
    }
  }

  function dismissAlert() {
    isAlertDismissed = true;
    updateSevereWeatherUI(currentWeather);

    if (window.showDevoteeNotice) {
      const msg = getTranslation('weather_alert_dismiss', 'हवामान सूचना संकुचित केली आहे.');
      window.showDevoteeNotice(msg, 'info');
    }
  }

  function reopenAlert() {
    isAlertDismissed = false;
    updateSevereWeatherUI(currentWeather);

    const alertOverlay = document.getElementById('bimlal-weather-alert-overlay');
    if (alertOverlay) {
      const closeBtn = document.getElementById('bimlal-weather-alert-close-btn');
      if (closeBtn) closeBtn.focus();
    }
  }

  function toggleSimulation() {
    simulationIndex = (simulationIndex + 1) % SIMULATION_PRESETS.length;
    const simPreset = SIMULATION_PRESETS[simulationIndex];

    const simLabel = document.getElementById('bimlal-weather-sim-label');
    const simBtn = document.getElementById('bimlal-weather-sim-btn');

    if (simPreset.isLive) {
      // Revert to live snapshot
      currentWeather = liveWeatherSnapshot || {
        location: 'Dang Sanctuary, Bimlal',
        elevationMeters: 463,
        temperature: 25,
        feelsLike: 27,
        humidity: 86,
        windSpeed: 10,
        precipitation: 0.1,
        conditionKey: 'rain_showers',
        icon: 'rainy',
        advisoryKey: 'weather_advisory_rain',
        updatedAt: 'Live'
      };
      isAlertDismissed = false;
      renderWeather(currentWeather);

      if (simLabel) simLabel.textContent = getTranslation('weather_alert_test_btn', 'चाचणी इशारा');
      if (simBtn) {
        simBtn.classList.remove('bg-amber-500', 'text-white', 'border-amber-600');
        simBtn.classList.add('bg-amber-50', 'text-amber-900', 'border-amber-300/70');
      }

      if (window.showDevoteeNotice) {
        window.showDevoteeNotice(getTranslation('weather_alert_test_sim_off', 'थेट हवामान माहिती सुरू केली'), 'routine');
      }
    } else {
      // Apply simulation preset
      currentWeather = {
        location: 'Dang Sanctuary, Bimlal',
        elevationMeters: 463,
        ...simPreset
      };
      isAlertDismissed = false; // Freshly open overlay on simulation trigger
      renderWeather(currentWeather);

      if (simLabel) {
        simLabel.textContent = simPreset.name.split(' ')[0] + '...';
      }
      if (simBtn) {
        simBtn.classList.remove('bg-amber-50', 'text-amber-900', 'border-amber-300/70');
        simBtn.classList.add('bg-amber-500', 'text-white', 'border-amber-600');
      }

      if (window.showDevoteeNotice) {
        const severe = evaluateSevereWeather(currentWeather);
        const noticeText = severe.isSevere 
          ? `चाचणी: ${simPreset.name} (आर्द्रता: ${currentWeather.humidity}%, वारा: ${currentWeather.windSpeed} km/h)`
          : `चाचणी: ${simPreset.name} (सामान्य हवामान)`;
        window.showDevoteeNotice(noticeText, severe.isSevere ? 'warning' : 'routine');
      }
    }
  }

  function renderWeather(data) {
    if (!data) return;

    // Temperature & Feels Like
    const tempEl = document.getElementById('bimlal-weather-temp');
    const feelsEl = document.getElementById('bimlal-weather-feels');
    if (tempEl) tempEl.textContent = `${data.temperature}°C`;
    if (feelsEl) feelsEl.textContent = `${data.feelsLike}°C`;

    // Metrics
    const humidityEl = document.getElementById('bimlal-weather-humidity');
    const windEl = document.getElementById('bimlal-weather-wind');
    const rainEl = document.getElementById('bimlal-weather-rain');
    if (humidityEl) humidityEl.textContent = `${data.humidity}%`;
    if (windEl) windEl.textContent = `${data.windSpeed} km/h`;
    if (rainEl) rainEl.textContent = `${data.precipitation ?? 0} mm`;

    // Icon
    const iconEl = document.getElementById('bimlal-weather-icon');
    if (iconEl && data.icon) {
      iconEl.textContent = data.icon;
    }

    // Condition Text
    const condEl = document.getElementById('bimlal-weather-condition-text');
    if (condEl) {
      const condKey = CONDITION_I18N_MAP[data.conditionKey] || 'weather_cond_partly_cloudy';
      condEl.textContent = getTranslation(condKey, 'सह्याद्रीत आल्हाददायक वातावरण');
    }

    // Advisory Text
    const advEl = document.getElementById('bimlal-weather-advisory-text');
    if (advEl) {
      const advKey = data.advisoryKey || 'weather_advisory_rain';
      advEl.textContent = getTranslation(advKey, 'सह्याद्रीच्या घाटात पाऊस सुरू असू शकतो. छत्री व सुरक्षित पादत्राणे सोबत ठेवा.');
    }

    // Timestamp
    const timeEl = document.getElementById('bimlal-weather-timestamp');
    if (timeEl && data.updatedAt) {
      timeEl.textContent = data.updatedAt;
    }

    // Evaluate and render Severe Weather Alert overlay & status
    updateSevereWeatherUI(data);
  }

  function triggerEntranceAnimation() {
    const widget = document.getElementById('dang-weather-widget');
    if (!widget) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      widget.classList.add('is-revealed');
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0.1 });
      observer.observe(widget);
    } else {
      setTimeout(() => {
        widget.classList.add('is-revealed');
      }, 120);
    }
  }

  function init() {
    triggerEntranceAnimation();
    fetchWeather();

    // Re-render strings when language changes
    window.addEventListener('bimlal-language-change', () => {
      if (currentWeather) {
        renderWeather(currentWeather);
      }
    });

    // Refresh Button
    const refreshBtn = document.getElementById('bimlal-weather-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', (e) => {
        e.preventDefault();
        simulationIndex = 0; // Reset simulation on explicit refresh
        fetchWeather(true);
        if (window.showDevoteeNotice) {
          const msg = getTranslation('weather_loading', 'हवामान माहिती अद्ययावत केली जात आहे...');
          window.showDevoteeNotice(msg, 'cloud_sync');
        }
      });
    }

    // Alert Dismiss Buttons (X and Understood)
    const closeBtn = document.getElementById('bimlal-weather-alert-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dismissAlert();
      });
    }

    const ackBtn = document.getElementById('bimlal-weather-alert-ack-btn');
    if (ackBtn) {
      ackBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dismissAlert();
      });
    }

    // Alert Reopen Buttons (Banner & Top Pill)
    const reopenBtn = document.getElementById('bimlal-mini-alert-reopen-btn');
    if (reopenBtn) {
      reopenBtn.addEventListener('click', (e) => {
        e.preventDefault();
        reopenAlert();
      });
    }

    const miniPill = document.getElementById('bimlal-weather-mini-pill');
    if (miniPill) {
      miniPill.addEventListener('click', (e) => {
        e.preventDefault();
        reopenAlert();
      });
    }

    // Simulation / Test Toggle Button
    const simBtn = document.getElementById('bimlal-weather-sim-btn');
    if (simBtn) {
      simBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSimulation();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.BimlalWeather = {
    fetch: fetchWeather,
    render: () => renderWeather(currentWeather),
    dismissAlert,
    reopenAlert,
    toggleSimulation,
    getThresholds: () => ({ humidity: HUMIDITY_ALERT_THRESHOLD, wind: WIND_ALERT_THRESHOLD })
  };
})();
