import { ROAD_ACTIONS } from '../redux/ROAD_ACTION';
import { useDispatch, useSelector } from 'react-redux';

export function useRoad() {
  const state = useSelector((state) => state.features.ROAD);
  const dispatch = useDispatch();
  const resetAll = () => {
    dispatch(ROAD_ACTIONS.resetAll());
  };
  const resetStatus = () => {
    dispatch(ROAD_ACTIONS.resetStatus());
  };
  const setRoadSelected = (payload) => {
    dispatch(ROAD_ACTIONS.setRoadSelected(payload));
  };
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
