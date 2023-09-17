import React, {useState, useEffect} from 'react';
import {Puff} from 'react-loader-spinner';
import {CiSearch} from "react-icons/ci";
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState([]);
    const [quickQuery, setQuickQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const Loading = () => (
        <div className="loader">
            <Puff color="#D66C05" height={500} width={80}/>
        </div>
    );

    const fetchWeather = async (query) => {
        if (!query) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`, {
                method: 'GET'
            })

            if (!response.ok) {
                throw new Error("Something went Wrong!");
            }

            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    const searchWeather = async () => {
        fetchWeather(query);
        setQuery('');
        setQuickQuery('')
    }

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchWeather();
        }
    }

    useEffect(() => {
        if (quickQuery) {
            fetchWeather(quickQuery);
        } else {
            fetchWeather()
        }

    }, [query, quickQuery]);

    return (
        <div className="container-holder">
            <div className="holder-wrapper">
                <div className="logo">
                    <p>Weather.io</p>
                </div>
                {isLoading && !query ? (
                    <Loading />
                ) : (
                    weather.main && (
                        <div className="city-weather-holder">
                            <div className="city-weather-wrapper">
                                <div className="city-temp">
                                    <p>{Math.round(weather.main.temp)}<sup>&deg;c</sup></p>
                                </div>
                                <div className="city-name-holder">
                                    <div className="city-name">
                                        <sup className="sys">{weather.sys.country}</sup>
                                        <h2>{weather.name}</h2>
                                    </div>
                                    <div className="city-info">
                                        <img className="city-icon"
                                             src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                                             alt={weather.weather[0].description}/>
                                        <p>{weather.weather[0].description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
            <div className="container-r">
                <div className="container-r-holder">
                    <div className="search-city">
                        <div className="search-city">
                            <input
                                type="text"
                                placeholder="Search Location"
                                className="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleEnterKeyPress}
                            />
                            <button type="button" className="btn-search" onClick={searchWeather}>
                                <CiSearch style={{fontSize: '25px'}}/>
                            </button>
                        </div>
                    </div>
                    <div className="quick-search">
                        <div className="quick-search-title"><h4>Quick Search</h4></div>
                        <button type="button" className="search-name" onClick={() => setQuickQuery('Abuja')}>Abuja</button>
                        <button type="button" className="search-name" onClick={() => setQuickQuery('Tokyo')}>Tokyo</button>
                        <button type="button" className="search-name" onClick={() => setQuickQuery('Cape Town')}>Cape Town</button>
                        <button type="button" className="search-name" onClick={() => setQuickQuery('California')}>California</button>
                    </div>
                    {weather.main && (
                        <div className="weather-details-holder">
                            <h4 className="detail-title">Weather Details</h4>
                            <div className="detail-content">
                                <div className="detail">
                                    <p>Temperature</p>
                                    <p>{Math.round(weather.main.temp)}<span>&deg;C</span></p>
                                </div>

                                <div className="detail">
                                    <p>Humidity</p>
                                    <p>{weather.main.humidity}<span>%</span></p>
                                </div>

                                <div className="detail">
                                    <p>Wind</p>
                                    <p>{weather.wind.deg}<span>deg</span></p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
export default App;