import React, { useState,useEffect} from 'react';
import {
  Button,
  Row,
  Table,
  Col,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Barcode from 'react-barcode';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// import { stateFromHTML } from 'draft-js-import-html';
import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';

// import Barcode1 from "../../../assets/images/bg/barcode1.png"
import AddFault from './addFault'
import MyProgressBarJumboR from '../QaP/MyProgressBarJumboR';
import MyProgressBarJumboCorrected from '../QaP/MyProgressBarJumboCorrected';
// ..................note.................
// import OrderProduct from  './orderProduct';
// ..................note.................


import OrderProduct from  './orderProduct';

const JumbotronComponent = () => {
 
  // const var1 = "Total: 170 meters"
  // const var2 = "Remaining: 9.00 meters"
  const navigate = useNavigate();
  const location = useLocation();
  console.log('location in ad',location.state);
  // const {rollItem,customerName,plans,QaData } = location.state;
  const {id} = location.state;
  const [collapseProduct, setCollapseProduct] = useState(false);
  const [collapseNote, setCollapseNote] = useState(false);
  const [rollItem, setRollItem] = useState(undefined);
  const [modal, setModal] = useState(false);
  const [faultData,setFaultData] = useState([]);
  const [severityData,setSeverityData] = useState([]);
  const [severity,setSeverity] = useState({name:''});
  const [planData,setPlanData] = useState({plan_date:'0000-01-1',created_at:'0000-01-1'});
  const [Qa,setQa] = useState({});
  const [QaData,setQaData] = useState([]);
  const [order,setOrder] = useState({created_at:'0000-01-1',expected_delivery_date:'0000-01-1'});
  

  const JumboPrint = (dispatchItem)=>{
    console.log('hi',dispatchItem);
    navigate('/operations/jumbo/print',{state: dispatchItem});
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
    const date = new Date(inputDate);
  
    // Use Intl.DateTimeFormat to format the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }

  useEffect(()=>{
    if(rollItem){
      const QaNew = QaData.find((p)=> p.id === rollItem?.qa_pe_id);
      console.log('date',QaNew);
      if(QaNew){
        setQa(QaNew);
      }
    }
      
  },[rollItem,QaData])
 

  const toggleNote = () =>{   
    setCollapseNote(!collapseNote)
  }

  const LabReportFunction = ()=>{
    navigate('/operations/Lab-Report',{state:{rollItem}});
 }
  const BomReportFunction = ()=>{
     console.log(rollItem);
    navigate('/operations/Bom-Report/view',{state:{productionPlanId : rollItem?.production_plan_id}});
 }
  const ParametersReportFunction = ()=>{
    navigate('/operations/Production-Report/view',{state:{productionPlanId : rollItem?.production_plan_id}});
 }

 const addFaultTogglefunction = ()=>{
  console.log('click');
  setModal(!modal);
}

const  viewOrder = (orderID) => {
  console.log('hi');
  navigate('/order/orders/view',{state:{id:orderID}});
};

useEffect(()=>{
  const fetchPlans = async (productionPlanID) => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/productionplan/${productionPlanID}`, {
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
    // console.log("responsejson1",result.dispatch);
    setPlanData(result); 
  };

  const fetchQaData = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch('https://factory.teamasia.in/api/public/qapateams/?is_trashed=0', {
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
    const resultX = result.qapateams.slice();
    resultX.push({id:'x',name:'Choose'});
    setQaData(resultX); 
  };

  const fetchData = async()=>{
   const token = localStorage.getItem('userToken');
   // console.log('token',token);
   const response = await fetch(`https://factory.teamasia.in/api/public/faults/?is_trashed=0`, {
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
   console.log("responsejson",result);
   const resultX = result.faults.slice();
   resultX.push({id:'x',name:'Choose'});
   setFaultData(resultX); 
  }

  const fetchData2 = async()=>{
   const token = localStorage.getItem('userToken');
   // console.log('token',token);
   const response = await fetch(`https://factory.teamasia.in/api/public/severities`, {
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
   console.log("responsejson saverities",result);
   setSeverityData(result.severities); 
  }
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

  const fetchJumboData = async()=>{
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/jumboroll/${id}`, {
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
    console.log("responsejson jumboRoll",result);
    fetchOrderData(result?.[0])
    setRollItem(result?.[0])
    fetchPlans(result?.[0].production_plan_id)
   //  fetchData1();
   }
 
  fetchJumboData();
  fetchPlans();
  fetchQaData();
  fetchData2();
  fetchData();

},[]);

  return (
    <>
       <AddFault modal={modal} faultData={faultData} jumboId={rollItem?.id} severityData={severityData} toggle={addFaultTogglefunction}/>        
       <ComponentCard5 title="">
            <ComponentCard5>

               <Table responsive className='table-margin-zero QapViewtable' size="sm">
                  <thead>
                    <tr>
                      <th scope="col" >
                        <div><Barcode value={`JUMBO${rollItem?.id}`} height={20} /></div>
                      </th>
                      <th scope="col" >Total: {rollItem?.quantity} meters</th>
                      <th scope="col">Remaining: {Number(rollItem?.quantity) - Number(rollItem?.total_small_roll_qauntity)} meters</th>

                      
                      <th scope="col"><Button className='my-btn-color-red' style={{whiteSpace:'nowrap'}} onClick={()=>addFaultTogglefunction()}>Mark Treated</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' style={{whiteSpace:'nowrap'}} onClick={()=>LabReportFunction()}>Lab Report</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' onClick={()=>JumboPrint(rollItem?.id)}>Print</Button></th>
                      <th scope="col" rowSpan={2} colSpan={2} style={{display:'flex',justifyContent:'center',paddingTop:'40px'}}>
                            <UncontrolledDropdown>
                                <DropdownToggle caret className='my-btn-mo-color'>
                                    More
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem className="custom-dropdown-item" onClick={()=>ParametersReportFunction()}>Production Level Parameters</DropdownItem>
                                  <DropdownItem className="custom-dropdown-item" onClick={()=>BomReportFunction()}>BOM Report</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                      </th>
                      
                    </tr>
                    
                    <tr >
                      <th scope="col" ><div style={{marginTop:'40px'}}>Planned On : {formatDate(planData.plan_date)} </div></th>
                      <th scope="col">Created On : {formatDate(planData.created_at)}</th>
                      <th scope="col">Production Engineer : {Qa.name}</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                                        
                  </thead>
                  
                </Table>
                <div style={{padding: "25px 0px 0px 0px",border: "1px solid #dee2e6"}}>
                  <Row>
                    <Col className='col-10'>
                    <div style={{marginLeft:'10px'}}>
                    {planData?.customer_details?.company_name} <Button onClick={()=>viewOrder(rollItem?.order_id)} style={{padding:'0px'}}>(#{rollItem?.order_id})</Button>, Product({rollItem?.product_id})   
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
            <Table responsive className='table-margin-zero QapViewtable' size="sm">
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
                </Table>
                <div style={{padding:'10px',background:"#0000001a"}}>
                  <OrderProduct productID = {rollItem?.product_id } />
                </div>
                <Table responsive size="sm" className="QapViewtable">
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
                </Table>


            </Collapse>

            <div style={{padding: "10px 0px 0px 0px",border: "1px solid #dee2e6"}}>
                  <Row>
                    <Col className='col-10'>
                    <div style={{marginLeft:'10px'}}>
                        Notes
                    </div>
                    </Col>
                    <Col className='col-2'>
                    <Button className='' onClick={toggleNote.bind(null)} style={{ marginBottom: '1rem' }}>
                      <i className={collapseNote ?'bi-caret-down-square-fill':'bi-caret-right-square-fill'} />
                    </Button>
                    </Col>
                  </Row>
                </div>
                
                
            <Collapse isOpen={collapseNote}>
               <ComponentCard5>
                 <div>Note From Order:</div>
                  <div>
                    {order.order_notes}
                  </div>
                 <div>Note From Production</div>
                  <div>
                    {rollItem?.note}
                  </div>
               </ComponentCard5>                
            </Collapse>

            <div style={{padding: "25px 0px 10px 0px",border: "1px solid #dee2e6"}}>
                  <Row>
                    <Col className='col-10'>
                    {/* {" Small Rolls (Total : 8, Qty : 161 m, Avg Gsm : 1334.69 g/m2) "} */}
                    </Col>
                    
                   
                  </Row>
                </div>
                

                <div style={{border: "1px solid #dee2e6"}}>
                  <Row>
                    <Col className='col-10'>
                    {/* {" Small Rolls (Total : 8, Qty : 161 m, Avg Gsm : 1334.69 g/m2) "} */}
                    </Col>
                    {rollItem ?<MyProgressBarJumboR jumboId = {rollItem?.id} containerWidth={Number(rollItem?.quantity)} progressBarId="progress-x"/>:''
                    }
                  </Row>
                  <Row>
                    <Col className='col-10'>
                    {/* {" Small Rolls (Total : 8, Qty : 161 m, Avg Gsm : 1334.69 g/m2) "} */}
                    </Col>
                    {rollItem ?<MyProgressBarJumboCorrected jumboId = {rollItem?.id} containerWidth={Number(rollItem?.quantity)} progressBarId="progress-x"/>:''
                    }
                  </Row>
                </div>
             </ComponentCard5>
       </ComponentCard5>
    </>
  );
};

export default JumbotronComponent;

