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
import {useNavigate } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';

const Edit= () => {
  const navigate= useNavigate();
  const [errorMessageFromApi, setErrorMessageFromApi] = useState('');
  const [errors,setErrors] = useState({});

 const [formDatas, setFormDataS] = useState({
  name:'',
  companyName:'',
  cimNo:'',
  uamNo:'',
  items:[{"factory_name":''}]
});

  
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
    switch (name){
      case 'name':
          //   if (validationData.some(item => item.name.toLowerCase() === value.toLowerCase().trim())) {
          //     setErrors((prev)=>({...prev,"name": "This name has already been used"}));
          // } else {
          // }
          setErrors((prev)=>({...prev,"name": ""}));
          break;
      case 'companyName':{
          setErrors((prev)=>({...prev,"companyName": ""}));
          break;
        }
      case 'cimNo':{
          setErrors((prev)=>({...prev,"cimNo": ""}));
          break;
        }
      case 'uamNo':{
          setErrors((prev)=>({...prev,"uamNo": ""}));
          break;
        }
      default:
            break;
    
        }
  };

  const addItem = () => {
    const newItems = formDatas.items.slice();
    console.log("data",newItems);
    newItems.push({"factory_name":''})
    setFormDataS(prevState => ({
      ...prevState,
      items: newItems
    }));
  };

  const removeItem = index => {
    const newItems = formDatas.items.slice();
    newItems.splice(index, 1);
    setFormDataS(prevState => ({
      ...prevState,
      items: newItems
    }));
  };

  const handleInputChange = (index, e) => {
    const newItems = formDatas.items.slice();
    console.log("data",index,newItems);
    newItems[index].factory_name =  e.target.value;
    console.log('newX',newItems);
    setFormDataS(prevState => ({
      ...prevState,
      items: newItems
    }));
    setErrors((prev)=>({...prev,"factory_name": ""}));
  };
  const closer =()=>{
    setErrorMessageFromApi('');
  }

  async function apiCall() {
    try {
        // const filtered = formDatas.items.filter((temp)=>{
        //   return temp.factory_name !== '';
        // })

        // console.log('filtered',filtered);

        console.log('formdata',formDatas);

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/factories`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              name:formDatas.name,
              company_name:formDatas.companyName,
              cim_no:formDatas.cimNo,
              uam_no:formDatas.uamNo,
              factory_production_line:formDatas.items,
              is_trashed:'0'
            }),
        });

        const data = await response.json();
         console.log("dataapi",data,response.status);
        if (response.status === 201) {
          navigate('/factories/factory');
        } else {
          console.error("Authentication failed:", data.messages.errors.name);
          if (data.messages.errors.name) {
            setErrorMessageFromApi(data.messages.errors.name);
          }
        }  
        return null;
    } catch (error) {
      console.log(error);
      setErrorMessageFromApi("Network error");
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
  if(formDatas.companyName === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["companyName"] = "Required";
  }
  if(formDatas.cimNo === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["cimNo"] = "Required";
  }
  if(formDatas.uamNo === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["uamNo"] = "Required";
  }
  formDatas.items.forEach((element) => {
    console.log('element',element);
    if(element.factory_name === ''){
            formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["factory_name"] ="Required"
          }
      });
  
    console.log('hi',formDatas.items,errors1);
  
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
              <Row>
                <Col md="8">
                  <div className='' style={{ marginRight:'10px',marginTop:'10px'}}>
                     Create Factory Detail
                  </div>
                </Col>
                
              </Row>
             
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
                 <Col md="8" className=''>
                   <FormGroup>
                     <Label>Factory Name</Label>
                     <Input  
                      type="text" 
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
                 <Col md="8" className=''>
                   <FormGroup>
                     <Label>Company Name</Label>
                     <Input  
                      type="text" 
                      name="companyName" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.companyName}
                      onChange={handleChange}
                      className={errors.companyName ? "is-invalid":""}
                      />
                      {errors.companyName &&  <FormText className="text-danger">{errors.companyName}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="8" className=''>
                   <FormGroup>
                     <Label>CIN No</Label>
                     <Input  
                      type="text" 
                      name="cimNo" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.cimNo}
                      onChange={handleChange} 
                      className={errors.cimNo ? "is-invalid":""}
                      />
                      {errors.cimNo &&  <FormText className="text-danger">{errors.cimNo}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="8" className=''>
                   <FormGroup>
                     <Label>UAM No</Label>
                     <Input  
                      type="text" 
                      name="uamNo" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.uamNo}
                      onChange={handleChange} 
                      className={errors.uamNo ? "is-invalid":""}
                      />
                      {errors.uamNo &&  <FormText className="text-danger">{errors.uamNo}</FormText>}
                   </FormGroup>
                 </Col>

                 <Row className='mt-4'>
                  <Col md="8">
                      <Button disabled className='btn btn-warning'>Production Lines</Button>
                  </Col>
                  <Col md="2">
                    <Button type="button" className='btn-success' onClick={addItem}>+</Button>
                  </Col>
                </Row>

                 <table className="table">        
                  <thead className='nobordertop'>
                        <tr className='nobordertop'>
                          <Row>
                            <Col md="3"><th className='noborder'>Production Line Name</th></Col>
                          </Row>
                        </tr>
                      </thead>
          
              <tbody>
              {formDatas.items.map((item, index) => (
                  <tr key={item}>
                    <Row>
                      <Col md="8">
                        <Input name="product" 
                               value={item.factory_name} 
                               type="text" 
                               onChange={e => handleInputChange(index, e)} 
                               placeholder="" 
                               className={errors.factory_name && item.factory_name === '' ? "is-invalid":""}
                               />
                                {errors.factory_name && item.factory_name === ''  &&  <FormText className="text-danger">Required</FormText>}
                               </Col>
                      <Col md="1"><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem(index)} disabled={index === 0}>X</button></Col>
                    </Row>
                  </tr>
                ))}
              </tbody>
            </table>

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

export default Edit