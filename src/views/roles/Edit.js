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
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  const {first_name:Name,
    last_name:lastName,
    email,
    mobile,
    role_id:roleId,
    factory_ids:factoryIds,
    password
  } = location.state || {};         

  const [formDatas, setFormDataS] = useState({
    Name,
    lastName,
    email,
    mobile,
    roleId,
    password
  });
  
  const [data,setData] = useState([])
  const [companyOptions,setCompanyOptions] = useState([]);
  const [selectedOptions,setSelectedOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  async function apiCall() {

    const filtered = selectedOptions.map((item)=>{
        
      return item.value;
    }).join(' ');
   
  console.log('filtered',filtered);
    try {
        // const formData = new FormData();
      
       
        // console.log('formdata',formData);

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/users`, {
            method: "PUT",
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              first_name: formDatas.Name,
              last_name: formDatas.lastName,
              email: formDatas.email,
              mobile: formDatas.mobile,
              password: formDatas.password,
              role_id: formDatas.roleId,
              factory_ids:filtered,
              status:'1',
              is_trashed:'0'
            }),
        });
        const responseMessage = await response.json();
        console.log("dataapi",responseMessage)
        if (response.ok) {
          navigate('/users');
        } 
            // Handle any errors, such as showing an error message to the user
            console.error("Authentication failed:", data.message);
            return null;
      
    } catch (error) {
        console.error("Network error:", error);
        return null;
    }
}

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log('event',event);
  apiCall();

};

  
  useEffect(()=>{
  const factoryArray = factoryIds.split(' ');

  // const factoryIdArray = factoryArray.map((item)=>{

  //   return {
  //     value: item, 
  //     label: item,
  //     color: '#0052CC'
  //   }
  // });
  // console.log('factoryIdArray',factoryIdArray);

  const factoryIdArray = companyOptions.filter((a) => factoryArray.includes(a.value));

  console.log('factoryIdArray',factoryIdArray);

  setSelectedOptions(factoryIdArray);
  


  },[companyOptions]);

  const handleSelectChange = (item)=>{
    console.log('item',item);
    setSelectedOptions(item);
  }

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
      setData(result.roles);
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
    fecthData1();
    fecthData();
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
                     />
                     <FormText className="muted"></FormText>
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
                     />
                     <FormText className="muted"></FormText>
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
                     />
                     <FormText className="muted"></FormText>
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
                     />
                     <FormText className="muted"></FormText>
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
                     />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="6">
                   <FormGroup>
                     <Label>Role</Label>
                     <Input type="select" name="roleId" value={formDatas.roleId} onChange={handleChange}>
                          {data.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                     <FormText className="muted"></FormText>
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
                    />
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