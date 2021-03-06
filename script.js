"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

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

const getJSON = function(url, errorMsg) {
    return fetch(url).then((response) => {
        if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
        return response.json();
    });
};

const imgCotainer = document.querySelector(".images");

const createImage = function(imgPath) {
    return new Promise(function(resolve, reject) {
        const img = document.createElement("img");
        img.src = imgPath;
        img.addEventListener("load", function() {
            imgCotainer.appendChild(img);
        });
        resolve(img);
        img.addEventListener("error", function() {
            reject(new Error("Image not found"));
        });
    });
};

// Coding Challenge using then method

// let currentImg;

// createImage("img/img-1.jpg")
//     .then((img) => {
//         currentImg = img;
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = "none";
//         return createImage("img/img-2.jpg");
//     })
//     .then((img) => {
//         currentImg = img;
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = "none";
//     });

// Coding Challenge using async/await

const loadNPause = async function() {
    try {
        let img = await createImage("img/img-1.jpg");
        await wait2(2);
        img.style.display = "none";
        await wait2(2);
        img = await createImage("img/img-2.jpg");
        await wait2(2);
        img.style.display = "none";
    } catch (err) {
        console.error(err);
    }
};

// loadNPause();

const wait2 = function(seconds) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, seconds * 1000);
    });
};

// Using Paralel to run multiple async calls

const get3Coutries = async function(c1, c2, c3) {
    try {
        // const [data1] = await getJSON(
        //     `https://restcountries.eu/rest/v2/name/${c1}`
        // );
        // const [data2] = await getJSON(
        //     `https://restcountries.eu/rest/v2/name/${c2}`
        // );
        // const [data3] = await getJSON(
        //     `https://restcountries.eu/rest/v2/name/${c3}`
        // );

        const data = await Promise.all([
            await getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
            await getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
            await getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
        ]);
        // console.log([data1.capital, data2.capital, data3.capital]);
        console.log(data.map((c) => c[0].capital));
    } catch (err) {
        console.error(err);
    }
};

get3Coutries("poland", "france", "italy");

// Promise.racee

(async function() {
    const res = await Promise.race([
        getJSON(`https://restcountries.eu/rest/v2/name/italy`),
        getJSON(`https://restcountries.eu/rest/v2/name/poland`),
        getJSON(`https://restcountries.eu/rest/v2/name/france`),
    ]);
    console.log(res[0]);
})();

const timeout = function(sec) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error("Request took too long"));
        }, sec * 1000);
    });
};

Promise.race([
        getJSON(`https://restcountries.eu/rest/v2/name/italy`),
        timeout(0.01),
    ])
    .then((res) => console.log(res[0]))
    .catch((err) => console.error(err));

// Promise.allSettled

Promise.allSettled([
    Promise.resolve("Success"),
    Promise.reject("Error"),
    Promise.resolve("Another Success"),
]).then((res) => console.log(res));

// Promise.any

Promise.any([
    Promise.reject("Success"),
    Promise.reject("Error"),
    Promise.resolve("Another Success"),
]).then((res) => console.log(res));

const loadAll = async function(imgArr) {
    try {
        const imgs = imgArr.map(async(img) => await createImage(img));
        console.log(imgs);
        const data = await Promise.all(imgs);
        data.forEach((i) => i.classList.add("parallel"));
        // data.map((i) => i[0].classList.add("parallel"));
    } catch (err) {
        console.error(err);
    }
};

loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);