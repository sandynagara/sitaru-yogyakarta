import React,{useState,useEffect,useContext} from 'react'
import { WMSTileLayer,MapContainer, TileLayer, Polygon, FeatureGroup,useMap, Marker } from 'react-leaflet'
import configData from "../config.json"
import ScreenshootContext from '../Context/ScreenshootContext';
import L from "leaflet";
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import { SimpleMapScreenshoter } from 'leaflet-simple-map-screenshoter';
function ScreenShootMap({selectedPersil=false}) {

    const [centerMap,setCenterMap] = useState(false)
    const { takePhoto,setScreenshoot } = useContext(ScreenshootContext);
    const [first, setFirst] = useState(true)
    const [takeBasemap,setTakeBasemap]  = useState(false);
    const [takeRdtr,setTaleRdtr]  = useState(false);

    const props = {
        service: 'WMS',
        request: 'GetMap',
        version: '1.1.0',
        format: 'image/png',
        transparent: true,
        opacity: 0.7,
        maxZoom: 18,
    }

    const icon = L.icon({ 
        iconUrl: iconMarker, 
        iconAnchor:[15, 30]
    });

    useEffect(async () => {
        if(!takeBasemap) return null
        if(!takeRdtr) return null
        const basemapScreenShoot = await takeBasemap.takeScreen('image',
            {cropImageByInnerWH: function () {return true},mimeType: 'image/png',})
        const rdtrScreenShoot = await takeRdtr.takeScreen('image',
            {cropImageByInnerWH: function () {return true},mimeType: 'image/png',})
        setScreenshoot({"basemap":basemapScreenShoot,"rdtr":rdtrScreenShoot})
      }, [takePhoto])

    const TakeScreenShoot = ({type}) => {
        var map = useMap();
        if (!first) return null

        var simpleMapScreenshoter = L.simpleMapScreenshoter({
            hidden: true, // hide screen btn on map
        }).addTo(map)

        if(type == "basemap") setTakeBasemap(simpleMapScreenshoter)
        if(type == "rdtr") setTaleRdtr(simpleMapScreenshoter)
        setFirst(false);
        return null
    }

    useEffect(() => {
        if(!selectedPersil) return null
        const polygonCenter = getPolygonCenter()
        setCenterMap(polygonCenter)
    }, [selectedPersil])
    

    const SelectedLayerHandler = () => {
        return <Polygon positions={selectedPersil} pathOptions={{ color: 'yellow' }} />
      }

    const getPolygonCenter = () => {
    // Calculate the center of the polygon by averaging its coordinates
        const totalPoints = selectedPersil.length;
        const center = selectedPersil.reduce(
            (acc, point) => [acc[0] + point[0], acc[1] + point[1]],
            [0, 0]
        );
        return [center[0] / totalPoints, center[1] / totalPoints];
    };


    const ChangeCenterMap = () => {
        var map = useMap();
        if(!centerMap) return null
        map.setView(centerMap)
        return  null
    }

  return (
    <div className='flex absolute top-0 z-0'>
        <MapContainer
            center={[-7.801408, 110.3647275]}
            zoom={17}
            style={{ width: "500px", height: "300px" }}
            zoomControl={false}
        >   
            <TileLayer
                url={"https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"}
            />
            {centerMap && <Marker position={centerMap} icon={icon}/>}
            <ChangeCenterMap/>
            <TakeScreenShoot type={"basemap"}/>
        </MapContainer>

        <MapContainer
            center={[-7.801408, 110.3647275]}
            zoom={17}
            style={{ width: "500px", height: "300px" }}
            zoomControl={false}
        >   
            <WMSTileLayer
                url={configData.SERVER_GEOSERVER+"geoserver/wms"}
                layers={"Dispertaru:rdtr_ar_347120220607112209"}
                {...props}
            />
            <ChangeCenterMap/>
            <FeatureGroup>
                {selectedPersil && <SelectedLayerHandler/> }
            </FeatureGroup>
            <TakeScreenShoot type={"rdtr"}/>
        </MapContainer>
    </div>
    
  )
}

export default ScreenShootMap