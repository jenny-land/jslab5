document.addEventListener("DOMContentLoaded", function () {
  /* ---------------------------
     VIDEO PLAYER CONTROLS
  --------------------------- */
  const video = document.getElementById("video");
  const videoContainer = document.getElementById("video-container");
  const playPause = document.getElementById("play-pause");
  const stopBtn = document.getElementById("stop");
  const muteBtn = document.getElementById("mute");
  const volInc = document.getElementById("vol-inc");
  const volDec = document.getElementById("vol-dec");
  const fsBtn = document.getElementById("fs");
  const progress = document.getElementById("progress");
  const subtitlesBtn = document.getElementById("subtitles");

  /* --- SUBTITLE MENU --- */
  const subtitleMenuButtons = [];
  let subtitlesMenu;

  if (video.textTracks) {
    const df = document.createDocumentFragment();
    subtitlesMenu = df.appendChild(document.createElement("ul"));
    subtitlesMenu.className = "subtitles-menu";
    subtitlesMenu.appendChild(createMenuItem("subtitles-off", "", "Off"));
    for (const track of video.textTracks) {
      subtitlesMenu.appendChild(
        createMenuItem(`subtitles-${track.language}`, track.language, track.label)
      );
    }
    videoContainer.appendChild(subtitlesMenu);
  }

  function createMenuItem(id, lang, label) {
    const listItem = document.createElement("li");
    const button = listItem.appendChild(document.createElement("button"));
    button.setAttribute("id", id);
    button.className = "subtitles-button";
    if (lang.length > 0) button.setAttribute("lang", lang);
    button.value = label;
    button.setAttribute("data-state", "inactive");
    button.appendChild(document.createTextNode(label));

    button.addEventListener("click", () => {
      subtitleMenuButtons.forEach((b) => b.setAttribute("data-state", "inactive"));
      const lang = button.getAttribute("lang");
      for (const track of video.textTracks) {
        track.mode = track.language === lang ? "showing" : "hidden";
      }
      button.setAttribute("data-state", "active");
      subtitlesMenu.style.display = "none";
    });

    subtitleMenuButtons.push(button);
    return listItem;
  }

  subtitlesBtn.addEventListener("click", () => {
    if (subtitlesMenu) {
      subtitlesMenu.style.display =
        subtitlesMenu.style.display === "block" ? "none" : "block";
    }
  });

  /* --- BASIC CONTROLS --- */
  playPause.addEventListener("click", () => {
    if (video.paused || video.ended) {
      video.play();
      playPause.textContent = "Pause";
    } else {
      video.pause();
      playPause.textContent = "Play";
    }
  });

  stopBtn.addEventListener("click", () => {
    video.pause();
    video.currentTime = 0;
    playPause.textContent = "Play";
  });

  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "Unmute" : "Mute";
  });

  volInc.addEventListener("click", () => {
    if (video.volume < 1) video.volume = Math.min(1, video.volume + 0.1);
  });

  volDec.addEventListener("click", () => {
    if (video.volume > 0) video.volume = Math.max(0, video.volume - 0.1);
  });

  fsBtn.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoContainer.requestFullscreen();
    }
  });

  /* --- PROGRESS BAR --- */
  video.addEventListener("timeupdate", () => {
    progress.value = (video.currentTime / video.duration) * 100;
  });

  progress.addEventListener("click", (e) => {
    const rect = progress.getBoundingClientRect();
    const clickPos = (e.clientX - rect.left) / rect.width;
    video.currentTime = clickPos * video.duration;
  });

  /* --- CUSTOM EVENTS --- */
  video.addEventListener("ended", () => {
    alert("Playback finished! Replay?");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      video.currentTime = Math.max(0, video.currentTime - 5);
    }
    if (e.key === ">") video.playbackRate += 0.25;
    if (e.key === "<" && video.playbackRate > 0.5) video.playbackRate -= 0.25;
  });

  const infoTrack = video.addTextTrack("captions", "Info", "en");
  infoTrack.addCue(new VTTCue(0, 4, "Welcome! Use CC to toggle captions."));
  infoTrack.addCue(new VTTCue(4, 10, "Use ArrowLeft to go back 5 seconds."));
  infoTrack.mode = "hidden";

  /* ---------------------------
     AUDIO PLAYER CONTROLS
  --------------------------- */
  const audio = document.querySelector("audio.low-rider");
  const ffBtn = document.getElementById("ff");
  const sloBtn = document.getElementById("slo");
  const normalBtn = document.getElementById("normal");
  const picker = document.getElementById("pick");

  // Fast Forward (skip ahead 10 seconds)
  ffBtn.addEventListener("click", () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  });

  // Slow Motion (half speed)
  sloBtn.addEventListener("click", () => {
    audio.playbackRate = 0.5;
  });

  // Normal speed
  normalBtn.addEventListener("click", () => {
    audio.playbackRate = 1.0;
  });

  // Load new audio source
  picker.addEventListener("change", (e) => {
    const selected = e.target.value;
    if (selected) {
      audio.src = selected;
      audio.play();
    }
  });

  // Sync UI with events
  audio.addEventListener("play", () => {
    ffBtn.disabled = false;
    sloBtn.disabled = false;
    normalBtn.disabled = false;
  });

  audio.addEventListener("pause", () => {
    console.log("Audio paused");
  });

  audio.addEventListener("ended", () => {
    alert("Audio finished playing!");
  });
});
