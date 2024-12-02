import React,{useState, useEffect} from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
} from 'reactstrap';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errors, setErrors] = useState({});



  const [formDatas, setFormDataS] = useState({
    title:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('hi')
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };




  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    // setSelectedType(e.target.value);
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
  };

  const closer =()=>{
    setErrorMessageFromApi([]);
  }

  async function apiCall() {
    try {
        console.log('formdataX',formDatas);
        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/ordertemplates`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              title: formDatas.title,
              type: '1',
              customer_id: formDatas.customerId,
              is_trashed: '0'
            }),
        });

        const datas = await response.json();
        console.log("dataapi",datas,response.status);
        if (response.status === 201) {
          navigate('/order/order-templates');
        } else {
          console.error("Authentication failed:", Object.values(datas.messages.errors));
          if (datas.error) {
            setErrorMessageFromApi(Object.values(datas.messages.errors));
          }
        }  
        return null;
      } catch (error) {
        console.log('error',error);
         setErrorMessageFromApi(["Network error"]);
        return null;
      }
}

const validateForm = () => {
  let formIsValid = true;
  const errors1 = {};

  if(formDatas.title === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["title"] = "Please select a title";
  }
  setErrors(errors1);
  return formIsValid;
};


const handleSubmit = async (event) => {
  event.preventDefault();
  if(validateForm()) {
    console.log('Form is valid, proceed with API call');
    apiCall();
  } else {
    console.log('Form is invalid, do not submit');
  }
};



  useEffect(() => {

    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/customers`, {
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
      setData(result.customers);
      setFormDataS(prevState => ({
        ...prevState,
        customerId: result.customers[0].id
      }
      ))
    };

 

  
   
  

    fetchData();

  },[]);

  return (
<div>
     
     <Row>
       <Col md="12">
         <Card>
           <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
           </CardTitle>
           <CardBody className="bg-light">
             <CardTitle tag="h4" className="mb-0">
             </CardTitle>
           </CardBody>
           <CardBody>
             <Form onSubmit={handleSubmit}>
               <Row>
               <Col md="9">{errorMessageFromApi.length !== 0 && (
                      <div style={{ background:'#ff9c7a',color: 'black', marginBottom: '10px', padding:"5px 10px"}}>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                          Following errors were found:
                          <span onClick={closer} style={{cursor:'pointer'}}>X</span>
                        </div>
                        <ul>
                          {errorMessageFromApi.map((item)=>
                          <li>
                              {item}
                          </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </Col>
                 <Col md="8" className=''>
                   <FormGroup>
                     <Label>Template Title</Label>
                     <Input type="text" 
                     name="title" 
                     id="name"
                     placeholder="Enter title" 
                     value={formDatas.title}
                     onChange={handleChange} 
                     className={errors.title ? "is-invalid":""}
                     />
                       {errors.title &&  <FormText className="text-danger">Required</FormText>}
                   </FormGroup>
                 </Col>

                 <Col md="8" className='mb-5'>
                    <FormGroup>
                      <Label>Choose Customer</Label>
                      <Input type="select" 
                         name="customerId" 
                         value={formDatas.customerId}
                        onChange={handleTypeChange} >
                           {data.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.company_name}</option>
                           })}
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>

                  

                 <Col md="4">
                   <FormGroup>
                    <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}>
                        Submit
                    </Button>
                   </FormGroup>
                 </Col>
               </Row>
               
              
             </Form>
             
           </CardBody>
          
          
           
         </Card>
       </Col> 
     </Row>
     
   </div>

   
   
  );
};

export default Edit;