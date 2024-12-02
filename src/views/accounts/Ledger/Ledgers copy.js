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
  Table,
  CardBody,
} from 'reactstrap';

import ComponentCard from '../../../components/ComponentCard';

const Ledgers = () => {
  const [collapse, setCollapse] = useState(false);
  const [showdata, setShowData] = useState('both');

  // ... (rest of your component code remains the same)

  const handleShowDebits = () => {
    setShowData('debit');
  };
  const handleShowCredits = () => {
    setShowData('credit');
  };
  const handleShowBoth = () => {
    setShowData('both');
  };
  const totaldebit = () => {
     
  };

  const ledgerEntries = [
    {
      date: '1 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '1.00',
      credit: '0.00',
      netBalance: '598,883.00'
    },
    {
      date: '2 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '2.00',
      netBalance: '598,883.00'
    },
    {
      date: '3 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '3.00',
      credit: '0.00',
      netBalance: '598,883.00'
    },
    {
      date: '4 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '4.00',
      credit: '0.00',
      netBalance: '598,883.00'
    },
    {
      date: '5 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '5.00',
      netBalance: '598,883.00'
    },
    {
      date: '6 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '6.00',
      credit: '0.00',
      netBalance: '598,883.00'
    },
    {
      date: '7 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '7.00',
      netBalance: '598,883.00'
    },
    {
      date: '8 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '8.00',
      credit: '0.00',
      netBalance: '598,883.00'
    },
    {
      date: '9 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '9.00',
      credit: '0.00',
      netBalance: '598,883.00'
    },
    {
      date: '10 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '10.00',
      netBalance: '598,883.00'
    },
    {
      date: '11 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '11.00',
      credit: '11.00',
      netBalance: '598,883.00'
    },
    {
      date: '12 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '12.00',
      netBalance: '598,883.00'
    },
    {
      date: '13 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '13.00',
      credit: '13.00',
      netBalance: '598,883.00'
    }
  ];
  
  const tableStyle = {
    marginTop: '1px', 
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
            <Button className='my-btn-color ledger-btn-margin' onClick={toggle.bind(null)} >
              Search
            </Button>
            <Button className='ledger-btn-margin' outline color="success" onClick={()=>{handleShowDebits()}}>
              Show Only Debits
            </Button>
            <Button className='ledger-btn-margin' outline color="success" onClick={()=>{handleShowCredits()}}>
              Show Only Credits
            </Button>
            <Button className='ledger-btn-margin' outline color="success" onClick={()=>{handleShowBoth()}} active={showdata==='both'}>
              Show Both
            </Button>
      </Col>
      <Col md="4">
            <Button className='my-btn-color-red ledger-btn-margin'>
              View Pending Payments
            </Button>
            <Button className='ledger-btn-margin' outline color="danger">
              Print
            </Button>
      </Col>
    </Row>
    <Row>
      <Col md="6">
            
      </Col>
      <Col md="6">
        <span style={{padding:"10px"}}>Ledgers:</span>
            <Button  className='ledger-btn-margin' outline color="danger">Send On <i className="bi bi-envelope" style={{fontSize:'14px'}}/></Button>
            <Button  className='ledger-btn-margin' outline color="success">Send On <i className="bi bi-whatsapp" style={{fontSize:'14px'}}/></Button>
            <Button   className='my-btn-color ledger-btn-margin'  >
              Show History
            </Button>
      </Col>
    </Row>
            
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
      <Table responsive size="sm" style={{margin:"10px 0px"}}>
        <thead>
          <tr>
            <th>Company Name : A.K. International</th>
            <th>Opening Balance : 0.00</th>
            <th>Closing Balance : 142,928.00</th>
          </tr>
        </thead>
      </Table>
      <Table responsive  style={tableStyle} size="sm">
              <thead>
              <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>#Reference</th>
                  {showdata === 'both' || showdata === 'debit' ?<th>Debit (₹)</th>: null}
                  {showdata === 'both' || showdata === 'credit' ?<th>Credit (₹)</th>: null}
                  <th>Net Balance (₹)</th>
              </tr>
              </thead>
              <tbody>
                {ledgerEntries
                  .filter((entry) => {
                    const debit = parseFloat(entry.debit.replace(/,/g, ''))
                    const credit = parseFloat(entry.credit.replace(/,/g, ''))
                   
                    if(showdata === 'both'){
                      return true;
                    }
                    return showdata === 'debit'? debit > 0: credit > 0 ;
                  }
                  )
                  .map((entry) => (
                    <tr key={entry.reference + entry.date}> {/* Unique key combining reference and date */}
                      <td>{entry.date}</td>
                      <td>{entry.type}</td>
                      <td>{entry.reference}</td>
                      {showdata === 'both' || showdata === 'debit' ? <td>{entry.debit} </td> : null}
                      {showdata === 'both' || showdata === 'credit' ? <td>{entry.credit}</td>: null}
                      <td>{entry.netBalance}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            
   
  </ComponentCard>

   
   
  );
};

export default Ledgers;