import React from 'react';
import ReactDOM from 'react-dom';
import { Alert,Tooltip} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JqxGrid from '../../deps/jqwidgets-react/react_jqxgrid.js';
import JqxButton from '../../deps/jqwidgets-react/react_jqxbuttons.js';
import JqxButtonGroup from '../../deps/jqwidgets-react/react_jqxbuttongroup.js';
import { RN_FILTER_PAYROLL_DATA } from '../../base/constants/RenderNames';
import {
    divStyle,
    divStyleFirst,
    divStyleBot,
    divStyleFirstBot,
    divStyleR,
    OUTPUT_CLIENT_SUM,
    OUTPUT_CLIENT_DTL
} from '../../base/constants/AppConstants';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UIAlert from '../common/UIAlert';
import UIConfirm from '../common/UIConfirm';
import ViewPDF from '../common/ViewPDF';
import ViewCompanyAuditFiles from '../comp_outputs/ViewCompanyAuditFiles';

const viewer_path ='/pdfjs/web/viewer.html?file=';
const viewer_url  = window.location.protocol+'//'+window.location.host+viewer_path;
const dataset = 'test';
class EEW2Records extends React.Component {
    constructor(props) {
        super(props);
        let data = this.props.eew2data
        let source =
            {
                datatype: "json",
                datafields: [
                    { name: 'tranName', type: 'string' },
                    { name: 'tranFein', type: 'int' },
                    { name: 'compName', type: 'string' },
                    { name: 'compFein', type: 'int' },
                    { name: 'empId', type: 'string' },
                    { name: 'empFname', type: 'string' },
                    { name: 'empLname', type: 'string' },
                    { name: 'reportId', type: 'string' },
                    { name: 'isPublished', type: 'boolean' },
                    { name: 'isPrinted', type: 'boolean' },
                    { name: 'requestno', type: 'int' },
                    { name: 'generatedDateTime', type: 'date' }
                ],
                localdata: data

            };
            this.toggleSuccess = this.toggleSuccess.bind(this);
            this.toggleExpExl=this.toggleExpExl.bind(this);
            this.toggleExpCsv=this.toggleExpCsv.bind(this);
            this.toggleSelAll=this.toggleSelAll.bind(this);
            this.toggleRstAll=this.toggleRstAll.bind(this);
            this.togglePstSel=this.togglePstSel.bind(this);
            this.togglePubW2Sel=this.togglePubW2Sel.bind(this);
            this.toggleUnPubW2Sel=this.toggleUnPubW2Sel.bind(this);
            this.togglePrintW2s=this.togglePrintW2s.bind(this);
            this.toggleDelSel=this.toggleDelSel.bind(this);
            this.toggleFilDat=this.toggleFilDat.bind(this);
            this.hoverOff=this.hoverOff.bind(this);
            this.hoverOn=this.hoverOn.bind(this);
            this.hideUIAlert=this.hideUIAlert.bind(this);
            this.handleConfirmOk = this.handleConfirmOk.bind(this);
            this.handleConfirmCancel = this.handleConfirmCancel.bind(this);
            this.handleHidePDF = this.handleHidePDF.bind(this);
            this.handleShowPDF = this.handleShowPDF.bind(this);
            this.handleHideAuditPDF = this.handleHideAuditPDF.bind(this);
            this.handleShowAuditPDF = this.handleShowAuditPDF.bind(this);
        this.state = {
            source: source,
            exptoExlTip:false,
            exptoCsvTip:false,
            selectAll:false,
            resetAll:false,
            generateOutput:false,
            publishW2:false,
            unpublishW2:false,
            printW2s:false,
            deleSelected:false,
            filterData:false,
            hover: false,
            showAlert:false,
            aheader:'',
            abody:'',
            abtnlbl:'',
            showConfirm:false,
            cheader:'',
            cbody:'',
            showPDF: false,
            title:'',
            outputSuccess: false,
            showAudits: false,
            audits: {
                showClientKitSumPdf: false,
                showClientKitDetPdf: false
            }
        };
    }
    hoverOn(){
        this.setState({ hover: true });
    }
    hoverOff(){ 
        this.setState({ hover: false });    
    }
    goToFilterPage() {
        renderW2AdmApplication(appAnchor(), RN_FILTER_PAYROLL_DATA);
    }
    exportToExcel(){
        this.refs.eew2Grid.exportdata('xls', 'EEW2Records');
    }
    exportToCsv(){
        this.refs.eew2Grid.exportdata('csv', 'EEW2Records');
    }
    selectAllClk(){
        this.refs.eew2Grid.selectallrows(); 
    }
    resetAll(){
        this.refs.eew2Grid.clearselection();
    }
    unpublishW2(){
        alert('unpublishW2');
     }
    publishW2(){
       alert('publishW2');
    }
    printW2s(){
        alert('printW2s');
    }
    toggleSuccess(){
        this.setState({
            outputSuccess: !this.state.outputSuccess
        });
    }
    generateOutput(){
        let selIndexes = this.refs.eew2Grid.getselectedrowindexes();
        if(selIndexes.length >0){
            var eew2recordInput ={  
                "dataset":"00_EE_W2_DATA",
                "isCorrection":false,
                "w2RequestInputs":[  
                   {  
                      "transmitterid":"123456789",
                      "companyId":"123456789",
                      "empid":"123456789",
                      "allRecs":true,
                      "requestno":0
                   }
                ]
             }

            selIndexes.forEach(index => {
                let data = this.refs.eew2Grid.getrowdata(index);
                //alert('Selected for Post : '+ Object.values(data));
            });
            this.props.actions.generateOutputs(eew2recordInput).then(response => {
                this.state.source.localdata=this.props.eew2data.eew2ecords;
                this.refs.eew2Grid.updatebounddata('data');
                this.refs.eew2Grid.sortby('requestno', 'desc');
                this.toggleSuccess();
                this.interval = setInterval(this.tick.bind(this), 3000);
                return response
            }).catch(error => {
                throw new SubmissionError(error)
            })
        }else{
            this.showAlert(true,'Post','Please select at least one employee record to generate output.');
        }
    }
    tick(){
        clearInterval(this.interval);
        this.toggleSuccess();
    }
    
