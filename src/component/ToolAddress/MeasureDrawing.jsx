import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import { FeatureGroup, useMap } from "react-leaflet";
import { useTool } from "./hooks/useTool";
import { area, length } from "@turf/turf";

function MeasureDrawing() {
  const editRef = useRef(null);
  const typeRef = useRef(null);
  const TOOL = useTool();
  const [layers, setLayers] = useState("");

  useEffect(() => {    
    if (!editRef.current) return () => {};
    typeRef.current = TOOL.state.typeMeasure
    if (TOOL.state.typeMeasure === "area") {
      editRef.current._toolbars.draw._modes.polygon.handler.enable();
    }else if (TOOL.state.typeMeasure === "distance") {
      editRef.current._toolbars.draw._modes.polyline.handler.enable();
    }else{
      editRef.current._toolbars.draw._modes.polyline.handler.disable();
      editRef.current._toolbars.draw._modes.polygon.handler.disable();
    }
  }, [TOOL.state.typeMeasure]);

  const onMountedRect = (e) => {
    editRef.current = e;
  };

  const handleCreated = (e) => {
    const layer = e.layer;
    const geoJsonData = layer.toGeoJSON();
    if (typeRef.current === "area") {
      const areaResult = area(geoJsonData);
      TOOL.setArea(areaResult);
    } else{
      const distanceResult = length(geoJsonData["geometry"]);
      TOOL.setDistance(distanceResult*1000);
    }
    TOOL.setDrawingLayer(true);
    setLayers(layer);
  };

  useEffect(() => {
    handleDeleteLayers();
  }, [TOOL.state.drawingLayer]);

  const handleDeleteLayers = () => {
    if (editRef.current && layers && !TOOL.state.drawingLayer) {
      editRef.current.options.edit.featureGroup.removeLayer(layers);

      if (TOOL.state.typeMeasure === "area") {
        editRef.current._toolbars.draw._modes.polygon.handler.enable();
      }
      if (TOOL.state.typeMeasure === "distance") {
        editRef.current._toolbars.draw._modes.polyline.handler.enable();
      }
    }
  };

  return (
    <FeatureGroup>
      <EditControl
        onMounted={onMountedRect}
        onCreated={handleCreated}
        position="topright"
        draw={{
          marker: true,
          circle: true,
          rectangle: true,
          polyline: true,
          circlemarker: true,
          polygon: true,
        }}
      />
    </FeatureGroup>
  );
}

export default MeasureDrawing;
