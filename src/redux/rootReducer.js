import { combineReducers } from 'redux';
import { ROAD_REDUCER } from '../component/FindRoad/redux/ROAD_REDUCER';

const featureReducer = combineReducers({
  ROAD: ROAD_REDUCER,
});

export const rootReducer = combineReducers({
  features: featureReducer,
});
