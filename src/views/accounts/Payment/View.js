import React  from 'react';
import {Row,Col,Card,CardBody,CardTitle} from 'reactstrap';

import { useLocation } from 'react-router-dom';


const Payments = () => {
  const location = useLocation();
  const payment = location.state || {}

  return (
   
    <Row>
 <Col xs="12" md="3">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          
          <Card className='payment-card'>
            <CardTitle tag="h4" className="py-1 px-4 mb-0">
            <i  className="bi bi-bag-check my-eye-color px-2 font-weight-payment" />
              payment type
            </CardTitle>
            <CardBody className="py-2" >
              <div style={{fontSize:'12px'}} className='px-2'>{payment.is_credit_note === '1'? 'Credit Note: : (TCINV/21-22/0020)':'Receipt'}</div>
            </CardBody>
          </Card>
    {/* --------------------------------------------------------------------------------*/}

          
        </Col>

        <Col xs="12" md="4">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          {/* --------------------------------------------------------------------------------*/}
          
          <Card className='payment-card'>
            <CardTitle tag="h4" className="py-1 px-4 mb-0">
            <i  className="bi bi-file-earmark my-eye-color px-2 font-weight-payment" />
               Voucher No
            </CardTitle>
            <CardBody className="py-2" >
              <div style={{fontSize:'12px'}} className='px-2'>{payment.voucher_no}</div>
            </CardBody>
          </Card>

          

         
        </Col>
        <Col xs="12" md="3">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          {/* --------------------------------------------------------------------------------*/}
         
          <Card className='payment-card'>
            <CardTitle tag="h4" className="py-1 px-4 mb-0">
            <i  className="bi bi-alarm my-eye-color px-2 font-weight-payment" />
               Payment Date
            </CardTitle>
            <CardBody className="py-2" >
              <div style={{fontSize:'12px'}} className='px-2'>{payment.payment_date}</div>
            </CardBody>
          </Card>

          
         
        </Col>
        <Col xs="12" md="2">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          {/* --------------------------------------------------------------------------------*/}
          <Card className='payment-card'>
            <CardTitle tag="h4" className="py-1 px-4 mb-0">
            <span className=" my-eye-color px-2 font-weight-payment">
              $
            </span>
            Amount
            </CardTitle>
            <CardBody className="py-2" >
              <div style={{fontSize:'12px'}} className='px-2'>{payment.amount}</div>
            </CardBody>
          </Card>
        </Col>
    </Row>
    
   

   
   
  );
};

export default Payments;
// className="border-bottom px-4 py-3 mb-0"