export { fetchCountries };

const url = `https://restcountries.com/v3.1/name/`;
const filterUrl = '?fields=name,capital,population,flags,languages';

function fetchCountries(searchQuery) {
  return fetch(`${url}${searchQuery}${filterUrl}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
