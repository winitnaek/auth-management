import * as types from '../../base/constants/ActionTypes';
import initialState from '../../base/config/initialState';

export default function accountsReducer(state = initialState.accountsdata, action) {
  switch(action.type) {
    case types.GET_TENANTS_SUCCESS: {
        return Object.assign({}, ...state, {
            accounts: Object.assign([], ...state.accounts, action.accountsdata)
        });
    }
    case types.GET_TENANTS_ERROR: {
      return Object.assign({}, ...state, {
          accounts: Object.assign([], ...state.accounts, action.accountsdata)
      });
  }
    default: 
      return state;
  }
}