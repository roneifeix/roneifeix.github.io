/* "todo 01" estado da aplicação ( state ) */
let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

/* "todo 02"  */
window.addEventListener('load', () => {
   /* "todo 03" */
   tabCountries = document.querySelector('#tabCountries');
   tabFavorites = document.querySelector('#tabFavorites');
   countCountries = document.querySelector('#countCountries');
   countFavorites = document.querySelector('#countFavorites');
   totalPopulationList = document.querySelector('#totalPopulationList');
   totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

   numberFormat =Intl.NumberFormat('pt-BR');

   fetchCountries();
});
/* "todo 04" */
async function fetchCountries() {
   const res = await fetch('https://restcountries.eu/rest/v2/all');
   const json = await res.json();
   /* "todo 05" */
   allCountries = json.map(country => {
      // Destructuring
      const { numericCode, translations, population, flag } = country;
      return {
         id: numericCode,
         nome: translations.pt,
         populacao: population,
         populacaoFormatada: formatNumber(population),
         bandeira: flag
      }
   });
   //* formatação NOME em ordem alfabética
   allCountries.sort((a, b) => {
      return a.nome.localeCompare(b.nome);
   });//*
   
   render();
};
/* "todo 05" */
function render() {
   renderCountryList();
   renderFavorites();
   renderSummary();

   handleCountryButtons();
}
/* "todo 06" */
function renderCountryList() {
   let countriesHTML = '<div class="countries">';

   allCountries.forEach(country => {
      const { id, nome, populacaoFormatada, bandeira } = country;

      const countryHTML = `
         <div class="country">
            <div class="valign-wrapper">
               <a id="${id}" class="btn green darken-3 ">
                  <i class="material-icons">add</i>
               </a>
            </div>
            <div class="valign-wrapper">
               <img src="${bandeira}" alt"${nome}">
            </div>
            <div class="valign-wrapper">
               <ul>
                  <li><b>${nome}</b></li>
                  <li>${populacaoFormatada}</li>
               <ul>
            </div>
         </div>
      `;

      countriesHTML += countryHTML;
   });

   countriesHTML += '</div>';

   tabCountries.innerHTML = countriesHTML;
};
/* "todo 07" */
function renderFavorites() {
   let favoritesHTML = '<div class="countries">';

   favoriteCountries.forEach(country => {
      const { id, nome, populacaoFormatada, bandeira } = country;

      const favoriteCountryHTML = `
         <div class="country">
            <div class="valign-wrapper">
               <a id="${id}" class="btn red darken-4">
                  <i class="material-icons">clear</i>
               </a>
            </div>
            <div class="valign-wrapper">
               <img src="${bandeira}" alt="${nome}">
            </div>
            <div class="valign-wrapper">
               <ul>
                  <li><b>${nome}</b></li>
                  <li>${populacaoFormatada}</li>
               </ul>
            </div>
         </div>
      `;

      favoritesHTML += favoriteCountryHTML;
   });

   favoritesHTML += '</div>';

   tabFavorites.innerHTML = favoritesHTML;
};
/* "todo 08" */
function renderSummary() {
   countCountries.textContent = allCountries.length;
   countFavorites.textContent = favoriteCountries.length;

   const totalPopulation = allCountries.reduce((accumulator, current) => {
      return accumulator + current.populacao;
   }, 0);
   
   const totalFavorites = favoriteCountries.reduce((accumulator, current) => {
      return accumulator + current.populacao;
   }, 0);
   
   totalPopulationList.textContent = formatNumber(totalPopulation);
   totalPopulationFavorites.textContent = formatNumber(totalFavorites);
};
/* "todo 09" */
function handleCountryButtons() {
   const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
   const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

   countryButtons.forEach(button => {
      button.addEventListener('click', () => addToFavorites(button.id));
   });

   favoriteButtons.forEach(button => {
      button.addEventListener('click', () => removeFromFavorites(button.id));
   });
};
/* "todo 10" */
function addToFavorites(id) {
   const countryToAdd = allCountries.find(country => country.id === id);
   
   
   favoriteCountries = [...favoriteCountries, countryToAdd];
   
   favoriteCountries.sort((a, b) => {
      return a.nome.localeCompare(b.nome);
   });

   allCountries = allCountries.filter(country => country.id !== id);
   
   render();
}
/* "todo 11" */
function removeFromFavorites(id) {
   const countryToRemove = favoriteCountries.find(country => country.id === id);

   allCountries = [...allCountries, countryToRemove];

   allCountries.sort((a, b) => {
      return a.nome.localeCompare(b.nome);
   });

   favoriteCountries = favoriteCountries.filter(country => country.id !== id);

   render();
}

function formatNumber(number) {
   return numberFormat.format(number);
}