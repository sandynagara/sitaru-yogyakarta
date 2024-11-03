import { TOOL_ACTIONS } from '../redux/TOOL_ACTION';
import { useDispatch, useSelector } from 'react-redux';

export function useTool() {
  const state = useSelector((state) => state.features.TOOL);
  const dispatch = useDispatch();
  const resetAll = () => {
    dispatch(TOOL_ACTIONS.resetAll());
  };
  const setTypeTool = (payload) => {
    dispatch(TOOL_ACTIONS.setTypeToolMeasure(payload));
  };
  const setArea = (payload) => {
    dispatch(TOOL_ACTIONS.setAreaPolygon(payload));
  };
  const setDistance = (payload) => {
    dispatch(TOOL_ACTIONS.setDistancePolyline(payload));
  };
  const setDrawingLayer = (payload) => {
    dispatch(TOOL_ACTIONS.setDrawingLayer(payload));
  };
  return {
    state,
    resetAll,
    setTypeTool,
    setArea,
    setDistance,
    setDrawingLayer
  };
}
