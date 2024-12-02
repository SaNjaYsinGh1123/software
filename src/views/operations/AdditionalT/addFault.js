import React  from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Button
} from 'reactstrap';

import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';

const JumbotronComponent = ({modal,jumboId,toggle}) => {
  const navigate = useNavigate();
  async function apiCall() {
    try {
        console.log('jumboId',jumboId)
        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/jumboroll/markastreated/${jumboId}`, {
          method: 'PUT', 
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

         if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("responsejson1",result);
        toggle();
        navigate('/operations/additional-treatment');
        return null

    } catch (error) {
        return null;
    }
}



  const handleTreatment = async () => {
    apiCall()
  };


  return (
    <>
     <ComponentCard5 >
          
            <Modal isOpen={modal} toggle={toggle} style={{'--bs-modal-width': '400px'}}>
              <ModalHeader toggle={toggle}></ModalHeader>
              <ModalBody>
                 <Form>
                   <Row>
                     <Col>
                       <FormGroup>
                         <Label>Are you sure you want to mark the Jumbo Roll as treated?</Label>
                        
                       </FormGroup>
                     </Col>
                   </Row>
                    <Row>
                      <Col md="12" style={{textAlign:'center'}}>
                        <Button  className="btn my-btn-color" onClick={()=>handleTreatment()}>
                             Marked as Treated
                        </Button>
                      </Col>
                    </Row>
                 </Form>
              </ModalBody>
             
            </Modal>
          </ComponentCard5>
    </>
  );
};

export default JumbotronComponent;
JumbotronComponent.propTypes = {
  modal: PropTypes.string.isRequired,
  jumboId: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  
};