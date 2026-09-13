/**
 * Shree Shiv Ardhanreshwari Nag Jyotirling Dham, Bimlal Sanctuary
 * Official Sacred Audio Configuration
 * 
 * CENTRALIZED AUDIO SOURCE SPECIFICATION:
 * If the Temple Trust provides a new authentic recording:
 * 1. Place the new file in public/audio/ (e.g. public/audio/bimlal-official-audio.mp3)
 * 2. If the filename or path changes, update AUDIO_SOURCE below.
 * No UI components or page templates need to be modified.
 */

window.BIMLAL_AUDIO_CONFIG = {
  // Central audio file path
  AUDIO_SOURCE: '/audio/bimlal-official-audio.mp3',
  
  // Sacred title announced to screen readers and displayed subtly
  TITLE: 'Sacred Sanctum Chants · Shiv Ardhanreshwari Dham',
  
  // Performance: Auto-preload for instant autoplay on open
  PRELOAD: 'auto',
  
  // Initial volume level (0.0 to 1.0)
  DEFAULT_VOLUME: 0.8,
  
  // Continuous sanctum loop
  LOOP: true,

  // Autoplay automatically when website opens, playing from starting
  AUTOPLAY: true
};
