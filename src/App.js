import './App.css';
import axios from 'axios';
import { useState } from "react";

function App() {
  const [weather, setWeather] = useState("Enter a valid IP Address");

  const getWeather = (e) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(e.target.value)) {
      axios.get(`https://api.freegeoip.app/json/${e.target.value}?apikey=db152250-aa45-11ec-8128-4bf2edb46a19`)
      .then(function (response) {
        return axios(`api/location/search/?lattlong=${response.data.latitude},${response.data.longitude}`)
      }).then(function (response) {
        return axios(`api/location/${response.data[0].woeid}/`)
      }).then(function (response){
        setWeather(response.data.consolidated_weather[0].weather_state_name);
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }

  return (
    <div className="App">
      <input type="text" onChange={getWeather}/>
      <div>{ weather }</div>
    </div>
  );
}

export default App;
