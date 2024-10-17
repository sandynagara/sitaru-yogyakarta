import { ROAD_CONSTANT } from './ROAD_CONSTANT';

const initialState = {
  status_GET: 'IDLE',
  listRoad: {},
  selectedRoad:null
};

export function ROAD_REDUCER(state = initialState, action) {
  let returnData = state;
  console.log(returnData);
  
  Object.values(ROAD_CONSTANT).forEach((ctx) => {
    if (action.type === ROAD_CONSTANT.RESET_STATUS) {
      returnData = {
        ...returnData,
        status_GET: 'IDLE',
        message: '',
      };
    }else if (action.type === ROAD_CONSTANT.RESET_ALL) {
      returnData = { ...initialState};
    }else if (ctx === action.type && !ctx.includes('[NO_STATE_UPDATE]')) {
      returnData = { ...returnData, ...action.payload };
    }
  });  
  return returnData;
}
