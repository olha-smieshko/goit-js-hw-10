import Notiflix from 'notiflix';
import elements from './elements';
import { CountryListMarkup, InfoMarkup, clearListInfo } from "./commons";

// import { CountryListMarkup, InfoMarkup, clearListInfo } from "./commons";

Notiflix.Notify.init({
    width: '280px',
    position: 'center-top',
    opacity: 1,
    timeout: 1500,
  });

export function fetchCountries(name) {
    fetch(
        `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
      )
      .then(response => {
        if (!response.ok) {
            clearListInfo();
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 1) {
            clearListInfo();
            elements.countryList.insertAdjacentHTML('beforeend', InfoMarkup(data));
        } else if (data.length >= 2 && data.length <= 10) {
            clearListInfo();
            elements.countryList.insertAdjacentHTML('beforeend', CountryListMarkup(data));
        } else {
            clearListInfo();
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }        
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
};