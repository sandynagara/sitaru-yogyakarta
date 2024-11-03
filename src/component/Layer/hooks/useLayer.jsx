import { LAYER_ACTIONS } from '../redux/LAYER_ACTION';
import { useDispatch, useSelector } from 'react-redux';

export function useLayer() {
  const state = useSelector((state) => state.features.LAYER);
  const dispatch = useDispatch();
  const setOpacityBasemap = (param) => {
    dispatch(LAYER_ACTIONS.setOpacityBasemap(param));
  };
  const setOpacityFotoUdara = (param) => {
    dispatch(LAYER_ACTIONS.setOpacityFotoUdara(param));
  };
  const setOpacityRdtr = (param) => {
    dispatch(LAYER_ACTIONS.setOpacityRdtr(param));
  };
  const setOpacityBidangTanah = (param) => {
    dispatch(LAYER_ACTIONS.setOpacityBidangTanah(param));
  };
  return {
    state,
    setOpacityBasemap,
    setOpacityFotoUdara,
    setOpacityRdtr,
    setOpacityBidangTanah
  };
}
