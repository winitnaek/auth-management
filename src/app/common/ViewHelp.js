
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import JSONViewer from 'react-json-viewer';
class ViewHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showAlert: this.props.showAlert,
        aheader: this.props.aheader,
        abody: this.props.abody,
        abtnlbl: this.props.abtnlbl,
        closeAll: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.props.showAlert = false;
    this.setState({
      showAlert: false
    });
  }
  render() {
    return (
      <div>
        <Modal size="lg"  style={{ 'max-width': window.innerWidth-200}} toggle={this.toggle} isOpen={this.props.showAlert} backdrop="static">
            <ModalHeader>{this.props.aheader}</ModalHeader>
            <ModalBody className="mx-auto">
            <JSONViewer
                json={JSON.parse(this.props.abody)}
            />
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={() => this.toggle()}>{this.props.abtnlbl}</Button>
            </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default ViewHelp;