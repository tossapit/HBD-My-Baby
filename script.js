const giftButton = document.getElementById("giftButton");
const modal = document.getElementById("imageModal");
const audio = document.getElementById("birthdaySong");

// เรียกใช้งานการสร้างหัวใจที่ลอยได้ตั้งแต่เริ่มต้น
for (let i = 0; i < 20; i++) {
  createFloatingHeart();
}

// ตั้งค่าให้สร้างหัวใจใหม่ทุก 1 วินาที
setInterval(() => {
  createFloatingHeart();
}, 1000); // เปลี่ยนค่า 1000 เป็นระยะเวลาที่ต้องการ (มิลลิวินาที)

giftButton.addEventListener("click", function () {
  const images = [
    "img/46604_0.jpg",
    "img/46606_0.jpg",
    "img/46610_0.jpg",
    "img/46611_0.jpg",
    "img/46608_0.jpg",
    "img/46605_0.jpg",
    "img/46609_0.jpg",
    "img/46607_0.jpg",
    "img/46615_0.jpg",
    "img/46614_0.jpg",
    "img/46613_0.jpg",
    "img/46612_0.jpg",
    "img2/46604_0.jpg",
    "img2/46632_0.jpg",
    "img2/46633_0.jpg",
    "img2/46634_0.jpg",
    "img2/46635_0.jpg",
    "img2/46637_0.jpg",
    "img2/46638_0.jpg",
    "img2/46639_0.jpg",
    "img2/46640_0.jpg",
    "img2/46641_0.jpg",
    "img2/46642_0.jpg",
    "img2/46643_0.jpg",
    "img2/46644_0.jpg",
    "img2/46645_0.jpg",
    "img2/46646_0.jpg",
    "img2/46647_0.jpg",
    "img2/46648_0.jpg",
    "img2/46649_0.jpg",
    "img2/46650_0.jpg",
    "img2/46651_0.jpg",
    "img2/46652_0.jpg",
    "img2/46653_0.jpg",
    "img2/46654_0.jpg",
  ];

  modal.innerHTML = ""; // Clear previous images

  // Add images to modal
  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    modal.appendChild(img);
  });

  // Show the modal
  modal.classList.add("show");

  // Play the audio
  audio.play();

  // Start fireworks
  startFireworks();

  // Close modal when clicking outside images
  modal.addEventListener("click", function () {
    modal.classList.remove("show");
    //audio.pause();
    stopFireworks();
  });
});

function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.textContent = "❤️";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.animationDuration = Math.random() * 3 + 2 + "s"; // Random duration between 2-5 seconds
  document.body.appendChild(heart);

  // Remove heart after animation ends
  setTimeout(() => {
    heart.remove();
  }, 5000);
}

// Fireworks effect
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
let fireworks = [];
let animationFrame;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function startFireworks() {
  animationFrame = requestAnimationFrame(updateFireworks);
}

function stopFireworks() {
  cancelAnimationFrame(animationFrame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks = [];
}

function updateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.05) {
    fireworks.push(createFirework());
  }

  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw(ctx);

    if (firework.done) {
      fireworks.splice(index, 1);
    }
  });

  animationFrame = requestAnimationFrame(updateFireworks);
}

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const colors = ["#ff4d4d", "#ffcc00", "#00cc99", "#66ccff", "#ff66ff"];
  const particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push(
      new Particle(x, y, colors[Math.floor(Math.random() * colors.length)])
    );
  }

  return {
    particles: particles,
    done: false,
    update: function () {
      this.particles.forEach((particle) => particle.update());

      this.done = this.particles.every((particle) => particle.opacity <= 0);
    },
    draw: function (ctx) {
      this.particles.forEach((particle) => particle.draw(ctx));
    },
  };
}

function Particle(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = Math.random() * 3 + 1;
  this.speedX = Math.random() * 4 - 2;
  this.speedY = Math.random() * 4 - 2;
  this.gravity = 0.05;
  this.opacity = 1;

  this.update = function () {
    this.x += this.speedX;
    this.y += this.speedY + this.gravity;
    this.opacity -= 0.02;
  };

  this.draw = function (ctx) {
    ctx.fillStyle = `rgba(${hexToRgb(this.color)}, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  };
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}
