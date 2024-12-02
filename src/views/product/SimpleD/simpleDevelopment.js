import React, { useState } from 'react';
import {
  Collapse,
  Button,
  Card,
  Col,
  Input,
  Label,
  FormText,
  FormGroup,
  Form,
  Row,
  CardBody,
} from 'reactstrap';

import ComponentCard from '../../../components/ComponentCard5';

const SimpleDevelopment = () => {
  const [collapse, setCollapse] = useState(false);


  const orders = [
    {
      orderDetails: 'Order #12345',
      orderExpDate: '2022-08-01',
      grain: 'Wheat',
      quality: 'High',
      thickness: '2mm',
      color: 'Golden',
      totalQuantity: '1000kg',
      plan: 'Plan A',
      manufacturing: 'MFG Co.',
      dispatch: 'Yes',
      dispatchOverTime: 'No',
      actualPending: 'None'
    },
  
  ];
  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };
  const toggle = () => setCollapse(!collapse);

  return (
    <ComponentCard
    title=""
    subtitle={
      <p>
        {/* Overview of the projects */}
      </p>
    }
  >
    <Row>
      <Col md="8">
        <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }}>
          Add Sample Development
        </Button>
        <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }}>
              Search
            </Button>
      </Col>
      <Col>
            <Button className='my-btn-color-red' style={{ marginBottom: '1rem',marginRight:'10px',marginLeft:'10px'  }}>
                Print
            </Button>
            <Button color="success" style={{ marginBottom: '1rem',marginRight:'10px',marginLeft:'10px'  }}>
                Sort By Customer
            </Button>
      </Col>
    </Row>
    
      
            <Collapse isOpen={collapse}>
              <Card className="border">
                <CardBody>
                <Form>
               <Row>
                 <Col md="2">
                   <FormGroup>
                     <Label>Order No</Label>
                     <Input type="text" placeholder="Order No" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="2">
                   <FormGroup>
                     <Label>Customer</Label>
                     <Input type="text" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="2">
                   <FormGroup>
                     <Label>Order Date</Label>
                     <Input type="date" placeholder="Order Date" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="2">
                   <FormGroup>
                     <Label>Expected Date</Label>
                     <Input type="date" placeholder="Expected Date" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="2">
                   <FormGroup>
                     <Label>Grain</Label>
                     <Input type="text" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="2">
                 <FormGroup>
                    <Label>Priority</Label>
                    <Input type="select">
                      <option>Choose Priority...</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </Input>
                 </FormGroup>
                 </Col>
                 <Col md="2">
                   <FormGroup>
                     <Label>Status</Label>
                     <Input type="text" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="2">
                   <FormGroup>
                     <Label>Quality</Label>
                     <Input type="text" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="2">
                   <FormGroup>
                     <Label>Purchase Order</Label>
                     <Input type="text" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="2">
                   <FormGroup>
                     <Label>Color</Label>
                     <Input type="text" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="2">
                   <FormGroup>
                     <Label>Thickness</Label>
                     <Input type="text" placeholder="Thickness" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                    <Button type="submit" className="btn btn-info" style={{marginTop:"28px"}}>
                        Search
                    </Button>
                    <Button type="reset" className="btn btn-info" style={{marginTop:"28px",marginLeft:"10px"}}>
                        Reset
                    </Button>
                   </FormGroup>
                 </Col>
               </Row>
               
              
             </Form>
                </CardBody>
              </Card>
            </Collapse>
            
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <table className="table" style={tableStyle}>
              <thead>
              <tr>
                  <th>Order Details</th>
                  <th>Order and Exp Date</th>
                  <th>Grain</th>
                  <th>Quality</th>
                  <th>THKNS</th>
                  <th>Color</th>
                  <th>T.Qty</th>
                  <th>PLN</th>
                  <th>MFG</th>
                  <th>DISP</th>
                  <th>DISP OT</th>
                  <th>Actual Pending</th>
              </tr>
              </thead>
              <tbody>
              {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.orderDetails}>
                      <td>{order.orderDetails}</td>
                      <td>{order.orderExpDate}</td>
                      <td>{order.grain}</td>
                      <td>{order.quality}</td>
                      <td>{order.thickness}</td>
                      <td>{order.color}</td>
                      <td>{order.totalQuantity}</td>
                      <td>{order.plan}</td>
                      <td>{order.manufacturing}</td>
                      <td>{order.dispatch}</td>
                      <td>{order.dispatchOverTime}</td>
                      <td>{order.actualPending}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12">No records to display.</td>
                  </tr>
                )}
              </tbody>
            </table>
            
    </div>
   
  </ComponentCard>

   
   
  );
};

export default SimpleDevelopment;