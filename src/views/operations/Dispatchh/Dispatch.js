import React, { useState,useCallback,useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';
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

import ComponentCard from '../../../components/ComponentCard5';

const useDebouncedFetchOptions = (endpoint) => {
  const fetchOptions = async (inputValue) => {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`https://factory.teamasia.in/api/public/${endpoint}?search=${inputValue}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result[endpoint].map(item => ({ value: item.id, label: item.name || item.code || item.company_name }));
  };

  const debouncedFetch = useCallback(debounce((inputValue, callback) => {
    fetchOptions(inputValue).then(callback).catch(error => {
      console.error(error);
      callback([]);
    });
  }, 300), [endpoint]);

  return debouncedFetch;
};

const Dispatch = () => {
  const [collapse, setCollapse] = useState(false);
  const [dispatch,setDispatch] = useState([]);

  const [OrderWithCompleteData,setOrderWithCompleteData]   =  useState([]);
  const [filteredOrderCompleteData, setFilteredOrderCompleteData] = useState([]);
  const [DispatchData,setDispatchData]   =  useState([]);

  const [searchData,setSearchData] = useState({
    customerId:{value: 'x', label: 'choose'},
    bill_no:'',
  });

  const navigate = useNavigate();

  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };
  
  const toggle = () => setCollapse(!collapse);

  const customerOptions = useDebouncedFetchOptions('customers');

  const customerView = (customerId)=>{
    navigate(`/order/customers/view/?id=${customerId}`);
  }

  const dispatchOrder = ()=>{
    navigate('/operations/dispatch-order');
  }

  const dispatchView = (dispatchItem)=>{
    navigate('/operations/dispatch/view',{state: dispatchItem.id});
  }

  const InvoiceView = (invoiceId)=>{
    console.log(invoiceId);
    navigate('/operations/invoices/print',{state: invoiceId});
  }

  // const addressStyle = {
  //   width: '300px',
  //   maxWidth: '300px',
  //   overflow: 'hidden', 
  //   textOverflow: 'ellipsis',
  //   whiteSpace: 'nowrap'
  // };




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

  



const handleSelectChange = (selectedOption, actionMeta) => {
  setSearchData(prevState => ({
    ...prevState,
    [actionMeta.name]: selectedOption
  }));
};

const handleSearchChange = (e) => {
  const {name, value} = e.target;
  setSearchData(prevState => ({
    ...prevState,
    [name] : value
  }));
};

const handleSearchReset = () => {
  setSearchData({
    customerId:{ value: 'x', label: 'choose'},
    bill_no:'',
  });
  setFilteredOrderCompleteData(DispatchData);
};

const filterOrders = (orderArray, filterData) => {

  console.log('orderArray',orderArray,filterData);

  const filterdOrders = orderArray.filter(order => {
    // Filter by customer ID
    const matchesCustomerId = (filterData.customerId?.value !== 'x'||'')
      ? order.customer_id === filterData.customerId.value
      : true;

    // const matchesCustomerId = true;

    // Filter by order ID
    const matchesOrderId = filterData.bill_no !==''
      ? order.bill_no === filterData.bill_no
      : true;

      // const matchesGrain = true;
    // Return true if all filters match
    return matchesCustomerId && matchesOrderId;
  });


  console.log('filterdOrders',filterdOrders);

  return filterdOrders;
};

const handleSearch = (e) => {
  e.preventDefault();
  // console.log('form',searchData);
  const filteredOrders = filterOrders(DispatchData, searchData);
  console.log('Filtered Orders:', filteredOrders);
  setFilteredOrderCompleteData(filteredOrders);
};

useEffect(()=>{
  const DispatchDataUpdated = dispatch.map((dis)=>({
    ...dis,
    delivery:deliveryDate(dis.order_id),
  }));
  
  console.log('hi');
  setDispatchData(DispatchDataUpdated);
  setFilteredOrderCompleteData(DispatchDataUpdated);
},[dispatch,OrderWithCompleteData]);


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
    fetchDispatch();
    fetchOrderWithCompleteData();
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

      <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }} >
              Search
      </Button>
            <Collapse isOpen={collapse}>
              <Card className="border">
                <CardBody>
                <Form onSubmit={handleSearch}>
               <Row>
               <Col md="3">
                   <FormGroup>
                     <Label>Invoice No</Label>
                     <Input type="text" name="bill_no" value={searchData.bill_no} onChange={handleSearchChange} placeholder="invoice id" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="3">
                   <FormGroup>
                     <Label>Customer</Label>
                     <AsyncSelect
                                name="customerId"
                                onChange={handleSelectChange}
                                loadOptions={customerOptions}
                                value={searchData.customerId}
                                isClearable
                                isSearchable
                      />
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
                    <Button type="reset" className="btn btn-info" style={{marginTop:"28px",marginLeft:"10px"}} onClick={handleSearchReset}>
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
                {filteredOrderCompleteData?.map((dispatchItem) => (
                    <tr key={dispatchItem.id}>
                      <td style={{fontWeight:900,paddingLeft:"40px"}}># {dispatchItem.order_id}</td>
                      <td  title={dispatchItem.address}>
                        <div style={{fontWeight: 600}}>
                          {dispatchItem?.delivery_address_details?.customer_name} <i className="bi bi-box-arrow-up-right" onClick={() =>customerView(dispatchItem?.delivery_address_details?.customer_id)} style={{color:'blue', marginLeft:'10px'}}></i>
                        </div>
                        {`${dispatchItem?.delivery_address_details?.address_line_1}, `}
                        {`${ dispatchItem?.delivery_address_details?.address_line_2}, `}
                        {`${ dispatchItem?.delivery_address_details?.city_name}, `}
                        { `${dispatchItem?.delivery_address_details?.state_name}, `}
                        {`${dispatchItem?.delivery_address_details?.country_name}`}
                      </td>
                      <td>{dispatchItem.bill_no}</td>
                      <td>{formatDate(dispatchItem.invoice_date)}</td>
                      <td>
                        {/* Replace with actual action components or icons */}
                        <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={()=>dispatchView(dispatchItem)}><i className="bi bi-eye-fill my-eye-color"/></button>
                        {/* <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-bell-fill my-bell-color" /> </button> */}
                        <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={()=>InvoiceView(dispatchItem.invoice_id)}><i className="bi bi-printer-fill my-printer-color"/></button>
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

export  const dispacth2 = ()=>{
  const a=0;
  const b=1;
  return Number(Number(a) === Number(b));
}