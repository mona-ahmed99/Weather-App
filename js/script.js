let allWeatherData = [];

async function getData(city) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3f666231b0c740d28a1204333210105&q=${city}&days=3`);
    responseData = await response.json();
    console.log(responseData);
    let firstDay = {
        dayName: getDayName(responseData.forecast.forecastday[0].date),
        date: getMonthDay(responseData.forecast.forecastday[0].date) + "" + getMonthName(responseData.forecast.forecastday[0].date),
        name: responseData.location.name,
        temp: responseData.current.temp_c,
        currentState: responseData.current.condition.icon,
        desc: responseData.current.condition.text,
        humidity: responseData.current.humidity,
        windSpeed: responseData.current.wind_kph,
        windDir: responseData.current.wind_dir,
    };
    let secondDay = {
        dayName: getDayName(responseData.forecast.forecastday[1].date),
        icon: responseData.forecast.forecastday[1].day.condition.icon,
        maxTemp: responseData.forecast.forecastday[1].day.maxtemp_c,
        minTemp: responseData.forecast.forecastday[1].day.mintemp_c,
        desc: responseData.forecast.forecastday[1].day.condition.text,
    }

    let thirdDay = {
        dayName: getDayName(responseData.forecast.forecastday[2].date),
        icon: responseData.forecast.forecastday[2].day.condition.icon,
        maxTemp: responseData.forecast.forecastday[2].day.maxtemp_c,
        minTemp: responseData.forecast.forecastday[2].day.mintemp_c,
        desc: responseData.forecast.forecastday[2].day.condition.text,
    }

    allWeatherData.push(firstDay);
    allWeatherData.push(secondDay);
    allWeatherData.push(thirdDay);
    displayWeather();
};
getData('cairo');



function getDayName(date) {
    let theDate = new Date(date);
    let day = theDate.getDay();
    let dayName = "";
    switch (day) {
        case 0:
            dayName = "Sunday";
            break;
        case 1:
            dayName = "Monday";
            break;
        case 2:
            dayName = "Tuesday";
            break;
        case 3:
            dayName = "Wednesday";
            break;
        case 4:
            dayName = "Thrusday";
            break;
        case 5:
            dayName = "Friday";
            break;
        case 6:
            dayName = "SaturDay";
            break;
    }
    return dayName;
};

function getMonthDay(date) {
    let theDate = new Date(date);
    let dayNumber = theDate.getDate();
    return dayNumber;
};


function getMonthName(date) {
    const monthes = ["january", "February", 'March', "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let theDate = new Date(date);
    let month = theDate.getMonth();
    return monthes[month];
};


let search= document.getElementById("search");
search.addEventListener('keyup',function(){
    if(search.value.length>=3){
        getData(search.value);
    }
});

let searchButton= document.getElementById("submit");
searchButton.addEventListener('click',function(){
    if(search.value.length>=3){
        getData(search.value);
    }
});

function displayWeather() {
    let cartoona = ``;
    cartoona = `
<div class="forecast today col-lg-4 ">
    <div class="forecast-header d-flex justify-content-between py-2">
        <div class="day pl-2">${allWeatherData[0].dayName}</div>
        <div class="date pr-2 ">${allWeatherData[0].date}</div>
    </div>
    <div class="forecast-content">
        <div class="location py-3 pl-2">${allWeatherData[0].name}</div>
        <div class="degree d-flex justify-content-between ">
            <div class="num pl-2">
                ${allWeatherData[0].temp}<sup>o</sup>c
            </div>
            <div class="forecast-icon pr-2 pt-4"><img src="https:${allWeatherData[0].currentState}" alt width="90"></div>
        </div>
        <div class="custom">${allWeatherData[0].desc}</div>
        <div class="pb-3">
            <span class=" pl-2"> <img src="images/icon-umberella.png" alt="" class="pr-2">${allWeatherData[0].humidity}%</span>
            <span> <img src="images/icon-wind.png" alt="" class="pr-2">${allWeatherData[0].windSpeed}km/h</span>
            <span><img src="images/icon-compass.png" alt="" class="pr-2">${allWeatherData[0].windDir}</span>
        </div>
    </div>
</div>
<div class="forecast col-lg-4">
<div class="forecast-header py-2">
<div class="day text-center">${allWeatherData[1].dayName}</div>
</div>
<div class="forecast-content text-center">
 <div class="forecast-icon py-4"><img src="https:${allWeatherData[1].icon}" alt width="48"></div>
<div class="degree">
 ${allWeatherData[1].maxTemp} <sup>o</sup>c
</div>
<div class="small">${allWeatherData[1].minTemp}<sup>o</sup></div>
<div class="custom">${allWeatherData[1].desc}</div>
</div>
</div>
<div class="forecast col-lg-4">
<div class="forecast-header py-2">
    <div class="day text-center">${allWeatherData[2].dayName}</div>
</div>
<div class="forecast-content text-center ">
    <div class="forecast-icon py-4"><img src="https:${allWeatherData[2].icon}" alt width="48"></div>
    <div class="degree">
    ${allWeatherData[2].maxTemp} <sup>o</sup>c
    </div>
    <div class="small">${allWeatherData[2].minTemp}<sup>o</sup></div>
    <div class="custom">${allWeatherData[2].desc}</div>
</div>
</div>
`
document.getElementById("forecastTable").innerHTML=cartoona;
allWeatherData.length=0;

};
