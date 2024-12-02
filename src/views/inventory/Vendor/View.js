import React ,{useState,useEffect} from 'react';
import {
  Row,
  Button,
  Collapse,
  Col,
  Table
} from 'reactstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import ComponentCard1 from '../../../components/ComponentCard1';
import ComponentCard4 from '../../../components/ComponentCard4';
import 'react-table-v6/react-table.css';
import AddressBlock from './AddressBlock';

const JumbotronComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState([]);
  const params = new URLSearchParams(location.search);
  const id  = params.get('id');

  const [data,setData] = useState([]);
  const [data1,setData1] = useState([]);


  console.log('location',location.state)
  const toggle = (index) => {
    const newArray = [...collapse];
    newArray[index]= !newArray[index];
    setCollapse(newArray);
  }
  const handleEditcustomer = () => {
    console.log('vendor edit in vendor view',id);
    navigate(`/inventory/vendors/edit/?id=${id}`);
  };

  // const handlePendingReport = () => {
  //   navigate('/order/customers/pending-report');
  // };

  const handleAddAddress = ()=>{
    console.log('address');
     navigate(`/inventory/vendors/address/add/?id=${id}`);
   }



const handleEditAddress = (addressId)=>{
     console.log('address');
     navigate(`/inventory/vendors/address/edit/?id=${addressId}`);
   } 

   useEffect(()=>{
    const fetchData = async ()=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/addresses/?vendor_id=${id}`,{
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
    
     setCollapse(Array(result.addresses.length).fill(false));
     setData(result.addresses);
   }
  }
    const fetchData1 = async ()=>{
      const token = localStorage.getItem('userToken');
      try {
        const response = await fetch(`https://factory.teamasia.in/api/public/vendors/${id}`,{
          method:'GET',
          headers:{
            'Authorization': `Bearer ${token}`
          }
          });
          if(response.status === 200){
            const result = await response.json();
            console.log('responsejson',result);
            setData1(result);
          }
          else {
            // If the status is not 200, navigate to 404
            navigate('/404');
          }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        navigate('/404');  // In case of any unexpected error, navigate to the 404 pa
      }
      
  }
    fetchData1();
    fetchData();
  },[]);
  
  console.log('data',data);

  return (
    <>
      <ComponentCard1 title="">
              <Row>
                <Col md="12">
                  <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => handleEditcustomer()}>
                    Edit Vendor
                  </Button>
                </Col>
                
              </Row>

              <Row>
                 <Col md="6">
                    <ComponentCard4>
                        <div className="order-view-page-flex">
                          <div><i className="bi-person-circle my-list-color"/>Company Name : <span style={{fontWeight:'900',textTransform:'uppercase'}}>{data1.company_name}</span></div>
                        </div>
                    </ComponentCard4>

                    <div style={{background:'rgb(246 246 246)',padding:'10px',display:'flex',justifyContent:'space-between'}}>
                        <div>
                            <i className="bi-geo-alt my-list-color" style={{fontSize:'19px'}}/> 
                            All Addresses Details
                        </div>
                        <div style={{}}>
                             <Button  className="my-btn-color" onClick={()=>{handleAddAddress()}} >Add Address</Button>
                        </div>
                    </div>

                        
                        {data?.length !== 0?
                          data?.map((AddressItem,index)=>(
                            <div key={AddressItem.id}>
                            
                            {/* <div className="my-btn-color" onClick={()=>toggle(index)} style={{textAlign:'center',color:'white',marginBottom:'2px',padding:'5px'}}> Address {index+1}  <span className=""  style={{textAlign:'center',background:"white",color:'blue',marginBottom:'0px',borderRadius:'4px',padding:'1px'}}> </span></div> */}
                            <div className="my-btn-color" onClick={()=>toggle(index)} style={{textAlign:'center',color:'white',marginBottom:'2px',padding:'5px'}}> Address {index+1}</div>
                            <Collapse isOpen={collapse[index]}>
                            <ComponentCard4 >
                              
                              <div style={{background:'rgb(246 246 246)',padding:'10px',display:'flex',justifyContent:'space-between'}}>
                                  <div>
                                      <i className="bi-geo-alt my-list-color" style={{fontSize:'19px'}}/> 
                                      Address Details
                                  </div>
                                  <div style={{}}>
                                      <Button  className="my-btn-color" onClick={()=>{handleEditAddress(AddressItem.id)}} disabled={AddressItem.length === 0}> Edit Address</Button>
                                  </div>
                              </div>
                              
                             <AddressBlock data={AddressItem}/>
                                            
                          </ComponentCard4>
                        </Collapse>
                        </div>
                          
                          ))
                        
                          :"" } 

                        
                 </Col>

                <Col md="6">
                    <ComponentCard4>
                      {data1?.length !== 0 && data1?.vendorcompanyrepresentatives?.length !== 0 ?
                       data1?.vendorcompanyrepresentatives?.map((custRep)=>(
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
                                                        <td>{custRep.name}</td>
                                                        <td>{custRep.email}</td>
                                                        <td>{custRep.designation}</td>
                                                        <td>{custRep.mobile} </td>
                                                    </tr>
                                                  
                                                  </tbody>
                                                
                                                </Table>
                       ))
                       :""}
                          
                        
                    </ComponentCard4>


                 </Col>
              </Row>
         
      </ComponentCard1>
    </>
  );
};

export default JumbotronComponent;
