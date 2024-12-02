import React ,{useEffect, useState} from 'react';
import {Row,Col,Card,CardBody,CardTitle} from 'reactstrap';

import {useNavigate, useLocation } from 'react-router-dom';


const Payments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [catgoryData,setCatgoryData] = useState()

  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData = async () => {
      try {
      const token = localStorage.getItem('userToken');
      console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/categories/${id}`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('result',response);


      if(response.status === 200){
        const datas = await response.json();
        console.log('result customer',datas);
        if(datas){
          setCatgoryData(datas); 
        }
      }else {
        // If the status is not 200, navigate to 404
        navigate('/404');
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      navigate('/404');  // In case of any unexpected error, navigate to the 404 pa
    }
    }
  
    fetchData();
  }, []);

  return (
   <>
    <Row>
        <Col xs="12" md="5">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          
          <Card className='payment-card'>
            <CardTitle tag="h4" className="py-0 px-4 mb-0">
                <i className="bi bi-list-ul my-eye-color px-1 font-weight-payment" style={{fontSize:'30px'}}/>
                <span style={{position:'relative',bottom:'3px',fontSize:'20px',color:'rgb(37 36 34 / 80%)'}}>
                  Category Name
                </span>
            </CardTitle>
            <CardBody className="py-1" >
              <div  className='px-2'>{catgoryData?.name }</div>
            </CardBody>
          </Card>
        </Col>
   </Row>
      <Row>  
        <Col xs="12" md="5">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          {/* --------------------------------------------------------------------------------*/}
          
          <Card className='payment-card'>
            <CardTitle tag="h4" className="py-0 px-4 mb-0">
             <i className="bi bi-text-center my-text-color px-1 font-weight-payment" style={{fontSize:'30px'}} />
             <span style={{position:'relative',bottom:'1px',fontSize:'20px',color:'rgb(37 36 34 / 80%)'}}>
               Sub Categories
              </span>
            </CardTitle>
            <CardBody className="py-2" >
              <div style={{height:'1px',background:'#03A9F4',margin:'auto auto 5px auto', width:'95%'}}>
              </div>

              {catgoryData?.subcategories?.map((item,index)=>{
                return (
                  <div key={item.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'90%',margin:'auto'}}>
                  <div>Sub Category{index+1}</div>
                  <div>{item?.name}</div>
                </div>
              )})}
            </CardBody>
          </Card>

          

         
        </Col>
    </Row>
    
  </>

   
   
  );
};

export default Payments;
// className="border-bottom px-4 py-3 mb-0"