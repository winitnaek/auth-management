import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './base/config/configureStore';
import * as rname from './base/constants/RenderNames';
import Progress from './app/common/Progress';
import * as manifest from '../build/_manifest';
import * as c from './base/constants/IndexConstants';
import {makeNavs,makeSearch} from './base/template/navGenerator';
import AdminComponent from './app/admin/AdminComponent';
import AccountsComponent from './app/accounts/AccountsComponent';
import AuditLogsComponent from './app/auditlogs/AuditLogsComponent';
import SSOConfigComponent from './app/ssoconfigs/SSOConfigComponent';
import {getSyncInfo,getAdminTenants}  from './app/admin/adminAction';
import {loadLinkConfig,loadUnLinkConfig,getTenantAccounts}  from './app/accounts/accountsAction';
import {getAuditLogs}  from './app/auditlogs/auditLogsAction';
import {getSSOConfigs,loadModifyConfig,loadTestSsoIdp}  from './app/ssoconfigs/ssoConfigsAction';
import ViewHelp from './app/common/ViewHelp';
import helpapi from './app/accounts/accountsAPI';

let store = configureStore();

//Temporary set user in session:======Comment this when deployed with MAC======
var userProfile ="{\r\n            \"userId\": \"001907\",\r\n            \"firstName\": \"Isreal\",\r\n            \"lastName\": \"Fullerton\",\r\n            \"dataset\": \"00_CFWD_002\",\r\n            \"securitytokn\": \"fhfh484jer843je848rj393jf\",\r\n            \"branding\": \"base64ImageData\",\r\n            \"userTheme\": \"Default\",\r\n            \"roles\": [\r\n                \"EE\"\r\n            ],\r\n            \"applications\": [\r\n                {\r\n                    \"id\": \"610bbc96-10dc-4874-a9fc-ecf0edf4260b\",\r\n                    \"name\": \"YearEndFactory\",\r\n                    \"accessIds\": [\r\n                        {\r\n                            \"id\": \"b9f6848d-30a7-451d-d2fa-86f3afa4df67\",\r\n                            \"visible\": true\r\n                        }\r\n                    ],\r\n                    \"permissions\": {\r\n                        \"viewDocument\": [\r\n                            1,\r\n                            0,\r\n                            0,\r\n                            0,\r\n                            0\r\n                        ]\r\n                    }\r\n                },\r\n                {   \r\n                \"id\": \"dd4282b1-0544-4ad1-8e0b-6a8d278ffd5c\",\r\n                \"name\": \"eeAdminFactory\",\r\n                \"accessIds\": [\r\n                    {\r\n                        \"id\": \"b55f51a1-0273-4457-8226-013a35d32080\",\r\n                        \"visible\": true\r\n                    }\r\n                ],\r\n                \"permissions\": {\r\n                    \"viewDocument\": [\r\n                        1,\r\n                        0,\r\n                        0,\r\n                        0,\r\n                        0\r\n                    ]\r\n                }\r\n            }\r\n            ],\r\n            \"themeList\": [\r\n                {\r\n                    \"id\": \"Default\",\r\n                    \"name\": \"Default\"\r\n                },\r\n                {\r\n                    \"id\": \"HighContrast\",\r\n                    \"name\": \"High Contrast\"\r\n                },\r\n                {\r\n                    \"id\": \"WhiteOnBlack\",\r\n                    \"name\": \"White On Black\"\r\n                },\r\n                {\r\n                    \"id\": \"BlackOnWhite\",\r\n                    \"name\": \"Black On White\"\r\n                }\r\n            ]\r\n        }"
var userdata = JSON.parse(userProfile);
//console.log('setUserProfile userdata');
//console.log(userdata);
sessionStorage.setItem("up", userProfile);
//==============================================================================
let usrobj = JSON.parse(sessionStorage.getItem('up'));
//console.log('setUserProfile usrobj');
//console.log(usrobj);
var dataset = usrobj.dataset;
var empId = usrobj.userId;
/**
 * renderW2AdmApplication TEST
 * master branch
 * @param {*} elem 
 * @param {*} renderName 
 */
