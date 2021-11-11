const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER_URL = '?fields=name,capital,population,flags,languages';

export default class CountriesApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    const url = `${BASE_URL}/name/${this.searchQuery}${FILTER_URL}`;

    return fetch(url).then(response => {
      if (!response.ok) {
        return Promise.reject('Oops, there is no country with that name');
      }
      return response.json();
    });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
