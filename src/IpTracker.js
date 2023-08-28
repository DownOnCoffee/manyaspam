import { useEffect, useState } from "react";
import bluebg from "./images/pattern-bg-desktop.png";
import "./styles.css";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerPosition from "./MarkerPosition";
import searchlogo from "./images/searchh.png";

function IpTracker() {
  const [ipData, setIpData] = useState({
    ipadd: "",
    loc: "",
    timeZone: "",
    ISP: "",
  });
  // const [mapCenter, setmapCenter] = useState([51.505, -0.09]);
  const [ipaddress, setipaddress] = useState("");
  const [myArray, setMyArray] = useState([]);
  const [invalid,setinvalid]=useState(false);
 
  //216.58.213.174
  //193.212.174.101
  //192.212.174.101-gabreil
  const handleclick = () => {

      if (/^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/.test(ipaddress)){
        setinvalid(false);
      }
      else{
        setinvalid(true);
      }
      
      axios
      .get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_DqvcQvkhwSKtLZBsnSPRuR3EzVbRV&ipAddress=${ipaddress}`
      )
      .then((response) => {
        console.log(response.data);

        const updatedobj = {
          ...ipData,
          ipadd: response.data.ip,
          loc:
            response.data.location.country +
            "," +
            response.data.location.region +
            "," +
            response.data.location.city,
          timeZone: response.data.location.timezone,
          ISP: response.data.isp,
        };
        setIpData(updatedobj);

        // Assuming that the latitude and longitude are available in the response
        const newLatitude = response.data.location.lat;
        const newLongitude = response.data.location.lng;
        setMyArray([newLatitude, newLongitude]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        
      });

  };
  

  return (
    <>
   
      <div>
        <img className="bgcontainer" src={bluebg}></img>
      </div>
      <div className="maindiv">
        <h2>IP Address Tracker</h2>

        <div className="ipaddsearch">
          <input
            type="text"
            className="input"
            placeholder="Search for any IP Address or domain"
            onChange={(e) => setipaddress(e.target.value)}
          ></input>
          <button className="searchbtn" onClick={handleclick}>
            <img className="btnlogo" src={searchlogo}></img>
          </button>
         
        </div>
        { invalid && (
          <p className="errtext">IP Address invalid!</p>

        )}

        <br></br>

        <div className="infocontainer">
          <div className="griddiv">
            <p className="infoheading">IP Address</p>
            <p className="maininfo">{ipData.ipadd}</p>
          </div>
          <div className="griddiv">
            <p className="infoheading">Location</p>
            <p className="maininfo">{ipData.loc}</p>
          </div>
          <div className="griddiv">
            <p className="infoheading">TimeZone</p>
            <p className="maininfo">{ipData.timeZone}</p>
          </div>
          <div className="griddiv">
            <p className="infoheading">ISP</p>
            <p className="maininfo">{ipData.ISP}</p>
          </div>
        </div>
      </div>

      {/* Render the map container */}
      <MapContainer
        center={myArray.length === 0 ? [51.505, -0.09] : myArray}
        zoom={13}
        style={{ height: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerPosition
          data={myArray.length === 0 ? [51.505, -0.09] : myArray}
        />
      </MapContainer>
     
    </>
  );
}

export default IpTracker;
