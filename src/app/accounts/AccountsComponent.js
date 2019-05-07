import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JqxGrid from '../../deps/jqwidgets-react/react_jqxgrid.js';
import {Alert, Button, Card, CardHeader, CardBody,FormGroup, Label, Col, Form,Input,Container,Row,CustomInput} from 'reactstrap';
import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import {linkSSOConfigToTenant}  from './accountsAction';
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
            localdata: []
        };
        this.state = {
            source: source
        };
    }
    renderAccountsUI(accountsdata){
        if(!accountsdata){
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
            { text: 'Link/UnLink', cellsalign: 'center', width: '65', align: 'center', datafield: 'Delete', columntype: 'button', cellsrenderer: function (ndex, datafield, value, defaultvalue, column, rowdata) {
                return 'SSO Config';
               }, buttonclick: function (id) {
                   linkUInLink(id);
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
        accountsdata: state.accountsdata
    }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({linkSSOConfigToTenant}, dispatch) }
 }
export default connect(mapStateToProps,mapDispatchToProps, null, { withRef: true })(AccountsComponent);