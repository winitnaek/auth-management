import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JqxGrid from '../../deps/jqwidgets-react/react_jqxgrid.js';
import {Alert, Button, Card, CardHeader, CardBody,FormGroup, Label, Col, Form,Input,Container,Row,CustomInput} from 'reactstrap';
import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import {addSSOConfig,loadModifyConfig,loadTestSsoIdp,deleteSSOConfig,updateSSOConfig,getSSOConfigs}  from './ssoConfigsAction';
import {divStylePA} from '../../base/constants/AppConstants';
import AddSSOConfig from './AddSSOConfig';
import TestSsoIdp from './TestSsoIdp';
class SSOConfigComponent extends React.Component {
    constructor(props) {
        super(props);
        let source =
        {
            datatype: "json",
            datafields: [
                { name: 'id', type: 'string' },
                { name: 'acctName', type: 'string' },
                { name: 'dsplName', type: 'string' },
                { name: 'idpIssuer', type: 'string' },
                { name: 'idpReqURL', type: 'string' },
                { name: 'spConsumerURL', type: 'string' },
                { name: 'spIssuer', type: 'string' },
                { name: 'attribIndex', type: 'int' },
                { name: 'validateRespSignature', type: 'boolean' },
                { name: 'validateIdpIssuer', type: 'boolean' },
                { name: 'signRequests', type: 'boolean' },
                { name: 'allowLogout', type: 'boolean' },
                { name: 'redirectToApplication', type: 'boolean' },
                { name: 'nonSamlLogoutURL', type: 'string' },
                { name: 'appRedirectURL', type: 'string' },
                { name: 'certAlias', type: 'string' },
                { name: 'certPassword', type: 'string' },
                { name: 'certText', type: 'string' },
                { name: 'expireRequestSecs', type: 'int' },
                { name: 'enabled', type: 'boolean' },
            ],
            pagesize: 10,
            localdata:this.props.ssoconfigsdata
        };
        this.state = {
            source: source,
            openAddSSOConfig:false,
            addModifyTitle:'',
            openTestSOIdp:false,
            testSsoIdpTitle:'',
            rowdata:{},
            isnewconfig:false
        };
        this.handleShowModifyConfig = this.handleShowModifyConfig.bind(this);
        this.handleSSOConfigSave = this.handleSSOConfigSave.bind(this);
        this.handleShowModifyConfigCancel = this.handleShowModifyConfigCancel.bind(this);
        this.handleTestSSOIdpCancel = this.handleTestSSOIdpCancel.bind(this);
    }
    onAddSSOConfig() {
        this.setState({openAddSSOConfig:true,isnewconfig:true,addModifyTitle:'Add New SSO Config'});
        /*this.props.actions.addSSOConfig(ssoConfigProps).then(response => {
            return response
        }).catch(error => {
            console.log('Error Occured In Sync onAddSSOConfig.');
            console.log(error);
        });*/
     }
     handleShowModifyConfigCancel() {
         this.setState({openAddSSOConfig:false,isnewconfig:false});
     }
     handleTestSSOIdpCancel() {
        this.setState({openTestSOIdp:false});
    }
     componentWillReceiveProps(nextProps) {
        if (nextProps.modifydata && nextProps.modifydata.modify) {
            var modifydata = {
                modify: false,
                configid:''
            }
            this.props.actions.loadModifyConfig(modifydata);
            let data = this.refs.manageConfigsGrid.getrowdata(nextProps.modifydata.configid);
            //alert('Selected Config for Modify : '+ Object.values(data));
            this.handleShowModifyConfig(data);
        }else if(nextProps.ssoidpdata && nextProps.ssoidpdata.testssoidp){
            var ssoidpdata = {
                testssoidp: false,
                ssoid:''
            }
            this.props.actions.loadTestSsoIdp(ssoidpdata);
            let data = this.refs.manageConfigsGrid.getrowdata(nextProps.ssoidpdata.ssoid);
            this.handleShowTestSSOIdp(data);
        }
    }
    handleShowModifyConfig(rowdata) {        
        console.log(rowdata);
        /*rowdata = {  
            "id":1,
            "acctName":"Walmart",
            "dsplName":"TestConfig",
            "idpIssuer":"testuser",

            "idpReqURL":"http://localhost:8080/idpReqURL",
            "spConsumerURL":"http://localhost:8080/spConsumerURL",
            "spIssuer":"TestspIssuer",
            "attribIndex":400,

            "validateRespSignature":true,
            "validateIdpIssuer":true,
            "signRequests":true,
            "allowLogout":true,
            "redirectToApplication":true,

            "nonSamlLogoutURL":"http://localhost:8080/nonSamlLogoutURL",
            "appRedirectURL":"http://localhost:8080/appRedirectURL",

            "certAlias":"TestcertAlias",
            "certPassword":"TestcertPassword",

            "certText":"certTextcertTextcertTextcertTextcertTextcertText",

            "expireRequestSecs":100,
            "enabled":true
         }*/

        this.setState({
            openAddSSOConfig: true,
            isnewconfig:false,
            addModifyTitle: 'Modify SSO Config',
            rowdata:rowdata
        })
        console.log('rowdata');
        console.log(rowdata);
    }
    handleShowTestSSOIdp(rowdata) {        
        this.setState({
            openTestSOIdp: true,
            testSsoIdpTitle:'Test '+rowdata.configName
        })
        console.log('rowdata');
        console.log(rowdata);
    }
    handleSSOConfigSave(props) {
        this.setState({openAddSSOConfig:false});
        this.props.actions.getSSOConfigs().then(() => {
            if(this.props.ssoconfigsdata){
                this.state.source.localdata =this.props.ssoconfigsdata; 
                this.refs.manageConfigsGrid.updatebounddata('data');
            }
        });
    }
    renderSSOConfigUI(ssoconfigsdata){
        if(ssoconfigsdata){
            const removeMe = (id) => {
                var selectedrowindex = this.refs.manageConfigsGrid.getselectedrowindex();
                var rowscount = this.refs.manageConfigsGrid.getdatainformation().rowscount;
                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                    var id = this.refs.manageConfigsGrid.getrowid(selectedrowindex);
                    let data = this.refs.manageConfigsGrid.getrowdata(id);
                    if(!data && rowscount ==1){
                        let datarow = this.refs.manageConfigsGrid.getrows();
                        this.props.actions.deleteSSOConfig(datarow[0].id);
                    }else{
                        this.props.actions.deleteSSOConfig(data.id);
                    }
                    var commit = this.refs.manageConfigsGrid.deleterow(id);
                }
            }
            
            let dataAdapter = new $.jqx.dataAdapter(this.state.source);
            let columns =
            [
            { text: 'Config', datafield: 'dsplName',  cellsalign: 'center', width: 'auto', align: 'center'},    
            { text: 'Linked To', datafield: 'acctName',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Modify', cellsalign: 'center', align: 'center', cellsrenderer: function (ndex, datafield, value, defaultvalue, column, rowdata) {
                return `<a href="#" title="${'Modify'}"><div style="text-align:center;" class="align-self-center align-middle"><button type="button" style="padding-top:0.1rem;cursor: pointer;font-size:.90rem" class="btn btn-link align-self-center" onClick={onModifyConfig('${ndex}')}>${'Modify '+rowdata.dsplName}</button></div></a>`;}
            },
            { text: 'Test Config', cellsalign: 'center', align: 'center', cellsrenderer: function (ndex, datafield, value, defaultvalue, column, rowdata) {
                return `<a href="#" title="${'Test Config '+rowdata.dsplName}"><div style="text-align:center;" class="align-self-center align-middle"><button type="button" style="padding-top:0.1rem;cursor: pointer;font-size:.90rem" class="btn btn-link align-self-center" onClick={onTestSsoIdp('${ndex}')}>${'Test '+rowdata.dsplName}</button></div></a>`;}
            },
            { text: '        ', cellsalign: 'center', width: '70', align: 'center', datafield: 'Delete', columntype: 'button', cellsrenderer: function (ndex, datafield, value, defaultvalue, column, rowdata) {
                return 'Delete';
               }, buttonclick: function (id) {
                   removeMe(id);
               }
            }
            ];
            return(
                <div class="row h-100 justify-content-center align-items-center">
                    <Container>
                        <Row>
                            <Col className="p-3"><h3 class="text-bsi">Manage SSO Config</h3></Col>
                        </Row>
                        <Row>
                        <Col>
                        <Button color="secondary" size="sm" className="mb-2" onClick={() => this.onAddSSOConfig()}>Add New SSO Config</Button>{' '}
                        <JqxGrid ref='manageConfigsGrid'
                            width={'100%'} source={dataAdapter} pageable={true} pagermode ={'simple'}
                            sortable={false} altrows={false} enabletooltips={false}
                            autoheight={true} editable={false} columns={columns}
                            filterable={false} showfilterrow={false}
                            selectionmode={'multiplerowsextended'} />
                        </Col>
                        </Row>
                    </Container>
                    {this.state.openAddSSOConfig ? (<AddSSOConfig actions={this.props.actions} handleCancel={this.handleShowModifyConfigCancel} handleSave={this.handleSSOConfigSave} showAddAccount={this.state.openAddSSOConfig} title={this.state.addModifyTitle} rowdata={this.state.rowdata} modenew={this.state.isnewconfig} accounts={this.props.accounts}/>):null}
                    {this.state.openTestSOIdp ? (<TestSsoIdp handleCancel={this.handleTestSSOIdpCancel}  showAddAccount={this.state.openTestSOIdp} title={this.state.testSsoIdpTitle}/>):null}
                </div>
            );
        }else{
            return(<div>
                <Alert color="info">
                    Loading...
                </Alert>
                </div>
            );
        }
    }
    render() {
        return (<div>{this.renderSSOConfigUI(this.props.ssoconfigsdata)}</div>);
    }
};
function mapStateToProps(state) {
    return {
        ssoconfigsdata: state.ssoconfigsdata.ssoconfigs,
        modifydata:state.modifydata,
        ssoidpdata:state.ssoidpdata,
        accounts:state.accountsdata.accounts
    }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({addSSOConfig,loadModifyConfig,loadTestSsoIdp,deleteSSOConfig,updateSSOConfig,getSSOConfigs}, dispatch) }
 }
export default connect(mapStateToProps,mapDispatchToProps, null, { withRef: true })(SSOConfigComponent);