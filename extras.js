const galleryCards = document.querySelectorAll('.mountain-card');
const galleryImage = document.querySelector('#gallery-image');
const galleryCaption = document.querySelector('#gallery-caption');
const galleryCount = document.querySelector('#gallery-count');
const galleryLink = document.querySelector('#gallery-link');
let photoIndex = 0;

function showPhoto() {
  const card = galleryCards[photoIndex];
  const image = card.querySelector('img');
  galleryImage.src = image.getAttribute('src');
  galleryImage.alt = image.alt;
  galleryCaption.textContent = card.dataset.name;
  galleryCount.textContent = (photoIndex + 1) + ' / ' + galleryCards.length;
  galleryLink.setAttribute('href', '#' + card.id);
  document.querySelector('#gallery-status').textContent = 'На фото: ' + card.dataset.name;
}

document.querySelector('#gallery-next').addEventListener('click', () => {
  photoIndex = photoIndex + 1;
  if (photoIndex === galleryCards.length) photoIndex = 0;
  showPhoto();
});

document.querySelector('#gallery-prev').addEventListener('click', () => {
  photoIndex = photoIndex - 1;
  if (photoIndex < 0) photoIndex = galleryCards.length - 1;
  showPhoto();
});

const packingItems = document.querySelectorAll('.packing-list input');
const packingStatus = document.querySelector('#packing-status');
const packingProgress = document.querySelector('#packing-progress');

function updatePacking() {
  let count = 0;
  packingItems.forEach((item) => {
    if (item.checked) count = count + 1;
    item.parentElement.classList.toggle('is-packed', item.checked);
  });
  packingProgress.value = count;
  packingStatus.textContent = 'Собрано: ' + count + ' из ' + packingItems.length;
  if (count === packingItems.length) {
    packingStatus.textContent = 'Все вещи из списка собраны!';
  }
}

packingItems.forEach((item) => {
  item.addEventListener('change', updatePacking);
});

document.querySelector('#packing-reset').addEventListener('click', () => {
  packingItems.forEach((item) => { item.checked = false; });
  updatePacking();
});
updatePacking();

const questions = [
  {
    text: 'Какая вершина считается самой высокой в России?',
    answers: ['Белуха', 'Эльбрус', 'Мунку-Сардык'],
    correct: 1,
    explanation: 'Эльбрус — высшая вершина России, 5642 м.'
  },
  {
    text: 'Какой хребет тянется вдоль южного побережья Байкала?',
    answers: ['Урал', 'Хибины', 'Хамар-Дабан'],
    correct: 2,
    explanation: 'Хамар-Дабан расположен вдоль южного побережья Байкала.'
  },
  {
    text: 'Какие горы служат условной границей Европы и Азии?',
    answers: ['Урал', 'Алтай', 'Саяны'],
    correct: 0,
    explanation: 'Уральские горы служат условной природной границей Европы и Азии.'
  }
];

const quizAnswers = document.querySelectorAll('.quiz__answer');
const quizQuestion = document.querySelector('#quiz-question');
const quizResult = document.querySelector('#quiz-result');
const quizProgress = document.querySelector('#quiz-progress');
const quizNext = document.querySelector('#quiz-next');
const quizReset = document.querySelector('#quiz-reset');
let questionIndex = 0;
let score = 0;

function showQuestion() {
  const question = questions[questionIndex];
  quizQuestion.textContent = question.text;
  quizProgress.textContent = 'Вопрос ' + (questionIndex + 1) + ' из ' + questions.length;
  quizAnswers.forEach((button, index) => {
    button.textContent = question.answers[index];
    button.disabled = false;
    button.classList.remove('is-correct', 'is-wrong');
  });
  quizResult.textContent = '';
  quizNext.hidden = true;
  quizReset.hidden = true;
}

quizAnswers.forEach((button, index) => {
  button.addEventListener('click', () => {
    const question = questions[questionIndex];
    const isCorrect = index === question.correct;
    if (isCorrect) score = score + 1;
    quizAnswers.forEach((answer) => { answer.disabled = true; });
    quizAnswers[question.correct].classList.add('is-correct');
    if (!isCorrect) button.classList.add('is-wrong');
    quizResult.textContent = (isCorrect ? 'Верно! ' : 'Не совсем. ') + question.explanation;
    if (questionIndex === questions.length - 1) {
      quizResult.textContent += ' Ваш результат: ' + score + ' из ' + questions.length + '.';
      quizReset.hidden = false;
    } else {
      quizNext.hidden = false;
    }
  });
});

quizNext.addEventListener('click', () => {
  questionIndex = questionIndex + 1;
  showQuestion();
  quizQuestion.focus();
});

quizReset.addEventListener('click', () => {
  questionIndex = 0;
  score = 0;
  showQuestion();
  quizQuestion.focus();
});
showQuestion();
