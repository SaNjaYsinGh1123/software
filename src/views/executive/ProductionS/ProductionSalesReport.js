import React from 'react';

import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,

} from 'reactstrap';

// import ComponentCard from '../../components/ComponentCard';

const ProductionSalesReport = () => {

  return (
<div>
     
     <Row>
     <Col md="12">
          <Card>
     
           
            <CardBody>
              <Form>
                <Row>
                <Col md="6">
                    {/* <Label>Membership</Label> */}
                    <FormGroup>
                      <FormGroup check inline>
                        <Input type="radio" name="customcheck1" />
                        <Label check>Day by Day</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input type="radio" name="customcheck1" />
                        <Label check>Week by Week</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input type="radio" name="customcheck1" />
                        <Label check>Month by Month</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input type="radio" name="customcheck1" />
                        <Label check>Year by Year</Label>
                      </FormGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      {/* <Label>Select Gender</Label> */}
                      <Input type="select" name="Select Gender" placeholder="Popular Dates">
                        <option> Popular Dates</option>
                        <option>1 june 2024</option>
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      {/* <Label>Select Gender</Label> */}
                      <Input type="select" name="Select Gender" placeholder="Popular Dates">
                        <option>Customer</option>
                        <option>1 june 2024</option>
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      {/* <Label>First Name</Label> */}
                      <Input type="date" placeholder="Shaina nehwal" />
                      {/* <FormText className="muted">This is inline help</FormText> */}
                    </FormGroup>
                  </Col>
                  
                </Row>
               
              </Form>
            </CardBody>
            
            
            <CardBody className="border-top gap-2 d-flex align-items-center">
              <Button type="submit" className="btn btn-success">
                Find
              </Button>
              <Button type="button" className="btn my-btn-color-yellow ml-2">
                Reset
              </Button>
            </CardBody>
          </Card>
        </Col> 
     </Row>
     
   </div>

   
   
  );
};

export default ProductionSalesReport;