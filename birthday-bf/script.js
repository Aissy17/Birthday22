const openBtn = document.getElementById('openBtn');
const startScreen = document.getElementById('start-screen');
const specialPage = document.getElementById('special-page');
const coupleDayBtn = document.getElementById('coupleDayBtn');
const specialDayBtn = document.getElementById('specialDayBtn');
const rightPanel = document.querySelector('.right-panel');
const flightHint = document.getElementById('flightHint');
const coupleFlightHint = document.getElementById('coupleFlightHint');
const planeIcon = flightHint?.querySelector('.plane-icon');
const boomIcon = flightHint?.querySelector('.boom-icon');
const coupleFlyer = coupleFlightHint?.querySelector('.couple-flyer');
const songModal = document.getElementById('songModal');
const closeSongModal = document.getElementById('closeSongModal');
const coupleModal = document.getElementById('coupleModal');
const closeCoupleModal = document.getElementById('closeCoupleModal');
const aboutYouAudio = document.getElementById('aboutYouAudio');
const playAboutYouBtn = document.getElementById('playAboutYouBtn');
const pauseAboutYouBtn = document.getElementById('pauseAboutYouBtn');
const spotifyProgressBar = document.getElementById('spotifyProgressBar');
const musicCurrentTime = document.getElementById('musicCurrentTime');
const musicDuration = document.getElementById('musicDuration');
const musicStatus = document.getElementById('musicStatus');
let flightHintInterval = null;
let coupleHintInterval = null;

function runFlightHint() {
    if (!flightHint || !specialDayBtn || !rightPanel || !planeIcon || !boomIcon) return;

    const panelRect = rightPanel.getBoundingClientRect();
    const dayRect = specialDayBtn.getBoundingClientRect();
    const centerX = dayRect.left - panelRect.left + dayRect.width * 0.5;
    const centerY = dayRect.top - panelRect.top + dayRect.height * 0.5;

    const planeRect = planeIcon.getBoundingClientRect();
    const boomRect = boomIcon.getBoundingClientRect();

    const planeX = centerX - planeRect.width * 0.5;
    const planeY = centerY - planeRect.height * 0.5;
    const boomX = centerX - boomRect.width * 0.5;
    const boomY = centerY - boomRect.height * 0.5 - 10;

    flightHint.style.setProperty('--plane-target-x', `${planeX}px`);
    flightHint.style.setProperty('--plane-target-y', `${planeY}px`);
    flightHint.style.setProperty('--boom-left', `${boomX}px`);
    flightHint.style.setProperty('--boom-top', `${boomY}px`);

    flightHint.classList.remove('launch');
    void flightHint.offsetWidth;
    flightHint.classList.add('launch');
}

function startFlightHintLoop() {
    if (!flightHint || !specialDayBtn) return;

    runFlightHint();
    clearInterval(flightHintInterval);
    flightHintInterval = setInterval(runFlightHint, 4300);
}

function stopFlightHintLoop() {
    if (!flightHint) return;

    clearInterval(flightHintInterval);
    flightHint.classList.add('done');
}

function runCoupleHint() {
    if (!coupleFlightHint || !coupleDayBtn || !rightPanel || !coupleFlyer) return;

    const panelRect = rightPanel.getBoundingClientRect();
    const dayRect = coupleDayBtn.getBoundingClientRect();
    const centerX = dayRect.left - panelRect.left + dayRect.width * 0.5;
    const centerY = dayRect.top - panelRect.top + dayRect.height * 0.5;

    coupleFlightHint.style.setProperty('--c-target-x', `${centerX}px`);
    coupleFlightHint.style.setProperty('--c-target-y', `${centerY}px`);

    coupleFlightHint.classList.remove('launch');
    void coupleFlightHint.offsetWidth;
    coupleFlightHint.classList.add('launch');
}

function startCoupleHintLoop() {
    if (!coupleFlightHint || !coupleDayBtn) return;

    runCoupleHint();
    clearInterval(coupleHintInterval);
    coupleHintInterval = setInterval(runCoupleHint, 6200);
}

function stopCoupleHintLoop() {
    if (!coupleFlightHint) return;

    clearInterval(coupleHintInterval);
    coupleFlightHint.classList.add('done');
}

