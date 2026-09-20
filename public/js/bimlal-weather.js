/**
 * Shree Shiv Ardhanreshwari Nag Jyotirling Dham, Bimlal Sanctuary
 * Dang Sanctuary Live Microclimate & Pilgrim Weather Guidance
 */

(function() {
  'use strict';

  let currentWeather = null;
  let isFetching = false;

  const CONDITION_I18N_MAP = {
    clear: 'weather_cond_clear',
    partly_cloudy: 'weather_cond_partly_cloudy',
    fog: 'weather_cond_fog',
    rain: 'weather_cond_rain',
    rain_showers: 'weather_cond_rain_showers',
    thunderstorm: 'weather_cond_thunderstorm'
  };

  async function fetchWeather(forceRefresh = false) {
    if (isFetching) return;
    isFetching = true;

    const refreshBtn = document.getElementById('bimlal-weather-refresh-btn');
    const refreshIcon = document.getElementById('bimlal-weather-refresh-icon');
    const weatherBody = document.getElementById('bimlal-weather-body');
    if (refreshIcon) refreshIcon.classList.add('animate-spin');

    // Switch to loading transition state
    if (weatherBody) {
      weatherBody.classList.remove('weather-active-state');
      weatherBody.classList.add('weather-loading-state');
    }

    try {
      const url = forceRefresh ? '/api/weather?refresh=1' : '/api/weather';
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      currentWeather = data;
      renderWeather(data);
    } catch (err) {
      console.warn('[Bimlal Weather] Network fallback activated:', err.message);
      if (!currentWeather) {
        // Devotional fallback for Sahyadri Dang mountain sanctuary
        currentWeather = {
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
          updatedAt: '04:00 pm'
        };
      }
      renderWeather(currentWeather);
    } finally {
      isFetching = false;
      if (refreshIcon) refreshIcon.classList.remove('animate-spin');
      // Smooth transition back to active state
      if (weatherBody) {
        requestAnimationFrame(() => {
          weatherBody.classList.remove('weather-loading-state');
          weatherBody.classList.add('weather-active-state');
        });
      }
    }
  }

  function getTranslation(key, fallback = '') {
    if (window.BimlalI18n && typeof window.BimlalI18n.get === 'function') {
      const val = window.BimlalI18n.get(key);
      if (val !== undefined) return val;
    }
    return fallback;
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
    if (rainEl) rainEl.textContent = `${data.precipitation} mm`;

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
  }

  function triggerEntranceAnimation() {
    const widget = document.getElementById('dang-weather-widget');
    if (!widget) return;

    // Check for reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      widget.classList.add('is-revealed');
      return;
    }

    // If IntersectionObserver is supported, reveal when coming into view or shortly on load
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
      // Direct graceful fade-in on load
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

    const refreshBtn = document.getElementById('bimlal-weather-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fetchWeather(true);
        if (window.showDevoteeNotice) {
          const msg = getTranslation('weather_loading', 'हवामान माहिती अद्ययावत केली जात आहे...');
          window.showDevoteeNotice(msg, 'cloud_sync');
        }
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
    render: () => renderWeather(currentWeather)
  };
})();
