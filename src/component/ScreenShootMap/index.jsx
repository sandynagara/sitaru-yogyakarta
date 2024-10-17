import React,{useState,useEffect,useContext,useRef} from 'react'
import { WMSTileLayer,MapContainer, TileLayer, Polygon, FeatureGroup,useMap, Marker } from 'react-leaflet'
import ScreenshootContext from '../Context/ScreenshootContext';
import L from "leaflet";
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import html2canvas from 'html2canvas';

function ScreenShootMap({selectedPersil=false}) {

    const [centerMap,setCenterMap] = useState(false)
    const { takePhoto,setScreenshoot } = useContext(ScreenshootContext);
    const mapRef = useRef(null);
    const mapRdtr = useRef(null);
    const [tilesLoaded, setTilesLoaded] = useState(false); 

    const props = {
        service: 'WMS',
        request: 'GetMap',
        version: '1.1.0',
        format: 'image/png',
        transparent: true,
        opacity: 0.7,
        maxZoom: 22,
    }

    const icon = L.icon({ 
        iconUrl: iconMarker, 
        iconAnchor:[15, 30]
    });

    const takeScreenshot = async () => {
        if (mapRef.current  && tilesLoaded) {
          const mapElement = mapRef.current.getContainer();
          const mapElementRdtr = mapRdtr.current.getContainer();
          const canvas = await html2canvas(mapElement,{
            allowTaint: true,
            useCORS: true,
          });
          const basemapScreenShoot = canvas.toDataURL('image/png');
          const canvasRdtr = await html2canvas(mapElementRdtr);
          const rdtrScreenShoot = canvasRdtr.toDataURL('image/png');
          setScreenshoot({"basemap":basemapScreenShoot,"rdtr":rdtrScreenShoot})
        }
    };

    useEffect(() => {
        takeScreenshot()
    }, [takePhoto])
    
    useEffect(() => {
        if(!selectedPersil) return  () => {}
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
        const map = useMap();
        if(!centerMap) return  () => {}
        map.setView(centerMap)
        return  null
    }

  return (
    <div className='flex top-0  z-[-2] ml-[-1500px]   relative'>
        <MapContainer
            center={[-7.801408, 110.3647275]}
            zoom={17}
            style={{ width: "300px", height: "180px",position:"absolute",top:0,right:0 }}
            zoomControl={false}
            ref={mapRef}
            whenReady={() => setTilesLoaded(true)}
        >   
            <TileLayer
                url={"https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"}
            />
            {centerMap && <Marker position={centerMap} icon={icon}/>}
            <ChangeCenterMap/>
        </MapContainer>

        <MapContainer
            center={[-7.801408, 110.3647275]}
            zoom={17}
            style={{ width: "300px", height: "180px",position:"absolute",top:0,right:0}}
            zoomControl={false}
            ref={mapRdtr}
        >   
            <WMSTileLayer
                url={process.env.REACT_APP_SERVER_GEOSERVER+"geoserver/wms"}
                layers={"Dispertaru:rdtr_ar_347120220607112209"}
                {...props}
            />
            <ChangeCenterMap/>
            <FeatureGroup>
                {selectedPersil && <SelectedLayerHandler/> }
            </FeatureGroup>
        </MapContainer>
    </div>
    
  )
}

export default ScreenShootMap