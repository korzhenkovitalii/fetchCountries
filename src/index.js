import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryCardContainer: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries(event) {
  event.preventDefault();
  const searchQuery = event.target.value.trim();

  //Fetch запрос
  fetchCountries(searchQuery).then(onCountry).catch(onError);
}

//Условия поиска стран
function onCountry(countries) {
  clearCountryList();

  if (countries.length >= 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if ((countries.length > 1) & (countries.length < 10)) {
    countriesInfo(countries);
  } else if (countries.length <= 1) {
    countryInfo(countries);
  }
}

//Очистка разметки
function clearCountryList() {
  refs.countryList.innerHTML = '';
  refs.countryCardContainer.innerHTML = '';
}

//Если результат = от 2 до 10 стран
function countriesInfo(countries) {
  const markup = countries
    .map(({ flags: { svg }, name: { official } }) => {
      return `<li class= 'countries-info'><img class = country-img src="${svg}" alt="${name.official}" width="30" hight="30">
            <p>${official}</p></li>`;
    })
    .join('');
  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

//Если результат равен 1 стране
function countryInfo(countries) {
  const markup = countries
    .map(
      country =>
        `<img class = country-img src="${country.flags.svg}" alt="${
          country.name.official
        }" width="60"><h2>${
          country.name.official
        }</h2><p class="country-info_description">Capital: <span class="country-info_value">${
          country.capital
        }</span><p><p class="country-info_description">Population: <span class="country-info_value">${
          country.population
        }</span><p><p class="country-info_description">Languages: <span class="country-info_value">${Object.entries(
          country.languages
        )}</span><p>`
    )
    .join('');
  refs.countryCardContainer.insertAdjacentHTML('beforeend', markup);
}
//Обработка ошибки
function onError() {
  return Notiflix.Notify.failure('Oops, there is no country with that name');
}
