import * as types from '../../base/constants/ActionTypes';
import initialState from '../../base/config/initialState';

export default function auditLogsReducer(state = initialState.auditlogsdata, action) {
  switch (action.type) {
    case types.GET_AUDITLOGS_SUCCESS: {
      return Object.assign({}, ...state, {
        auditlogs: Object.assign([], ...state.auditlogs, action.auditlogsdata)
      });
    }
    case types.GET_AUDITLOGS_ERROR: {
      return Object.assign({}, ...state, {
        auditlogs: Object.assign([], ...state.auditlogs, action.auditlogsdata)
      });
    }
    default:
      return state;
  }
}