import React,{useEffect,useState} from 'react';
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

import {useNavigate, useLocation } from 'react-router-dom';
import ProductBackSideAdd from './productBackSideAdd';
// import ComponentCard from '../../components/ComponentCard';

const Add = () => {
  const location  = useLocation();
  const navigate = useNavigate();
  const {data1,data2,data3,data4,data5} = location.state;
  const [items, setItems] = useState([]);
  const [items1, setItems1] = useState([{design_id:'x',shade_id:'x'}]);
  const [items2, setItems2] = useState([]);

  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [data8, setData8] = useState([]);
  const [dataX, setDataX] = useState([]);
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errors, setErrors] = useState({});
  const [refproductidforParent, setrefproductidforParent] = useState(0);
  const [submitBlock, setsubmitBlock] = useState(false);

  const [formDatas, setFormDataS] = useState({
    grain:'x',
    fabricId:'x',
    fabricColorId:'x',
    qualityId:'x',
    colorId:'x',
    hsnId:'x',
    quantity:'',
    PricePerUnit:'',
    Thickness:'',
    TaxRate:'',
    deliveryDate:'',
    CustomerItemRefernce:'',
    isOnlineProduct:'0'
  });
  

const checkboxclick1 = () => {
  console.log('isonline',formDatas.isOnlineProduct);
    setFormDataS(prevState => ({
      ...prevState,
      isOnlineProduct: formDatas.isOnlineProduct === '0' ? '1': '0'
    }));
 
};

const handleChange = (e) => {
  const { name, value } = e.target;
  console.log('hi')
  setFormDataS(prevState => ({
    ...prevState,
    [name]: value
  }));
};

 console.log("items",items);

 const addItem = () => {
  console.log('mega',items);
  const newItems = items.slice();
  newItems.push({id:'z'});
  console.log('mega',newItems);
  setItems(newItems);
};

const removeItem = index => {
  const newItems = items.slice();
  newItems.splice(index, 1);
  setItems(newItems);
};
const addItem1 = () => {
  console.log('mega',items1);
  const newItems = items1.slice();
  newItems.push({design_id:'x',shade_id:'x'})
  console.log('mega',newItems);
  setItems1(newItems);
};

const removeItem1 = index => {
  const newItems = items1.slice();
  newItems.splice(index, 1);
  setItems1(newItems);
  
};

const addItem2 = () => {
  console.log('mega',items);
  const newItems = items2.slice();
  newItems.push({description:''})
  console.log('mega',newItems);
  setItems2(newItems);
};

