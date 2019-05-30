import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JqxGrid from '../../deps/jqwidgets-react/react_jqxgrid.js';
import {Alert, Button, Card, CardHeader, CardBody,FormGroup, Label, Col, Form,Input,Container,Row,CustomInput} from 'reactstrap';
import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import {loadLinkConfig,loadUnLinkConfig}  from './accountsAction';
import accountsAPI from './accountsAPI';
import {divStylePA} from '../../base/constants/AppConstants';
import LinkConfigToTenant from './LinkConfigToTenant';
import UIAlert from '../common/UIAlert';
class AccountsComponent extends React.Component {
    constructor(props) {
        super(props);
        let source =
        {
            datatype: "json",
            datafields: [
                { name: 'id', type: 'string' },
                { name: 'acctName', type: 'string' },
                { name: 'prodName', type: 'string' },
                { name: 'dataset', type: 'string' },
                { name: 'enabled', type: 'boolean' },
                { name: 'ssoConfDsplName', type: 'string' },
                { name: 'ssoConfId', type: 'int' },
                { name: 'imported', type: 'boolean' }
            ],
            pagesize: 10,
            localdata:this.props.accountsdata
        };
        this.state = {
            source: source,
            showLinkTenantToConfig:false,
            linkrow:'',
            ssoconfigs:[],
            showAlertAddTenantToConfig:false,
            showAlert:false
        };
        this.handleShowLinkTenantToConfig = this.handleShowLinkTenantToConfig.bind(this);
        this.handleTenantConfigCancel = this.handleTenantConfigCancel.bind(this);
        this.handleTenantConfigSave = this.handleTenantConfigSave.bind(this);
        this.hideUIAlert=this.hideUIAlert.bind(this);
    }
    hideUIAlert(){
        this.setState({
            showAlert: !this.state.showAlert
        });
    }
    showAlert(ashow,aheader,abody){
        this.setState({
            showAlert: ashow,
            aheader:aheader,
            abody:abody
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.linkdata && nextProps.linkdata.linked) {
            var linkdata = {
                linked: false,
                accountid:''
            }
            this.props.actions.loadLinkConfig(linkdata);
            let data = this.refs.accountsGrid.getrowdata(nextProps.linkdata.accountid);
            accountsAPI.getSSOConfigsByTenant(data.acctName).then(response => response).then((ssoconfigs) => {
                console.log('ssoconfigs');
                console.log(ssoconfigs);
                if(ssoconfigs && ssoconfigs.length > 0){
                    this.setState({ssoconfigs:ssoconfigs});
                    this.handleShowLinkTenantToConfig(data);
                }else{
                    this.showAlert(true,'Alert','Please add SSO Configuration for the Account using "Manage SSO Config" before you link one.');
                }
                return ssoconfigs
            });
        }else if(nextProps.unlinkdata && nextProps.unlinkdata.unlinked){
            var unlinkdata = {
                unlinked: false,
                accountid:''
              }
            this.props.actions.loadUnLinkConfig(unlinkdata);
            let data = this.refs.accountsGrid.getrowdata(nextProps.unlinkdata.accountid);
            accountsAPI.linkSSOConfigToTenant(data.acctName, data.ssoConfId, true).then(response => response).then((repos) => {
                var accounts =[];
                for (let [key, value] of Object.entries(this.props.accountsdata)) {
                    accounts.push(value);
                }
                var ldata = [];
                accounts[0].forEach(function(vals, index) {
                    if(vals.ssoConfId == data.ssoConfId && vals.id ==data.id){
                        vals.ssoConfId=''
                        vals.ssoConfDsplName=''
                    }
                    ldata.push(vals);
                });
                this.state.source.localdata =ldata; 
                this.refs.accountsGrid.updatebounddata('data');
                return repos
            });
        }
    }
    handleTenantConfigCancel() {
        this.setState({showLinkTenantToConfig:false});
    }
    handleTenantConfigSave(selectedConfig) {
        var data = this.state.linkrow;
        console.log('selectedConfig');
        console.log(selectedConfig);
        console.log('data');
        console.log(data);
        accountsAPI.linkSSOConfigToTenant(data.acctName, selectedConfig.value, false).then(response => response).then((repos) => {
            if(repos){
                var accounts =[];
                for (let [key, value] of Object.entries(this.props.accountsdata)) {
                    accounts.push(value);
                }
                var ldata = [];
                accounts[0].forEach(function(vals, index) {
                    if(vals.id==data.id){
                        vals.ssoConfId=selectedConfig.value;
                        vals.ssoConfDsplName=selectedConfig.label;
                    }
                    ldata.push(vals);
                });
                this.state.source.localdata =ldata; 
                this.refs.accountsGrid.updatebounddata('data');
            }
            return repos
        });
        this.setState({showLinkTenantToConfig:false,linkrow:[]});
    }
    handleShowLinkTenantToConfig(rowdata) {        
        this.setState({
            showLinkTenantToConfig: true,
            title: ' ',
            linkrow:rowdata
        })
        console.log('handleShowLinkTenantToConfig');
        console.log(rowdata);
    }
    handleShowAlertAddTenantToConfig(rowdata) {        
        this.setState({
            showAlertAddTenantToConfig: true,
            title: ' ',
            linkrow:rowdata
        })
        console.log('handleShowLinkTenantToConfig');
        console.log(rowdata);
    }
    renderAccountsUI(accounts){
        if(accounts){
            let dataAdapter = new $.jqx.dataAdapter(this.state.source);
            let columns =
            [
            { text: 'Account', datafield: 'acctName',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Product', datafield: 'prodName',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Dataset', datafield: 'dataset',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Linked Config', datafield: 'ssoConfDsplName',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Config', cellsalign: 'center', align: 'center', filterable: false, cellsrenderer: function (ndex, datafield, value, defaultvalue, column, rowdata) {
                if(rowdata.ssoConfDsplName){
                    return `<a href="#" title="${'Un-Link'}"><div style="text-align:center;" class="align-self-center align-middle"><button type="button" style="padding-top:0.1rem;cursor: pointer;font-size:.90rem;" class="btn btn-link align-self-center" onClick={onUnLinkConfig('${ndex}')}>${'Un-Link'}</button></div></a>`;
                }else{
                    return `<a href="#" title="${'Link'}"><div style="text-align:center;" class="align-self-center align-middle"><button type="button" style="padding-top:0.1rem;cursor: pointer;font-size:.90rem;" class="btn btn-link align-self-center" onClick={onLinkConfig('${ndex}')}>${'Link'}</button></div></a>`;
                }
               }
            },
            ];
            
            let uiAlert    =   <UIAlert handleClick={this.hideUIAlert}  showAlert={this.state.showAlert} aheader={this.state.aheader} abody={this.state.abody} abtnlbl={'Ok'}/>;
            return(
                <div class="row h-100 justify-content-center align-items-center">
                    <Container>
                        <Row>
                            <Col className="p-3"><h3 class="text-bsi">Accounts</h3></Col>
                        </Row>
                        <Row>
                        <Col>
                        <JqxGrid ref='accountsGrid'
                            width={'100%'} source={dataAdapter} pageable={true} pagermode ={'simple'}
                            sortable={false} altrows={false} enabletooltips={false}
                            autoheight={true} editable={false} columns={columns}
                            filterable={true} showfilterrow={true}
                            selectionmode={'multiplerowsextended'}/>
                        </Col>
                        </Row>
                    </Container>
                    {this.state.showLinkTenantToConfig ? (<LinkConfigToTenant handleSave={this.handleTenantConfigSave} handleCancel={this.handleTenantConfigCancel}  showLinkTenantToConfig={this.state.showLinkTenantToConfig} linkrow={this.state.linkrow} ssoconfigs={this.state.ssoconfigs}/> ) : null}
                    {uiAlert}
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
        return (<div>{this.renderAccountsUI(this.props.accountsdata)}</div>);
    }
};
function mapStateToProps(state) {
    return {
        accountsdata: state.accountsdata,
        linkdata:state.linkdata,
        unlinkdata:state.unlinkdata
    }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({loadLinkConfig,loadUnLinkConfig}, dispatch) }
 }
export default connect(mapStateToProps,mapDispatchToProps, null, { withRef: true })(AccountsComponent);