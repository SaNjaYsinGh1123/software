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
import { useNavigate } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
  const navigate = useNavigate();

  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);

  const [errors,setErrors] = useState({});
  const [selectedType, setSelectedType] = useState('0');

  const handleTypeChange = (e) => {
    console.log('selectedType',e.target.value);
    setSelectedType(e.target.value);
  };
  

  const [formDatas, setFormDataS] = useState({
    DisplayName:'',
    ConfigName:'',
    Value:''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));

    switch (name){
      case 'DisplayName':
          //   if (validationData.some(item => item.displayName.toLowerCase() === value.toLowerCase().trim())) {
          //     setErrors((prev)=>({...prev,"DisplayName": "This name has already been used"}));
          // } else {
          // }
          setErrors((prev)=>({...prev,"DisplayName": ""}));
          break;

      case 'ConfigName':
          //   if (validationData.some(item => item.name.toLowerCase() === value.toLowerCase().trim())) {
          //     setErrors((prev)=>({...prev,"ConfigName": "This name has already been used"}));
          // } else {
          // }
          setErrors((prev)=>({...prev,"ConfigName": ""}));
          break;

      default:
            break;
        }
  };

  const closer =()=>{
    setErrorMessageFromApi([]);
  }


  async function apiCall() {
    try {
        const formData = new FormData();
        formData.append('name',formDatas.ConfigName);
        formData.append('display_name',formDatas.DisplayName);
        formData.append('type',selectedType);
        formData.append('value',formDatas.Value);
        formData.append('is_trashed','0');
       

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/configs`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`
            },
           
            body: formData,
        });
        const data = await response.json();
        console.log("dataapi",data,response.status);
        if (response.status === 201) {
          navigate('/resources/config-default');
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
  
  if(formDatas.DisplayName === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["DisplayName"] = "Required";
  }
  if(formDatas.ConfigName === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["ConfigName"] = "Required";
  }
  if(formDatas.Value === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["Value"] = "Required";
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
               <Col md="10">{errorMessageFromApi.length !== 0 && (
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
                  
                 <Col md="3">
                   <FormGroup>
                     <Label>Display Name</Label>
                     <Input        
                     type="text" 
                      name="DisplayName" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.DisplayName}
                      onChange={handleChange} 
                      className={errors.DisplayName ? "is-invalid":""}
                      />
                      {errors.DisplayName &&  <FormText className="text-danger">{errors.DisplayName}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="3">
                   <FormGroup>
                     <Label>Config Name</Label>
                     <Input        
                     type="text" 
                      name="ConfigName" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.ConfigName}
                      onChange={handleChange}
                      className={errors.ConfigName ? "is-invalid":""}
                      />
                      {errors.ConfigName &&  <FormText className="text-danger">{errors.ConfigName}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="3">
                   <FormGroup>
                     <Label>Type</Label>
                     <Input type="select" name="Select Gender" value={selectedType} onChange={handleTypeChange}>
                        <option value="0">Day</option>
                        <option value="1">Week</option>
                        <option value="2">Month</option>
                        <option value="3">Year</option>
                      </Input>
                     <FormText className="muted"></FormText>
                   </FormGroup>
                  
                 </Col>
                 <Col md="3">
                   <FormGroup>
                     <Label>Value</Label>
                     <Input        
                     type="text" 
                      name="Value" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.Value}
                      onChange={handleChange} 
                      className={errors.Value ? "is-invalid":""}
                      />
                      {errors.Value &&  <FormText className="text-danger">{errors.Value}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                   <Button type="submit" 
                            className="btn my-btn-color" 
                            style={{marginTop:"28px"}}
                            disabled={errors.DisplayName || errors.ConfigName}
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