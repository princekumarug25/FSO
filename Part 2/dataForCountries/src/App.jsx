import axios from "axios";
import { useEffect, useState } from "react";
// import axios from "axios";
// const API_KEY = import.meta.env.VITE_API_KEY;
// const baseURL =
//   "https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}";
// const iconURL = "https://openweathermap.org/img/wn/10d@2x.png";
// const WeatherReport = ({ target, countries }) => {
//   const [capital, setCapital] = useState("");
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     axios
//       .get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`
//       )
//       .then((data) => setData(data));
//   }, [capital]);
//   useEffect(()=>{
//     const country = countries.find(country => country.name.common === target)
//     if(country){
//       setCapital(country.capital[0])
//     }
//   },[countries,target])
//   return (
//      <>
//      { data && <div>
//       <h2>Temperature</h2> of {capital} is {data.main.temp}
//       <img
//         src={`https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`}
//         alt=""
//       />
//       </div>}
//     </>
//   );
// };
// const SingleCountry = ({ target }) => {
//   const [countries, setCountries] = useState([]);
//   useEffect(() => {
//     axios
//       .get("https://studies.cs.helsinki.fi/restcountries/api/all")
//       .then((response) => setCountries(response.data));
//   }, []);
//   const content = (countries) => {
//     return countries
//       .filter((country) => country.name.common === target)
//       .map((country) => {
//         return (
//           <>
//             <div key={country.name.common}>
//               <h1>{country.name.common}</h1>
//               <p>{country.capital[0]}</p>
//               <h2>Languages</h2>
//               <ul>
//                 {Object.values(country.languages).map((language) => {
//                   return <li key={language}>{language}</li>;
//                 })}
//               </ul>
//               <img
//                 alt={country.flags.alt}
//                 src={country.flags.svg}
//                 style={{ width: "200px" }}
//               />
//             </div>
//           </>
//         );
//       });
//   };
//   let compnent = content(countries);
//   return (
//     <>
//       {compnent}
//       <WeatherReport target={target} countries={countries} />
//     </>
//   );
// };
// const RenderingComponent = ({ countries, handleShow }) => {
//   let content;
//   if (countries.length > 10) {
//     content = <p>Too many Countries</p>;
//   } else if (countries.length < 10 && countries.length > 1) {
//     content = countries.map((country) => {
//       return (
//         <li key={country + Math.random()}>
//           {country}
//           <button onClick={() => handleShow(country)}>Show</button>
//         </li>
//       );
//     });
//   } else if (countries.length === 1) {
//     content = <SingleCountry target={countries[0]} />;
//   } else {
//     content = <p>No Matching</p>;
//   }
//   return <>{content}</>;
// };
// const App = () => {
//   const [filter, setFilter] = useState("");
//   const [countries, setCountries] = useState([]);
//   const handleFilter = (event) => {
//     setFilter(event.target.value);
//   };
//   const handleShow = (country) => {
//     setFilter(country);
//   };
//   useEffect(() => {
//     axios
//       .get("https://studies.cs.helsinki.fi/restcountries/api/all")
//       .then((response) => {
//         return response.data;
//       })
//       .then((data) => {
//         setCountries(
//           data
//             .filter((country) =>
//               country.name.common.toLowerCase().includes(filter.toLowerCase())
//             )
//             .map((country) => country.name.common)
//         );
//       });
//   }, [filter]);
//   return (
//     <>
//       Find Countries: <input value={filter} onChange={handleFilter} />
//       <div>
//         <RenderingComponent countries={countries} handleShow={handleShow} />
//       </div>
//     </>
//   );
// };

// export default App;

const baseURL = `https://studies.cs.helsinki.fi/restcountries/api/all`;
const WeatherReport = ({ country }) => {
  const[weatherdata,setWeatherData] = useState(null)
  const capital = country.capital[0];
  console.log(capital);
  const API_KEY = import.meta.env.VITE_API_KEY
  const countryURL = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`
  console.log(countryURL)
  useEffect(()=>{
    axios
    .get(countryURL)
    .then(response => setWeatherData(response.data))
  },[capital])
  return(
    <>
    {weatherdata && <div>
    <h1>Live weather reporting</h1>
    <p><strong> The temperature of {capital} is: {(weatherdata.main.temp - 273.15).toFixed(2)} </strong> </p>
    <img 
    src={`https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`}
    style={{border:"2px solid black"}}
    />
    <p><strong>{weatherdata.weather[0].main}</strong></p>
    </div>}
    </>
  )
};
const SingleCountry = ({ country }) => {
  console.log(country.name);
  return (
    <>
      <h1> {country.name.common}</h1>
      <strong>{country.capital[0]}</strong>
      <div>
        <strong>Area : {country.area}</strong>
      </div>
      <div>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => {
            return <li key={language + country.name.common}>{language}</li>;
          })}
        </ul>
        <img src={country.flags.svg} style={{ width: "200px", border:"2px solid black" }} />
      </div>
    </>
  );
};
const RenderCountries = ({ data, filter,handleClick }) => {
  const countries = data.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  const noOfCountries = countries.length;
  let content = null;
  if (noOfCountries > 10 && filter) {
    content = <p>Too many matches</p>;
  } else if (noOfCountries <= 10 && noOfCountries > 1) {
    content = (
      <ul>
        {countries.map((country) => {
          return (
            <li key={country.name.common}>
              <strong>{country.name.common}</strong>
              <button onClick={()=>handleClick(country.name.common)}>show</button>
            </li>
          );
        })}
      </ul>
    );
  } else if (filter.length === 0) {
    content = <strong>Type something...</strong>;
  } else if (noOfCountries === 1) {
    content = (
      <>
        <SingleCountry country={countries[0]} />
        <WeatherReport country={countries[0]}/>
      </>
    );
  } else {
    content = <strong>No matches</strong>;
  }
  return <>{content}</>;
};
const App = () => {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(baseURL).then((response) => setData(response.data));
  }, []);
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const handleClick = (countryName)=>{
    setFilter(countryName)
  }
  return (
    <>
      Find countries:
      <input onChange={handleChange} value={filter} />
      <div>
        <RenderCountries data={data} filter={filter} handleClick={handleClick}/>
      </div>
    </>
  );
};
export default App;
