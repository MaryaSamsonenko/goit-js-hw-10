import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'animate.css';
import CountriesApiService from './services/country-services';
import cardTemplate from './templates/card.hbs';
import listTemplate from './templates/list.hbs';

const countriesApiService = new CountriesApiService();
const DEBOUNCE_DELAY = 600;
const searchboxEl = document.querySelector('#search-box');
const profileListEl = document.querySelector('.country-list');
const profileContainerEl = document.querySelector('.country-info');

searchboxEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  if (searchboxEl.value === '') {
    clearMarkup();
    return;
  }
  clearMarkup();
  countriesApiService.searchQuery = event.target.value;

  countriesApiService.fetchCountries().then(checkCountriesLehgth).catch(Notiflix.Notify.failure);
}

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
  profileListEl.insertAdjacentHTML('afterbegin', listTemplate({ ...countries }));
}

function addCardMarkup(countries) {
  profileContainerEl.insertAdjacentHTML('afterbegin', cardTemplate(...countries));
}
