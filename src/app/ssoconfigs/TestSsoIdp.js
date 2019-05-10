import React from 'react';
import {Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input,CustomInput, Card, CardHeader, CardBody} from 'reactstrap';
import Select from 'react-select';
class TestSsoIdp extends React.Component {
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
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader style={{padding:8}}>Enter Login Details</CardHeader>
                                    <CardBody style={{padding:16}}>
                                        <Form>
                                            <FormGroup row style={{ marginBottom: 0 }}>
                                            <Label sm={1}></Label>
                                            <Label sm={2}>User SAML ID</Label>
                                            <Col sm={3}>
                                                <Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter User SAML ID" />
                                            </Col>
                                            <Label sm={2}>Company SAML ID</Label>
                                            <Col sm={3}>
                                                <Input type="text" name="idpReqURL" id="idpReqURL" placeholder="Enter Company SAML ID" />
                                            </Col>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader style={{padding:8}}>Enter Employee Or Employer Specific UI Theme</CardHeader>
                                    <CardBody style={{padding:16}}>
                                        <Form>
                                            <FormGroup row style={{ marginBottom: 0 }}>
                                            <Label sm={1}></Label>
                                            <Label sm={2}>Requested UI Theme</Label>
                                            <Col sm={3}>
                                                <Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter Requested UI Theme" />
                                            </Col>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader style={{padding:8}}>Enter On-Behalf Parameters</CardHeader>
                                    <CardBody style={{padding:16}}>
                                        <Form>
                                            <FormGroup row style={{ marginBottom: 0 }}>
                                            <Label sm={1}></Label>
                                            <Label sm={2}>Target User SAML ID</Label>
                                            <Col sm={3}>
                                                <Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter Target User SAML ID" />
                                            </Col>
                                            <Col sm={1}>
                                            <CustomInput type="checkbox" innerRef={(input) => this.idpEditMode = input}  id="idpEditMode" onChange={this.sfSyncOnOffChanged} defaultChecked={this.state.isSfSyncOnOff} name="sfSyncOnOff" label="Edit Mode"/>
                                            </Col>
                                            <Col sm={5}>
                                            <CustomInput type="checkbox" innerRef={(input) => this.samlorRelayState = input}  id="samlorRelayState" onChange={this.sfSyncOnOffChanged} defaultChecked={this.state.isSfSyncOnOff} name="sfSyncOnOff" label="User SAML Attributes (Check to use SAML/Un-check to use Relay State)"/>
                                            </Col>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader style={{padding:8}}>Enter Additional SAML Attributes</CardHeader>
                                    <CardBody style={{padding:16}}>
                                        <Form>
                                            <FormGroup row style={{ marginBottom: 0 }}>
                                            <Label sm={1}></Label>
                                            <Label sm={2}>Attribute Name/Value</Label>
                                            <Col sm={3}>
                                                <Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter Attribute Name" />
                                            </Col>
                                            <Label>/</Label>
                                            <Col sm={3}>
                                            <   Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter Attribute Value" />
                                            </Col>
                                            </FormGroup>
                                            <FormGroup row style={{ marginBottom: 0 }}>
                                            <Label sm={1}></Label>
                                            <Label sm={2}>Attribute Name/Value</Label>
                                            <Col sm={3}>
                                                <Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter Attribute Name" />
                                            </Col>
                                            <Label>/</Label>
                                            <Col sm={3}>
                                            <   Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter Attribute Value" />
                                            </Col>
                                            </FormGroup>
                                            <FormGroup row style={{ marginBottom: 0 }}>
                                            <Label sm={1}></Label>
                                            <Label sm={2}>Attribute Name/Value</Label>
                                            <Col sm={3}>
                                                <Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter Attribute Name" />
                                            </Col>
                                            <Label>/</Label>
                                            <Col sm={3}>
                                            <   Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter Attribute Value" />
                                            </Col>
                                            </FormGroup>
                                            <FormGroup row style={{ marginBottom: 0 }}>
                                            <Label sm={1}></Label>
                                            <Label sm={2}>Attribute Name/Value</Label>
                                            <Col sm={3}>
                                                <Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter Attribute Name" />
                                            </Col>
                                            <Label>/</Label>
                                            <Col sm={3}>
                                            <   Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter Attribute Value" />
                                            </Col>
                                            </FormGroup>
                                            <FormGroup row style={{ marginBottom: 0 }}>
                                            <Label sm={1}></Label>
                                            <Label sm={2}>Attribute Name/Value</Label>
                                            <Col sm={3}>
                                                <Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter Attribute Name" />
                                            </Col>
                                            <Label>/</Label>
                                            <Col sm={3}>
                                            <   Input type="text" name="idpIssuer" id="idpIssuer" placeholder="Enter Attribute Value" />
                                            </Col>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" className="btn btn-primary mr-auto" onClick={this.toggleUIConfirmCancel}>Cancel</Button>
                        <Button onClick={() => this.onPerformAction(4)} color="primary">Login</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default TestSsoIdp;