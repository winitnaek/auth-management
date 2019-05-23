import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input,CustomInput} from 'reactstrap';
import Select from 'react-select';
class AddSSOConfig extends React.Component {
    constructor(props) {
        super(props);

        let allaccounts =this.props.accounts;
        let accounts =[];
        allaccounts.forEach(function (account) {
            accounts.push({'value':account.id,'label':account.acctName});
        });
        let rowdata = this.props.rowdata;
        let modeisnew = this.props.modenew; 
        let selectedAccount = '';

        if(modeisnew){
            rowdata = {}
        }else{
            accounts.forEach(function (acct) {
                if(acct.label==rowdata.acctName){
                    selectedAccount = {"value":acct.value,"label":acct.label};
                }
            });
        }
        
        this.state = {
            showAddAccount: this.props.showAddAccount,
            accounts:accounts,
            selectedAccount:selectedAccount,
            rowdata:rowdata,
            modeisnew:modeisnew
        };
        this.toggleUIConfirmSave = this.toggleUIConfirmSave.bind(this);
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
    componentDidMount(){
        if(!this.state.modeisnew){
            const {appRedirectURL,nonSamlLogoutURL, enabled, dsplName, idpIssuer, idpReqURL, spConsumerURL, spIssuer, attribIndex, validateRespSignature, validateIdpIssuer, signRequests, allowLogout,redirectToApplication,expireRequestSecs,certAlias,certPassword,certText} = this.state.rowdata;
            this.dsplName.value=dsplName;
            this.idpIssuer.value=idpIssuer;
            this.idpReqURL.value = idpReqURL;
            this.spConsumerURL.value= spConsumerURL;
            this.spIssuer.value= spIssuer;
            this.attribIndex.value= attribIndex;
            this.validateRespSignature.checked= validateRespSignature;
            this.validateIdpIssuer.checked= validateIdpIssuer;
            this.signRequests.checked =signRequests;
            this.allowLogout.checked =allowLogout;
            this.redirectToApplication.checked =redirectToApplication;
            this.nonSamlLogoutURL.value=nonSamlLogoutURL;
            this.appRedirectURL.value=appRedirectURL;
            this.certAlias.value=certAlias;
            this.certPassword.value=certPassword;
            this.certText.value=certText;
            this.expireRequestSecs.value= expireRequestSecs;
            this.enabled.checked =enabled;
        }
    } 
    toggleUIConfirmSave() {
        if(this.state.modeisnew){
            //Currently all the fields are required.
            let ssoConfigProps = {  
                "id":1,//Service needs to be update to handle null id. DTO should not need not null id
                "acctName": this.state.selectedAccount.label,
                "dsplName": this.dsplName.value,
                "idpIssuer":this.idpIssuer.value,
                "idpReqURL":this.idpReqURL.value,
                "spConsumerURL":this.spConsumerURL.value,
                "spIssuer":this.spIssuer.value,
                "attribIndex":this.attribIndex.value,
                "validateRespSignature":this.validateRespSignature.checked,
                "validateIdpIssuer":this.validateIdpIssuer.checked,
                "signRequests":this.signRequests.checked,
                "allowLogout":this.allowLogout.checked,
                "redirectToApplication":this.redirectToApplication.checked,
                "nonSamlLogoutURL":this.nonSamlLogoutURL.value,
                "appRedirectURL": this.appRedirectURL.value,
                "certAlias":this.certAlias.value,
                "certPassword":this.certPassword.value,
                "certText":this.certText.value,
                "expireRequestSecs":this.expireRequestSecs.value,
                "enabled": this.enabled.checked 
             }
            console.log('ssoConfigProps');
            console.log(ssoConfigProps);
            this.props.actions.addSSOConfig(ssoConfigProps).then(response => {
                this.props.handleSave();
                return response
            }).catch(error => {
                console.log('Error Occured In Sync onAddSSOConfig.');
                console.log(error);
            });
        }else{
            let ssoConfigProps = {  
                "id":this.state.rowdata.id,
                "acctName": this.state.selectedAccount.label,
                "dsplName": this.dsplName.value,
                "idpIssuer":this.idpIssuer.value,
                "idpReqURL":this.idpReqURL.value,
                "spConsumerURL":this.spConsumerURL.value,
                "spIssuer":this.spIssuer.value,
                "attribIndex":this.attribIndex.value,
                "validateRespSignature":this.validateRespSignature.checked,
                "validateIdpIssuer":this.validateIdpIssuer.checked,
                "signRequests":this.signRequests.checked,
                "allowLogout":this.allowLogout.checked,
                "redirectToApplication":this.redirectToApplication.checked,
                "nonSamlLogoutURL":this.nonSamlLogoutURL.value,
                "appRedirectURL": this.appRedirectURL.value,
                "certAlias":this.certAlias.value,
                "certPassword":this.certPassword.value,
                "certText":this.certText.value,
                "expireRequestSecs":this.expireRequestSecs.value,
                "enabled": this.enabled.checked 
             }
            console.log('ssoConfigProps');
            console.log(ssoConfigProps);
            this.props.actions.updateSSOConfig(ssoConfigProps).then(response => {
                this.props.handleSave(response);
                return response
            }).catch(error => {
                console.log('Error Occured In Sync onAddSSOConfig.');
                console.log(error);
            });
        }
        
    }
    toggleUIConfirmCancel() {
        this.props.handleCancel();
    }
    render() {
        const {enabled, validateRespSignature, validateIdpIssuer, signRequests, allowLogout,redirectToApplication} = this.state.rowdata;

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
                                <Input type="text" id="dsplNamex" name="dsplNamex" innerRef={(input) => this.dsplName = input}  placeholder="Enter Config Name" />
                                 </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>idpIssuer</Label>
                                <Col sm={4}>
                                    <Input type="text" name="idpIssuer" innerRef={(input) => this.idpIssuer = input}  placeholder="Enter idpIssuer" />
                                </Col>
                                <Label sm={1}>idpReqURL</Label>
                                <Col sm={4}>
                                    <Input type="text" name="idpReqURL" innerRef={(input) => this.idpReqURL = input}  id="idpReqURL" placeholder="Enter idpReqURL" />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>spConsumerURL</Label>
                                <Col sm={4}>
                                    <Input type="text" name="spConsumerURL" innerRef={(input) => this.spConsumerURL = input} placeholder="Enter spConsumerURL" />
                                </Col>
                                <Label sm={1}>spIssuer</Label>
                                <Col sm={4}>
                                    <Input type="text" name="spIssuer" id="spIssuer" innerRef={(input) => this.spIssuer = input} placeholder="Enter spIssuer" />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>attribIndex</Label>
                                <Col sm={4}>
                                    <Input type="number" name="attribIndex"  innerRef={(input) => this.attribIndex = input}  placeholder="Enter attribIndex" />
                                </Col>
                                <Label sm={1}></Label>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.validateRespSignature = input} onChange={this.validateRespSignatureChanged} defaultChecked={validateRespSignature} id="validateRespSignature" name="validateRespSignature" label="validateRespSignature"/>
                                </Col>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.validateIdpIssuer = input} onChange={this.validateIdpIssuerChanged} defaultChecked={validateIdpIssuer} id="validateIdpIssuer" name="validateIdpIssuer" label="validateIdpIssuer"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}></Label>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.signRequests = input} onChange={this.signRequestsChanged} defaultChecked={signRequests} name="signRequests" id="signRequests" label="signRequests"/>
                                </Col>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.allowLogout = input} onChange={this.allowLogoutChanged} defaultChecked={allowLogout} name="allowLogout" id="allowLogout" label="allowLogout"/>
                                </Col>
                                <Label sm={1}></Label>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.redirectToApplication = input} onChange={this.redirectToApplicationChanged} defaultChecked={redirectToApplication} name="redirectToApplication" id="redirectToApplication" label="redirectToApplication"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>nonSamlLogoutURL</Label>
                                <Col sm={4}>
                                    <Input type="text" name="nonSamlLogoutURL" innerRef={(input) => this.nonSamlLogoutURL = input} placeholder="Enter nonSamlLogoutURL" />
                                </Col>
                                <Label sm={1}>appRedirectURL</Label>
                                <Col sm={4}>
                                    <Input type="text" name="appRedirectURL"  innerRef={(input) => this.appRedirectURL = input} placeholder="Enter appRedirectURL" />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>certAlias</Label>
                                <Col sm={4}>
                                    <Input type="text" name="certAlias"  innerRef={(input) => this.certAlias = input} placeholder="Enter certAlias" />
                                </Col>
                                <Label sm={1}>certPassword</Label>
                                <Col sm={4}>
                                    <Input type="text" name="certPassword" innerRef={(input) => this.certPassword = input} placeholder="Enter certPassword" />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>certText</Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="certText" innerRef={(input) => this.certText = input} placeholder="Enter certText" />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>expireRequestSecs</Label>
                                <Col sm={4}>
                                    <Input type="number" name="expireRequestSecs"  innerRef={(input) => this.expireRequestSecs = input}  min={10} max={60}  placeholder="Enter expireRequestSecs" />
                                </Col>
                                <Label sm={1}></Label>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.enabled = input}  id="enabled" onChange={this.enabledChanged} defaultChecked={enabled} name="enabled" label="enable Configuration"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" className="btn btn-primary mr-auto" onClick={this.toggleUIConfirmCancel}>Cancel</Button>
                        <Button onClick={() => this.toggleUIConfirmSave()} color="success">Save</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default AddSSOConfig;