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
// import { useParams } from 'react-router-dom';
import {useLocation,useNavigate} from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html';
import './editor.scss';
import Product from './Products';
import DashCard from '../../../components/dashboard/dashboardCards/DashCard';
// import ComponentCard from '../../components/ComponentCard';

const Add = () => {
  const navigate= useNavigate();
  const location = useLocation();
  const [futureId,setFutureId] = useState(0);
  
  const {data1,data2,data3,data4,data5} = location.state;
  const [SaverityData, setSaverityData] = useState([]);
  const [CustomerData, setCustomerData] = useState([]);
  const [AddressData, setAddressData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [AddressData1, setAddressData1] = useState([]);
  const [firstcheck, setFirstCheck] = useState(false);
  const [secondcheck, setSecondCheck] = useState(false);
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);


const content1 =  `
  <h5 style="color: rgb(97, 189, 109); font-family: 'Times New Roman'; font-size: 96px;">
  Team Asia Production Management System.
  </h5>
`;;


const contentFromHTML = stateFromHTML(content1);

console.log('convertFromRaw(content)',contentFromHTML ,EditorState.createWithContent(contentFromHTML));



  const [contentState, setEditorState] = useState(EditorState.createWithContent(contentFromHTML));
  const [htmlContent, sethtmlContent] = useState('');



  
  const [formDatas, setFormDataS] = useState({
    customerId:'x',
    customerId2:'x',
    billingAddressId:'x',
    deliveryAddressId:'x',
    orderNotes:'Team Asia Production Management System.',
    severityId:'x',
    expectedDeliveryDate:'2-6-2012',
    createdAt:'2-6-2012',
    purchaseOrder:'',
    imageId:'0',
    purchaseOrderDocumentFilePath:'test.jpg',
    representativeId:'0',
    statusId:'0'
  });
  
  const onContentStateChange = (c) => {
    console.log('contentState',c);
    const htmlContent1 = draftToHtml(c);
    console.log('html',htmlContent1);
    console.log('htmlcontent',htmlContent);

    sethtmlContent(htmlContent1);

    setEditorState(c);
  };

  const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
  
    return `${day} ${month} ${year}`;
  };

const handleChange = (e) => {
  const { name, value } = e.target;
  console.log('name,value',name,value);
  setFormDataS(prevState => ({
    ...prevState,
    [name]: value
  }));
  if(name === 'billingAddressId' && firstcheck){
    console.log('change1')
    setFormDataS(prevState => ({
      ...prevState,
      deliveryAddressId: value
    }));
  }
  if(name === 'customerId2'){
    console.log('change1')
    setFormDataS(prevState => ({
      ...prevState,
      deliveryAddressId: 'x'
    }));
  }
  console.log('hi',formDatas.billingAddressId,formDatas.deliveryAddressId);
};

function getCityNameById(cityId) {
  const cityName = cityData.find(city => city.id === cityId);
  console.log('state',cityName);
  return cityName ? `${cityName.name},` : '';
}
function getStateNameById(stateId) {
  const stateName = stateData.find(state => state.id === stateId);
  console.log('state',stateName);
  return stateName ? `${stateName.name},` : '';
}

const checkboxclick1 = () => {
  console.log('check',firstcheck);
  if(!firstcheck){
    console.log('change')
    setFormDataS(prevState => ({
      ...prevState,
      deliveryAddressId: formDatas.billingAddressId
    }));
  }
  setFirstCheck(!firstcheck);
 
};

const checkboxclick2 = () => {
  console.log('check',secondcheck);
  if(secondcheck){
    setAddressData1(AddressData);
  }
  setSecondCheck(!secondcheck);
};

