const slides = [
  {
    title: "Hai, ini buat kamu ✨",
    text: "Selamat ulang tahun ya, cintaku. Hari ini adalah harimu, dan aku cuma mau kamu tahu: kamu itu hadiah terindah dalam hidupku.",
    images: ["../img/1.jpeg", "../img/2.jpeg", "../img/3.jpeg"],
    stickers: ["for my favorite person", "💖", "make a wish!", "special day"],
  },
  {
    title: "Terima kasih sudah hadir",
    text: "Terima kasih sudah jadi rumah paling nyaman, tempat aku pulang, cerita, dan tertawa. Kamu bikin hidupku jauh lebih berwarna.",
    images: ["../img/4.jpeg", "../img/5.jpeg", "../img/6.jpeg"],
    stickers: ["happy vibes", "✨", "best moment", "my comfort"],
  },
  {
    title: "Semoga bahagiamu penuh",
    text: "Di umur yang baru ini, aku doain langkahmu selalu dimudahkan, hatimu selalu tenang, dan mimpimu satu per satu jadi nyata.",
    images: ["../img/7.jpeg", "../img/8.jpeg", "../img/9.jpeg"],
    stickers: ["Januari vibes", "🎂", "smile always", "good luck"],
  },
  {
    title: "I love you, always 💙",
    text: "Aku suka semua tentang kamu: caramu peduli, caramu sabar, dan cara kamu selalu bikin aku merasa dicintai setiap hari.",
    images: ["../img/10.jpeg", "../img/11.jpeg", "../img/12.jpeg"],
    stickers: ["I love you", "💙", "you + me", "forever"],
  },
  {
    title: "Reason why I love you",
    text: "Karena kamu sederhana tapi tulus. Karena kamu kuat tapi lembut. Karena kamu bukan cuma pasangan, tapi juga sahabat terbaikku.",
    images: ["../img/13.jpeg", "../img/14.jpeg", "../img/15.jpeg"],
    stickers: ["reason why", "🌟", "kind heart", "my best friend"],
  },
  {
    title: "Our little moments",
    text: "Foto-foto ini mungkin sederhana, tapi setiap momennya selalu bikin aku senyum. Sama kamu, hal kecil pun terasa sangat berarti.",
    images: ["../img/16.jpeg", "../img/17.jpeg", "../img/18.jpeg"],
    stickers: ["our moment", "📸", "tiny but precious", "xoxo"],
  },
  {
    title: "For your next chapter",
    text: "Semoga tahun ini kamu makin bersinar, makin sehat, makin sukses, dan selalu dikelilingi hal-hal baik yang kamu pantas dapatkan.",
    images: ["../img/19.jpeg", "../img/20.jpeg", "../img/21.jpeg"],
    stickers: ["new chapter", "🚀", "you got this", "proud of you"],
  },
  {
    title: "Happy Birthday, My Favorite Person 🎂",
    text: "Aku bangga punya kamu. Tetap jadi kamu yang hangat, baik hati, dan penuh cinta. Aku selalu ada buat kamu, hari ini dan seterusnya. Love you so much!",
    images: ["../img/3.jpeg", "../img/11.jpeg", "../img/21.jpeg"],
    stickers: ["HAPPY BIRTHDAY", "🎉", "love you so much", "my always"],
  },
];

const slideCard = document.getElementById("slideCard");
const introScreen = document.getElementById("introScreen");
const mainPresentation = document.getElementById("mainPresentation");
const envelopeBtn = document.getElementById("envelopeBtn");
const envelopeFlap = document.getElementById("envelopeFlap");
const diaryBook = document.getElementById("diaryBook");
const openDiaryBtn = document.getElementById("openDiaryBtn");
const slideTag = document.getElementById("slideTag");
const slideTitle = document.getElementById("slideTitle");
const slideText = document.getElementById("slideText");
const photoGrid = document.getElementById("photoGrid");
const stickerLayer = document.getElementById("stickerLayer");
const dotsWrap = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const audioBtn = document.getElementById("audioBtn");
const bgMusic = document.getElementById("bgMusic");

let current = 0;
let autoTimer = null;
let introOpened = false;

function createDots() {
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Buka slide ${i + 1}`);
    dot.addEventListener("click", () => {
      current = i;
      renderSlide();
      restartAuto();
    });
    dotsWrap.appendChild(dot);
  });
}

function renderSlide() {
  const data = slides[current];
  slideTag.textContent = `Slide ${current + 1} / ${slides.length}`;
  slideTitle.textContent = data.title;
  slideText.textContent = data.text;

  slideCard.classList.toggle("is-first-slide", current === 0);

  const photoCards = photoGrid.querySelectorAll(".photo-card img");
  photoCards.forEach((img, i) => {
    img.src = data.images[i] || data.images[0];
    img.alt = `${data.title} foto ${i + 1}`;
  });

  stickerLayer.innerHTML = "";
  const activeStickers = current === 0 ? [] : data.stickers;
  activeStickers.forEach((text, i) => {
    const el = document.createElement("span");
    el.className = `sticker t${i + 1}`;
    if (i % 3 === 1) el.classList.add("heart");
    if (i % 3 === 2) el.classList.add("blue");
    el.textContent = text;
    stickerLayer.appendChild(el);
  });

  [...dotsWrap.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === current);
  });

  slideCard.classList.remove("animate");
  void slideCard.offsetWidth;
  slideCard.classList.add("animate");
}

function nextSlide() {
  current = (current + 1) % slides.length;
  renderSlide();
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  renderSlide();
}

function startAuto() {
  autoTimer = setInterval(nextSlide, 6500);
}

function restartAuto() {
  clearInterval(autoTimer);
  startAuto();
}

prevBtn.addEventListener("click", () => {
  prevSlide();
  restartAuto();
});

nextBtn.addEventListener("click", () => {
  nextSlide();
  restartAuto();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextSlide();
    restartAuto();
  }
  if (e.key === "ArrowLeft") {
    prevSlide();
    restartAuto();
  }
});

audioBtn.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      audioBtn.textContent = "⏸ Pause Musik";
    } catch {
      audioBtn.textContent = "Klik lagi untuk musik";
    }
  } else {
    bgMusic.pause();
    audioBtn.textContent = "▶ Putar Musik";
  }
});

function openDiary() {
  diaryBook.classList.add("open");
  openDiaryBtn.textContent = "Diary Terbuka ✨";
}

openDiaryBtn.addEventListener("click", openDiary);

function openEnvelopeIntro() {
  if (introOpened) return;
  introOpened = true;
  envelopeFlap.classList.add("open");

  setTimeout(() => {
    introScreen.classList.add("is-hidden");
    mainPresentation.classList.remove("is-hidden");
    openDiary();
    startAuto();
  }, 560);
}

envelopeBtn.addEventListener("click", openEnvelopeIntro);
envelopeBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openEnvelopeIntro();
  }
});

slideCard.addEventListener("mouseenter", () => clearInterval(autoTimer));
slideCard.addEventListener("mouseleave", startAuto);

createDots();
renderSlide();
