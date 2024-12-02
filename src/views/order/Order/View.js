import React, { useState,useEffect } from 'react';
import {
  Row,
  Button,
  Col,
} from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderProductView from './orderProductView';
import ComponentCard from '../../../components/ComponentCard';
import ComponentCard1 from '../../../components/ComponentCard1';
// import ComponentCard4 from '../../../components/ComponentCard4';
import AddressBlock from './AddressBlock';
import 'react-table-v6/react-table.css';

const JumbotronComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');  // Get the query parameter "id"

  const  editOrder = () => {
    navigate(`/order/orders/edit/?id=${id}`);
  };
 const [severity,setSeverity] =useState(undefined);
 const [order,setOrder] = useState(undefined);
 const [data11,setData11] =useState(undefined);
 
  // console.log('location',data5);

  function formatDate(inputDate) {
    if(!inputDate){
      return null
    }
    const date = new Date(inputDate);
  
    // Use Intl.DateTimeFormat to format the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);

  }

  const StatusName = (status) => {
    switch(status) {
      case '0':
        return 'Under Review';
      case '1':
        return 'Confirmed';
      case '2':
        return 'Canceled';
      case '3':
        return 'Completed';
      case '4':
        return 'Parked';
      default:
        return 'Unknown Status';
    }
  };

useEffect(()=>{
  const fetchSeverityData = async (orderData) => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/severities/${orderData?.severity_id}?is_trashed=0`, {
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
    // console.log('hiX',result.name);
    if(result.length !== 0){
      setSeverity(result[0].name); 
    }
  };
  const fetchData11 = async (orderData) => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/customers/${orderData?.customer_id}?is_trashed=0`, {
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
    // console.log('hiX',result.name);
    if(result){
      setData11(result.company_name);
      fetchSeverityData(orderData)
    }
  };

  const fetchOrderData = async ()=>{
    
    try {
      const token = localStorage.getItem('userToken');
      const response =await  fetch(`https://factory.teamasia.in/api/public/orders/${id}`,{
        method: "GET",
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });

      if(response.status === 200){
        const result = await response.json();
        console.log('result order',result);
        setOrder(result);
        fetchData11(result)
      }else {
        // If the status is not 200, navigate to 404
        navigate('/404');
      }
      
    } catch (error) {
      console.error("Error fetching data:", error.message);
      navigate('/404');
    }
  }

  fetchOrderData()
},[])

  return (
    <>
      <ComponentCard1 title="">
         <Row>
                <Col md="12">
                  <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => editOrder()}>
                    Edit Order
                  </Button>
                </Col>
                
              </Row>
            <ComponentCard>
               <div className="order-view-page-flex-(remove grid for this rule) order-view-page-grid">
                <div><i className="bi-hash my-trash-color" style={{fontSize:'19px'}}/>Order No : #{id}</div>
                <div> <i className="bi-calendar2-event-fill my-eye-color"/>Expected Date : {formatDate(order?.expected_delivery_date)}</div>
                <div><i className="bi-hourglass-split my-calander-color"/>Status : {StatusName(order?.status_id)}</div>
                <div><i className="bi-person-circle my-list-color"/>Customer : {data11}</div>
                <div><i className="bi-calendar2-event-fill my-eye-color"/>Order Date : {formatDate(order?.created_at)}</div>
                <div><i className="bi-hash my-eye-color" style={{fontSize:'19px'}}/>Purchase Order : {order?.purchase_order}</div>
                <div><i className="bi bi-tags-fill my-eye-color"/>Priority : {severity}</div>
                {/* <div><i className="bi bi-plus-circle-fill my-calander-color"/>Created By : Team Operations - missing</div> */}
               </div>
            </ComponentCard>
             
            {/* <ComponentCard4>
             
              <div className='table-margin'>
               <Table className='table-margin-zero order-table-button-x' size="sm">
              
                  <Row  style={{background:'#e3e3e3',padding:'2px'}}>
                    <Col md="8">
                      <div style={{margin:'5px 0px'}}>
                        <div><i className="bi bi-stopwatch-fill  my-calander-color" style={{fontSize:'20px',marginRight:'1px'}}/>Proforma Invoice - missing</div> 
                      </div>
                    </Col>
                    <Col md="4" style={{padding:'5px 0px'}}>

                      <Button  className="btn mybtncustomer btn-secondary" outline color="danger">Send On <i className="bi bi-envelope" style={{fontSize:'20px',marginRight:'1px'}}/></Button>
                      <Button  className="btn mybtncustomer btn-secondary" outline color="success">Send On <i className="bi bi-whatsapp" style={{fontSize:'20px',marginRight:'1px'}}/></Button>
                      <Button  className="btn mybtncustomer btn-secondary" outline color="danger">Print</Button>
                    </Col>
                  </Row>
                  
                </Table>
                
                 <div>
                  <div className="order-history">
                      <div>Email History - missing</div>
                         <div><i className="bi bi-arrow-right my-eye-color" style={{fontSize:'19px',marginRight:'2px'}}/>No history found</div>
                  </div>
                 
                  <div className="order-history">
                      <div>Whatsapp History - missing</div>
                         <div><i className="bi bi-arrow-right my-eye-color" style={{fontSize:'19px',marginRight:'2px'}}/>No history found</div>
                  </div>
                 </div>
               </div>
             
            
            

             </ComponentCard4> */}

            <ComponentCard>
                 <OrderProductView orderID={id}/>
             </ComponentCard>
         
         <Row>
          <Col md="6">
                <div style={{background:'#e3e3e3',padding:'10px'}}><i className="bi-geo-alt my-list-color" style={{fontSize:'19px'}}/><span style={{fontWeight:'900'}}> Billing Address</span></div>
                {order && <AddressBlock addressId={order?.billing_address_id}/>}
          </Col>
          <Col md="6">
              <div style={{background:'#e3e3e3',padding:'10px'}}><i className="bi-geo-alt my-calander-color" style={{fontSize:'19px'}}/><span style={{fontWeight:'900'}}> Delivery Address</span></div>
              {order && <AddressBlock addressId={order?.delivery_address_id}/>}
          </Col>
         </Row>

         {/* <Row>
          <Col md="12">
                <div style={{background:'#e3e3e3',padding:'10px'}}><i className="bi bi-stopwatch-fill  my-calander-color" style={{fontSize:'19px'}}/>Order History - missing</div>
                <ComponentCard4>
                  <div className="order-history">
                     <div><i className="bi bi-arrow-right my-eye-color" style={{fontSize:'19px',marginRight:'2px'}}/>Order Created by Team Operations with Confirmed Status on 17 Dec, 2021</div>
                     <div><i className="bi bi-arrow-right my-eye-color" style={{fontSize:'19px',marginRight:'2px'}}/>Order Status changed by Team Operations as Parked Status on 25 Dec, 2021</div>
                     <div><i className="bi bi-arrow-right my-eye-color" style={{fontSize:'19px',marginRight:'2px'}}/>Order Status changed by Team Operations as Confirmed Status on 06 Aug, 2022 </div>
                  </div>
                    
                </ComponentCard4>
          </Col>
         </Row> */}

      </ComponentCard1>
    </>
  );
};

export default JumbotronComponent;
