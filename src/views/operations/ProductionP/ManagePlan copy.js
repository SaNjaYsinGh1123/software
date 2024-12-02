import React ,{useState,useEffect} from 'react';
import {
  Collapse,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  FormText,   
  Row,
  Col,
  Table,
  Input
} from 'reactstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import ComponentCard1 from '../../../components/ComponentCard1';
import ComponentCard4 from '../../../components/ComponentCard4';
import 'react-table-v6/react-table.css';
import OrderProduct from './orderProduct';

const JumbotronComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState([]);
  const {id,managePlanDate}    = location.state || {}; 
  const [data,setData] = useState([]);
  const [CustomerData,setCustomerData] = useState([]);
  const [line1, setLine1] = useState([]);
  const [line2, setLine2] = useState([]);
  const [line3, setLine3] = useState([]);
  const [line4, setLine4] = useState([]);
  const [errors,setErrors] = useState({});
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);

  const [activeTab, setActiveTab] = useState('1');

  const toggle1 = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  console.log('location',id);
  const toggle = (index) => {
    const newArray = [...collapse];
    newArray[index]= !newArray[index];
    setCollapse(newArray);
  }

  const addItemToLine = (product) => {
    let newItems;
    // console.log('mega in additemline',line1,product);
    if(activeTab === '1'){
       newItems = line1.slice();
    }
    else if(activeTab === '2'){
       newItems = line2.slice();
    }
    else if(activeTab === '3'){
       newItems = line3.slice();
    }
    else if(activeTab === '4'){
       newItems = line4.slice();
    }

    newItems.push({...product,product_id:product.id,plan_date:managePlanDate,quantity:'',pre_skin:'',skin:'',top_coat:'',filler_in_top_coat:'',foam:'',filler_in_foam:'',adhesive:'',filler_in_adhesive:'',final_gsm:'',line_id:activeTab});

    // console.log('mega',newItems);
    if(activeTab === '1'){
       setLine1(newItems);
   }
   else if(activeTab === '2'){
       setLine2(newItems);
   }
   else if(activeTab === '3'){
       setLine3(newItems);
   }
   else if(activeTab === '4'){
       setLine4(newItems);
   }
  };
  
  const removeItemFromLine = index => {
    let newItems;
    // console.log('mega in removeitemline',line1);
    if(activeTab === '1'){
       newItems = line1.slice();
    }
    else if(activeTab === '2'){
       newItems = line2.slice();
    }
    else if(activeTab === '3'){
       newItems = line3.slice();
    }
    else if(activeTab === '4'){
       newItems = line4.slice();
    }
    newItems.splice(index, 1);

    // console.log('mega',newItems);
    if(activeTab === '1'){
       setLine1(newItems);
   }
   else if(activeTab === '2'){
       setLine2(newItems);
   }
   else if(activeTab === '3'){
       setLine3(newItems);
   }
   else if(activeTab === '4'){
       setLine4(newItems);
   }
  };

  const handleInputChangeOfPlan = (index, event) => {
    let newItems;
    const {name ,value} = event.target;
    if(activeTab === '1'){
      newItems = line1.slice();
   }
   else if(activeTab === '2'){
      newItems = line2.slice();
   }
   else if(activeTab === '3'){
      newItems = line3.slice();
   }
   else if(activeTab === '4'){
      newItems = line4.slice();
   }

  // console.log("data",index,newItems[index]);

  newItems[index][name] =  value;

if(activeTab === '1'){
    setLine1(newItems);
}
else if(activeTab === '2'){
    setLine2(newItems);
}
else if(activeTab === '3'){
    setLine3(newItems);
}
else if(activeTab === '4'){
    setLine4(newItems);
}
  };

  // const handleEditcustomer = () => {
  //   navigate('/order/customers/edit',{state:location.state});
  // };
  
const CustomerName =(customerId)=>{
    // console.log('customerData',CustomerData);
    const result =  CustomerData.find((item)=> item.id === customerId);
    if(!result){
      return 'unknown customer'
    }
    return result.company_name.toUpperCase();
}

