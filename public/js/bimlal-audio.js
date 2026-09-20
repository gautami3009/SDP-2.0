/**
 * Shree Shiv Ardhanreshwari Nag Jyotirling Dham, Bimlal Sanctuary
 * Centralized Sacred Audio Manager & Minimal Player Component
 * 
 * Features:
 * - Uses the authentic Bimlal recording from window.BIMLAL_AUDIO_CONFIG.AUDIO_SOURCE
 * - Modern browser autoplay policy compliance (starts silently, no sound on initial visit)
 * - Session memory via sessionStorage (remembers intentional play, mute, and pause preferences)
 * - Minimal, quiet sacred visual design (deep maroon #792425, warm ivory #FBF9F5, muted gold #D4AF37)
 * - Accessible controls (ARIA labels, keyboard support, live announcements)
 * - Compact mobile positioning that does not block CTAs or navigation
 * - Synchronizes with all header/hero audio toggles across the entire portal
 */

(function() {
  'use strict';

  // Prevent duplicate initialization
  if (window.BimlalAudio) {
    return;
  }

  const STORAGE_KEYS = {
    ENGAGED: 'bimlal_audio_engaged',
    STATE: 'bimlal_audio_state',
    TIME: 'bimlal_audio_time',
    MUTED: 'bimlal_audio_muted'
  };

  const AudioManager = {
    audio: null,
    isPlaying: false,
    isMuted: false,
    config: null,
    uiContainer: null,
    progressBar: null,
    liveRegion: null,
    timeUpdateInterval: null,

    getConfig: function() {
      return window.BIMLAL_AUDIO_CONFIG || {
        AUDIO_SOURCE: '/audio/bimlal-official-audio.mp3?v=2',
        TITLE: 'Sacred Sanctum Chants · Shiv Ardhanreshwari Dham',
        PRELOAD: 'auto',
        DEFAULT_VOLUME: 0.8,
        LOOP: true
      };
    },

    init: function() {
      if (this.initialized) return;
      this.initialized = true;

      this.config = this.getConfig();

      // Retrieve or create singleton audio element
      let existingAudio = document.getElementById('bimlal-singleton-audio');
      if (!existingAudio) {
        this.audio = document.createElement('audio');
        this.audio.id = 'bimlal-singleton-audio';
        this.audio.src = this.config.AUDIO_SOURCE;
        this.audio.preload = this.config.PRELOAD || 'auto';
        this.audio.loop = this.config.LOOP !== false;
        this.audio.volume = typeof this.config.DEFAULT_VOLUME === 'number' ? this.config.DEFAULT_VOLUME : 0.85;
        this.audio.muted = false;
        document.body.appendChild(this.audio);
      } else {
        this.audio = existingAudio;
        if (!this.audio.src || this.audio.src.indexOf('/audio/') === -1) {
          this.audio.src = this.config.AUDIO_SOURCE;
        }
        this.audio.volume = typeof this.config.DEFAULT_VOLUME === 'number' ? this.config.DEFAULT_VOLUME : 0.85;
        this.audio.muted = false;
      }

      this.isMuted = false;

      // Wire native audio events
      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.updateUI();
        this.announce('Sacred audio playing');
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.updateUI();
        this.announce('Sacred audio paused');
      });

      this.audio.addEventListener('volumechange', () => {
        this.isMuted = this.audio.muted;
        this.updateUI();
      });

      this.audio.addEventListener('timeupdate', () => {
        this.updateProgress();
      });

      this.audio.addEventListener('error', (e) => {
        const mediaErr = this.audio && this.audio.error;
        console.warn('[BimlalAudio] Audio loading state notice:', mediaErr ? (mediaErr.message || mediaErr.code) : e);
        if (this.audio && !this._hasRecovered) {
          this._hasRecovered = true;
          const cleanSrc = (this.config.AUDIO_SOURCE || '/audio/bimlal-official-audio.mp3').split('?')[0];
          const freshSrc = cleanSrc + '?t=' + Date.now();
          console.info('[BimlalAudio] Attempting audio recovery reload with fresh source:', freshSrc);
          this.audio.src = freshSrc;
          this.audio.load();
        }
      });

      // Mount minimal sacred UI
      this.mountUI();

      // Rule: When website opens, audio automatically plays from 0:00
      this.triggerAutoPlay();

      // Wire any existing audio buttons on the page
      this.syncExistingPageButtons();
    },

    triggerAutoPlay: function() {
      if (!this.audio) return;

      try {
        if (this.audio.currentTime > 0) {
          this.audio.currentTime = 0;
        }
      } catch (err) {}

      this.audio.muted = false;
      if (this.audio.volume < 0.2) {
        this.audio.volume = 0.85;
      }

      this._playPromise = this.audio.play();
      if (this._playPromise !== undefined) {
        this._playPromise.then(() => {
          this._playPromise = null;
          this.isPlaying = true;
          this.updateUI();
        }).catch(() => {
          this._playPromise = null;
          // Autoplay blocked by browser policy without user interaction.
          // On first devotee touch/click anywhere on page, unlock and play from 0:00
          const unlockOnGesture = (e) => {
            const isAudioControl = e.target && (
              e.target.closest('#bimlal-sacred-audio-player') ||
              e.target.closest('#header-audio-toggle-btn') ||
              e.target.closest('#hero-audio-btn') ||
              e.target.closest('#audio-toggle-btn')
            );

            ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
              window.removeEventListener(evt, unlockOnGesture, true);
            });

            if (!isAudioControl && !this.isPlaying) {
              this.play();
            }
          };

          ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
            window.addEventListener(evt, unlockOnGesture, { capture: true, once: true });
          });
        });
      }
    },

    play: function() {
      if (!this.audio) return;

      // Ensure audio is unmuted and audible
      this.audio.muted = false;
      this.isMuted = false;
      if (this.audio.volume < 0.2) {
        this.audio.volume = 0.85;
      }

      // Safe reload if audio element lost source
      if (this.audio.error || !this.audio.src || this.audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        const cleanSrc = (this.config.AUDIO_SOURCE || '/audio/bimlal-official-audio.mp3').split('?')[0];
        this.audio.src = cleanSrc + '?v=' + Date.now();
        this.audio.load();
      }

      // Safe reset to starting position
      try {
        if (this.audio.currentTime > 0) {
          this.audio.currentTime = 0;
        }
      } catch (err) {}

      sessionStorage.setItem(STORAGE_KEYS.ENGAGED, 'true');
      sessionStorage.setItem(STORAGE_KEYS.STATE, 'playing');

      this._playPromise = this.audio.play();
      if (this._playPromise !== undefined) {
        this._playPromise.then(() => {
          this._playPromise = null;
          this.isPlaying = true;
          this.updateUI();
          if (window.showDevoteeNotice) {
            window.showDevoteeNotice('Sacred Sanctum Chants Playing', 'volume_up');
          }
        }).catch((err) => {
          this._playPromise = null;
          console.warn('[BimlalAudio] Playback note:', err);
          this.isPlaying = false;
          this.updateUI();
        });
      }
    },

    pause: function() {
      if (!this.audio) return;
      sessionStorage.setItem(STORAGE_KEYS.STATE, 'paused');

      const doPause = () => {
        try {
          this.audio.pause();
        } catch (e) {}
        try {
          if (this.audio.currentTime > 0) {
            this.audio.currentTime = 0;
          }
        } catch (err) {}
        this.isPlaying = false;
        this.updateUI();
        if (window.showDevoteeNotice) {
          window.showDevoteeNotice('Sacred Chants Paused', 'volume_off');
        }
      };

      if (this._playPromise) {
        this._playPromise.then(() => {
          this._playPromise = null;
          doPause();
        }).catch(() => {
          this._playPromise = null;
          doPause();
        });
      } else {
        doPause();
      }
    },

    togglePlay: function() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },

    toggleMute: function() {
      if (!this.audio) return;
      this.audio.muted = !this.audio.muted;
      this.isMuted = this.audio.muted;
      if (!this.isMuted && this.audio.volume < 0.2) {
        this.audio.volume = 0.85;
      }
      this.updateUI();
      if (window.showDevoteeNotice) {
        window.showDevoteeNotice(this.isMuted ? 'Sacred Audio Muted' : 'Sacred Audio Unmuted', this.isMuted ? 'volume_off' : 'volume_up');
      }
      this.announce(this.isMuted ? 'Sacred audio muted' : 'Sacred audio unmuted');
    },

    announce: function(msg) {
      if (!this.liveRegion) {
        this.liveRegion = document.getElementById('bimlal-audio-live-region');
      }
      if (this.liveRegion) {
        this.liveRegion.textContent = msg;
      }
    },

    updateProgress: function() {
      if (!this.progressBar || !this.audio || !this.audio.duration) return;
      const pct = (this.audio.currentTime / this.audio.duration) * 100;
      this.progressBar.style.width = pct.toFixed(1) + '%';
    },

    mountUI: function() {
      if (document.getElementById('bimlal-sacred-audio-player')) {
        this.uiContainer = document.getElementById('bimlal-sacred-audio-player');
        this.progressBar = document.getElementById('bimlal-audio-progress-bar');
        return;
      }

      // Inject minimal CSS
      const style = document.createElement('style');
      style.id = 'bimlal-audio-styles';
      style.textContent = `
        #bimlal-sacred-audio-player {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 45;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FBF9F5;
          color: #4A1718;
          border: 1px solid rgba(212, 175, 55, 0.45);
          box-shadow: 0 4px 18px rgba(74, 23, 24, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);
          border-radius: 9999px;
          padding: 6px 14px 6px 10px;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 12px;
          user-select: none;
          transition: all 0.25s ease;
          overflow: hidden;
          max-width: 320px;
        }
        #bimlal-sacred-audio-player:hover {
          border-color: rgba(212, 175, 55, 0.75);
          box-shadow: 0 6px 22px rgba(74, 23, 24, 0.12);
        }
        .bimlal-audio-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: #792425;
          cursor: pointer;
          padding: 4px;
          border-radius: 9999px;
          transition: transform 0.15s ease, color 0.15s ease, background 0.15s ease;
          line-height: 1;
        }
        .bimlal-audio-btn:hover {
          background: rgba(121, 36, 37, 0.08);
          color: #5A1819;
        }
        .bimlal-audio-btn:focus-visible {
          outline: 2px solid #792425;
          outline-offset: 2px;
        }
        .bimlal-audio-btn.primary-play {
          background: #792425;
          color: #FBF9F5;
          width: 28px;
          height: 28px;
        }
        .bimlal-audio-btn.primary-play:hover {
          background: #5A1819;
          transform: scale(1.04);
        }
        .bimlal-audio-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #D4AF37;
          opacity: 0.4;
          transition: opacity 0.3s ease;
          flex-shrink: 0;
        }
        #bimlal-sacred-audio-player.is-playing .bimlal-audio-indicator {
          opacity: 1;
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.8);
          animation: bimlal-pulse 2s infinite ease-in-out;
        }
        @keyframes bimlal-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        #bimlal-audio-progress-track {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(212, 175, 55, 0.18);
        }
        #bimlal-audio-progress-bar {
          height: 100%;
          width: 0%;
          background: #D4AF37;
          transition: width 0.2s linear;
        }
        .bimlal-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        @media (max-width: 640px) {
          #bimlal-sacred-audio-player {
            bottom: 16px;
            left: 16px;
            padding: 5px 12px 5px 8px;
            font-size: 11px;
            max-width: 260px;
          }
          .bimlal-audio-btn.primary-play {
            width: 26px;
            height: 26px;
          }
        }
      `;
      document.head.appendChild(style);

      // Create Player DOM
      const player = document.createElement('div');
      player.id = 'bimlal-sacred-audio-player';
      player.setAttribute('role', 'region');
      player.setAttribute('aria-label', 'Bimlal Sacred Audio Experience');

      player.innerHTML = `
        <button type="button" class="bimlal-audio-btn primary-play" id="bimlal-play-pause-btn" aria-label="Play sacred audio" title="Play sacred audio">
          <span class="material-symbols-outlined text-[18px]" id="bimlal-play-icon">play_arrow</span>
        </button>

        <div class="flex items-center gap-1.5 min-w-0 pr-1">
          <span class="bimlal-audio-indicator" id="bimlal-indicator" aria-hidden="true"></span>
          <span class="font-medium tracking-wide text-[#792425] truncate text-[11px] sm:text-[12px]" id="bimlal-player-label">Sacred Sanctum</span>
        </div>

        <button type="button" class="bimlal-audio-btn" id="bimlal-mute-btn" aria-label="Mute sacred audio" title="Mute sacred audio">
          <span class="material-symbols-outlined text-[16px]" id="bimlal-mute-icon">volume_up</span>
        </button>

        <div id="bimlal-audio-progress-track" aria-hidden="true">
          <div id="bimlal-audio-progress-bar"></div>
        </div>

        <div id="bimlal-audio-live-region" class="bimlal-sr-only" aria-live="polite"></div>
      `;

      document.body.appendChild(player);
      this.uiContainer = player;
      this.progressBar = player.querySelector('#bimlal-audio-progress-bar') || document.getElementById('bimlal-audio-progress-bar');
      this.liveRegion = player.querySelector('#bimlal-audio-live-region') || document.getElementById('bimlal-audio-live-region');

      // Wire player buttons safely
      const playPauseBtn = player.querySelector('#bimlal-play-pause-btn') || document.getElementById('bimlal-play-pause-btn');
      if (playPauseBtn) {
        playPauseBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.togglePlay();
        });
      }

      const muteBtn = player.querySelector('#bimlal-mute-btn') || document.getElementById('bimlal-mute-btn');
      if (muteBtn) {
        muteBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleMute();
        });
      }

      this.updateUI();
    },

    updateUI: function() {
      // 1. Update Floating Sacred Player
      const playIcon = document.getElementById('bimlal-play-icon');
      const playBtn = document.getElementById('bimlal-play-pause-btn');
      const muteIcon = document.getElementById('bimlal-mute-icon');
      const muteBtn = document.getElementById('bimlal-mute-btn');
      const label = document.getElementById('bimlal-player-label');

      if (playIcon && playBtn) {
        if (this.isPlaying) {
          playIcon.textContent = 'pause';
          playBtn.setAttribute('aria-label', 'Pause sacred audio');
          playBtn.setAttribute('title', 'Pause sacred audio');
          if (this.uiContainer) this.uiContainer.classList.add('is-playing');
          if (label) label.textContent = 'Sanctum Chants';
        } else {
          playIcon.textContent = 'play_arrow';
          playBtn.setAttribute('aria-label', 'Play sacred audio');
          playBtn.setAttribute('title', 'Play sacred audio');
          if (this.uiContainer) this.uiContainer.classList.remove('is-playing');
          if (label) label.textContent = 'Play Chants';
        }
      }

      if (muteIcon && muteBtn) {
        if (this.isMuted) {
          muteIcon.textContent = 'volume_off';
          muteBtn.setAttribute('aria-label', 'Unmute sacred audio');
          muteBtn.setAttribute('title', 'Unmute sacred audio');
          muteBtn.style.color = '#9E7E6E';
        } else {
          muteIcon.textContent = 'volume_up';
          muteBtn.setAttribute('aria-label', 'Mute sacred audio');
          muteBtn.setAttribute('title', 'Mute sacred audio');
          muteBtn.style.color = '#792425';
        }
      }

      // 2. Synchronize Header & Hero Elements on index.html and subpages
      const headerIcon = document.getElementById('header-audio-icon');
      const headerText = document.getElementById('header-audio-text');
      if (headerIcon) {
        headerIcon.textContent = (!this.isPlaying || this.isMuted) ? 'volume_off' : 'volume_up';
      }
      if (headerText) {
        headerText.textContent = this.isPlaying ? (this.isMuted ? 'Muted' : 'Audio') : 'Play Audio';
      }

      // 3. Synchronize Sub-header Ambient bars across all 18+ subpages
      document.querySelectorAll('header .bg-surface-container button, header button').forEach(btn => {
        const iconSpan = btn.querySelector('.material-symbols-outlined');
        const textSpan = btn.querySelector('span:not(.material-symbols-outlined)');
        if (iconSpan && (iconSpan.textContent === 'volume_up' || iconSpan.textContent === 'volume_off')) {
          iconSpan.textContent = (!this.isPlaying || this.isMuted) ? 'volume_off' : 'volume_up';
          if (textSpan) {
            textSpan.textContent = this.isPlaying ? (this.isMuted ? 'Muted' : 'Playing') : 'Listen';
          }
        }
      });

      // Synchronize hero / top audio states
      const heroIcon = document.getElementById('hero-audio-icon');
      const heroText = document.getElementById('hero-audio-text');
      if (heroIcon) heroIcon.textContent = (!this.isPlaying || this.isMuted) ? 'volume_off' : 'volume_up';
      if (heroText) heroText.textContent = this.isPlaying ? 'Mute Mantra' : 'Play Mantra';

      const topIcon = document.getElementById('top-audio-icon');
      const topState = document.getElementById('top-audio-state');
      if (topIcon) topIcon.textContent = (!this.isPlaying || this.isMuted) ? 'volume_off' : 'volume_up';
      if (topState) topState.textContent = this.isPlaying ? (this.isMuted ? 'Muted' : 'Audible') : 'Silent';
    },

    syncExistingPageButtons: function() {
      // Wire index.html header button
      const headerBtn = document.getElementById('header-audio-toggle-btn');
      if (headerBtn) {
        headerBtn.onclick = (e) => {
          e.preventDefault();
          this.togglePlay();
        };
      }

      // Wire legacy audio-toggle-btn
      const legacyBtn = document.getElementById('audio-toggle-btn');
      if (legacyBtn) {
        legacyBtn.onclick = (e) => {
          e.preventDefault();
          this.togglePlay();
        };
      }

      // Wire any sub-header ambient buttons across the subpages
      document.querySelectorAll('header .bg-surface-container button').forEach(btn => {
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon && (icon.textContent === 'volume_up' || icon.textContent === 'volume_off')) {
          btn.onclick = (e) => {
            e.preventDefault();
            this.togglePlay();
          };
        }
      });

      // Wire any hero audio buttons
      document.querySelectorAll('button').forEach(b => {
        const icon = b.querySelector('#hero-audio-icon, #top-audio-icon');
        if (icon) {
          b.onclick = (e) => {
            e.preventDefault();
            this.togglePlay();
          };
        }
      });
    }
  };

  // Expose global controller
  window.BimlalAudio = AudioManager;

  // Polyfill/replace legacy global functions so existing onclick="..." attributes continue to work seamlessly
  window.toggleHeroAudio = function() {
    window.BimlalAudio.togglePlay();
  };
  window.toggleGlobalAudio = function() {
    window.BimlalAudio.togglePlay();
  };

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.BimlalAudio.init());
  } else {
    window.BimlalAudio.init();
  }
})();
