import React from 'react';

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

// import ComponentCard from '../../components/ComponentCard';

const FindRawMaterial = () => {

  return (
<div>
     
     <Row>
       <Col md="12">
         <Card>
           <CardBody>
             <Form>
               <Row>
                 <Col md="8">
                   <FormGroup>
                     <Label>Raw Material</Label>
                     <Input type="text" placeholder="Enter Raw Material" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                    <Button type="submit" className="btn my-btn-color-yellow" style={{marginTop:"28px"}}>
                        Find
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

export default FindRawMaterial;