import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JqxGrid from '../../deps/jqwidgets-react/react_jqxgrid.js';
import JqxDateTimeInput from '../../deps/jqwidgets-react/react_jqxdatetimeinput.js';
import {Alert, Button, Card, CardHeader, CardBody,FormGroup, Label, Col, Form,Input,Container,Row,CustomInput} from 'reactstrap';
import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import {runFullSFSync,enablePeriodicDataSync}  from './adminAction';
import {divStylePA} from '../../base/constants/AppConstants';
import AddAccount from './AddAccount';
class AdminComponent extends React.Component {
    constructor(props) {
        super(props);
        let source =
        {
            datatype: "json",
            datafields: [
                { name: 'id', type: 'string' },
                { name: 'acctName', type: 'string' },
                { name: 'prodName', type: 'string' },
                { name: 'dataset', type: 'string' }
            ],
            pagesize: 5,
            localdata: this.props.admindata.adminTenants
        };
        let perSyncOnOffLabel  ='Periodic Sync Off';
        let isPerSyncOnOff=false;
        if(this.props.admindata.isPerSyncOn){
            isPerSyncOnOff =true;
            perSyncOnOffLabel='Periodic Sync On';
        }
        this.state = {
            source: source,
            openAddAdminAccount:false,
            perSyncOnOffLabel:perSyncOnOffLabel,
            isPerSyncOnOff:isPerSyncOnOff
        };
        this.onAddAdminAccount = this.onAddAdminAccount.bind(this);
        this.handleAddAccountCancel = this.handleAddAccountCancel.bind(this);
        this.perSyncOnOffChanged = this.perSyncOnOffChanged.bind(this);
    }
    onAddAdminAccount() {
       this.setState({openAddAdminAccount:true});
    }
    handleAddAccountCancel() {
        this.setState({openAddAdminAccount:false});
    }
    perSyncOnOffChanged(event){
        if(this.sfSyncOnOff.checked==true){
            this.props.actions.enablePeriodicDataSync(true);
            console.log('checked');
            this.setState({perSyncOnOffLabel:'Periodic Sync On'});
        }else{
            this.props.actions.enablePeriodicDataSync(false);
            console.log('unchecked');
            this.setState({perSyncOnOffLabel:'Periodic Sync Off'});
        }
    }
    renderAdminUI(admindata){
        if(admindata){
            const removeMe = (id) => {
                console.log(id);
                var selectedrowindex = this.refs.adminAccountGrid.getselectedrowindex();
                console.log('selectedrowindex '+selectedrowindex);
                var rowscount = this.refs.adminAccountGrid.getdatainformation().rowscount;
                console.log('rowscount '+rowscount);
                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                    var id = this.refs.adminAccountGrid.getrowid(selectedrowindex);
                    var commit = this.refs.adminAccountGrid.deleterow(id);
                    //this.state.adminAccountGrid.splice(selectedrowindex,1);
                    let enableAction=false;
                    if(rowscount==1){
                        enableAction = true;
                    }
                }
            }
            let dataAdapter = new $.jqx.dataAdapter(this.state.source);
            var lastPerFSyncDt = new Date(admindata.lastPerFSync);
            
            let columns =
            [
            { text: 'Account', datafield: 'acctName',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Product', datafield: 'prodName',  cellsalign: 'center', width: 'auto', align: 'center'},
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
                                    <CardBody style={{padding:16}}>
                                        <Form>
                                            <FormGroup row style={{ marginBottom: 0 }}>
                                                <Label sm={1}></Label>
                                                <Label sm={4}>Last Full Sync Date/Time</Label>
                                                <Col sm={3} className="p-2">
                                                    <Label>{admindata.lastFullSync}</Label>
                                                </Col>
                                                <Col sm={3}>
                                                    <Button color="primary" size="sm" className="btn btn-primary" onClick={this.toggle}>Re-Run Full Data Sync</Button>
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
                                    <CardBody style={{padding:16}}>
                                        <Form>
                                            <FormGroup row style={{marginBottom:0}}>
                                                <Label sm={1}></Label>
                                                <Label sm={4}>Last Periodic Sync Date/Time</Label>
                                                <Col sm={3}>
                                                    <JqxDateTimeInput ref='lastSFSyncDt' height={30} width={175} animationType={'fade'}
                                                        dropDownHorizontalAlignment={'left'} disabled={false} value={`${lastPerFSyncDt}`} formatString="MM-dd-yyyy HH:mm:ss"/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Button color="primary" size="sm" className="btn btn-primary" onClick={this.toggle}>Sync Data</Button>
                                                </Col>
                                                <CustomInput type="switch" innerRef={(input) => this.sfSyncOnOff = input}  id="sfSyncOnOff" onChange={this.perSyncOnOffChanged} defaultChecked={this.state.isPerSyncOnOff} name="sfSyncOnOff" label={this.state.perSyncOnOffLabel} />
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
                                    <CardHeader>Manage Admin Dataset</CardHeader>
                                    <CardBody>
                                    <Button color="secondary" size="sm" className="mb-2" onClick={() => this.onAddAdminAccount()}>Add Admin Dataset</Button>{' '}
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
    return { actions: bindActionCreators({runFullSFSync,enablePeriodicDataSync}, dispatch) }
 }
export default connect(mapStateToProps,mapDispatchToProps, null, { withRef: true })(AdminComponent);