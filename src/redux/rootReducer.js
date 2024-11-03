import { combineReducers } from 'redux';
import { ROAD_REDUCER } from '../component/FindRoad/redux/ROAD_REDUCER';
import { TOOL_REDUCER } from '../component/ToolAddress/redux/TOOL_REDUCER';
import { LAYER_REDUCER } from '../component/Layer/redux/LAYER_REDUCER';

const featureReducer = combineReducers({
  ROAD: ROAD_REDUCER,
  TOOL: TOOL_REDUCER,
  LAYER: LAYER_REDUCER,
});

export const rootReducer = combineReducers({
  features: featureReducer,
});
