import React, { useEffect, useState } from 'react';
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

import {Link} from 'react-router-dom'
import ComponentCard from '../../../components/ComponentCard5';

const Ledgers = () => {
  const [collapse, setCollapse] = useState(false);
  const [showdata, setShowData] = useState('both');
  const [total, setTotal] = useState({ totalCredit:'',totalDebit:'',netBalance:[]});
  

  const ledgerEntries = [
    {
      date: '1 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '598883.00',
      credit: '0.00',
    },
    {
      date: '2 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '266045.00',
      credit: '0.00',
    },
    {
      date: '3 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '25000.00',
    },
    {
      date: '4 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '25000.00',
    },
    {
      date: '5 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '25000.00',
    },
    {
      date: '6 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '5000.00',
    },
    {
      date: '7 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '80000.00',
    },
    {
      date: '8 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '80000.00',
    },
    {
      date: '9 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '200000.00',
    },
    {
      date: '10 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '80000.00',
    },
    {
      date: '11 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '25000.00',
    },
    {
      date: '12 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '20000.00',
    },
    {
      date: '13 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '45000.00',
    },
    {
      date: '14 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '62000.00',
    },
    {
      date: '15 Sep, 2021',
      type: 'Sales',
      reference: 'INV-001',
      debit: '0.00',
      credit: '50000.00',
    }
  ];

const [filteredData, setFilteredData] = useState(ledgerEntries);

const totalcalculator = ()=>{
    let totalCredit = 0;
    let totalDebit = 0;
    let res = 0;
    const netBalance = [];
    ledgerEntries.map((entry,index)=>{
      const parsedebit = parseFloat(entry.debit.replace(/,/g, '')); 
      const parsecredit = parseFloat(entry.credit.replace(/,/g, ''));
      totalDebit = parsedebit + totalDebit;
      totalCredit = parsecredit + totalCredit;
      res = res + parsedebit - parsecredit;
      netBalance[index] = res; 
      return null;
    });

    setTotal(prevstate =>({
      ...prevstate,
      totalCredit,
      totalDebit,
      netBalance
  }))
}
  const handleShowDebits = () => {
     const filterByDebit = ledgerEntries.filter((entry) => {
                    const debit = parseFloat(entry.debit.replace(/,/g, ''))
                    return  debit > 0
                  }
                  )
    setFilteredData(filterByDebit);
    setShowData('debit');
  };
  const handleShowCredits = () => {
    const filterByCredit = ledgerEntries.filter((entry) => {
      const credit = parseFloat(entry.credit.replace(/,/g, ''))
      return  credit > 0
    }
    )
    setFilteredData(filterByCredit);
    setShowData('credit');
  };

  const handleShowBoth = () => {
    setFilteredData(ledgerEntries);
    setShowData('both');
  };


 
  
  const tableStyle = {
    marginTop: '1px', 
  };
const currencyFormat = (amount)=>{
  return parseFloat(amount).toLocaleString('en-IN',{
    maximumFractionDigits:2,
    minimumFractionDigits:2,
    style:'currency',
    currency:'INR'
  }).replace('₹','')
}

useEffect(()=>{
  console.log('first time');
  totalcalculator();
},[]);

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
            <th>Company Name : <b>A.K. International</b></th>
            {showdata === 'both'?<th>Opening Balance :<b>0.00</b></th>:null}
            {showdata === 'both'?<th>Closing Balance : ₹ <b>{currencyFormat(total.netBalance[total.netBalance.length-1])}</b></th>:null}
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
                  {showdata === 'both'?<th>Net Balance (₹)</th>: null}
              </tr>
              </thead>
              <tbody>
                {
                  filteredData.map((entry,index) => (
                    <tr key={entry.reference + entry.date}> {/* Unique key combining reference and date */}
                      <td>{entry.date}</td>
                      <td>{entry.type}</td>
                      <td><Link to='/operations/production-plans'>{entry.reference}</Link></td>
                      {showdata === 'both' || showdata === 'debit' ? <td>{currencyFormat(entry.debit)} </td> : null}
                      {showdata === 'both' || showdata === 'credit' ? <td>{currencyFormat(entry.credit)}</td>: null}
                      {showdata === 'both'? <td>{currencyFormat(total.netBalance[index])}</td>: null}
                    </tr>
                  ))}
                  <tr > {/* Unique key combining reference and date */}
                      <td></td>
                      <td></td>
                      <td></td>
                      {showdata === 'both' || showdata === 'debit' ? <td>₹ <b>{currencyFormat(total.totalDebit) }</b> <br></br>(total debit)</td> : null}
                      {showdata === 'both' || showdata === 'credit' ? <td>₹ <b>{currencyFormat(total.totalCredit)}</b><br></br>(total credit)</td>: null}
                      <td></td>
                    </tr>
              </tbody>
            </Table>
            
   
  </ComponentCard>

   
   
  );
};

export default Ledgers;