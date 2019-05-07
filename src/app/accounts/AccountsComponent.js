import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JqxGrid from '../../deps/jqwidgets-react/react_jqxgrid.js';
import {Alert, Button, Card, CardHeader, CardBody,FormGroup, Label, Col, Form,Input,Container,Row,CustomInput} from 'reactstrap';
import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import {linkSSOConfigToTenant,loadLinkConfig,loadUnLinkConfig}  from './accountsAction';
import {divStylePA} from '../../base/constants/AppConstants';
class AccountsComponent extends React.Component {
    constructor(props) {
        super(props);
        let source =
        {
            datatype: "json",
            datafields: [
                { name: 'accountId', type: 'string' },
                { name: 'accountName', type: 'string' },
                { name: 'productName', type: 'string' },
                { name: 'dataset', type: 'string' },
                { name: 'isEnabled', type: 'boolean' },
                { name: 'configname', type: 'string' }
            ],
            pagesize: 5,
            localdata:this.props.accountsdata
        };
        this.state = {
            source: source
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.linkdata && nextProps.linkdata.linked) {
            //$('[data-toggle="tooltip"]').tooltip('hide');
            var linkdata = {
                linked: false,
                accountid:''
            }
            this.props.actions.loadLinkConfig(linkdata);
            //let data = this.refs.eew2Grid.getrowdata(nextProps.w2data.eew2id);
            //this.handleShowPDF(data);
        }else if(nextProps.unlinkdata && nextProps.unlinkdata.unlinked){
            //$('[data-toggle="tooltip"]').tooltip('hide');
            var unlinkdata = {
                unlinked: false,
                accountid:''
              }
            this.props.actions.loadUnLinkConfig(unlinkdata);
            //let data = this.refs.eew2Grid.getrowdata(nextProps.compdata.compid);
            //this.handleShowMessages(data, null);
        }
    }
    renderAccountsUI(accounts){
        if(accounts){
            const linkUInLink = (id) => {
                console.log(id);
            }
            let dataAdapter = new $.jqx.dataAdapter(this.state.source);
            let columns =
            [
            { text: 'Account', datafield: 'accountName',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Product', datafield: 'productName',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Dataset', datafield: 'dataset',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Enabled', datafield: 'isEnabled',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Attached Config', datafield: 'configname',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Config', cellsalign: 'center', align: 'center', datafield: 'Delete', cellsrenderer: function (ndex, datafield, value, defaultvalue, column, rowdata) {
                if(rowdata.configname){
                    return `<a href="#" title="${'Un-Link'}"><div style="text-align:center;" class="align-self-center align-middle"><button type="button" style="padding-top:0.1rem;cursor: pointer;" class="btn btn-link align-self-center" onClick={onUnLinkConfig('${ndex}')}>${'Un-Link'}</button></div></a>`;
                }else{
                    return `<a href="#" title="${'Link'}"><div style="text-align:center;" class="align-self-center align-middle"><button type="button" style="padding-top:0.1rem;cursor: pointer;" class="btn btn-link align-self-center" onClick={onLinkConfig('${ndex}')}>${'Link'}</button></div></a>`;
                }
               }
            },
            ];
            const removeMe = (id) => {
                console.log(id);
            }
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
                            filterable={false} showfilterrow={false}
                            selectionmode={'multiplerowsextended'}/>
                        </Col>
                        </Row>
                    </Container>
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
        accountsdata: state.accountsdata.accounts
    }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({linkSSOConfigToTenant,}, dispatch) }
 }
export default connect(mapStateToProps,mapDispatchToProps, null, { withRef: true })(AccountsComponent);