import * as types from '../../base/constants/ActionTypes';
import initialState from '../../base/config/initialState';

export default function ssoConfigsReducer(state = initialState.ssoconfigsdata, action) {
  switch (action.type) {
    case types.GET_SSOCONFIG_BYTENANTS_SUCCESS: {
      return Object.assign({}, ...state, {
        ssoconfigs: Object.assign([], ...state.ssoconfigs, action.ssoconfigsdata)
      });
    }
    default:
      return state;
  }
}