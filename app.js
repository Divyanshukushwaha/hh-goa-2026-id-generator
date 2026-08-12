/**
 * Hacker House Goa '26 - Builder ID Generator Application Logic
 */

import { GOA_SUNSET_SVG, HH_MONOGRAM_SVG, GOA_MAP_SVG, DEFAULT_AVATAR_DATA_URL } from './assets/art.js';

// Random Titles Pool
const BUILDER_TITLES = [
  "THE CODE WIZARD",
  "BYTE ALCHEMIST",
  "PROMPT WHISPERER",
  "SHARD ARCHITECT",
  "SOLANA NINJA",
  "FULLSTACK VOODOO",
  "CYBER NOMAD",
  "ZERO KNOWLEDGE MASTER",
  "SMART CONTRACT GURU",
  "AI AGENT BUILDER",
  "GOA HACKER PRIME",
  "KERNEL CONDUCTOR",
  "DEEP DEV ALCHEMIST",
  "SYNTHWAVE ENGINEER"
];

// App State
const state = {
  format: 'B', // 'B' = ID Card, 'A' = PFP Frame
  userImage: null,
  zoom: 1,
  panX: 0,
  panY: 0,
  fullName: "DIVYANSHU KUSHWAHA",
  stack: "FULL-STACK / AI COMMUNITY BUILDER",
  title: "THE CODE WIZARD",
  qrCodeObj: null
};

// Featured Builders Initial Gallery Data
const featuredBuilders = [
  {
    name: "DIVYANSHU KUSHWAHA",
    title: "THE CODE WIZARD",
    stack: "FULL-STACK / AI COMMUNITY BUILDER",
    avatar: DEFAULT_AVATAR_DATA_URL
  },
  {
    name: "AARAV SHARMA",
    title: "SOLANA NINJA",
    stack: "RUST / WEB3 / DEFI",
    avatar: DEFAULT_AVATAR_DATA_URL
  },
  {
    name: "PRIYA VERMA",
    title: "AI AGENT BUILDER",
    stack: "PYTHON / LLMS / PYTORCH",
    avatar: DEFAULT_AVATAR_DATA_URL
  },
  {
    name: "ROHAN GUPTA",
    title: "ZERO KNOWLEDGE MASTER",
    stack: "CIRCOM / CRYPTO / PROTOCOLS",
    avatar: DEFAULT_AVATAR_DATA_URL
  },
  {
    name: "ANANYA PATEL",
    title: "CYBER NOMAD",
    stack: "UI/UX / FRONTEND / MOTION",
    avatar: DEFAULT_AVATAR_DATA_URL
  },
  {
    name: "VIKRAM SINGH",
    title: "BYTE ALCHEMIST",
    stack: "GO / DISTRIBUTED SYSTEMS",
    avatar: DEFAULT_AVATAR_DATA_URL
  }
];

// Initialize DOM and SVGs
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Inject Vector Assets
  document.getElementById('goaMapContainer').innerHTML = GOA_MAP_SVG;
  document.getElementById('navLogoIcon').innerHTML = HH_MONOGRAM_SVG;
  document.getElementById('cardHeaderArt').innerHTML = GOA_SUNSET_SVG;
  document.getElementById('cardBackLogo').innerHTML = HH_MONOGRAM_SVG;

  // Setup QR Code
  initQrCode();

  // Setup Event Listeners
  setupFormListeners();

  // Load Default Sample Avatar
  loadDefaultAvatar();

  // Render Initial Featured Gallery
  renderFeaturedGallery();
});