const removeItem2 = index => {
  const newItems = items2.slice();
  newItems.splice(index, 1);
  setItems2(newItems);
};

 const handleInputChange = (index, event) => {
   const {name,value} = event.target;
    const newItems = items.slice();
    console.log("data1",index,name,value,newItems);
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleInputChange1 = (index, event) => {
    const {name,value} = event.target;
    const newItems = items1.slice();
    console.log("data1",index,name,value,newItems);
    newItems[index][name] = value;
    setItems1(newItems);
  };

  const handleInputChange2 = (index, event) => {
    const {name,value} = event.target;
    const newItems = items2.slice();
    console.log("data2",index,name,value,newItems);
    newItems[index][name] = value;
    setItems2(newItems);
  };

  const closer =()=>{
    setErrorMessageFromApi([]);
  }

  async function apiCall() {
    try {
        
        console.log('item',items);
        console.log('item1',items1);
        console.log('item2',items2);

        // console.log('dataX',formDatas);
        const filtered = items.filter((temp)=>{
          return temp.id !== 'z';
        });
        const filtered1 = items1.filter((temp)=>{
          return  (temp.design_id !== 'x') &&  (temp.shade_id !== 'x');
        });
        const filtered2 = items2.filter((temp)=>{
          return temp.description !== '';
        });

        const csvString = filtered.map(item => item.id).join(', ');
        console.log('csvString',csvString);

        // const filtered1 = formDatas.CompanyDocuments.filter((temp)=>{
        //   return temp.name !== '';
        // });

        console.log('formdataX',formDatas);
        console.log('filtered',filtered);
        console.log('filtered1',filtered1);
        console.log('filtered2',filtered2);


        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/products`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            
            body: JSON.stringify({
              order_id:'0',
              template_id:'0',
              grain_id: formDatas.grain,
              fabric_id: formDatas.fabricId,
              fabric_color_id: formDatas.fabricColorId.id,
              quality_id: formDatas.qualityId,
              color_id: formDatas.colorId,
              hsn_id: formDatas.hsnId,
              quantity: formDatas.quantity,
              price: formDatas.PricePerUnit,
              thickness: formDatas.Thickness,
              tax_rate: formDatas.TaxRate,
              delivery_date:formDatas.deliveryDate,
              customer_item_reference:formDatas.CustomerItemRefernce,

              topcoat: 'temp',
              foam_1: 'temp',
              filler_in_foam_1: 'temp',
              foam_2: 'temp',
              filler_in_foam_2: 'temp',
              adhesive: 'temp',
              filler_in_adhesive: 'temp',
              final_gsm: 'temp',



              is_factory_surplus_product: '1',
              is_online_product: formDatas.isOnlineProduct,
              is_trashed:  '0',
              emboss_ids: csvString,
              product_print: filtered1,
              product_additional_treatment: filtered2,
              ref_product_id:'0'
            }),
        });

        const datas = await response.json();
        console.log("dataapi",datas,response.status);
        if (response.status === 201) {
          if(formDatas.isOnlineProduct === '0'){
            navigate(-1);
          }
          setrefproductidforParent(datas.product_id);
          setsubmitBlock(true);
          console.log('product is added successfully ,please use this product id as ref_id in back side product')
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

  if(formDatas.grain === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["grain"] = "Please select a grain.";
  }

  if(formDatas.fabricId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["fabricId"] = "Please select a fabric.";
  }
  if(formDatas.qualityId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["qualityId"] = "Please select a quality.";
  }
  if(formDatas.colorId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["colorId"] = "Please select a color.";
  }
  if(formDatas.hsnId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["hsnId"] = "Please select a hsn.";
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

  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    // setSelectedType(e.target.value);

    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));

    if(name === 'fabricId'){
      if(value === 'x'){
        setDataX([]);
        setFormDataS(prevState => ({
          ...prevState,
          fabricColorId : ''
        }));
      }
      else{
          const element = data2.filter(item => item.id === value);
          console.log('element',element[0].fabriccolors[0]);
          setDataX(element[0].fabriccolors);
          setFormDataS(prevState => ({
            ...prevState,
            fabricColorId : element[0].fabriccolors[0]
          }));
      }
      
    }
    
  
   
    
    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
  };

  useEffect(() => {
    
    // Fetch the data from the API
   


    const fetchData6 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/embosses', {
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
      const resultX = result.embosses.slice();
      resultX.push({id:'z',name:'Choose'});
      setData6(resultX);
    };
    const fetchData7 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/designs', {
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
      const resultX = result.designs.slice();
      resultX.push({id:'x',design_id:'x',code:'Choose'});
      setData7(resultX);
    };

    const fetchData8 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/shades', {
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
      console.log("responsejsonXY",formDatas);
      const resultX = result.shades.slice();
      resultX.push({id:'x',shade_id:'x',name:'Choose'});
      setData8(resultX);
    };
    fetchData8();
    fetchData7();
    fetchData6();
 

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
                  
                  <Col md="10" className=''>
                    <FormGroup>
                      <Label>Grain</Label>
                      <Input type="select" 
                         name="grain" 
                         value={formDatas.grain}
                        onChange={handleTypeChange}
                        className={errors.grain ? "is-invalid" : ""}
                        disabled={submitBlock}
                        >
                           {data1.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.grain && (
                        <FormText className="text-danger">{errors.grain}</FormText>
                      )}
                      
                    </FormGroup>
                  </Col>

                 <Col md="5">
                    <FormGroup>
                      <Label>Fabric</Label>
                      <Input type="select" 
                         name="fabricId" 
                         value={formDatas.fabricId}
                        onChange={handleTypeChange}
                        className={errors.fabricId ? "is-invalid" : ""}
                        disabled={submitBlock}
                        >
                           {data2.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.fabricId && (
                        <FormText className="text-danger">{errors.fabricId}</FormText>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <Label>Fabric Color</Label>
                      <Input type="select" 
                         name="fabricColorId" 
                         value={formDatas.fabricColorId}
                        onChange={handleTypeChange}
                        disabled={submitBlock}
                        >
                           {dataX.map((item)=>{
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      
                    </FormGroup>
                  </Col>

                  <Col md="10">
                    <FormGroup>
                      <Label>Quality</Label>
                      <Input type="select" 
                         name="qualityId" 
                         value={formDatas.qualityId}
                        onChange={handleTypeChange}
                        className={errors.qualityId ? "is-invalid" : ""}
                        disabled={submitBlock}
                        >
                           {data3.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.qualityId && (
                        <FormText className="text-danger">{errors.qualityId}</FormText>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="10">
                    <FormGroup>
                      <Label>Color</Label>
                      <Input type="select" 
                         name="colorId" 
                         value={formDatas.colorId}
                        onChange={handleTypeChange}
                        className={errors.colorId ? "is-invalid" : ""}
                        disabled={submitBlock}
                       >
                           {data4.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.colorId && (
                        <FormText className="text-danger">{errors.colorId}</FormText>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="10">
                    <FormGroup>
                      <Label>HSN Code</Label>
                      <Input type="select" 
                         name="hsnId" 
                         value={formDatas.hsnId}
                        onChange={handleTypeChange}
                        className={errors.hsnId ? "is-invalid" : ""}
                        disabled={submitBlock}
                        >
                           {data5.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.hsnId && (
                        <FormText className="text-danger">{errors.hsnId}</FormText>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="10" >
                   <FormGroup>
                     <Label>Quantity (in meters)</Label>
                     <Input type="number" 
                     name="quantity" 
                     id="name"
                     placeholder="Enter number" 
                     value={formDatas.quantity}
                     onChange={handleChange}
                     disabled={submitBlock} 
                      />
                     
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>

                 <Col md="10" >
                   <FormGroup>
                     <Label>Price Per Unit (Inclusive of Tax)</Label>
                     <Input type="number" 
                     name="PricePerUnit" 
                     id="name"
                     placeholder="Enter number" 
                     value={formDatas.PricePerUnit}
                     onChange={handleChange} 
                     disabled={submitBlock}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Thickness (in mm)</Label>
                     <Input type="number" 
                     name="Thickness" 
                     id="name"
                     placeholder="Enter number" 
                     value={formDatas.Thickness}
                     onChange={handleChange} 
                     disabled={submitBlock}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Tax Rate (in %)</Label>
                     <Input type="number" 
                     name="TaxRate" 
                     id="name"
                     placeholder="Enter number" 
                     value={formDatas.TaxRate}
                     onChange={handleChange} 
                     disabled={submitBlock}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Delivery Date</Label>
                     <Input type="date" 
                     name="deliveryDate" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.deliveryDate}
                     onChange={handleChange} 
                     disabled={submitBlock}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Customer Item Reference</Label>
                     <Input type="text" 
                     name="CustomerItemRefernce" 
                     id="name"
                     placeholder="Enter" 
                     value={formDatas.CustomerItemRefernce}
                     onChange={handleChange}
                     disabled={submitBlock} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 

                 <Row>
                  <Col md="8">
                    <Label>Embosses</Label>
                  </Col>
                  <table className="table">        
                     <thead>
                        <tr>
                          <Row>
                            <Col md="8"><th className='noborder'>Embosses</th></Col>
                            <Col md="2">
                              <Button type="button" className='btn-success' onClick={addItem} disabled={submitBlock}>Add More</Button>
                            </Col>
                          </Row>
                        </tr>
                      </thead>
          
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={item.index}>
                          <Row>
                            <Col md="8">
                              <Input type="select" 
                                name="id" 
                                value={item.id}
                                onChange={e => handleInputChange(index, e)}>
                                  {data6.map((itemdata)=>{
          
                                    return <option key={itemdata.id} value={itemdata.id}>{itemdata.name}</option>
                                  })}
                              </Input>
                            </Col>
                            
                            <Col md="2"><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem(index)}>X</button></Col>
                          </Row>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Row>

                


               <Row>
                  <Col md="8">
                    <Label>Prints</Label>
                  </Col>
                    <table className="table">        
                     <thead>
                        <tr>
                          <Row>
                            <Col md="4"><th className='noborder'>Designs</th></Col>
                            <Col md="4"><th className='noborder'>Shades</th></Col>
                            <Col md="2">
                              <Button type="button" className='btn-success' onClick={addItem1} disabled={submitBlock}>Add More</Button>
                            </Col>
                          </Row>
                        </tr>
                      </thead>
          
                    <tbody>
                    {items1.map((item, index) => (
                        <tr key={item.index}>
                          <Row>
                            <Col md="4">
                              <Input type="select" 
                                name="design_id" 
                                value={item.design_id}
                                onChange={e => handleInputChange1(index, e)}>
                                  {data7.map((itemdata)=>{
          
                                    return <option key={itemdata.id} value={itemdata.id}>{itemdata.code}</option>
                                  })}
                              </Input>
                            </Col>
                            <Col md="4">
                              <Input type="select" 
                                  name="shade_id" 
                                  value={item.shade_id}
                                  onChange={e => handleInputChange1(index, e)}>
                                    {data8.map((itemdata)=>{
            
                                      return <option key={itemdata.id} value={itemdata.id}>{itemdata.name}</option>
                                    })}
                              </Input>
                            </Col>
                            <Col md="2"><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem1(index)} disabled={index === 0}>X</button></Col>
                          </Row>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Row>

                <Row>
                  <Col md="8">
                    <Label>Additional Treatments</Label>
                  </Col>
                  <table className="table">        
                     <thead>
                        <tr>
                          <Row>
                            <Col md="8"><th className='noborder'>Additional Treatments</th></Col>
                            <Col md="2">
                              <Button type="button" className='btn-success' onClick={addItem2} disabled={submitBlock}>Add More</Button>
                            </Col>
                          </Row>
                        </tr>
                      </thead>
          
                    <tbody>
                    {items2.map((item, index) => (
                        <tr key={item.id}>
                          <Row>
                            <Col md="8"><Input name="description" value={item.description} type="text" onChange={e => handleInputChange2(index, e)} placeholder="" /></Col>
                            <Col md="2"><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem2(index)}>X</button></Col>
                          </Row>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Row>

                <Col md="10">
                          <FormGroup>
                            {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                            <Input type="checkbox" checked={formDatas.isOnlineProduct === '1'} onChange={checkboxclick1} disabled={submitBlock} />
                            <Label className='mx-1'> This is a online product</Label>
                            <FormText className="muted"></FormText>
                          </FormGroup>
                </Col>

                 <Col md="4">
                   <FormGroup>
                    <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}
                     disabled={submitBlock}>
                        Submit
                    </Button>
                   </FormGroup>
                 </Col>
               </Row>
               
              
             </Form>
             
             {
              formDatas.isOnlineProduct === '1'? <ProductBackSideAdd refproductidforParent={refproductidforParent} FrontSubmitBlock={submitBlock} frontSidedata={formDatas} data1={data1} data2={data2} data3={data3} data4={data4} data5={data5} data6={data6} data7={data7} data8={data8} />:''
             }
           </CardBody>
           
         </Card>
       </Col> 
     </Row>
     
   </div>

   
   
  );
};

export default Add;