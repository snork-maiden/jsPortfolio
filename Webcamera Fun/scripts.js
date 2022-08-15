const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    let levels = {};

    document.querySelectorAll(".range").forEach((input) => {
      levels[input.name] = +input.value;
    });

    ctx.globalAlpha = Math.abs(levels.globalAlpha) / 10;
    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = rgbSplit(pixels, levels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img class="strip__image" src="${data}" alt="Beauty">`;
  strip.insertBefore(link, strip.firstChild);
}

function rgbSplit(pixels, levels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + levels.red] = pixels.data[i + 0]; // RED
    pixels.data[i + levels.green + 1] = pixels.data[i + 1]; // GREEN
    pixels.data[i + levels.blue + 2] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}


getVideo();
video.addEventListener("canplay", paintToCanvas);
