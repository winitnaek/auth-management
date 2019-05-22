import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JqxGrid from '../../deps/jqwidgets-react/react_jqxgrid.js';
import {Alert, Button, Card, CardHeader, CardBody,FormGroup, Label, Col, Form,Input,Container,Row,CustomInput} from 'reactstrap';
import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import {addAuditLog}  from './auditLogsAction';
import {divStylePA} from '../../base/constants/AppConstants';
class AuditLogsComponent extends React.Component {
    constructor(props) {
        super(props);
        let source =
        {
            datatype: "json",
            datafields: [
                { name: 'createdDate', type: 'date' },
                { name: 'serverHost', type: 'string' },
                { name: 'user', type: 'string' },
                { name: 'clientHost', type: 'string' },
                { name: 'operation', type: 'string' },
                { name: 'accountId', type: 'string' },
                { name: 'account', type: 'string' },
                { name: 'product', type: 'string' },
                { name: 'dataset', type: 'string' },
                { name: 'entity', type: 'string' },
                { name: 'message', type: 'string' }
            ],
            pagesize: 10,
            localdata:this.props.auditlogsdata
        };
        this.state = {
            source: source
        };
    }
    renderAuditLogsUI(auditlogsdata){
        if(auditlogsdata){
            const removeMe = (id) => {
                console.log(id);
            }
            let dataAdapter = new $.jqx.dataAdapter(this.state.source);
            let columns =
            [
            { text: 'Timestamp', datafield: 'createdDate', cellsformat: 'yyyy-MM-dd hh:mm:ss', cellsalign: 'center', width: '20%', align: 'center',filtertype: 'range'},
            { text: 'Account', datafield: 'account',  cellsalign: 'center', width: '6%', align: 'center'},
            { text: 'Product', datafield: 'product',  cellsalign: 'center', width: '5%', align: 'center'},
            { text: 'Dataset', datafield: 'dataset',  cellsalign: 'center', width: '15%', align: 'center'},
            { text: 'Message', datafield: 'message',  cellsalign: 'center', width: 'auto', align: 'center'},
            ];
            return(
                <div class="row h-100 justify-content-center align-items-center">
                    <Container>
                        <Row>
                            <Col className="p-3"><h3 class="text-bsi">Audit Logs</h3></Col>
                        </Row>
                        <Row>
                        <Col>
                        <JqxGrid ref='auditLogsGrid'
                            width={'100%'} source={dataAdapter} pageable={true} pagermode ={'simple'}
                            sortable={false} altrows={false} enabletooltips={false}
                            autoheight={true} editable={false} columns={columns}
                            filterable={true} showfilterrow={true} columnsresize ={true}
                            selectionmode={'multiplerowsextended'}/>
                        </Col>
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
        return (<div>{this.renderAuditLogsUI(this.props.auditlogsdata)}</div>);
    }
};
function mapStateToProps(state) {
    return {
        auditlogsdata: state.auditlogsdata
    }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({addAuditLog}, dispatch) }
 }
export default connect(mapStateToProps,mapDispatchToProps, null, { withRef: true })(AuditLogsComponent);