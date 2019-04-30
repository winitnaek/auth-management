import * as types from '../../base/constants/ActionTypes';
import initialState from '../../base/config/initialState';

export default function adminReducer(state = initialState.admindata, action) {
  switch(action.type) {
    case types.GET_TENANTS: {
        return Object.assign({}, ...state, {
            lastFullSyncDt: state.lastFullSyncDt,
            lastSFSyncDt: state.lastSFSyncDt,
            lastTPFSyncDt: state.lastTPFSyncDt,
            sfSyncEnabled: state.sfSyncEnabled,
            tpfSyncEnabled: state.tpfSyncEnabled,
            adminTenants: Object.assign([], ...state.adminTenants, state.adminTenants),
        });
    }
    case types.GET_SYNC_INFO: {
        return Object.assign({}, ...state, {
            lastFullSyncDt: action.lastFullSyncDt,
            lastSFSyncDt: action.lastSFSyncDt,
            lastTPFSyncDt: action.lastTPFSyncDt,
            sfSyncEnabled: action.sfSyncEnabled,
            tpfSyncEnabled: action.tpfSyncEnabled,
            adminTenants: Object.assign([], ...state.adminTenants, state.adminTenants),
        });
    }
    default: 
      return state;
  }
}