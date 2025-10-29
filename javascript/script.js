document.addEventListener("DOMContentLoaded", function () {
  const videoContainer = document.getElementById("video-container");
  const video = document.getElementById("video");
  const audio = document.getElementById("audio");

  /* --- VIDEO CONTROLS --- */
  const playPauseBtn = document.getElementById("play-pause");
  const muteBtn = document.getElementById("mute");
  const volUp = document.getElementById("vol-inc");
  const volDown = document.getElementById("vol-dec");
  const stopBtn = document.getElementById("stop");
  const fsBtn = document.getElementById("fs");
  const subtitlesButton = document.getElementById("subtitles");
  const subtitlesMenu = document.querySelector(".subtitles-menu");

  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
      if (video.paused || video.ended) {
        video.play();
        playPauseBtn.textContent = "Pause";
      } else {
        video.pause();
        playPauseBtn.textContent = "Play";
      }
    });
  }

  stopBtn.addEventListener("click", () => {
    video.pause();
    video.currentTime = 0;
    playPauseBtn.textContent = "Play";
  });

  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "Unmute" : "Mute";
  });

  volUp.addEventListener("click", () => {
    video.volume = Math.min(1, video.volume + 0.1);
  });

  volDown.addEventListener("click", () => {
    video.volume = Math.max(0, video.volume - 0.1);
  });

  fsBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  subtitlesButton.addEventListener("click", () => {
    if (subtitlesMenu) {
      subtitlesMenu.style.display =
        subtitlesMenu.style.display === "block" ? "none" : "block";
    }
  });

  /* --- VIDEO INFO --- */
  const infoDisplay = document.createElement("div");
  infoDisplay.className = "video-info";
  infoDisplay.innerHTML = `
    <span id="time-display">0:00 / 0:00</span>
    <span id="speed-display">Speed: 1x</span>
  `;
  videoContainer.appendChild(infoDisplay);

  const timeDisplay = infoDisplay.querySelector("#time-display");
  const speedDisplay = infoDisplay.querySelector("#speed-display");

  video.addEventListener("timeupdate", () => {
    const current = formatTime(video.currentTime);
    const duration = formatTime(video.duration);
    timeDisplay.textContent = `${current} / ${duration}`;
  });

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${secs}`;
  }

  function updateSpeedDisplay() {
    speedDisplay.textContent = `Speed: ${video.playbackRate.toFixed(1)}x`;
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === ">") {
      video.playbackRate += 0.25;
      updateSpeedDisplay();
    }
    if (e.key === "<" && video.playbackRate > 0.5) {
      video.playbackRate -= 0.25;
      updateSpeedDisplay();
    }
  });

  /* --- AUDIO CONTROLS --- */
  const ffBtn = document.getElementById("ff");
  const sloBtn = document.getElementById("slo");
  const normalBtn = document.getElementById("normal");
  const pickSelect = document.getElementById("pick");

  ffBtn.addEventListener("click", () => {
    audio.playbackRate = 1.5;
  });

  sloBtn.addEventListener("click", () => {
    audio.playbackRate = 0.75;
  });

  normalBtn.addEventListener("click", () => {
    audio.playbackRate = 1.0;
  });

  pickSelect.addEventListener("change", (e) => {
    if (e.target.value) {
      audio.src = e.target.value;
      audio.play();
    }
  });

  const audioInfo = document.createElement("div");
  audioInfo.className = "video-info";
  audioInfo.style.position = "relative";
  audioInfo.style.bottom = "auto";
  audioInfo.innerHTML = `
    <span id="audio-time">0:00 / 0:00</span>
    <span id="audio-speed">Speed: 1x</span>
  `;
  audio.parentElement.appendChild(audioInfo);

  const audioTime = audioInfo.querySelector("#audio-time");
  const audioSpeed = audioInfo.querySelector("#audio-speed");

  audio.addEventListener("timeupdate", () => {
    const current = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    audioTime.textContent = `${current} / ${duration}`;
  });

  function updateAudioSpeedDisplay() {
    audioSpeed.textContent = `Speed: ${audio.playbackRate.toFixed(1)}x`;
  }

  audio.addEventListener("ratechange", updateAudioSpeedDisplay);
});