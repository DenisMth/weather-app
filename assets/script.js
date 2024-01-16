//https://open-meteo.com/en/docs#latitude=50.4114&longitude=4.4445&hourly=temperature_2m,weather_code&daily=

//https://api.open-meteo.com/v1/forecast?latitude=50.4114&longitude=4.4445&hourly=temperature_2m,weather_code

let inputBox = document.querySelector("#inputBox");

let submitButton = document.querySelector("#submitButton");

submitButton.addEventListener('click', (event) =>{
    event.preventDefault();
    displayWeather();
});

function displayWeather(){

    if (inputBox.value != ""){

        getCoordinates(inputBox.value);

    } else {
        console.log('test');
        let now = new Date();
        let dateNow = JSON.stringify(now);

        console.log(dateNow);
    }
}

async function getCoordinates(cityName){
    try{
        let response = await fetch ("http://api.positionstack.com/v1/forward?access_key=ae54919cf026e2c6e78b7fd29d118521&query=" + cityName);
        let coordinates = await response.json();
        let lat = coordinates.data[0].latitude;
        let long = coordinates.data[0].longitude;

        searchWeather(lat, long);
    } catch (error){
        console.log(error);
    }
}


async function searchWeather(latitude, longitude){

    try{
    let response = await fetch ("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code");
    let city = await response.json();
    let para = document.createElement("p");
    let paraContent = document.createTextNode(city.latitude + " " + city.longitude + " " + city.current.temperature_2m );
    para.appendChild(paraContent);
    document.querySelector("main").appendChild(para);

    displayImage(city.current.weather_code);

    } catch (error){
        console.log(error);
    }
}

function displayImage(code){
    switch(code){
        case 0 :
            console.log("Clear sky");
            displayIcon("clear");
        break;
        case 1 :
            console.log("Mainly clear");
            displayIcon("partly_cloudy");
        break;
        case 2 :
            console.log("Partly cloudy");
            displayIcon("partly_cloudy");
        break;
        case 3 :
            console.log("Overcast");
            displayIcon("partly_cloudy");
        break;
        case 45 :
            console.log("Fog");
            displayIcon("foggy");
        break;
        case 48 :
            console.log("Deposting rime fog");
            displayIcon("foggy");
        break;
        case 51 :
            console.log("Light drizzle");
            displayIcon("partly_cloudy");
        break;
        case 53 :
            console.log("Moderate drizzle");
            displayIcon("partly_cloudy");
        break;
        case 55 :
            console.log("Dense drizzle");
            displayIcon("partly_cloudy");
        break;
        case 56 :
            console.log("Light freezing drizzle");
            displayIcon("snowing");
        break;
        case 57 :
            console.log("Dense freezing drizzle");
            displayIcon("snowing");
        break;
        case 61 :
            console.log("Slight rain");
            displayIcon("rainy");
        break;
        case 63 :
            console.log("Moderate rain");
            displayIcon("rainy");
        break;
        case 65 :
            console.log("Heavy rain");
            displayIcon("rainy");
        break;
        case 66 :
            console.log("Light freezing rain");
            displayIcon("rainy");
        break;
        case 67 :
            console.log("Heavy freezing rain");
            displayIcon("rainy");
        break;
        case 71 :
            console.log("Slight snow fall");
            displayIcon("snowing");
        break;
        case 73 :
            console.log("Moderate snow fall");
            displayIcon("snowing");
        break;
        case 75 :
            console.log("Heavy snow fall");
            displayIcon("snowing");
        break;
        case 77 :
            console.log("Snow grains");
            displayIcon("snow_grains");
        break;
        case 80 :
            console.log("Slight rain showers");
            displayIcon("heavy_rain");
        break;
        case 81 :
            console.log("Moderate rain showers");
            displayIcon("heavy_rain");
        break;
        case 82 :
            console.log("Violent rain showers");
            displayIcon("heavy_rain");
        break;
        case 85 :
            console.log("Slight snow showers");
            displayIcon("heavy_snow");
        break;
        case 86 :
            console.log("Heavy snow showers");
            displayIcon("heavy_snow");
        break;
        case 95 :
            console.log("Thunderstorm");
            displayIcon("thunderstorm");
        break;
        case 96 :
            console.log("Slight hail thunderstorm");
            displayIcon("thunderstorm");
        break;
        case 99 :
            console.log("Heavy hail thunderstorm");
            displayIcon("thunderstorm");
        break;
        default:
            console.log("Hello World !");
    }
}

function displayIcon(state){
    let image = document.createElement("img");
    image.src = "assets/resources/pictures/" + state + ".svg";
    document.querySelector("main").appendChild(image);
}