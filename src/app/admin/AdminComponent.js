import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JqxGrid from '../../deps/jqwidgets-react/react_jqxgrid.js';
import JqxDateTimeInput from '../../deps/jqwidgets-react/react_jqxdatetimeinput.js';
import {Alert, Button, Card, CardHeader, CardBody,FormGroup, Label, Col, Form,Input,Container,Row,CustomInput} from 'reactstrap';
import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import {runInitialDataSync,runPeriodicDataSync,enablePeriodicDataSync,deleteTenant,getSyncInfo}  from './adminAction';
import {divStylePA} from '../../base/constants/AppConstants';
import AddAccount from './AddAccount';
import AdminDatasetsGrid from './AdminDatasetsGrid';
const SYNCINFO_TIMER =10000;
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
            isPerSyncOnOff:isPerSyncOnOff,
            dsyncbtn:false
        };
      
        this.handleAddAccountCancel = this.handleAddAccountCancel.bind(this);
        this.perSyncOnOffChanged = this.perSyncOnOffChanged.bind(this);
        this.openAddAcct = this.openAddAcct.bind(this);
        this.handleSyncInProgress = this.handleSyncInProgress.bind(this);
        this.runInitialDataSyncProc = this.runInitialDataSyncProc.bind(this);
        this.runPeriodicDataSyncProc = this.runPeriodicDataSyncProc.bind(this);
        this.handleSyncInProgress();
        //this.syncinterval = setInterval(this.handleSyncInProgress.bind(this), SYNCINFO_TIMER);
    }
    runPeriodicDataSyncProc(){
        this.props.actions.runPeriodicDataSync(this.refs.lastPerSyncDt.val());
        this.setState({dsyncbtn:true});
    }
    runInitialDataSyncProc(){
        this.props.actions.runInitialDataSync();
        this.setState({dsyncbtn:true});
    }
    handleSyncInProgress(){
        this.props.actions.getSyncInfo().then(response => {
            if(this.props.admindata && this.props.admindata.message){
                this.setState({dsyncbtn:false});
                console.log('Error Occured In Sync handleSyncInProgress');
                clearInterval(this.syncinterval);
                console.log('Sync interval is cleared.');
            }else if(this.props.admindata.isSyncInProgress===true){
                this.setState({dsyncbtn:true});
                console.log('Sync Process is In-Progress');
            }else if(this.props.admindata.isSyncInProgress===false){
                this.setState({dsyncbtn:false});
                console.log('Sync Process is not In-Progress');
            }
            return response
        }).catch(error => {
            console.log('Error Occured In Sync handleSyncInProgress In side cache error');
            clearInterval(this.syncinterval);
            console.log('Sync interval is cleared.');
            console.log(error);
        });
    }
    openAddAcct() {
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
           var lastPerSyncDt = new Date(this.props.admindata.lastPerSync);
           return(
                <div class="row h-100 justify-content-center align-items-center">
                    <Container>
                        {this.props.admindata && this.props.admindata.isSyncInProgress ? (
                        <Row>
                        <Col><Alert color="success" isOpen={this.props.admindata.isSyncInProgress===true}>
                            <span href="#" id="inProgressSpinner"> <i class="fas fa-spinner fa-spin"></i> Data Sync is in progress.</span>
                        </Alert></Col>
                        </Row>
                        ):null}
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
                                                    <Button color="primary" disabled={this.state.dsyncbtn} size="sm" className="btn btn-primary" onClick={this.runInitialDataSyncProc}>Re-Run Full Data Sync</Button>
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
                                                    <JqxDateTimeInput ref='lastPerSyncDt' height={30} width={175} animationType={'fade'}
                                                        dropDownHorizontalAlignment={'left'} disabled={false} value={`${lastPerSyncDt}`} formatString="yyyy-MM-ddThh:mm:ss"/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Button color="primary" disabled={this.state.dsyncbtn} size="sm" className="btn btn-primary" onClick={this.runPeriodicDataSyncProc}>Sync Data</Button>
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
                        {this.props.admindata.adminTenants && this.props.admindata.adminTenants.length > 0 ? (<AdminDatasetsGrid adminTenants={this.props.admindata.adminTenants} actions={this.props.actions} openAddAcct={this.openAddAcct}/>):null}
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
    return { actions: bindActionCreators({runInitialDataSync,runPeriodicDataSync,enablePeriodicDataSync,deleteTenant,getSyncInfo}, dispatch) }
 }
export default connect(mapStateToProps,mapDispatchToProps, null, { withRef: true })(AdminComponent);