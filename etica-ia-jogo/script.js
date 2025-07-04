const cases = [
  {
    text: 'Um sistema de triagem médica prioriza pacientes com histórico de consultas particulares.',
    bias: 'sim',
    ethic: 'nao',
    explanation: 'Pode favorecer grupos com maior poder aquisitivo, comprometendo a equidade no atendimento.'
  },
  {
    text: 'Um algoritmo de crédito considera apenas dados financeiros objetivos, sem avaliar nome, gênero ou etnia.',
    bias: 'nao',
    ethic: 'sim',
    explanation: 'Evita variáveis discriminatórias e promove decisões mais justas.'
  },
  {
    text: 'Um sistema de recomendação de empregos sugere cargos técnicos apenas para homens.',
    bias: 'sim',
    ethic: 'nao',
    explanation: 'Reproduz estereótipos de gênero e limita oportunidades para mulheres.'
  },
  {
  text: 'Um sistema de IA para distribuição de bolsas prioriza estudantes de baixa renda e escolas públicas.',
  bias: 'sim',
  ethic: 'sim',
  explanation: 'Embora o sistema priorize um grupo específico, isso é feito para corrigir desigualdades históricas e promover equidade.'
  },
  {
    text: 'Um modelo de IA usado em escolas identifica estudantes com dificuldade sem expor dados pessoais.',
    bias: 'nao',
    ethic: 'sim',
    explanation: 'Exemplo de uso ético que protege a privacidade e apoia a inclusão.'
  },
  {
    text: 'Um sistema de análise de currículo descarta automaticamente candidatos com nomes estrangeiros.',
    bias: 'sim',
    ethic: 'nao',
    explanation: 'Pode representar discriminação cultural ou xenofobia, mesmo que involuntária.'
  },
  {
    text: 'Um robô assistente doméstico entende comandos falados por diferentes faixas etárias.',
    bias: 'nao',
    ethic: 'sim',
    explanation: 'Demonstra acessibilidade e respeito à diversidade de usuários.'
  }
]



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
