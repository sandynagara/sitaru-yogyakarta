import { MapContainer, TileLayer,useMap,useMapEvents,FeatureGroup,Polygon} from "react-leaflet";
import React, { useState, useEffect,useRef } from "react";
import "leaflet/dist/leaflet.css";
import "./Peta.css";
import L from "leaflet";
import configData from "./config.json";
import * as WMS from "leaflet.wms";

function Peta({ inputBasemap ,opacityBasemap,opacityPersil,opacityRdtr,setData }) {
  const [basemap, setBasemap] = useState(
    "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
  );
  const [change, setChange] = useState(true);
  const [map, setMap] = useState(false)
  const tileRef = useRef();
  const [first, setFirst] = useState(true)
  const [selectedPersil, setSelectedPersil] = useState(false);

  const TileLayerHandler = () => {
    setChange(false);
    return <TileLayer ref={tileRef} url={basemap} maxZoom={22} />;
  };

  useEffect(() => {
    setChange(true);
    setBasemap(inputBasemap);
  }, [inputBasemap]);

  var panggil = (cb, url) => {
    fetch(url,{
        method: 'GET',
        credentials: 'include'
      })
      .then((respond) => respond.json())
      .then((json) => cb(json))
      .catch((err)=>{
        console.log(err,"err")
      });
  };

  useEffect(() => {
      if(map){
        tileRef.current
        .getContainer()
        .style.setProperty("filter", `opacity(${opacityBasemap}%)`);
      }
  }, [opacityBasemap])

  var getFeatureInfoUrl = (url, map, e,layer) => {
    // Construct a GetFeatureInfo request URL given a point
    var size = map.getSize(),
      params = {
        request: "GetFeatureInfo",
        service: "WMS",
        srs: "EPSG:4326",
        styles: "",
        transparent: true,
        version: "1.1.1",
        format: "application/json",
        bbox: map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: layer,
        query_layers: layer,
        info_format: "application/json",
        X: Math.round(e.containerPoint.x),
        Y: Math.round(e.containerPoint.y),
      };

    return url + L.Util.getParamString(params, url, true);
  };

  var GetFeatureInfoUrlHandle = () =>{
    var map = useMap();
    map = useMapEvents({
      click(e) { 
        var urlRDTR = getFeatureInfoUrl(
          configData.SERVER_GEOSERVER+"geoserver/sitaru/wms?",map,e,"RDTR"
        );
        var urlPersil = getFeatureInfoUrl(
          configData.SERVER_GEOSERVER+"geoserver/sitaru/wms?",map,e,"Batas_Persil"
        );
        panggil((result) => {
            console.log(result)
     
            panggil((resultPersil)=>{
                var koordinat = []
                resultPersil.features[0].geometry.coordinates[0][0].map((e)=>{
                  koordinat.push([e[1],e[0]])
                })
                setSelectedPersil(koordinat)
                result.features[0].properties.geometry = resultPersil.features[0].geometry.coordinates[0][0]
                setData(result.features[0].properties)
            },urlPersil)
        }, urlRDTR);
      },
    });
    return null
  }

  
  var CustomWMSLayer =  (props) => {
    var map = useMap();
      if(first){
        console.log(first)
        const { url, options, layers } = props;
        const source = WMS.source(url, options);
        var layer= source.getLayer(layers)
        layer.addTo(map);
        setFirst(false);
      }
    return null;
  }

  const SelectedLayerHandler = () => {
    return <Polygon positions={selectedPersil} pathOptions={{ color: 'yellow' }} />
  }

  
  useEffect(() => {
    if(map){
      map.target.eachLayer(function(layer) {
        if(layer._name==="sitaru:Batas_Persil"){
          layer.setOpacity(opacityPersil*0.01)
        }else if(layer._name==="sitaru:RDTR"){
          layer.setOpacity(opacityRdtr*0.01)
        }
      });
    }
  }, [opacityPersil,opacityRdtr])

  return (
    <div className="peta">
      <MapContainer
        center={[-7.801408, 110.3647275]}
        zoom={17}
        style={{ width: "100vw", height: "100vh" }}
        zoomControl={false}
        whenReady={(e)=>setMap(e)}
      >

        {change ? <TileLayerHandler /> : <TileLayer ref={tileRef} url={basemap} style={{opacity:"0.5"}} maxZoom={22} />}
        <CustomWMSLayer
          url={configData.SERVER_GEOSERVER+"geoserver/sitaru/wms"}
          layers={"sitaru:Batas_Persil"}
          options={{
            format: "image/png",
            transparent: "true",
            tiled: "true",
            info_format: "application/json",
            identify: false,
            maxZoom: 22,
            opacity:0.5
          }}
        />
        <CustomWMSLayer
          url={configData.SERVER_GEOSERVER+"geoserver/sitaru/wms"}
          layers={"sitaru:RDTR"}
          options={{
            format: "image/png",
            transparent: "true",
            tiled: "true",
            info_format: "application/json",
            identify: false,
            maxZoom: 22,
            opacity:0.5
          }}
        />
        <FeatureGroup>
          {selectedPersil && <SelectedLayerHandler/> }
        </FeatureGroup>
        
        <GetFeatureInfoUrlHandle/>
      </MapContainer>
    </div>
  );
}

export default Peta;