// Setup QR Code
function initQrCode() {
  const qrContainer = document.getElementById('cardQrCode');
  qrContainer.innerHTML = '';
  state.qrCodeObj = new QRCode(qrContainer, {
    text: "https://hhgoa2026.com/builder/divyanshu#FrameInGoa",
    width: 56,
    height: 56,
    colorDark: "#05180f",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

// Update QR Code content
function updateQrCode(text) {
  if (state.qrCodeObj) {
    state.qrCodeObj.clear();
    state.qrCodeObj.makeCode(`https://hhgoa2026.com/verify?name=${encodeURIComponent(text)}`);
  }
}

// Setup Form Listeners
function setupFormListeners() {
  const inputFullName = document.getElementById('inputFullName');
  const inputStack = document.getElementById('inputStack');
  const inputTitle = document.getElementById('inputTitle');
  const randomTitleBtn = document.getElementById('randomTitleBtn');

  // File Upload
  const fileInput = document.getElementById('fileInput');
  const uploadZone = document.getElementById('uploadZone');

  fileInput.addEventListener('change', handleFileSelect);

  // Drag & drop handlers
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
  });

  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  });

  // Photo Alignment Sliders
  const zoomSlider = document.getElementById('zoomSlider');
  const panXSlider = document.getElementById('panXSlider');
  const panYSlider = document.getElementById('panYSlider');
  const resetPhotoBtn = document.getElementById('resetPhotoBtn');

  zoomSlider.addEventListener('input', (e) => {
    state.zoom = parseFloat(e.target.value);
    drawAvatarCanvas();
  });

  panXSlider.addEventListener('input', (e) => {
    state.panX = parseFloat(e.target.value);
    drawAvatarCanvas();
  });

  panYSlider.addEventListener('input', (e) => {
    state.panY = parseFloat(e.target.value);
    drawAvatarCanvas();
  });

  resetPhotoBtn.addEventListener('click', () => {
    state.zoom = 1;
    state.panX = 0;
    state.panY = 0;
    zoomSlider.value = 1;
    panXSlider.value = 0;
    panYSlider.value = 0;
    drawAvatarCanvas();
  });

  // Text Inputs Sync
  inputFullName.addEventListener('input', (e) => {
    state.fullName = e.target.value || "YOUR NAME";
    document.getElementById('cardName').innerText = state.fullName.toUpperCase();
    updateQrCode(state.fullName);
  });

  inputStack.addEventListener('input', (e) => {
    state.stack = e.target.value || "STACK / ROLE";
    document.getElementById('cardStack').innerText = `STACK: ${state.stack.toUpperCase()}`;
  });

  inputTitle.addEventListener('input', (e) => {
    state.title = e.target.value || "BUILDER";
    document.getElementById('cardTitle').innerText = state.title.toUpperCase();
  });

  // Random Title Generator
  randomTitleBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * BUILDER_TITLES.length);
    const selectedTitle = BUILDER_TITLES[randomIndex];
    inputTitle.value = selectedTitle;
    state.title = selectedTitle;
    document.getElementById('cardTitle').innerText = selectedTitle;
  });

  // Buttons
  document.getElementById('downloadBtn').addEventListener('click', generateAndDownloadPNG);
  document.getElementById('shareBtn').addEventListener('click', shareToX);
}

// Set Format (A vs B)
window.setFormat = function(format) {
  state.format = format;
  const tabA = document.getElementById('tabFormatA');
  const tabB = document.getElementById('tabFormatB');

  if (format === 'A') {
    tabA.classList.add('active');
    tabB.classList.remove('active');
    // Format A PFP overlay adjustments
    document.querySelector('.card-photo-wrapper').style.borderRadius = '50%';
    document.getElementById('cardTitle').style.display = 'none';
  } else {
    tabB.classList.add('active');
    tabA.classList.remove('active');
    // Format B Badge ID adjustments
    document.querySelector('.card-photo-wrapper').style.borderRadius = '16px';
    document.getElementById('cardTitle').style.display = 'block';
  }
  drawAvatarCanvas();
};

// Flip Card Front/Back
window.toggleCardFlip = function() {
  const flipper = document.getElementById('cardFlipper');
  flipper.classList.toggle('flipped');
};

// File Selection Handler
function handleFileSelect(e) {
  if (e.target.files && e.target.files[0]) {
    processImageFile(e.target.files[0]);
  }
}

