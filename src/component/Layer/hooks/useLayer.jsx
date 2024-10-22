import { ROAD_ACTIONS } from '../redux/ROAD_ACTION';
import { ROAD_CONSTANT } from '../redux/ROAD_CONSTANT';
import { useDispatch, useSelector } from 'react-redux';

export function useRoad() {
  const state = useSelector((state) => state.features.ROAD);
  const dispatch = useDispatch();
  const get_road = (param) => {
    dispatch(ROAD_ACTIONS.get_road(param));
  };
  return {
    state,
    resetAll,
    resetStatus,
    get_road,
    setRoadSelected
  };
}
