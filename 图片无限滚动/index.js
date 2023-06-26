const container = document.querySelector('.container');
const images = [
    './images/1.png',
    './images/2.jpg',
    './images/3.png',
    './images/4.jpg',
    './images/5.jpg',
]
let current = 0;
let isAnimating = false;
function init() {
    resetImages();
    container.addEventListener('wheel', wheelHandler);
    container.addEventListener('transitionend', transitionEndHandler);
}

init();

function createImages() {
    const preEl = document.createElement('div');
    const currentEl = document.createElement('div');
    const nextEl = document.createElement('div');
    const pre = current - 1 < 0 ? images.length - 1 : current - 1;
    const next = current + 1 > images.length - 1 ? 0 : current + 1;
    preEl.innerHTML = `<img class="img" src="${images[pre]}" alt="">`;
    currentEl.innerHTML = `<img class="img" src="${images[current]}" alt="">`;
    nextEl.innerHTML = `<img class="img" src="${images[next]}" alt="">`;

    preEl.classList.add('item', 'pre');
    currentEl.classList.add('item', 'current');
    nextEl.classList.add('item', 'next');
    return [preEl, currentEl, nextEl];
}

function resetImages() {
    const images = createImages();
    container.innerHTML = '';
    container.append(...images);
}

function wheelHandler(wheelEvent) {
    if (isAnimating) return;
    isAnimating = true;
    const { deltaY } = wheelEvent;
    if (!deltaY) return;

    if (deltaY < 0) {
        container.setAttribute('up', '');
        current = current + 1 > images.length - 1 ? 0 : current + 1;
    } else {
        container.setAttribute('down', '');
        current = current - 1 < 0 ? images.length - 1 : current - 1;
    }
}

function transitionEndHandler() {
    container.removeAttribute('up');
    container.removeAttribute('down');
    requestAnimationFrame(resetImages);
    isAnimating = false;
}

