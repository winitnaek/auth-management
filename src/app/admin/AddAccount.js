import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input} from 'reactstrap';
import adminAPI from './adminAPI'
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
            selectedProduct:'',
            dbtnsave:true
        };
        this.toggleUIConfirmSave = this.toggleUIConfirmSave.bind(this);
        this.toggleUIConfirmCancel = this.toggleUIConfirmCancel.bind(this);
        this.handleAcctNameChange = this.handleAcctNameChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleDatasetChange = this.handleDatasetChange.bind(this);
    }
    handleAcctNameChange(e){
        if(e.target.value.length > 0 && this.state.selectedProduct.value && this.datasetName.value){
            this.setState({dbtnsave:false});
        }else{
            this.setState({dbtnsave:true});
        }
    }
    handleProductChange(selectedProduct){
        this.setState({ selectedProduct});
        let product = `${selectedProduct.value}`;
        if(this.accountName.value && product && this.datasetName.value){
            this.setState({dbtnsave:false});
        }else{
            this.setState({dbtnsave:true});
        }
    }
    handleDatasetChange(e){
        if(this.accountName.value && this.state.selectedProduct.value && e.target.value.length >0){
            this.setState({dbtnsave:false});
        }else{
            this.setState({dbtnsave:true});
        }
    }
    toggleUIConfirmSave() {
        adminAPI.addTenant(this.accountName.value,this.state.selectedProduct.label, this.datasetName.value,this.compCId.value).then(function (tenant) {
            return tenant;
        }).then(data =>  this.props.handleSave(data));
    }
    toggleUIConfirmCancel() {
        this.props.handleCancel();
    }
    
    render() {
        return (
            <div>
                <Modal isOpen={this.props.showAddAccount} toggle={this.toggle} backdrop="static" size="lg">
                    <ModalHeader toggle={this.toggleUIConfirmCancel}>Add Admin Dataset</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={1}></Label>
                                <Label sm={3}>Account</Label>
                                <Col sm={6} style={{ zIndex: 100 }}>
                                <Input type="text" name="accountName" innerRef={(input) => this.accountName = input} onChange={this.handleAcctNameChange} placeholder="Enter Account" />
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
                                        reset
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={1}></Label>
                                <Label sm={3}>Dataset</Label>
                                <Col sm={6} style={{ zIndex: 80 }}>
                                    <Input type="text" name="datasetName" innerRef={(input) => this.datasetName = input} onChange={this.handleDatasetChange}  placeholder="Enter Dataset" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={1}></Label>
                                <Label sm={3}>Company CID</Label>
                                <Col sm={6} style={{ zIndex: 80 }}>
                                    <Input type="text" name="compCId" innerRef={(input) => this.compCId = input}  placeholder="Enter Company CID" />
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" className="btn btn-primary mr-auto" onClick={this.toggleUIConfirmCancel}>Cancel</Button>
                        <Button onClick={() => this.toggleUIConfirmSave()} disabled={this.state.dbtnsave} color="success">Save</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default AddAccount;