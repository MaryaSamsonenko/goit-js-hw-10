import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountry } from './services/api';
import Notiflix from 'notiflix';
import 'animate.css';

const DEBOUNCE_DELAY = 600;
const searchboxEl = document.querySelector('#search-box');
const profileListEl = document.querySelector('.country-list');
const profileContainerEl = document.querySelector('.country-info');

searchboxEl.addEventListener(
  'input',
  debounce(() => {
    if (searchboxEl.value === '') {
      clearMarkup();
      return;
    }
    clearMarkup();
    fetchCountry(searchboxEl.value)
      .then(countrydata => checkCountriesLehgth(countrydata))
      .catch(Notiflix.Notify.failure);
  }, DEBOUNCE_DELAY),
);

function clearMarkup() {
  profileListEl.innerHTML = '';
  profileContainerEl.innerHTML = '';
}

function checkCountriesLehgth(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    addListMarkup(countries);
  } else if (countries.length === 1) {
    // clearMarkup();
    addCardMarkup(countries);
  }
}
function addListMarkup(countries) {
  const markupPreview = countries.reduce(
    (acc, { name, capital, population, flags, languages }) =>
      acc +
      `<li class='card-item animate__animated animate__fadeInUp'>
    <img class="country-image"
      alt="${name.official}"
      width="40px"
      height='24px'
      src="${flags.svg}"/>
         
    <h2 class="country-title">${name.official}</h2>
    
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
  const languagesValue = Object.values(countries[0].languages).join(',' + ' ');

  const markupPreview = countries.reduce(
    (acc, { name, capital, population, flags, languages }) =>
      acc +
      `<div class="wrapper-card animate__animated animate__slideInUp">
    <img
      class="country-image-one"
      src="${flags.svg}"
      alt="${name.official}"
      width="300px"
      height='200px'
    />
    <h2 class='wrapper-card-title'>${name.official}</h2>
    <p class='wrapper-card-text'>Capital: ${capital}</p>
    <p class='wrapper-card-text'>Population: ${population}</p>
    <p class='wrapper-card-text'>Languages: ${languagesValue}</p>
  </div>
`,
    '',
  );
  showCardMarkup(markupPreview);
}

function showCardMarkup(markup) {
  profileContainerEl.insertAdjacentHTML('afterbegin', markup);
}
