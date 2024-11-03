import React, { Fragment, useState } from "react";
import MeasureButton from "./MeasureButton";
import { RxRulerHorizontal } from "react-icons/rx";
import { RxRulerSquare } from "react-icons/rx";
import AreaMeasure from "./AreaMeasure";
import { useTool } from "./hooks/useTool";

function ToolMeasureContainer() {
  const TOOL = useTool();

  const handleChangeType = (type) => {
    TOOL.setTypeTool(type);
    resetLayer()
  };

  const resetLayer = () => {
    TOOL.setDrawingLayer(false);
    TOOL.setArea(0);
    TOOL.setDistance(0);
  };

  const finishHandle = () => {
    TOOL.resetAll();
  };

  return (
    <div className="flex flex-col p-3 rounded-md bg-white gap-2">
      <div className=" text-base font-medium">Format Pengukuran</div>
      <div className=" text-sm">
        Untuk melakukan pengukuran pada peta, pilih ukur Panjang atau Luas.
      </div>
      <div className="flex gap-2">
        <MeasureButton
          name={"Panjang"}
          active={TOOL.state.typeMeasure === "distance"}
          onClick={() => handleChangeType("distance")}
          icon={<RxRulerHorizontal color="#1E2E4A" size={20} />}
        />
        <MeasureButton
          name={"Luas"}
          active={TOOL.state.typeMeasure === "area"}
          onClick={() => handleChangeType("area")}
          icon={<RxRulerSquare color="#1E2E4A" size={20} />}
        />
      </div>
      {TOOL.state.typeMeasure === "area" && (
        <AreaMeasure
          type={"Luas"}
          unit={
            <Fragment>
              m<sup>2</sup>
            </Fragment>
          }
          value={TOOL.state.areaPolygon.toFixed(2)}
          onClick={finishHandle}
          resetHandle={resetLayer}
        />
      )}

      {TOOL.state.typeMeasure === "distance" && (
        <AreaMeasure
          type={"Jarak"}
          unit={"m"}
          onClick={finishHandle}
          resetHandle={resetLayer}
          value={TOOL.state.distancePolyline.toFixed(2)}
        />
      )}
    </div>
  );
}

export default ToolMeasureContainer;
