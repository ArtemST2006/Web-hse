const themeButton = document.querySelector('#theme-toggle');
const themeIcon = themeButton.querySelector('.theme-button__icon');
const themeText = themeButton.querySelector('.theme-button__text');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeIcon.textContent = isDark ? '☀' : '☾';
  themeText.textContent = isDark ? 'Светлая тема' : 'Тёмная тема';
  themeButton.setAttribute('aria-label', `Включить ${isDark ? 'светлую' : 'тёмную'} тему`);
}

try {
  setTheme(localStorage.getItem('mountains-theme') === 'dark' ? 'dark' : 'light');
} catch {
  setTheme('light');
}

themeButton.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  try {
    localStorage.setItem('mountains-theme', nextTheme);
  } catch {
    // Переключение темы работает и при отключённом локальном хранилище.
  }
});

document.querySelectorAll('.card__button').forEach((button) => {
  button.addEventListener('click', () => {
    const details = document.getElementById(button.getAttribute('aria-controls'));
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isExpanded));
    button.querySelector('span').textContent = isExpanded ? 'Подробнее' : 'Скрыть факты';
    details.hidden = isExpanded;
  });
});

const cards = [...document.querySelectorAll('.mountain-card')];
const selectionStatus = document.querySelector('#selection-status');
let lastSelectedIndex = -1;

document.querySelector('#random-mountain').addEventListener('click', () => {
  let index = Math.floor(Math.random() * cards.length);
  if (cards.length > 1 && index === lastSelectedIndex) {
    index = (index + 1) % cards.length;
  }
  lastSelectedIndex = index;

  cards.forEach((card) => card.classList.remove('is-selected'));
  const chosenCard = cards[index];
  chosenCard.classList.add('is-selected');
  selectionStatus.textContent = `Сегодня исследуем: ${chosenCard.dataset.name}`;
  chosenCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.querySelectorAll('.card__media img').forEach((image) => {
  image.addEventListener('error', () => image.parentElement.classList.add('is-image-missing'));
  if (image.complete && image.naturalWidth === 0) {
    image.parentElement.classList.add('is-image-missing');
  }
});
