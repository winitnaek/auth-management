import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import AppError from '../../base/utils/AppError';
import { ADMIN_ERROR_MSG } from '../../base/utils/AppErrorEvent';
/**
 * adminActionAPI
 * @author Vinit
 */
class adminActionAPI {
    static runInitialDataSync() {
        var svcs_url = `${svcs.RUN_INITIALDATA_SYNC}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var errorCode = response.status;
                var errorMsg = 'Unable to Run Initial Data Sync. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
    static runPeriodicDataSync(fromDateTime) {
        let paramurl = `${'?fromDateTime='}${fromDateTime}`;
        var svcs_url = `${svcs.RUN_PERIODIC_SYNC}${paramurl}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var errorCode = response.status;
                var errorMsg = 'Unable to Run Periodic Data Sync. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
    static enablePeriodicDataSync(enabled) {
        let paramurl = `${'?enabled='}${enabled}`;
        var svcs_url = `${svcs.ENABLED_SF_SYNC}${paramurl}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
          })
            .then(response => {
              if(response.ok){
                return response.json();
              }else{
                var errorCode =  response.status;
                var errorMsg  =  'Unable to Enable Periodic Sync.'+ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
              } 
            })
            .catch(error => {
              return error;
            });
    }
    static addTenant(accountName, productName, datasetName, companyCID) {
        let paramurl = `${'?accountName='}${accountName}${'&productName='}${productName}${'&datasetName='}${datasetName}`;
        var svcs_url = `${svcs.ADD_TENANT}${paramurl}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var errorCode = response.status;
                var errorMsg = 'Unable to Add Tenant. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
    static deleteTenant(tendantId) {
        let paramurl = `${'?id='}${tendantId}`;
        var svcs_url = `${svcs.DELETE_TENANT}${paramurl}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var errorCode = response.status;
                var errorMsg = 'Unable to Delete Tenant. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
    static getTenants(includeImported) {
        let paramurl = `${'?includeImported='}${includeImported}`;
        var svcs_url = `${svcs.GET_TENANTS}${paramurl}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var errorCode = response.status;
                var errorMsg = 'Unable to Get Tenants. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
    static getSyncInfo() {
        var svcs_url = `${svcs.GET_SYNCINFO}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var errorCode = response.status;
                var errorMsg = 'Unable to Get Sync Info. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
    static getProductsByTenants(accountName) {
        let paramurl = `${'?accountName='}${accountName}`;
        var svcs_url = `${svcs.GET_PRODUCT_BY_TENANTS}${paramurl}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var errorCode = response.status;
                var errorMsg = 'Unable to Get Products By Tenants. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
}
export default adminActionAPI;