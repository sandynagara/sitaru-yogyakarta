import { MapContainer, TileLayer} from "react-leaflet";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./Peta.css";

function Peta({ inputBasemap }) {
  const [basemap, setBasemap] = useState(
    "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
  );
  const [change, setChange] = useState(true);

  const TileLayerHandler = () => {
      console.log("1")
    setChange(false);
    return <TileLayer url={basemap} maxZoom={22}/>;
  };

  useEffect(() => {
    setChange(true);
    setBasemap(inputBasemap);
  }, [inputBasemap]);

  return (
    <div className="peta">
      <MapContainer
        center={[-7.864220975, 110.138661812]}
        zoom={17}
        style={{ width: "100vw", height: "100vh" }}
        zoomControl={false}
      >
        {change ? <TileLayerHandler /> : <TileLayer url={basemap} maxZoom={22} />}
      </MapContainer>
    </div>
  );
}

export default Peta;
