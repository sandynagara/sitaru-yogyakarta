/* eslint-disable max-lines */
import { TOOL_CONSTANT } from './TOOL_CONSTANT';

export const TOOL_ACTIONS = {
  resetAll: () => {
    return (dispatch) => {
      dispatch({ type: TOOL_CONSTANT.RESET_ALL });
    };
  },
  resetStatus: () => {
    return (dispatch) => {
      dispatch({ type: TOOL_CONSTANT.RESET_STATUS });
    };
  },
  setTypeToolMeasure: (payload) => {
    return (dispatch) => {
      dispatch({ type: TOOL_CONSTANT.SET_TYPE_MEASURE, 
        payload:{ typeMeasure: payload },
       });
    };
  },
  setAreaPolygon: (payload) => {
    return (dispatch) => {
      dispatch({ type: TOOL_CONSTANT.SET_AREA, 
        payload:{ areaPolygon: payload },
       });
    };
  },
  setDistancePolyline: (payload) => {
    return (dispatch) => {
      dispatch({ type: TOOL_CONSTANT.SET_DISTANCE, 
        payload:{ distancePolyline: payload },
       });
    };
  },
  setDrawingLayer:(payload) => {
    return (dispatch) => {
      dispatch({ type: TOOL_CONSTANT.SET_DRAWING, 
        payload:{ drawingLayer: payload },
       });
    };
  },
};
