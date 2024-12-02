import React, { useState,useEffect} from 'react';
import {
  Button,
  Row,
  Table,
  Col,
  Collapse,
} from 'reactstrap';
import {useLocation, useNavigate } from 'react-router-dom';
import Barcode from 'react-barcode';

import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';





import OrderProduct from  '../AdditionalT/orderProduct';

const SmallRollViewS = () => {
 
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state;
  const [collapseProduct, setCollapseProduct] = useState(false);
  const [rollItem, setRollItem] = useState(undefined);
  // const [modal, setModal] = useState(false);
  const [severity,setSeverity] = useState({name:''});
  const [planData,setPlanData] = useState({plan_date:'0000-01-1',created_at:'0000-01-1'});
  const [Qa,setQa] = useState({});
  const [order,setOrder] = useState({created_at:'0000-01-1',expected_delivery_date:'0000-01-1'});
 
  console.log('id',id);
  
  const JumboPrint = (dispatchItem)=>{
    console.log('hi',dispatchItem);
    navigate('/operations/small/print',{state: dispatchItem});
  }

  const toggleProduct = () =>{   
    setCollapseProduct(!collapseProduct)
  }

  const StatusName = (statusId) => {
    switch(statusId) {
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

  
  function formatDate(inputDate) {
   console.log('inputDate',inputDate);
    if(inputDate === undefined || null || ''){
      return '-'
    }
    const date = new Date(inputDate);
    // Use Intl.DateTimeFormat to format the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }


 

 

  const LabReportFunction = (product)=>{
    navigate('/operations/Lab-Report',{state:{rollItem:{...product,production_plan_id:product.id}}});
 }

 const BomReportFunction = (product)=>{
  // console.log('product',product);
  navigate('/operations/Bom-Report/view',{state:{productionPlanId : product?.id}});
}
const ParametersReportFunction = (product)=>{
  navigate('/operations/Production-Report/view',{state:{productionPlanId : product?.id}});
}


useEffect(()=>{
  const fetchPlans = async (productionPlanId) => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/productionplan/${productionPlanId}`, {
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
    console.log("responsejson1",result);
    setPlanData(result);
  };

  const fetchQaData = async (QaId) => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/qapateams/${QaId}`, {
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
    console.log("responsejson1",result?.[0].name);
    setQa(result?.[0]);
  };



  const fetchData1 = async(saverityId = 0)=>{
   const token = localStorage.getItem('userToken');
   // console.log('token',token);
   const response = await fetch(`https://factory.teamasia.in/api/public/severities/${saverityId}`, {
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
   console.log("responsejson saverity",result);
   setSeverity(result[0]); 
  }

  const fetchOrderData = async(jumboRoll)=>{
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/orders/${jumboRoll.order_id}`, {
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
    console.log("responsejson order",result);
    setOrder(result); 
    fetchData1(result?.severity_id);
    console.log(order)
   }
   const fetchJumboData = async(jumboRollId)=>{
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/jumboroll/${jumboRollId}`, {
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
    console.log("responsejson smallRolls",result);
    fetchOrderData(result?.[0]);
    fetchPlans(result?.[0].production_plan_id);
   }

  const fetchSmallData = async()=>{
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/smallrolls/${id}`, {
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
    console.log("responsejson smallRolls",result);
    fetchJumboData(result?.[0].jumbo_roll_id);
    setRollItem(result?.[0]);
    fetchQaData(result?.[0].qa_id);
   }
  fetchSmallData();
},[]);

  return (
    <>
      <ComponentCard5 title="">
            <ComponentCard5>

               <Table responsive className='table-margin-zero QapViewtable' size="sm">
                  <thead>
                    <tr>
                      <th scope="col" >
                        <div><Barcode value={`SMALL${rollItem?.id}`} height={20} /></div>
                      </th>
                      
                      <th scope="col">
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                        {planData.created_at !=='0000-01-1' && <Button className='my-btn-color-red' style={{whiteSpace:'nowrap'}} onClick={()=>BomReportFunction(planData)}>BOM Report</Button>}
                        {planData.created_at !=='0000-01-1' && <Button className='my-btn-color-red' style={{whiteSpace:'nowrap'}} onClick={()=>LabReportFunction(planData)}>Lab Report</Button>}
                        {planData.created_at !=='0000-01-1' &&  <Button className='my-btn-mo-color' onClick={()=>ParametersReportFunction(planData)}>Production Level Parameters</Button>}
                          <Button className='my-btn-color-red' onClick={()=>JumboPrint(rollItem?.id)}>Print</Button> 
                          <Button className='my-btn-mo-color'>{rollItem?.quantity}</Button>
                        </div> 
                      </th>
                       
                      
                    </tr>
                    
                    <tr >
                      <th scope="col"> 
                          <div style={{display:'flex',justifyContent:'space-between'}}>
                              <div>Grade: {rollItem?.grade_id}</div>
                              <div>BIN  : {rollItem?.bin}</div>
                              <div>Weight : {rollItem?.weight}</div>
                              <div>Width : {rollItem?.width}</div>
                              <div>QA By : {Qa.name}</div>
                              <div>Created On : {formatDate(rollItem?.created_at)}</div>
                          </div>
                      </th>

                      <th scope="col"></th>
                     
                    </tr>
                    <tr >
                      <th scope="col"> 
                          <div style={{display:'flex',justifyContent:'space-between'}}>
                              <div>Thickness </div>
                              <div>T1  :{rollItem?.t1}</div>
                              <div>T2  :{rollItem?.t2}</div>
                              <div>T3  :{rollItem?.t3}</div>
                              {planData.created_at !=='0000-01-1' && <div >Planned On :{formatDate(planData?.plan_date)} </div>}
                              {planData.created_at !=='0000-01-1' && <div>Created From : JUMBO{rollItem?.jumbo_roll_id}</div>}
                          </div>
                      </th>

                      <th scope="col" ></th>
                      <th scope="col"></th>
                     
                    </tr>
                                        
                  </thead>
                  
                </Table>
                <div style={{padding: "25px 0px 0px 0px",border: "1px solid #dee2e6"}}>
                  <Row>
                    <Col className='col-10'>
                    <div style={{marginLeft:'10px'}}>
                      {rollItem?.customer_details?.company_name && `${rollItem?.customer_details?.company_name}(#${rollItem?.product_id}),`}
                      { `Product(${rollItem?.product_id})`  }
                    </div>
                    </Col>
                    <Col className='col-2'>
                    <Button className='' onClick={toggleProduct.bind(null)} style={{ marginBottom: '1rem' }}>
                      <i className={collapseProduct ?'bi-caret-down-square-fill':'bi-caret-right-square-fill'} />
                    </Button>
                    </Col>
                  </Row>
                </div>
                
                
            <Collapse isOpen={collapseProduct}>
            {planData.created_at !=='0000-01-1' && <Table responsive className='table-margin-zero QapViewtable' size="sm">
                  <thead>
                    <tr>
                      <th scope="col">Order Date	</th>
                      <th scope="col">Expected Date	</th>
                      <th scope="col">Priority	</th>
                      <th scope="col">Status</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>{formatDate(order.created_at)}</td>
                        <td>{formatDate(order.expected_delivery_date)}</td>		
                        <td>{severity.name}</td>
                        <td>{StatusName(order.status_id)}</td>
                    </tr>
                  
                  </tbody>
                </Table>}

                <OrderProduct productID = {rollItem?.product_id } />
              
              {planData.created_at !=='0000-01-1' && <Table responsive size="sm" className="QapViewtable">
                  <thead>
                    <tr>
                      <th scope="col">Pre Skin</th>
                      <th scope="col">Skin</th>
                      <th scope="col">Top Coat</th>
                      <th scope="col">Filler In Top Coat</th>
                      <th scope="col">Foam</th>
                      <th scope="col">Filler In Foam</th>
                      <th scope="col">Adhesive</th>
                      <th scope="col">Filler In Adhesive</th>
                      <th scope="col">Final GSM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td title={planData.pre_skin}>{planData.pre_skin} gsm</td>
                      <td title={planData.skin}>{planData.skin} gsm</td>
                      <td title={planData.top_coat}>{planData.top_coat}</td>
                      <td title={planData.filler_in_top_coat}>{planData.filler_in_top_coat}</td>
                      <td title={planData.foam}>{planData.foam} gsm</td>
                      <td title={planData.filler_in_foam}>{planData.filler_in_foam} PHR</td>
                      <td title={planData.adhesive}>{planData.adhesive} gsm</td>
                      <td title={planData.filler_in_adhesive}>{planData.filler_in_adhesive} PHR</td>
                      <td title={planData.final_gsm}>{planData.final_gsm} gsm</td>
                              

                    </tr>
                  
                  </tbody>
                </Table>}
                


            </Collapse>

            

             </ComponentCard5>
      </ComponentCard5>
    </>
  );
};


export default SmallRollViewS;