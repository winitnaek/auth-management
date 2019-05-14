import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input} from 'reactstrap';
import Select from 'react-select';
class LinkConfigToTenant extends React.Component {
    constructor(props) {
        super(props);
        let accounts =[];
       
        let tenentconfigs =[];

        this.props.ssoconfigs.forEach(function (item) {
            tenentconfigs.push({'value':item.id,'label':item.dsplName});
        })
        this.state = {
            showLinkTenantToConfig: this.props.showLinkTenantToConfig,
            accounts:accounts,
            tenentconfigs:tenentconfigs,
            selectedAccount:'',
            selectedConfig:'',
            linkrow:this.props.linkrow
        };
        this.toggleUIConfirmOk = this.toggleUIConfirmOk.bind(this);
        this.toggleUIConfirmCancel = this.toggleUIConfirmCancel.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handleConfigChange = this.handleConfigChange.bind(this);
    }
    handleAccountChange(selectedAccount){
        console.log('selectedAccount');
        console.log(selectedAccount);
        this.setState({ selectedAccount});
        let account = `${selectedAccount.value}`;
        console.log('account');
        console.log(account);
    }
    handleConfigChange(selectedConfig){
        console.log('selectedConfig');
        console.log(selectedConfig);
        this.setState({ selectedConfig});
        let tenentconfig = `${selectedConfig.value}`;
        console.log('tenentconfig');
        console.log(tenentconfig);
    }
    toggleUIConfirmOk(selectedConfig) {
        this.props.handleSave(selectedConfig);
    }
    toggleUIConfirmCancel() {
        this.props.handleCancel();
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.props.showLinkTenantToConfig} toggle={this.toggle} backdrop="static" size="lg">
                    <ModalHeader toggle={this.toggleUIConfirmCancel}>Link Config To Tenant</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={1}></Label>
                                <Label sm={3}>Selected Account</Label>
                                <Col sm={6}>
                                <Label sm={3} style={{paddingLeft:0}}>{this.state.linkrow.acctName}</Label>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={1}></Label>
                                <Label sm={3}>Tenant Config</Label>
                                <Col sm={6} style={{ zIndex: 90 }}>
                                    <Select
                                        name="selProduct"
                                        value={this.state.selectedConfig}
                                        onChange={this.handleConfigChange}
                                        isSearchable={false}
                                        isClearable={false}
                                        isMulti={false}
                                        options={this.state.tenentconfigs}
                                        isLoading={this.state.isProductLoading}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" className="btn btn-primary mr-auto" onClick={this.toggleUIConfirmCancel}>Cancel</Button>
                        <Button onClick={() => this.toggleUIConfirmOk(this.state.selectedConfig)} color="success">Save</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default LinkConfigToTenant;