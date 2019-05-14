import React from 'react';
import JqxGrid from '../../deps/jqwidgets-react/react_jqxgrid.js';
import {Button, Card, CardHeader, CardBody, Col,Row} from 'reactstrap';
import {deleteTenant}  from './adminAction';
class AdminDatasetsGrid extends React.Component {
    constructor(props) {
        super(props);
        let data = this.props.adminTenants
        let source =
        {
            datatype: "json",
            datafields: [
                { name: 'id', type: 'int' },
                { name: 'acctName', type: 'string' },
                { name: 'prodName', type: 'string' },
                { name: 'dataset', type: 'string' }
            ],
            pagesize: 5,
            localdata: data
        };
        this.state = {
            source: source,
            deleted:false
        };
        this.onAddAdminAccount = this.onAddAdminAccount.bind(this);
    }
    onAddAdminAccount() {
        this.props.openAddAcct();
     }
    render() {
        let dataAdapter = new $.jqx.dataAdapter(this.state.source);
        const removeMe = (id) => {
            console.log(id);
            var selectedrowindex = this.refs.adminAccountGrid.getselectedrowindex();
            console.log('selectedrowindex '+selectedrowindex);
            var rowscount = this.refs.adminAccountGrid.getdatainformation().rowscount;
            console.log('rowscount '+rowscount);
            if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                var id = this.refs.adminAccountGrid.getrowid(selectedrowindex);
                let data = this.refs.adminAccountGrid.getrowdata(id);
                var commit = this.refs.adminAccountGrid.deleterow(id);
                this.props.actions.deleteTenant(data.id).then(response => {
                    return response
                }).catch(error => {
                    throw new SubmissionError(error)
                })
            }
        }
        let columns =
        [
        { text: 'Account', datafield: 'acctName',  cellsalign: 'center', width: 'auto', align: 'center'},
        { text: 'Product', datafield: 'prodName',  cellsalign: 'center', width: 'auto', align: 'center'},
        { text: 'Dataset', datafield: 'dataset',  cellsalign: 'center', width: 'auto', align: 'center'},
        { text: '      ', cellsalign: 'center', width: '65', align: 'center', datafield: 'Delete', columntype: 'button', cellsrenderer: function (ndex, datafield, value, defaultvalue, column, rowdata) {
            return 'Delete';
           }, buttonclick: function (id) {
               removeMe(id);
           }
        },
        ];
        return (
            <Row>
                <Col>
                    <Card>
                        <CardHeader>Manage Admin Dataset</CardHeader>
                        <CardBody>
                        <Button color="secondary" size="sm" className="mb-2" onClick={() => this.onAddAdminAccount()}>Add Admin Dataset</Button>{' '}
                        <JqxGrid ref='adminAccountGrid'
                            width={'100%'} source={dataAdapter} pageable={true} pagermode ={'simple'}
                            sortable={false} altrows={false} enabletooltips={false}
                            autoheight={true} editable={false} columns={columns}
                            filterable={false} showfilterrow={false}
                            selectionmode={'multiplerowsextended'}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}
export default AdminDatasetsGrid;