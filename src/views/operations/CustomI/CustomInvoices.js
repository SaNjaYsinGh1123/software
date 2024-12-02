import React, { useState } from 'react';

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
  Table

} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
// import ComponentCard from '../../components/ComponentCard';


const CustomInvoices = () => {
  const navigate= useNavigate();
  const [items, setItems] = useState([]);
  const [formDatas, setFormDataS] = useState({
    InvoiceNo:'',
    OrderId:'',
    ItemsCount:'',
    InvoiceUnit:'',
    VehicleNo:'',
    DriverName:'',
    DriverMobile:'',
    InvoiceDate:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('hi')
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addItem = () => {
    console.log('mega',items);
    const newItems = items.slice();
    newItems.push({ product: '', grade: '', discount: '', hsnCode: '', quantity: '', price: '', tax: '' })
    console.log('mega',newItems);
    setItems(newItems);
  };

  const removeItem = index => {
    const newItems = items.slice();
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleInputChange = (index, event) => {
    const newItems = items.slice();
    console.log("data",newItems);
    newItems[index][event.target.name] = event.target.value;
    setItems(newItems);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('Items:', items);
  //   // Here you would typically handle the form submission,
  //   // such as sending data to a server or updating state elsewhere.
  // };
async function apiCall() {
    try {
      
        // const formData = new FormData();
        // formData.append('name', formDatas.name);
        // formData.append('iso_code', formDatas.isoCode);
        // formData.append('isd_code', formDatas.isdCode);

        console.log('item',items);
        // console.log('dataX',formDatas);
       
        // const filtered = items.filter((temp)=>{
        //   return  (temp.design_id !== 'x') &&  (temp.shade_id !== 'x');
        // });
      

        // const filtered1 = formDatas.CompanyDocuments.filter((temp)=>{
        //   return temp.name !== '';
        // });

        console.log('formdataX',formDatas);
        // console.log('filtered',filtered);
       
        console.log('final', JSON.stringify({
              
             
              invoice_no: formDatas.InvoiceNo,
              order_id: formDatas.OrderId,
              item_quantity: formDatas. ItemsCount,
              invoice_unit: formDatas.InvoiceUnit,
              vehicle_no: formDatas.VehicleNo,
              driver_name: formDatas. DriverName,
              driver_mobile: formDatas.DriverMobile,
              invoice_date: formDatas.InvoiceDate,              
              is_trashed:  '0',
            
        }));

        const token = localStorage.getItem('userToken');

        const response = await fetch(`https://factory.teamasia.in/api/public/custominvoices`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({  
              invoice_no: formDatas.InvoiceNo,
              order_id: formDatas.OrderId,
              item_quantity: formDatas. ItemsCount,
              invoice_unit: formDatas.InvoiceUnit,
              vehicle_no: formDatas.VehicleNo,
              driver_name: formDatas. DriverName,
              driver_mobile: formDatas.DriverMobile,
              invoice_date: formDatas.InvoiceDate,              
              is_trashed:  '0'
            }),
        });

        const dataZ = await response.json();
        console.log("dataapi",dataZ)
        if (response.ok) {


          navigate('/operations/invoices');
            
        } 
            // Handle any errors, such as showing an error message to the user
            console.error("Authentication failed:", dataZ.message);
            return null;
      
    } catch (error) {
        console.error("Network error:", error);
        return null;
    }
}

  const handleSubmit = async (event) => {
    event.preventDefault();
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
                Create Invoice
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="3">
                    <FormGroup>
                      <Label>Invoice No</Label>
                      <Input type="text" 
                     name="InvoiceNo" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.InvoiceNo}
                     onChange={handleChange} 
                      />
                      
                      <FormText className="muted"></FormText>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Order Id</Label>
                      <Input type="text" 
                     name="OrderId" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.OrderId}
                     onChange={handleChange} 
                      />
                      <FormText className="muted"></FormText>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Items Count</Label>
                      <Input type="text" 
                     name="ItemsCount" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.ItemsCount}
                     onChange={handleChange} 
                      />
                      <FormText className="muted"></FormText>

                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Invoice Unit</Label>
                      <Input type="text" 
                     name="InvoiceUnit" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.InvoiceUnit}
                     onChange={handleChange} 
                      />
                      <FormText className="muted"></FormText>

                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md="3">
                    <FormGroup>
                      <Label>Vehicle No</Label>
                      <Input type="text" 
                     name="VehicleNo" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.VehicleNo}
                     onChange={handleChange} 
                      />
                      <FormText className="muted"></FormText>

                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Driver Name</Label>
                      <Input type="text" 
                     name="DriverName" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.DriverName}
                     onChange={handleChange} 
                      />
                      <FormText className="muted"></FormText>

                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Driver Mobile</Label>
                      <Input type="text" 
                     name="DriverMobile" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.DriverMobile}
                     onChange={handleChange} 
                      />
                      <FormText className="muted"></FormText>

                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Invoice Date</Label>
                      <Input type="date" 
                     name="InvoiceDate" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.InvoiceDate}
                     onChange={handleChange} 
                      />
                      <FormText className="muted"></FormText>

                    </FormGroup>
                  </Col>
                </Row>
               
                <Row>
              <Col md="10">
                  <Button>Add Items</Button>
              </Col>
              <Col md="2">
                <Button type="button" className='btn-success' onClick={addItem}>Add More</Button>
              </Col>
            </Row>
            
            <Table responsive>
              <thead>
                    <tr>
                          <th>Product</th>
                          <th>Grade</th>
                        <th>Discount%</th>
                           <th>HSN Code</th>
                        <th>Quantity</th>
                           <th>Price</th>
                        <th>Tax %</th>
                           <th>Action</th>
                    </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                    <tr key={item}>
                           <td><Input name="product" value={item.product} type="text" onChange={e => handleInputChange(index, e)} placeholder="" /></td>
                           <td><Input name="grade" value={item.grade} type="text" onChange={e => handleInputChange(index, e)} placeholder="" /></td>
                           <td><Input name="discount" value={item.discount} type="text" onChange={e => handleInputChange(index, e)} placeholder="" /></td>
                           <td><Input name="hsnCode" value={item.hsnCode} type="text" onChange={e => handleInputChange(index, e)} placeholder="" /></td>
                           <td><Input name="quantity" value={item.quantity} type="text" onChange={e => handleInputChange(index, e)} placeholder="" /></td>
                           <td><Input name="price" value={item.price} type="text" onChange={e => handleInputChange(index, e)} placeholder="" /></td>
                           <td><Input name="tax" value={item.tax} type="text" onChange={e => handleInputChange(index, e)} placeholder="" /></td>
                           <td><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem(index)}>X</button></td>
                      
                    </tr>
                  ))}
              </tbody>
            </Table>

            <CardBody className="border-top gap-2 d-flex align-items-center">
              <FormGroup>
                <Button type="submit" className="btn my-btn-color">
                  Save
                </Button>
                <Button type="button" className="btn btn-dark ml-2">
                  Cancel
                </Button>
              </FormGroup>
              
            </CardBody>

              </Form>
            </CardBody>
            
          </Card>
        </Col> 
      </Row>
      
    </div>
   
   
  );
};

export default CustomInvoices;