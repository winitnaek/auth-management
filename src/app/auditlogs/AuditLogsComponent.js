import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JqxGrid from '../../deps/jqwidgets-react/react_jqxgrid.js';
import JqxDateTimeInput from '../../deps/jqwidgets-react/react_jqxdatetimeinput.js';
import {Alert, Button, Card, CardHeader, CardBody,FormGroup, Label, Col, Form,Input,Container,Row,CustomInput} from 'reactstrap';
import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import {addAuditLog}  from './auditLogsAction';
import {divStylePA} from '../../base/constants/AppConstants';
class AuditLogsComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    renderAuditLogsUI(admindata){
        if(!admindata){
            const removeMe = (id) => {
                console.log(id);
            }
            return(
                <div class="row h-100 justify-content-center align-items-center">
                    <Container>
                        <Row>
                            <Col className="p-3"><h3 class="text-bsi">Audit Logs</h3></Col>
                        </Row>
                    </Container>
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
        return (<div>{this.renderAuditLogsUI(this.props.accountsdata)}</div>);
    }
};
function mapStateToProps(state) {
    return {
        accountsdata: state.accountsdata
    }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({addAuditLog}, dispatch) }
 }
export default connect(mapStateToProps,mapDispatchToProps, null, { withRef: true })(AuditLogsComponent);