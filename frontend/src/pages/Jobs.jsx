import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa"; 

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { loading, error } = useSelector((state) => state.jobs);

  const dispatch = useDispatch();

  // Handle change in city name
  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };

  // Handle change in job Niche
  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, error, city, niche, searchKeyword]);  

  // Handle search function
  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };


  const cities =[
"New York",
"Los Angeles",
"Chicago",
"Houston",
"Phoenix",
"Philadelphia",
"San Antonio",
"San Diego",
"Dallas",
"San Jose",
"Austin",
"Jacksonville",
"Fort Worth",
"Columbus",
"Charlotte",
"Indianapolis",
"San Francisco",
"Seattle",
"Denver",
"Washington D.C.",
"Boston",
"El Paso",
"Nashville",
"Detroit",
"Oklahoma City",
"Portland",
"Las Vegas",
"Memphis",
"Louisville",
"Baltimore",
"Milwaukee",
"Albuquerque",
"Tucson",
"Fresno",
"Sacramento",
"Mesa",
"Kansas City",
"Atlanta",
"Omaha",
"Colorado Springs",
"Raleigh",
"Miami",
"Long Beach",
"Virginia Beach",
"Oakland",
"Minneapolis",
"Tulsa",
"Arlington",
"Tampa",
"New Orleans",
"Wichita",
"Cleveland",
"Bakersfield",
"Aurora",
"Anaheim",
];

const nichesArray = [
  "Software Development",
  "Web Development",
  "Cybersecurity",
  "Data Science",
  "Artificial Intelligence",
  "Cloud Computing",
  "DevOps",
  "Mobile App Development",
  "Blockchain",
  "Database Administration",
  "Network Administration",
  "UI/UX Design",
  "Game Development",
  "IoT (Internet of Things)",
  "Big Data",
  "Machine Learning",
  "IT Project Management",
  "IT Support and Helpdesk",
  "Systems Administration",
  "IT Consulting",
];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Find Job</button>
            <FaSearch />  {}
          </div>
          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter job By City</h2>
                {
                cities.map((city,index)=>(
                  <div key={index}>
                    <input 
                    type="radio" 
                    id={city} 
                    name="city" 
                    value={city} 
                    checked={selectedCity=== city}
                     onChange={()=> handleCityChange(city)} 
                     />
                     <label htmlFor={city}>{city}</label>

                  </div>
                ))}
              </div>
              <div className="cities">
                <h2>Filter job By Niche</h2>
                {
                nichesArray.map((niche,index)=>(
                  <div key={index}>
                    <input 
                    type="radio" 
                    id={niche} 
                    name="niche" 
                    value={niche} 
                    checked={selectedNiche=== niche}
                     onChange={()=> handleNicheChange(niche)} 
                     />
                     <label htmlFor={niche}>{niche}</label>
                  </div>
                ))
                  
                }
              </div>
            </div>
            <div className="container">
              <div className="mobile-filter">

                {/* //for mobile devices for cities */}

                <select value={city} onChange={(e)=> setCity(e.target.value)}>
                  <option value="">Filter By City</option>
                  {
                    cities.map((city,index)=>(
                      <option value={city} key={index}>
                        {city}</option>

                    ))}

                  {/* /for mobile devices for Nob Niches  */}
                </select>
                <select value={niche} onChange={(e)=> setNiche(e.target.value)}>
                  <option value="">Filter By Niche</option>
                  {
                    nichesArray.map((niche,index)=>(
                      <option value={niche} key={index}>
                        {niche}</option>

                    ))}
                  
                </select>

              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
