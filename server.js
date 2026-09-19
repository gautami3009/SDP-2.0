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

// Serve static assets
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/audio', express.static(path.join(__dirname, 'public', 'audio')));
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
