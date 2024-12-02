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


 
  const [selectedType, setSelectedType] = useState('1');

  const handleTypeChange = (e) => {
    console.log('selectedType',e.target.value);
    setSelectedType(e.target.value);
  };
 
  const [formDatas, setFormDataS] = useState({});
  
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
        formData.append('invoice_no',formDatas.InvoiceNo);
        formData.append('order_id',formDatas.OrderId);
        formData.append('invoice_unit',selectedType);
        formData.append('item_quantity',formDatas.ItemQuantity);
        formData.append('file_path',formDatas.file);
        formData.append('is_trashed','0');

        // console.log("json",JSON.stringify({
        //   display_name:formDatas.DisplayName,
        //   name:formDatas.ConfigName,
        //   type:selectedType,
        //   value:formDatas.Value
        // }));
        // console.log('formdata',formData);

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/invoices`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`
            },
           
            body: formData,
        });
        const data = await response.json();
        console.log("dataapi",data)
        if (response.ok) {


          navigate('/operations/invoices');
            
        } 
            // Handle any errors, such as showing an error message to the user
            console.error("Authentication failed:", data.message);
            return null;
      
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
                 <Col md="10">
                   <FormGroup>
                     <Label>Invoice No.</Label>
                     <Input        
                     type="text" 
                      name="InvoiceNo" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.InvoiceNo}
                      onChange={handleChange} 
                     />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="5">
                   <FormGroup>
                     <Label>Order Id</Label>
                     <Input        
                     type="text" 
                      name="OrderId" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.OrderId}
                      onChange={handleChange}
                     />

                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="5">
                   <FormGroup>
                     <Label>Item Quantity</Label>
                     <Input        
                     type="text" 
                      name="ItemQuantity" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.ItemQuantity}
                      onChange={handleChange}
                     />

                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="5">
                   <FormGroup>
                     <Label>Invoice Unit</Label>
                     <Input type="select" name="Select Gender" value={selectedType} onChange={handleTypeChange}>
                        <option value="1">Mtr</option>
                        <option value="2">Kg</option>
                        <option value="3">Sq Mtr</option>
                      </Input>
                     <FormText className="muted"></FormText>
                   </FormGroup>
                  
                 </Col>
                 <Col md="5">
                   <FormGroup>
                     <Label>Invoice Value</Label>
                     <Input        
                     type="text" 
                      name="InvoiceValue" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.InvoiceValue}
                      onChange={handleChange} 
                     />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="5">
                   <FormGroup>
                     <Label>File Upload</Label>
                     <Input        
                     type="text" 
                      name="file" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.file}
                      onChange={handleChange} 
                     />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
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