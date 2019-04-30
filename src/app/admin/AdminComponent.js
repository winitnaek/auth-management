import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JqxGrid from '../../deps/jqwidgets-react/react_jqxgrid.js';
import JqxDateTimeInput from '../../deps/jqwidgets-react/react_jqxdatetimeinput.js';
import {Alert, Button, Card, CardHeader, CardBody,FormGroup, Label, Col, Form,Input,Container,Row,CustomInput} from 'reactstrap';
import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import {runFullSFSync}  from './adminAction';
import {divStylePA} from '../../base/constants/AppConstants';
import AddAccount from './AddAccount';
class AdminComponent extends React.Component {
    constructor(props) {
        super(props);
        let data = [{'accountId':'100', 'accountName':'IBM', 'productName':'TPF','dataset':'Dataset IBM'},{accountId:'101', accountName:'Panera', productName:'TF',dataset:'Dataset Pan'},{accountId:'102', accountName:'Dannys', productName:'CF',dataset:'Dataset Dan'}];
        let source =
        {
            datatype: "json",
            datafields: [
                { name: 'accountId', type: 'string' },
                { name: 'accountName', type: 'string' },
                { name: 'productName', type: 'string' },
                { name: 'dataset', type: 'string' }
            ],
            pagesize: 5,
            localdata: data
        };
        let tpfSyncOnOffLabel ='TPF Sync Off';
        let sfSyncOnOffLabel  ='SaleForce Sync Off';
        this.state = {
            source: source,
            openAddAdminAccount:false,
            tpfSyncOnOffLabel:tpfSyncOnOffLabel,
            sfSyncOnOffLabel:sfSyncOnOffLabel
        };
        this.onAddAdminAccount = this.onAddAdminAccount.bind(this);
        this.handleAddAccountCancel = this.handleAddAccountCancel.bind(this);
        this.tpfSyncOnOffChanged = this.tpfSyncOnOffChanged.bind(this);
        this.sfSyncOnOffChanged = this.sfSyncOnOffChanged.bind(this);
    }
    onAddAdminAccount() {
       this.setState({openAddAdminAccount:true});
    }
    handleAddAccountCancel() {
        this.setState({openAddAdminAccount:false});
    }
    tpfSyncOnOffChanged(event){
        if(this.tpfSyncOnOff.checked==true){
            console.log('checked');
            this.setState({tpfSyncOnOffLabel:'TPF Sync On'});
        }else{
            console.log('unchecked');
            this.setState({tpfSyncOnOffLabel:'TPF Sync Off'});
        }
    }
    sfSyncOnOffChanged(event){
        if(this.sfSyncOnOff.checked==true){
            console.log('checked');
            this.setState({sfSyncOnOffLabel:'SaleForce Sync On'});
        }else{
            console.log('unchecked');
            this.setState({sfSyncOnOffLabel:'SaleForce Sync Off'});
        }
    }
    renderAdminUI(admindata){
        if(!admindata){
            const removeMe = (id) => {
                console.log(id);
                var selectedrowindex = this.refs.adminAccountGrid.getselectedrowindex();
                console.log('selectedrowindex '+selectedrowindex);
                var rowscount = this.refs.adminAccountGrid.getdatainformation().rowscount;
                console.log('rowscount '+rowscount);
                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                    var id = this.refs.adminAccountGrid.getrowid(selectedrowindex);
                    var commit = this.refs.adminAccountGrid.deleterow(id);
                    this.state.w2dgridata.splice(selectedrowindex,1);
                    let enableAction=false;
                    if(rowscount==1){
                        enableAction = true;
                    }
                }
            }
            let date = new Date(), y = date.getFullYear(), m = date.getMonth();
            let firstDay = new Date(y, m, 1);
            let dataAdapter = new $.jqx.dataAdapter(this.state.source);
            let columns =
            [
            { text: 'Account', datafield: 'accountName',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Product', datafield: 'productName',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Dataset', datafield: 'dataset',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: '      ', cellsalign: 'center', width: '65', align: 'center', datafield: 'Delete', columntype: 'button', cellsrenderer: function (ndex, datafield, value, defaultvalue, column, rowdata) {
                return 'Delete';
               }, buttonclick: function (id) {
                   removeMe(id);
               }
            },
            ];
            return(
                <div class="row h-100 justify-content-center align-items-center">
                    <Container>
                        <Row>
                            <Col className="p-3"><h3 class="text-bsi">Admin</h3></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader>Full Sync</CardHeader>
                                    <CardBody>
                                        <Form>
                                            <FormGroup row style={{ marginBottom: 0 }}>
                                                <Label sm={1}></Label>
                                                <Label sm={4}>Last Full SalesForce Sync Date/Time</Label>
                                                <Col sm={3} className="p-2">
                                                    <Label>04-30-2019 12:58:59</Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Button color="primary" size="sm" className="btn btn-primary" onClick={this.toggle}>Re-Run Full SalesForce Sync</Button>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Label className="p-1"></Label>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader>Periodic Sync</CardHeader>
                                    <CardBody>
                                        <Form>
                                            <FormGroup row>
                                                <Label sm={1}></Label>
                                                <Label sm={4}>Last SalesForce Sync Date/Time</Label>
                                                <Col sm={3}>
                                                    <JqxDateTimeInput ref='lastSFSyncDt' height={30} width={175} animationType={'fade'}
                                                        dropDownHorizontalAlignment={'left'} disabled={false} value={`${firstDay}`} formatString="MM-dd-yyyy HH:mm:ss"/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Button color="primary" size="sm" className="btn btn-primary" onClick={this.toggle}>Sync SalesForce</Button>
                                                </Col>
                                                <CustomInput type="switch" innerRef={(input) => this.sfSyncOnOff = input}  id="sfSyncOnOff" onChange={this.sfSyncOnOffChanged} name="sfSyncOnOff" label={this.state.sfSyncOnOffLabel} />
                                            </FormGroup>
                                            <FormGroup row style={{ marginBottom: 0 }}>
                                                <Label sm={1}></Label>
                                                <Label sm={4}>Last TPF Sync Date/Time</Label>
                                                <Col sm={3}>
                                                      <JqxDateTimeInput ref='lastTPFSyncDt' height={30} width={175} animationType={'fade'}
                                                        dropDownHorizontalAlignment={'left'} disabled={false} value={`${firstDay}`} formatString="MM-dd-yyyy HH:mm:ss"/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Button color="primary" size="sm" className="btn btn-primary" onClick={this.toggle}>Sync TPF</Button>
                                                </Col>
                                                <CustomInput type="switch" innerRef={(input) => this.tpfSyncOnOff = input}  id="tpfSyncOnOff" defaultChecked={false} onChange={this.tpfSyncOnOffChanged} name="tpfSyncOnOff" label={this.state.tpfSyncOnOffLabel} />
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Label className="p-1"></Label>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader>Manage Admin Accounts</CardHeader>
                                    <CardBody>
                                    <Button color="secondary" size="sm" className="mb-2" onClick={() => this.onAddAdminAccount()}>Add Admin Account</Button>{' '}
                                    <JqxGrid ref='adminAccountGrid'
                                        width={'100%'} source={dataAdapter} pageable={true} pagermode ={'simple'}
                                        sortable={false} altrows={false} enabletooltips={false}
                                        autoheight={true} editable={false} columns={columns}
                                        filterable={false} showfilterrow={false}
                                        selectionmode={'multiplerowsextended'}/>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    {this.state.openAddAdminAccount ? (<AddAccount handleCancel={this.handleAddAccountCancel}  showAddAccount={this.state.openAddAdminAccount} />):null}
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
        return (<div>{this.renderAdminUI(this.props.admindata)}</div>);
    }
};
function mapStateToProps(state) {
    return {
        admindata: state.admindata
    }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({runFullSFSync}, dispatch) }
 }
export default connect(mapStateToProps,mapDispatchToProps, null, { withRef: true })(AdminComponent);