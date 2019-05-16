import * as types from '../../base/constants/ActionTypes'
import adminAPI from './adminAPI';
import {generateAppErrorEvent} from '../../base/utils/AppErrorEvent';
/**
 * adminAction
 * @author Vinit
 */
export function runInitialDataSync() {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.runInitialDataSync().then(initialsync => {
            if(initialsync){
                if(initialsync && initialsync.syncdate){
                    dispatch(runInitialDataSyncSuccess(initialsync));
                }else if(initialsync && initialsync.message){
                    dispatch(runInitialDataSyncError(initialsync));
                }
            }else{
                throw initialsync;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function runInitialDataSyncSuccess(initialsync) {
    return { type: types.INITIALDATA_SYNC_SUCCESS, fullsfsync };
}
export function runInitialDataSyncError(initialsync) {
    return { type: types.INITIALDATA_SYNC_ERROR, fullsfsync };
}
export function runPeriodicDataSync(fromDateTime) {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.runPeriodicDataSync(fromDateTime).then(periodicsync => {
            if(periodicsync){
                if(periodicsync && periodicsync.syncdate){
                    dispatch(runPeriodicDataSyncSuccess(periodicsync));
                }else if(periodicsync && periodicsync.message){
                    dispatch(runPeriodicDataSyncError(periodicsync));
                }
            }else{
                throw periodicsync;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function runPeriodicDataSyncSuccess(periodicsync) {
    return { type: types.PERIODIC_SYNC_SUCCESS, periodicsync };
}
export function runPeriodicDataSyncError(periodicsync) {
    return { type: types.PERIODIC_SYNC_ERROR, periodicsync };
}
export function enablePeriodicDataSync(enabled) {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.enablePeriodicDataSync(enabled).then(enabled => {
            if(enabled){
                if(enabled && enabled.message){
                    dispatch(enablePeriodicDataSyncError(enabled));
                }else if(enabled){
                    dispatch(enablePeriodicDataSyncSuccess(enabled));
                }
            }else{
                throw enabled;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function enablePeriodicDataSyncSuccess(enabled) {
    return { type: types.ENABLE_PERSYNC_SUCCESS, enabled };
}
export function enablePeriodicDataSyncError(enabled) {
    return { type: types.ENABLE_PERSYNC_ERROR, enabled };
}

export function addTenant(accountName, productName, datasetName,companyCID) {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.addTenant(accountName, productName, datasetName,companyCID).then(teantdata => {
            if(teantdata){
                if(teantdata && teantdata.message){
                    dispatch(addTenantError(teantdata));
                }else if(teantdata){
                    dispatch(addTenantSuccess(teantdata));
                }
            }else{
                throw teantdata;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function addTenantSuccess(teantdata) {
    return { type: types.ADD_TENENT_SUCCESS, teantdata };
}
export function addTenantError(teantdata) {
    return { type: types.ADD_TENENT_ERROR, teantdata };
}
export function deleteTenant(tendantId) {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.deleteTenant(tendantId).then(deleted => {
            if(deleted){
                if(deleted && deleted.message){
                    dispatch(deleteTenantError(deleted));
                }else if(deleted){
                    dispatch(deleteTenantSuccess(deleted));
                }
            }else{
                throw deleted;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function deleteTenantSuccess(deleted) {
    return { type: types.DELETED_TENENT_SUCCESS, deleted };
}
export function deleteTenantError(deleted) {
    return { type: types.DELETED_TENENT_ERROR, deleted };
}
export function getAdminTenants(includeImported) {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.getTenants(includeImported).then(tenants => {
            if(tenants){
                if(tenants && tenants.message){
                    dispatch(getAdminTenantsError(tenants));
                }else if(tenants){
                    dispatch(getAdminTenantsSuccess(tenants));
                }
            }else{
                throw tenants;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function getAdminTenantsSuccess(adminTenants) {
    return { type: types.GET_ADMINTENANT_SUCCESS, adminTenants };
}
export function getAdminTenantsError(adminTenants) {
    return { type: types.GET_ADMINTENANT_ERROR, adminTenants };
}
export function getSyncInfo() {
    return function (dispatch, getState) {
        const state = getState();
        let  dt = new Date();
        return adminAPI.getSyncInfo().then(syncInfo => {
            if(syncInfo){
                if(syncInfo && syncInfo.message){
                    dispatch(getSyncInfoError(syncInfo));
                }else if(syncInfo){
                    dispatch(getSyncInfoSuccess(syncInfo));
                }
            }else{
                throw syncInfo;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function getSyncInfoSuccess(admindata) {
    return { type: types.GET_SYNC_INFO_SUCCESS, admindata };
}
export function getSyncInfoError(syncInfo) {
    return { type: types.GET_SYNC_INFO_ERROR, syncInfo };
}
export function getProductsByTenants(accountName) {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.getProductsByTenants().then(products => {
            if(products){
                if(products && products.message){
                    dispatch(getProductsByTenantsError(products));
                }else if(products){
                    dispatch(getProductsByTenantsSuccess(products));
                }
            }else{
                throw products;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function getProductsByTenantsSuccess(products) {
    return { type: types.GET_PRODUCT_BYTENANTS_SUCCESS, products };
}
export function getProductsByTenantsError(products) {
    return { type: types.GET_PRODUCT_BYTENANTS_ERROR, products };
}