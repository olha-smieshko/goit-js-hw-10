import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import elements from './js/elements';
import { CountryListMarkup, InfoMarkup, clearListInfo } from "./js/commons";

Notiflix.Notify.init({
    width: '280px',
    position: 'center-top',
    opacity: 1,
    timeout: 1500,
  });

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

elements.inputEl.addEventListener('input', debounce(onInputEl, DEBOUNCE_DELAY));

function onInputEl() {
    if (!elements.inputEl.value) {
      clearListInfo();
      return; 
    }
    fetchCountries(elements.inputEl.value.trim())
    .then(data => {
      if (data.length === 1) {
          clearListInfo();
          elements.countryList.insertAdjacentHTML('beforeend', InfoMarkup(data));
      } else if (data.length >= 2 && data.length <= 10) {
          clearListInfo();
          elements.countryList.insertAdjacentHTML('beforeend', CountryListMarkup(data));
      } else {
          
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
          clearListInfo();
      }        
    })
    .catch(error => {
      if (error.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        elements.inputEl.value = '';
        clearListInfo();
        return;
      };
      Notiflix.Notify.warning('Oops, some unexpected error, pls. try againe 😱');
      elements.inputEl.value = '';
      clearListInfo();
    });
}
