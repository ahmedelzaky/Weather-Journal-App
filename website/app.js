/* Global Variables */
const WeatherApi = `http://api.openweathermap.org/data/2.5/forecast?zip=`;
const ApiKey = `&appid=bff55bc84c407f64c5a2b59a1116d5af&units=imperial'`;
let generateButton = document.querySelector("#generate");

// Create a new date instance dynamically with JS
let DATE = new Date();
let newDate =
  DATE.getDate() + "." + (DATE.getMonth() + 1) + "." + DATE.getFullYear();

//addEventListener to perform function when clicking on 'generate' button.
generateButton.addEventListener("click", perform);

//calling getWeather.
function perform() {
  let zip = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  getWeather(WeatherApi, zip, ApiKey)
    .then(function (data) {
      // sending weather info to the local server.
      transData("/add", {
        date: newDate,
        temp: data.list[0].main.temp,
        temp_max: data.list[1].main.temp_max,
        content: feelings,
      });
      //calling the function to update UI.
    })
    .then(function () {
      updateUI();
    });
}

//get the weather info  from 'openweather.org' .
const getWeather = async (url, zip, key) => {
  const res = await fetch(url + zip + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
//getting weather data from local server.
const transData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
// updating the ui dynamcily.
let updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("temp").innerHTML = `Temperature: ${(
      allData.temp - 273
    ).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })} C°  And Equal ${(((allData.temp - 273) * 9) / 5 + 32).toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    )} F°`;
    document.getElementById(
      "content"
    ).innerHTML = `Feeling: ${allData.content}`;
  } catch (error) {
    console.log("error", error);
  }
};
