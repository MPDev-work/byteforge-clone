// const lenis = new Lenis({
//   duration: 0.04, // bigger = slower/smoother
//   smoothWheel: true,
//   wheelMultiplier: 1.4, // lower = slower scroll
//   touchMultiplier: 20,
// });

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

const Preview = document.getElementById('preview');
const Play = document.getElementById('play');
const closeBTN = document.getElementById('closeBTN');
const mute = document.getElementById('mute');
const body = document.body;

let Video = null;
mute.style.display = 'none';

Play.addEventListener('click', show);
closeBTN.addEventListener('click', close);
document.addEventListener('keydown', key);

function show() {
  Preview.innerHTML = `
    <video
      id="video"
      class="video-shadow lg:w-[80%] w-full  h-auto aspect-video object-cover lg:rounded-4xl rounded-0"
      loop
      muted
      playsinline
    >
      <source src="./src/video/previews.MP4" type="video/mp4" />
    </video>
  `;

  Video = document.getElementById('video');

  Preview.style.display = 'flex';
  closeBTN.style.display = 'flex';
  mute.style.display = 'flex';

  setTimeout(() => {
    Preview.classList.add('active');
    Video.classList.add('active');
  }, 1);

  setTimeout(() => {
    Video.play();
  }, 200);

  body.style.overflow = 'hidden';
}

function key(e) {
  if (e.key === 'Escape') {
    Preview.classList.remove('active');
    Video.classList.remove('active');
    body.style.overflowY = 'visible';
    Video.pause();
    closeBTN.style.display = 'none';
    mute.style.display = 'none';

    setTimeout(() => {
      Preview.style.display = 'none';
      Preview.innerHTML = '';
      Video = null;
    }, 200);
  }
}
function close() {
  Preview.classList.remove('active');
  Video.classList.remove('active');
  body.style.overflowY = 'visible';
  mute.style.display = 'none';
  Video.pause();
  closeBTN.style.display = 'none';

  setTimeout(() => {
    Preview.style.display = 'none';
    Preview.innerHTML = '';
    Video = null;
  }, 200);
}

const tabs = document.querySelectorAll('.room-tab');
const indicator = document.getElementById('tab-indicator');
const previewImage = document.getElementById('preview-image');

let activeTab = tabs[0];

function moveIndicator(tab) {
  indicator.style.width = `${tab.offsetWidth - 4}px`;
  indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
}

// initial position
moveIndicator(activeTab);

tabs.forEach((tab) => {
  // hover effect
  tab.addEventListener('mouseenter', () => {
    moveIndicator(tab);
  });

  // click effect
  tab.addEventListener('click', () => {
    activeTab = tab;

    // text colors
    tabs.forEach((item) => {
      item.querySelector('span').classList.remove('text-black');
      item.querySelector('span').classList.add('text-gray-600');
    });

    tab.querySelector('span').classList.remove('text-gray-600');
    tab.querySelector('span').classList.add('text-black');

    // image change
    previewImage.style.opacity = '0';

    setTimeout(() => {
      previewImage.src = tab.dataset.img;
      previewImage.style.opacity = '1';
    }, 150);

    moveIndicator(tab);
  });
});

// return indicator to active tab
document.getElementById('room-tabs').addEventListener('mouseleave', () => {
  moveIndicator(activeTab);
});
