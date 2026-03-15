document.addEventListener("DOMContentLoaded", function() {
    const audio = new Audio("love.mp3"); 
    
    const playAudio = () => {
        audio.play().catch(error => {
            console.log("Reproducción automática bloqueada, esperando interacción del usuario.");
        });
    };
    
    playAudio();
    
    document.body.addEventListener("click", () => {
        audio.play();
    }, { once: true });
});

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'F12') {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault();
  }
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
  }
});


function heart() {
  const icons = ["🌻"];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  heart.innerText = randomIcon;
  document.body.appendChild(heart);

  setTimeout(() => {
      heart.remove();
  }, 3000);
}

setInterval(heart, 900);