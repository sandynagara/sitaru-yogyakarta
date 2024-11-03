import { MapContainer, TileLayer,useMap,useMapEvents,FeatureGroup,Polygon,Marker, WMSTileLayer} from "react-leaflet";
import React, { useState, useEffect,useRef } from "react";
import "leaflet/dist/leaflet.css";
import "./Peta.css";
import L from "leaflet";
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import RoadMap from "./FindRoad/RoadMap";
import ScreenShootMap from "./ScreenShootMap";
import MeasureDrawing from "./ToolAddress/MeasureDrawing";
import { useTool } from "./ToolAddress/hooks/useTool";
import { useLayer } from "./Layer/hooks/useLayer";

function Peta({ inputBasemap,setData,center,setCenter,centerMarker,setCenterMarker}) {
  const [map, setMap] = useState(false)
  const [selectedPersil, setSelectedPersil] = useState(false);
  const TOOL = useTool()
  const LAYER = useLayer()
  const refBasemap = useRef(null)
  const refRdtr = useRef(null)
  const refPersil = useRef(null)
  const refFotoUdara = useRef(null)

  useEffect(() => {
    if (refBasemap.current) {
      refBasemap.current.setUrl(inputBasemap);
    }
  }, [inputBasemap]);

  const panggil = (cb, url) => {
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
      .style.setProperty("filter", `opacity(${LAYER.state.opacityBasemap}%)`);
    
    refRdtr.current
      .getContainer()
      .style.setProperty("filter", `opacity(${LAYER.state.opacityRdtr}%)`);

    refPersil.current
      .getContainer()
      .style.setProperty("filter", `opacity(${LAYER.state.opacityBidangTanah}%)`);

    refFotoUdara.current
      .getContainer()
      .style.setProperty("filter", `opacity(${LAYER.state.opacityFotoUdara}%)`);
  }

  useEffect(() => {
      if(map){
        changeOpacity()
      }
  }, [LAYER.state,map])
  
  const getFeatureInfoUrl = (url, map, e,layer) => {
    // Construct a GetFeatureInfo request URL given a point
    const size = map.getSize(),
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

  const GetFeatureInfoUrlHandle = () =>{
    if(TOOL.state.typeMeasure) return () => {}
    let map = useMap();
    map = useMapEvents({click(e) { 
        const urlRDTR = getFeatureInfoUrl(
          process.env.REACT_APP_SERVER_GEOSERVER+"geoserver/wms?",map,e,"Dispertaru:rdtr_ar_347120220607112209"
        );
        const urlPersil = getFeatureInfoUrl(
          process.env.REACT_APP_SERVER_GEOSERVER+"geoserver/wms?",map,e,"Dispertaru:persil_gsb_revisi_347120231124140756"
        );

        panggil((result) => {
            panggil((resultPersil)=>{
                if(resultPersil["features"].length == 0) return
                const koordinat = resultPersil.features[0].geometry.coordinates[0][0].map((e)=>{
                  return [e[1],e[0]]
                })
                setSelectedPersil(koordinat)
                let properties = result.features[0].properties
                properties.geometry = resultPersil.features[0].geometry.coordinates[0][0]
                properties.gsb = resultPersil.features[0].properties["gsb"]
                properties.remarkGsb = resultPersil.features[0].properties["remark"]

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
    const map = useMap();
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
    maxZoom: 22,
  }

  const basemapsProps = {
    tiled: true,
    maxZoom: 22,
    zIndex: 1
  }

  return (
    <div className="peta">
      <ScreenShootMap selectedPersil={selectedPersil}/>
      <MapContainer
        center={[-7.801408, 110.3647275]}
        zoom={18}
        style={{ width: "100vw", height: "100vh" }}
        zoomControl={false}
        maxZoom={22}
        whenReady={(e)=>setMap(e)}
      >
    
        <TileLayer {...basemapsProps} url={inputBasemap}  ref={refBasemap}/>

        <TileLayer
          url="https://ppids-ugm.com/tile/{z}/{x}/{y}.png"
          minZoom={20}
          maxNativeZoom={21}
          maxZoom={22}
          attribution='&copy; <a href="https://ppids-ugm.com">PPIDS UGM</a>'
          ref={refFotoUdara}
        />

        <TileLayer
          url="https://ppids-ugm.com/tile/{z}/{x}/{y}.jpg"
          maxZoom={19}
          attribution='&copy; <a href="https://ppids-ugm.com">PPIDS UGM</a>'
          ref={refFotoUdara}
        />

        <WMSTileLayer
          url="https://ppids-ugm.com/geoserver/ppids/wms"
          layers="ppids:persil_gsb_revisi"
          {...mapProps}
          ref={refPersil}
        />

        <WMSTileLayer
          url={process.env.REACT_APP_SERVER_GEOSERVER+"geoserver/wms"}
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
        <RoadMap/>
        <MeasureDrawing/>
      </MapContainer>
     
    </div>
  );
}

export default Peta;
