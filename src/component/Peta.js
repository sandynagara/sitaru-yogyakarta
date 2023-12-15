import { MapContainer, TileLayer,useMap,useMapEvents,FeatureGroup,Polygon,Marker, WMSTileLayer} from "react-leaflet";
import React, { useState, useEffect,useRef } from "react";
import "leaflet/dist/leaflet.css";
import "./Peta.css";
import L from "leaflet";
import configData from "./config.json";
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import ScreenShootMap from "./ScreenShootMap";

function Peta({ inputBasemap ,opacityBasemap,opacityPersil,opacityRdtr,setData,center,setCenter,centerMarker,setCenterMarker}) {
  const [map, setMap] = useState(false)
  const [selectedPersil, setSelectedPersil] = useState(false);

  const refBasemap = useRef(null)
  const refRdtr = useRef(null)
  const refPersil = useRef(null)

  useEffect(() => {
    if (refBasemap.current) {
      refBasemap.current.setUrl(inputBasemap);
    }
  }, [inputBasemap]);

  var panggil = (cb, url) => {
    fetch(url,{
        method: 'GET',
      })
      .then((respond) => respond.json())
      .then((json) => cb(json))
      .catch((err)=>{
        console.log(err,"err")
      });
  };

  const changeOpacity = () => {
    refBasemap.current
      .getContainer()
      .style.setProperty("filter", `opacity(${opacityBasemap}%)`);
    
    refRdtr.current
      .getContainer()
      .style.setProperty("filter", `opacity(${opacityRdtr}%)`);

    refPersil.current
      .getContainer()
      .style.setProperty("filter", `opacity(${opacityPersil}%)`);
  }

  useEffect(() => {
      if(!map) return
      changeOpacity()
  }, [opacityBasemap,opacityRdtr,opacityPersil,map])
  
  var getFeatureInfoUrl = (url, map, e,layer) => {
    console.log( L.Proj);

    var crs = new L.Proj.CRS('EPSG:32749', // define the CRS
    '+proj=utm +zone=49 +south +datum=WGS84 +units=m +no_defs', // define the proj4 definition
    { 
      transformation:  L.Transformation (1, 0, -1, 0),
      scale: function (zoom) {
        return Math.pow (2, zoom);
      }
    });
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
        crs:crs
      };

    return url + L.Util.getParamString(params, url, true);
  };

  var GetFeatureInfoUrlHandle = () =>{
    var map = useMap();
    map = useMapEvents({click(e) { 
        var urlRDTR = getFeatureInfoUrl(
          configData.SERVER_GEOSERVER+"geoserver/wms?",map,e,"Dispertaru:rdtr_ar_347120220607112209"
        );
        var urlPersil = getFeatureInfoUrl(
          configData.SERVER_GEOSERVER+"geoserver/wms?",map,e,"Dispertaru:persil_gsb_revisi_347120231124140756"
        );

        panggil((result) => {
            panggil((resultPersil)=>{
                if(resultPersil["features"].length == 0) return
                var koordinat = resultPersil.features[0].geometry.coordinates[0][0].map((e)=>{
                  return [e[1],e[0]]
                })
                setSelectedPersil(koordinat)
                let properties = result.features[0].properties
                properties.geometry = resultPersil.features[0].geometry.coordinates[0][0]
                properties.gsb = resultPersil.features[0].properties["GSB"]
                properties.remarkGsb = resultPersil.features[0].properties["REMARK"]

                setData(properties)
            },urlPersil)
        }, urlRDTR);
      },
    });
    return null
  }

  const icon = L.icon({ 
    iconUrl: iconMarker, 
    iconAnchor:[15, 30]
  });

  const SelectedLayerHandler = () => {
    return <Polygon positions={selectedPersil} pathOptions={{ color: 'yellow' }} />
  }

  const ChangeCenterMap = () => {
    var map = useMap();
    if(!center) return null
    setCenter(false)
    setCenterMarker(center)
    map.setView(center)
    return  null
  }

  const mapProps = {
    service: 'WMS',
    request: 'GetMap',
    version: '1.1.0',
    format: 'image/png',
    transparent: true,
    maxZoom: 18,
  }

  const basemapsProps = {
    tiled: true,
    maxZoom: 18,
    zIndex: 1
  }

  return (
    <div className="peta">
      <ScreenShootMap selectedPersil={selectedPersil}/>
      <MapContainer
        center={[-7.801408, 110.3647275]}
        zoom={17}
        style={{ width: "100vw", height: "100vh" }}
        zoomControl={false}
        whenReady={(e)=>setMap(e)}
      >
    
        <TileLayer {...basemapsProps} url={inputBasemap}  ref={refBasemap}/>

        <WMSTileLayer
          url="https://ppids-ugm.com/geoserver/ppids/wms"
          layers="ppids:persil_gsb_revisi"
          {...mapProps}
          ref={refPersil}
        />

        <WMSTileLayer
          url={configData.SERVER_GEOSERVER+"geoserver/wms"}
          layers={"Dispertaru:rdtr_ar_347120220607112209"}
          {...mapProps}
          ref={refRdtr}
        />
  
        <FeatureGroup>
          {selectedPersil && <SelectedLayerHandler/> }
        </FeatureGroup>
        {centerMarker && <Marker position={centerMarker} icon={icon}/>}
        <ChangeCenterMap/>
        <GetFeatureInfoUrlHandle/>
      </MapContainer>
     
    </div>
  );
}

export default Peta;
