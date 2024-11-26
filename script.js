const canvas = document.getElementById("watermarkCanvas");
const ctx = canvas.getContext("2d");

const imageUpload = document.getElementById("imageUpload");
const watermarkText = document.getElementById("watermarkText");
const applyWatermarkBtn = document.getElementById("applyWatermark");
const saveImageBtn = document.getElementById("saveImage");

let img = new Image();
let watermark = "";

imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);

  console.log("Image loaded successfully");
};

function applyFullPageWatermark() {
  watermark = watermarkText.value;
  if (!watermark) {
    return alert("Please enter watermark text.");
  }

  console.log("Applying watermark:", watermark);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  ctx.font = "30px Arial";
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.textAlign = "center";

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((-45 * Math.PI) / 180);

  const spacing = 100;
  const textWidth = ctx.measureText(watermark).width;

  for (let y = -canvas.height; y < canvas.height * 2; y += spacing) {
    for (
      let x = -canvas.width;
      x < canvas.width * 2;
      x += textWidth + spacing
    ) {
      ctx.fillText(watermark, x - canvas.width / 2, y - canvas.height / 2);
    }
  }

  ctx.restore();
  console.log("Full-page watermark applied.");
}

applyWatermarkBtn.addEventListener("click", applyFullPageWatermark);

saveImageBtn.addEventListener("click", () => {
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "watermarked_image.png";
  link.click();
  console.log("Image saved");
});
