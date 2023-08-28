import React, { useEffect } from "react";
import {Marker,useMap, Popup } from "react-leaflet";
// import iconll from './images/iconloc.png';
import icon from './icon.js';


function MarkerPosition(props) {
    const map=useMap();
    const reqarray=props.data;
   

    useEffect(()=>{
        map.flyTo(reqarray,13,{
            animate:true
        })

    },[map,reqarray]);
    
  return (
    <>
     <Marker icon={icon} position={props.data}>
        
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      
    </>
  )
}

export default MarkerPosition