function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    // Use Intl.DateTimeFormat to format the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);

}
const closer =()=>{
  setErrorMessageFromApi([]);
}

async function apiCall() {
  try {
      
      console.log('item1',line1);
      console.log('item2',line2);
      console.log('item3',line3);
      console.log('item4',line4);
     


      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/productionplan`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
         
          body: JSON.stringify([...line1,...line2,...line3,...line4]),
      });

      const datas = await response.json();
      // console.log("dataapi",datas,response);
      if (response.status === 201) {
        console.log('product is added successfully ,please use this product id as ref_id in back side product')
        navigate(-1);
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

const validateForm =()=>{
  let formIsValid =true;
  const errors1 ={};

  
    line1.forEach((element) => {
    console.log('element',element);
    if(element.quantity=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["quantity"] ="Required"
          }
          if(element.pre_skin === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["pre_skin"] ="Required"
          }
          if(element.skin	=== '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["skin"] ="Required"
          }
          if(element.top_coat === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["top_coat"] ="Required"
          }
          if(element.filler_in_top_coat === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["filler_in_top_coat"] ="Required"
          }
          if(element.foam === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["foam"] ="Required"
          }
          if(element.filler_in_foam === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["filler_in_foam"] ="Required"
          }
          if(element.adhesive === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["adhesive"] ="Required"
          }
          if(element.filler_in_adhesive === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["filler_in_adhesive"] ="Required"
          }
          if(element.final_gsm === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["final_gsm"] ="Required"
          }
      });
    
    line2.forEach((element) => {
      console.log('element',element);
      if(element.quantity=== ''){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["quantity"] ="Required"
            }
            if(element.pre_skin === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["pre_skin"] ="Required"
            }
            if(element.skin	=== '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["skin"] ="Required"
            }
            if(element.top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["top_coat"] ="Required"
            }
            if(element.filler_in_top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_top_coat"] ="Required"
            }
            if(element.foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["foam"] ="Required"
            }
            if(element.filler_in_foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_foam"] ="Required"
            }
            if(element.adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["adhesive"] ="Required"
            }
            if(element.filler_in_adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_adhesive"] ="Required"
            }
            if(element.final_gsm === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["final_gsm"] ="Required"
            }
        });

    line3.forEach((element) => {
      console.log('element',element);
      if(element.quantity=== ''){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["quantity"] ="Required"
            }
            if(element.pre_skin === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["pre_skin"] ="Required"
            }
            if(element.skin	=== '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["skin"] ="Required"
            }
            if(element.top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["top_coat"] ="Required"
            }
            if(element.filler_in_top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_top_coat"] ="Required"
            }
            if(element.foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["foam"] ="Required"
            }
            if(element.filler_in_foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_foam"] ="Required"
            }
            if(element.adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["adhesive"] ="Required"
            }
            if(element.filler_in_adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_adhesive"] ="Required"
            }
            if(element.final_gsm === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["final_gsm"] ="Required"
            }
        });

    line4.forEach((element) => {
      console.log('element',element);
      if(element.quantity=== ''){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["quantity"] ="Required"
            }
            if(element.pre_skin === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["pre_skin"] ="Required"
            }
            if(element.skin	=== '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["skin"] ="Required"
            }
            if(element.top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["top_coat"] ="Required"
            }
            if(element.filler_in_top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_top_coat"] ="Required"
            }
            if(element.foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["foam"] ="Required"
            }
            if(element.filler_in_foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_foam"] ="Required"
            }
            if(element.adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["adhesive"] ="Required"
            }
            if(element.filler_in_adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_adhesive"] ="Required"
            }
            if(element.final_gsm === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["final_gsm"] ="Required"
            }
        });

  setErrors(errors1);
  return formIsValid;
}

const handleSubmit = async () => {
  if(validateForm()) {
    console.log('Form is valid, proceed with API call');
    apiCall();
  } else {
    console.log('Form is invalid, do not submit');
  }
  
};

useEffect(()=>{
    const fetchData = async ()=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/orders/?status_id=1`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
  //  console.log('responsejson',result);
   if(result.orders.length !== 0){
     setCollapse(Array(result.orders.length).fill(false));
     setData(result.orders);
   }
  }
    const fetchCustomerData = async ()=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/customers`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
  //  console.log('responsejson',result);
     setCustomerData(result.customers);
  
  }
    fetchCustomerData();
    fetchData();
  },[]);
  
  // console.log('data',data);

  return (
    <>
      <ComponentCard1 title="">
              <Row>
                <Col md="12">
                    <ComponentCard4>
                        <div className="order-view-page-flex">
                          <div style={{fontSize:'17px',fontWeight:'500',textTransform:'uppercase'}}> Manage Production Plan @ <span style={{fontWeight:'800'}}>{formatDate(managePlanDate)} </span>
                            <span style={{marginLeft:'17px'}}>
                                    {/* <Button className='my-btn-color' onClick={() => handleEditcustomer()}>
                                        Change Date
                                    </Button> */}
                            </span>
                          </div>
                        </div>
                    </ComponentCard4>
                   
                </Col>
              </Row>
               
              <Row>
                 <Col md="5"> 
                        {data.length !== 0?
                          data.map((AddressItem,index)=>(
                            <div key={AddressItem.id}>
                                {/* <div className="my-btn-color" onClick={()=>toggle(index)} style={{textAlign:'center',color:'white',marginBottom:'2px',padding:'5px'}}> #{AddressItem.id} {CustomerName(AddressItem.customer_id)} (Grains : ALINEA,3001 A) <br></br> */}
                                <div className="my-btn-color" onClick={()=>toggle(index)} style={{textAlign:'center',color:'white',marginBottom:'2px',padding:'5px'}}> #{AddressItem.id} {CustomerName(AddressItem.customer_id)}<br></br>
                                    Order Date: {formatDate(AddressItem.created_at)} | Nearest Expected Date: {formatDate(AddressItem.expected_delivery_date)}
                                </div>
                                <Collapse isOpen={collapse[index]}>
                                    <OrderProduct orderID ={AddressItem.id} formatDate = {formatDate} addItemToLine={addItemToLine} removeItemFromLine = {removeItemFromLine} customerNameFromManagePlan={CustomerName(AddressItem.customer_id)} customerID={AddressItem.customer_id}/>
                                </Collapse>
                            </div>
                          ))
                          :<div className="my-btn-color"  style={{textAlign:'center',color:'white',marginBottom:'2px',padding:'20px'}}> 
                               NO CONFIRMED ORDER
                          </div>
                        }
                 </Col>
                <Col md="7">
                    <ComponentCard4 title="">
                      <div>{errorMessageFromApi.length !== 0 && (
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
                    </div>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={activeTab === '1' ? 'active' : ''}
                            onClick={() => {
                              toggle1('1');
                            }}
                          >
                            Line 1
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === '2' ? 'active' : ''}
                            onClick={() => {
                              toggle1('2');
                            }}
                          >
                            Line 2
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === '3' ? 'active' : ''}
                            onClick={() => {
                              toggle1('3');
                            }}
                          >
                            Line 1 (night)
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === '4' ? 'active' : ''}
                            onClick={() => {
                              toggle1('4');
                            }}
                          >
                            Line 2 (night)
                          </NavLink>
                        </NavItem>
                        {/* <Button ><i className='bi bi-arrow-down-square'></i></Button> */}
                        <Button className='my-btn-color' onClick={()=>handleSubmit()}>Save Plan</Button>
                      </Nav>
                      <TabContent className="p-2" activeTab={activeTab}>

                        <TabPane tabId="1">
                          {
                            line1.map((product,index)=>
                              {
                                return <div key={product.id}>
                                <div>
                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.id} 
                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customerNameFromManagePlan}</button>
                                  {/* {product.is_factory_surplus_product !== '0' && <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>factory product</button>} */}
                                  {(product.is_online_product !== '0' || product.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                  {product.is_online_product !== '0' && product.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                  {product.is_online_product === '0' && product.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                    <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                </div>
                                <Table size='sm' className="order-page-table" responsive>     
                                      <tbody> 
                                            <tr>
                                                <td title={product.grain_name}>{product.grain_name}</td>
                                                <td title={product.color_name}>{product.color_name}</td>
                                                <td title={product.quality_name}>{product.quality_name}</td>
                                                <td title={product.fabric_name}>{product.fabric_name}</td>
                                                <td title={product.fabric_color_name}>{product.fabric_color_name}</td>
                                            </tr>
                                            <tr>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title={product.thickness}>{product.thickness}mm</td>
                                            </tr>
                                            
                                            <tr>
                                              <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                              <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                            </tr>
                                            <tr>
                                              <td title="" colSpan={3}>Additional Treatment :</td>
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="quantity" 
                                                  value={product.quantity} 
                                                  type="number" 
                                                  
                                                  placeholder="quantity"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  className={product.quantity  === '' && errors.quantity  ? "is-invalid":""}
                                                  />
                                                  { product.quantity === '' && errors.quantity  &&  <FormText className="text-danger">Required</FormText>}
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="pre_skin" 
                                                  value={product.pre_skin} 
                                                  type="text" 
                              
                                                  placeholder="pre Skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  className={product.pre_skin  === '' && errors.pre_skin  ? "is-invalid":""}
                                                  />
                                                  { product.pre_skin === '' && errors.pre_skin  &&  <FormText className="text-danger">Required</FormText>}
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="skin" 
                                                  value={product.skin} 
                                                  type="text" 
                                                  
                                                  placeholder="skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  className={product.skin  === '' && errors.skin  ? "is-invalid":""}
                                                  />
                                                  { product.skin === '' && errors.skin  &&  <FormText className="text-danger">Required</FormText>}
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="top_coat" 
                                                  value={product.top_coat} 
                                                  type="text" 
                                                  
                                                  placeholder="topCoat"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  className={product.top_coat  === '' && errors.top_coat  ? "is-invalid":""}
                                                  />
                                                  { product.top_coat === '' && errors.top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="filler_in_top_coat" 
                                                  value={product.filler_in_top_coat} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In TopCoat" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  className={product.filler_in_top_coat  === '' && errors.filler_in_top_coat  ? "is-invalid":""}
                                                  />
                                                  { product.filler_in_top_coat === '' && errors.filler_in_top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                              </td>
                                              
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="foam" 
                                                  value={product.foam} 
                                                  type="text" 
                                                   
                                                  placeholder="foam" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  className={product.foam  === '' && errors.foam  ? "is-invalid":""}
                                                  />
                                                  { product.foam === '' && errors.foam  &&  <FormText className="text-danger">Required</FormText>}
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="filler_in_foam" 
                                                  value={product.filler_in_foam} 
                                                  type="text" 
                                                  
                                                  placeholder="filler In Form" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  className={product.filler_in_foam  === '' && errors.filler_in_foam  ? "is-invalid":""}
                                                  />
                                                  { product.filler_in_foam === '' && errors.filler_in_foam  &&  <FormText className="text-danger">Required</FormText>}
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="adhesive" 
                                                  value={product.adhesive} 
                                                  type="text"  
                                                  placeholder="adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  className={product.adhesive  === '' && errors.adhesive  ? "is-invalid":""}
                                                  />
                                                  { product.adhesive === '' && errors.adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="filler_in_adhesive" 
                                                  value={product.filler_in_adhesive} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In Adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  className={product.filler_in_adhesive  === '' && errors.filler_in_adhesive  ? "is-invalid":""}
                                                  />
                                                  { product.filler_in_adhesive === '' && errors.filler_in_adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="final_gsm" 
                                                  value={product.final_gsm} 
                                                  type="text" 
                                                   
                                                  placeholder="finalGsm"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  className={product.final_gsm  === '' && errors.final_gsm ? "is-invalid":""}
                                                  />
                                                  { product.final_gsm === '' && errors.final_gsm  &&  <FormText className="text-danger">Required</FormText>}
                                              </td>
                                              
                                            </tr>
                                      </tbody>
                                </Table> 
                            </div>
                              }
                              
                            )
                          }
                        </TabPane>
                        <TabPane tabId="2">
                        {
                            line2.map((product,index)=>
                              {
                                return <div key={product.id}>
                                <div>
                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.id} 
                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customerNameFromManagePlan}</button>
                                  {/* {product.is_factory_surplus_product !== '0' && <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>factory product</button>} */}
                                  {(product.is_online_product !== '0' || product.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                  {product.is_online_product !== '0' && product.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                  {product.is_online_product === '0' && product.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                    <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                </div>
                                <Table size='sm' className="order-page-table" responsive>     
                                      <tbody> 
                                            <tr>
                                                <td title={product.grain_name}>{product.grain_name}</td>
                                                <td title={product.color_name}>{product.color_name}</td>
                                                <td title={product.quality_name}>{product.quality_name}</td>
                                                <td title={product.fabric_name}>{product.fabric_name}</td>
                                                <td title={product.fabric_color_name}>{product.fabric_color_name}</td>
                                            </tr>
                                            <tr>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title={product.thickness}>{product.thickness}mm</td>
                                            </tr>
                                            
                                            <tr>
                                              <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                              <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                            </tr>
                                            <tr>
                                              <td title="" colSpan={3}>Additional Treatment :</td>
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="quantity" 
                                                  value={product.quantity} 
                                                  type="number" 
                                                  
                                                  placeholder="quantity"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="pre_skin" 
                                                  value={product.pre_skin} 
                                                  type="text" 
                              
                                                  placeholder="pre Skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="skin" 
                                                  value={product.skin} 
                                                  type="text" 
                                                  
                                                  placeholder="skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="top_coat" 
                                                  value={product.top_coat} 
                                                  type="text" 
                                                  
                                                  placeholder="topCoat"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="filler_in_top_coat" 
                                                  value={product.filler_in_top_coat} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In TopCoat" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  
                                                  />
                                              </td>
                                              
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="foam" 
                                                  value={product.foam} 
                                                  type="text" 
                                                   
                                                  placeholder="foam" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="filler_in_foam" 
                                                  value={product.filler_in_foam} 
                                                  type="text" 
                                                  
                                                  placeholder="filler In Form" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="adhesive" 
                                                  value={product.adhesive} 
                                                  type="text"  
                                                  placeholder="adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="filler_in_adhesive" 
                                                  value={product.filler_in_adhesive} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In Adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="final_gsm" 
                                                  value={product.final_gsm} 
                                                  type="text" 
                                                   
                                                  placeholder="finalGsm"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              
                                            </tr>
                                      </tbody>
                                </Table> 
                            </div>
                              }
                              
                            )
                          }
                        </TabPane>
                        <TabPane tabId="3">
                        {
                            line3.map((product,index)=>
                              {
                                return <div key={product.id}>
                                <div>
                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.id} 
                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customerNameFromManagePlan}</button>
                                  {/* {product.is_factory_surplus_product !== '0' && <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>factory product</button>} */}
                                  {(product.is_online_product !== '0' || product.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                  {product.is_online_product !== '0' && product.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                  {product.is_online_product === '0' && product.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                    <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                </div>
                                <Table size='sm' className="order-page-table" responsive>     
                                      <tbody> 
                                            <tr>
                                                <td title={product.grain_name}>{product.grain_name}</td>
                                                <td title={product.color_name}>{product.color_name}</td>
                                                <td title={product.quality_name}>{product.quality_name}</td>
                                                <td title={product.fabric_name}>{product.fabric_name}</td>
                                                <td title={product.fabric_color_name}>{product.fabric_color_name}</td>
                                            </tr>
                                            <tr>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title={product.thickness}>{product.thickness}mm</td>
                                            </tr>
                                            
                                            <tr>
                                              <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                              <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                            </tr>
                                            <tr>
                                              <td title="" colSpan={3}>Additional Treatment :</td>
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="quantity" 
                                                  value={product.quantity} 
                                                  type="number" 
                                                  
                                                  placeholder="quantity"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="pre_skin" 
                                                  value={product.pre_skin} 
                                                  type="text" 
                              
                                                  placeholder="pre Skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="skin" 
                                                  value={product.skin} 
                                                  type="text" 
                                                  
                                                  placeholder="skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="top_coat" 
                                                  value={product.top_coat} 
                                                  type="text" 
                                                  
                                                  placeholder="topCoat"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="filler_in_top_coat" 
                                                  value={product.filler_in_top_coat} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In TopCoat" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  
                                                  />
                                              </td>
                                              
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="foam" 
                                                  value={product.foam} 
                                                  type="text" 
                                                   
                                                  placeholder="foam" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="filler_in_foam" 
                                                  value={product.filler_in_foam} 
                                                  type="text" 
                                                  
                                                  placeholder="filler In Form" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="adhesive" 
                                                  value={product.adhesive} 
                                                  type="text"  
                                                  placeholder="adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="filler_in_adhesive" 
                                                  value={product.filler_in_adhesive} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In Adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="final_gsm" 
                                                  value={product.final_gsm} 
                                                  type="text" 
                                                   
                                                  placeholder="finalGsm"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              
                                            </tr>
                                      </tbody>
                                </Table> 
                            </div>
                              }
                              
                            )
                          }
                        </TabPane>
                        <TabPane tabId="4">
                        {
                            line4.map((product,index)=>
                              {
                                return <div key={product.id}>
                                <div>
                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.id} 
                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customerNameFromManagePlan}</button>
                                  {/* {product.is_factory_surplus_product !== '0' && <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>factory product</button>} */}
                                  {(product.is_online_product !== '0' || product.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                  {product.is_online_product !== '0' && product.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                  {product.is_online_product === '0' && product.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                    <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                </div>
                                <Table size='sm' className="order-page-table" responsive>     
                                      <tbody> 
                                            <tr>
                                                <td title={product.grain_name}>{product.grain_name}</td>
                                                <td title={product.color_name}>{product.color_name}</td>
                                                <td title={product.quality_name}>{product.quality_name}</td>
                                                <td title={product.fabric_name}>{product.fabric_name}</td>
                                                <td title={product.fabric_color_name}>{product.fabric_color_name}</td>
                                            </tr>
                                            <tr>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title={product.thickness}>{product.thickness}mm</td>
                                            </tr>
                                            
                                            <tr>
                                              <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                              <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                            </tr>
                                            <tr>
                                              <td title="" colSpan={3}>Additional Treatment :</td>
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="quantity" 
                                                  value={product.quantity} 
                                                  type="number" 
                                                  
                                                  placeholder="quantity"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="pre_skin" 
                                                  value={product.pre_skin} 
                                                  type="text" 
                              
                                                  placeholder="pre Skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="skin" 
                                                  value={product.skin} 
                                                  type="text" 
                                                  
                                                  placeholder="skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="top_coat" 
                                                  value={product.top_coat} 
                                                  type="text" 
                                                  
                                                  placeholder="topCoat"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="filler_in_top_coat" 
                                                  value={product.filler_in_top_coat} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In TopCoat" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  
                                                  />
                                              </td>
                                              
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="foam" 
                                                  value={product.foam} 
                                                  type="text" 
                                                   
                                                  placeholder="foam" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="filler_in_foam" 
                                                  value={product.filler_in_foam} 
                                                  type="text" 
                                                  
                                                  placeholder="filler In Form" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="adhesive" 
                                                  value={product.adhesive} 
                                                  type="text"  
                                                  placeholder="adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="filler_in_adhesive" 
                                                  value={product.filler_in_adhesive} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In Adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="final_gsm" 
                                                  value={product.final_gsm} 
                                                  type="text" 
                                                   
                                                  placeholder="finalGsm"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              
                                            </tr>
                                      </tbody>
                                </Table> 
                            </div>
                              }
                              
                            )
                          }
                        </TabPane>
                      </TabContent>
                    </ComponentCard4>
                 </Col>
              </Row>
         
      </ComponentCard1>
    </>
  );
};

export default JumbotronComponent;
