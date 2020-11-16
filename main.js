//  https://restcountries.eu/rest/v2/nname/belgie?fullText=true

// maak een button met een id zodat we die kunnen gebruiken in onze JavScript
// sla de referentie naar deze button op

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', fetchCountryData);

// zet een eventlistener op de button die luistert naar een klik event en dan een functie aanroept
// maak een ASYNC fucntie die de date ophaalt over belgie ( met bovenstaande url)
async function fetchCountryData(){
    try{
        const result =  await axios.get('https://restcountries.eu/rest/v2/name/cuba?fullText=true');
        const testData = result.data[0];
        console.log(testData);
        console.log(`${testData.name} is situated in ${testData.region}. It has a population of ${testData.population} people. The capital is ${testData.capital}.` +getCurrency(testData) + getLanguages(testData));



    }catch (e){
        console.error(e);
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
