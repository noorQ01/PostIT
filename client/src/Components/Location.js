import { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [ip, setip] = useState(null);
  const [geoData, setgeoData] = useState(null);
  const API_KEY = "at_BgPFMRAHR1bJ7CyE8VxyMOPIqDsNF";

  const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      console.log(response);
      setip(response.data.ip);
    } catch (error) {
      console.error("Error fetcing IP Address", error.message);
    }
  };

  // Fetch geolocation data based on the IP

  const getGeoLocationData = async () => {
    if (!ip) return; // Ensure IP is available before making the request
    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}&ipAddress=${ip}`
      );
      setgeoData(response.data); // Set geolocation data in state
      console.log("GeoLocation Data:", response.data);
    } catch (error) {
      console.error("Error fetching geolocation data:", error.message);
    }
  };

  useEffect(() => {
    fetchIpAddress();
  }, []);

  useEffect(() => {
    if (ip) {
      getGeoLocationData();
    }
  }, [ip]);
  return (
    //     <div>
    //       <p>Location</p>
    //       {ip ? <p> IP Address: {ip}</p> : <p>Loading IP Address...</p>}
    // {geoData ? (
    //       <div>
    //         country: {geoData.location.country}
    //         <br/>
    //         Region: {geoData.location.region}
    //         <br/>
    //         TimeZone: {geoData.location.timezone}
    //         <div/>
    //         ) :(
    //             <p>Loading Geolocation Data...</p>
    //       )}
    //     </div>

    <div className="location">
      <p>Location Information</p>

      {ip ? <p>IP Address: {ip}</p> : <p>Loading IP address...</p>}

      {geoData ? (
        <div>
          Country: {geoData.location.country}
          <br />
          Region: {geoData.location.region}
        </div>
      ) : (
        <p>Loading Geolocation Data...</p>
      )}
    </div>
  );
};

export default Location;