function renderSecAdmApplication(elem, renderName) {
    setAppAnchor(elem);
    setAppDataset(dataset);
    if(renderName==rname.RN_ADMINISTRATION){
        store.dispatch(getSyncInfo()).then((result) => { 
            store.dispatch(getAdminTenants(false)).then((result) => {
                renderAdminData(elem);
            }).catch((error) => {
                throw new SubmissionError({_error:  error });
            });
        }).catch((error) => {
            throw new SubmissionError({_error:  error });
        });
       /*store.dispatch(getSyncInfo()).then((result) => {
         renderAdminData(elem);
         //setTimeout(function() {    
         //    renderAdminData(elem);
         //}.bind(this), 200)
        }).catch((error) => {
             throw new SubmissionError({_error:  error });
        });*/
    }else if(renderName==rname.RN_ACCOUNTS){
        //ReactDOM.render(<Provider store={store}><Progress/></Provider>,document.querySelector('#'+elem));
        store.dispatch(getTenantAccounts(true)).then((result) => {
        // setTimeout(function() {    
            renderAccountsData(elem);
        // }.bind(this), 200)
        }).catch((error) => {
             throw new SubmissionError({_error:  error });
        });
    }else if(renderName==rname.RN_SSO_CONFIGS){
       store.dispatch(getTenantAccounts(true));
       store.dispatch(getSSOConfigs()).then((result) => {
            renderManageConfigsData(elem);
            //setTimeout(function() {    
            //    renderAdminData(elem);
            //}.bind(this), 200)
        }).catch((error) => {
            throw new SubmissionError({ _error: error });
        });
           
    }else if(renderName==rname.RN_AUDIT_LOGS){
        store.dispatch(getAuditLogs(7)).then((result) => {
            renderAuditLogsData(elem);
            //setTimeout(function() {    
            //    renderAdminData(elem);
            //}.bind(this), 200)
        }).catch((error) => {
            throw new SubmissionError({ _error: error });
        });
        
    }
}
/**
 * renderManageConfigsData
 * @param {*} elem 
 */
function renderHelpContent(elem,helpurl) {
    helpapi.getHelp(helpurl).then(response => response).then((helpcontent) => {
        if(helpcontent){
            let open = true;
           console.log('Help Content : ');
           console.log(JSON.stringify(helpcontent));
           ReactDOM.render(
            <Provider store={store}>
            <ViewHelp showAlert={open} aheader={helpurl} abody={JSON.stringify(helpcontent)} abtnlbl={'Close'}/>
            </Provider>,
            document.querySelector('#'+elem));
        }
        return helpcontent
    });
}

/**
 * renderManageConfigsData
 * @param {*} elem 
 */
function renderManageConfigsData(elem) {
    ReactDOM.render(
        <Provider store={store}>
        <SSOConfigComponent/>
        </Provider>,
        document.querySelector('#'+elem));
}
/**
 * renderAuditLogsData
 * @param {*} elem 
 */
function renderAuditLogsData(elem) {
    ReactDOM.render(
        <Provider store={store}>
        <AuditLogsComponent/>
        </Provider>,
        document.querySelector('#'+elem));
}
/**
 * renderAccountsData
 * @param {*} elem 
 */
function renderAccountsData(elem) {
    ReactDOM.render(
        <Provider store={store}>
        <AccountsComponent/>
        </Provider>,
        document.querySelector('#'+elem));
}
/**
 * renderAdminData
 * @param {*} elem 
 */
function renderAdminData(elem) {
    ReactDOM.render(
        <Provider store={store}>
        <AdminComponent/>
        </Provider>,
        document.querySelector('#'+elem));
}
var APP_ANCHOR;
function setAppAnchor(elem){
   APP_ANCHOR = elem;
   ReactDOM.unmountComponentAtNode(document.querySelector('#'+elem));
}
function appAnchor(){
   return APP_ANCHOR;
}
var APP_DATASET;
function setAppDataset(dataset){
    APP_DATASET = dataset;
}
function appDataset(){
   return APP_DATASET;
}
function onLinkConfig(id) {
    var linkdata = {
        linked: true,
        accountid: id
    }
    store.dispatch(loadLinkConfig(linkdata));
}
function onUnLinkConfig(id){
    var unlinkdata = {
        unlinked: true,
        accountid: id
    }
    store.dispatch(loadUnLinkConfig(unlinkdata));
}
function onModifyConfig(id) {
    var modifydata = {
        modify: true,
        configid: id
    }
    store.dispatch(loadModifyConfig(modifydata));
}
function onTestSsoIdp(id) {
    var ssoidpdata = {
        testssoidp: true,
        ssoid: id
    }
    store.dispatch(loadTestSsoIdp(ssoidpdata));
}
const resolveTemplates = async () => {
    let response = await fetch('templates.html');
    let templates = await response.text();
    console.debug('templates => ');
    console.debug(templates);
    return templates;
};

