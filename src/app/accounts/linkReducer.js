import * as types from '../../base/constants/ActionTypes';
import initialState from '../../base/config/initialState';

export default function linkReducer(state = initialState.linkdata, action) {
    switch (action.type) {
        case types.LOAD_LINKCONFIG_DATA:
            {
                return state = action.linkdata
            }
        default:
            return state;
    }
}