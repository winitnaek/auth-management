import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input} from 'reactstrap';
import Select from 'react-select';
class AddAccount extends React.Component {
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
                <Modal isOpen={this.props.showAddAccount} toggle={this.toggle} backdrop="static" size="lg">
                    <ModalHeader toggle={this.toggleUIConfirmCancel}>Add Admin Account</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={1}></Label>
                                <Label sm={3}>Select Account</Label>
                                <Col sm={6} style={{ zIndex: 100 }}>
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
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={1}></Label>
                                <Label sm={3}>Select Product</Label>
                                <Col sm={6} style={{ zIndex: 90 }}>
                                    <Select
                                        name="selProduct"
                                        value={this.state.selectedProduct}
                                        onChange={this.handleProductChange}
                                        isSearchable={false}
                                        isClearable={false}
                                        isMulti={false}
                                        options={this.state.products}
                                        isLoading={this.state.isProductLoading}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={1}></Label>
                                <Label sm={3}>Dataset/Comp CID</Label>
                                <Col sm={6} style={{ zIndex: 80 }}>
                                    <Input type="text" name="dataset" id="datasetcompcid" placeholder="Enter Dataset/Comp CID" />
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
export default AddAccount;