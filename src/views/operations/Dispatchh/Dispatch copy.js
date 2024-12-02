import React, { useState,useEffect } from 'react';
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
  Table
} from 'reactstrap';

import {useNavigate} from 'react-router-dom';

import ComponentCard from '../../../components/ComponentCard';

const Dispatch = () => {
  const [collapse, setCollapse] = useState(false);
  const [dispatch,setDispatch] = useState([]);

  const [dispatchAddresses,setDispatchAddresses] =  useState([]);
  const [OrderWithCompleteData,setOrderWithCompleteData] =  useState([]);
  const [Customerdata,setCustomerData] = useState([]);


  const navigate = useNavigate();

  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };
  
  const toggle = () => setCollapse(!collapse);

  const customerView = (customerId)=>{
    navigate('/order/customers/view',{state: {id:customerId}});
  }

  const dispatchOrder = ()=>{
    navigate('/operations/dispatch-order',{state: {Customerdata}});
  }

  const dispatchView = (dispatchItem)=>{
    navigate('/operations/dispatch/view',{state: {dispatchItem}});
  }

  const InvoiceView = (dispatchItem)=>{
    navigate('/operations/invoices/print',{state: dispatchItem});
  }

  // const addressStyle = {
  //   width: '300px',
  //   maxWidth: '300px',
  //   overflow: 'hidden', 
  //   textOverflow: 'ellipsis',
  //   whiteSpace: 'nowrap'
  // };

  const addressNames = (orderAdressId) => {
    
  
      const addressValue = dispatchAddresses.find(address => address.id === orderAdressId);
      return addressValue || 'Address not found';
  };

  const customerNames = (orderId) => {
    const orderValue = OrderWithCompleteData.find(order => order.id === orderId);
    // console.log('ordervalue',orderValue);
    if (orderValue) {
      const customerValue = Customerdata.find(customer => customer.id === orderValue.customer_id);
    // console.log('ordervalue 2',customerValue);
      return customerValue ? customerValue.company_name : 'customer not found';
    }
    return 'customer not found';
  };

  const deliveryDate = (orderId) => {
    const orderValue = OrderWithCompleteData.find(order => order.id === orderId);
    // console.log('ordervalue',orderValue);
    if (orderValue) {
     
      return orderValue.expected_delivery_date
    }
    return 'customer not found';
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    // Use Intl.DateTimeFormat to format the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);

  }

  
const DispatchData = dispatch.map((dis)=>({
  ...dis,
  address: addressNames(dis.delivery_address_id),
  customerName:customerNames(dis.order_id),
  delivery:deliveryDate(dis.order_id),
}));

  useEffect(()=>{
    const fetchDispatch = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/dispatch`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("responsejson1",result.dispatch);
      setDispatch(result.dispatch); 
    };

    const fetchOrderDispatchAddresses = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/addresses`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("responsejson1",result.addresses);
      setDispatchAddresses(result.addresses ? result.addresses:[]);
    };

    const fetchOrderWithCompleteData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/orders/?status_id=1`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // console.log("responsejson1",result.orders);
      setOrderWithCompleteData(result.orders);
    };

    const fetchCustomerData = async ()=>{

      const token = localStorage.getItem('userToken');
      const response =await  fetch(`https://factory.teamasia.in/api/public/customers`,{
        method: "GET",
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });

      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const datas = await response.json();
      // console.log('result customer',datas.customers);
      setCustomerData(datas.customers);
    }

    fetchDispatch();
    fetchOrderDispatchAddresses();
    fetchOrderWithCompleteData();
    fetchCustomerData();
  },[])

  return (
    <ComponentCard
    title=""
    subtitle={
      <p>
        {/* Overview of the projects */}
      </p>
    }
  >
      <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={()=>dispatchOrder()}>
           Dispatch An Order
      </Button>

      <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }} disabled>
              Search
      </Button>
            <Collapse isOpen={collapse}>
              <Card className="border">
                <CardBody>
                <Form>
               <Row>
               <Col md="3">
                   <FormGroup>
                     <Label>Invoice No</Label>
                     <Input type="text" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="3">
                   <FormGroup>
                     <Label>Customer</Label>
                     <Input type="text" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>

                 <Col md="3">
                   <FormGroup>
                     <Label>Date</Label>
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
      <Table responsive style={tableStyle}>
              <thead>
              <tr>
                <th>Order ID</th>
                <th >Address</th>
                <th>Invoice No.</th>
                <th>Invoice Date</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
                {DispatchData.map((dispatchItem) => (
                    <tr key={dispatchItem.order_id}>
                      <td style={{fontWeight:900,paddingLeft:"40px"}}># {dispatchItem.order_id}</td>
                      <td  title={dispatchItem.address}>
                        <div style={{fontWeight: 600}}>
                          {dispatchItem?.address?.customer_name} <i className="bi bi-box-arrow-up-right" onClick={() =>customerView(dispatchItem?.address?.customer_id)} style={{color:'blue', marginLeft:'10px'}}></i>
                        </div>
                        {`${dispatchItem?.address?.address_line_1}, `}
                        {`${ dispatchItem?.address?.address_line_2}, `}
                        {`${ dispatchItem?.address?.city_name}, `}
                        { `${dispatchItem?.address?.state_name}, `}
                        {`${dispatchItem?.address?.country_name}`}
                      </td>
                      <td>{dispatchItem.bill_no}</td>
                      <td>{formatDate(dispatchItem.invoice_date)}</td>
                      <td>
                        {/* Replace with actual action components or icons */}
                        <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-eye-fill my-eye-color" onClick={()=>dispatchView(dispatchItem)}/></button>
                        {/* <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-bell-fill my-bell-color" /> </button> */}
                        <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-printer-fill my-printer-color" onClick={()=>InvoiceView(dispatchItem.invoice_id)} /></button>
                        {/* <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-list my-list-color" /></button> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
  </ComponentCard>
  );
};

export default Dispatch;