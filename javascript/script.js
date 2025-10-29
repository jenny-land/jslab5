document.addEventListener("DOMContentLoaded", init);

function init() {
  // --- AUDIO SETUP ---
  const lowRider = document.querySelector(".low-rider");
  const leverage = document.querySelector(".leverage");
  const ff = document.getElementById("ff");
  const slo = document.getElementById("slo");
  const normal = document.getElementById("normal");
  const pick = document.getElementById("pick");

  lowRider.src = "a/low-rider.mp3";
  lowRider.load();
  lowRider.volume = 0.5;

  if (leverage) leverage.volume = 0.5;

  ff.addEventListener("click", () => (lowRider.playbackRate = 2));
  slo.addEventListener("click", () => (lowRider.playbackRate = 0.5));
  normal.addEventListener("click", () => (lowRider.playbackRate = 1));

  pick.addEventListener("change", (e) => {
    let time = lowRider.currentTime;
    lowRider.src = e.target.value;
    lowRider.load();
    lowRider.play();
    lowRider.currentTime = time;
  });

  // --- VIDEO SETUP WITH SUBTITLES ---
  const video = document.getElementById("video");
  const subtitles = document.getElementById("subtitles");
  const videoContainer = document.getElementById("video-container");

  // Hide all subtitles initially
  for (const track of video.textTracks) {
    track.mode = "hidden";
  }

  const subtitleMenuButtons = [];
  let subtitlesMenu;

  // Build subtitle menu dynamically
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

  // Create subtitle menu items
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
      subtitleMenuButtons.forEach((btn) =>
        btn.setAttribute("data-state", "inactive")
      );

      const lang = button.getAttribute("lang");

      for (const track of video.textTracks) {
        if (track.language === lang) {
          track.mode = "showing";
          button.setAttribute("data-state", "active");
        } else {
          track.mode = "hidden";
        }
      }

      subtitlesMenu.style.display = "none";
    });

    subtitleMenuButtons.push(button);
    return listItem;
  }

  // Toggle subtitle menu visibility
  subtitles.addEventListener("click", () => {
    if (subtitlesMenu) {
      subtitlesMenu.style.display =
        subtitlesMenu.style.display === "block" ? "none" : "block";
    }
  });
}