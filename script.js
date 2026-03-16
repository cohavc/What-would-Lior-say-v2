const CARDS = [
  { img: "images/1.png",  question: "Who is Lior's favorite person in the office, and why?" },
  { img: "images/2.png",  question: "What is one secret from the workation that Lior knows but none of us do?" },
  { img: "images/3.png",  question: "What is one thing that instantly drives Lior crazy?" },
  { img: "images/4.png",  question: "What is Lior's favorite tea, and where does she secretly hide it from everyone?" },
  { img: "images/5.png",  question: "What always makes Lior laugh?" },
  { img: "images/6.png",  question: "Describe Lior as a mom in one word." },
  { img: "images/7.png",  question: "What is Lior's biggest dating red flag?" },
  { img: "images/8.png",  question: "What sport would Lior be surprisingly competitive in?" },
  { img: "images/9.png",  question: "What song would Lior choose first at karaoke?" },
  { img: "images/10.png", question: "What is Lior's most embarrassing moment in the office?" },
  { img: "images/11.png", question: "What is the most chaotic thing Lior might do after two glasses of wine?" },
  { img: "images/12.png", question: "What makes Lior emotional or brings her to tears?" },
];

let currentIndex = 0;
let isFlipped = false;
let flippedCards = new Set();
let order = CARDS.map((_, i) => i);

function renderDots() {
  const container = document.getElementById('dotsContainer');
  container.innerHTML = '';
  order.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === currentIndex ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to card ' + (i + 1));
    dot.onclick = () => goTo(i);
    container.appendChild(dot);
  });
}

function loadCard(animated) {
  const card = CARDS[order[currentIndex]];
  if (animated) {
    const fc = document.getElementById('flipCard');
    fc.style.animation = 'none';
    fc.offsetHeight; // force reflow
    fc.style.animation = 'cardIn 0.4s ease';
  }
  isFlipped = false;
  document.getElementById('flipCard').classList.remove('flipped');
  document.getElementById('cardImg').src = card.img;
  document.getElementById('questionText').textContent = card.question;
  document.getElementById('cardNumber').textContent = '#' + (currentIndex + 1);
  document.getElementById('counterNum').textContent = currentIndex + 1;
  document.getElementById('totalNum').textContent = order.length;
  const pct = ((currentIndex + 1) / order.length) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = 'Card ' + (currentIndex + 1) + ' of ' + order.length;
  document.getElementById('flippedCount').textContent = flippedCards.size + ' revealed';
  document.getElementById('prevBtn').disabled = currentIndex === 0;
  document.getElementById('nextBtn').disabled = currentIndex === order.length - 1;
  renderDots();
}

function flipCard() {
  isFlipped = !isFlipped;
  document.getElementById('flipCard').classList.toggle('flipped', isFlipped);
  if (isFlipped) {
    flippedCards.add(order[currentIndex]);
    document.getElementById('flippedCount').textContent = flippedCards.size + ' revealed';
  }
}

function navigate(dir) {
  const next = currentIndex + dir;
  if (next >= 0 && next < order.length) {
    currentIndex = next;
    loadCard(true);
  }
}

function goTo(i) {
  currentIndex = i;
  loadCard(true);
}

function shuffle() {
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  currentIndex = 0;
  flippedCards.clear();
  loadCard(true);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') navigate(1);
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === ' ') { e.preventDefault(); flipCard(); }
});

window.addEventListener('DOMContentLoaded', () => loadCard(false));
