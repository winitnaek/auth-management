import * as types from '../../base/constants/ActionTypes';
import initialState from '../../base/config/initialState';

export default function testssoidpReducer(state = initialState.ssoidpdata, action) {
    switch (action.type) {
        case types.LOAD_TESTSSOIDP_DATA:
            {
                return state = action.ssoidpdata
            }
        default:
            return state;
    }
}