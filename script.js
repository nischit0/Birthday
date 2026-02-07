// Fonts for Page 2 Calendar goofy effect
const fonts = ['Gaegu', 'Pacifico', 'Quicksand', 'Fredoka'];
const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];

// Background animation generator
function createFloatingBackground(type) {
    const container = document.getElementById('bg-animation-container');
    container.innerHTML = ''; // Clear existing
    
    let particleCount = 15;
    let shape = 'circle';

    if (type === 'romantic') {
        particleCount = 20;
    }

    for (let i = 0; i < particleCount; i++) {
        const div = document.createElement('div');
        div.className = 'floating-shape';
        
        // Random styles
        const size = Math.random() * 50 + 20 + 'px';
        div.style.width = size;
        div.style.height = size;
        div.style.left = Math.random() * 100 + 'vw';
        div.style.top = Math.random() * 100 + 'vh';
        div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        div.style.animationDuration = (Math.random() * 5 + 5) + 's';
        div.style.animationDelay = (Math.random() * 5) + 's';
        
        if (type === 'romantic') {
            div.style.borderRadius = '0'; // Could use SVG hearts here
            div.style.clipPath = 'polygon(50% 0%, 100% 35%, 82% 100%, 50% 80%, 18% 100%, 0% 35%)';
            div.style.backgroundColor = '#ff4d6d';
        }

        container.appendChild(div);
    }
}

// Page Navigation
function goToPage(pageNum) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageNum}`).classList.add('active');

    if (pageNum === 1) createFloatingBackground('default');
    if (pageNum === 2) {
        createFloatingBackground('playful');
        runCalendar();
    }
    if (pageNum === 3) {
        createFloatingBackground('birthday');
        createConfetti(); // Celebration boom
    }
}

// Page 2: Calendar Logic
function runCalendar() {
    const numEl = document.getElementById('calendar-number');
    let current = 1;
    const interval = setInterval(() => {
        if (current <= 19) {
            numEl.textContent = current;
            numEl.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
            numEl.style.color = colors[Math.floor(Math.random() * colors.length)];
            numEl.style.transform = `scale(${1 + Math.random()}) rotate(${Math.random() * 20 - 10}deg)`;
            current++;
        } else {
            clearInterval(interval);
            document.getElementById('time-flies').classList.add('visible');
            numEl.style.transform = 'scale(1) rotate(0deg)';
        }
    }, 150);
}

// Modal Logic
const audio = document.getElementById('party-audio');

function openModal(id) {
    document.getElementById(id).style.display = 'block';
    if (id === 'party-modal') {
        audio.currentTime = 0;
        audio.play();
    }
    if (id === 'secret-modal') {
        createFloatingBackground('romantic');
    }
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    if (id === 'party-modal') {
        audio.pause();
    }
    // Return to default bg if closing romantic modal
    if (id === 'secret-modal') {
        createFloatingBackground('birthday');
    }
}

// Cake Blow Action
function blowCandles() {
    const cakeImg = document.getElementById('cake-img');
    cakeImg.src = 'cake2.jpeg';
    document.getElementById('blow-btn').style.display = 'none';
    createConfetti();
}

// Confetti Generator
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);

        const animation = confetti.animate([
            { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
            { transform: `translate3d(${Math.random() * 100 - 50}px, 100vh, 0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });

        animation.onfinish = () => confetti.remove();
    }
}

// Initialize Page 1
window.onload = () => {
    createFloatingBackground('default');
};