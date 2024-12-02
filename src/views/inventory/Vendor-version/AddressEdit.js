import React,{useState,useEffect} from 'react';

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
import { useLocation,useNavigate  } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
  const location = useLocation();
  const navigate= useNavigate();
  const {id,
    customer_id:customerId,
    factory_id:factoryId,
    newVendorId:vendorId,
    address_type_id:addressTypeId,
    address_alias:addressAlias,
    address_line_1:addressLine1,
    address_line_2:addressLine2,
    landmark:landMark,
    pincode:pinCode,
    country_id:countryId,
    state_id:stateId,
    city_id:cityId,
    gst,
    tin,
    addressrepresentatives:addressRepresentative
  } = location.state || {}; // Default to an empty object if state is undefined
  // const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data1x, setData1x] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data3x, setData3x] = useState([]);
  const [data4, setData4] = useState([]);
  const [items, setItems] = useState(addressRepresentative);
  const [errors, setErrors] = useState({});

 console.log("items",items,location.state);
 const [formDatas, setFormDataS] = useState({
       customerId,
       factoryId,
       vendorId,
       addressTypeId,
       addressAlias,
       addressLine1,
       addressLine2,
       landMark,
       pinCode,
      countryId,
      stateId,
      cityId,
      gst,
      tin,
      items:addressRepresentative
 });

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormDataS(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleTypeChange = (e) => {
  const { name, value } = e.target;

  console.log('name',name,value);
  console.log('data3',data3);
  
  if(name === 'countryId'){
    
    const stateElement = data3.filter(item => item.country_id === value);
    console.log('element',stateElement);
    const resultX = stateElement.slice();
    resultX.push({id:'x',name:'Choose'});
    setData3x(resultX);
    setFormDataS(prevState => ({
      ...prevState,
      stateId:'x',
      cityId:'x'
    }));
  }
  else if(name === 'stateId'){
    
    const stateElement = data1.filter(item => item.state_id === value);
    console.log('element',stateElement);
    const resultX = stateElement.slice();
    resultX.push({id:'x',name:'Choose'});
    setData1x(resultX);
    setFormDataS(prevState => ({
      ...prevState,
      cityId:'x'
    }));
  }

  // console.log('e',e.target.options[e.target.selectedIndex].text);
  console.log('e',e.target.value);
  setFormDataS(prevState => ({
    ...prevState,
    [name]: value
  }));
};

  const addItem = () => {
    const newItems = items.slice();
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
    })
    setItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = items.slice();
    newItems.splice(index, 1);
    console.log('newItems',newItems);
    setItems(newItems);
    setFormDataS(prevState=>({
      ...prevState,
      items:newItems
  }))
  };

  const handleInputChange = (index, event) => {
    const {name ,value,type} = event.target;
    const newItems = items.slice();
    console.log("data",index,newItems[index]);
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
    setItems(newItems);
    setFormDataS(prevState=>({
          ...prevState,
          items:newItems
      }))
    
  };

  async function apiCall() {
    try {
        // const formData = new FormData();
        // formData.append('name', formDatas.name);
        // formData.append('iso_code', formDatas.isoCode);
        // formData.append('isd_code', formDatas.isdCode);
        console.log('dataX',formDatas.items);
        const filtered = formDatas.items.filter((temp)=>{
          return temp.name !== '';
        })

        console.log('filtered',filtered);

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/addresses/${id}`, {
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
              country_id:formDatas.countryId,
              state_id:formDatas.stateId,
              city_id:formDatas.cityId,
              gst:formDatas.gst,
              tin:formDatas.tin,
              address_representative:filtered
            }),
        });

        const datas = await response.json();
        console.log("dataapi",datas)
        if (response.ok) {

          console.log('formdata2',formDatas)
          navigate('/inventory/vendors');
            
        } 
            // Handle any errors, such as showing an error message to the user
            console.error("Authentication failed:", datas.message);
            return null;
      
    } catch (error) {
        console.error("Network error:", error);
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

 
  


  // ... repeat for other fields ...

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

// const checkboxclick = ()=>{
//   let value;
//   console.log('hi',check);
//   setCheck(!check);
//   if(check){
//     value=0
//   }else{
//     value=1
//   }
//   setFormDataS(prevState => ({
//    ...prevState,
//    DefaultToFactoryStock:value
//  }));
// }
useEffect(()=>{
  
    
    const stateElement1 = data3.filter(item => item.country_id === formDatas.countryId);
    console.log('element',stateElement1);
    const resultX = stateElement1.slice();
    resultX.push({id:'x',name:'Choose'});
    setData3x(resultX);
    
  
    
    const stateElement2 = data1.filter(item => item.state_id === formDatas.stateId);
    console.log('element',stateElement2);
    const resultY = stateElement2.slice();
    resultY.push({id:'x',name:'Choose'});
    setData1x(resultY);
    
  

},[data1,data3,data2])

  useEffect(() => {
    
    // Fetch the data from the API
    // const fetchData = async () => {
    //   const token = localStorage.getItem('userToken');
    //   console.log('token',token);
    //   const response = await fetch('https://factory.teamasia.in/api/public/addresses/1', {
    //     method: 'GET', 
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   });
    //   console.log('result',response);
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const result = await response.json();
    //   console.log("responsejson",id,result);
    //   setData(result); 
    //   setFormDataS(prevState => ({
    //     ...prevState,
    //     customer_id:result.customer_id,
    //     factory_id:result.factory_id,
    //     vendor_id:result.vendor_id,
    //     address_type_id:result.address_type_id,
    //     address_alias:result.address_alias,
    //     address_line_1:result.address_line_1,
    //     address_line_2:result.address_line_2,
    //     landmark:result.landmark,
    //     pincode:result.pincode,
    //     country_id:result.country_id,
    //     state_id:result.state_id,
    //     city_id:result.city_id,
    //     gst:result.gst,
    //     tin:result.tin,
    //     address_representative:result.addressrepresentatives
    //   }));
    //   setItems(result.addressrepresentatives);
    // };
 

    const fetchData1 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/cities', {
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
      console.log("cities",result);
      const resultX = result.cities.slice();
      resultX.push({id:'x',name:'Choose'});
      setData1x(resultX)
      setData1(result.cities); 
    };

    const fetchData2 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/countries', {
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
      console.log("countries",result);
      const resultX = result.countries.slice();
      resultX.push({id:'x',name:'Choose'});
      setData2(resultX); 
    };
    const fetchData3 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/states', {
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
      console.log("states",result);
      const resultX = result.states.slice();
      resultX.push({id:'x',name:'Choose'});
      setData3x(resultX); 
      setData3(result.states); 
    };

    const fetchData4 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/addresstypes', {
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
      console.log("states",result);
      setData4(result.addresstypes); 
    };

    fetchData4();
    fetchData3();
    fetchData2();
    fetchData1();
    // fetchData();
    // console.log("data",data);
    console.log("data1",data1);
    console.log("data2",data2);
    console.log("data3",data3);
    console.log("data4",data4);
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
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>Country</Label>
                     <Input type="select" 
                         name="countryId" 
                         value={formDatas.countryId}
                        onChange={handleTypeChange}
                        className={errors.countryId ? "is-invalid" : ""}
                        >
                           {data2.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.countryId && (
                        <FormText className="text-danger">{errors.countryId}</FormText>
                      )}
                   </FormGroup>
                 </Col>
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>State</Label>
                     <Input type="select" 
                         name="stateId" 
                         value={formDatas.stateId}
                        onChange={handleTypeChange}
                        className={errors.stateId ? "is-invalid" : ""}
                        >
                           {data3x.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.stateId && (
                        <FormText className="text-danger">{errors.stateId}</FormText>
                      )}
                   </FormGroup>
                 </Col>
                 <Col md="6" className=''>
                   <FormGroup>
                     <Label>City</Label>
                     <Input type="select" 
                         name="cityId" 
                         value={formDatas.cityId}
                        onChange={handleTypeChange}
                        className={errors.cityId ? "is-invalid" : ""}
                        >
                           {data1x.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
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

                 <table className="table">        
                  <thead className='nobordertop'>
                        <tr className='nobordertop'>
                          <Row>
                            <Col md="2"><th className='noborder'>Name</th></Col>
                            <Col md="3"><th className='noborder'>Designation</th></Col>
                            <Col md="3"><th className='noborder'>Email</th></Col>
                            <Col md="1"><th className='noborder'>Country code</th></Col>
                            <Col md="2"><th className='noborder'>Mobile</th></Col>
                            <Col md="1"><th className='noborder'><Button type="button" className='btn-success' onClick={addItem}>+</Button></th></Col>
                          </Row>
                        </tr>
                      </thead>
          
              <tbody>
              {items.map((item, index) => (
                  <tr key={item.id}>
                    <Row>
                      <Col md="2"><Input name="name" value={item.name} type="text" onChange={e => handleInputChange(index, e)} placeholder="" /></Col>
                      <Col md="3"><Input name="designation" value={item.designation} type="text" onChange={e => handleInputChange(index, e)} placeholder="" /></Col>
                      <Col md="3"><Input name="email" value={item.email} type="text" onChange={e => handleInputChange(index, e)} placeholder="" /></Col>
                      <Col md="1"><Input name="country_code" value={item.country_code} type="text" onChange={e => handleInputChange(index, e)} placeholder="" /></Col>
                      <Col md="2"><Input name="mobile" value={item.mobile} type="text" onChange={e => handleInputChange(index, e)} placeholder="" /></Col>
                      <Col md="1"><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem(index)}>X</button></Col>
                    </Row>
                    <Row>
                    <Col md="2">
                      <FormGroup>
                        {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                        <br></br>
                        <Label className='mx-1'>Email</Label>
                        <FormText className="muted"></FormText>
                      </FormGroup>
                    </Col>

                     <Col md="2">
                      <FormGroup>
                        {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                        <Label className=''>Proforma Invoice</Label>
                        <br></br>
                        <Input 
                        type="checkbox" checked={ item.email_proforma_invoice !== '0' } name="email_proforma_invoice" onChange={e => handleInputChange(index, e)}  
                        />
                        <FormText className="muted"></FormText>
                      </FormGroup>
                    </Col>
                     <Col md="2">
                      <FormGroup>
                        {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                        <Label className=''>Invoice/dispatch</Label>
                        <br></br>
                        <Input 
                        type="checkbox" checked={ item.email_invoice_dispatch !== '0' } name="email_invoice_dispatch" onChange={e => handleInputChange(index, e)}  
                        />
                        <FormText className="muted"></FormText>
                      </FormGroup>
                    </Col>
                     <Col md="2">
                      <FormGroup>
                        {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                        <Label className=''>Ledgers</Label>
                        <br></br>
                        <Input 
                        type="checkbox" checked={ item.email_ledger !== '0' } name="email_ledger" onChange={e => handleInputChange(index, e)}  
                        />
                        <FormText className="muted"></FormText>
                      </FormGroup>
                    </Col>
                     <Col md="2">
                      <FormGroup>
                        {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                        <Label className=''>Pending Payments</Label>
                        <br></br>
                        <Input 
                        type="checkbox" checked={ item.email_pending_payment !== '0' } name="email_pending_payment" onChange={e => handleInputChange(index, e)}  
                        />
                        <FormText className="muted"></FormText>
                      </FormGroup>
                    </Col>
                    </Row>

                    <Row>
                    <Col md="2">
                      <FormGroup>
                        {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                        <Label className='mx-1'>Whatsapp</Label>
                        <FormText className="muted"></FormText>
                      </FormGroup>
                    </Col>
                     <Col md="2">
                      <FormGroup>
                        {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                        <Input 
                        type="checkbox" checked={ item.whatsapp_proforma_invoice !== '0' } name="whatsapp_proforma_invoice" onChange={e => handleInputChange(index, e)}  
                        />
                        <FormText className="muted"></FormText>
                      </FormGroup>
                    </Col>
                     <Col md="2">
                      <FormGroup>
                        {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                        <Input 
                        type="checkbox" checked={item.whatsapp_invoice_dispatch !== '0' } name="whatsapp_invoice_dispatch" onChange={e => handleInputChange(index, e)} 
                        />
                        <FormText className="muted"></FormText>
                      </FormGroup>
                    </Col>
                     <Col md="2">
                      <FormGroup>
                        {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                        <Input 
                        type="checkbox" checked={ item.whatsapp_ledger !== '0' } name="whatsapp_ledger" onChange={e => handleInputChange(index, e)}  
                        />
                        <FormText className="muted"></FormText>
                      </FormGroup>
                    </Col>
                     <Col md="2">
                      <FormGroup>
                        {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                        <Input 
                        type="checkbox" checked={ item.whatsapp_pending_payment !== '0' } name="whatsapp_pending_payment" onChange={e => handleInputChange(index, e)}  
                        />
                        <FormText className="muted"></FormText>
                      </FormGroup>
                    </Col>
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

export default Edit;