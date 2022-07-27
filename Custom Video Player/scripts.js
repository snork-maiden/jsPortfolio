"use strict";
const player = document.querySelector(".player");
// const volumeRange = player.querySelector('input[name = "volume"]');
// const playbackRate = player.querySelector('input[name = "playbackRate"]');
const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip]");
const progressBar = player.querySelector(".progress__filled");
const progress = player.querySelector(".progress");
const toggle = player.querySelector(".toggle");
const video = player.querySelector(".viewer");
const fullscreen = player.querySelector(".fullscreen");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  const skipTime = +this.dataset.skip;
  video.currentTime += skipTime;
}

function updateProgress() {
  const percent = (this.currentTime / this.duration) * 100;
  progressBar.style.flexBasis = percent + "%";
}

function updateProgressBar(e) {
  const fraction = e.offsetX / progress.offsetWidth;
  video.currentTime = video.duration * fraction;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function openFullscreen() {
  if (video.fullscreenElement) {
    document.exitFullscreen();
  } else {
    video.requestFullscreen();
  }
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", updateProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mouseDown = false;
progress.addEventListener("click", updateProgressBar);
progress.addEventListener(
  "mousemove",
  (e) => mouseDown && updateProgressBar(e)
);
progress.addEventListener("mousedown", () => (mouseDown = true));
document.addEventListener("mouseup", () => (mouseDown = false));

fullscreen.addEventListener("click", openFullscreen);
