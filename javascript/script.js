document.addEventListener("DOMContentLoaded", init);

function init() {
  /**
   * Shortcut variables
   */
  const lowRider = document.querySelector(".low-rider");
  const leverage = document.querySelector(".leverage");
  const ff = document.getElementById("ff");
  const slo = document.getElementById("slo");
  const normal = document.getElementById("normal");
  const pick = document.getElementById("pick");

  /**
   * prepare the audio and video for playing
   */
  lowRider.src = "a/money.mp3";
  lowRider.load();
  lowRider.volume = 0.5;

  leverage.volume = 0.5;

  /**
   * Audio control buttons
   */
  ff.addEventListener("click", () => (lowRider.playbackRate = 2));
  slo.addEventListener("click", () => (lowRider.playbackRate = 0.5));
  normal.addEventListener("click", () => (lowRider.playbackRate = 1));

  /**
   * Song picker
   */
  pick.addEventListener("change", (e) => {
    let time = lowRider.currentTime;
    lowRider.src = e.target.value;
    lowRider.load();
    lowRider.play();
    lowRider.currentTime = time;
  });

  /**
   * Subtitle setup
   */
  const video = document.getElementById("video");
  const subtitles = document.getElementById("subtitles");

  // hide all subtitles by default
  for (const track of video.textTracks) {
    track.mode = "hidden";
  }

  // Toggle subtitles on click
  subtitles.addEventListener("click", () => {
    let showing = false;
    for (const track of video.textTracks) {
      if (track.mode === "showing") {
        track.mode = "hidden";
      } else {
        track.mode = "showing";
        showing = true;
      }
    }
    subtitles.querySelector("span").style.backgroundColor = showing
      ? "white"
      : "black";
    subtitles.querySelector("span").style.color = showing ? "black" : "#666666";
  });
}