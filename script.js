"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const getJSON = function(url, errorMsg) {
    return fetch(url).then((response) => {
        if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
        return response.json();
    });
};

const insertCountry = function(data, className = "") {
    const html = `  <article class="country ${className}">
<img class="country__img" src="${data.flag}" />
<div class="country__data">
  <h3 class="country__name">${data.name}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    1
  )}</p>
  <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
  <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
</div>
</article>`;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function(country) {
//     // Ajax Call
//     const request = new XMLHttpRequest();
//     request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();
//     request.addEventListener("load", function() {
//         const [data] = JSON.parse(this.responseText);
//         // Render First Country
//         insertCountry(data);

//         // Render Neighbours
//         const [neighbour] = data.borders;
//         if (!neighbour) return;
//         const request2 = new XMLHttpRequest();
//         request2.open("GET", `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//         request2.send();
//         request2.addEventListener("load", function() {
//             const data2 = JSON.parse(this.responseText);
//             insertCountry(data2, "neighbour");
//         });
//     });
// };

// getCountryAndNeighbour("poland");

// const request = new XMLHttpRequest();
//     request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();

// Handling Promises

const renderError = function(msg) {
    countriesContainer.insertAdjacentText("beforeend", msg);
    countriesContainer.style.opacity = 1;
};

const getCountryData = function(country) {
    // Country 1
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then((response) => {
            if (!response.ok)
                throw new Error(`Country not found(${response.status})`);
            return response.json();
        })
        .then((data) => {
            insertCountry(data[0]);
            // Country 1 neighbour
            const neighbour = data[0].borders[0];
            if (!neighbour) return;
            return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
        })
        .then((response) => {
            if (!response.ok)
                throw new Error(`Country not found(${response.status})`);
            return response.json();
        })
        .then((data) => insertCountry(data, "neighbour"))
        .catch((err) => {
            console.log(err);
            renderError(`Something went wrong  ${err.message} , Try again`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};
// getCountryData("israel");

btn.addEventListener("click", function() {
    getCountryData("poland");
});