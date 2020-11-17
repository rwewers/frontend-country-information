
// refereer naar de zoek knop === vraag 1 ====
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', getCountryData);


// ============== vraag 8 ===============
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keyup', setQuery);

const countryContainer = document.getElementById('countries');

// ======= vraag 9 & 11 ======

// globale variable??
let query = '';

function  setQuery(e){
    query = e.target.value;
    if (e.key === 'Enter'){
        getCountryData();
    }
}

async function getCountryData(){
    //zorgt er voor als er een request gedsaan word het zoekveld leeg gemaakt word.
    searchBar.value = '';

    // sla de referentie naar onze error message op en haal de tekst weg bij elke nieuwe zoekopdracht.
    //(als er iets miss gaat, word íe in de catch block opnieuwe toegevoegd)

    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent='';

    // sla de referentie op naar de country-contaner waarin de informatie van een land st aat
    const previousSearchRessult = document.getElementById('country');

    // als deze referentie bestaat dan halen we deze eerst weg
    if(previousSearchRessult){
        countryContainer.removeChild(previousSearchRessult);
    }


    try{
        const result =  await axios.get(`https://restcountries.eu/rest/v2/name/${query}?fullText=true`);
        const countryInfo = result.data[0];
        console.log(countryInfo);

        // maak een country-container en geef hem de id country
        // (zodat we m de volgende keer kunnen herkennen en kunnen checken of er al een land op de pagina staat)
        const country = document.createElement('div');
        country.setAttribute('id', 'country');

        // maak de img tag om de vlag weer in te geven
        const flag = document.createElement('img');

        // stop de image url in het srz attribuut van img
        flag.setAttribute('src', countryInfo.flag);
        country.appendChild(flag);

        // maak de <h1> element voor de titel
        const countryName = document.createElement('img');
        countryName.textContent = countryInfo.name;
        country.appendChild(countryName);

        // maak een <p> voor de informatie
        const population = document.createElement('p');
        population.textContent =`${countryInfo.name} is situated in ${countryInfo.subregion}. It has a population of ${countryInfo.population}.`
        country.appendChild(population)

        // maak een <p> aan voor nog meer informate
        const capital = document.createElement('p');
        capital.textContent = `The capital is ${countryInfo.capital} ${getCurrency(countryInfo)}`;
        country.append(capital);

        // maak een <p> aan voor de talen
        const languages = document.createElement('p');
        languages.textContent = getLanguages(countryInfo);
        country.appendChild(languages);


        countryContainer.appendChild(country);



    }catch (e){
        console.error(e);
        errorMessage.textContent = `${query} bestaat niet. Probeer het opnieuw!`
    }
}


  function getCurrency(testData){
    testData1 = testData;
   let returnString = " And u can pay with ";
      for (let i = 0; i <testData.currencies.length ; i++) {

          if (testData1.currencies.length == 1) {
               returnString += testData1.currencies[i].name + "s.";
          }

          else if(i == testData1.currencies.length -1){
              returnString += testData1.currencies[i].name + '.';
          }
          else{
              returnString += testData1.currencies[i].name+ 's, '
          }

      }
    return returnString;


}

function getLanguages(testData){

    testData1 = testData;
    let returnString = " They speak: ";
    for (let i = 0; i <testData.languages.length ; i++) {

        if(i == testData.languages.length-1){
            returnString += testData.languages[i].name +'.';
        }
        else{
            returnString += testData.languages[i].name + ", ";

        }
    }
    return returnString;
}
