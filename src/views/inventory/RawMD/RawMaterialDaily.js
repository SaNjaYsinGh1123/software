import React, { useState } from 'react';
import {
  Collapse,
  Button,
  Card,
  Col,
  Input,
  Label,
  FormText,
  FormGroup,
  Form,
  Row,
  CardBody,
} from 'reactstrap';

import ComponentCard from '../../../components/ComponentCard5';

const RawMaterialDaily = () => {
  const [collapse, setCollapse] = useState(false);
  const data = [
    
    { id: 1, planDate: '1037 A', CreatedBy: 'NW.needlepunch_220gsm' },
    { id: 2, planDate: '1038 A', CreatedBy: 'NW.needlepunch_220gsm' },
    { id: 3, planDate: '1039 A', CreatedBy: 'NW.needlepunch_220gsm' },
    { id: 4, planDate: '1040 A', CreatedBy: 'NW.needlepunch_220gsm' },
    { id: 5, planDate: '1041 A', CreatedBy: 'NW.needlepunch_220gsm' },
    { id: 6, planDate: '1042 A', CreatedBy: 'NW.needlepunch_220gsm' },
    { id: 7, planDate: '1043 A', CreatedBy: 'NW.needlepunch_220gsm' },
    { id: 8, planDate: '1044 A', CreatedBy: 'NW.needlepunch_220gsm' },
    { id: 9, planDate: '1045 A', CreatedBy: 'NW.needlepunch_220gsm' },
    { id: 10, planDate: '1055 A', CreatedBy: 'NW.needlepunch_220gsm' },
    
  
  ];
  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };
  const toggle = () => setCollapse(!collapse);

  return (
    <ComponentCard
    title=""
    subtitle={
      <p>
        {/* Overview of the projects */}
      </p>
    }
  >
     <Row>
      <Col md="8">
        <Button className='my-btn-color-red' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }}>
              Manage Daily Usage
            </Button>
      </Col>
    </Row>

    <Collapse isOpen={collapse}>
              <Card className="border">
                <CardBody>
                <Form>
               <Row>
                 <Col md="2">
                   <FormGroup>
                     <Label>Vendor</Label>
                     <Input type="text" placeholder="Order No" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="2">
                   <FormGroup>
                     <Label>Purchase Date</Label>
                     <Input type="date" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
              
                 <Col md="4">
                   <FormGroup>
                    <Button type="submit" className="btn btn-info" style={{marginTop:"28px"}}>
                        Search
                    </Button>
                    <Button type="reset" className="btn btn-info" style={{marginTop:"28px",marginLeft:"10px"}}>
                        Reset
                    </Button>
                   </FormGroup>
                 </Col>
               </Row>
               
              
             </Form>
                </CardBody>
              </Card>
            </Collapse>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <table className="table" style={tableStyle}>
              <thead>
              <tr>
            <th>Plan Date</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
              </thead>
              <tbody>
                {data.map((product) => (
                  <tr key={product.id}>
                  <td>{product.planDate}</td>
                  <td>{product.CreatedBy}</td>
                  
                  <td>
                    {/* Action buttons or icons */}
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" ><i className="bi bi-pencil-fill my-pen-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-eye-fill my-eye-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-geo-alt-fill my-geo-color" /> </button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-list my-list-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-trash-fill my-trash-color" /></button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
            
    </div>
   
  </ComponentCard>

   
   
  );
};

export default RawMaterialDaily;
