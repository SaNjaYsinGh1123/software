import React,{useEffect, useState} from 'react';

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
import Select, { components } from 'react-select';
// import { companyOptions} from './Data';
import ComponentCard from '../../components/ComponentCard2';
import './tagselect.scss';

const IndicatorsContainer = (props) => {
  return (
    <div style={{ background: '#0052CC' }}>
      <components.IndicatorsContainer {...props} />
    </div>
  );
};

const Edit = () => {
  const navigate = useNavigate();
  const [errorMessageFromApi, setErrorMessageFromApi] = useState('');
  const [errors,setErrors] = useState({});
  const [formDatas, setFormDataS] = useState({
    Name:'',
    lastName:'',
    email:'',
    mobile:'',
    roleId:'x',
    password:''
  });
  const [data,setData] = useState([]);
  const [companyOptions,setCompanyOptions] = useState([]);
  const [selectedOptions,setSelectedOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));

    switch (name){
      case 'Name':{
          // const regex = /^[A-Za-z\s/]+$/;
          // console.log('hi');
          //  if (!regex.test(value.trim())) {
          //     setErrors((prev)=>({...prev,"name": "Please use only characters"}));
          // } else {
          //     setErrors((prev)=>({...prev,"name": ""}));
          // }
          setErrors((prev)=>({...prev,"Name": ""}));
          break;
        }
      case 'lastName':{
          setErrors((prev)=>({...prev,"lastName": ""}));
          break;
        }
      case 'email':{
          setErrors((prev)=>({...prev,"email": ""}));
          break;
        }
      case 'mobile':{
          setErrors((prev)=>({...prev,"mobile": ""}));
          break;
        }
      case 'password':{
          setErrors((prev)=>({...prev,"password": ""}));
          break;
        }
      case 'roleId':{
          setErrors((prev)=>({...prev,"roleId": ""}));
          break;
        }
      default:
            break;
    
        }
  };

  const handleSelectChange = (item)=>{
    console.log('item',item);
    setSelectedOptions(item);
    setErrors((prev)=>({...prev,"factories": ""}));
  }


  const closer =()=>{
    setErrorMessageFromApi('');
  }

  async function apiCall() {

    const filtered = selectedOptions.map((item)=>{
        
      return item.value;
    }).join(' ');
   
  console.log('filtered',filtered);
    try {
        const formData = new FormData();
        formData.append('first_name', formDatas.Name);
        formData.append('last_name', formDatas.lastName);
        formData.append('email', formDatas.email);
        formData.append('mobile', formDatas.mobile);
        formData.append('password', formDatas.password);
        formData.append('role_id', formDatas.roleId);
        formData.append('factory_ids',filtered);
        formData.append('status','1');
        formData.append('is_trashed','0');
       
        console.log('formdata',formData);

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/users`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`
            },
           
            body: formData,
        });
        const dataTemp = await response.json();
            console.log("dataapi",dataTemp,response.status);
        if (response.status === 201) {
          navigate('/users/user');
        } else {
          console.error("Authentication failed:", dataTemp.messages.errors.email);
          if (dataTemp.messages.errors.email) {
            setErrorMessageFromApi(dataTemp.messages.errors.email);
          }
        }  
        return null;
    } catch (error) {
      setErrorMessageFromApi("Network error");
        return null;
    }
}
const validateForm=()=>{
  let formIsValid =true;
  const errors1 ={};
  
  if(formDatas.Name === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["Name"] = "Required";
  }
  if(formDatas.lastName === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["lastName"] = "Required";
  }
  if(formDatas.email === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["email"] = "Required";
  }
  if(formDatas.mobile === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["mobile"] = "Required";
  }
  if(formDatas.password === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["password"] = "Required";
  }
  if(formDatas.roleId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["roleId"] = "Required";
  }
  if(selectedOptions.length === 0) {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["factories"] = "Required";
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

  useEffect(()=>{
    const fecthData =async ()=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://factory.teamasia.in/api/public/roles?is_trashed=0',{
        method:'GET',
        headers:{
         'Authorization' : `Bearer ${token}`
        }
      });
   
      if(!response.ok){
        throw new Error(`HTTP error ! status: ${response.status}`)
      }
      
      const result = await response.json();
      console.log('result',result.roles);
      const resultX = result.roles.slice();
      resultX[resultX.length] = {id:'x',name:'choose'};
      setData(resultX);
    }
    const fecthData1 =async ()=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://factory.teamasia.in/api/public/factories?is_trashed=0',{
        method:'GET',
        headers:{
         'Authorization' : `Bearer ${token}`
        }
      });
   
      if(!response.ok){
        throw new Error(`HTTP error ! status: ${response.status}`)
      }
      
      const result = await response.json();
      console.log('resultfac',result.factories);
      // const resultX = result.factories.slice();
      // resultX[resultX.length] = {id:'',name:''};
      const factoryIdArray = result.factories.map((item)=>{

        return {
          value: item.id, 
          label: item.name,
          color: '#0052CC'
        }
      });
      console.log('fac',factoryIdArray);

      setCompanyOptions(factoryIdArray)
    }
    fecthData1()
    fecthData()
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
               <Col md="8">{errorMessageFromApi && (
                      <div style={{ background:'#ff9c7a',color: 'black', marginBottom: '10px', padding:"5px 10px"}}>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                          Following errors were found:
                          <span onClick={closer} style={{cursor:'pointer'}}>X</span>
                        </div>
                        <ul>
                          <li>
                            {errorMessageFromApi}
                          </li>
                        </ul>
                      </div>
                    )}
                  </Col>

                 <Col md="6">
                   <FormGroup>
                     <Label>First Name</Label>
                     <Input        
                     type="text" 
                      name="Name" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.Name}
                      onChange={handleChange} 
                     className={errors.Name ? "is-invalid":""}
                     />
                     {errors.Name &&  <FormText className="text-danger">{errors.Name}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="6">
                   <FormGroup>
                     <Label>Last Name</Label>
                     <Input        
                     type="text" 
                      name="lastName" 
                      id="name"
                      placeholder="Enter name" 
                      value={formDatas.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "is-invalid":""}
                     />
                     {errors.lastName &&  <FormText className="text-danger">{errors.lastName}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="6">
                   <FormGroup>
                     <Label>Email Address</Label>
                     <Input        
                     type="text" 
                      name="email" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.email}
                      onChange={handleChange} 
                      className={errors.email ? "is-invalid":""}
                      />
                      {errors.email &&  <FormText className="text-danger">{errors.email}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="6">
                   <FormGroup>
                     <Label>Mobile</Label>
                     <Input        
                     type="text" 
                      name="mobile" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.mobile}
                      onChange={handleChange} 
                      className={errors.mobile ? "is-invalid":""}
                      />
                      {errors.mobile &&  <FormText className="text-danger">{errors.mobile}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="6">
                   <FormGroup>
                     <Label>Password</Label>
                     <Input        
                     type="text" 
                      name="password" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.password}
                      onChange={handleChange} 
                      className={errors.password ? "is-invalid":""}
                      />
                      {errors.password &&  <FormText className="text-danger">{errors.password}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="6">
                   <FormGroup>
                     <Label>Role</Label>
                     <Input type="select" 
                            name="roleId" 
                            value={formDatas.roleId} 
                            onChange={handleChange}
                            className={errors.roleId ? "is-invalid":""}
                      >
                          {data.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.roleId &&  <FormText className="text-danger">{errors.roleId}</FormText>}
                   </FormGroup>
                 </Col>
                <Col md="12">
                  <ComponentCard title="Factory">
                    <Select
                      closeMenuOnSelect={false}
                      components={{ IndicatorsContainer }}
                      // defaultValue={[companyOptions[4], companyOptions[5]]}
                      isMulti
                      options={companyOptions}
                      value={selectedOptions} 
                      onChange={handleSelectChange}
                      className={errors.factories ? "is-invalid":""}  
                    />
                    {errors.factories &&  <FormText className="text-danger danger-color">{errors.factories}</FormText>}
                  </ComponentCard>
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













































