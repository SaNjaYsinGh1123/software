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
import { useNavigate } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';
import Barcode from "../../../assets/images/bg/barcode.png"
import Barcode1 from "../../../assets/images/bg/barcode1.png"
import AddFault from './addFault'
import CreateSmallRoll from './createSmallRoll'


const JumbotronComponent = () => {
 
  const var1 = "Total: 170 meters"
  const var2 = "Remaining: 9.00 meters"
  const navigate = useNavigate();

  const [collapse, setCollapse] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [faultData,setFaultData] = useState([]);
  const [severityData,setSeverityData] = useState([]);
  const [data1,setData1] = useState([]);
  const [data2,setData2] = useState([]);

  const toggle = () =>{   
    setCollapse(!collapse)
  }

  const LabReportFunction = ()=>{
    navigate('/operations/Lab-Report');
 }

 const addFaultTogglefunction = ()=>{
  console.log('click');
  setModal(!modal);
}

 const addRollTogglefunction = ()=>{
  console.log('click');
  setModal1(!modal1);
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
  const fetchData1 = async()=>{
   const token = localStorage.getItem('userToken');
   // console.log('token',token);
   const response = await fetch(`https://factory.teamasia.in/api/public/severities/?is_trashed=0`, {
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
   setSeverityData(result.severities); 
  }
  const fetchData2 = async () => {
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
    setData1(resultX); 
  };

  const fetchData3 = async () => {
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
    setData2(resultX); 
  };

  fetchData3();
  fetchData2();
  fetchData1();
  fetchData();

},[]);

  return (
    <>
       <AddFault modal={modal} faultData={faultData} severityData={severityData} toggle={addFaultTogglefunction}/>
       <CreateSmallRoll modal={modal1} faultData={faultData} data1={data1} data2={data2} severityData={severityData} toggle={addRollTogglefunction}/>
        
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
                <Row>
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
                        <div><img src={Barcode1} style={{maxWidth:'250px' }} alt='barcode'/></div>
                      </th>
                      <th scope="col">{var1}</th>
                      <th scope="col">{var2}</th>

                      <th scope="col"><Button className='my-btn-color' style={{whiteSpace:'nowrap'}} onClick={()=>addRollTogglefunction()}>Create Small Roll</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' style={{whiteSpace:'nowrap'}} onClick={()=>addFaultTogglefunction()}>Add Fault</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' style={{whiteSpace:'nowrap'}} onClick={()=>LabReportFunction()}>Lab Report</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>Print</Button></th>
                      <th scope="col"><Button className='my-btn-mo-color'>More</Button></th>
                      
                    </tr>

                    <div style={{marginTop:'10px !important'}}>
                      <div style={{marginTop:'10px !important',display:'flex'}}>
                       <div>{var1}</div>
                       <div>{var2}</div>
                       <div>{var1}</div>
                      </div>                  
                    </div>
                  </thead>
                  
                </Table>
                <div style={{padding: "25px 0px 0px 0px",border: "1px solid #dee2e6"}}>
                  <Row>
                    <Col className='col-10'>
                      {" Combit Footwear Pvt. Ltd. (#1409) , Product(1409_1) "}
                    </Col>
                    <Col className='col-2'>
                    <Button className='' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }}>
                      <i className={collapse ?'bi-caret-down-square-fill':'bi-caret-right-square-fill'} />
                    </Button>
                    </Col>
                  </Row>
                </div>
                
                
            <Collapse isOpen={collapse}>
                <Table responsive className='table-margin-zero QapViewtable' size="sm">
                  <thead>
                    <tr>
                      <th scope="col">Grain</th>
                      <th scope="col">Color</th>
                      <th scope="col">Quality</th>
                      <th scope="col">Thickness</th>
                      <th scope="col">Fabric</th>
                      <th scope="col">Fabric Color</th>
                      <th scope="col">HSN</th>
                      <th scope="col">Price($)</th>
                      <th scope="col">Tax</th>
                      <th scope="col">Embossing</th>
                      <th scope="col">Printing</th>
                      <th scope="col">CIR.</th>
                      <th scope="col">AT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td >1001 A</td>
                              <td>black</td>
                              <td>Q2/CX0Y13Z03</td>
                              <td>1.7 mm </td>
                              <td>WP.matty_185g_120gsm</td>
                              <td>black</td>
                              <td>59031090</td>
                              <td>313.6</td>
                              <td>12%</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>N/A</td>

                    </tr>
                  
                  </tbody>
                </Table>

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
                      <td>N/A</td>
                              <td>200 gsm</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>910 gsm</td>
                              <td>175 PHR</td>
                              <td>120 gsm</td>
                              <td>75 PHR</td>
                              <td>1350 gsm</td>
                              

                    </tr>
                  
                  </tbody>
                </Table>
            </Collapse>

            <div style={{padding: "25px 0px 10px 0px",border: "1px solid #dee2e6"}}>
                  <Row>
                    <Col className='col-10'>
                    {" Small Rolls (Total : 8, Qty : 161 m, Avg Gsm : 1334.69 g/m2) "}
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
                <Table responsive>
               
                  
                  <thead>
                    <tr>
                      <th scope="col">S. No.</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Grade</th>
                      <th scope="col">Weight</th>
                      <th scope="col">BIN</th>
                      <th scope="col">GSM(g/m2)</th>
                      <th scope="col">Code</th>
                      <th scope="col">RLCA</th>
                      <th scope="col">Action</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>17 m</td>
                      <td>Ist</td>
                      <td>30.92 kg</td>
                      <td></td>
                      <td>1299.16</td>
                      <td><img src={Barcode} alt='barcode'/></td>
                      <td><ProgressBar  now={220} label={`${17}m`} className='progress_bar_color' variant="info"/></td>
                      <td>
                        <td ><Button ><i className="bi bi-printer-fill my-bell-color" /></Button></td>
                      </td>
                    </tr>

                    <tr>
                      <td>2</td>
                      <td>17 m</td>
                      <td>Ist</td>
                      <td>30.92 kg</td>
                      <td></td>
                      <td>1299.16</td>
                      <td><img src={Barcode} alt='barcode'/></td>
                      <td><ProgressBar now={220} label={`${17}m`} className='progress_bar_color' variant="info"/></td>
                      <td>
                        <td ><Button ><i className="bi bi-printer-fill my-bell-color" /></Button></td>
                      </td>
                    </tr>

                    <tr>
                      <td>3</td>
                      <td>17 m</td>
                      <td>Ist</td>
                      <td>30.92 kg</td>
                      <td></td>
                      <td>1299.16</td>
                      <td><img src={Barcode} alt='barcode'/></td>
                      <td><ProgressBar now={220} label={`${17}m`} className='progress_bar_color' variant="info"/></td>
                      <td>
                        <td ><Button ><i className="bi bi-printer-fill my-bell-color" /></Button></td>
                      </td>
                    </tr>

                    <tr>
                      <td>4</td>
                      <td>17 m</td>
                      <td>Ist</td>
                      <td>30.92 kg</td>
                      <td></td>
                      <td>1299.16</td>
                      <td><img src={Barcode} alt='barcode'/></td>
                      <td><ProgressBar now={220} label={`${17}m`} className='progress_bar_color' variant="info"/></td>
                      <td>
                        <td ><Button ><i className="bi bi-printer-fill my-bell-color" /></Button></td>
                      </td>
                    </tr>

                    <tr>
                      <td>5</td>
                      <td>17 m</td>
                      <td>Ist</td>
                      <td>30.92 kg</td>
                      <td></td>
                      <td>1299.16</td>
                      <td><img src={Barcode} alt='barcode'/></td>
                      <td><ProgressBar now={220} label={`${17}m`} className='progress_bar_color' variant="info"/></td>
                      <td>
                        <td ><Button ><i className="bi bi-printer-fill my-bell-color" /></Button></td>
                      </td>
                    </tr>
                  
                  </tbody>
                </Table>
                
               

             </ComponentCard5>
      </ComponentCard5>
    </>
  );
};

export default JumbotronComponent;
