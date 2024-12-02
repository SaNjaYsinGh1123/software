import React, { useState,useEffect } from 'react';
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

import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../../components/ComponentCard';

const Vendors = () => {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);

  const [data, setData] = useState([]);

  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };

  const toggle = () => setCollapse(!collapse);
  const handleEditClick = (item) => {
    // Navigate to the edit page with the item's id
    // Navigate(`/resources/address-types/edit/${itemId}`);
    navigate('/inventory/vendors/edit', { state: item });
  };
  const handleEditAdd = () => {
    // Navigate to the edit page with the item's id
    // Navigate(`/resources/address-types/edit/${itemId}`);
    navigate('/inventory/vendors/add');
  };

  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/vendors', {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("responsejson",result);
      setData(result.vendor); 
    };
  
    fetchData();
  }, []);

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
        <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => handleEditAdd()}>
          Add Vendor
        </Button>
        <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }}>
              Search
        </Button>
      </Col>
    </Row>
            <Collapse isOpen={collapse}>
              <Card className="border">
                <CardBody>
                <Form>
               <Row>
                 <Col md="6">
                   <FormGroup>
                     <Label>Search By Company Name or Company Label</Label>
                     <Input type="text" placeholder="" />
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
                <th>Company Name</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              { 
                  data.map((vendor) => (
                    <tr key={vendor.id}>
                      <td>{vendor.company_name}</td>
                      <td>
                          <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleEditClick(vendor)}><i className="bi bi-pencil-fill my-pen-color" /></button>
                          <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-eye-fill my-eye-color" /></button>
                          <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-geo-alt-fill my-geo-color" /> </button>
                       </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            
    </div>
   
  </ComponentCard>

   
   
  );
};

export default Vendors;