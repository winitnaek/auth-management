import * as types from '../../base/constants/ActionTypes'
import ssoConfigAPI from './ssoConfigAPI';
import {generateAppErrorEvent} from '../../base/utils/AppErrorEvent';
/**
 * adminAction
 * @author Vinit
 */
export function addSSOConfig() {
    return function (dispatch, getState) {
        const state = getState();
        return ssoConfigAPI.addSSOConfig().then(ssoconfigdata => {
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
export function updateSSOConfig() {
    return function (dispatch, getState) {
        const state = getState();
        return ssoConfigAPI.updateSSOConfig().then(ssoconfigdata => {
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
        return ssoConfigAPI.deleteSSOConfig().then(deleted => {
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