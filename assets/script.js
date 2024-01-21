//https://api.open-meteo.com/v1/forecast?latitude=50.4108095&longitude=4.444643&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code

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
        let response = await fetch ("http://api.positionstack.com/v1/forward?access_key=ae54919cf026e2c6e78b7fd29d118521&query=" + cityName);
        let coordinates = await response.json();
        let lat = coordinates.data[0].latitude;
        let long = coordinates.data[0].longitude;

        searchWeather(lat, long, cityName);
    } catch (error){
        console.log(error);
    }
}


async function searchWeather(latitude, longitude, cityName){

    try{
    let response = await fetch ("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code");
    let city = await response.json();

    let todayWeather = document.createElement("div");
    todayWeather.className = "realTimeWeather";
    document.querySelector("main").appendChild(todayWeather);

    displayImage(city.current.weather_code, todayWeather);
    
    let title = document.createElement("h2");
    let titleContent = document.createTextNode(cityName);
    title.appendChild(titleContent);
    document.querySelector(".realTimeWeather").prepend(title);
    

    let para = document.createElement("p");
    let paraContent = document.createTextNode(Math.round(city.current.temperature_2m) + "°C");
    para.appendChild(paraContent);
    document.querySelector(".realTimeWeather").appendChild(para);

    displayTodayData(city);
    displayWeekForecast(city);

    } catch (error){
        console.log(error);
    }
}

function displayImage(code, element){
    if (code < 1){
        displayIcon("clear", "Clear", element);
    } else if (code < 3){
        displayIcon("partly_cloudy", "Partly cloudy", element);
    } else if (code < 9){
        displayIcon("cloudy", "Cloudy", element);
    } else if (code < 14){
        displayIcon("foggy", "Foggy", element);
    } else if (code < 20){
        displayIcon("windy", "Windy", element);
    } else if (code < 22){
        displayIcon("rainy", "Rainy", element);
    } else if (code < 25){
        displayIcon("snowy", "Snowy", element);
    } else if (code < 26){
        displayIcon("heavy_rain", "Heavy rain", element);
    } else if (code < 28){
        displayIcon("heavy_snow", "Heavy snow", element);
    } else if (code < 29){
        displayIcon("foggy", "Foggy", element);
    } else if (code < 30){
        displayIcon("thunderstorm", "Thunderstorm", element);
    } else if (code > 39 && code < 50){
        displayIcon("foggy", "Foggy", element);
    } else if (code > 49 && code < 56){
        displayIcon("partly_cloudy", "Partly cloudy", element);
    } else if (code > 55 && code < 70){
        displayIcon("rainy", "Rainy", element);
    } else if (code > 69 && code < 77){
        displayIcon("snowy", "Snowy", element);
    } else if (code > 76 && code < 80){
        displayIcon("snow_grains", "Snow grains", element);
    } else if (code > 79 && code < 85){
        displayIcon("heavy_rain", "Heavy rain", element);
    } else if (code > 84 && code < 91){
        displayIcon("heavy_snow", "Heavy snow", element);
    } else if (code > 90 && code < 93){
        displayIcon("rainy", "Rain", element);
    } else if (code > 92 && code < 95){
        displayIcon("snowy", "Snowy", element);
    } else if (code > 94 && code < 100){
        displayIcon("thunderstorm", "Thunderstorm", element);
    } else {
        displayIcon("partly_cloudy", "Partly cloudy", element);
    }
}

function displayIcon(state_code, state, element){
    let title = document.createElement("h3");
    let titleContent = document.createTextNode(state);
    title.appendChild(titleContent);
    element.appendChild(title);

    let image = document.createElement("img");
    image.src = "assets/resources/pictures/" + state_code + ".svg";
    image.className = "weatherIcons";
    element.appendChild(image);
}

function displayTodayData(weatherObject){
    let todayData = document.createElement("div");
    let morning = document.createElement("span");
    let noon = document.createElement("span");
    let evening = document.createElement("span");

    let title = document.createElement("h2");
    let titleContent = document.createTextNode("Today's forecast");
    title.appendChild(titleContent);
    document.querySelector('main').appendChild(title);

    document.querySelector('main').appendChild(todayData);
    todayData.appendChild(morning);
    todayData.appendChild(noon);
    todayData.appendChild(evening);
    todayData.className = "todayWeather";

    let morningCode = weatherObject.hourly.weather_code[6];
    displayImage(morningCode, morning);

    let noonCode = weatherObject.hourly.weather_code[12];
    displayImage(noonCode, noon);

    let eveningCode = weatherObject.hourly.weather_code[18];
    displayImage(eveningCode, evening);
}

function displayWeekForecast(weatherObject){
    
}