import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function SearchWeather() {

 const [search, setSearch] = useState("");
 const [data, setData] = useState([]);
 const [input, setInput] = useState("");

 // Fetch Weather API - working

 useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=578fee7bbb20ce9336337c7e6d1d17da`).then((response) => {
      setData(response.data.main);
    });
  }, [search]);

 let emoji = null;

 console.log(data.weather);

 // Set emojis
 
 if(typeof data.main != ""){
   
  if(data.includes("Clouds")){
   emoji = "fa-cloud";
  } else if(data.includes("Thunderstorm")){
   emoji = "fa-bolt";
  } else if(data.includes("Drizzle")){
   emoji = "fa-cloud-rain";
  } else if(data.includes("Rain")){
   emoji = "fa-cloud-shower-heavy";
  } else if(data.includes("Snow")){
   emoji = "fa-snow-flake";
  } else if(data.includes("Fog")){
   emoji = "fa-smog";
  } else {
    emoji = "fa-sun";
  }
 } else {
  return(
   <div>Loading...</div>
  )
 }

// Set Temperatures - working
 let temp = (data.temp - 273.15).toFixed(2);
 let temp_min = (data.temp_min - 273.15).toFixed(2);
 let temp_max = (data.temp_max - 273.15).toFixed(2);

//  console.log(temp, temp_min, temp_max)

// Date - working
 let d = new Date();
 let date = d.getDate();
 let year = d.getFullYear();
 let month = d.toLocaleString('default', {month:'long'});
 let day = d.toLocaleString('default', {weekday: 'long'});

 // Time - working
 let time = d.toLocaleString([], {
  hour: '2-digit', minute: '2-digit', second: '2-digit'
 });

 // Search - working 
 const handleSubmit = (event) => {
  event.preventDefault();
  setSearch(input);
 }

  return (
   <div>
    <div className="container mt-5">
     <div className="row justify-content-center">
      <div className="col-md-4">
       <div className="card text-white text-center border-0">
        <img src="https://source.unsplash.com/600x900/?nature,water" className="card-img" alt="..."/>
        <div className="card-img-overlay">
         <form onSubmit={handleSubmit}>
          <div class="input-group mb-4 w-75 mx-auto">
           <input type="text" className="form-control" placeholder="City" aria-label="City" aria-describedby="basic-addon2" name="search"
           value={input} onChange={(e) => setInput(e.target.value)} required />
           <button type="submit" className="input-group-text" id="basic-addon2">
            <i className='fas fa-search'></i>
           </button>
          </div>
         </form>
         <div className='bg-dark bg-opacity-50 py-3 rounded'>
          <h5 className="card-title">{data.name}</h5>
          <p className="card-text lead">{day}, {month} {date}, {year}
           <br/>
           {time}
          </p>
          <hr/>
          <i className={`fas ${emoji} fa-4x`}></i>
          <h1 className='fw-bolder mb-5'> {temp} &deg;C </h1>
          <p className='lead fw-bolder mb-0'> {data.name} </p>
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
