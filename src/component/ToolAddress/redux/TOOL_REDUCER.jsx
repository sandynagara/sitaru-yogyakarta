import { TOOL_CONSTANT } from './TOOL_CONSTANT';

const initialState = {
  typeMeasure:"",
  areaPolygon:0,
  distancePolyline:0,
  drawingLayer:false
};

export function TOOL_REDUCER(state = initialState, action) {
  let returnData = state;
  
  Object.values(TOOL_CONSTANT).forEach((ctx) => {
    if (action.type === TOOL_CONSTANT.RESET_STATUS) {
      returnData = {
        ...returnData,
        message: '',
      };
    }else if (action.type === TOOL_CONSTANT.RESET_ALL) {
      returnData = { ...initialState};
    }else if (ctx === action.type && !ctx.includes('[NO_STATE_UPDATE]')) {
      returnData = { ...returnData, ...action.payload };
    }
  });  
  return returnData;
}