function launchHearts() {
    if (!specialPage) return;

    for (let i = 0; i < 18; i++) {
        const heart = document.createElement('span');
        heart.textContent = '💖';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-10px';
        heart.style.fontSize = (Math.random() * 10 + 14) + 'px';
        heart.style.opacity = '0.9';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `fallHeart ${Math.random() * 1.2 + 2.2}s linear forwards`;
        heart.style.animationDelay = `${Math.random() * 0.6}s`;
        specialPage.appendChild(heart);

        setTimeout(() => heart.remove(), 3400);
    }
}

if (openBtn && startScreen && specialPage) {
    openBtn.addEventListener('click', () => {
        openBtn.classList.add('opening');

        setTimeout(() => {
            startScreen.classList.add('hidden');
            specialPage.classList.remove('hidden');
            launchHearts();
            startFlightHintLoop();
            startCoupleHintLoop();
        }, 420);
    });
}

function openSongModal() {
    if (!songModal || !aboutYouAudio) return;

    songModal.classList.remove('hidden');
    songModal.setAttribute('aria-hidden', 'false');

    updateMusicStatus('Siap diputar 🎵');
}

function closeSong() {
    if (!songModal || !aboutYouAudio) return;

    songModal.classList.add('hidden');
    songModal.setAttribute('aria-hidden', 'true');
    aboutYouAudio.pause();
    updateMusicStatus('Siap diputar 🎵');
}

function openCoupleModal() {
    if (!coupleModal) return;

    coupleModal.classList.remove('hidden');
    coupleModal.setAttribute('aria-hidden', 'false');
}

function closeCouple() {
    if (!coupleModal) return;

    coupleModal.classList.add('hidden');
    coupleModal.setAttribute('aria-hidden', 'true');
}

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return '0:00';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updateProgress() {
    if (!aboutYouAudio || !spotifyProgressBar || !musicCurrentTime) return;

    const duration = aboutYouAudio.duration || 0;
    const time = aboutYouAudio.currentTime || 0;
    const percentage = duration > 0 ? (time / duration) * 100 : 0;

    spotifyProgressBar.style.width = `${percentage}%`;
    musicCurrentTime.textContent = formatTime(time);

    if (musicDuration && Number.isFinite(duration) && duration > 0) {
        musicDuration.textContent = formatTime(duration);
    }
}

function updateMusicStatus(message) {
    if (musicStatus) {
        musicStatus.textContent = message;
    }
}

function playSong() {
    if (!aboutYouAudio) return;

    const playPromise = aboutYouAudio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
    }

    updateMusicStatus('Sedang diputar 💚');
}

function pauseSong() {
    if (!aboutYouAudio) return;
    aboutYouAudio.pause();
    updateMusicStatus('Lagu dijeda dulu ya 🎧');
}

if (specialDayBtn) {
    specialDayBtn.addEventListener('click', () => {
        stopFlightHintLoop();
        openSongModal();
    });
}

if (coupleDayBtn) {
    coupleDayBtn.addEventListener('click', () => {
        stopCoupleHintLoop();
        openCoupleModal();
    });
}

if (closeSongModal) {
    closeSongModal.addEventListener('click', closeSong);
}

if (songModal) {
    songModal.addEventListener('click', (event) => {
        if (event.target === songModal) {
            closeSong();
        }
    });
}

if (closeCoupleModal) {
    closeCoupleModal.addEventListener('click', closeCouple);
}

if (coupleModal) {
    coupleModal.addEventListener('click', (event) => {
        if (event.target === coupleModal) {
            closeCouple();
        }
    });
}

if (playAboutYouBtn) {
    playAboutYouBtn.addEventListener('click', playSong);
}

if (pauseAboutYouBtn) {
    pauseAboutYouBtn.addEventListener('click', pauseSong);
}

if (aboutYouAudio) {
    aboutYouAudio.addEventListener('timeupdate', updateProgress);
    aboutYouAudio.addEventListener('loadedmetadata', updateProgress);
    aboutYouAudio.addEventListener('durationchange', updateProgress);
    aboutYouAudio.addEventListener('pause', () => updateMusicStatus('Lagu dijeda dulu ya 🎧'));
    aboutYouAudio.addEventListener('play', () => updateMusicStatus('Sedang diputar 💚'));
    aboutYouAudio.addEventListener('ended', () => updateMusicStatus('Lagu selesai diputar ✨'));
}
