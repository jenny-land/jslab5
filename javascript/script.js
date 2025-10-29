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

    //set video's initial volume
    leverage.volume = 0.5;

    /**
     * create the button event listeners to control the audio
     */

    ff.addEventListener("click", (e) => {
        lowRider.playbackRate = 2;
    });

    slo.addEventListener("click", (e) => {
        lowRider.playbackRate = 0.5;
    });

    normal.addEventListener("click", (e) => {
        lowRider.playbackRate = 1;
    });

    /**
     * select lists emit a "change" event when the choice is changed
     */
    pick.addEventListener("change", (e) => {
        // save the audio's current place in the song.
        let time = lowRider.currentTime;

        lowRider.src = e.target.value;
        lowRider.load();
        lowRider.play();

        // set the new song to the same place as the previous one.
        lowRider.currentTime = time;
    });
} // end init function
