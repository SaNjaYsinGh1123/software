import React, { useState,useEffect} from 'react';
import {
  Button,
  Row,
  Table,
  Col,
  Collapse,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Barcode from 'react-barcode';
import ProgressBar from 'react-bootstrap/ProgressBar';
// import { stateFromHTML } from 'draft-js-import-html';
import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';
// import Barcode1 from "../../../assets/images/bg/barcode1.png"
import AddFault from './addFault'
import CreateSmallRoll from './createSmallRoll'
import UpdateSmallRoll from './updateSmallRoll'
import QaViewSmall from './QaViewSmall'
import OrderProduct from  './orderProduct';

const JumbotronComponent = () => {
 
  // const var1 = "Total: 170 meters"
  // const var2 = "Remaining: 9.00 meters"
  const navigate = useNavigate();
  const location = useLocation();
  console.log('location in ad',location.state);
  const {rollItem,customerName,plans,QaData } = location.state;
  const [collapseProduct, setCollapseProduct] = useState(false);
  const [collapseNote, setCollapseNote] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [faultData,setFaultData] = useState([]);
  const [severityData,setSeverityData] = useState([]);
  const [severity,setSeverity] = useState({name:''});
  const [planData,setPlanData] = useState({plan_date:'0000-01-1',created_at:'0000-01-1'});
  const [Qa,setQa] = useState({});
  const [order,setOrder] = useState({created_at:'0000-01-1',expected_delivery_date:'0000-01-1'});
  const [gradeData,setGradeData] = useState([]);
  const [qaData,setQaData] = useState([]);
  const [JumboUpdateDataFromPlan, setJumboUpdateDataFromPlan] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);


  const toggleProduct = () =>{   
    setCollapseProduct(!collapseProduct)
  }

  
  function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    // Use Intl.DateTimeFormat to format the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }

  useEffect(()=>{
      const plan = plans.find((p)=> p.id === rollItem.production_plan_id);
      console.log('date',plan);
      if(plan){
        setPlanData(plan);
      }

      const QaNew = QaData.find((p)=> p.id === rollItem.qa_pe_id);
      console.log('date',QaNew);
      if(QaNew){
        setQa(QaNew);
      }
  },[])
 
  const toggleNote = () =>{   
    setCollapseNote(!collapseNote)
  }

  const LabReportFunction = ()=>{
    navigate('/operations/Lab-Report',{state:{rollItem}});
 }

 const addFaultTogglefunction = ()=>{
  console.log('click');
  setModal(!modal);
}

const handleCreateSmallRoll = () => {
  // Callback function to handle jumbo roll creation
  console.log('something happened !');
  setRefreshKey(oldKey => oldKey + 1);
};

const addRollTogglefunction = ()=>{
  console.log('click');
  setModal1(!modal1);
}

const  updateRollTogglefunction = ()=>{
  console.log('click');
  setModal2(!modal2);
}

const setterJumboUpdateDataFromPlan = (product)=>{
  console.log('product',product);
  setJumboUpdateDataFromPlan(product);
  updateRollTogglefunction();
}

useEffect(()=>{
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
   const resultX = result.severities.slice();
   resultX.push({id:'x',name:'Choose'});
   setSeverityData(resultX); 
  }

  const fetchData1 = async(saverityId)=>{
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

  const fetchOrderData = async()=>{
   const token = localStorage.getItem('userToken');
   // console.log('token',token);
   const response = await fetch(`https://factory.teamasia.in/api/public/orders/${rollItem.order_id}`, {
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
   fetchData1(result.severity_id);

   console.log(order)
  }

  const fetchGradeData = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch('https://factory.teamasia.in/api/public/grades?is_trashed=0', {
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
    const resultX = result.grades.slice();
    resultX.push({id:'x',name:'Choose'});
    setGradeData(resultX); 
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
  
  fetchGradeData();
  fetchQaData();
  fetchData2();
  fetchOrderData();
  fetchData();

},[]);

  return (
    <>
       {modal ?<AddFault modal={modal} faultData={faultData} rollItem ={rollItem} severityData={severityData} toggle={addFaultTogglefunction}/>:null}
       {modal1?<CreateSmallRoll modal={modal1} rollItem ={rollItem} handleCreateSmallRoll={handleCreateSmallRoll} faultData={faultData} data1={gradeData} data2={qaData} severityData={severityData} toggle={addRollTogglefunction}/>:null}
       {modal2?<UpdateSmallRoll modal={modal2} rollItem ={rollItem} handleCreateSmallRoll={handleCreateSmallRoll} JumboUpdateDataFromPlan ={JumboUpdateDataFromPlan} faultData={faultData} data1={gradeData} data2={qaData} severityData={severityData} toggle={updateRollTogglefunction}/>:null}
        
        <ComponentCard5>

          <Card>
            <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
            </CardTitle>
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row style={{display:'none'}}>
                  <Col md="8">
                    <FormGroup>
                      <Label>Jumbo Roll</Label>
                      <Input type="text" placeholder="Enter Roll Code" />
                      <FormText className="muted"></FormText>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                    <Button type="submit" className="btn my-btn-color-yellow" style={{marginTop:"28px"}}>
                        Load Jumbo Roll
                    </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </ComponentCard5>

      <ComponentCard5 title="">
            <ComponentCard5>

               <Table responsive className='table-margin-zero QapViewtable' size="sm">
                  <thead>
                    <tr>
                      <th scope="col" >
                        <div><Barcode value={`JUMBO${rollItem.id}`} height={20} /></div>
                      </th>
                      <th scope="col">Total: {rollItem.quantity} meters</th>
                      <th scope="col">Remaining: ? meters</th>

                      
                      <th scope="col"><Button className='my-btn-color' style={{whiteSpace:'nowrap'}} onClick={()=>addRollTogglefunction()}>Create Small Roll</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' style={{whiteSpace:'nowrap'}} onClick={()=>addFaultTogglefunction()}>Add Fault</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' style={{whiteSpace:'nowrap'}} onClick={()=>LabReportFunction()}>Lab Report</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>Print</Button></th>
                      {/* <th scope="col"><Button className='my-btn-mo-color'>More</Button></th> */}
                      
                    </tr>
                    
                    <tr >
                      <th scope="col" ><div style={{marginTop:'20px'}}>Planned On :{formatDate(planData.plan_date)} </div></th>
                      <th scope="col">Created On : {formatDate(planData.created_at)}</th>
                      <th scope="col">Production Engineer : {Qa.name}</th>
                    </tr>
                                        
                  </thead>
                  
                </Table>
                <div style={{padding: "25px 0px 0px 0px",border: "1px solid #dee2e6"}}>
                  <Row>
                    <Col className='col-10'>
                    <div style={{marginLeft:'10px'}}>
                      {customerName}(#{rollItem.product_id}), Product({rollItem.product_id})   
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
                        <td>{order.status_id}</td>
                    </tr>
                  
                  </tbody>
                </Table>

              <OrderProduct productID = {rollItem.product_id } />

                

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
                    {rollItem.note}
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
                

                <div style={{padding: "25px 0px 10px 0px",border: "1px solid #dee2e6"}}>
                  <Row style={{marginBottom:'10px'}}> 
                    <Col className='col-10'>
                      <div>
                        {" Jumbo Roll Reverse Life Cycle Assessment (RLCA)" }
                      </div>
                     <ProgressBar  now={220} label={`${170}m`} className='progress_bar_color1' variant="info"/>
                    </Col>
                  </Row>
                   <Row>
                      <Col className='col-12' >
                        <div style={{padding:"20px 10px", background:'#8EF3C5'}}>
                          No faults have been reported, but remain alert for any unexpected faults.
                        </div>
                       </Col>
                   </Row>
                  <Row style={{marginBottom:'10px'}}>
                    <Col className='col-10'>
                    <div>
                        {" Reverse Life Cycle Assessment Corrected " }
                      </div>
                     <ProgressBar  now={220} label={`${170}m`} className='progress_bar_color1' variant="warning"/>
                    </Col>
                  </Row>
                </div>
             </ComponentCard5>

             <QaViewSmall Refreshkey={refreshKey} product={rollItem.product_id} data1={gradeData} updateRollTogglefunction={setterJumboUpdateDataFromPlan}/>
      </ComponentCard5>
    </>
  );
};

export default JumbotronComponent;
