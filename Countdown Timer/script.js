"use strict";
const timerButtons = document.querySelectorAll(".timer__button");
const minutesInput = document.querySelector("input");
const endTime = document.querySelector(".display__end-time");
const countdown = document.querySelector(".display__time-left");
let countStop;

function timer(seconds) {
  clearInterval(countStop);
  const start = Date.now();
  const end = new Date(start + seconds * 1000);

  function setCountdown() {
    const timeLeft = new Date(Math.round((end - Date.now()) / 1000) * 1000);
    if (timeLeft < 0) {
      clearInterval(countStop);
      return;
    }
    countdown.textContent =
      timeComponentToString(timeLeft) +
      ":" +
      timeComponentToString(timeLeft, "seconds");
  }
  setCountdown();
  countStop = setInterval(setCountdown, 1000);

  endTime.textContent =
    "Be back at " + end.getHours() + ":" + timeComponentToString(end);
}

function timeComponentToString(date, component = "minutes") {
  if (component === "minutes") {
    return date.getMinutes() >= 10
      ? date.getMinutes()
      : "0" + date.getMinutes();
  }
  if (component === "seconds") {
    return date.getSeconds() >= 10
      ? date.getSeconds()
      : "0" + date.getSeconds();
  }
}

timerButtons.forEach((button) =>
  button.addEventListener("click", function () {
    timer(button.dataset.time);
  })
);

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const seconds = (minutesInput.value && Number(minutesInput.value)) * 60;
  if (!seconds) return;
  timer(seconds);
  this.reset();
});
