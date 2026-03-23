const sentenceBank = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "In a world of constant distraction, true focus has become a rare and valuable currency.",
  "A journey of a thousand miles begins with a single step, but the second step is equally important.",
  "Clean code always reads like well-written prose, conveying intent without unnecessary noise.",
  "The obsidian surface reflected nothing but the faint glow of the terminal screen.",
  "Design is not just what it looks like and feels like. Design is how it works.",
  "Simplicity is the ultimate sophistication, stripping away the complex to reveal the essential.",
  "Technology is best when it brings people together and makes our lives remarkably easier.",
  "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
  "Software and cathedrals are much the same; first we build them, then we pray.",
  "The best way to predict the future is to invent it, one elegant function at a time.",
  "Typing with precision requires a balance of speed and intent, letting the mechanical rhythm carry your thoughts.",
  "Innovation is distinguishing between a leader and a follower, and attention to detail cements the legacy.",
  "Experience is the name everyone gives to their mistakes, turning failures into stepping stones.",
  "Before software can be reusable it first has to be usable.",
  "Code never lies, but comments sometimes do. Rely on the structure and the tests to guide you.",
  "You might not think that programmers are artists, but programming is an extremely creative profession."
];

let timerInterval;
let timeLeft = 60;
let isPlaying = false;
let currentPromptText = "";
let correctChars = 0;
let totalTypedChars = 0;

const promptBox = document.getElementById("prompt-box");
const inputBox = document.getElementById("input-box");
const timerDisplay = document.getElementById("timer-display");
const wpmDisplay = document.getElementById("wpm-display");
const cpmDisplay = document.getElementById("cpm-display");
const accDisplay = document.getElementById("acc-display");
const btnStart = document.getElementById("btn-start");
const btnReset = document.getElementById("btn-reset");

function generatePrompt(sentenceCount = 2) {
  let prompt = [];
  for (let i = 0; i < sentenceCount; i++) {
    const randomSentence = sentenceBank[Math.floor(Math.random() * sentenceBank.length)];
    prompt.push(randomSentence);
  }
  return prompt.join(" ");
}

function updateStats() {
  const timeElapsed = 60 - timeLeft;
  const minutes = timeElapsed / 60;
  
  if (minutes > 0) {
    const cpm = Math.round(correctChars / minutes);
    const wpm = Math.round((correctChars / 5) / minutes);
    cpmDisplay.innerText = cpm;
    wpmDisplay.innerText = wpm;
  }
  
  if (totalTypedChars > 0) {
    const accuracy = Math.round((correctChars / totalTypedChars) * 100);
    accDisplay.innerText = accuracy;
  }
}

function renderPrompt(inputText) {
  let html = "";
  for (let i = 0; i < currentPromptText.length; i++) {
    const promptChar = currentPromptText[i];
    const inputChar = inputText[i];
    
    if (inputChar == null) {
      if (i === inputText.length && isPlaying) {
        // Blinking Caret
        html += `<span class="border-l-2 border-secondary box-shadow-[0_0_8px_#71d7cd] -ml-[2px] animate-pulse">${promptChar}</span>`;
      } else {
        html += `<span>${promptChar}</span>`;
      }
    } else if (inputChar === promptChar) {
      html += `<span class="text-secondary drop-shadow-[0_0_2px_rgba(113,215,205,0.5)]">${promptChar}</span>`;
    } else {
      html += `<span class="bg-error-container/40 text-error rounded-sm">${promptChar}</span>`;
    }
  }
  
  // If user typed beyond prompt
  if (inputText.length >= currentPromptText.length && isPlaying) {
    html += `<span class="border-l-2 border-secondary box-shadow-[0_0_8px_#71d7cd] -ml-[2px] animate-pulse"></span>`;
  }
  
  promptBox.innerHTML = html;
}

function startGame() {
  if (isPlaying) return;
  isPlaying = true;
  timeLeft = 60;
  correctChars = 0;
  totalTypedChars = 0;
  
  wpmDisplay.innerText = "0";
  cpmDisplay.innerText = "0";
  accDisplay.innerText = "0";
  timerDisplay.innerText = "60";
  
  currentPromptText = generatePrompt(2);
  renderPrompt("");
  
  inputBox.value = "";
  inputBox.disabled = false;
  inputBox.focus();
  
  btnStart.disabled = true;
  btnStart.classList.add("opacity-50", "cursor-not-allowed");
  
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft < 10 ? "0" + timeLeft : timeLeft;
    updateStats();
    
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  isPlaying = false;
  inputBox.disabled = true;
  btnStart.disabled = false;
  btnStart.classList.remove("opacity-50", "cursor-not-allowed");
  
  renderPrompt(inputBox.value); // Remove blinking caret at end
}

function resetGame() {
  clearInterval(timerInterval);
  isPlaying = false;
  timeLeft = 60;
  correctChars = 0;
  totalTypedChars = 0;
  
  currentPromptText = "Press 'Start Session' to begin...";
  promptBox.innerHTML = `<span>${currentPromptText}</span>`;
  
  inputBox.value = "";
  inputBox.disabled = true;
  
  wpmDisplay.innerText = "0";
  cpmDisplay.innerText = "0";
  accDisplay.innerText = "0";
  timerDisplay.innerText = "60";
  
  btnStart.disabled = false;
  btnStart.classList.remove("opacity-50", "cursor-not-allowed");
}

inputBox.addEventListener("input", (e) => {
  if (!isPlaying) return;
  
  const inputText = inputBox.value;
  totalTypedChars = inputText.length;
  
  correctChars = 0;
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === currentPromptText[i]) {
      correctChars++;
    }
  }
  
  // Auto-generate more sentences if nearing the end
  if (inputText.length > currentPromptText.length - 40) {
    currentPromptText += " " + generatePrompt(1);
  }

  // Handle scrolling of the prompt box to keep caret in view
  const approxCharsPerLine = 45; // Depends on screen size & font size
  const currentLine = Math.floor(inputText.length / approxCharsPerLine);
  if (currentLine > 2) {
    // Basic approximate scroll, adjust to font height (e.g. ~40px line height)
    promptBox.scrollTop = (currentLine - 2) * 40; 
  } else {
    promptBox.scrollTop = 0;
  }
  
  renderPrompt(inputText);
});

btnStart.addEventListener("click", startGame);
btnReset.addEventListener("click", resetGame);

// Initial state
resetGame();
