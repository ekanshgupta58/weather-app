const apiKey = "1cbc2832563c564f1af798d65f914305";
const submitBtn = document.getElementById("submitBtn");
const cityInput = document.getElementById("city");
const weatherInfoDiv = document.getElementById("weather-info");
const body = document.querySelector("body");

const temperatureRanges = [
  { minTemp: -20, maxTemp: 0, imgUrl: "cold.jpg" },
  { minTemp: 0, maxTemp: 15, imgUrl: "winter.jpg" },
  { minTemp: 15, maxTemp: 30, imgUrl: "summer.jpg" },
  { minTemp: 30, maxTemp: 40, imgUrl: "hot.jpg" },
];
submitBtn.addEventListener("click", () => {
  const city = cityInput.value;
  const temperatureRanges = [
    { minTemp: -20, maxTemp: 0, imgUrl: "cold.jpg" },
    { minTemp: 0, maxTemp: 15, imgUrl: "winter.jpg" },
    { minTemp: 15, maxTemp: 30, imgUrl: "summer.jpg" },
    { minTemp: 30, maxTemp: 40, imgUrl: "hot.jpg" },
  ];
  
  // Make API call to OpenWeatherMap API
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      const weather = data.weather[0].description;
      const temp = data.main.temp;
      const feelsLike = data.main.feels_like;
      
      var iconcode = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      console.log(iconurl);
      document.querySelector('#wicon').src=iconurl;
      document.querySelector('#wicon').style.visibility="visible";
      temperatureRanges.forEach((range) => {
        if (temp >= range.minTemp && temp <= range.maxTemp) {
          body.style.backgroundImage = `url('${range.imgUrl}')`;
          console.log();
        }

      });
      
      // Update weather information on webpage
      weatherInfoDiv.innerHTML = `
        <p>City: ${city}</p>
        <p>Weather: ${weather}</p>
        <p>Temperature: ${temp}°C</p>
        <p>Feels like: ${feelsLike}°C</p>
      `;
    })
    .catch((error) => console.error(error));
});
