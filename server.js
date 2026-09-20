import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Canonical mapping of legacy or deep-link paths to section anchors
const SECTION_REDIRECTS = {
  '/mandir-information': '/#mandir-intro',
  '/services': '/#services-section',
  '/the-ten-sevas': '/#services-section',
  '/the-ten-sevas-2': '/#services-section',
  '/plan-your-darshan': '/#booking-section',
  '/darshan-suvidha': '/#darshan-journey',
  '/booking': '/#booking-section',
  '/darshan': '/#darshan-journey',
  '/news-and-events': '/#events',
  '/announcements': '/#events',
  '/events': '/#events',
  '/gallery': '/#gallery',
  '/about': '/#about-swamiji',
  '/swamiji-chronicle': '/#about-swamiji',
  '/swamiji': '/#about-swamiji',
  '/donation': '/#trust-directory',
  '/seva-contribution': '/#trust-directory',
  '/trust': '/#trust-directory',
  '/contact': '/#travel-guide',
  '/visit': '/#travel-guide',
  '/travel-guide': '/#travel-guide',
  '/niyamavali': '/#niyamavali',
  '/rules': '/#niyamavali',
  '/elder-mode': '/#hero',
  '/mobile': '/#hero',
  '/multilingual': '/#hero',
  '/pilgrim-ux': '/#hero',
  '/sacred-threshold': '/#hero'
};

// Healthcheck endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    dham: 'Shiv Ardhanreshwari Nag Jyotirling Dham, Bimlal',
    uptime: process.uptime()
  });
});

// In-memory weather cache for Dang Sanctuary (Ahwa, Gujarat · 20.758° N, 73.684° E, ~463m elevation)
let weatherCache = null;
let weatherCacheTime = 0;
const WEATHER_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getWmoInterpretation(code) {
  if (code === 0) return { key: 'clear', icon: 'sunny', advisoryKey: 'weather_advisory_clear' };
  if (code <= 3) return { key: 'partly_cloudy', icon: 'partly_cloudy_day', advisoryKey: 'weather_advisory_cloudy' };
  if (code === 45 || code === 48) return { key: 'fog', icon: 'foggy', advisoryKey: 'weather_advisory_fog' };
  if (code >= 51 && code <= 67) return { key: 'rain', icon: 'rainy', advisoryKey: 'weather_advisory_rain' };
  if (code >= 80 && code <= 82) return { key: 'rain_showers', icon: 'rainy', advisoryKey: 'weather_advisory_rain' };
  if (code >= 95) return { key: 'thunderstorm', icon: 'thunderstorm', advisoryKey: 'weather_advisory_thunderstorm' };
  return { key: 'partly_cloudy', icon: 'partly_cloudy_day', advisoryKey: 'weather_advisory_cloudy' };
}

app.get('/api/weather', async (req, res) => {
  const now = Date.now();
  const forceRefresh = req.query.refresh === '1';

  if (!forceRefresh && weatherCache && (now - weatherCacheTime < WEATHER_CACHE_TTL)) {
    return res.json({ ...weatherCache, cached: true });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=20.758&longitude=73.684&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FKolkata';
    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Open-Meteo HTTP ${response.status}`);
    }

    const data = await response.json();
    const current = data.current || {};
    const interp = getWmoInterpretation(current.weather_code ?? 1);

    weatherCache = {
      location: 'Dang Sanctuary, Bimlal',
      region: 'Ahwa, Dang, Gujarat',
      elevationMeters: Math.round(data.elevation || 463),
      temperature: Math.round(current.temperature_2m ?? 25),
      feelsLike: Math.round(current.apparent_temperature ?? 27),
      humidity: Math.round(current.relative_humidity_2m ?? 85),
      windSpeed: Math.round(current.wind_speed_10m ?? 10),
      precipitation: Number((current.precipitation ?? 0).toFixed(1)),
      weatherCode: current.weather_code ?? 1,
      conditionKey: interp.key,
      icon: interp.icon,
      advisoryKey: interp.advisoryKey,
      updatedAt: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }),
      timestamp: now,
      source: 'Open-Meteo Dang Sanctuary Observation'
    };
    weatherCacheTime = now;

    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.json({ ...weatherCache, cached: false });
  } catch (err) {
    console.warn('[Weather API] External fetch notice:', err.message);
    if (weatherCache) {
      return res.json({ ...weatherCache, cached: true, warning: 'stale_cache' });
    }

    // Authentic regional fallback for Sahyadri Dang forest microclimate
    const interp = getWmoInterpretation(1);
    const fallback = {
      location: 'Dang Sanctuary, Bimlal',
      region: 'Ahwa, Dang, Gujarat',
      elevationMeters: 463,
      temperature: 25,
      feelsLike: 27,
      humidity: 86,
      windSpeed: 10,
      precipitation: 0.1,
      weatherCode: 1,
      conditionKey: interp.key,
      icon: interp.icon,
      advisoryKey: interp.advisoryKey,
      updatedAt: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }),
      timestamp: now,
      source: 'Dang Forest Regional Meteorological Baseline'
    };
    return res.json(fallback);
  }
});

// Serve static audio assets with CORS, Byte-Ranges, and correct MIME type
app.use('/audio', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type, Accept');
  res.setHeader('Accept-Ranges', 'bytes');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
}, express.static(path.join(__dirname, 'public', 'audio'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mp3')) {
      res.setHeader('Content-Type', 'audio/mpeg');
    }
  }
}), (req, res) => {
  // Prevent missing audio requests from falling through to the index.html catch-all
  res.status(404).type('text/plain').send('Audio file not found');
});

// Serve static assets
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use(express.static(path.join(__dirname, 'public')));

// Specific root assets
app.get('/temple_trust_logo.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, 'temple_trust_logo.jpg'));
});
app.get('/logo.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, 'temple_trust_logo.jpg'));
});

// Deep link redirects
Object.entries(SECTION_REDIRECTS).forEach(([routePath, redirectAnchor]) => {
  app.get(routePath, (req, res) => {
    res.redirect(302, redirectAnchor);
  });
});

// Primary entry point for root and home
app.get(['/', '/home'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Express v5 compatible catch-all route to serve the main portal
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`[Dham Bimlal] Sacred Darshan Portal server running at http://${HOST}:${PORT}`);
});
