import React, { useEffect, useState } from 'react';
import {
  Row,
  Button,
  Col,
  Table
} from 'reactstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import ComponentCard1 from '../../components/ComponentCard1';
import ComponentCard4 from '../../components/ComponentCard4';
import 'react-table-v6/react-table.css';

const JumbotronComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {id,name:Name,company_name:companyName,cim_no:cimNo,uam_no:uamNo,factoryproductionlines:TestDirection,is_trashed:isTrashed} = location.state || {}; 
  const [data,setData] = useState([]);
  console.log('TestDirection',TestDirection,isTrashed,id);

  const handleEditAdd = () => {
    navigate('/factories/edit',{state: location.state});
  };

  // const handlePendingReport = () => {
  //   navigate('/order/customers/pending-report');
  // };

  const handleEditAddress = ()=>{
    
    console.log('address');
     navigate('/addresses/edit', {state:id});
   } 

  useEffect(()=>{
    const fetchData = async ()=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public//addresses?factory_id=${id}`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
   console.log('responsejson',result);
   if(result.addresses.length !== 0){
     setData(result.addresses[0]);
   }
    }
    fetchData();
  },[])
  console.log('data',data);
  return (
    <>
      <ComponentCard1 title="">
              <Row>
                <Col md="12">
                  <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => handleEditAdd()}>
                    Edit Factory
                  </Button>
                </Col>
                
              </Row>

              <Row>
                 <Col md="3">
                    <ComponentCard4>
                        <div className="order-view-page-flex-temp">
                          <div><i className="bi bi-briefcase my-list-color" style={{marginRight:'10px'}}/>Factory Name</div>
                          <div>{Name}</div>
                        </div>
                    </ComponentCard4>
                 </Col>
                 <Col md="3">
                    <ComponentCard4>
                        <div className="order-view-page-flex-temp">
                        <div><i className="bi bi-bar-chart-line my-list-color" style={{marginRight:'10px'}}/>Company Name</div>
                          <div>{companyName}</div>
                        </div>
                    </ComponentCard4>
                 </Col>
                 <Col md="3">
                    <ComponentCard4>
                        <div className="order-view-page-flex-temp">
                        <div><i className="bi bi-bar-chart-line my-list-color" style={{marginRight:'10px'}}/>CIN No</div>
                          <div>{cimNo}</div>
                        </div>
                    </ComponentCard4>
                 </Col>
                 <Col md="3">
                    <ComponentCard4>
                        <div className="order-view-page-flex-temp">
                        <div><i className="bi bi-bar-chart-line my-list-color" style={{marginRight:'10px'}}/>UAM No</div>
                          <div>{uamNo}</div>
                        </div>
                    </ComponentCard4>
                 </Col>

                
              </Row>

              <Row>
                 <Col md="6">
                     <ComponentCard4>
                      <div className='table-margin'>
                      <Row  style={{background:'rgb(246 246 246)',padding:'2px'}}>
                            <Col md="12">
                              <div style={{margin:'5px 0px'}}>
                                <div><i className="bi bi-text-center  my-list-color" style={{fontSize:'20px',marginRight:'1px'}}/> Production Lines</div> 
                              </div>
                            </Col>
                          </Row>
                      <Table size="sm">
                          <tbody>
                            {TestDirection.map((item,index)=>{
                               
                               return <>
                                       <tr key={item.id} className={index%2 === 0 ? '':'my-bg-alice'}>
                                          <td>
                                            Production Line {index+1}
                                          </td>
                                          <td>
                                            {item.name}
                                          </td>
                                       </tr>
                                     </>
                            })}
                            
                          </tbody>
                        </Table>
                        
                        
                      </div>
                    </ComponentCard4>

                    

                        
                 </Col>

                <Col md="6">
                <ComponentCard4>
                              
                              <div style={{background:'rgb(246 246 246)',padding:'10px',display:'flex',justifyContent:'space-between'}}>
                                  <div>
                                      <i className="bi-geo-alt my-list-color" style={{fontSize:'19px'}}/> 
                                      Address Details
                                  </div>
                                  <div style={{}}>
                                      <Button  className="my-btn-color" onClick={()=>{handleEditAddress()}} disabled={data.length === 0}> Edit Address</Button>
                                  </div>
                              </div>
                              {data.length !== 0?
                              <>
                               <div className="order-view-page-flex-temp">
                                <div>{data.address_type_id}</div> 
                                <div>{data.address_alias}</div> 
                                <div>{data.address_line_1}</div> 
                                <div>{data.address_line_2}</div> 
                                <div>{data.city_id}</div> 
                                <div>{data.state_id} - 06</div> 
                                <div>{data.pincode}, {data.country_id}</div> 
                                <div> GST No. : {data.gst}</div> 
                              </div>
                                {data.addressrepresentatives ? data.addressrepresentatives.map((item)=>{
                                  return <>
                                   <Table className='table-margin-zero ' key={item} responsive size="sm">
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
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.designation}</td>
                                            <td>{item.mobile} </td>
                                        </tr>
                                      
                                      </tbody>
                              
                                   </Table>
                                   </>
                                }):""
                              }   
                              </>
                               :"" }                     
                          </ComponentCard4>
                 </Col>
              </Row>
      </ComponentCard1>
    </>
  );
};

export default JumbotronComponent;