const closer =()=>{
  setErrorMessageFromApi([]);
}

  async function apiCall() {
    try {
      
       

        console.log('formdataX',formDatas);
        console.log('final', JSON.stringify({
          customer_id:formDatas.customerId,
          billing_address_id:formDatas.billingAddressId,
          delivery_address_id:formDatas.deliveryAddressId,
          order_notes:htmlContent,
          severity_id:formDatas.severityId,
          expected_delivery_date:formDatas.expectedDeliveryDate,
          purchase_order:formDatas.purchaseOrder,
          representative_id:formDatas.representativeId,
          is_trashed:0,
              // product_additional_treatment: filtered2,
        }));

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/orders`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              customer_id:formDatas.customerId,
              billing_address_id:formDatas.billingAddressId,
              delivery_address_id:formDatas.deliveryAddressId,
              order_notes:htmlContent,
              severity_id:formDatas.severityId,
              expected_delivery_date:formDatas.expectedDeliveryDate,
              purchase_order:formDatas.purchaseOrder,
              image_id:formDatas.imageId,
              purchase_order_document_file_path:formDatas.purchaseOrderDocumentFilePath,
              representative_id:formDatas.representativeId,
              is_trashed:0,
              status_id:formDatas.statusId
            }),
        });

        const dataZ = await response.json();
        console.log("dataapi",dataZ,response);
        if (response.status === 201) {
          
            navigate(-1);
    
        } else {
          console.error("Authentication failed:", Object.values(dataZ.messages.errors));
          if (dataZ.error) {
            setErrorMessageFromApi(Object.values(dataZ.messages.errors));
          }
        }  
        return null;
      } catch (error) {
        console.log('error',error);
         setErrorMessageFromApi(["Network error"]);
        return null;
      }
}




const handleSubmit = async (event) => {
  event.preventDefault();
  
    apiCall();
 

};


useEffect(()=>{
  const fetchData2 = async () => {
    const token = localStorage.getItem('userToken');
    let temp = formDatas.customerId;
    // console.log('temp',temp);
    if(secondcheck){
      temp = formDatas.customerId2;
      // console.log('temp1',temp);
    }
    const response = await fetch(`https://factory.teamasia.in/api/public/addresses/?customer_id=${temp}`, {
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
    console.log("data addresses",result.addresses);
    const resultX = result.addresses.slice();
    resultX.push({id:'x',address_line_1:'Choose'});
    if(secondcheck){
      setAddressData1(resultX);
    }else{
      setAddressData(resultX);
      setAddressData1(resultX);
    }
  };
  fetchData2();

},[formDatas.customerId,formDatas.customerId2])

  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData1 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/customers', {
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
      console.log("data1 customers",result.customers);
      const resultX = result.customers.slice();
      const sever = resultX.find(item => item.id === formDatas.customerId);
      if(!sever){
        setFormDataS(prevState => ({
          ...prevState,
           customerId:'x',
           billingAddressId:'x',
           deliveryAddressId:'x'
        }));
      }

      resultX.push({id:'x',company_name:'Choose'});
      setCustomerData(resultX); 
    };

    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/severities/?is_trashed=0', {
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
      console.log("data severities",result.severities);
      const resultX = result.severities.slice();
      const sever = resultX.find(item => item.id === formDatas.severityId);
      if(!sever){
        setFormDataS(prevState => ({
          ...prevState,
          severityId:'x'
        }));
      }
      resultX.push({id:'x',name:'Choose'});
      setSaverityData(resultX); 
    };
    const fetchCityData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/cities/?is_trashed=0', {
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
      console.log("data severities",result.cities);
      const resultX = result.cities.slice();
      const sever = resultX.find(item => item.id === formDatas.severityId);
      if(!sever){
        setFormDataS(prevState => ({
          ...prevState,
          severityId:'x'
        }));
      }
      resultX.push({id:'x',name:'Choose'});
      setCityData(result.cities); 
    };
    const fetchStateData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/states/?is_trashed=0', {
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
      console.log("data severities",result.states);
      

      setStateData(result.states); 
    };
    const fetchFutureOrderId = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/orders/getId', {
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
      console.log("future order id",result);
      if(result){
        setFutureId(Number(result.currentOrderId));   
      }
    };
    fetchCityData();
    fetchStateData();
    fetchFutureOrderId();
    fetchData1();
    fetchData();
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
           <CardBody style={{background:'#edf1f5'}}>
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
                   <Col md="6">
                      <DashCard title="Address" >
                          <Col md="10" className=''>
                            <FormGroup>
                              <Label>Customer Details</Label>
                              <Input type="select" 
                                name="customerId" 
                                value={formDatas.customerId}
                                onChange={handleChange}
                                >
                                  {CustomerData.map((item)=>{
          
                                    return <option key={item.id} value={item.id}>{item.company_name}</option>
                                  })}
                              </Input>
                            
                                <FormText className="text-danger"></FormText>
                              
                              
                            </FormGroup>
                          </Col>
                      </DashCard>

                      <DashCard title="Address" >
                          <Col md="10">
                            <FormGroup>
                              <Label>Billing Address</Label>
                              <Input type="select" 
                                name="billingAddressId" 
                                value={formDatas.billingAddressId}
                                onChange={handleChange}
                                >
                                  {AddressData.map((item)=>{
                                    return <option key={item.id} value={item.id}>{item.address_line_1} {item.address_line_2} {getCityNameById(item.city_id)} {getStateNameById(item.state_id)} {item.pincode}</option>
                                  })}
                              </Input>
                              
                                <FormText className="text-danger"></FormText>
                              
                            </FormGroup>
                          </Col>
                          <Col md="10">
                          <FormGroup>
                            {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                            <Input type="checkbox" checked={ firstcheck} onChange={checkboxclick1}  />
                            <Label className='mx-1'> Delivery Address is same as Billing Address</Label>
                            <FormText className="muted"></FormText>
                          </FormGroup>
                        </Col>

                        {firstcheck?null:<><Col md="10">
                          <FormGroup>
                            {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                            <Input type="checkbox" checked={secondcheck} onChange={checkboxclick2}  />
                            <Label className='mx-1'> Deliver the order to another Company</Label>
                            <FormText className="muted"></FormText>
                          </FormGroup>
                        </Col>
                        {secondcheck?<>
                                <Col md="10" className=''>
                                    <FormGroup>
                                      <Label>Customer </Label>
                                      <Input type="select" 
                                        name="customerId2" 
                                        value={formDatas.customerId2}
                                        onChange={handleChange}
                                        >
                                          {CustomerData.map((item)=>{
                  
                                            return <option key={item.id} value={item.id}>{item.company_name}</option>
                                          })}
                                      </Input>
                                    
                                        <FormText className="text-danger"></FormText>
                                      
                                      
                                    </FormGroup>
                                  </Col>
                        </>:null}
                        
                            
                        <Col md="10">
                            <FormGroup>
                              <Label>Delivery Address</Label>
                              <Input type="select" 
                                name="deliveryAddressId" 
                                value={formDatas.deliveryAddressId}
                                onChange={handleChange}
                                >
                                  {AddressData1.map((item)=>{
                                    return <option key={item.id} value={item.id}>{item.address_line_1} {item.address_line_2} {getCityNameById(item.city_id)} {getStateNameById(item.state_id)} {item.pincode}</option>
                                  })}
                              </Input>
                              
                                <FormText className="text-danger"></FormText>
                              
                            </FormGroup>
                          </Col></>}  
                      </DashCard>

                      <DashCard title="Additional Documents" >
                        <Editor
                          defaultEditorState={contentState}
                          wrapperClassName="demo-wrapper mb-0"
                          editorClassName="demo-editor border mb-4 edi-height"
                          onContentStateChange={onContentStateChange}
                        />
                        {/* <Input type="textarea" raw={4} disabled value={JSON.stringify(contentState, null, 4)} /> */}
                    </DashCard>

                   </Col>
                   <Col md="6">
                    <DashCard title="Other Information" >
                      <Col md="8">
                          <FormGroup>
                            <Label>Priority</Label>
                            <Input type="select" 
                                name="severityId" 
                                value={formDatas.severityId}
                                onChange={handleChange} >
                                  {SaverityData.map((item)=>{
          
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                  })}
                            </Input>
                            
                          </FormGroup>
                       </Col>
                      <Col md="8">
                          <FormGroup>
                            <Label>Expected Delivery Date</Label>
                            <Input type="date" 
                            name="expectedDeliveryDate" 
                            id="name"
                            placeholder="Enter name"
                            value={formDatas.expectedDeliveryDate}
                            onChange={handleChange} 
                              />
                            <FormText className="muted"></FormText>
                          </FormGroup>
                       </Col>
                      <Col md="8">
                          <FormGroup>
                            <Label>Purchase Order</Label>
                            <Input type="text" 
                            name="purchaseOrder" 
                            id="name"
                            placeholder="Enter" 
                            value={formDatas.purchaseOrder}
                            onChange={handleChange} 
                              />
                            <FormText className="muted"></FormText>
                          </FormGroup>
                       </Col>
                      {/* <Col md="8">
                            <FormGroup>
                              <Label>Purchase Order Document</Label>
                              <Input type="file" 
                              name="vendorInvoiceFilePath" 
                              id="name"
                              placeholder="Enter name" 
                              onChange={handleChange} 
                                />
                              <FormText className="muted"></FormText>
                            </FormGroup>
                       </Col> */}
                    </DashCard>

                    <DashCard title="Representative Details" >
                        <Col md="8">
                            <FormGroup>
                              <Input type="select" 
                                name="vendorId" 
                                value={formDatas.representativeId}
                                onChange={handleChange}
                                >
                                <option value={formDatas.representativeId}>choose representative</option>
                              
                              </Input>
                             
                                <FormText className="text-danger"></FormText>
                              
                              
                            </FormGroup>
                        </Col>
                    </DashCard>
                    <DashCard>
                      <Row>
                        <Col md="6">
                            Order Date <br></br>
                            {getFormattedDate()}
                          </Col>
                          <Col md="6">
                            Order No <br></br>
                            #{futureId}
                          </Col>
                      </Row>
                      <Row style={{marginTop:'10px'}}>
                        <Col md="8">
                              <FormGroup>
                                <Label>Status</Label>
                                <Input type="select" 
                                  name="statusId" 
                                  value={formDatas.statusId}
                                  onChange={handleChange}
                                  >
                                    <option value={0}>Under Review</option>
                                    <option value={1}>Confirmed</option>
                                    <option value={2}>Canceled</option>
                                    <option value={3}>Completed</option>
                                    <option value={4}>Parked</option>
                                </Input>
                              
                                  <FormText className="text-danger"></FormText>
                              
                                
                              </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}>
                                  Update
                              </Button>
                            </FormGroup>
                          </Col>
                      </Row>
                        
                    </DashCard>
                  </Col>

                </Row>

                 <Row style={{marginTop:'10px'}}>
                  <Col md="12">
                    {
                      futureId !== 0?<Product orderID={futureId} data1={data1} data2={data2} data3={data3} data4={data4} data5={data5}/>:''
                    }
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

export default Add;
