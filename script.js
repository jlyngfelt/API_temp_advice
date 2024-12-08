let lat = 0;
let long = 0;
const currentContainer = document.querySelector('.current h2');
const advice = document.querySelector('.advice');
const imageContainer = document.querySelector('.tempColor');

const TM = document.querySelector('.TM');
const DA = document.querySelector('.DA');

const highHourlyContainerTM = document.querySelector('.highHourlyTM');
const highHourlyContainerDA = document.querySelector('.highHourlyDA');
const lowHourlyContainerTM = document.querySelector('.lowHourlyTM');
const lowHourlyContainerDA = document.querySelector('.lowHourlyDA');
let tomorrowArray = [];

const form = document.getElementById('cityForm');
const select = document.getElementById('city');
const imageForm = document.getElementById('ImageForm');

const images = [
    '/img/cold.png',
    'img/medium.png',
    'img/warm.png'
]

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Förhindra att formuläret skickas och sidan laddas om
    const selectedCity = select.value; // Hämta det valda värdet
    
    console.log('Vald stad:', selectedCity);
    if (selectedCity == 'gbg') {
        lat = 57.708870;
        long = 11.974560;
    } else if (selectedCity == 'sjds'){
        lat = 11.2529;
        long = -85.8705;
    } else if (selectedCity == 'madrid'){
        lat = 40.416775;
        long = -3.703790
    }
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    
    
    fetch(url)
    .then((response) => {
        // We take the response Promise and return it as JSON.
        console.log(response)
        return response.json();
    })
    .then((json) => {
        // Now we can now use the JSON as a normal object.
        console.log(json);
        const currentTemp = json.current.temperature_2m;
        console.log(currentTemp);
        currentContainer.textContent = currentTemp;
        updateContent(currentContainer);

        imageContainer.classList.remove('none')

       
        if (currentTemp < 5) {
            imageContainer.src = images[0];
            advice.textContent = "På med den varma jackan & glöm inte mössan!"
            generateBackground(TM, '#9DC5C1');
            generateBackground(DA, '#B7C5C3');
            
        } else if (currentTemp >= 5 && currentTemp <= 20) {
            imageContainer.src = images[1];
            advice.textContent = "På med en t-shirt, men glöm inte en extra tröja!"
            generateBackground(TM, '#BCC6AA');
            generateBackground(DA, '#CFD2C9');
            
        } else if (currentTemp > 20){
            imageContainer.src = images[2];
            advice.textContent = "På med baddräkten & glöm inte solglasögonen!"
            generateBackground(TM, '#FFD9A1');
            generateBackground(DA, '#FFE9CA');
        }

        // });

        
        const hourlyTemp = json.hourly.temperature_2m;
        console.log(hourlyTemp);
        
        //Högsta och lägsta temp för imorgon (TM=tomorrow)
        tomorrowArray = hourlyTemp.slice(23,48);

        let lowestTempTM = Math.min(...tomorrowArray);
        updateContent(lowHourlyContainerTM, lowestTempTM)
        let highestTempTM = Math.max(...tomorrowArray);
        updateContent(highHourlyContainerTM, highestTempTM)
        
        //Högsta och lägsta temp för i övermorgon (DA=day after tomorrow)
        tomorrowArray = hourlyTemp.slice(49,74);

        let lowestTempDA = Math.min(...tomorrowArray);
        updateContent(lowHourlyContainerDA, lowestTempDA)
        let highestTempDA = Math.max(...tomorrowArray);
        updateContent(highHourlyContainerDA, highestTempDA)
    });
});

   const updateContent = function(container, temp) {
    container.textContent = temp;
    container.classList.add('show');
   };

   const generateBackground = function(background, hexCode) {
    console.log(background)
    background.style.backgroundColor = hexCode;
   }
   

   
   
   
   
   
    // for (i = 24; i < 48; i++) {
    // }
    // console.log(tomorrowArray)

    // const lowestTemp = Math.min(...hourlyTemp);
    // const highestTemp = Math.max(...hourlyTemp);
    // console.log(lowestTemp)
    // console.log(highestTemp)


        // const tomorrowTemp = hourlyTemp[i];
        // // console.log(tomorrowTemp)
        // hourlyContainer.textContent = tomorrowTemp


// if (hourlyTemp[0] < 0) {
//     currentContainer.src(images[0])
// }








 
