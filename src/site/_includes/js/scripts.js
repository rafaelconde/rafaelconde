function initMeetingTicks() {
  const ticks = document.querySelectorAll(".tick");
  const easterEgg = document.getElementById("easterNope");

  if (!ticks.length || !easterEgg) {
    return;
  }

  const popOut = () => {
    easterEgg.className = "popout";
  };

  ticks.forEach((tick) => {
    tick.addEventListener("click", () => {
      easterEgg.className = "popin";
      window.setTimeout(popOut, 3000);
    });
  });
}

function parseColor(color) {
  return color
    .match(/\((.*)\)/)[1]
    .split(",")
    .slice(0, 3)
    .map((value) => parseInt(value, 10));
}

function initThemeColorObserver() {
  const theme = document.querySelector('meta[name="theme-color"]');
  const sections = document.querySelectorAll("[data-theme-color]");

  if (!theme || !sections.length) {
    return;
  }

  let currentThemeColor = "rgb(255,255,255)";
  let activeFrame = 0;
  let activeTarget = currentThemeColor;

  const startColorFade = (duration, targetColor) => {
    if (targetColor === currentThemeColor || targetColor === activeTarget) {
      return;
    }

    const from = parseColor(currentThemeColor);
    const to = parseColor(targetColor);
    const start = performance.now();

    activeTarget = targetColor;

    if (activeFrame) {
      cancelAnimationFrame(activeFrame);
    }

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const next = from.map((value, index) => Math.round(value + (to[index] - value) * progress));
      theme.setAttribute("content", "rgb(" + next.join(",") + ")");

      if (progress < 1) {
        activeFrame = requestAnimationFrame(step);
        return;
      }

      currentThemeColor = targetColor;
      activeTarget = targetColor;
      activeFrame = 0;
    };

    activeFrame = requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startColorFade(300, entry.target.getAttribute("data-theme-color"));
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "10% 0px -90% 0px"
  });

  sections.forEach((section) => {
    observer.observe(section);
  });
}

function initLazyVideos() {
  const videos = document.querySelectorAll("video[data-video-src]");

  if (!videos.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const loadVideo = (video) => {
    if (video.dataset.loaded === "true") {
      return;
    }

    video.src = video.dataset.videoSrc;
    video.load();
    video.dataset.loaded = "true";
  };

  const playVideo = (video) => {
    if (prefersReducedMotion && video.dataset.allowMotion !== "true") {
      return;
    }

    const playAttempt = video.play();

    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {});
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;

      if (entry.isIntersecting) {
        loadVideo(video);
        playVideo(video);
        return;
      }

      if (!video.paused) {
        video.pause();
      }
    });
  }, {
    threshold: 0.01,
    rootMargin: "400px 0px"
  });

  videos.forEach((video) => {
    observer.observe(video);
  });
}

function initThwipHoverAudio() {
  const video = document.getElementById("thwip-video");

  if (!video) {
    return;
  }

  video.addEventListener("mouseenter", () => {
    video.muted = false;
  });

  video.addEventListener("mouseleave", () => {
    video.muted = true;
  });
}

function initMyriadLoader() {
  const galaxySection = document.querySelector(".section.galaxy");

  if (!galaxySection) {
    return;
  }

  const assetVersion = document.documentElement.dataset.assetVersion;
  let loaded = false;

  const loadMyriad = () => {
    if (loaded) {
      return;
    }

    loaded = true;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/myriad.css" + (assetVersion ? "?v=" + assetVersion : "");
    document.head.appendChild(link);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadMyriad();
        observer.disconnect();
      }
    });
  }, {
    rootMargin: "600px 0px"
  });

  observer.observe(galaxySection);
}

function minMaxValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function initSpatialtyParallax() {
  const element = document.querySelector(".appIcon");

  if (!element || !window.matchMedia("(hover: hover)").matches) {
    return;
  }

  const degrees = 8;
  let pendingPointer = null;
  let frame = 0;

  const update = () => {
    frame = 0;

    if (!pendingPointer) {
      return;
    }

    const icon = element.getBoundingClientRect();
    const halfSize = icon.width / 2;
    const xDist = minMaxValue(-(icon.x - pendingPointer.x + halfSize), -halfSize, halfSize);
    const yDist = minMaxValue(icon.y - pendingPointer.y + halfSize, -halfSize, halfSize);
    const x = Math.round(xDist / (halfSize / 100)) / 100;
    const y = Math.round(yDist / (halfSize / 100)) / 100;

    element.style.transform = "rotateX(" + (y * degrees) + "deg) rotateY(" + (x * degrees) + "deg)";
  };

  window.addEventListener("pointermove", (pointer) => {
    pendingPointer = pointer;

    if (!frame) {
      frame = requestAnimationFrame(update);
    }
  }, { passive: true });
}

initMeetingTicks();
initThemeColorObserver();
initLazyVideos();
initThwipHoverAudio();
initMyriadLoader();
initSpatialtyParallax();
