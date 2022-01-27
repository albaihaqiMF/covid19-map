import React from "react";
import { Map, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";

const CovidMap = ({ countries }) => {
  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };
  
  const onEachCountry = (country, layer) => {
    layer.options.fillColor = country.properties.color;
    const name = country.properties.ADMIN;
    const confirmedText = country.properties.confirmedText;
    const recoveredText = country.properties.recoveredText;
    const deathsText = country.properties.deathsText;
    layer.bindPopup(`<div style="width:auto">
      <div><center>
        <h3>${name}</h3></center>
      </div>
      <div style="display:flex; width:100%">
        <div style="color:green; margin:5px">
        <center>
          <h4>Confirmed</h4>
          <p>${confirmedText}</p></center>
        </div>
        <div style="color:blue; margin:5px"><center>
          <h4>Recovered</h4>
          <p>${recoveredText}</p></center>
        </div>
        <div style="color:red; margin:5px"><center>
          <h4>Deaths</h4>
          <p>${deathsText}</p></center>
        </div>
      </div>
    </div>`,{minWidth:'auto'});
    layer.bindTooltip(`${name}`,{
      sticky:'true'
    })
  };

  return (
    <Map style={{ height: "90vh" }} zoom={2} center={[20, 60]}>
      <GeoJSON
        style={mapStyle}
        data={countries}
        onEachFeature={onEachCountry}
      />
    </Map>
  );
};

export default CovidMap;
