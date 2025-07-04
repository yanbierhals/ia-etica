const cases = [
  {
    text: 'Um algoritmo de crédito aprova mais homens do que mulheres com mesma renda.',
    bias: 'sim',
    ethic: 'nao',
    explanation: 'Esse é um viés de gênero comum quando os dados históricos usados no treinamento são tendenciosos.'
  },
  {
    text: 'Um software de reconhecimento facial falha mais com rostos negros.',
    bias: 'sim',
    ethic: 'nao',
    explanation: 'Isso evidencia um viés racial frequentemente discutido em pesquisas sobre IA e justiça.'
  },
  {
    text: 'Um algoritmo de contratação exclui candidatos que estudaram em certas universidades.',
    bias: 'sim',
    ethic: 'nao',
    explanation: 'Promover exclusão com base em histórico educacional limita a diversidade e perpetua privilégios.'
  },
  {
    text: 'Um chatbot de atendimento funciona igualmente bem para todos os sotaques do Brasil.',
    bias: 'nao',
    ethic: 'sim',
    explanation: 'Exemplo positivo de tecnologia inclusiva que considera diferentes públicos.'
  },
  {
    text: 'Um app de predição policial envia mais viaturas para bairros periféricos.',
    bias: 'sim',
    ethic: 'nao',
    explanation: 'Um reflexo de dados enviesados que reforçam desigualdades estruturais.'
  }
];

const sources = [
  'Podcast da Nina da Hora sobre viés em IA',
  'Artigos de pesquisa sobre justiça algorítmica',
  'Relatórios de instituições de ética em tecnologia'
];

let current = 0;
let userBias = null;
let userEthic = null;

const caseText = document.getElementById('case-text');
const biasButtons = document.querySelectorAll('button.bias');
const ethicButtons = document.querySelectorAll('button.ethic');
const submitBtn = document.getElementById('submit');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next');
const endScreen = document.getElementById('end');
const sourcesList = document.getElementById('sources');

function loadCase() {
  const c = cases[current];
  caseText.textContent = c.text;
  feedback.classList.add('hidden');
  nextBtn.classList.add('hidden');
  submitBtn.disabled = true;
  userBias = null;
  userEthic = null;
  biasButtons.forEach(b => b.classList.remove('active'));
  ethicButtons.forEach(b => b.classList.remove('active'));
}

function handleSelection(type, value, button) {
  if (type === 'bias') {
    userBias = value;
    biasButtons.forEach(b => b.classList.remove('active'));
  } else {
    userEthic = value;
    ethicButtons.forEach(b => b.classList.remove('active'));
  }
  button.classList.add('active');
  submitBtn.disabled = !(userBias && userEthic);
}

biasButtons.forEach(btn => {
  btn.addEventListener('click', () => handleSelection('bias', btn.dataset.answer, btn));
});

ethicButtons.forEach(btn => {
  btn.addEventListener('click', () => handleSelection('ethic', btn.dataset.answer, btn));
});

submitBtn.addEventListener('click', () => {
  const c = cases[current];
  let correct = 0;
  let total = 2;
  if (userBias === c.bias) correct++;
  if (userEthic === c.ethic) correct++;
  const result = (correct === total) ? '✅ Correto' : '❌ Incorreto';
  feedback.innerHTML = `<strong>${result}</strong><p>${c.explanation}</p>`;
  feedback.classList.remove('hidden');
  nextBtn.classList.remove('hidden');
});

nextBtn.addEventListener('click', () => {
  current++;
  if (current < cases.length) {
    loadCase();
  } else {
    showEnd();
  }
});

function showEnd() {
  document.getElementById('quiz').classList.add('hidden');
  endScreen.classList.remove('hidden');
  sources.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    sourcesList.appendChild(li);
  });
}

loadCase();
