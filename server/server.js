const express = require("express"); ///backend serverfor routing
///const bodyParser = require("body-parser");
const axios = require("axios"); //fetching for 3rd party API
const cors = require("cors"); //cross domain acess react---express
const dotenv = require("dotenv"); //to store env variables
const path = require("path"); //file access//

//Load enviromnent variables
dotenv.config({ path: "./config.env" }); //accesing the variable from config
/////
// node-fetch
const app = express();
/////const API_KEY = "MOVED TO ./config.env";

//configure body-parser for express
///app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
*/
app.get("/", (req, res) => {
  res.status(200).send("Weather App - GET /"); ///if the server is up
});

app.post("/weather", (req, res) => {
  //
  //   console.log("Weather App - POST /weather - Express", process.env.API_KEY);

  // build the weather_url with optional country
  // `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city},${req.body.country}&appid=${process.env.API_KEY}`;
  let weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}`;

  if (req.body.country != null && req.body.country !== "") {
    weather_url += `,${req.body.country}`;
  }

  weather_url += `&appid=${process.env.API_KEY}`;
  console.log(`OpenWeatherMap API Query: ${weather_url}`);

  // call the open weather api & promise
  axios
    .get(weather_url)
    .then((response) => {
      // handle success
      console.log("Weather App - POST /weather - Axios success");
      ////res.status(200).send(JSON.stringify(response.data));///whatever response we get///

      res.status(200).json(response.data);
    })
    .catch((error) => {
      // handle error
      console.log("Weather App - POST /weather - Axios error");
      res.status(500).json({ status: "FAIL", message: error });
    });
});

app.listen(4000, () => {
  console.log("Weather App - Server Started");
});
