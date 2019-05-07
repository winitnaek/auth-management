import * as types from '../../base/constants/ActionTypes';
import initialState from '../../base/config/initialState';

export default function unlinkReducer(state = initialState.unlinkdata, action) {
    switch (action.type) {
        case types.LOAD_UNLINKCONFIG_DATA:
            {
                return state = action.unlinkdata
            }
        default:
            return state;
    }
}