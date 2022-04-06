import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [data, setData] = useState({});
  const unit = 'metric'; //can be changed to imperial too
  const [location, setLocation] = useState('');
  const apiKey = '89e7c20ce68ddb727abc827604ea55af';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`;

  const searchLocation = event => {
    event.key === 'Enter' &&
      axios.get(url).then(res => {
        setData(res.data);

        console.log(res.data);
      }) &&
      setLocation('');
  };

  return (
    <div className='app'>
      <div className='search'>
        <input
          type='text'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={event => {
            searchLocation(event);
          }}
          placeholder='Enter Location'
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>
              {data.name}, <span>{data.main && data.sys.country}</span>{' '}
            </p>
          </div>
          <div className='temp'>
            {data.main ? <h1> {data.main.temp.toFixed()} ºC</h1> : null}
          </div>
          <div className='description'>
            <p>{data.main && data.weather[0].main}</p>
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            {data.main ? (
              <p className='bold'>{data.main.feels_like.toFixed()} ºC</p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? (
              <p className='bold'>
                {data.main && data.main.humidity.toFixed()} %
              </p>
            ) : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.main ? (
              <p className='bold'>{data.main && data.wind.speed} KPH</p>
            ) : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
