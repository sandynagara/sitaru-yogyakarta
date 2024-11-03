/* eslint-disable max-lines */
import { LAYER_CONSTANT } from './LAYER_CONSTANT';

export const LAYER_ACTIONS = {
  setOpacityBasemap:(payload) => {
    return (dispatch) => {
      dispatch({ type: LAYER_CONSTANT.SET_OPACITY_BASEMAP, 
        payload:{ opacityBasemap: payload },
       });
    };
  },
  setOpacityBidangTanah:(payload) => {
    return (dispatch) => {
      dispatch({ type: LAYER_CONSTANT.SET_OPACITY_BASEMAP, 
        payload:{ opacityBidangTanah: payload },
       });
    };
  },
  setOpacityFotoUdara:(payload) => {
    return (dispatch) => {
      dispatch({ type: LAYER_CONSTANT.SET_OPACITY_FOTO_UDARA, 
        payload:{ opacityFotoUdara: payload },
       });
    };
  },
  setOpacityRdtr:(payload) => {
    return (dispatch) => {
      dispatch({ type: LAYER_CONSTANT.SET_OPACITY_RDTR, 
        payload:{ opacityRdtr: payload },
       });
    };
  },
};