const initIndexPage = (templData) => {
    let mnfst = manifest._manifest;
    console.debug('manifest =>', mnfst);

    if (!mnfst) {
        console.error('ERROR: Manifest not found!');
        throw new Error('Manifest not found!');
    }

    if (!mnfst.name || !mnfst.desc) {
        console.error('ERROR: Manifest missing application name and/or application description!');
        throw new Error('Application name and/or application description not found!');
    }
    $('#' + c.appTitleId).html($('#' + c.appTitleId).html() + ' ' + mnfst.desc);
    $('#' + c.appNameId).html($('#' + c.appNameId).html() + ' ' + mnfst.desc);
    checkIfAreasDefined(mnfst.areas);
    let visAreas = getVisibleAreas(mnfst);

    if (visAreas && visAreas.length) {
        let navInput = {
            'areas': visAreas,
            'rf': mnfst.renderFunction,
            'anchorId': c.appContentId
        };
        document.body.insertAdjacentHTML('afterend', templData);
        makeNavs(navInput);
    }
    let search = getSearchData(mnfst);
    if(search){
        let searchInput = {
            'id': search[0].id,
            'renderName': search[0].rendername,
            'entities': search[0].entities,
            'rf': mnfst.renderFunction,
            'anchorId': c.appContentId
        };
        console.log(searchInput);
        makeSearch(searchInput);
    }else{
        //Hide Search Input
    }
};

const getVisibleAreas = (mnfst) => {
    let visibleAreas = mnfst.areas.filter((a) => {
        return a.visible === true;
    });
    console.debug('visible areas =>', visibleAreas);

    if (!visibleAreas || !visibleAreas.length) {
        console.warn('No visible areas specified!');
        $('#noVsblAreasAlrt').removeClass('d-none').show();
    } else {
        $('#noVsblAreasAlrt').removeClass('d-none').hide();
    }

    return visibleAreas;
};

const getSearchData = (mnfst) => {
    console.debug('search data =>', mnfst.search);
    let searchdata = mnfst.search;
    return searchdata;
};

const checkIfAreasDefined = (areas) => {
    if (!areas) {
        console.error('ERROR: At least one area must be defined in manifest!');
        throw new Error('No areas defined in manifest!');
    }
};

const renderWelcomePage = (elem) => {
    renderSecAdmApplication(elem,rname.RN_ACCOUNTS);
    //document.getElementById(elem).innerHTML = "<h3>Welcome to the Security Administration Application Page. Please click on the links to perform different administrative activities for the applications.</h3>";
};
const renderhelpinfo = (elem,_helpid) => {
    renderHelpContent(elem,_helpid);
};
const unMountNMountContainerNode = () => {
    $("div").remove("#" + c.appContentId);
    $('<div id="' + c.appContentId + '" class="main-content p-4 m-4 mx-auto"></div>').insertAfter($("#" + c.navId));
};

module.exports = renderSecAdmApplication;
window.renderSecAdmApplication = renderSecAdmApplication;

module.exports = appDataset;
window.appDataset = appDataset;

module.exports = appAnchor;
window.appAnchor = appAnchor;

module.exports = onLinkConfig;
window.onLinkConfig = onLinkConfig;

module.exports = onUnLinkConfig;
window.onUnLinkConfig = onUnLinkConfig;

module.exports = onModifyConfig;
window.onModifyConfig = onModifyConfig;

module.exports = onTestSsoIdp;
window.onTestSsoIdp = onTestSsoIdp

let w2aIndex = {
    'resolveTemplates': resolveTemplates,
    'init': initIndexPage,
    'reloadContent': unMountNMountContainerNode,
    'renderWelcomePage': renderWelcomePage,
    'nameId': c.appNameId,
    'contentId': c.appContentId,
    'renderhelpinfo':renderhelpinfo
};

window.w2aIndex = w2aIndex;