    deleteSelected(){
        let selIndexes = this.refs.eew2Grid.getselectedrowindexes();
        if(selIndexes.length >0){
            this.showConfirm(true,'Confirm?', 'Are you sure you want to delete payroll record(s)?');
        }else{
            this.showAlert(true,'Delete','Please select at least one payroll record to delete.');
        }
    }
    showConfirm(cshow, cheader, cbody){
        this.setState({
            showConfirm: cshow,
            cheader:cheader,
            cbody:cbody
        });
    }
    showAlert(ashow,aheader,abody){
        this.setState({
            showAlert: ashow,
            aheader:aheader,
            abody:abody
        });
    }
    toggleExpExl() {
        this.setState({
            exptoExlTip: !this.state.exptoExlTip
        });
    }
    toggleExpCsv() {
        this.setState({
            exptoCsvTip: !this.state.exptoCsvTip
        });
    }
    toggleSelAll(){
        this.setState({
            selectAll: !this.state.selectAll
        });
    }
    toggleRstAll(){
        this.setState({
            resetAll: !this.state.resetAll
        });
    }
    togglePstSel(){
        this.setState({
            generateOutput: !this.state.generateOutput
        });
    }
    toggleUnPubW2Sel(){
        this.setState({
            unpublishW2: !this.state.unpublishW2
        });
    }
    togglePrintW2s(){
        this.setState({
            printW2s: !this.state.printW2s
        });
    }
    togglePubW2Sel(){
        this.setState({
            publishW2: !this.state.publishW2
        });
    }
    toggleDelSel(){
        this.setState({
            deleSelected: !this.state.deleSelected
        });
    }
    toggleFilDat(){
        this.setState({
            filterData: !this.state.filterData
        }); 
    }
    componentDidMount() {

    }
    hideUIAlert(){
        this.setState({
            showAlert: !this.state.showAlert
        });
    }
    handleConfirmOk(){
        console.log('hideUIConfirmOk');
        this.handleConfirmCancel();
        let selIndexes = this.refs.eew2Grid.getselectedrowindexes();
        if(selIndexes.length >0){
            selIndexes.forEach(index => {
                let data = this.refs.eew2Grid.getrowdata(index);
                alert('Selected for Delete : '+ Object.values(data));
            });
        }
    }
    handleConfirmCancel(){
        console.log('hideUIConfirmCancel');
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    }
    componentWillMount(){
        
    }
    handleHidePDF() {
        this.setState({ showPDF: false })
    }
    handleShowPDF(rowdata) {
        let eew2pdf ='JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
        'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
        'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
        'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
        'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
        'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
        'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
        'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
        'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
        'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
        'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
        'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
        'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';
        this.setState({
            showPDF: true,
            title: rowdata.empFname+' '+rowdata.empLname+ ' W2 PDF'
        })
        //this.renderPDFData(eew2pdf);
        
        //let reqNo=rowdata.requestno;
        //let fein =rowdata.compFein;
        //let empId=rowdata.empId;
        let reqNo=123;
        let fein =123456789;
        let empId=222333444;

        this.props.actions.getEEW2Pdf(dataset, reqNo, fein, empId).then((eew2pdf) => {
            if(this.props.eew2data.eew2pdf.docData){
                this.renderPDFData(this.props.eew2data.eew2pdf);
            }else if(this.props.yetaxDoc.type =='AppError'){
                this.renderErrorPDF(this.props.eew2data.eew2pdf);
            }
        });
    }
    handleShowAuditPDF(rowdata, title, pdfType) {
        let isSumPdf = (OUTPUT_CLIENT_SUM === pdfType);
        let isDetPdf = (OUTPUT_CLIENT_DTL === pdfType);
        this.setState({
            title: (!title ? `Showing Viewable/Downloadable Artifacts for ${rowdata.compName}` : title),
            audits: {
                showClientKitSumPdf: isSumPdf,
                showClientKitDetPdf: isDetPdf
            },
            showAudits: isSumPdf || isDetPdf
        });
    }
    handleHideAuditPDF() {
        this.setState({
            audits: {
                showClientKitSumPdf: false,
                showClientKitDetPdf: false
            },
            showAudits: false
        });
    }
    getOutputFilters() {
        let reqNo = 123;
        let compId = '123456789';
        let outputFilters = {
            "dataset": dataset,
            "compId": compId,
            "reqNo": reqNo
        };
        return outputFilters;
    }
    renderPDFData(eew2pdf){
        var raw = window.atob(eew2pdf.docData);
        //var raw = window.atob(eew2pdf);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));
        for(var i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        var pdfAsArray = array;
        var binaryData = [];
        binaryData.push(pdfAsArray);
        var dataPdf = window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}))
        document.getElementById('pdfi-frame').setAttribute('src',viewer_url + encodeURIComponent(dataPdf));
    }
    renderErrorPDF(yrEndTaxDoc) {
        var printFrame = document.getElementById('pdfi-frame');
        let errorContent = `<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></head><body><div class="alert alert-danger" style="margin:3px;" role="alert"><strong>Error: </strong>Unable to Get Year End Tax Document. Please contact your system administrator.</div></body></html>`;
        if (printFrame) {
            printFrame.height='100'
            printFrame.src = "data:text/html;charset=utf-8,"+errorContent
        }
    }
    render() {
        let dataAdapter = new $.jqx.dataAdapter(this.state.source);
        let uiAlert    =   <UIAlert handleClick={this.hideUIAlert}  showAlert={this.state.showAlert} aheader={this.state.aheader} abody={this.state.abody} abtnlbl={'Ok'}/>;
        let uiDelConfirm = <UIConfirm handleOk={this.handleConfirmOk} handleCancel={this.handleConfirmCancel}  showConfirm={this.state.showConfirm} cheader={this.state.cheader} cbody={this.state.cbody} okbtnlbl={'Ok'} cancelbtnlbl={'Cancel'}/>;
        let data = this.props.eew2data;

        let printrenderer = (row, column, value) => {
            if(value){
                return '<div style="text-align:center;"><i class="fas fa-check"></i></div>';
            }else{
                return '';
            }
        }
        let pubrenderer= (row, column, value) => {
            if(value){
                return '<div style="text-align:center;"><i class="fas fa-check"></i></div>';
            }else{
                return '';
            }
        }
        let formatssn = (row, column, value) => {
            return '<div style="text-align:center;">XXX-XX-'+value.substring(5, 9)+'</div>';
        }
        const getCompInfo = (id) => {
            let data =this.refs.eew2Grid.getrowdata(id);
            this.handleShowAuditPDF(data, null, OUTPUT_CLIENT_SUM);
        }
        const getEEW2PDF = (id)=>{
            let data =this.refs.eew2Grid.getrowdata(id);
            this.handleShowPDF(data);
        }
        let columns =
            [
                { text: 'Company Name', datafield: 'compName',  cellsalign: 'center',width: 'auto', align: 'center', columntype: 'button', cellsrenderer: function (ndex, datafield, value, defaultvalue, column, rowdata) {
                    return rowdata.compName;
                   }, buttonclick: function (id) {
                       getCompInfo(id);
                   } ,filtertype: 'input'},
                { text: 'Run Date/Time', datafield: 'generatedDateTime', width: 'auto', cellsformat: 'MM-dd-yyyy hh:mm:00 tt', filtertype: 'range' },
                { text: 'Employee Name', cellsalign: 'center', align: 'center',width: 'auto', columntype: 'button', cellsrenderer: function (ndex, datafield, value, defaultvalue, column, rowdata) {
                    return rowdata.empFname+' '+rowdata.empLname;
                   }, buttonclick: function (id) {
                       getEEW2PDF(id);
                   } ,filtertype: 'input'},
                { text: '  SSN  ', datafield: 'empId', cellsalign: 'center', align: 'center', width: 'auto', filtertype: 'input',cellsrenderer:formatssn},
                { text: 'Published', datafield: 'isPublished',cellsalign: 'center', align: 'center', cellsrenderer: pubrenderer,  width: 'auto',filtertype: 'bool', },
                { text: 'Printed', datafield: 'isPrinted', cellsalign: 'center', align: 'center', cellsrenderer: printrenderer, width: 'auto', filtertype: 'bool',},
            ];
        return (
            <div>
                <h3 class="text-bsi">Manage EE W2 Records 
                    <a href="#" onClick={() => this.goToFilterPage()} id="filterDataId"><i class="fas fa-filter fa-xs" title="Filter Payroll Data"></i></a>
                    <Tooltip placement="right" isOpen={this.state.filterData} target="filterDataId" toggle={this.toggleFilDat}>
                    Filter Payroll Data
                    </Tooltip>
                </h3>
                <Alert color="primary">
                    {data.filterlabel}
                </Alert>
                <Alert color="success" isOpen={this.state.outputSuccess}>
                    Employee W2 Output Generated Successfully!
                </Alert>
                <a href="#"  style={divStyleFirst}  onClick={() => this.selectAllClk()} id="selectAllid"><i class='fas fa-check-square fa-lg'></i></a>
                <Tooltip placement="top" isOpen={this.state.selectAll} target="selectAllid" toggle={this.toggleSelAll}>
                    Select All
                </Tooltip>
                <a href="#"  style={divStyle} onClick={() => this.resetAll()} id="resetAll"><i class='fas fa-redo-alt fa-lg'></i></a>
                <Tooltip placement="right" isOpen={this.state.resetAll} target="resetAll" toggle={this.toggleRstAll}>
                    Reset Selection
                </Tooltip>
                <a href="#" style={divStyleR} onClick={() => this.printW2s()} id="printW2s"><i class='fas fa-print fa-lg'></i></a>
                <Tooltip placement="right" isOpen={this.state.printW2s} target="printW2s" toggle={this.togglePrintW2s}>
                   Print W2s
                </Tooltip>
                <a href="#" style={divStyleR} onClick={() => this.unpublishW2()} id="unpublishW2"><i class='fas fa-calendar-minus fa-lg'></i></a>
                <Tooltip placement="right" isOpen={this.state.unpublishW2} target="unpublishW2" toggle={this.toggleUnPubW2Sel}>
                   Un-Publish W2
                </Tooltip>
                <a href="#" style={divStyleR} onClick={() => this.publishW2()} id="publishW2"><i class='fas fa-calendar-plus fa-lg'></i></a>
                <Tooltip placement="right" isOpen={this.state.publishW2} target="publishW2" toggle={this.togglePubW2Sel}>
                   Publish W2
                </Tooltip>
                <a href="#" style={divStyleR} onClick={() => this.deleteSelected()} id="deleteSelected"><i class='fas fa-calendar-check fa-lg'></i></a>
                <Tooltip placement="top" isOpen={this.state.deleSelected} target="deleteSelected" toggle={this.toggleDelSel}>
                    Generate W2 Correction
                </Tooltip> 
                <a href="#" style={divStyleR} onClick={() => this.generateOutput()} id="generateOutput"><i class='fas fa-calculator fa-lg'></i></a>
                <Tooltip placement="right" isOpen={this.state.generateOutput} target="generateOutput" toggle={this.togglePstSel}>
                    Generate W2
                </Tooltip>
                <JqxGrid ref='eew2Grid'
                    width={'100%'} source={dataAdapter} pageable={true} pagermode ={'simple'}
                    sortable={false} altrows={false} enabletooltips={false}
                    autoheight={true} editable={false} columns={columns}
                    filterable={true} showfilterrow={true}
                    selectionmode={'multiplerowsextended'}/>
                <a href="#"  style={divStyleFirstBot} onClick={() => this.exportToExcel()} id="exportToExcel"><i class='fas fa-table fa-lg'></i></a>
                <Tooltip placement="bottom" isOpen={this.state.exptoExlTip} target="exportToExcel" toggle={this.toggleExpExl}>
                    Export To Excel
                </Tooltip>
                <a href="#"  style={divStyleBot} onClick={() => this.exportToCsv()} id="exportToCsv"><i class='fas fa-pen-square fa-lg'></i></a>
                <Tooltip placement="right" isOpen={this.state.exptoCsvTip} target="exportToCsv" toggle={this.toggleExpCsv}>
                    Export To CSV
                </Tooltip>
                {uiAlert}
                {uiDelConfirm}
                {this.state.showPDF ? (<ViewPDF view={this.state.showPDF} title={this.state.title} handleHidePDF={this.handleHidePDF} />) : null}
                {this.state.showAudits ? (<ViewCompanyAuditFiles isOpen="true" title={this.state.title} view="true" actions={this.props.actions}
                                                audits={this.state.audits} compdata={this.props.compdata} getOutputFilters={this.getOutputFilters} 
                                                handleShowAuditPDF={this.handleShowAuditPDF} handleHideAuditPDF={this.handleHideAuditPDF} />) : null}
            </div>
        );
    }
}
export default EEW2Records;