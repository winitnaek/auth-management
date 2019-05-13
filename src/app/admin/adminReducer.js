import * as types from '../../base/constants/ActionTypes';
import initialState from '../../base/config/initialState';

export default function adminReducer(state = initialState.admindata, action) {
  switch(action.type) {
    case types.GET_ADMINTENANT_SUCCESS: {
        return Object.assign({}, ...state, {
            lastFullSync:state.lastFullSync,
            lastPerFSync:state.lastPerFSync,
            isPerSyncOn:state.isPerSyncOn,
            isSyncInProgress:state.isSyncInProgress,
            adminTenants: Object.assign([], ...state.adminTenants, action.adminTenants),
        });
    }
    case types.GET_SYNC_INFO_SUCCESS: {
        return Object.assign({}, ...state, {
            lastFullSync:action.admindata.lastFullSync,
            lastPerFSync:action.admindata.lastPerFSync,
            isPerSyncOn:action.admindata.isPerSyncOn,
            isSyncInProgress:action.admindata.isSyncInProgress,
            adminTenants: Object.assign([], ...state.adminTenants, action.admindata.adminTenants),
        });
    }
    case types.ENABLE_PERSYNC_SUCCESS: {
        return Object.assign({}, ...state, {
            lastFullSync:state.lastFullSync,
            lastPerFSync:state.lastPerFSync,
            isPerSyncOn:action.enabled,
            isSyncInProgress:state.isSyncInProgress,
            adminTenants: state.adminTenants.accountsdata
        });
    }
    default: 
      return state;
  }
}