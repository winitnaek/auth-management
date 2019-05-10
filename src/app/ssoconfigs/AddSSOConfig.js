import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input,CustomInput} from 'reactstrap';
import Select from 'react-select';
class AddSSOConfig extends React.Component {
    constructor(props) {
        super(props);
        let accounts =[];
        accounts.push({'value':'IBM','label':'IBM'},{'value':'Panera','label':'Panera'},{'value':'Dannys','label':'Dannys'});
        let products =[];
        products.push({'value':'TPF','label':'TPF'},{'value':'CF','label':'CF'},{'value':'TF','label':'TF'});
        this.state = {
            showAddAccount: this.props.showAddAccount,
            accounts:accounts,
            products:products,
            selectedAccount:'',
            selectedProduct:''
        };
        this.toggleUIConfirmOk = this.toggleUIConfirmOk.bind(this);
        this.toggleUIConfirmCancel = this.toggleUIConfirmCancel.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
    }
    handleAccountChange(selectedAccount){
        console.log('selectedAccount');
        console.log(selectedAccount);
        this.setState({ selectedAccount});
        let account = `${selectedAccount.value}`;
        console.log('account');
        console.log(account);
    }
    handleProductChange(selectedProduct){
        console.log('selectedProduct');
        console.log(selectedProduct);
        this.setState({ selectedProduct});
        let product = `${selectedProduct.value}`;
        console.log('product');
        console.log(product);
    }
    toggleUIConfirmOk() {
        this.props.handleOk();
    }
    toggleUIConfirmCancel() {
        this.props.handleCancel();
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.props.showAddAccount} style={{ 'max-width': window.innerWidth-200}} toggle={this.toggle} backdrop="static" size="lg">
                    <ModalHeader toggle={this.toggleUIConfirmCancel}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>Select Account</Label>
                                <Col sm={4} style={{ zIndex: 100 }}>
                                    <Select
                                        name="selAccount"
                                        value={this.state.selectedAccount}
                                        onChange={this.handleAccountChange}
                                        isSearchable={false}
                                        isClearable={false}
                                        isMulti={false}
                                        options={this.state.accounts}
                                        isLoading={this.state.isCompLoading}
                                    />
                                    
                                </Col>
                                <Label sm={1}>Config Name</Label>
                                <Col sm={4} style={{ zIndex: 100 }}>
                                <Input type="text" name="dsplName" id="dsplName" placeholder="Enter Config Name" />
                                 </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>idpIssuer</Label>
                                <Col sm={4}>
                                    <Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter idpIssuer" />
                                </Col>
                                <Label sm={1}>idpReqURL</Label>
                                <Col sm={4}>
                                    <Input type="text" name="idpReqURL" id="idpReqURL" placeholder="Enter idpReqURL" />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>spConsumerURL</Label>
                                <Col sm={4}>
                                    <Input type="text" name="spConsumerURL" id="spConsumerURL" placeholder="Enter spConsumerURL" />
                                </Col>
                                <Label sm={1}>spIssuer</Label>
                                <Col sm={4}>
                                    <Input type="text" name="spIssuer" id="spIssuer" placeholder="Enter spIssuer" />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>attribIndex</Label>
                                <Col sm={4}>
                                    <Input type="number" name="attribIndex" id="attribIndex" placeholder="Enter attribIndex" />
                                </Col>
                                <Label sm={1}></Label>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.sfSyncOnOff = input}  id="sfSyncOnOff" onChange={this.sfSyncOnOffChanged} defaultChecked={this.state.isSfSyncOnOff} name="sfSyncOnOff" label="validateRespSignature"/>
                                </Col>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.sfSyncOnOff = input}  id="sfSyncOnOff" onChange={this.sfSyncOnOffChanged} defaultChecked={this.state.isSfSyncOnOff} name="sfSyncOnOff" label="validateIdpIssuer"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}></Label>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.sfSyncOnOff = input}  id="sfSyncOnOff" onChange={this.sfSyncOnOffChanged} defaultChecked={this.state.isSfSyncOnOff} name="sfSyncOnOff" label="signRequests"/>
                                </Col>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.sfSyncOnOff = input}  id="sfSyncOnOff" onChange={this.sfSyncOnOffChanged} defaultChecked={this.state.isSfSyncOnOff} name="sfSyncOnOff" label="allowLogout"/>
                                </Col>
                                <Label sm={1}></Label>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.sfSyncOnOff = input}  id="sfSyncOnOff" onChange={this.sfSyncOnOffChanged} defaultChecked={this.state.isSfSyncOnOff} name="sfSyncOnOff" label="redirectToApplication"/>
                                </Col>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.sfSyncOnOff = input}  id="sfSyncOnOff" onChange={this.sfSyncOnOffChanged} defaultChecked={this.state.isSfSyncOnOff} name="sfSyncOnOff" label="allowLogout"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>nonSamlLogoutURL</Label>
                                <Col sm={4}>
                                    <Input type="text" name="nonSamlLogoutURL" id="nonSamlLogoutURL" placeholder="Enter nonSamlLogoutURL" />
                                </Col>
                                <Label sm={1}>appRedirectURL</Label>
                                <Col sm={4}>
                                    <Input type="text" name="appRedirectURL" id="appRedirectURL" placeholder="Enter iappRedirectURL" />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>certAlias</Label>
                                <Col sm={4}>
                                    <Input type="text" name="certAlias" id="certAlias" placeholder="Enter certAlias" />
                                </Col>
                                <Label sm={1}>certPassword</Label>
                                <Col sm={4}>
                                    <Input type="text" name="certPassword" id="certPassword" placeholder="Enter certPassword" />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>certText</Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="certText" id="certText" placeholder="Enter certText" />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                            <Label sm={1}></Label>
                                <Label sm={1}></Label>
                                <Col sm={3}>
                                <CustomInput type="switch" innerRef={(input) => this.sfSyncOnOff = input}  id="sfSyncOnOff" onChange={this.sfSyncOnOffChanged} defaultChecked={this.state.isSfSyncOnOff} name="sfSyncOnOff" label="enable Configuration"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" className="btn btn-primary mr-auto" onClick={this.toggleUIConfirmCancel}>Cancel</Button>
                        <Button onClick={() => this.onPerformAction(4)} color="success">Save</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default AddSSOConfig;