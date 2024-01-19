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
        let hourNow = now.getHours();

        console.log(hourNow);
    }
}

async function getCoordinates(cityName){
    try{
        let response = await fetch ("https://api.positionstack.com/v1/forward?access_key=ae54919cf026e2c6e78b7fd29d118521&query=" + cityName);
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
    displayImage(city.current.weather_code);
    let para = document.createElement("p");
    let paraContent = document.createTextNode(city.current.temperature_2m + "°C");
    para.appendChild(paraContent);
    document.querySelector("main").appendChild(para);    

    } catch (error){
        console.log(error);
    }
}

function displayImage(code){
    if (code < 1){
        displayIcon("clear");
    } else if (code < 3){
        displayIcon("partly_cloudy");
    } else if (code < 9){
        displayIcon("cloudy");
    } else if (code < 14){
        displayIcon("foggy");
    } else if (code < 20){
        displayIcon("windy");
    } else if (code < 22){
        displayIcon("rainy");
    } else if (code < 25){
        displayIcon("snowy");
    } else if (code < 26){
        displayIcon("heavy_rain");
    } else if (code < 28){
        displayIcon("heavy_snow");
    } else if (code < 29){
        displayIcon("foggy");
    } else if (code < 30){
        displayIcon("thunderstorm");
    } else if (code > 39 && code < 50){
        displayIcon("foggy");
    } else if (code > 49 && code < 56){
        displayIcon("partly_cloudy");
    } else if (code > 55 && code < 70){
        displayIcon("rainy");
    } else if (code > 69 && code < 77){
        displayIcon("snowy");
    } else if (code > 76 && code < 80){
        displayIcon("snow_grains");
    } else if (code > 79 && code < 85){
        displayIcon("heavy_rain");
    } else if (code > 84 && code < 91){
        displayIcon("heavy_snow");
    } else if (code > 90 && code < 93){
        displayIcon("rainy");
    } else if (code > 92 && code < 95){
        displayIcon("snowy");
    } else if (code > 94 && code < 100){
        displayIcon("thunderstorm");
    } else {
        displayIcon("partly_cloudy");
    }
}

function displayIcon(state){
    let image = document.createElement("img");
    image.src = "assets/resources/pictures/" + state + ".svg";
    image.className = "weatherIcons";
    document.querySelector("main").appendChild(image);
}