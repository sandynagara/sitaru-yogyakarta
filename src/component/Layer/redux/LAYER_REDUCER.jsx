import { LAYER_CONSTANT } from './LAYER_CONSTANT';

const initialState = {
  opacityBasemap:50,
  opacityBidangTanah:50,
  opacityFotoUdara:50,
  opacityRdtr:50
};

export function LAYER_REDUCER(state = initialState, action) {
  let returnData = state;
  
  Object.values(LAYER_CONSTANT).forEach((ctx) => {
    if (action.type === LAYER_CONSTANT.RESET_STATUS) {
      returnData = {
        ...returnData,
      };
    }else if (action.type === LAYER_CONSTANT.RESET_ALL) {
      returnData = { ...initialState};
    }else if (ctx === action.type && !ctx.includes('[NO_STATE_UPDATE]')) {
      returnData = { ...returnData, ...action.payload };
    }
  });  
  return returnData;
}
