import React ,{ useState } from 'react';

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
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errors,setErrors] = useState({});
  const [formDatas, setFormDataS] = useState({
    code:'',
    customerAlias:'',
    manufacturerAlias:''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));

    switch (name){
      case 'code':
          //   if (validationData.some(item => item.code.toLowerCase() === value.toLowerCase().trim())) {
          //     setErrors((prev)=>({...prev,"code": "This code has already been used"}));
          // } else {
          // }
          setErrors((prev)=>({...prev,"code": ""}));
          break;

      case 'customerAlias':
          //   if (validationData.some(item => item.customerAlias.toLowerCase() === value.toLowerCase().trim())) {
          //     setErrors((prev)=>({...prev,"customerAlias": "This name has already been used"}));
          // } else {
          // }
          setErrors((prev)=>({...prev,"customerAlias": ""}));
          break;
      
      default:
        // if (validationData.some(item => item.manufacturerAlias.toLowerCase() === value.toLowerCase().trim())) {
        //       setErrors((prev)=>({...prev,"manufacturerAlias": "Please use characters only"}));
        //   } else {
        //   }
          setErrors((prev)=>({...prev,"manufacturerAlias": ""}));
            break;
    
        }
  };

  const closer =()=>{
    setErrorMessageFromApi([]);
  }


  async function apiCall() {
    try {
        const formData = new FormData();
        formData.append('code',formDatas.code);
        formData.append('customer_alias',formDatas.customerAlias);
        formData.append('manufacturer_alias',formDatas.manufacturerAlias);
        formData.append('is_trashed','0');

        console.log('formdata',formData);

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/designs`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`
            },
           
            body: formData,
        });
        const data = await response.json();
        console.log("dataapi",data,response.status);
        if (response.status === 201) {
          navigate('/resources/designs');
        } else {
          console.error("Authentication failed:", Object.values(data.messages.errors));
          if (data.error) {
            setErrorMessageFromApi(Object.values(data.messages.errors));
          }
        }  
        return null;
    } catch (error) {
      setErrorMessageFromApi(["Network error"]);
        return null;
    }
}

const validateForm=()=>{
  let formIsValid =true;
  const errors1 ={};
  
  if(formDatas.manufacturerAlias === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["manufacturerAlias"] = "Required";
  }
  if(formDatas.code === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["code"] = "Required";
  }
  if(formDatas.customerAlias === ''){
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["customerAlias"] = "Required";
  }
  
  setErrors(errors1);
  return formIsValid;
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validateForm()) {
      console.log('Form is valid, proceed with API call');
      apiCall();
    } else {
      console.log('Form is invalid, do not submit');
    }
  };

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
                  
                 <Col md="4">
                   <FormGroup>
                     <Label>Design Code</Label>
                     <Input        
                     type="text" 
                      name="code" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.code}
                      onChange={handleChange} 
                      className={errors.code ? "is-invalid":""}
                      />
                      {errors.code &&  <FormText className="text-danger">{errors.code}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                     <Label>Customer Alias</Label>
                     <Input        
                     type="text" 
                      name="customerAlias" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.customerAlias}
                      onChange={handleChange} 
                      className={errors.customerAlias ? "is-invalid":""}
                      />
                      {errors.customerAlias &&  <FormText className="text-danger">{errors.customerAlias}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                     <Label>Manufacturer Alias</Label>
                     <Input        
                     type="text" 
                      name="manufacturerAlias" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.manufacturerAlias}
                      onChange={handleChange} 
                      className={errors.manufacturerAlias ? "is-invalid":""}
                      />
                      {errors.manufacturerAlias &&  <FormText className="text-danger">{errors.manufacturerAlias}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                   <Button type="submit" 
                            className="btn my-btn-color" 
                            style={{marginTop:"28px"}}
                            disabled={errors.code || errors.customerAlias || errors.manufacturerAlias}
                    >
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