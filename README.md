# Project Title

- ## Weather Journal App

# Demo-Preview

## demo
(![Alt text](website/screenSnap.png)

# Table of contents

- [Project Title](#project-title)
- [Demo Preview](#demo-preview)
- [Development](#development)
- [Sponsor](#sponsor)
- [License](#license)
- [Contribute](#contribute)

# Development

- a web weather journal app with dynamicly updated ui using javascript.

```javascript
let updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("temp").innerHTML = `Temperature: ${(
      allData.temp - 273.15
    ).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })} C°  And Equal ${(((allData.temp - 273.15) * 9) / 5 + 32).toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    )} F°`;
    document.getElementById(
      "content"
    ).innerHTML = `Feeling: ${allData.content}`;
  }
}
```

- provid accurate temperature with openweather.org .

```javascript
getWeather(WeatherApi, zip, ApiKey)
  .then(function (data) {
    // sending weather info to the local server.
    transData("/add", {
      date: newDate,
      temp: data.list[0].main.temp,
      content: feelings,
    });
    //calling the function to update UI.
  })
  .then(function () {
    updateUI();
  });
```

- store weather data recived to a local server

```javascript
const port = 8080;
const server = app.listen(port, () => {
  console.log("Server Is Running!\nClick http://localhost:8080/ To View.");
});
//TODO: send projectData object data when recieves an request and then reset the object.
app.get("/all", sendData);
function sendData(req, res) {
  res.send(projectData);
  //reset object to default value after finishing processes.
  projectData = {};
}
//TODO: add the data recived to projectData object.
app.post("/add", addData);
function addData(req, res) {
  console.log(req.body);
  newData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };
  projectData = newData;
}
```

# Sponsor

- [udacity](https://www.udacity.com/)
- [fwd](https://egfwd.com/)

# License

- [udacity](https://www.udacity.com/)

# Contribute

- [My Github](https://github.com/ahmedelzaky)
