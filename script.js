document.addEventListener("DOMContentLoaded", () => {
  /** ✅ 1. Splash Screen Particle Text **/
  const splashCanvas = document.getElementById("particle-canvas");
  const splashCtx = splashCanvas.getContext("2d");
  splashCanvas.width = window.innerWidth;
  splashCanvas.height = window.innerHeight;

  let particles = [];
  const splashText = "EchoClone AI";
  const fontSize = 100;

  function createTextPoints() {
    splashCtx.clearRect(0, 0, splashCanvas.width, splashCanvas.height);
    splashCtx.font = `${fontSize}px Arial Black`;
    splashCtx.fillStyle = "white";
    splashCtx.textAlign = "center";
    splashCtx.fillText(splashText, splashCanvas.width / 2, splashCanvas.height / 2);

    const imageData = splashCtx.getImageData(0, 0, splashCanvas.width, splashCanvas.height);
    const dots = [];
    for (let y = 0; y < splashCanvas.height; y += 4) {
      for (let x = 0; x < splashCanvas.width; x += 4) {
        const index = (y * splashCanvas.width + x) * 4;
        if (imageData.data[index + 3] > 128) dots.push({ x, y });
      }
    }
    return dots;
  }

  const textPoints = createTextPoints();
  function createParticles() {
    particles = [];
    for (let i = 0; i < textPoints.length; i++) {
      particles.push({
        x: Math.random() * splashCanvas.width,
        y: Math.random() * splashCanvas.height,
        targetX: textPoints[i].x,
        targetY: textPoints[i].y,
        size: 2,
        color: ["#2e27a5", "#ff6161", "#9627a5"][Math.floor(Math.random() * 3)]
      });
    }
  }

  function animateText() {
    splashCtx.clearRect(0, 0, splashCanvas.width, splashCanvas.height);
    particles.forEach((p) => {
      p.x += (p.targetX - p.x) * 0.05;
      p.y += (p.targetY - p.y) * 0.05;
      splashCtx.beginPath();
      splashCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      splashCtx.fillStyle = p.color;
      splashCtx.fill();
    });
    requestAnimationFrame(animateText);
  }

  createParticles();
  animateText();

  // ✅ Hide splash after 4 seconds
  setTimeout(() => {
    document.getElementById("splash").classList.add("fade-out");
    setTimeout(() => {
      document.getElementById("splash").style.display = "none";
      document.getElementById("main-content").style.display = "block";
      document.body.style.overflow = "auto";
    }, 1000);
  }, 4000);

  /** ✅ 2. Header Scroll Hide/Show **/
  let lastScroll = 0;
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    header.classList.toggle("hidden", currentScroll > lastScroll);
    lastScroll = currentScroll;
  });
});




