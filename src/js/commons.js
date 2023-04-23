
import elements from "./elements";

export function CountryListMarkup(data) {
    return data.map(({ name, flags }) => 
    `<li class="country-item">
       <img src="${flags.svg}" alt="flag ${name.official}" width="40">
       <p>${name.official}</p>
     </li>`).join('');
  };

export function InfoMarkup(data) {
    return data.map(({ name, flags, capital, population, languages }) =>
        `<p class="country-name">
        <img src="${flags.svg}" alt="country ${name}" width="60"/>
        ${name.official}</p>
        <p style="font-weight: bold">Capital: <span style="font-weight: normal">${capital}</span></p>
        <p style="font-weight: bold">Population: <span style="font-weight: normal">${population}</span></p>
        <p style="font-weight: bold">Languages: <span style="font-weight: normal">${Object.values(languages)}</span></p>`).join('');
  };

export function clearListInfo() {
  if (elements.countryList) {
    elements.countryList.innerHTML = '';
  };
  if (elements.countryInfo) {
    elements.countryInfo.innerHTML = '';
  };
}  