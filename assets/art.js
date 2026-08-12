/**
 * HH Goa '26 Vector Art & Asset Definitions
 */

// SVG Goa Beach Sunset Header Art for Card
export const GOA_SUNSET_SVG = `<svg viewBox="0 0 400 210" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Sky & Background Gradients -->
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#123d24"/>
      <stop offset="40%" stop-color="#1b5735"/>
      <stop offset="85%" stop-color="#d9822b"/>
      <stop offset="100%" stop-color="#e8a838"/>
    </linearGradient>
    
    <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff5cd"/>
      <stop offset="45%" stop-color="#f5c742"/>
      <stop offset="90%" stop-color="#e59828"/>
      <stop offset="100%" stop-color="#d97a1e" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0e3d23"/>
      <stop offset="50%" stop-color="#185233"/>
      <stop offset="100%" stop-color="#104227"/>
    </linearGradient>

    <linearGradient id="sandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dca954"/>
      <stop offset="100%" stop-color="#b58032"/>
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="400" height="210" fill="url(#skyGrad)"/>

  <!-- Sun Rays & Glow -->
  <circle cx="320" cy="85" r="70" fill="url(#sunGrad)" opacity="0.95"/>
  <circle cx="320" cy="85" r="48" fill="#fff3bd"/>

  <!-- Sun Rays Lines -->
  <g stroke="#f5c742" stroke-width="1.5" opacity="0.4" stroke-dasharray="4 3">
    <line x1="320" y1="10" x2="320" y2="160"/>
    <line x1="245" y1="85" x2="395" y2="85"/>
    <line x1="267" y1="32" x2="373" y2="138"/>
    <line x1="267" y1="138" x2="373" y2="32"/>
  </g>

  <!-- Distant Mountains/Hills -->
  <path d="M 180 135 Q 230 90 280 120 T 380 115 L 400 120 L 400 170 L 180 170 Z" fill="#13472b" opacity="0.9"/>
  <path d="M 240 125 Q 290 85 340 110 T 400 105 L 400 160 L 240 160 Z" fill="#0d331e"/>

  <!-- Ocean Water -->
  <path d="M 220 138 C 280 138 310 148 400 145 L 400 175 L 220 175 Z" fill="url(#waterGrad)"/>
  <!-- Sun reflections on water -->
  <path d="M 280 148 L 360 148 M 290 154 L 375 154 M 310 160 L 380 160" stroke="#f5c742" stroke-width="1.5" opacity="0.6"/>

  <!-- Curved Golden Beach Sand -->
  <path d="M 180 170 Q 280 155 380 185 L 400 190 L 400 210 L 180 210 Z" fill="url(#sandGrad)"/>

  <!-- Left Side Tropical Palm Trees & Hacker Shack Silhouette -->
  <!-- Beach Shack -->
  <path d="M 45 130 L 95 105 L 145 130 L 140 175 L 50 175 Z" fill="#092415"/>
  <path d="M 40 132 L 95 100 L 150 132" stroke="#d5ab4f" stroke-width="3" fill="none"/>
  <!-- Shack Window (Lit Pink/Cyan Neon) -->
  <rect x="65" y="138" width="22" height="24" rx="2" fill="#ff2e8c" opacity="0.9"/>
  <rect x="100" y="135" width="28" height="30" rx="2" fill="#00f0ff" opacity="0.8"/>
  <line x1="76" y1="138" x2="76" y2="162" stroke="#092415" stroke-width="1.5"/>
  <line x1="65" y1="150" x2="87" y2="150" stroke="#092415" stroke-width="1.5"/>

  <!-- Left Palm Tree 1 -->
  <path d="M 20 210 Q 30 140 12 70" stroke="#071b10" stroke-width="8" fill="none" stroke-linecap="round"/>
  <!-- Palm Leaves 1 -->
  <g fill="#0b2e1b" stroke="#d5ab4f" stroke-width="0.8">
    <path d="M 12 70 Q -15 50 -40 70 Q -10 75 12 70"/>
    <path d="M 12 70 Q 0 35 -15 15 Q 5 45 12 70"/>
    <path d="M 12 70 Q 35 30 60 40 Q 35 55 12 70"/>
    <path d="M 12 70 Q 45 65 65 85 Q 35 85 12 70"/>
    <path d="M 12 70 Q -25 80 -45 100 Q -15 90 12 70"/>
  </g>

  <!-- Left Palm Tree 2 (Taller) -->
  <path d="M 50 210 Q 55 120 40 40" stroke="#06180e" stroke-width="7" fill="none"/>
  <!-- Palm Leaves 2 -->
  <g fill="#0e3a22" stroke="#f5c742" stroke-width="1">
    <path d="M 40 40 Q 10 20 -20 35 Q 10 45 40 40"/>
    <path d="M 40 40 Q 35 5 20 -15 Q 35 20 40 40"/>
    <path d="M 40 40 Q 75 10 100 25 Q 70 38 40 40"/>
    <path d="M 40 40 Q 80 45 95 65 Q 65 60 40 40"/>
    <path d="M 40 40 Q 5 55 -25 70 Q 10 65 40 40"/>
  </g>

  <!-- Right Palm Tree Silhouette -->
  <path d="M 370 210 Q 360 140 375 80" stroke="#06180e" stroke-width="6" fill="none"/>
  <g fill="#0d3620" stroke="#d5ab4f" stroke-width="0.8">
    <path d="M 375 80 Q 340 60 310 75 Q 345 82 375 80"/>
    <path d="M 375 80 Q 360 45 345 25 Q 365 52 375 80"/>
    <path d="M 375 80 Q 405 50 430 65 Q 400 78 375 80"/>
    <path d="M 375 80 Q 410 90 425 110 Q 395 100 375 80"/>
  </g>

  <!-- Subtle Cyber Wire Grid Accent at Bottom Right -->
  <path d="M 0 205 L 400 205" stroke="#ff2e8c" stroke-width="1.5" opacity="0.8"/>
  <path d="M 0 208 L 400 208" stroke="#f5c742" stroke-width="1" opacity="0.6"/>
</svg>`;

