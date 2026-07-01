const state = {
  score: 84,
  confidence: 78,
  learning: 92,
  fit: 71,
  salary: 86,
};

const scoreEl = document.getElementById('twin-score');
const confidenceEl = document.getElementById('confidence-value');
const learningEl = document.getElementById('learning-value');
const fitEl = document.getElementById('fit-value');
const salaryEl = document.getElementById('salary-value');
const refreshButton = document.getElementById('refresh-twin');

function updateView() {
  scoreEl.textContent = state.score;
  confidenceEl.textContent = `${state.confidence}%`;
  learningEl.textContent = `${state.learning}%`;
  fitEl.textContent = `${state.fit}%`;
  salaryEl.textContent = `$${state.salary}k`;
}

function refreshTwin() {
  state.score = Math.min(96, state.score + Math.floor(Math.random() * 4) + 1);
  state.confidence = Math.min(96, state.confidence + Math.floor(Math.random() * 5) + 1);
  state.learning = Math.min(98, state.learning + Math.floor(Math.random() * 3));
  state.fit = Math.min(94, state.fit + Math.floor(Math.random() * 4) + 1);
  state.salary = Math.min(140, state.salary + Math.floor(Math.random() * 3) + 1);
  updateView();
}

refreshButton?.addEventListener('click', refreshTwin);
updateView();
