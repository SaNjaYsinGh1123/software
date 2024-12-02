import React from 'react';

import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  // Label,
  Input,
  Button,

} from 'reactstrap';

// import ComponentCard from '../../components/ComponentCard';

const  StockManagement= () => {

  return (
<div>
     
     <Row>
     <Col md="12">
          <Card>
     
           
            <CardBody>
              <Form>
                <Row>
                
                  <Col md="3">
                    <FormGroup>
                      {/* <Label>Select Gender</Label> */}
                      <Input type="select" name="Select Gender" placeholder="Popular Dates">
                        <option> Choose Category</option>
                        <option>Category1</option>
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      {/* <Label>Select Gender</Label> */}
                      <Input type="select" name="Select Gender" placeholder="Popular Dates">
                        <option>Choose Sub Category</option>
                        <option>Sub Category 1</option>
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      {/* <Label>Select Gender</Label> */}
                      <Input type="select" name="Select Gender" placeholder="Popular Dates">
                        <option>Choose Raw Material</option>
                        <option>Raw Material 1</option>
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Button type="submit" className="btn my-btn-color-yellow">
                         Find
                      </Button>
                    </FormGroup>
                  </Col>
                      
                </Row>
               
              </Form>
            </CardBody>
            
            
            <CardBody className="border-top gap-2 d-flex align-items-center">
              
             
            </CardBody>
          </Card>
        </Col> 
     </Row>
     
   </div>

   
   
  );
};

export default StockManagement;