import React from "react";

function ItemLayer({name,onChangeValue}) {
  return (
    <div className="layer-item">
      <p style={{ marginBottom: "10px" }}>{name}</p>
      <input type="range" onChange={(e) => onChangeValue(name,e.target.value)} />
    </div>
  );
}

export default ItemLayer;
