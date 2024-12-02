import React,{useState} from 'react';

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
import {useLocation, useNavigate } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
  const navigate = useNavigate();
  const location =  useLocation();
  const {data2,data3} = location.state;
  const [data3x,setData3x] =useState(data3);

  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);


  const [errors,setErrors] = useState({});
  
  const [formDatas, setFormDataS] = useState({
    name:'',
    CountryId:'',
    StateId:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('hi')
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
    switch (name){
      case 'name':
          //   if (validationData.some(item => item.toLowerCase() === value.toLowerCase().trim())) {
          //     setErrors((prev)=>({...prev,"name": "This name has already been used"}));
          // } else {
          // }
              setErrors((prev)=>({...prev,"name": ""}));
          break; 
      default:
            break;
        }
  };

  const handleTypeChange = (e) => {

    console.log('ec',e.target.value);
    setFormDataS(prevState => ({
      ...prevState,
      CountryId: e.target.value,
      StateId:''
    }));
    
    const newdata3 = data3.filter((item) => item.country_id === e.target.value);
    newdata3.push({id:'',name:'choose'})
    setData3x(newdata3);
  };

  const handleTypeChange1 = (e) => {
    console.log('es',e.target.value);
    setFormDataS(prevState => ({
      ...prevState,
      StateId: e.target.value
    }));
  };

  const closer =()=>{
    setErrorMessageFromApi([]);
  }

  async function apiCall() {
    try {
        const formData = new FormData();
        formData.append('name', formDatas.name);
        formData.append('country_id', formDatas.CountryId);
        formData.append('state_id', formDatas.StateId);
        formData.append('is_trashed','0');
        const token = localStorage.getItem('userToken');
        console.log('country_id',formDatas)
        const response = await fetch(`https://factory.teamasia.in/api/public/cities?is_trashed=0`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`
            },
          
            body: formData,
        });
        const data = await response.json();
        console.log("dataapi",data,response.status);
        if (response.status === 201) {
          navigate('/resources/cities');
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
  
  if(formDatas.name === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["name"] = "Required";
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
               <Col md="8">{errorMessageFromApi.length !== 0 && (
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
                  
                 <Col md="8">
                   <FormGroup>
                     <Label>Name</Label>
                     <Input type="text" 
                     name="name" 
                     id="name"
                     placeholder="Enter" 
                     value={formDatas.name}
                     onChange={handleChange} 
                     className={errors.name ? "is-invalid":""}
                     />
                     {errors.name &&  <FormText className="text-danger">{errors.name}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="6">
                    <FormGroup>
                      <Label>Country</Label>
                      <Input type="select" 
                         name="countryId" 
                         value={formDatas.CountryId}
                        onChange={handleTypeChange}>
                           {data2.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>State</Label>
                      <Input type="select"
                         name="countryId" 
                         value={formDatas.StateId}
                        onChange={handleTypeChange1}>
                           {data3x.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
                 <Col md="4">
                   <FormGroup>
                   <Button type="submit" 
                            className="btn my-btn-color" 
                            style={{marginTop:"28px"}}
                            disabled={errors.name}
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