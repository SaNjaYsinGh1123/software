import React,{useState,useCallback} from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';
import {
  Card,
  Collapse,
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

// import ComponentCard from '../../components/ComponentCard';



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
  const navigate = useNavigate();

  const [collapse,setCollapse] = useState(false);
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [formDatas, setFormDataS] = useState({
    customerId:'',
    voucherNo:'',
    paymentDate:'',
    amount:'',
    description:'',
    isCreditNote:'0',
    billNumber:''
  });

  const customerOptions = useDebouncedFetchOptions('customers');

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormDataS(prevState => ({
      ...prevState,
      [actionMeta.name]: selectedOption
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    
    setFormDataS(prevState => ({
      ...prevState,
       paymentDate: date.format('YYYY-MM-DD')
    }));
  };

  const closer =()=>{
    setErrorMessageFromApi([]);
  }

  async function apiCall() {
    try {
     
        const formData = new FormData();
        formData.append('customer_id', formDatas.customerId.value);
        formData.append('voucher_no', formDatas.voucherNo);
        formData.append('payment_date', formDatas.paymentDate);
        formData.append('amount', formDatas.amount);
        formData.append('description', formDatas.description);
        formData.append('is_credit_note', formDatas.isCreditNote);
        formData.append('bill_number', formDatas.billNumber);
        console.log("json",JSON.stringify({
          name:formDatas.name
        }));

        const token = localStorage.getItem('userToken');
        console.log('country_id',formDatas)
        const response = await fetch(`https://factory.teamasia.in/api/public/payments`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`
            },

            body: formData
        });
        const data = await response.json();
        console.log("dataapi",data)
        if (response.ok) {


          navigate('/accounts/payments');
            
        } 
          else {
            console.error("Authentication failed:", Object.values(data.messages.errors));
            if (data.error) {
              setErrorMessageFromApi(Object.values(data.messages.errors));
            }
          }  
            return null;;
      
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


const toggle=()=>{
  setFormDataS(prevState =>({
    ...prevState,
    isCreditNote: collapse?'0':'1'
  }))
  setCollapse(!collapse);
}
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

                 <Col md="6">
                    <FormGroup>
                      <Label>Customer Name</Label>
                        <AsyncSelect
                          name="customerId"
                          onChange={handleSelectChange}
                          loadOptions={customerOptions}
                          value={formDatas.customerId}
                          isClearable
                          isSearchable
                        />
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                   <FormGroup>
                     <Label>Voucher No</Label>
                     <Input type="text" 
                     name="voucherNo" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.voucherNo}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                  <Col md="6">
                   <FormGroup>
                     <Label>Payment Date</Label>
                      <Datetime
                        locale="en-gb"
                        name="paymentDate"
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        inputProps={{ placeholder: 'select Date' }}
                        onChange={handleDateChange}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="6">
                   <FormGroup>
                     <Label>Amount in ₹</Label>
                     <Input type="text" 
                     name="amount" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.amount}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="12">
                   <FormGroup>
                     <Label>Description</Label>
                     <Input type="textarea" 
                     name="description" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.description}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="8">
                    <FormGroup check>
                      <Input type="checkbox" id="" onClick={toggle.bind(null)}/>
                      <Label check>This is credit Note</Label>
                    </FormGroup>
                    <Collapse isOpen={collapse}>
                            <Row>
                              <Col md="8">
                                <FormGroup>
                                  <Label>Bill Number</Label>
                                  <Input type="textarea" 
                                    name="billNumber" 
                                    id="name"
                                    placeholder="Enter name" 
                                    value={formDatas.billNumber}
                                    onChange={handleChange} 
                                      />
                                  <FormText className="muted"></FormText>
                                </FormGroup>
                              </Col>
                            </Row>
                    </Collapse>
                 </Col>
                 <Col md="6">
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