import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [convertToEUR, setConvertToEUR] = useState(0);
  const [convertToGBP, setConvertToGBP] = useState(0);
  const [countryDetails, setCountryDetails] = useState(null);
  const [africaCountries, setAfricaCountries] = useState(null);
  const [newYorkMap, setNewYorkMap] = useState(false);
  const [distanceMap, setDistanceMap] = useState(false);
  const [tokyoForecast, setTokyoForecast] = useState(null);
  const [londonWeather, setLondonWeather] = useState(null);

  async function getLondonWeather() {
    setTokyoForecast(null);
    setDistanceMap(false);
    setNewYorkMap(false);
    setCountryDetails(null);
    setConvertToEUR(0);
    setConvertToGBP(0);
    setAfricaCountries(null);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=London&appid=7aae73ee3081e5a30d8dc528ba9d9f3e`
      )
      .then((r) => {
        setLondonWeather(JSON.stringify(r.data, undefined, 4));
      });
  }

  async function getTokyoForecast() {
    setLondonWeather(null);
    setDistanceMap(false);
    setNewYorkMap(false);
    setCountryDetails(null);
    setConvertToEUR(0);
    setConvertToGBP(0);
    setAfricaCountries(null);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=Tokyo&appid=7aae73ee3081e5a30d8dc528ba9d9f3e`
      )
      .then((r) => {
        let forecast = [];
        r.data.list.forEach((fc) => {
          console.log(fc);
          forecast.push(fc);
        });
        setTokyoForecast(forecast);
      });
  }

  function getDistanceMap() {
    setLondonWeather(null);
    setTokyoForecast(null);
    setDistanceMap(true);
    setNewYorkMap(false);
    setCountryDetails(null);
    setConvertToEUR(0);
    setConvertToGBP(0);
    setAfricaCountries(null);

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC2uQBIDMOSyLY_AFP8q5gor5t4XQqiYh0&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      initMap();
    };

    // Initialize the map
    const initMap = () => {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 36.7783, lng: -119.4179 }, // Centered between SF and LA
        zoom: 7,
      });
      directionsRenderer.setMap(map);

      const request = {
        origin: "San Francisco, CA",
        destination: "Los Angeles, CA",
        travelMode: "DRIVING", // You can change this to other modes like 'BICYCLING' or 'WALKING'
      };

      directionsService.route(request, function (result, status) {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        }
      });
    };
  }

  function getNewYorkMap() {
    setLondonWeather(null);
    setTokyoForecast(null);
    setNewYorkMap(true);
    setCountryDetails(null);
    setConvertToEUR(0);
    setConvertToGBP(0);
    setAfricaCountries(null);
    setDistanceMap(false);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC2uQBIDMOSyLY_AFP8q5gor5t4XQqiYh0&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      initMap();
    };

    // Initialize the map
    const initMap = () => {
      const mapOptions = {
        center: { lat: 40.7128, lng: -74.006 }, // New York City coordinates
        zoom: 12,
      };

      const map = new window.google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );
    };
  }

  function convertCurrencyUSD() {
    setLondonWeather(null);
    setTokyoForecast(null);
    setAfricaCountries(null);
    setCountryDetails(null);
    setConvertToGBP(0);
    setNewYorkMap(false);
    setDistanceMap(false);
    axios
      .get(
        `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Y3RUR2TnwTWCvZcolobMjBay8uK4DfCLzqEBYMdK&currencies=EUR&base_currency=USD`
      )
      .then((r) => {
        setConvertToEUR(100 * r.data.data.EUR);
      });
  }
  function convertCurrencyGBP() {
    setLondonWeather(null);
    setTokyoForecast(null);
    setAfricaCountries(null);
    setCountryDetails(null);
    setConvertToEUR(0);
    setNewYorkMap(false);
    setDistanceMap(false);
    axios
      .get(
        `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Y3RUR2TnwTWCvZcolobMjBay8uK4DfCLzqEBYMdK&currencies=GBP&base_currency=JPY`
      )
      .then((r) => {
        setConvertToGBP(1000 * r.data.data.GBP);
      });
  }

  async function getCountryDetails() {
    setLondonWeather(null);
    setTokyoForecast(null);
    setAfricaCountries(null);
    setConvertToGBP(0);
    setConvertToEUR(0);
    setNewYorkMap(false);
    setDistanceMap(false);
    await axios
      .get(
        `https://restcountries.com/v3.1/name/brazil?fields=population,area,languages`
      )
      .then((r) => {
        setCountryDetails(r.data[0]);
      });
  }

  async function getContinentDetails() {
    setLondonWeather(null);
    setTokyoForecast(null);
    setCountryDetails(null);
    setConvertToEUR(0);
    setConvertToGBP(0);
    setNewYorkMap(false);
    setDistanceMap(false);
    return await axios
      .get(`https://restcountries.com/v3.1/all?fields=continents,name`)
      .then((r) => {
        let countries = [];
        r.data.forEach((country) => {
          if (country.continents[0] === "Africa") {
            countries.push(country.name.common);
          }
        });
        setAfricaCountries(countries);
      });
  }

  return (
    <div>
      <div className="App">
        <button class="button" onClick={convertCurrencyUSD}>
          Convert 100 USD to EUR
        </button>
        <button class="button" onClick={convertCurrencyGBP}>
          Convert 1000 JPY to GBP
        </button>
        <button class="button" onClick={getCountryDetails}>
          Details of Brazil
        </button>
        <button class="button" onClick={getContinentDetails}>
          Countries in Africa
        </button>
        <button class="button" onClick={getNewYorkMap}>
          New york Location
        </button>
        <button class="button" onClick={getDistanceMap}>
          Shortest Route between San Franscisco and Los Angeles
        </button>
        <button class="button" onClick={getLondonWeather}>
          London Current Weather
        </button>
        <button class="button" onClick={getTokyoForecast}>
          Tokyo 5-day forecast
        </button>
        {convertToEUR !== 0 && (
          <div classname="mainSlot">
            <h1>100 USD to EUR : {convertToEUR}</h1>
          </div>
        )}
        {convertToGBP !== 0 && (
          <div classname="mainSlot">
            <h1>1000 JPY to GBP : {convertToGBP}</h1>
          </div>
        )}
        {countryDetails && (
          <div classname="mainSlot">
            <h1>Details of Brazil</h1>
            <p>
              <b>Languages : </b>
              {JSON.stringify(countryDetails.languages)}
            </p>
            <p>
              <b>Area : </b>
              {JSON.stringify(countryDetails.area)}
            </p>
            <p>
              <b>Population : </b>
              {JSON.stringify(countryDetails.population)}
            </p>
          </div>
        )}
        {africaCountries && (
          <div classname="mainSlot">
            <h1>Countries in Africa </h1>
            {africaCountries.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        )}
        {newYorkMap && (
          <div classname="mainSlot">
            <div id="map" style={{ width: "100%", height: "800px" }}></div>
          </div>
        )}
        {distanceMap && (
          <div classname="mainSlot">
            <div id="map" style={{ width: "100%", height: "800px" }}></div>
          </div>
        )}
        {tokyoForecast && (
          <div classname="mainSlot">
            <h1>Tokyo 5-day Forecast</h1>
            {tokyoForecast.map((item) => (
              <div>
                <h3>{item.dt_txt}:</h3>
                <p>{JSON.stringify(item, undefined, 4)}</p>
              </div>
            ))}
          </div>
        )}
        {londonWeather && (
          <div classname="mainSlot">
            <h1>Today's London Weather</h1>
            <p>{londonWeather}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
