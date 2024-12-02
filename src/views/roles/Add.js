import React,{ useState} from 'react';

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
import { useNavigate } from 'react-router-dom';
import './tagselect.scss';


const Edit = () => {
  const navigate = useNavigate();
  const [formDatas, setFormDataS] = useState({
    Name:'',
    lastName:'',
    email:'',
    mobile:'',
    roleId:'x',
    password:''
  });
  const handleCheckBoxChange = (e) => {
    const { name, value } = e.target;
    console.log('input',name,value)
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('input',value)
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  async function apiCall() {


    try {
        const formData = new FormData();
        formData.append('first_name', formDatas.Name);
        formData.append('is_trashed','0');
       
        console.log('formdata',formData);

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/users`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`
            },
           
            body: formData,
        });
        const responseMessage = await response.json();
        console.log("dataapi",responseMessage)
        if (response.ok) {


          navigate('/users');
            
        } 
            // Handle any errors, such as showing an error message to the user
            console.error("Authentication failed:", response.message);
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
                     <Label>Name</Label>
                     <Input        
                     type="text" 
                      name="Name" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.Name}
                      onChange={handleChange} 
                     />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                  <div className="role-page-blocks">
                    <div>A</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> address.create</Label>          

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> address.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> address.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> address.get-state-gst</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> address.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> address.store</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> address.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> address.vendor-address</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> address.vendor-address-create</Label>

                     </Col>
                    </Row>
                  </div>
                  
                  <div className="role-page-blocks">
                    <div>B</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-coding-categories.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-coding-categories.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-coding-categories.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-coding-categories.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-coding-categories.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-coding-categories.store</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-coding-categories.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-coding-master.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-coding-master.destroy</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-coding-master.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-coding-master.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> bom-coding-master.restore</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-coding-master.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-coding-master.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-master.create</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-master.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-master.export.pdf</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-master.show</Label>
                        </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-master.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-master.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-raw-material-categories.create</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-raw-material-categories.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-raw-material-categories.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-raw-material-categories.index</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-raw-material-categories.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                      <Label style={{marginLeft:'4px'}}> bom-raw-material-categories.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom-raw-material-categories.update</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> bom.create-plan-item-BOM</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom.create-product-BOM</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom.show</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom.store-plan-item-BOM</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> bom.store-product-BOM</Label>

                     </Col>
                   
                    </Row>
                  </div>

                  <div className="role-page-blocks">
                    <div>C</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> categories.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> categories.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> categories.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> categories.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> categories.list</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> categories.restore</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> categories.show</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> categories.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> categories.subcategory</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> categories.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> cities.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> cities.destroy</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> cities.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> cities.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> cities.restore</Label>
                    </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                      <Label style={{marginLeft:'4px'}}> cities.store</Label>
                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> cities.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master-category.create</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master-category.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master-category.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master-category.index</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master-category.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master-category.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master-category.update</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> color-master.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master.show</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> color-master.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> colors.create</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> colors.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> colors.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> colors.index</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> colors.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> colors.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> colors.update</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> common.notify_customer</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> common.notify_invoice</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> common.notify_order_user</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> config_defaults.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> config_defaults.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> config_defaults.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> config_defaults.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> config_defaults.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> config_defaults.store</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> config_defaults.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> countries.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> countries.destroy</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> countries.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> countries.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> countries.restore</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> countries.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> countries.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> customers.create</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> customers.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> customers.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> customers.pending-report</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> customers.show</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> customers.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                    <Label style={{marginLeft:'4px'}}> customers.update</Label>

                     </Col>
                    </Row>
                    <Row>
                      
                      
                      
                    </Row>
                  </div>

                  <div className="role-page-blocks">
                    <div>D</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> dashboard</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> designs.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> designs.destroy</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> designs.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> designs.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> designs.restore</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> designs.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> designs.update</Label>

                     </Col>
                   
                    </Row>
                  </div>

                  <div className="role-page-blocks">
                    <div>F</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> fabrics.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> fabrics.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> fabrics.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> fabrics.get-colors</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> fabrics.index</Label>
                      </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> fabrics.restore</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> fabrics.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> fabrics.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> factories.create</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> factories.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> factories.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> factories.index</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> factories.production_lines</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> factories.representatives_list</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> factories.restore</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> factories.show</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> factories.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> factories.update</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> faults.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> faults.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> faults.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> faults.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> faults.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> faults.store</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> faults.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> find-roll</Label>

                     </Col>
                   
                    </Row>
                    <Row>
                      
                      
                      
                    </Row>
                  </div>

                  <div className="role-page-blocks">
                    <div>G</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> grades.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> grades.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> grades.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> grades.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> grades.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> grades.store</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> grades.update</Label>

                     </Col>
                   
                      
                    </Row>
                  </div>

                  <div className="role-page-blocks">
                    <div>H</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> hsn.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> hsn.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> hsn.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> hsn.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> hsn.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> hsn.store</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> hsn.update</Label>

                     </Col>
                  
                      
                    </Row>
                  </div>

                  <div className="role-page-blocks">
                    <div>I</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> inventories.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> inventories.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> inventories.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                     <Label style={{marginLeft:'4px'}}> inventories.get-material</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> inventories.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> inventories.restore</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> inventories.show</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> inventories.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> inventories.update</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> invoice.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> invoice.create-custom-invoice</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> invoice.destroy</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> invoice.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> invoice.generate-custom-invoice</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> invoice.get-order-from-invoice</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> invoice.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                    <Label style={{marginLeft:'4px'}}> invoice.invoice_email_log</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> invoice.store</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> invoice.update</Label>

                     </Col>
                   
                      
                    </Row>
                  </div>

                  <div className="role-page-blocks">
                    <div>J</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> jumbo-rolls.additional-treatment</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> jumbo-rolls.additional-treatment-list</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> jumbo-rolls.destroy</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> jumbo-rolls.find-code</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> jumbo-rolls.mark-treated</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                    <Label style={{marginLeft:'4px'}}> jumbo-rolls.print</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> jumbo-rolls.print-lca</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> jumbo-rolls.quality-assurance</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                      <Label style={{marginLeft:'4px'}}> jumbo-rolls.quality-assurance-list</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                      <Label style={{marginLeft:'4px'}}> jumbo-rolls.show</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> jumbo-rolls.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> jumbo-rolls.update</Label>

                     </Col>
                    </Row>
                  </div>

                  <div className="role-page-blocks">
                    <div>L</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> lab-report.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> lab-report.show</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> lab-report.store</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> lab-test.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                     <Label style={{marginLeft:'4px'}}> lab-test.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                      <Label style={{marginLeft:'4px'}}> lab-test.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> lab-test.get-test-data</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> lab-test.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                      <Label style={{marginLeft:'4px'}}> lab-test.list</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> lab-test.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> lab-test.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> lab-test.update</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> ledger.get-customer-alert</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> ledger.list-credit-alert</Label>
                     </Col>
                     <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> ledger.pending-payments</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> ledger.print</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> ledger.reset-ledger</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> ledgers.index</Label>

                     </Col>
                    </Row>
                  </div>

                  <div className="role-page-blocks">
                    <div>M</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> multi_factor_authentication.save</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> multi_factor_authentication.show</Label>

                     </Col>
                   
                    </Row>
                  </div>

                  <div className="role-page-blocks">
                    <div>O</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-dispatch.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-dispatch.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-dispatch.dispatch</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-dispatch.email-dispatch</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-dispatch.invoice</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> order-dispatch.orders</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> order-dispatch.print-items</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> order-dispatch.rolls-available</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-dispatch.show</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-dispatch.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-dispatch.whatsapp-packinglist</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-dispatches.index</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-status.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-status.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-status.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-status.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-status.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> order-status.store</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order-status.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order.draft</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order.executive-view</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> order.update_status</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> orders.check-template</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> orders.copy</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> orders.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> orders.discard-draft</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> orders.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> orders.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> orders.print</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> orders.print-proforma</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> orders.sample-orders</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> orders.show</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> orders.store</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> orders.update</Label>

                     </Col>
                   
                      
                    </Row>
                  
                  </div>

                  <div className="role-page-blocks">
                    <div>P</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> payment.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> payment.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> payment.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> payment.import-data</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> payment.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> payment.show</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                      <Label style={{marginLeft:'4px'}}> payment.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> payment.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> payment.upload-file</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> pigments.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> pigments.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> pigments.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> pigments.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> pigments.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> pigments.show</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> pigments.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> pigments.update</Label>
                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> production-level-params.create</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> production-level-params.show</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-level-params.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-plans.create</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-plans.executive-graph-print</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-plans.executive-report</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-plans.executive-report-print</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> production-plans.executive-view</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> production-plans.gsm-analysis</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                      <Label style={{marginLeft:'4px'}}> production-plans.index</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> production-plans.orders</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                  <Label style={{marginLeft:'4px'}}> production-plans.plan-item-show</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-plans.plan-item-small-rolls</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-plans.print</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-plans.shift</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> production-plans.show</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-plans.store</Label>
                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-team.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-team.destroy</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                      <Label style={{marginLeft:'4px'}}> production-team.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-team.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-team.restore</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-team.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> production-team.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> products.create</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> products.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> products.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> products.factory_surplus</Label>

                     </Col>
                    </Row>
                    <Row>
                      
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> products.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> products.print</Label>

                     </Col>

                     <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> products.product-detail</Label>

                     </Col>
                    </Row>
                    <Row>
                      
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> products.show</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> products.store</Label>

                     </Col>
                     <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> products.update</Label>

                     </Col>
                    </Row>
                    <Row>
                      
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> purchase-order-raw-material.print</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> purchase-orders.create</Label>
                     </Col>
                     <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> purchase-orders.destroy</Label>

                     </Col>
                    </Row>
                    <Row>
                      
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> purchase-orders.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> purchase-orders.index</Label>

                     </Col>
                     <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> purchase-orders.show</Label>

                     </Col>
                    </Row>
                    <Row>
                      
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> purchase-orders.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> purchase-orders.update</Label>

                     </Col>
                     <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> purchases.daily-usage-stock</Label>

                     </Col>
                    </Row>
                    <Row>
                     
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> purchases.print</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> purchases.stock</Label>

                     </Col>
                     <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> purchases.stock-detail</Label>

                     </Col>
                    </Row>
                    
                  
              
                
                  </div>

                  <div className="role-page-blocks">
                    <div>R</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> raw-material-lab-report.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> raw-material-lab-report.show</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> raw-material-lab-report.store</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> raw-material-plans.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> raw-material-plans.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> raw-material-plans.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> raw-material-plans.get-raw-material-detail</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> raw-material-plans.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> raw-material-plans.show</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> raw-material-plans.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> raw-material-plans.update</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> report.color-delta</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> report.color-delta.excel</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> report.color-delta.pdf</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> report.daily-inspection</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> report.daily-inspection.excel</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> report.daily-inspection.pdf</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> report.inline-production-quality-control</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> report.inline-production-quality-control.excel</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> report.inline-production-quality-control.pdf</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> report.monthly-inspection</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> report.monthly-inspection.excel</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> report.monthly-inspection.pdf</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> report.paste-consumption</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> report.paste-consumption.excel</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> report.paste-consumption.pdf</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> resources.create</Label>
                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> resources.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> resources.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> resources.index</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> resources.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> resources.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> resources.update</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> roles.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> roles.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> roles.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> roles.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> roles.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> roles.update</Label>

                     </Col>
                    </Row>
                    <Row>
                   
                      
                      
                    </Row>
                   
                  </div>

                  <div className="role-page-blocks">
                    <div>S</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.destroy-surplus-small-roll</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.detail</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.find-code</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.get-rolls</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.print</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.print-lca</Label>
                      </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.send-to-stock</Label>
                      </Col>

                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> small-rolls.show</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.small-roll-executive-view</Label>
                      </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.store</Label>
                      </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.store-surplus-small-roll</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.update</Label>
                     </Col>
                     <Col md="4">
                        <Input
                            type="checkbox"
                            name="Name"
                            id="name"
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.update-surplus-small-roll</Label>
                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> small-rolls.verify</Label>
                     </Col>
                    </Row>
                    <Row>
                     <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> states.create</Label>
                     </Col>
                     <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> states.destroy</Label>
                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> states.edit</Label>

                     </Col>
                    </Row>

                    <Row>
                      
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> states.index</Label>

                     </Col>
                     <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> states.restore</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> states.store</Label>

                     </Col>

                    </Row>
                    <Row>
                      
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                      <Label style={{marginLeft:'4px'}}> states.update</Label>
                     </Col>
                     <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> stock-management-hack</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                     <Label style={{marginLeft:'4px'}}> stock-management-hack.pdf</Label>

                     </Col>
                    </Row>
                    <Row>
                      
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                       <Label style={{marginLeft:'4px'}}> stock-management-hack.save</Label>

                     </Col>
                    </Row>
                    <Row>
                   
                      
                      
                    </Row>
                  
                  </div>

                  <div className="role-page-blocks">
                    <div>T</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> template-products.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> template-products.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> template-products.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> template-products.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> template-products.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> template-products.update</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> template.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> template.destroy</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> template.edit</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> template.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> template.store</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> template.update</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> test.custome-wise-credit-alerts</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> test.custome-wise-pending-payments</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> test.custome-wise-settle-ledger</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> test.ledger-entry-for-system-invoices</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> test.reset-gsm-in-rolls</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> test.reset-product-order</Label>

                     </Col>
                    </Row>
                  
                  </div>

                  <div className="role-page-blocks">
                    <div>U</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> user.set-factory</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> users.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> users.destroy</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> users.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> users.index</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> users.store</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> users.update</Label>

                     </Col>
                   
                      
                    </Row>
                  </div>

                  <div className="role-page-blocks">
                    <div>V</div>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> vendors.create</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> vendors.edit</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> vendors.index</Label>

                     </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> vendors.list</Label>

                     </Col>
                      <Col md="4">
                        <Input        
                            type="checkbox" 
                            name="Name" 
                            id="name" 
                            onChange={handleCheckBoxChange}
                          />
                        <Label style={{marginLeft:'4px'}}> vendors.show</Label>
                     </Col>
                      
                    </Row>
                  </div>

                  
                    
                 <Col md="12">
                   <FormGroup style={{textAlign:'center'}}>
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