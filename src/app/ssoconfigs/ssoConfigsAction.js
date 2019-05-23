import * as types from '../../base/constants/ActionTypes'
import ssoConfigAPI from './ssoConfigAPI';
import accountsAPI from '../accounts/accountsAPI'
import {generateAppErrorEvent} from '../../base/utils/AppErrorEvent';
/**
 * adminAction
 * @author Vinit
 */
export function getSSOConfigs() {
    return function (dispatch, getState) {
        const state = getState();
        return accountsAPI.getSSOConfigs().then(ssoconfigsdata => {
            if(ssoconfigsdata){
                if(ssoconfigsdata && ssoconfigsdata.message){
                    dispatch(getSSOConfigsError(ssoconfigsdata));
                }else if(ssoconfigsdata){
                    dispatch(getSSOConfigsSuccess(ssoconfigsdata));
                }
            }else{
                throw ssoconfigsdata;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function getSSOConfigsSuccess(ssoconfigsdata) {
    return { type: types.GET_SSOCONFIG_BYTENANTS_SUCCESS, ssoconfigsdata };
}
export function getSSOConfigsError(ssoconfigsdata) {
    return { type: types.GET_SSOCONFIG_BYTENANTS_ERROR, ssoconfigsdata };
}
export function addSSOConfig(ssoConfigProps) {
    return function (dispatch, getState) {
        const state = getState();
        return ssoConfigAPI.addSSOConfig(ssoConfigProps).then(ssoconfigdata => {
            if(ssoconfigdata){
                if(ssoconfigdata && ssoconfigdata.syncdate){
                    dispatch(addSSOConfigSuccess(ssoconfigdata));
                }else if(ssoconfigdata && ssoconfigdata.message){
                    dispatch(addSSOConfigError(ssoconfigdata));
                }
            }else{
                throw ssoconfigdata;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function addSSOConfigSuccess(ssoconfigdata) {
    return { type: types.ADD_SSO_CONFIG_SUCCESS, ssoconfigdata };
}
export function addSSOConfigError(ssoconfigdata) {
    return { type: types.ADD_SSO_CONFIG_ERROR, ssoconfigdata };
}
export function updateSSOConfig(ssoConfigProps) {
    return function (dispatch, getState) {
        const state = getState();
        return ssoConfigAPI.updateSSOConfig(ssoConfigProps).then(ssoconfigdata => {
            if(ssoconfigdata){
                if(ssoconfigdata && ssoconfigdata.syncdate){
                    dispatch(updateSSOConfigSuccess(ssoconfigdata));
                }else if(ssoconfigdata && ssoconfigdata.message){
                    dispatch(updateSSOConfigError(ssoconfigdata));
                }
            }else{
                throw ssoconfigdata;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function updateSSOConfigSuccess(ssoconfigdata) {
    return { type: types.UPDATE_SSO_CONFIG_SUCCESS, ssoconfigdata };
}
export function updateSSOConfigError(ssoconfigdata) {
    return { type: types.UPDATE_SSO_CONFIG_ERROR, ssoconfigdata };
}
export function deleteSSOConfig(id) {
    return function (dispatch, getState) {
        const state = getState();
        return ssoConfigAPI.deleteSSOConfig(id).then(deleted => {
            if(deleted){
                if(deleted && deleted.message){
                    dispatch(deleteSSOConfigError(deleted));
                }else if(deleted){
                    dispatch(deleteSSOConfigSuccess(deleted));
                }
            }else{
                throw deleted;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function deleteSSOConfigSuccess(deleted) {
    return { type: types.DELETE_SSO_CONFIG_SUCCESS, deleted };
}
export function deleteSSOConfigError(deleted) {
    return { type: types.DELETE_SSO_CONFIG_ERROR, deleted };
}
export function loadModifyConfig(modifydata){
    return {type:types.LOAD_MODIFYCONFIG_DATA,modifydata};
}
export function loadTestSsoIdp(ssoidpdata){
    return {type:types.LOAD_TESTSSOIDP_DATA,ssoidpdata};
}