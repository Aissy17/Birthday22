document.addEventListener('DOMContentLoaded', () => {
  const wishInput = document.getElementById('wishInput');
  const saveWishBtn = document.getElementById('saveWishBtn');
  const wishStatus = document.getElementById('wishStatus');
  const crosswordWords = document.querySelectorAll('.crossword-word');
  const checkCrosswordBtn = document.getElementById('checkCrosswordBtn');
  const crosswordResult = document.getElementById('crosswordResult');
  const quizForm = document.getElementById('relationshipQuiz');
  const checkQuizBtn = document.getElementById('checkQuizBtn');
  const quizResult = document.getElementById('quizResult');
  const gateForm = document.getElementById('passwordGateForm');
  const gatePassword = document.getElementById('gatePassword');
  const gateResult = document.getElementById('gateResult');
  const openGateBtn = document.getElementById('openGateBtn');
  const gateModal = document.getElementById('gateModal');
  const gateCloseButtons = document.querySelectorAll('[data-close-gate]');
  const sparkleField = document.querySelector('.sparkle-field');
  const heartTtsBoard = document.getElementById('heartTtsBoard');
  const galleryMessage = document.getElementById('galleryMessage');
  const memoryCarousel = document.getElementById('memoryCarousel');
  const memoryStrip = document.getElementById('memoryStrip');
  const musicCard = document.querySelector('.music-card');
  const aboutYouAudio = document.getElementById('aboutYouAudio');
  const playAboutYouBtn = document.getElementById('playAboutYouBtn');
  const pauseAboutYouBtn = document.getElementById('pauseAboutYouBtn');
  const musicStatus = document.getElementById('musicStatus');
  const spotifyProgressBar = document.getElementById('spotifyProgressBar');
  const musicCurrentTime = document.getElementById('musicCurrentTime');
  const musicDuration = document.getElementById('musicDuration');
  const galleryPromptBox = document.getElementById('galleryPromptBox');
  const galleryContent = document.getElementById('galleryContent');
  const galleryPromptView = document.getElementById('galleryPromptView');
  const galleryWarningView = document.getElementById('galleryWarningView');
  const galleryYesBtn = document.getElementById('galleryYesBtn');
  const galleryNoBtn = document.getElementById('galleryNoBtn');
  const galleryBackBtn = document.getElementById('galleryBackBtn');
  const playVoiceBtn = document.getElementById('playVoiceBtn');
  const stopVoiceBtn = document.getElementById('stopVoiceBtn');
  const voiceText = document.getElementById('voiceText');
  const candles = document.querySelectorAll('.candle');

  if (document.body.dataset.slide === '2' && sessionStorage.getItem('bdayGateUnlocked') !== 'true') {
    window.location.replace('index.html?unlock=1');
    return;
  }

  const openGalleryPrompt = () => {
    if (!galleryPromptBox) {
      return;
    }

    galleryPromptBox.hidden = false;

    if (galleryPromptView) {
      galleryPromptView.hidden = false;
    }

    if (galleryWarningView) {
      galleryWarningView.hidden = true;
    }

    if (galleryContent) {
      galleryContent.hidden = true;
    }
  };

  const closeGalleryPrompt = () => {
    if (galleryPromptBox) {
      galleryPromptBox.hidden = true;
    }

    if (galleryContent) {
      galleryContent.hidden = false;
    }
  };

  const showGalleryWarning = () => {
    if (galleryPromptView) {
      galleryPromptView.hidden = true;
    }

    if (galleryWarningView) {
      galleryWarningView.hidden = false;
    }
  };

  const unlockGallery = () => {
    sessionStorage.setItem('bdayGalleryUnlocked', 'true');
    closeGalleryPrompt();
  };

  if (document.body.dataset.slide === '2') {
    const galleryUnlocked = sessionStorage.getItem('bdayGalleryUnlocked') === 'true';

    if (!galleryUnlocked) {
      openGalleryPrompt();
    }

    if (galleryYesBtn) {
      galleryYesBtn.addEventListener('click', unlockGallery);
    }

    if (galleryNoBtn) {
      galleryNoBtn.addEventListener('click', () => {
        showGalleryWarning();
      });
    }

    if (galleryBackBtn) {
      galleryBackBtn.addEventListener('click', () => {
        if (galleryWarningView) {
          galleryWarningView.hidden = true;
        }
        if (galleryPromptView) {
          galleryPromptView.hidden = false;
        }
      });
    }

    if (galleryUnlocked && galleryPromptBox) {
      galleryPromptBox.hidden = true;
    }

    if (galleryUnlocked && galleryContent) {
      galleryContent.hidden = false;
    }
  }

  const openGateModal = () => {
    if (!gateModal) {
      return;
    }

    gateModal.classList.add('is-open');
    gateModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gate-open');

    if (gateResult) {
      gateResult.textContent = '';
    }

    if (gatePassword) {
      window.setTimeout(() => gatePassword.focus(), 50);
    }
  };

  const closeGateModal = () => {
    if (!gateModal) {
      return;
    }

    gateModal.classList.remove('is-open');
    gateModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gate-open');
  };

  if (document.body.dataset.slide === '1') {
    const shouldOpenGate = new URLSearchParams(window.location.search).get('unlock') === '1';

    if (openGateBtn && gateModal) {
      openGateBtn.addEventListener('click', openGateModal);
    }

    gateCloseButtons.forEach((button) => {
      button.addEventListener('click', closeGateModal);
    });

    if (gateModal) {
      gateModal.addEventListener('click', (event) => {
        if (event.target === gateModal) {
          closeGateModal();
        }
      });
    }

    if (shouldOpenGate) {
      openGateModal();
    }
  }

  if (heartTtsBoard && document.body.dataset.page === '4') {
    const ttsEntries = [
      { number: 1, answer: 'JOGJA', clue: 'Dimana pertama kali bertemu?' },
      { number: 2, answer: 'TIGAMARET', clue: 'Kapan pertama kali bertemu?' },
      { number: 3, answer: 'SEMBILANMARET', clue: 'Kapan tanggal jadian?' },
      { number: 4, answer: 'TIGABELASMARET', clue: 'Kapan tanggal date pertama?' },
      { number: 5, answer: 'HISTORICA', clue: 'Nama cafe waktu date pertama?' },
      { number: 6, answer: 'TUJUHSEPTEMBER', clue: 'Kapan tanggal date kedua?' },
      { number: 7, answer: 'CEPU', clue: 'Dimana date kedua?' },
      { number: 8, answer: 'DUAPULUHEMPATMARET', clue: 'Kapan tanggal date ketiga?' },
      { number: 9, answer: 'KRIAD', clue: 'Dimana date ketiga?' },
      { number: 10, answer: 'TUJUHBELASJULI', clue: 'Kapan tanggal ultah cewemu?' },
      { number: 11, answer: 'ONLINE', clue: 'Bagaimana kamu nembak si cewe, online atau offline?' },
    ];

    heartTtsBoard.innerHTML = '';

    ttsEntries.forEach((entry) => {
      const row = document.createElement('div');
      row.className = 'tts-entry-row';

      const numberBadge = document.createElement('div');
      numberBadge.className = 'tts-number';
      numberBadge.textContent = entry.number;

      const word = document.createElement('div');
      word.className = 'tts-word';
      word.dataset.answer = entry.answer;

      const clue = document.createElement('div');
      clue.className = 'tts-inline-clue';
      clue.textContent = entry.clue;

      Array.from(entry.answer).forEach((character, index) => {
        const cell = document.createElement('input');
        cell.className = 'heart-slot heart-input';
        cell.maxLength = 1;
        cell.setAttribute('aria-label', `Nomor ${entry.number} huruf ${index + 1}`);
        cell.addEventListener('input', () => {
          cell.value = cell.value.slice(0, 1).toUpperCase();
        });
        word.appendChild(cell);
      });

      row.appendChild(numberBadge);
      row.appendChild(word);
      row.appendChild(clue);
      heartTtsBoard.appendChild(row);
    });
  }

  if (gateForm && gatePassword && gateResult) {
    const correctPassword = '9 maret 2025';

    gateForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const answer = gatePassword.value.trim().toLowerCase().replace(/\s+/g, ' ');

      if (answer === correctPassword) {
        sessionStorage.setItem('bdayGateUnlocked', 'true');
        gateResult.textContent = 'Benar sayang, lanjut ya 💖';
        window.location.href = 'page2.html';
        return;
      }

      sessionStorage.removeItem('bdayGateUnlocked');
      gateResult.textContent = 'Masih belum tepat, coba lagi ya sayang.';
      gatePassword.focus();
      gatePassword.select();
    });
  }

  if (galleryMessage && document.body.dataset.slide === '2') {
    const galleryMessages = [
      'Kamu adalah rumah paling nyaman buat hati aku.',
      'Setiap foto kita selalu punya cerita yang hangat.',
      'Aku suka banget setiap momen kecil yang kita bagi.',
      'Semoga perjalanan kita selalu dipenuhi senyum dan doa baik.'
    ];

    let galleryIndex = 0;
    setInterval(() => {
      galleryIndex = (galleryIndex + 1) % galleryMessages.length;
      galleryMessage.textContent = galleryMessages[galleryIndex];
    }, 3500);
  }

  if (memoryCarousel && memoryStrip && document.body.dataset.slide === '2') {
    const originalCards = Array.from(memoryStrip.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      memoryStrip.appendChild(clone);
    });
  }

  if (aboutYouAudio && playAboutYouBtn && pauseAboutYouBtn && document.body.dataset.slide === '2') {
    const formatTime = (seconds) => {
      if (!Number.isFinite(seconds) || seconds < 0) {
        return '0:00';
      }
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${String(secs).padStart(2, '0')}`;
    };

    const updateProgress = () => {
      const duration = aboutYouAudio.duration || 0;
      const current = aboutYouAudio.currentTime || 0;

      if (musicCurrentTime) {
        musicCurrentTime.textContent = formatTime(current);
      }

      if (musicDuration) {
        musicDuration.textContent = formatTime(duration);
      }

      if (spotifyProgressBar) {
        const percent = duration > 0 ? (current / duration) * 100 : 0;
        spotifyProgressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
      }
    };

    const setMusicPlayingState = (isPlaying) => {
      if (musicCard) {
        musicCard.classList.toggle('is-playing', isPlaying);
      }
    };

    playAboutYouBtn.addEventListener('click', async () => {
      try {
        await aboutYouAudio.play();
        setMusicPlayingState(true);
        if (musicStatus) {
          musicStatus.textContent = 'Sedang memutar: About You 💖';
        }
      } catch (error) {
        setMusicPlayingState(false);
        if (musicStatus) {
          musicStatus.textContent = 'Audio belum ada. Cek file di audio/The 1975 - About You (Official).mp3 ya.';
        }
      }
    });

    pauseAboutYouBtn.addEventListener('click', () => {
      aboutYouAudio.pause();
      setMusicPlayingState(false);
      if (musicStatus) {
        musicStatus.textContent = 'Lagu dijeda dulu ya 🎧';
      }
    });

    aboutYouAudio.addEventListener('loadedmetadata', updateProgress);
    aboutYouAudio.addEventListener('timeupdate', updateProgress);

    aboutYouAudio.addEventListener('play', () => {
      setMusicPlayingState(true);
      updateProgress();
    });

    aboutYouAudio.addEventListener('pause', () => {
      if (!aboutYouAudio.ended) {
        setMusicPlayingState(false);
      }
    });

    aboutYouAudio.addEventListener('ended', () => {
      setMusicPlayingState(false);
      updateProgress();
      if (musicStatus) {
        musicStatus.textContent = 'Lagunya selesai. Mau diputar lagi? ✨';
      }
    });

    aboutYouAudio.addEventListener('error', () => {
      setMusicPlayingState(false);
      updateProgress();
      if (musicStatus) {
        musicStatus.textContent = 'File lagu tidak ditemukan. Taruh file di audio/The 1975 - About You (Official).mp3.';
      }
    });

    updateProgress();
  }

  if (playVoiceBtn && stopVoiceBtn && voiceText && document.body.dataset.slide === '3') {
    let speechInstance = null;
    const voiceMessage = voiceText.textContent.trim();

    const stopSpeech = () => {
      window.speechSynthesis.cancel();
      speechInstance = null;
    };

    playVoiceBtn.addEventListener('click', () => {
      stopSpeech();

      const utterance = new SpeechSynthesisUtterance(voiceMessage);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.onstart = () => {
        playVoiceBtn.textContent = 'Memutar...';
        playVoiceBtn.disabled = true;
      };
      utterance.onend = () => {
        playVoiceBtn.textContent = 'Putar Pesan Suara';
        playVoiceBtn.disabled = false;
        speechInstance = null;
      };

      speechInstance = utterance;
      window.speechSynthesis.speak(utterance);
    });

    stopVoiceBtn.addEventListener('click', () => {
      stopSpeech();
      playVoiceBtn.textContent = 'Putar Pesan Suara';
      playVoiceBtn.disabled = false;
    });
  }

  if (candles.length && document.body.dataset.slide === '3') {
    const toggleCandles = () => {
      candles.forEach((candle) => {
        candle.classList.toggle('is-out');
      });
    };

    setInterval(toggleCandles, 30000);
  }

  if (wishInput) {
    const savedWish = localStorage.getItem('birthdayWish');
    if (savedWish) {
      wishInput.value = savedWish;
    }
  }

  if (saveWishBtn && wishInput && wishStatus) {
    saveWishBtn.addEventListener('click', () => {
      const wishText = wishInput.value.trim();
      if (!wishText) {
        wishStatus.textContent = 'Tulis dulu harapan atau doa kamu ya.';
        return;
      }

      localStorage.setItem('birthdayWish', wishText);
      wishStatus.textContent = 'Doa berhasil disimpan. Manis banget.';
    });
  }

  crosswordWords.forEach((word) => {
    const inputs = Array.from(word.querySelectorAll('input'));

    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        input.value = input.value.slice(0, 1).toUpperCase();
        input.classList.toggle('filled', Boolean(input.value));

        if (input.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });
    });
  });

  if (checkCrosswordBtn && crosswordResult) {
    checkCrosswordBtn.addEventListener('click', () => {
      let correct = 0;

      crosswordWords.forEach((word) => {
        const answer = (word.dataset.answer || '').toUpperCase();
        const guess = Array.from(word.querySelectorAll('input'))
          .map((input) => input.value.trim().toUpperCase())
          .join('');

        if (guess === answer) {
          correct += 1;
        }
      });

      crosswordResult.textContent = `Kamu benar ${correct} dari ${crosswordWords.length} jawaban mini TTS.`;
    });
  }

  if (checkQuizBtn && quizForm && quizResult) {
    checkQuizBtn.addEventListener('click', () => {
      const formData = new FormData(quizForm);
      const questionNames = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];
      let score = 0;

      for (const name of questionNames) {
        const value = Number(formData.get(name));
        if (!value) {
          quizResult.textContent = 'Isi semua 6 pertanyaan dulu ya.';
          return;
        }

        score += value;
      }

      let message = 'Hubungan kalian terasa hangat dan manis.';
      if (score >= 16) {
        message = 'Chemistry kalian kuat banget. Manis, kompak, dan penuh perhatian.';
      } else if (score >= 12) {
        message = 'Kalian cocok dan saling menguatkan. Tinggal tambah banyak momen spesial.';
      } else {
        message = 'Masih lucu dan penuh kejutan. Yang penting tetap saling jaga.';
      }

      quizResult.textContent = `${message} Skor kamu: ${score}/18.`;
    });
  }

  if (sparkleField) {
    for (let i = 0; i < 30; i += 1) {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * -30}vh`;
      sparkle.style.animationDuration = `${6 + Math.random() * 7}s`;
      sparkle.style.animationDelay = `${Math.random() * 5}s`;
      sparkle.style.transform = `scale(${0.4 + Math.random() * 1.2})`;
      sparkleField.appendChild(sparkle);
    }
  }
});