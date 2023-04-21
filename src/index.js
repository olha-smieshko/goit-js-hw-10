import './css/styles.css';
import elements from './js/elements';
import { fetchCountries } from './js/fetchCountries';
import {clearListInfo} from './js/commons';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

elements.inputEl.addEventListener('input', debounce(onInputEl, DEBOUNCE_DELAY));

function onInputEl() {
    if (!elements.inputEl.value) {
      clearListInfo();
      return; 
    }
    fetchCountries(elements.inputEl.value.trim());
}
