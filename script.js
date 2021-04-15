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

// btn.addEventListener("click", function() {
//     getCountryData("poland");
// });

// Test Data [ 52,508,13,381]
// Test Data 2 [19,037,72,873]
// Test Data = [-33.933,18.474]

// const whereAmI = (lat, lang) => {
//     fetch(`https://geocode.xyz/${lat},${lang}?geoit=json`)
//         .then((response) => {
//             if (!response.ok) throw new Error("Problem with geocoding");
//             return response.json();
//         })
//         .then((data) => {
//             console.log(`You are in ${data.city}, ${data.country}`);
//             return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//         })
//         .then((response) => {
//             return response.json();
//         })
//         .then((data2) => {
//             insertCountry(data2[0]);
//         })
//         .catch((err) => console.log(`${err.message}`));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// console.log(`Test start`);
// setTimeout(() => console.log(`0 sec timer`), 0);
// Promise.resolve("Resolved promise 1").then((res) => console.log(res));
// Promise.resolve("Resolve promise 2").then((res) => {
//     for (let i = 0; i < 1000; i++) {
//         console.log(res);
//     }
// });
// console.log(`Test End`);

// const loterry = new Promise(function(resolve, reject) {
//     console.log(`Lottery draw`);
//     setInterval(function() {
//         if (Math.random() >= 0.5) {
//             resolve(`You WIN `);
//         } else {
//             reject(`You lost your money. Fuck you`);
//         }
//     }, 2000);
// });

// loterry
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));

// Promisyfing

// wait(2)
//     .then(() => {
//         console.log("1 second passed");
//         return wait(1);
//     })
//     .then(() => {
//         console.log("1 second passed");
//         return wait(1);
//     })
//     .then(() => {
//         console.log("1 second passed");
//         return wait(1);
//     })
//     .then(() => {
//         console.log("1 second passed");
//         return wait(1);
//     });

// Promise.resolve("abc").then((x) => console.log(x));
// Promise.reject("abc").catch((x) => console.error(x));

navigator.geolocation.getCurrentPosition((position) => {
    console.log(position), (err) => console.log(err);
});

// getPosition().then((pos) => console.log(pos));

// const whereAmI = () => {
//     getPosition()
//         .then((pos) => {
//             console.log(pos);
//             const { latitude: lat, longitude: lang } = pos.coords;
//             return fetch(`https://geocode.xyz/${lat},${lang}?geoit=json`);
//         })

//     .then((response) => {
//             if (!response.ok) throw new Error("Problem with geocoding");
//             return response.json();
//         })
//         .then((data) => {
//             console.log(`You are in ${data.city}, ${data.country}`);
//             return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//         })
//         .then((response) => {
//             return response.json();
//         })
//         .then((data2) => {
//             insertCountry(data2[0]);
//         })
//         .catch((err) => console.log(`${err.message}`));
// };

// btn.addEventListener("click", whereAmI);

const wait = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

const getPosition = function() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition((position, err) => {
            resolve(position), reject(err);
        });
    });
};

const whereAmI2 = async function() {
    try {
        // Geolocation
        const pos = await getPosition();
        const { latitude: lat, longitude: lang } = pos.coords;
        // Reverse Geocoding
        const geo = await fetch(`https://geocode.xyz/${lat},${lang}?geoit=json`);
        if (!geo.ok) throw new Error("Problem getting location data");
        const dataGeo = await geo.json();
        // Country Data
        const res = await fetch(
            `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
        );
        if (!res.ok) throw new Error("Problem getting country");

        const data = await res.json();

        insertCountry(data[0]);
        return `You are in ${dataGeo.country}`;
    } catch (err) {
        renderError("Something went wrong");
        // Reject promise returned from async function
        throw err;
    }
};

console.log("first");
// const city = whereAmI2();
// console.log(city);

console.log("end");

(async function() {
    try {
        const city = await whereAmI2();
        console.log(city);
    } catch (err) {
        console.log(err);
    }
    console.log("3");
})();

btn.addEventListener("click", whereAmI2);