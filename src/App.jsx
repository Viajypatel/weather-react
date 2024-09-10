//imports all needed imgage from assets images and required icon from react icon 
// and css file and userState hook 

import { IoIosSearch } from 'react-icons/io';
import cloudImage from './assets/images/clouds.png';
import humidity from './assets/images/humidity.png';
import wind from './assets/images/wind.png';
import snow from './assets/images/snow.png';
import mist from './assets/images/mist.png';
import drizzle from './assets/images/drizzle.png';
import './App.css';
import { useState } from 'react';

function App() {
  // declration of usestate to manage the state variable 
  //  store city name when user enter name in input field
  const [city, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);//store weather data in weatherData variable
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  const handleSearchClick = async () => {

    if (city.trim() === "") {    //chek if empty string then  and 
      setErrorMessage("Please enter a city name.");   //set the errorMessage
      setWeatherData(null);    //setweather data null
      return;
    }

    if (city.trim()) //city.trim() removes all leading and trailing whitespace from the city string.
    {
      try {          //error handing using try and catch block if any error occur during the execution of the code

        // Define the API key for authentication
        const apiKey = 'edab8004c51f226dbe1f84f1a6799d63';

        // Fetch weather data from the OpenWeatherMap API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        if (response.status === 404) {
          // If the city is not found then respnse.statue return 404
          setErrorMessage("City not found.");
          setWeatherData(null); // Reset weather data null
        }

        else if (response.ok) {   //if city is found response.ok return 200
          const data = await response.json();//method converts the raw response data into a JavaScript object,
          setWeatherData(data);
          setErrorMessage(""); // Reset error message if the city is found

          console.log(data);
        } else {
          throw new Error("Error fetching weather data");
        }
      } catch (err) {               //handle the error if any error occurs insdie try block
        console.error('Error fetching weather data:', err);
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  //jsx (javascript XML) this is allow to write both html and javascript code inside React
  return (
     // Outer container div that takes full screen height (h-screen), centers its content
    <div className='bg-image h-screen flex justify-center items-center p-4'>

     {/* Main container that is rounded, has a custom background color, auto-adjusts height (h-auto), 
        and adjusts width based on screen size (responsive design). Padding is added for spacing. */}
      <div className="text-white font-semibold border border-orange-100 rounded-md bg-custom-blue h-auto w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6">
        <div className='search mb-4 relative'>
          <input
            type="text"
            value={city}
            onChange={(e) => { setCityName(e.target.value); setErrorMessage(""); }}
            className='bg-custom-blue border border-2 border-white h-10 w-full rounded-lg pr-10 pl-4 placeholder-white'
            placeholder="Enter city name"
          />

          {/* Input section to search for city. This is a relative container that holds the input box and search button. */}
          <button onClick={handleSearchClick} className='text-white font-semibold absolute right-4 top-1/2 transform -translate-y-1/2'>
            < IoIosSearch />
          </button>
        </div>

        {/* Displays an error message if `errorMessage` state contains any text. */}
          
        {errorMessage && <p className="text-black font-semibold text-center mb-4">{errorMessage}</p>}
          {/* If weather data is available (i.e., `weatherData` is not null), render the following sections. */}
        {weatherData && (
          <>
            {/* Conditional rendering based on the weather condition. 
                It shows different weather icons depending on the `weather[0].main` value from the API response. */}
            <div className='weather flex justify-center mb-4'>
             {/* Weather image that changes dynamically based on the weather condition ( Clouds, Rain, Snow, Mist). */}
              {weatherData.weather[0].main === "Clouds" ?
                (<img src={cloudImage} alt="cloud" className='h-20 w-20' />)
                : weatherData.weather[0].main === "Rain" ?
                  (<img src={rain} alt="cloud" className='h-20 w-20' />)
                  : weatherData.weather[0].main === "Snow" ?
                    (<img src={snow} alt="snow" className='h-20 w-20' />)
                    : weatherData.weather[0].main === "Mist" ?
                      (<img src={mist} alt="mist" className='h-20 w-20' />)
                      :
                      (<img src={drizzle} alt="drizzle" className='h-20 w-20' />)
              }
            </div>
            <div className='temp text-center mb-4'>
              <h2 className="text-3xl">{weatherData.main.temp}°C</h2>
            </div>
            <div className='Cityname text-center mb-4'>
              <h2 className="text-xl font-semibold">{weatherData.name}</h2>
            </div>
            <div className='data grid grid-cols-2 gap-4'>
              <div className='data1 flex items-center'>
                <img src={humidity} alt="humidity" className='h-8 w-8 mr-2' />
                <div>
                  <h2>{weatherData.main.humidity}%</h2>
                  <h2>Humidity</h2>
                </div>
              </div>
              
              {/* Wind Speed section: Displays the wind speed (`weatherData.wind.speed`) */}
              <div className='data2 flex items-center'>
                <div className='image2'>
                  <img src={wind} alt="wind" />
                </div>
                <div>
                  <h2>{weatherData.wind.speed} km/h</h2>
                  <h2>Wind Speed</h2>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
