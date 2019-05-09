import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JqxGrid from '../../deps/jqwidgets-react/react_jqxgrid.js';
import {Alert, Button, Card, CardHeader, CardBody,FormGroup, Label, Col, Form,Input,Container,Row,CustomInput} from 'reactstrap';
import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import {addSSOConfig}  from './ssoConfigsAction';
import {divStylePA} from '../../base/constants/AppConstants';
class SSOConfigComponent extends React.Component {
    constructor(props) {
        super(props);
        let source =
        {
            datatype: "json",
            datafields: [
                { name: 'accountId', type: 'string' },
                { name: 'accountName', type: 'string' },
                { name: 'configId', type: 'string' },
                { name: 'configName', type: 'string' }
            ],
            pagesize: 10,
            localdata:this.props.ssoconfigsdata
        };
        this.state = {
            source: source
        };
    }
    renderSSOConfigUI(ssoconfigsdata){
        if(ssoconfigsdata){
            const removeMe = (id) => {
                console.log(id);
            }
            let dataAdapter = new $.jqx.dataAdapter(this.state.source);
            let columns =
            [
            { text: 'Account', datafield: 'accountName',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Config', datafield: 'configName',  cellsalign: 'center', width: 'auto', align: 'center'},
            { text: 'Modify', cellsalign: 'center', align: 'center', cellsrenderer: function (ndex, datafield, value, defaultvalue, column, rowdata) {
                return `<a href="#" title="${'Modify'}"><div style="text-align:center;" class="align-self-center align-middle"><button type="button" style="padding-top:0.1rem;cursor: pointer;" class="btn btn-link align-self-center" onClick={onUnLinkConfig('${ndex}')}>${'Modify'}</button></div></a>`;}
            },
            { text: 'Delete', cellsalign: 'center', align: 'center', cellsrenderer: function (ndex, datafield, value, defaultvalue, column, rowdata) {
                return `<a href="#" title="${'Delete Me'}"><div style="text-align:center;" class="align-self-center align-middle"><button type="button" style="padding-top:0.1rem;cursor: pointer;" class="btn btn-link align-self-center" onClick={onUnLinkConfig('${ndex}')}>${'Delete Me'}</button></div></a>`;}
            },
            { text: 'Test Config', cellsalign: 'center', align: 'center', cellsrenderer: function (ndex, datafield, value, defaultvalue, column, rowdata) {
                return `<a href="#" title="${'Test Config '+rowdata.configName}"><div style="text-align:center;" class="align-self-center align-middle"><button type="button" style="padding-top:0.1rem;cursor: pointer;" class="btn btn-link align-self-center" onClick={onUnLinkConfig('${ndex}')}>${'Test Config '+rowdata.configName}</button></div></a>`;}
            },
            ];
            return(
                <div class="row h-100 justify-content-center align-items-center">
                    <Container>
                        <Row>
                            <Col className="p-3"><h3 class="text-bsi">Manage Config</h3></Col>
                        </Row>
                        <Row>
                        <Col>
                        <JqxGrid ref='manageConfigsGrid'
                            width={'100%'} source={dataAdapter} pageable={true} pagermode ={'simple'}
                            sortable={false} altrows={false} enabletooltips={false}
                            autoheight={true} editable={false} columns={columns}
                            filterable={false} showfilterrow={false}
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
        return (<div>{this.renderSSOConfigUI(this.props.ssoconfigsdata)}</div>);
    }
};
function mapStateToProps(state) {
    return {
        ssoconfigsdata: state.ssoconfigsdata.ssoconfigs
    }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({addSSOConfig}, dispatch) }
 }
export default connect(mapStateToProps,mapDispatchToProps, null, { withRef: true })(SSOConfigComponent);