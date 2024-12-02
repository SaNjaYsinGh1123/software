import React,{useState,useEffect,useCallback} from 'react';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';

import {
  Card,
  CardBody,
  CardTitle,
  Table,
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
import { useLocation,useNavigate  } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';


// Custom hook for fetching options
const useDebouncedFetchOptions = (endpoint,queryParams='') => {
  const fetchOptions = async (inputValue) => {
    const token = localStorage.getItem('userToken');
    console.log('endpoint',endpoint);
    let endpoint1 = 'countries?'
    if(endpoint === 'states'){
      endpoint1 = `states?country_id=${queryParams} &`

    }else if(endpoint === 'cities'){
      endpoint1 = `cities?state_id=${queryParams} &`
    }
    const response = await fetch(`https://factory.teamasia.in/api/public/${endpoint1}search=${inputValue}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log('result',`https://factory.teamasia.in/api/public/${endpoint1}search=${inputValue}`);
    return result[endpoint].map(item => ({ value: item.id, label: item.name || item.code }));
  };

  const debouncedFetch = useCallback(debounce((inputValue, callback) => {
    fetchOptions(inputValue).then(callback).catch(error => {
      console.error(error);
      callback([]);
    });
  }, 300), [endpoint,queryParams]);

  return debouncedFetch;
}; 

const Edit = () => {
  const location = useLocation();
  const navigate= useNavigate();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');  // Get the query parameter "id"

  const [data4, setData4] = useState([]);
  const [errorMessageFromApi, setErrorMessageFromApi] = useState('');
  const [errors, setErrors] = useState({});

 console.log("location.state",id,location.state);
 const [formDatas, setFormDataS] = useState({
  items:[]
});

console.log('itemsX',formDatas.items)
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormDataS(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleSelectChange = (selectedOption, actionMeta) => {

  console.log('formdata',formDatas.countryId);

  if(actionMeta.name === 'countryId'){
    setFormDataS(prevState => ({
      ...prevState,
      [actionMeta.name]: selectedOption,
      stateId:'x',
      cityId:'x'
    }));
  }else if(actionMeta.name === 'stateId'){
    setFormDataS(prevState => ({
      ...prevState,
      [actionMeta.name]: selectedOption,
      cityId:'x'
    }));
  }else{
  
    setFormDataS(prevState => ({
      ...prevState,
      [actionMeta.name]: selectedOption
    }));
  }
  
};

const handleTypeChange = (e) => {
  const { name, value } = e.target;

  // console.log('e',e.target.options[e.target.selectedIndex].text);
  console.log('e',e.target.value);
  setFormDataS(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const countryOptions = useDebouncedFetchOptions('countries');
const stateOptions = useDebouncedFetchOptions('states',formDatas.countryId?.value);

const cityOptions = useDebouncedFetchOptions('cities',formDatas.stateId?.value);

const addItem = () => {
    const newItems = formDatas.items.slice();
    newItems.push({
      id:"",
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
    // console.log("data",index,newItems[index]);
    if(type === 'checkbox'){
      console.log('check value',value,event.target.checked);
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
        console.log('check not',newItems[index][name]);
    }
    setFormDataS(prevState=>({
          ...prevState,
          items:newItems
      }))    
  };

  const closer =()=>{
    setErrorMessageFromApi('');
  }

  async function apiCall() {
    try {
        
        console.log('dataX',formDatas);
        // const filtered = formDatas.items.filter((temp)=>{
        //   return temp.name !== '';
        // })

        // console.log('filtered',filtered);

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/addresses/${formDatas.addressesId}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              customer_id:formDatas.customerId,
              factory_id:formDatas.factoryId,
              vendor_id:formDatas.vendorId,
              address_type_id:formDatas.addressTypeId,
              address_alias:formDatas. addressAlias,
              address_line_1:formDatas.addressLine1,
              address_line_2:formDatas.addressLine2,
              landmark:formDatas.landMark,
              pincode:formDatas.pinCode,
              country_id:formDatas.countryId.value,
              state_id:formDatas.stateId.value,
              city_id:formDatas.cityId.value,
              gst:formDatas.gst,
              tin:formDatas.tin,
              address_representative:formDatas.items
            }),
        });

        const datas = await response.json();
        if (response.status === 200) {
          navigate('/order/customers');
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

  if(formDatas.countryId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["countryId"] = "Please select a country";
  }
  if(formDatas.stateId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["stateId"] = "Please select a state.";
  }
  if(formDatas.cityId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["cityId"] = "Please select a city.";
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





  const fetchData4 = async () => {
    const token = localStorage.getItem('userToken');
    const response = await fetch('https://factory.teamasia.in/api/public/addresstypes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("data4(addresstypes)", result.addresstypes);
    setData4(result.addresstypes);
  };

  const fetchData0 = async () => {
    console.log('id',id)
    const token = localStorage.getItem('userToken');

    try {
      const response = await fetch(`https://factory.teamasia.in/api/public/addresses/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if(response.status === 200){
        const result = await response.json();
        const resultX = result;
        console.log("data0", result.addresses,id, result.addressrepresentatives);
        setFormDataS(prevState => ({
          ...prevState,
          addressesId:resultX.id,
          customerId: resultX.customer_id,
          factoryId: resultX.factory_id,
          vendorId: resultX.vendor_id,
          addressTypeId: resultX.address_type_id,
          addressAlias: resultX.address_alias,
          addressLine1: resultX.address_line_1,
          addressLine2: resultX.address_line_2,
          landMark: resultX.landmark,
          pinCode: resultX.pincode,
          countryId: { value: resultX.country_id, label:resultX.country_name} ,
          stateId: { value: resultX.state_id, label:resultX.state_name} ,
          cityId: { value: resultX.city_id, label:resultX.city_name} ,
          gst: resultX.gst,
          tin: resultX.tin,
          items: resultX.addressrepresentatives
        }));
    
        // Fetch the other data once data0 is fetched
        fetchData4();
      } else {
        // If the status is not 200, navigate to 404
        navigate('/404');
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      navigate('/404');  // In case of any unexpected error, navigate to the 404 pa
    }
  };



  fetchData0();
}, []);

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
                  
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>Address Type</Label>
                     <Input type="select" 
                         name="addressTypeId" 
                         value={formDatas.addressTypeId}
                        onChange={handleTypeChange}
                        >
                           {data4.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>Address Alias</Label>
                     <Input  
                      type="text" 
                      name="addressAlias" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.addressAlias}
                      onChange={handleChange}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>Address Line 1</Label>
                     <Input  
                      type="text" 
                      name="addressLine1" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.addressLine1}
                      onChange={handleChange}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>Address Line 2</Label>
                     <Input  
                      type="text" 
                      name="addressLine2" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.addressLine2}
                      onChange={handleChange}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>Landmark</Label>
                     <Input  
                      type="text" 
                      name="landMark" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.landMark}
                      onChange={handleChange}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>Pin Code</Label>
                     <Input  
                      type="text" 
                      name="pinCode" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.pinCode}
                      onChange={handleChange}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                
                 <Col md="6">
                    <FormGroup>
                      <Label>Country</Label>
                      <AsyncSelect
                        name="countryId"
                        onChange={handleSelectChange}
                        loadOptions={countryOptions}
                        value={formDatas.countryId}
                        className={errors.countryId ? "is-invalid" : ""}
                        isClearable
                        isSearchable
                      />
                      {errors.countryId && (
                        <FormText className="text-danger">{errors.countryId}</FormText>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <Label>State</Label>
                      <AsyncSelect
                        name="stateId"
                        onChange={handleSelectChange}
                        loadOptions={stateOptions}
                        value={formDatas.stateId}
                        className={errors.stateId ? "is-invalid" : ""}
                        isClearable
                        isSearchable
                      />
                      {errors.stateId && (
                        <FormText className="text-danger">{errors.stateId}</FormText>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <Label>City</Label>
                      <AsyncSelect
                        name="cityId"
                        onChange={handleSelectChange}
                        loadOptions={cityOptions}
                        value={formDatas.cityId}
                        className={errors.cityId ? "is-invalid" : ""}
                        isClearable
                        isSearchable
                      />
                      {errors.cityId && (
                        <FormText className="text-danger">{errors.cityId}</FormText>
                      )}
                    </FormGroup>
                  </Col>

                 
                
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>GST No</Label>
                     <Input  
                      type="text" 
                      name="gst" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.gst}
                      onChange={handleChange}
                      />
                     <FormText className="muted"></FormText>
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