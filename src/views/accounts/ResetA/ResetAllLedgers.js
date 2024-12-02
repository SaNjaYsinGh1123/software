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

const ResetAllLedgers = () => {
  const [collapse, setCollapse] = useState(false);

  const ledgerEntries = [
    {
      date: '2021-07-17',
      type: 'Invoice',
      reference: 'INV-001',
      debit: '1500.00',
      credit: '',
      netBalance: '1500.00'
    },
    {
      date: '2021-08-01',
      type: 'Payment',
      reference: 'PAY-001',
      debit: '',
      credit: '1500.00',
      netBalance: '0.00'
    },
    // ... more dummy ledger entry objects
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
    <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }}>
              Search
            </Button>
            <Collapse isOpen={collapse}>
              <Card className="border">
                <CardBody>
                <Form>
               <Row>
               <Col md="3">
                   <FormGroup>
                     <Label>Customer</Label>
                     <Input type="text" placeholder="Order No" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="3">
                   <FormGroup>
                    <Label>Choose an option</Label>
                      <Input type="select">
                        <option>All</option>
                        <option>Last 1 month</option>
                        <option>Last 6 months</option>
                        <option>Last 12 months</option>
                      </Input>
                   </FormGroup>
                 </Col>

                 <Col md="3">
                   <FormGroup>
                     <Label>Choose a Date</Label>
                     <Input type="date" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="3">
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
                  <th>Date</th>
                  <th>Type</th>
                  <th>#Reference</th>
                  <th>Debit (₹)</th>
                  <th>Credit (₹)</th>
                  <th>Net Balance (₹)</th>
              </tr>
              </thead>
              <tbody>
              {ledgerEntries.map((entry) => (
                  <tr key={entry.netBalance}>
                    <td>{entry.date}</td>
                    <td>{entry.type}</td>
                    <td>{entry.reference}</td>
                    <td>{entry.debit}</td>
                    <td>{entry.credit}</td>
                    <td>{entry.netBalance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
    </div>
   
  </ComponentCard>

   
   
  );
};

export default ResetAllLedgers;