// Process Image File
function processImageFile(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      state.userImage = img;
      drawAvatarCanvas();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

// Load Default Avatar
function loadDefaultAvatar() {
  const img = new Image();
  img.onload = () => {
    state.userImage = img;
    drawAvatarCanvas();
  };
  img.src = DEFAULT_AVATAR_DATA_URL;
}

// Draw Avatar onto Canvas
function drawAvatarCanvas() {
  const canvas = document.getElementById('avatarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Clear Canvas
  ctx.clearRect(0, 0, width, height);

  // Background
  ctx.fillStyle = '#0a291a';
  ctx.fillRect(0, 0, width, height);

  if (!state.userImage) return;

  const img = state.userImage;
  const zoom = state.zoom;
  const panX = state.panX;
  const panY = state.panY;

  // Calculate cover scaling
  const scale = Math.max(width / img.width, height / img.height) * zoom;
  const x = (width - img.width * scale) / 2 + panX;
  const y = (height - img.height * scale) / 2 + panY;

  ctx.save();
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  ctx.restore();

  // If Format A: Draw PFP Frame Ring Overlay
  if (state.format === 'A') {
    ctx.save();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#ff2e8c';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2 - 6, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 4;
    ctx.strokeStyle = '#e5c158';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2 - 14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

// Generate & Download PNG High-Res Output
function generateAndDownloadPNG() {
  const exportCanvas = document.getElementById('exportCanvas');
  const ctx = exportCanvas.getContext('2d');

  // Scale factor for High DPI export
  const scale = 2;
  const cardW = 400 * scale;
  const cardH = 700 * scale;

  exportCanvas.width = cardW;
  exportCanvas.height = cardH;

  // 1. Background Fill
  ctx.fillStyle = '#071c12';
  ctx.fillRect(0, 0, cardW, cardH);

  // Inner card background
  ctx.fillStyle = '#0a291a';
  ctx.fillRect(10 * scale, 10 * scale, cardW - 20 * scale, cardH - 20 * scale);

  // 2. Dual Gold Border
  ctx.strokeStyle = '#e5c158';
  ctx.lineWidth = 4 * scale;
  ctx.strokeRect(10 * scale, 10 * scale, cardW - 20 * scale, cardH - 20 * scale);

  ctx.strokeStyle = '#b89635';
  ctx.lineWidth = 1.5 * scale;
  ctx.strokeRect(16 * scale, 16 * scale, cardW - 32 * scale, cardH - 32 * scale);

  // 3. Header Graphic (Goa Sunset Vector SVG rendered to Image)
  const headerImg = new Image();
  const svgBlob = new Blob([GOA_SUNSET_SVG], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  headerImg.onload = () => {
    ctx.drawImage(headerImg, 18 * scale, 18 * scale, cardW - 36 * scale, 200 * scale);
    URL.revokeObjectURL(url);

    // 4. Header Titles
    ctx.fillStyle = '#f5d77f';
    ctx.font = `900 ${22 * scale}px 'Cinzel', serif`;
    ctx.textAlign = 'center';
    ctx.fillText("HACKER HOUSE GOA '26", cardW / 2, 250 * scale);

    ctx.fillStyle = '#e5c158';
    ctx.font = `800 ${12 * scale}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText("OFFICIAL BUILDER ID", cardW / 2, 272 * scale);

    // 5. User Avatar Photo Slot
    const avatarSize = 160 * scale;
    const avatarX = (cardW - avatarSize) / 2;
    const avatarY = 295 * scale;

    // Draw Pink Frame
    ctx.fillStyle = '#ff2e8c';
    ctx.fillRect(avatarX - 4 * scale, avatarY - 4 * scale, avatarSize + 8 * scale, avatarSize + 8 * scale);

    // Draw Avatar Image from avatarCanvas
    const srcAvatarCanvas = document.getElementById('avatarCanvas');
    ctx.drawImage(srcAvatarCanvas, avatarX, avatarY, avatarSize, avatarSize);

    // 6. Name, Title & Stack Text
    ctx.fillStyle = '#f6f6ef';
    ctx.font = `900 ${24 * scale}px 'Cinzel', serif`;
    ctx.fillText(state.fullName.toUpperCase(), cardW / 2, 495 * scale);

    ctx.fillStyle = '#ff2e8c';
    ctx.font = `800 ${15 * scale}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText(state.title.toUpperCase(), cardW / 2, 525 * scale);

    ctx.fillStyle = '#f5d77f';
    ctx.font = `700 ${13 * scale}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText(`STACK: ${state.stack.toUpperCase()}`, cardW / 2, 555 * scale);

    // 7. Footer Chips & Hashtag
    ctx.fillStyle = '#e5c158';
    ctx.font = `800 ${12 * scale}px 'Plus Jakarta Sans', sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText("📅 OCT '26   📍 GOA   #FrameInGoa", 30 * scale, 645 * scale);

    // 8. Draw QR Code into output canvas
    const qrCanvas = document.querySelector('#cardQrCode canvas');
    if (qrCanvas) {
      ctx.drawImage(qrCanvas, cardW - 95 * scale, 600 * scale, 65 * scale, 65 * scale);
    }

    // Export & Download
    const downloadLink = document.createElement('a');
    downloadLink.download = `HH_Goa_2026_ID_${state.fullName.replace(/\s+/g, '_')}.png`;
    downloadLink.href = exportCanvas.toDataURL('image/png');
    downloadLink.click();

    // Automatically add created builder pass to gallery!
    addCreatedToGallery();
  };

  headerImg.src = url;
}

// Share to Twitter / X
function shareToX() {
  const text = encodeURIComponent(
    `Just created my Official Builder ID for Hacker House Goa '26! 🚀\n\nSee you in Goa! #FrameInGoa @HackerHouseGoa`
  );
  const shareUrl = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(shareUrl, '_blank');
}

// Render Featured Builders Gallery
function renderFeaturedGallery() {
  const grid = document.getElementById('buildersGrid');
  if (!grid) return;

  grid.innerHTML = featuredBuilders.map((builder) => `
    <div class="mini-builder-card">
      <div class="mini-card-header">
        <img src="${builder.avatar}" class="mini-avatar" alt="${builder.name}">
        <div>
          <div class="mini-name">${builder.name}</div>
          <div class="mini-title">${builder.title}</div>
          <div class="mini-stack">${builder.stack}</div>
        </div>
      </div>
      <div style="font-size: 0.65rem; color: var(--gold-light); font-weight: 700; text-align: right;">
        #FrameInGoa &bull; VERIFIED
      </div>
    </div>
  `).join('');
}

// Add newly created user pass to featured gallery list & show gallery section
function addCreatedToGallery() {
  const avatarCanvas = document.getElementById('avatarCanvas');
  const avatarData = avatarCanvas ? avatarCanvas.toDataURL() : DEFAULT_AVATAR_DATA_URL;

  // Unhide the Featured Builders gallery section
  const galleryElem = document.getElementById('gallery');
  if (galleryElem) {
    galleryElem.style.display = 'block';
  }

  featuredBuilders.unshift({
    name: state.fullName,
    title: state.title,
    stack: state.stack,
    avatar: avatarData
  });

  renderFeaturedGallery();

  // Smooth scroll down to the featured builders gallery
  setTimeout(() => {
    if (galleryElem) {
      galleryElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 300);
}
