import * as types from '../../base/constants/ActionTypes'
import adminAPI from './adminAPI';
import {generateAppErrorEvent} from '../../base/utils/AppErrorEvent';
/**
 * adminAction
 * @author Vinit
 */
export function runFullSFSync() {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.runFullSFSync().then(fullsfsync => {
            if(fullsfsync){
                if(fullsfsync && fullsfsync.syncdate){
                    dispatch(getEEW2PdfSuccess(fullsfsync));
                }else if(fullsfsync && fullsfsync.message){
                    dispatch(getEEW2PdfError(fullsfsync));
                }
            }else{
                throw fullsfsync;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function runFullSFSyncSuccess(fullsfsync) {
    return { type: types.FULL_SF_SYNC_SUCCESS, fullsfsync };
}
export function runFullSFSyncError(fullsfsync) {
    return { type: types.FULL_SF_SYNC_ERROR, fullsfsync };
}
export function runSFSync(fromDateTime) {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.runSFSync(fromDateTime).then(sfsync => {
            if(sfsync){
                if(sfsync && sfsync.syncdate){
                    dispatch(runSFSyncSuccess(sfsync));
                }else if(sfsync && sfsync.message){
                    dispatch(runSFSyncError(sfsync));
                }
            }else{
                throw sfsync;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function runSFSyncSuccess(sfsync) {
    return { type: types.SF_SYNC_SUCCESS, sfsync };
}
export function runSFSyncError(sfsync) {
    return { type: types.SF_SYNC_ERROR, sfsync };
}
export function runTPFSync(fromDateTime) {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.runTPFSync(fromDateTime).then(tpfsync => {
            if(tpfsync){
                if(tpfsync && tpfsync.syncdate){
                    dispatch(runTPFSyncSuccess(tpfsync));
                }else if(tpfsync && tpfsync.message){
                    dispatch(runTPFSyncError(tpfsync));
                }
            }else{
                throw tpfsync;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function runTPFSyncSuccess(tpfsync) {
    return { type: types.TPF_SYNC_SUCCESS, tpfsync };
}
export function runTPFSyncError(tpfsync) {
    return { type: types.TPF_SYNC_ERROR, tpfsync };
}
export function enableSFSync(enabled) {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.enableSFSync(enabled).then(enabled => {
            if(enabled){
                if(enabled && enabled.message){
                    dispatch(enableSFSyncError(enabled));
                }else if(enabled){
                    dispatch(enableSFSyncSuccess(enabled));
                }
            }else{
                throw enabled;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function enableSFSyncSuccess(enabled) {
    return { type: types.TPF_SYNC_SUCCESS, enabled };
}
export function enableSFSyncError(enabled) {
    return { type: types.TPF_SYNC_ERROR, enabled };
}
export function enableTPFSync(enabled) {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.enableTPFSync(enabled).then(enabled => {
            if(enabled){
                if(enabled && enabled.message){
                    dispatch(enableTPFSyncError(enabled));
                }else if(enabled){
                    dispatch(enableTPFSyncSuccess(enabled));
                }
            }else{
                throw enabled;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function enableTPFSyncSuccess(enabled) {
    return { type: types.ENABLE_TPF_SYNC_SUCCESS, enabled };
}
export function enableTPFSyncError(enabled) {
    return { type: types.ENABLE_TPF_SYNC_ERROR, enabled };
}
export function addTenant(accountName, productName, datasetName) {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.addTenant(accountName, productName, datasetName).then(teantdata => {
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
export function getTenant(includeImported) {
    return function (dispatch, getState) {
        const state = getState();
        return adminAPI.getTenant(includeImported).then(tenants => {
            if(tenants){
                if(tenants && tenants.message){
                    dispatch(getTenantError(tenants));
                }else if(tenants){
                    dispatch(getTenantSuccess(tenants));
                }
            }else{
                throw tenants;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function getTenantSuccess(tenants) {
    return { type: types.GET_TENANTS_SUCCESS, tenants };
}
export function getTenantError(tenants) {
    return { type: types.GET_TENANTS_ERROR, tenants };
}
export function getSyncInfo() {
    return function (dispatch, getState) {
        const state = getState();
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
export function getSyncInfoSuccess(syncInfo) {
    return { type: types.GET_SYNC_INFO_SUCCESS, syncInfo };
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