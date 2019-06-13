import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input,CustomInput,FormFeedback} from 'reactstrap';
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
            modeisnew:modeisnew,
            disablesavecfg:false,
            dsplNamestate:false,
            selectreqstate:'',
            selectfeestate:'',
            selectrequired:'selectrequired',
            selectfeedback:'selectfeedback',
            idpIssuerstate:false,
            idpReqURLstate:false,
            spIssuerstate:false,
            certTextstate:false,
            certPasswordstate:false,
            certAliasstate:false,
            appRedirectURLstate:false,
            certErrorLable:''
        };
        this.toggleUIConfirmSave  = this.toggleUIConfirmSave.bind(this);
        this.toggleUIConfirmCancel= this.toggleUIConfirmCancel.bind(this);
        this.handleAccountChange  = this.handleAccountChange.bind(this);
        this.handleProductChange  = this.handleProductChange.bind(this);
        this.validateSSOConfig    = this.validateSSOConfig.bind(this);
        this.dsplNameChange       = this.dsplNameChange.bind(this);
        this.idpIssuerChange      = this.idpIssuerChange.bind(this);
        this.certTextChanged      = this.certTextChanged.bind(this);
        this.certAliasChanged     = this.certAliasChanged.bind(this);
        this.validateCert         = this.validateCert.bind(this);
        this.validateRespSignatureChanged=this.validateRespSignatureChanged.bind(this);
        
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
            const {enabled, dsplName, idpIssuer, validateRespSignature, allowLogout,expireRequestSecs,certAlias,certText} = this.state.rowdata;
            this.dsplName.value=dsplName;
            this.idpIssuer.value=idpIssuer;
            this.allowLogout.checked =allowLogout;
            this.validateRespSignature.checked= validateRespSignature;
            this.certAlias.value=certAlias;
            this.certText.value=certText;
            if(validateRespSignature){
                this.certText.disabled=false;
                this.certAlias.disabled=false;
            }else{
                this.certText.disabled=true;
                this.certAlias.disabled=true;
            }
            this.expireRequestSecs.value= expireRequestSecs;
            this.enabled.checked =enabled;
        }else{
            this.certText.disabled=true;
            this.certAlias.disabled=true;
        }
    } 
    toggleUIConfirmSave() {
        if(this.validateSSOConfig()){
            if(this.state.modeisnew){
                //Currently all the fields are required.
                let ssoConfigProps = {  
                    "id":1,//Service needs to be update to handle null id. DTO should not need not null id
                    "acctName": this.state.selectedAccount.label,
                    "dsplName": this.dsplName.value,
                    "idpIssuer":this.idpIssuer.value,
                    "validateRespSignature":this.validateRespSignature.checked,
                    "allowLogout":this.allowLogout.checked,
                    "certAlias":this.certAlias.value,
                    "certText":this.certText.value,
                    "expireRequestSecs":this.expireRequestSecs.value,
                    "enabled": this.enabled.checked 
                }
                console.log('ssoConfigProps - save');
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
                    "validateRespSignature":this.validateRespSignature.checked,
                    "allowLogout":this.allowLogout.checked,
                    "certAlias":this.certAlias.value,
                    "certText":this.certText.value,
                    "expireRequestSecs":this.expireRequestSecs.value,
                    "enabled": this.enabled.checked 
                }
                console.log('ssoConfigProps - update');
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
    }
    validateSSOConfig(){
        let isValidConfig = true;
        var selectedAcct = this.state.selectedAccount;
        console.log('selectedAcct');
        console.log(selectedAcct);
        if(!selectedAcct){
            this.setState({selectreqstate:this.state.selectrequired,selectfeestate:this.state.selectfeedback});
            return isValidConfig = false;
        }else{
            this.setState({selectreqstate:'',selectfeestate:''});
            isValidConfig = true;
        }
        if(!this.dsplName.value){
            this.setState({dsplNamestate:true});
            return isValidConfig = false;
        }else{
            this.setState({dsplNamestate:false});
            isValidConfig = true;
        }
        if(!this.idpIssuer.value){
            this.setState({idpIssuerstate:true});
            return isValidConfig = false;
        }else{
            this.setState({idpIssuerstate:false});
            isValidConfig = true;
        }
        if(this.validateRespSignature.checked && !this.certAlias.value){
            this.setState({certAliasstate:true});
            return isValidConfig = false;
        }else{
            this.setState({certAliasstate:false});
            isValidConfig = true;
        }
        if(this.validateRespSignature.checked && !this.certText.value){
            this.setState({certTextstate:true,certErrorLable:'Required'});
            return isValidConfig = false;
        }else{
            if(this.validateRespSignature.checked && !this.validateCert()){
                this.setState({certTextstate:true,certErrorLable:'Invalid Certificate'});
                console.log('Entered certificate PEM Text is invalid. >> Please provide valid certificate.');
                return isValidConfig = false;
            }else{
                this.setState({certTextstate:false});
                isValidConfig = true;
            }
        }
        console.log('isValidConfig');
        console.log(isValidConfig);
        return isValidConfig;
    }
    validateCert(){
        var iscertvalid = false;
        let pki = require('node-forge').pki;
        try {
            let caCert = this.certText.value;
            let cert = pki.certificateFromPem(caCert);
            var isvalid = cert.verify(cert);
            console.log('isvalid cert ==>')
            console.log(isvalid);
            iscertvalid =isvalid;
            if(iscertvalid){
                let isval = false;
                var n   = caCert.lastIndexOf("=");
                var res = caCert.charAt((n+2));
                if(n !=-1 && res==='-'){
                    isval = true;
                }else{
                    isval = false;
                }
                iscertvalid = isval;
            }
        } catch (e) {
           console.log(e);
           console.log('Unable to validate Entered certificate PEM Text. >>');
           return false;
        }
        return iscertvalid;
    }
    dsplNameChange(e){
        this.validateSSOConfig();
    }
    handleAccountChange(selectedAccount){
        this.setState({ selectedAccount});
        let account = `${selectedAccount.value}`;
        if(account){
            this.setState({selectreqstate:'',selectfeestate:''});
        }
    } 
    idpIssuerChange(e){
        this.validateSSOConfig();
    }
    validateRespSignatureChanged(){
        if(this.validateRespSignature.checked){
            this.certText.disabled=false;
            this.certAlias.disabled=false;
        }else{
            this.certText.disabled=true;
            this.certAlias.disabled=true;
        }
    }
    certTextChanged(e){
        this.validateSSOConfig();
    }
    certPasswordChanged(e){
        this.validateSSOConfig();
    }
    certAliasChanged(e){
        this.validateSSOConfig();
    }
    toggleUIConfirmCancel() {
        this.props.handleCancel();
    }
    render() {
        const {enabled, validateRespSignature, validateIdpIssuer, allowLogout,redirectToApplication} = this.state.rowdata;
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
                                        isSearchable={true}
                                        isClearable={true}
                                        isMulti={false}
                                        options={this.state.accounts}
                                        isLoading={this.state.isCompLoading}
                                       className={this.state.selectreqstate}
                                    />
                                 {this.state.selectfeestate.length > 10 ? (<div className={this.state.selectfeestate}>Required</div>):null}
                                </Col>
                                <Label sm={1}>Config Name</Label>
                                <Col sm={4} style={{ zIndex: 100 }}>
                                <Input type="text" invalid={this.state.dsplNamestate} onChange={this.dsplNameChange} id="dsplNamex" name="dsplNamex" innerRef={(input) => this.dsplName = input}  placeholder="Enter Config Name" />
                                <FormFeedback invalid={this.state.dsplNamestate}>Required</FormFeedback>
                                 </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>Issuer</Label>
                                <Col sm={4}>
                                    <Input type="text"  invalid={this.state.idpIssuerstate} onChange={this.idpIssuerChange} name="idpIssuer" innerRef={(input) => this.idpIssuer = input}  placeholder="Enter Issuer" />
                                    <FormFeedback invalid={this.state.idpIssuerstate}>Required</FormFeedback>
                                </Col>
                                <Label sm={1}></Label>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.allowLogout = input} onChange={this.allowLogoutChanged} defaultChecked={allowLogout} name="allowLogout" id="allowLogout" label="Allow Logout"/>
                                </Col>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.validateRespSignature = input} onChange={this.validateRespSignatureChanged} defaultChecked={validateRespSignature} id="validateRespSignature" name="validateRespSignature" label="Validate Signature"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>Certificate Alias</Label>
                                <Col sm={4}>
                                    <Input type="text" name="certAlias" invalid={this.state.certAliasstate} onChange={this.certAliasChanged}  innerRef={(input) => this.certAlias = input} placeholder="Enter Certificate Alias" />
                                    <FormFeedback invalid={this.state.certAliasstate}>Required</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>Certificate (PEM)</Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="certText" invalid={this.state.certTextinvalid} invalid={this.state.certTextstate}  onChange={this.certTextChanged}    innerRef={(input) => this.certText = input} placeholder="Enter Certificate (PEM)" />
                                    <FormFeedback invalid={this.state.certTextstate}>{this.state.certErrorLable}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:8}}>
                                <Label sm={1}></Label>
                                <Label sm={1}>Expiration (sec)</Label>
                                <Col sm={4}>
                                    <Input type="number" name="expireRequestSecs"  innerRef={(input) => this.expireRequestSecs = input}  min={10} max={60}  defaultValue={25}  placeholder="Enter expireRequestSecs" />
                                </Col>
                                <Label sm={1}></Label>
                                <Col sm={2}>
                                <CustomInput type="switch" innerRef={(input) => this.enabled = input}  id="enabled" onChange={this.enabledChanged} defaultChecked={enabled} name="enabled" label="Enable Configuration"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" className="btn btn-primary mr-auto" onClick={this.toggleUIConfirmCancel}>Cancel</Button>
                        <Button disabled={this.state.disablesavecfg} onClick={() => this.toggleUIConfirmSave()} color="success">Save</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default AddSSOConfig;