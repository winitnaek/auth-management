import * as types from '../../base/constants/ActionTypes';
import initialState from '../../base/config/initialState';

export default function modifyConfigReducer(state = initialState.modifydata, action) {
    switch (action.type) {
        case types.LOAD_MODIFYCONFIG_DATA:
            {
                return state = action.modifydata
            }
        default:
            return state;
    }
}