import * as types from '../../base/constants/ActionTypes';
import initialState from '../../base/config/initialState';

export default function adminReducer(state = initialState.admindata, action) {
  switch(action.type) {
    case types.GET_TENANTS: {
        return Object.assign({}, ...state, {
            lastFullSyncDt: action.lastFullSyncDt,
            lastSFSyncDt: action.lastSFSyncDt,
            lastTPFSyncDt: action.lastTPFSyncDt,
            sfSyncEnabled: action.sfSyncEnabled,
            tpfSyncEnabled: action.tpfSyncEnabled,
            adminTenants: Object.assign([], ...state.adminTenants, action.adminTenants),
        });
    }
    case types.GET_SYNC_INFO_SUCCESS: {
        return Object.assign({}, ...state, {
            lastFullSyncDt: action.admindata.lastFullSyncDt,
            lastSFSyncDt: action.admindata.lastSFSyncDt,
            lastTPFSyncDt: action.admindata.lastTPFSyncDt,
            sfSyncEnabled: action.admindata.sfSyncEnabled,
            tpfSyncEnabled: action.admindata.tpfSyncEnabled,
            adminTenants: Object.assign([], ...state.adminTenants, action.admindata.adminTenants),
        });
    }
    default: 
      return state;
  }
}