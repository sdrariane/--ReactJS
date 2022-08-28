import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function SearchWeather() {

 const [search, setSearch] = useState("London");
 const [data, setData] = useState([]);
 const [input, setInput] = useState("");
 let componentMounted = true;

 {/* Fetch Weather API - working */}
 useEffect(() => {
  const fetchWeather = async () => {
   const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=578fee7bbb20ce9336337c7e6d1d17da&lang={en}`);
   if(componentMounted){
    setData(await response.json());
    console.log(data);
   }
   return () => {
    componentMounted = false;
   }
  }
  fetchWeather();
 }, [search]);

 let emoji = null;

 {/* JSONPath */}
 var jp = require('jsonpath');
 var weather = jp.nodes(data, '$.weather[0].main');
 var json_temp = jp.nodes(data, '$.main.temp');
 var json_temp_min = jp.nodes(data, '$.main.temp_min');
 var json_temp_max = jp.nodes(data, '$.main.temp_max');
 var json_city_name = jp.nodes(data, '$.name');

 {/* Set Emojis */}
 
 if(typeof data.main != null){
  if(weather == "Clouds"){
   emoji = "fa-cloud";
  } else if(weather == "Thunderstorm"){
   emoji = "fa-bolt";
  } else if(weather == "Drizzle"){
   emoji = "fa-cloud-rain";
  } else if(weather == "Rain"){
   emoji = "fa-cloud-shower-heavy";
  } else if(weather == "Snow"){
   emoji = "fa-snow-flake";
  } else {
   emoji = "fa-smog";
  }
 } else {
  return(
   <div>Loading...</div>
  )
 }

 {/* Set Temperatures - working */}
 let temp = (data.main.temp - 273.15).toFixed(2);
 let temp_min = (data.main.temp_min - 273.15).toFixed(2);
 let temp_max = (data.main.temp_max - 273.15).toFixed(2);

 {/* Date - working */}
 let d = new Date();
 let date = d.getDate();
 let year = d.getFullYear();
 let month = d.toLocaleString('default', {month:'long'});
 let day = d.toLocaleString('default', {weekday: 'long'});

 {/* Time - working */}
 let time = d.toLocaleString([], {
  hour: '2-digit', minute: '2-digit', second: '2-digit'
 });

 {/* Search - working */}
 const handleSubmit = (event) => {
  event.preventDefault();
  setSearch(input);
 }

  return (
   <div>
    <div className="container mt-5">
     <div className="row justify-content-center">
      <div className="col-md-4">
       <div class="card text-white text-center border-0">
        <img src="https://source.unsplash.com/600x900/?nature,water" class="card-img" alt="..."/>
        <div class="card-img-overlay">
         <form onSubmit={handleSubmit}>
          <div class="input-group mb-4 w-75 mx-auto">
           <input type="text" class="form-control" placeholder="City" aria-label="City" aria-describedby="basic-addon2" name="search"
           value={input} onChange={(e) => setInput(e.target.value)} required />
           <button type="submit" class="input-group-text" id="basic-addon2">
            <i className='fas fa-search'></i>
           </button>
          </div>
         </form>
         <div className='bg-dark bg-opacity-50 py-3 rounded'>
          <h5 class="card-title">{json_city_name}</h5>
          <p class="card-text lead">{day}, {month} {date}, {year}
           <br/>
           {time}
          </p>
          <hr/>
          <i className={'fas ${emoji} fa-4x'}></i>
          <h1 className='fw-bolder mb-5'> {temp} &deg;C </h1>
          <p className='lead fw-bolder mb-0'> {weather}</p>
          <p className='lead'> {temp_min} &deg;C | {temp_max} &deg;C </p>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  );
}

export default SearchWeather;