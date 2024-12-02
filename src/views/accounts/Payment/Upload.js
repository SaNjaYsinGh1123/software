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
import { useNavigate } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
  const navigate = useNavigate();
  const [formDatas, setFormDataS] = useState({
    customerId:'',
    voucherNo:'',
    paymentDate:'',
    amount:'',
    description:'',
    isCreditNote:'0',
    billNumber:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  

  

  async function apiCall() {
    try {
     
        const formData = new FormData();
        formData.append('customer_id', formDatas.customerId);
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
            // Handle any errors, such as showing an error message to the user
            console.error("Authentication failed:", data.message);
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
                     <Label>Import Accounts Data</Label>
                     <Input type="file" 
                     name="voucherNo" 
                     id="name"
                     placeholder="Enter name" 
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
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