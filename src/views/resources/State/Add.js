import React,{useState,useCallback} from 'react';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';

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

// Custom hook for fetching options
const useDebouncedFetchOptions = (endpoint) => {
  const fetchOptions = async (inputValue) => {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`https://factory.teamasia.in/api/public/${endpoint}?search=${inputValue}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result[endpoint].map(item => ({ value: item.id, label: item.name || item.code || item.company_name }));
  };

  const debouncedFetch = useCallback(debounce((inputValue, callback) => {
    fetchOptions(inputValue).then(callback).catch(error => {
      console.error(error);
      callback([]);
    });
  }, 300), [endpoint]);

  return debouncedFetch;
};





const Edit = () => {
  const navigate = useNavigate();
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errors,setErrors] = useState({});
  const [formDatas, setFormDataS] = useState({
    name:'',
    countryId:''
  });

  const countryOptions = useDebouncedFetchOptions('countries');

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormDataS(prevState => ({
      ...prevState,
      [actionMeta.name]: selectedOption
    }));
  };

    const handleChange = (e) => {
      const { name, value } = e.target;
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


    
  const closer =()=>{
    setErrorMessageFromApi([]);
  }


    async function apiCall() {
      try {
          const formData = new FormData();
          formData.append('name', formDatas.name);
          formData.append('country_id', formDatas.countryId.value);
          formData.append('is_trashed','0');
          console.log('formdataX',formDatas.countryId)
          const token = localStorage.getItem('userToken');
          const response = await fetch(`https://factory.teamasia.in/api/public/states`, {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${token}`
              },
            
              body: formData,
          });
          const data = await response.json();
          console.log("dataapi",data,response.status);
        if (response.status === 201) {
          navigate('/resources/states');
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
                     <Label>Name</Label>
                     <Input type="text" 
                        name="name" 
                        id="name"
                        placeholder="Enter name" 
                        value={formDatas.name}
                        onChange={handleChange} 
                        className={errors.name ? "is-invalid":""}
                      />
                      {errors.name &&  <FormText className="text-danger">{errors.name}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                      <Label>*Country</Label>
                        <AsyncSelect
                          name="countryId"
                          onChange={handleSelectChange}
                          loadOptions={countryOptions}
                          value={formDatas.countryId}
                          isClearable
                          isSearchable
                        />
                    
                        <FormText className="text-danger"></FormText>
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