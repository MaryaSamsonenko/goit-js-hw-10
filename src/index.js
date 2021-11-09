import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountry } from './services/api';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchboxEl = document.querySelector('#search-box');
const profileListEl = document.querySelector('.country-list');
const profileContainerEl = document.querySelector('.country-info');
console.log(searchboxEl);

searchboxEl.addEventListener(
  'input',
  debounce(() => {
    fetchCountry(searchboxEl.value)
      .then(countrydata => checkCountriesLehgth(countrydata))
      .catch(Notiflix.Notify.failure);
  }, DEBOUNCE_DELAY),
);

function clearMarkup() {
  profileListEl.innerHTML = '';
}

function checkCountriesLehgth(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    addListMarkup(countries);
  } else if (countries.length === 1) {
    clearMarkup();
    addCardMarkup(countries);
  }
}
function addListMarkup(countries) {
  const markupPreview = countries.reduce(
    (acc, { name, capital, population, flags, languages }) =>
      acc +
      `<li>
    <img
      class="country__image"
      src="${flags.svg}"
      alt="${name.official}"
      width="40px"
      height='24px'
    />
    <h2>${name.official}</h2>
    
  </li>
`,
    '',
  );
  showListMarkup(markupPreview);
}
function showListMarkup(markup) {
  profileListEl.insertAdjacentHTML('afterbegin', markup);
}

function addCardMarkup(countries) {
  //   const languagesValue = countries.map(({ languages }) => Object.values(languages)).join(' ');
  const markupPreview = countries.reduce(
    (acc, { name, capital, population, flags, languages }) =>
      acc +
      `<div>
    <img
      class="country__image"
      src="${flags.svg}"
      alt="${name.official}"
      width="400px"
      height='240px'
    />
    <h2>${name.official}</h2>
    <p>${capital}</p>
    <p>${population}</p>
    <p>${Object.values(languages)}</p>
  </div>
`,
    '',
  );
  showCardMarkup(markupPreview);
}

function showCardMarkup(markup) {
  profileContainerEl.insertAdjacentHTML('afterbegin', markup);
}
