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

import ComponentCard from '../../../components/ComponentCard5';

const Purchases = () => {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [dataToShow,setdatatoshow] =useState([]);
  // const data = [
   
  //   { id: 1, Vendor: '1037 A', PurchaseDate: 'NW.needlepunch_220gsm', CreatedBy: 'SURPLUS', color: 'black', quantity: '450 m' },
  //   { id: 2, Vendor: '1037 A', PurchaseDate: 'NW.needlepunch_220gsm', CreatedBy: 'SURPLUS', color: 'black', quantity: '450 m' },
  //   { id: 3, Vendor: '1037 A', PurchaseDate: 'NW.needlepunch_220gsm', CreatedBy: 'SURPLUS', color: 'black', quantity: '450 m' },
  //   { id: 4, Vendor: '1037 A', PurchaseDate: 'NW.needlepunch_220gsm', CreatedBy: 'SURPLUS', color: 'black', quantity: '450 m' },
  //   { id: 5, Vendor: '1037 A', PurchaseDate: 'NW.needlepunch_220gsm', CreatedBy: 'SURPLUS', color: 'black', quantity: '450 m' },
  //   { id: 6, Vendor: '1037 A', PurchaseDate: 'NW.needlepunch_220gsm', CreatedBy: 'SURPLUS', color: 'black', quantity: '450 m' },
  //   { id: 7, Vendor: '1037 A', PurchaseDate: 'NW.needlepunch_220gsm', CreatedBy: 'SURPLUS', color: 'black', quantity: '450 m' },
  //   { id: 8, Vendor: '1037 A', PurchaseDate: 'NW.needlepunch_220gsm', CreatedBy: 'SURPLUS', color: 'black', quantity: '450 m' },
  //   { id: 9, Vendor: '1037 A', PurchaseDate: 'NW.needlepunch_220gsm', CreatedBy: 'SURPLUS', color: 'black', quantity: '450 m' },
  //   { id: 10, Vendor: '1037 A', PurchaseDate: 'NW.needlepunch_220gsm', CreatedBy: 'SURPLUS', color: 'black', quantity: '450 m' },
    
  
  // ];

  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };

  const toggle = () => setCollapse(!collapse);

  const handleEditAdd = () => {
    // Navigate to the edit page with the item's id
    // Navigate(`/resources/address-types/edit/${itemId}`);
    navigate('/inventory/purchases/add');
  };

  const handleEditClick = (item) => {
    // Navigate to the edit page with the item's id
    // Navigate(`/resources/address-types/edit/${itemId}`);
    navigate('/inventory/purchases/edit', { state: item });
  };

  

  const findVendorById = (vendorId)=>{
    const Name = data1.find((item)=> item.id === vendorId);
    return Name ? Name.company_name : 'Vendor Name'
  }

  useEffect(()=>{
   

    const newdata = data.map((purchase)=>{
      return {
        ...purchase,
        vendorName: findVendorById(purchase.vendor_id)
      }
    })
    
    setdatatoshow(newdata);
  },[data,data1])

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/purchases', {
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
      setData(result.purchases); 
      console.log('result.orderstatuses',result.purchases); 
    };
    const fetchData1 = async () => {
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
      setData1(result.vendor); 
      console.log('result',data1,result.vendor);
    };
  
    fetchData1();
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
        <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={handleEditAdd}>
          Add Purchase
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
            <th>Vendor</th>
            <th>Purchase Date</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
              </thead>
              <tbody>
                {dataToShow.map((product) => (
                  <tr key={product.id}>
                  <td>{product.vendorName}</td>
                  <td>{product.purchase_date}</td>
                  <td>{product.CreatedBy}</td>
                  <td>
                    {/* Action buttons or icons */}
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleEditClick(product)}><i className="bi bi-pencil-fill my-pen-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-eye-fill my-eye-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-geo-alt-fill my-geo-color" /> </button>
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

export default Purchases;