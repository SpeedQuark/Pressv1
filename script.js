let intervalId;
let blankIntervalId;
let count = 0;
let isRunning = false;
const numberDisplay = document.getElementById('number-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const speedInput = document.getElementById('speed');
const blankTimeInput = document.getElementById('blank-time');
const totalNumbersInput = document.getElementById('total-numbers');

// Función para generar un número aleatorio entre 00 y 99
function generateRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 100); // Números entre 0 y 99
  numberDisplay.textContent = randomNumber.toString().padStart(2, '0'); // Formato 00
}

// Función para mostrar un espacio en blanco
function showBlank() {
  numberDisplay.textContent = "";
}

// Iniciar el generador de números
startBtn.addEventListener('click', () => {
  if (isRunning) return; // Evitar múltiples ejecuciones

  const speed = parseInt(speedInput.value);
  const blankTime = parseInt(blankTimeInput.value);
  const totalNumbers = parseInt(totalNumbersInput.value);
  count = 0;
  isRunning = true;

  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervalId = setInterval(() => {
    if (count < totalNumbers) {
      generateRandomNumber();
      count++;

      // Mostrar espacio en blanco después de mostrar el número
      if (blankTime > 0) {
        clearTimeout(blankIntervalId);
        blankIntervalId = setTimeout(showBlank, speed);
      }
    } else {
      clearInterval(intervalId);
      isRunning = false;
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  }, speed + blankTime); // Tiempo total = velocidad + espacio en blanco
});

// Detener el generador de números
stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  clearTimeout(blankIntervalId);
  isRunning = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
