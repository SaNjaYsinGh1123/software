import React,{useEffect, useState} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import Select, { components } from 'react-select';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import './tagselect.scss';
import {
  Card,
  CardBody,
  Table,
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
import ComponentCard from '../../../components/ComponentCard2';

// import ComponentCard from '../../components/ComponentCard';

const Edit= () => {
  const location = useLocation();
  const navigate= useNavigate();
  
    const [FactoryArray, setFactoryArray] = useState([]);
    const [regularTags, setRegularTags] = useState([]);
    const [factorydata, setFactoryData] = useState([]);
    const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
    const [errors, setErrors] = useState({});
    const [imageFile, setImageFile] = useState(null);

console.log('AddLabels',location.state);

const [formDatas, setFormDataS] = useState({
  companyName:'',
  Factory:'',
  AddLabels:'',
  CompanyDescription:'',
  LimitforDaysAllowed:'',
  LimitforCreditAllowed:'',
  items:[{
    name: "",
          designation: "",
          email: "",
          country_code: "",
          mobile: "",
          email_proforma_invoice: "0",
          email_invoice_dispatch: "0",
          email_ledger: "0",
          email_pending_payment: "0",
          whatsapp_proforma_invoice: "0",
          whatsapp_invoice_dispatch: "0",
          whatsapp_ledger: "0",
          whatsapp_pending_payment: "0"
  }],
  compdoc:[{name:'',file_path:'',image_id:''}]
});



const [selectedOptions, setSelectedOptions] = useState([]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormDataS(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleChangeLabel = (e) => {
  console.log('label',e);
  setSelectedOptions(e);
};

 const IndicatorsContainer = (props) => {
  return (
    <div style={{ background: '#00B8D9' }}>
      <components.IndicatorsContainer {...props} />
    </div>
  );
};

async function uploadImage(file){
  const token = localStorage.getItem('userToken');
  if(!file){
    return null
  }
  try{
    const formData  = new  FormData();
    formData.append('image_name',formDatas.compdoc[0].name);
    formData.append('image_path[]',file);
    const response = await fetch('https://factory.teamasia.in/api/public/fileuploads',{
        method : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body:formData,
    });
    const data= await response.json();
    if(response.status === 201){
      console.error('success:',data.messages.image_details[0],response);
      const imageDetails = data.messages.image_details[0]; 
      return imageDetails;
    }
    console.error('Error:',data.message,response);
    return null;
  }catch(error){
    console.error('Error uploading image:',error);
    return null;
  }
}
const handleImageChange = (e) => {
  setImageFile(e.target.files[0]);
};

const addItem = () => {
  const newItems = formDatas.items.slice();
  newItems.push({
    name: "",
          designation: "",
          email: "",
          country_code: "",
          mobile: "",
          email_proforma_invoice: "0",
          email_invoice_dispatch: "0",
          email_ledger: "0",
          email_pending_payment: "0",
          whatsapp_proforma_invoice: "0",
          whatsapp_invoice_dispatch: "0",
          whatsapp_ledger: "0",
          whatsapp_pending_payment: "0"
  });
  setFormDataS(prevState=>({
    ...prevState,
    items:newItems
}))
};

const removeItem = (index) => {
  const newItems = formDatas.items.slice();
  newItems.splice(index, 1);
  // console.log('newItems',newItems);
  setFormDataS(prevState=>({
    ...prevState,
    items:newItems
}))
};

const handleInputChange = (index, event) => {
  const {name ,value,type} = event.target;
  const newItems = formDatas.items.slice();
  console.log("data",index,newItems[index]);
  if(type === 'checkbox'){
    // console.log('check value',value,event.target.checked);
    if(newItems[index][name] === '0')
    {
      newItems[index][name] =  '1';
    }
    else{
      newItems[index][name] =  '0';
    }
  }
  else{
      newItems[index][name] =  value;
      // console.log('check not',newItems[index][name]);
  }
  setFormDataS(prevState=>({
        ...prevState,
        items:newItems
    }))
};

  const addCompdoc= () => {
    const newItems = formDatas.compdoc.slice();
    newItems.push({name:'',file_path:'',image_id:'2'})
    setFormDataS(prevState => ({
      ...prevState,
      compdoc: newItems
    }));
  };

  const removeCompdoc = index => {
    const newItems = formDatas.compdoc.slice();
    newItems.splice(index, 1);
    setFormDataS(prevState => ({
      ...prevState,
      compdoc: newItems
    }));
  };

  const handleCompdoc = (index, e) => {
    const { name , value} = e.target;
    const newItems = formDatas.compdoc.slice();
    // console.log("data",index,newItems);
    newItems[index][name] = value;
    setFormDataS(prevState => ({
      ...prevState,
      compdoc: newItems
    }));
  };

  const closer =()=>{
    setErrorMessageFromApi([]);
  }

  async function apiCall() {
    try {
        
        const imageDetails = await uploadImage(imageFile);
        const compdoctemp =[];
        if(imageDetails){
          compdoctemp.push({name:formDatas.compdoc[0].name,file_path:imageDetails.image_path,image_id:imageDetails.image_id});
        }
        const filtered =formDatas.items.filter((temp)=>{
          return temp.name !== '';
        });

        const csvString = selectedOptions.map(item => item.value).join(',');
        console.log('csvString',csvString);

        const csvString1 = regularTags.map(item => item).join(',');
        console.log(csvString1);

        console.log('formdataX',formDatas);
        const bodyData ={
          company_name: formDatas.companyName,
          factory_ids: csvString,
          labels: csvString1,
          company_description: formDatas.CompanyDescription,
          day_limit: formDatas.LimitforDaysAllowed,
          credit_limit: formDatas.LimitforCreditAllowed,
          customer_company_representative: filtered,
          customer_company_document:compdoctemp,
          is_trashed:'0'
        }
        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/customers`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify(bodyData),
        });

        const data = await response.json();
        console.log("dataapi",data,response.status);
        if (response.status === 201) {
          navigate(-1);
        } else {
          console.error("Authentication failed:", Object.values(data.messages.errors));
          if (data.error) {
            setErrorMessageFromApi(Object.values(data.messages.errors));
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

  if(formDatas.companyName === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["companyName"] = "Please select a companyName";
  }
  if(formDatas.CompanyDescriptionT === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["CompanyDescription"] = "Please select description.";
  }
  if(formDatas.LimitforDaysAllowedT === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["LimitforDaysAllowed"] = "Please select a LimitforDaysAllowed.";
  }
  if(formDatas.LimitforCreditAllowedT === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["LimitforCreditAllowed"] = "Please select a LimitforCreditAllowed.";
  }
  // formDatas.items.forEach((element) => {
  //   console.log('element',element);
  //         if(element.name === ''){
  //            formIsValid = false;
  //     // eslint-disable-next-line dot-notation
  //           errors1["representName"] ="Required"
  //         }
  //         if(element.designation === ''){
  //            formIsValid = false;
  //     // eslint-disable-next-line dot-notation
  //           errors1["representDesignation"] ="Required"
  //         }
  //         if(element.email === ''){
  //            formIsValid = false;
  //     // eslint-disable-next-line dot-notation
  //           errors1["representEmail"] ="Required"
  //         }
  //         if(element.country_code === ''){
  //            formIsValid = false;
  //     // eslint-disable-next-line dot-notation
  //           errors1["representCountryCode"] ="Required"
  //         }
  //         if(element.mobile === ''){
  //            formIsValid = false;
  //     // eslint-disable-next-line dot-notation
  //           errors1["representMobile"] ="Required"
  //         }
  //     });

      // formDatas.compdoc.forEach((element) => {
      //   console.log('element',element);
      //         if(element.name === ''){
      //            formIsValid = false;
      //     // eslint-disable-next-line dot-notation
      //           errors1["compDocName"] ="Required"
      //         }
      //     });
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

  useEffect(()=>{
      const fetchData = async () => {
        const token = localStorage.getItem('userToken');
        console.log('token',token);
        const response = await fetch('https://factory.teamasia.in/api/public/factories', {
          method: 'GET', 
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('result',response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("responsejson",result);
        setFactoryData(result.factories); 
      };
    
      fetchData();
  },[]);

  useEffect(()=>{
    const companyOptions = ()=>{
      const obj = factorydata.map((factoryitem)=>{
        return {
          value:factoryitem.id,
          label:factoryitem.name,
          color: '#00B8D9'
        }
      })
      setFactoryArray(obj);
  }
  companyOptions();
  // console.log('factoryarray',FactoryArray);
  },[factorydata]);

  const handleRegularTags = (tags) => {
    // console.log('tags',tags);
    setRegularTags(tags);
  };

  return (
<div>
     
     <Row>
       <Col md="12">
         <Card>

           <CardBody className="bg-light py-2">
             <CardTitle tag="h4" className="mb-0" >
              <Row>
                <Col md="8">
                  <div className='' style={{ marginRight:'10px',marginTop:'10px'}}>
                      Add Customer
                  </div>
                </Col>
              </Row>
             
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

                 <Col md="6" className=''>
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
                      {errors.companyName &&  <FormText className="text-danger">Required</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="6" className=''>
                  <ComponentCard title="Factory">
                      <Select
                        closeMenuOnSelect={false}
                        components={{ IndicatorsContainer }}
                        isMulti
                        options={FactoryArray}
                        onChange={handleChangeLabel}
                        value={selectedOptions}
                      />
                    </ComponentCard>
                   
                 </Col>
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>Add Labels</Label>
                     <TagsInput
                          value={regularTags}
                          onChange={(tags) => handleRegularTags(tags)}
                          tagProps={{
                            className: 'react-tagsinput-tag bg-info text-white rounded',
                          }}
                        />
                   </FormGroup>
                 </Col>
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>Company Description</Label>
                     <Input  
                      type="textarea" 
                      name="CompanyDescription" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.CompanyDescription}
                      onChange={handleChange}
                      className={errors.CompanyDescription ? "is-invalid":""}
                      />
                        {errors.CompanyDescription &&  <FormText className="text-danger">Required</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>Limit for Days Allowed</Label>
                     <Input  
                      type="text" 
                      name="LimitforDaysAllowed" 
                      id="name" 
                      placeholder="Enter value" 
                      value={formDatas.LimitforDaysAllowed}
                      onChange={handleChange}
                      className={errors.LimitforDaysAllowed ? "is-invalid":""}
                      />
                        {errors.LimitforDaysAllowed &&  <FormText className="text-danger">Required</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>Limit for Credit Allowed</Label>
                     
                     <Input  
                      type="text" 
                      name="LimitforCreditAllowed" 
                      id="name" 
                      placeholder="Enter value" 
                      value={formDatas.LimitforCreditAllowed}
                      onChange={handleChange}
                      className={errors.LimitforCreditAllowed ? "is-invalid":""}
                      />
                        {errors.LimitforCreditAllowed &&  <FormText className="text-danger">Required</FormText>}
                   </FormGroup>
                 </Col>

                 
                 <Row className='mt-4'>
                    <Col md="8">
                       <Button disabled className='btn btn-warning' >Representatives</Button>
                    </Col>
                 </Row>

                 <Table responsive size="sm">        
                     <thead>
                        <tr>
                              <th >Name</th>
                              <th >Designation</th>
                              <th >Email</th>
                              <th >Country code</th>
                              <th >Mobile</th>
                              <th ><Button type="button" className='btn-success' onClick={addItem}>+</Button></th>
                             
                        </tr>
                        
                      
                      </thead>
          
                      <tbody>
                      {formDatas.items.map((item, index) => (
                        <>
                          <tr key={item.id} style={{borderBottomColor:'aliceblue'}}>
                              <td>
                                  <Input 
                                      name="name" 
                                      value={item.name} 
                                      type="text" 
                                      onChange={e => handleInputChange(index, e)} 
                                      placeholder="" 
                                      className={errors.representName && item.name === '' ? "is-invalid":""}
                                      />
                                        {errors.representName && item.name === ''  &&  <FormText className="text-danger">Required</FormText>}
                                </td> 
                                <td>
                                    <Input 
                                      name="designation" 
                                      value={item.designation} 
                                      type="text" 
                                      onChange={e => handleInputChange(index, e)} 
                                      placeholder="" 
                                      className={errors.representDesignation && item.designation === '' ? "is-invalid":""}
                                      />
                                        {errors.representDesignation && item.designation === ''  &&  <FormText className="text-danger">Required</FormText>}
                                </td>
                                
                                <td>
                                  <Input 
                                      name="email" 
                                      value={item.email} 
                                      type="text" 
                                      onChange={e => handleInputChange(index, e)} 
                                      placeholder="" 
                                      className={errors.representEmail && item.email === '' ? "is-invalid":""}
                                      />
                                        {errors.representEmail && item.email === ''  &&  <FormText className="text-danger">Required</FormText>}
                                </td> 
                                
                                <td>
                                  <Input 
                                    name="country_code" 
                                    value={item.country_code} 
                                    type="text" 
                                    onChange={e => handleInputChange(index, e)} 
                                    placeholder="" 
                                    className={errors.representCountryCode && item.country_code === '' ? "is-invalid":""}
                                      />
                                        {errors.representCountryCode && item.country_code === ''  &&  <FormText className="text-danger">Required</FormText>}
                                </td>    

                                <td>
                                  <Input 
                                    name="mobile" 
                                    value={item.mobile} 
                                    type="text" 
                                    onChange={e => handleInputChange(index, e)} 
                                    placeholder="" 
                                    className={errors.representMobile && item.mobile === '' ? "is-invalid":""}
                                      />
                                        {errors.representMobile && item.mobile === ''  &&  <FormText className="text-danger">Required</FormText>}
                                </td>   
                                    
                                <td>
                                  <button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem(index)} disabled={index === 0}>X</button>
                                </td> 
                          </tr>
                          <tr><td></td></tr>
                          <tr key={item.id} style={{borderBottomColor:'snow'}}>
                            <td>
                            <FormGroup>
                                {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                                <Label style={{display:'block',color:'snow'}}>Proforma Invoice</Label>
                                <Label className='mx-1'>Email</Label>
                                <FormText className="muted"></FormText>
                              </FormGroup>
                            </td>
                            
                            <td>
                            <FormGroup>
                                {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                                <Label className=''>Proforma Invoice</Label>
                                <br></br>
                                <Input 
                                type="checkbox" checked={ item.email_proforma_invoice !== '0' } name="email_proforma_invoice" onChange={e => handleInputChange(index, e)}  
                                />
                                <FormText className="muted"></FormText>
                              </FormGroup>
                            </td>
                              
                          <td>
                            <FormGroup>
                                {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                                <Label className=''>Invoice/dispatch</Label>
                                <br></br>
                                <Input 
                                type="checkbox" checked={ item.email_invoice_dispatch !== '0' } name="email_invoice_dispatch" onChange={e => handleInputChange(index, e)}  
                                />
                                <FormText className="muted"></FormText>
                              </FormGroup>
                          </td>
                            
                            <td>
                              <FormGroup>
                                  {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                                  <Label className=''>Ledgers</Label>
                                  <br></br>
                                  <Input 
                                  type="checkbox" checked={ item.email_ledger !== '0' } name="email_ledger" onChange={e => handleInputChange(index, e)}  
                                  />
                                  <FormText className="muted"></FormText>
                                </FormGroup>
                            </td>
                              
                            <td>
                              <FormGroup>
                                  {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                                  <Label className=''>Pending Payments</Label>
                                  <br></br>
                                  <Input 
                                  type="checkbox" checked={ item.email_pending_payment !== '0' } name="email_pending_payment" onChange={e => handleInputChange(index, e)}  
                                  />
                                  <FormText className="muted"></FormText>
                                </FormGroup>
                            </td>
                            </tr>
                            
                            <tr style={{borderTop:'none'}}>
                              <td>
                                <FormGroup>
                                    {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                                    <Label className='mx-1'>Whatsapp</Label>
                                    <FormText className="muted"></FormText>
                                  </FormGroup>
                              </td>
                                
                              <td>
                              <FormGroup>
                                    {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                                    <Input 
                                    type="checkbox" checked={ item.whatsapp_proforma_invoice !== '0' } name="whatsapp_proforma_invoice" onChange={e => handleInputChange(index, e)}  
                                    />
                                    <FormText className="muted"></FormText>
                                  </FormGroup>
                              </td>
                                
                              <td>
                              <FormGroup>
                                  {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                                  <Input 
                                  type="checkbox" checked={item.whatsapp_invoice_dispatch !== '0' } name="whatsapp_invoice_dispatch" onChange={e => handleInputChange(index, e)} 
                                  />
                                  <FormText className="muted"></FormText>
                                </FormGroup>
                              </td>
                              
                              <td>
                                <FormGroup>
                                  {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                                  <Input 
                                  type="checkbox" checked={ item.whatsapp_ledger !== '0' } name="whatsapp_ledger" onChange={e => handleInputChange(index, e)}  
                                  />
                                  <FormText className="muted"></FormText>
                                </FormGroup>
                              </td>
                                
                              <td>
                                <FormGroup>
                                  {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                                  <Input 
                                  type="checkbox" checked={ item.whatsapp_pending_payment !== '0' } name="whatsapp_pending_payment" onChange={e => handleInputChange(index, e)}  
                                  />
                                  <FormText className="muted"></FormText>
                                </FormGroup>
                              </td>
                          </tr>
                          </>
                        ))}
                      </tbody>
                 </Table>

                  <Row className='mt-4'>
                    <Col md="8">
                        <Button disabled className='btn btn-warning' >Company Documents</Button>
                    </Col>
                  </Row>
                    <Table responsive size="sm">        
                          <thead>
                              <tr>
                                    <th >Upload Document</th>
                                    <th></th>
                                    <th ><Button type="button" className='btn-success' onClick={addCompdoc} disabled>+</Button></th>
                              </tr>
                            </thead>
                            <tbody>
                            {formDatas.compdoc.map((item, index) => (
                              <>
                                <tr key={item.id} style={{borderBottomColor:'aliceblue'}}>
                                    <td>
                                        <Input 
                                            name="name" 
                                            value={item.name} 
                                            type="text" 
                                            onChange={e => handleCompdoc(index, e)} 
                                            placeholder="" 
                                            className={errors.compDocName && item.name === '' ? "is-invalid":""}
                                            />
                                              {errors.compDocName && item.name === ''  &&  <FormText className="text-danger">Required</FormText>}
                                      </td> 
                                      <td>
                                        <Input name="file_path"  
                                            type="file" 
                                            onChange={handleImageChange} 
                                            placeholder="" 
                                            />
                                      </td>
                                      
                                     
                                          
                                      <td>
                                        <button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeCompdoc(index)} disabled={index === 0}>X</button>
                                      </td> 
                                </tr>
                                </>
                              ))}
                            </tbody>
                    </Table>
            

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