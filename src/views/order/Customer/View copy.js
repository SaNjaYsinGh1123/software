import React ,{useState} from 'react';
import {
  Row,
  Button,
  Collapse,
  Col,
  Table
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import ComponentCard1 from '../../../components/ComponentCard1';
import ComponentCard4 from '../../../components/ComponentCard4';
import 'react-table-v6/react-table.css';

const JumbotronComponent = () => {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);

  const toggle = () => setCollapse(!collapse);
  const handleEditAdd = () => {
    navigate('/order/orders/add');
  };

  const handlePendingReport = () => {
    navigate('/order/customers/pending-report');
  };
  
  return (
    <>
      <ComponentCard1 title="">
              <Row>
                <Col md="12">
                  <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => handleEditAdd()}>
                    Edit Customer
                  </Button>
                </Col>
                
              </Row>

              <Row>
                 <Col md="6">
                    <ComponentCard4>
                        <div className="order-view-page-flex">
                          <div><i className="bi-person-circle my-list-color"/>Company Name : Aqualite Industries Pvt. Ltd.</div>
                        </div>
                    </ComponentCard4>

                    <div style={{background:'rgb(246 246 246)',padding:'10px',display:'flex',justifyContent:'space-between'}}>
                        <div>
                            <i className="bi-geo-alt my-list-color" style={{fontSize:'19px'}}/> 
                            All Addresses Details
                        </div>
                        <div style={{}}>
                             <Button  className="my-btn-color" onClick={()=>{handlePendingReport()}} >Add Address</Button>
                        </div>
                    </div>

                       <div className="my-btn-color" onClick={toggle.bind(null)} style={{textAlign:'center',color:'white',marginBottom:'0px',padding:'5px'}}> Address 1  <span className=""  style={{textAlign:'center',background:"white",color:'blue',marginBottom:'0px',borderRadius:'4px',padding:'1px'}}>Manufacturing unit</span></div>
                        
                        <Collapse isOpen={collapse}>
                          <ComponentCard4>
                              
                              <div style={{background:'rgb(246 246 246)',padding:'10px',display:'flex',justifyContent:'space-between'}}>
                                  <div>
                                      <i className="bi-geo-alt my-list-color" style={{fontSize:'19px'}}/> 
                                      Address Details
                                  </div>
                                  <div style={{}}>
                                      <Button  className="my-btn-color" onClick={()=>{handlePendingReport()}} >Edit Address</Button>
                                  </div>
                              </div>
                              <div className="order-view-page-flex-temp">
                                <div>Manufacturing Unit</div> 
                                <div>Site- 308, HSIIDC, Sec-17,</div> 
                                <div>Footwear Park,</div> 
                                <div>Bahadurgarh</div> 
                                <div> Haryana - 06</div> 
                                <div> 124507, India</div> 
                                <div> GST No. : 06AAACF2054Q1ZI</div> 
                              </div>

                              <Table className='table-margin-zero ' responsive size="sm">
                                <thead>
                                  <tr>
                                    <th colSpan={20}>
                                    <p style={{background:'aliceblue',marginBottom:'0px'}}><i className="bi bi-person my-bell-color" style={{fontSize:'19px'}}/>Representatives Details</p>
                                    </th>
                                    </tr>
                                  <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Designation</th>
                                    <th scope="col">Mobile</th>
                                    
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                      <td>Suraj Ghosh</td>
                                      <td>suraj.ghosh@aqualiteindia.com</td>
                                      <td>Store Keeper</td>
                                      <td>+91-8683800636 </td>
                                  </tr>
                                
                                </tbody>
                              
                              </Table>
                          </ComponentCard4>
                        </Collapse>

                        
                 </Col>

                <Col md="6">
                    <ComponentCard4>
                        <Table className='table-margin-zero ' responsive size="sm">
                            <thead>
                              <tr>
                                <th colSpan={20}>
                                <p style={{background:'aliceblue',marginBottom:'0px'}}><i className="bi bi-person my-bell-color" style={{fontSize:'19px'}}/>Company Representatives Details</p>
                                </th>
                                </tr>
                              <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Mobile</th>
                                
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                  <td>Suraj Ghosh </td>
                                  <td>suraj.ghosh@aqualiteindia.com</td>
                                  <td>Store Keeper</td>
                                  <td>+91-8683800636 </td>
                              </tr>
                            
                            </tbody>
                          
                          </Table>
                    </ComponentCard4>

                    <ComponentCard4>
                      <div className='table-margin'>
                      <Table className='table-margin-zero order-table-button-x' size="sm">
                      
                          <Row  style={{background:'rgb(246 246 246)',padding:'2px'}}>
                            <Col md="6">
                              <div style={{margin:'5px 0px'}}>
                                <div><i className="bi bi-copy  my-calander-color" style={{fontSize:'20px',marginRight:'1px'}}/> Credit Alerts</div> 
                              </div>
                            </Col>
                            <Col md="6" style={{padding:'5px 0px'}}>

                              <Button  className="btn mybtncustomer btn-secondary" outline color="info">Add Payment</Button>
                              <Button  className="btn mybtncustomer btn-secondary" outline color="danger">View Ledger</Button>
                            </Col>
                          </Row>
                          
                        </Table>
                        
                        <div>
                          <div className="order-history">
                              <div>Outstanding Balance : 460.00</div>
                              <div>Credit Limit : 50,000,000.00</div>
                              <div>Days Limit : 90 Days</div>
                          </div>
                          <ul>
                            <li>Invoice TCINV/22-23/0632 of  172,426.00 on 01 Jun, 2022 has been overdue  460.00 for more than 90 days</li>
                          </ul>
                        </div>
                      </div>
                    </ComponentCard4>

                    <ComponentCard4>
                      <div className='table-margin'>
                      <Table className='table-margin-zero order-table-button-x' size="sm">
                      
                          <Row  style={{background:'rgb(246 246 246)',padding:'2px'}}>
                            <Col md="4">
                              <div style={{margin:'5px 0px'}}>
                                <div><i className="bi bi-copy  my-calander-color" style={{fontSize:'20px',marginRight:'1px'}}/>Pending Payments</div> 
                              </div>
                            </Col>
                            <Col md="8" style={{padding:'5px 0px'}}>

                              <Button  className="btn mybtncustomer btn-secondary" outline color="info">Send On</Button>
                              <Button  className="btn mybtncustomer btn-secondary" outline color="danger">Send On</Button>
                              <Button  className="btn mybtncustomer btn-secondary" outline color="danger">View Pending Payments</Button>
                            </Col>
                          </Row>
                          
                        </Table>
                        
                        <div>
                          <div className="order-history">
                              <div>Email History</div>
                                <div><i className="bi bi-arrow-right my-eye-color" style={{fontSize:'19px',marginRight:'2px'}}/>No history found</div>
                          </div>
                        
                          <div className="order-history">
                              <div>Whatsapp History</div>
                                <div><i className="bi bi-arrow-right my-eye-color" style={{fontSize:'19px',marginRight:'2px'}}/>No history found</div>
                          </div>
                        </div>
                      </div>
                    </ComponentCard4>

                    <ComponentCard4>
                          <Row  style={{background:'rgb(246 246 246)',padding:'2px'}}>
                            <Col md="9">
                              <div style={{margin:'5px 0px'}}>
                                <div><i className="bi bi-copy  my-calander-color" style={{fontSize:'20px',marginRight:'1px'}}/> Orders</div> 
                              </div>
                            </Col>
                            <Col md="3" style={{padding:'5px 0px'}}>
                              <Button  className="btn mybtncustomer btn-secondary" outline color="info">View Orders</Button>
                            </Col>
                          </Row>
                    </ComponentCard4>

                    <ComponentCard4>
                          <Row  style={{background:'rgb(246 246 246)',padding:'2px'}}>
                            <Col md="9">
                              <div style={{margin:'5px 0px'}}>
                                <div><i className="bi bi-copy  my-calander-color" style={{fontSize:'20px',marginRight:'1px'}}/> Pending Orders Report</div> 
                              </div>
                            </Col>
                            <Col md="3" style={{padding:'5px 0px'}}>
                              <Button  className="btn mybtncustomer btn-secondary" onClick={()=>{handlePendingReport()}} outline color="info">View Report</Button>
                            </Col>
                          </Row>
                    </ComponentCard4>

                    <ComponentCard4>
                          <Row  style={{background:'rgb(246 246 246)',padding:'2px'}}>
                            <Col md="9">
                              <div style={{margin:'5px 0px'}}>
                                <div><i className="bi bi-copy  my-calander-color" style={{fontSize:'20px',marginRight:'1px'}}/>Production and Sales Report(3 months)</div> 
                              </div>
                            </Col>
                            <Col md="3" style={{padding:'5px 0px'}}>
                              <Button  className="btn mybtncustomer btn-secondary" outline color="info">View Reports</Button>
                            </Col>
                          </Row>
                    </ComponentCard4>
                 </Col>
              </Row>
         
      </ComponentCard1>
    </>
  );
};

export default JumbotronComponent;
