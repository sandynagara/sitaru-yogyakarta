/* eslint-disable max-lines */
import { ROAD_CONSTANT } from './ROAD_CONSTANT';
import { RoadService } from '../service';
const roadService = new RoadService();

export const ROAD_ACTIONS = {
  get_road: (query) => {
    return async (dispatch) => {
      dispatch({
        type: ROAD_CONSTANT.GET_ROAD_START,
        payload: {
          listRoad: {
            status_GET: 'LOADING',
          },
        },
      });
      try {
        const data = await roadService.get_road(query);         
        dispatch({
          type: ROAD_CONSTANT.GET_ROAD_SUCCESS,
          payload: {
            listRoad: {
              status_GET: 'SUCCESS',
              list: data,
            },
          },
        });
      } catch (error) {
        dispatch({
          type: ROAD_CONSTANT.GET_ROAD_FAILED,
          payload: {
            listRoad: {
              status_GET: 'FAILED',
              message: error.message,
            },
          },
        });
      }
    };
  },
  resetAll: () => {
    return (dispatch) => {
      dispatch({ type: ROAD_CONSTANT.RESET_ALL });
    };
  },
  setRoadSelected:(payload) => {
    return (dispatch) => {
      dispatch({ type: ROAD_CONSTANT.SET_ROAD_SELECTED, 
        payload:{ selectedRoad: payload },
       });
    };
  },
  resetStatus: () => {
    return (dispatch) => {
      dispatch({ type: ROAD_CONSTANT.RESET_STATUS });
    };
  },
};
