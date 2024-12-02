import React,{useEffect,useState,useCallback} from 'react';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';
import {
  Card,
  CardBody,
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
  const navigate= useNavigate();
  const location = useLocation();
 const params = new URLSearchParams(location.search);
 const id = params.get('id');  // Get the query parameter "id"
  const [SaverityData, setSaverityData] = useState([]);
  const [AddressData, setAddressData] = useState([]);
  const [AddressData1, setAddressData1] = useState([]);
  const [firstcheck, setFirstCheck] = useState(false);
  const [secondcheck, setSecondCheck] = useState(false);
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);



 const customerOptions = useDebouncedFetchOptions('customers');

 const [formDatas, setFormDataS] = useState({
  customerId:'',
  customerId2:'x',
  billingAddressId:'x',
  deliveryAddressId:'x',
  orderNotes:'',
  severityId:'',
  expectedDeliveryDate:'1-01-1990',
  createdAt:'1-01-1990',
  purchaseOrder:'',
  imageId:'',
  purchaseOrderDocumentFilePath:'',
  representativeId:'',
  statusId:''
});

 
  const [contentState, setEditorState] = useState(null);
 
  const [htmlContent, sethtmlContent] = useState('');



  

  
  const onContentStateChange = (c) => {
    // console.log('contentState',c);
    const htmlContent1 = draftToHtml(c);
    // console.log('html',htmlContent1);
    // console.log('htmlcontent',htmlContent);

    sethtmlContent(htmlContent1);

    setEditorState(c);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    // Use Intl.DateTimeFormat to format the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
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


  const fetchDataForCustomer12 = async (customerID,CustomerFlag) => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/addresses/?customer_id=${customerID}`, {
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
    if(CustomerFlag === 1){
      if(secondcheck){
        console.log('hi',resultX);
        setFormDataS(prevState => ({
          ...prevState,
          billingAddressId: result?.addresses[0]?.id,
        }));
        setAddressData(resultX);
      }else{
        console.log('bye',resultX);
        setAddressData(resultX);
        setAddressData1(resultX);
        setFormDataS(prevState => ({
          ...prevState,
          deliveryAddressId: result?.addresses[0]?.id,
          billingAddressId: result?.addresses[0]?.id,
        }));
      }
    }
    else if(CustomerFlag === 2){
      setAddressData1(resultX);
      setFormDataS(prevState => ({
        ...prevState,
        deliveryAddressId: result?.addresses[0]?.id,
      }));
    }
  };

  
  const handleSelectChange = (selectedOption, actionMeta) => {
    console.log('selectedOption, actionMeta',selectedOption, actionMeta);
    setFormDataS(prevState => ({
      ...prevState,
      [actionMeta.name]: selectedOption
    }));
    
    if(actionMeta.name === 'customerId'){
      fetchDataForCustomer12(selectedOption.value,1)
    }else if(actionMeta.name === 'customerId2'){
      fetchDataForCustomer12(selectedOption.value,2)
    }
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

  async function apiCall() {
    try {
        console.log('formdataX',formDatas);


        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/orders/${id}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              customer_id:formDatas.customerId.value,
              billing_address_id:formDatas.billingAddressId,
              delivery_address_id:formDatas.deliveryAddressId,
              order_notes:htmlContent,
              severity_id:formDatas.severityId,
              expected_delivery_date:formDatas.expectedDeliveryDate,
              purchase_order:formDatas.purchaseOrder,
              image_id:formDatas.imageId,
              purchase_order_document_file_path:formDatas.purchaseOrderDocumentFilePath,
              representative_id:formDatas.representativeId,
              status_id:formDatas.statusId,
              is_trashed:0,
            }),
        });

        const dataZ = await response.json();
        console.log("dataapi",dataZ,response);
        if (response.status === 200) {
          
            navigate('/order/orders');
        
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



  useEffect(() => {
    const fetchAddressData = async (AddressId,AddressFlag) => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/addresses/${AddressId}`, {
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
      // console.log("data addresses",result);
      const resultX = [result]
      resultX.push({id:'x',address_line_1:'Choose'});
      if(AddressFlag === 1){
        setAddressData(resultX);
      }
      else if(AddressFlag === 2){
        setAddressData1(resultX);
      }
    };

    // Fetch the data from the API
    const fetchData1 = async (customerIdfromOrder) => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/customers/${customerIdfromOrder}`, {
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
      // console.log("data1 customers",result);
      // const resultX = result.customers.slice();
      // const sever = result.find(item => item.id === formDatas.customerId);
      if(!result.id){
        setFormDataS(prevState => ({
          ...prevState,
           customerId:{value:'x',label:'choose'},
           billingAddressId:'x',
           deliveryAddressId:'x'
        }));
      }

      setFormDataS(prevState => ({
        ...prevState,
         customerId:{value: result.id,label:result.company_name}
      }));
    };


    const fetchData = async (severityID) => {
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
      // console.log("data severities",result.severities);
      const resultX = result.severities.slice();
      const sever = resultX.find(item => item.id === severityID);
      if(!sever){
        console.log('in severity',sever);
        setFormDataS(prevState => ({
          ...prevState,
          severityId:'x'
        }));
      }
      resultX.push({id:'x',name:'Choose'});
      setSaverityData(resultX); 
    };

    const fetchOrderData = async ()=>{
      const token = localStorage.getItem('userToken');
      try {
        const response =await  fetch(`https://factory.teamasia.in/api/public/orders/${id}`,{
          method: "GET",
          headers:{
            'Authorization': `Bearer ${token}`
          }
        }); 
        if(response.status === 200){
          const datas = await response.json();
          console.log('result order',datas);
          setFormDataS({
            billingAddressId : datas.billing_address_id,
            deliveryAddressId : datas.delivery_address_id,
            severityId:datas.severity_id,
            expectedDeliveryDate:datas.expected_delivery_date,
            createdAt:datas.created_at,
            purchaseOrder:datas.purchase_order,
            imageId:datas.image_id,
            purchaseOrderDocumentFilePath : datas.purchase_order_document_file_path,
            representativeId: datas.representative_id,
            customerId : datas.customer_id,
            customerId2:'x',
            statusId: datas.status_id
            }
          )
          console.log('order notes in order',datas.order_notes);
          const contentFromHTML2 = stateFromHTML(datas.order_notes);
          console.log('order notes in order 2',EditorState.createWithContent(contentFromHTML2));
          setEditorState(EditorState.createWithContent(contentFromHTML2));
          fetchData1(datas.customer_id);
          fetchAddressData(datas?.delivery_address_id,2);
          fetchAddressData(datas?.billing_address_id,1);
          fetchData(datas?.severity_id);
        } else {
          // If the status is not 200, navigate to 404
          navigate('/404');
        }

      } catch (error) {
         console.error("Error fetching data:", error.message);
         navigate('/404');  // In case of any unexpected error, navigate to the 404 pa
      }
    
    }
    fetchOrderData();
  },[]);

  return (
<div>
     
     <Row>
       <Col md="12">
         <Card>
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
                              <AsyncSelect
                                name="customerId"
                                onChange={handleSelectChange}
                                loadOptions={customerOptions}
                                value={formDatas.customerId}
                                isClearable
                                isSearchable
                              />
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
                                  
          
                                    return <option key={item.id} value={item.id}>{item.address_line_1} {item.address_line_2} {item.city_name} {item.state_name} {item.pincode}</option>
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
                              <Label>Customer Details</Label>
                              <AsyncSelect
                                name="customerId2"
                                onChange={handleSelectChange}
                                loadOptions={customerOptions}
                                value={formDatas.customerId2}
                                isClearable
                                isSearchable
                              />
                            
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
                                    return <option key={item.id} value={item.id}>{item.address_line_1} {item.address_line_2} {item.city_name} {item.state_name} {item.pincode}</option>
                                  })}
                              </Input>
                              
                                <FormText className="text-danger"></FormText>
                              
                            </FormGroup>
                          </Col></>}  
                      </DashCard>

                       {contentState && <DashCard title="Additional Documents" >
                        <Editor
                          defaultEditorState={contentState}
                          wrapperClassName="demo-wrapper mb-0"
                          editorClassName="demo-editor border mb-4 edi-height"
                          onContentStateChange={onContentStateChange}
                        />
                        {/* <Input type="textarea" raw={4} disabled value={JSON.stringify(contentState, null, 4)} /> */}
                    </DashCard>}
                     

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
                            placeholder="Enter name" 
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
                            {formatDate(formDatas.createdAt)}
                          </Col>
                          <Col md="6">
                            Order No <br></br>
                            #{id}
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
                        <Product orderID={id}/>
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