// Gold HH Monogram SVG for Card Back & Logo
export const HH_MONOGRAM_SVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g fill="#e5c158" stroke="#b3913b" stroke-width="0.5">
    <!-- Left H stem -->
    <path d="M 20 20 L 32 20 L 32 45 L 48 45 L 48 20 L 60 20 L 60 80 L 48 80 L 48 55 L 32 55 L 32 80 L 20 80 Z"/>
    <!-- Interlocking Plane / Bridge -->
    <path d="M 40 47 L 50 38 L 60 47 L 55 53 L 45 53 Z" fill="#ff2e8c"/>
    <!-- Serifs -->
    <rect x="16" y="17" width="18" height="4" rx="1"/>
    <rect x="16" y="79" width="18" height="4" rx="1"/>
    <rect x="46" y="17" width="18" height="4" rx="1"/>
    <rect x="46" y="79" width="18" height="4" rx="1"/>
    <!-- Second H overlay offset -->
    <path d="M 60 30 L 68 30 L 68 48 L 78 48 L 78 30 L 86 30 L 86 75 L 78 75 L 78 56 L 68 56 L 68 75 L 60 75 Z" fill="#d5ab4f" opacity="0.9"/>
  </g>
</svg>`;

// Goa State Map Silhouette SVG for UI Background Overlay
export const GOA_MAP_SVG = `<svg viewBox="0 0 300 450" xmlns="http://www.w3.org/2000/svg">
  <path d="M 120 40 
           C 150 30, 180 50, 210 45 
           C 230 60, 250 90, 240 120 
           C 260 150, 275 190, 260 230 
           C 250 270, 220 310, 200 350 
           C 180 390, 150 420, 120 430 
           C 90 410, 70 370, 65 330 
           C 50 290, 60 250, 50 210 
           C 40 170, 55 130, 75 90 
           C 95 60, 100 45, 120 40 Z" 
        fill="#e5c158" stroke="#e5c158" stroke-width="2" stroke-dasharray="6 4"/>
</svg>`;

// Default sample profile avatar (Silhouette / Pattern)
export const DEFAULT_AVATAR_DATA_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%230f3623"/><circle cx="150" cy="110" r="55" fill="%23e5c158" opacity="0.4"/><path d="M 50 260 C 50 190 100 170 150 170 C 200 170 250 190 250 260 Z" fill="%23e5c158" opacity="0.4"/><circle cx="150" cy="110" r="50" fill="%2314482f"/><path d="M 55 260 C 55 195 102 175 150 175 C 198 175 245 195 245 260 Z" fill="%2314482f"/></svg>`;
