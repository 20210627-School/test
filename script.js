const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.button-right');
const prevButton = document.querySelector('.button-left');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

let currentIndex = 0;
let autoPlayTimer;

const updateSlide = (index) => {
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // インジケーターの更新
    dots.forEach(dot => dot.classList.remove('current-indicator'));
    dots[index].classList.add('current-indicator');
    
    currentIndex = index;
};

// 次へ
nextButton.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    updateSlide(nextIndex);
    resetTimer();
});

// 前へ
prevButton.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide(prevIndex);
    resetTimer();
});

// ドットクリック
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;
    
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    updateSlide(targetIndex);
    resetTimer();
});

// 自動再生
function startTimer() {
    autoPlayTimer = setInterval(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        updateSlide(nextIndex);
    }, 5000); // 5秒ごとに切り替え
}

function resetTimer() {
    clearInterval(autoPlayTimer);
    startTimer();
}

// 初期起動
startTimer();
