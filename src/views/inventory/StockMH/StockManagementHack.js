import React from 'react';

import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  // Label,
  Input,
  Button,

} from 'reactstrap';

import ComponentCard from '../../../components/ComponentCard5';

const  StockManagementHack= () => {
  const data = [
   
    { id: 1, Name: '1037 A',OpeningBalance: 'WP.matty-165g-110gsm-Red', ClosingBalance: '0 MTR 0 Kg'},
    { id: 2, Name: '1037 A',OpeningBalance: 'WP.matty-165g-110gsm-Red', ClosingBalance: '0 MTR 0 Kg'},
    { id: 3, Name: '1037 A',OpeningBalance: 'WP.matty-165g-110gsm-Red', ClosingBalance: '0 MTR 0 Kg'},
    { id: 4, Name: '1037 A',OpeningBalance: 'WP.matty-165g-110gsm-Red', ClosingBalance: '0 MTR 0 Kg'},
    { id: 5, Name: '1037 A',OpeningBalance: 'WP.matty-165g-110gsm-Red', ClosingBalance: '0 MTR 0 Kg'},
    { id: 6, Name: '1037 A',OpeningBalance: 'WP.matty-165g-110gsm-Red', ClosingBalance: '0 MTR 0 Kg'},
    { id: 7, Name: '1037 A',OpeningBalance: 'WP.matty-165g-110gsm-Red', ClosingBalance: '0 MTR 0 Kg'},
    { id: 8, Name: '1037 A',OpeningBalance: 'WP.matty-165g-110gsm-Red', ClosingBalance: '0 MTR 0 Kg'},
    { id: 9, Name: '1037 A',OpeningBalance: 'WP.matty-165g-110gsm-Red', ClosingBalance: '0 MTR 0 Kg'},
    { id: 10, Name: '1037 A',OpeningBalance: 'WP.matty-165g-110gsm-Red', ClosingBalance: '0 MTR 0 Kg'},
    
    
  
  ];

  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };

  return (
    <ComponentCard
    title=""
    subtitle={
      <p>
        Raw Material Stock Management Hack
      </p>
    }
  >
<div>
     
     <Row>
     <Col md="12">
          <Card>
     
           
            <CardBody>
              <Form>
                <Row>
                
                  <Col md="3">
                    <FormGroup>
                      {/* <Label>Select Gender</Label> */}
                      <Input type="select" name="Select Gender" placeholder="Popular Dates">
                        <option> Choose Category</option>
                        <option>Category1</option>
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      {/* <Label>Select Gender</Label> */}
                      <Input type="select" name="Select Gender" placeholder="Popular Dates">
                        <option>Choose Sub Category</option>
                        <option>Sub Category 1</option>
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      {/* <Label>Select Gender</Label> */}
                      <Input type="select" name="Select Gender" placeholder="Popular Dates">
                        <option>Choose Raw Material</option>
                        <option>Raw Material 1</option>
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Button type="submit" className="btn my-btn-color-yellow"  style={{marginRight :"10px"}}>
                         Find
                      </Button>
                      <Button type="submit" className="btn my-btn-color-white" style={{marginRight :"10px"}}>
                         Clear
                      </Button>
                      <Button type="submit" className="btn my-btn-color" style={{marginRight :"10px"}}>
                         ✏️
                      </Button>
                    </FormGroup>
                  </Col>
                      
                </Row>
               
              </Form>
            </CardBody>
            
            
            <CardBody className="border-top gap-2 d-flex align-items-center">
              
             
            </CardBody>
          </Card>
        </Col> 
     </Row>
     
   </div>
   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <table className="table" style={tableStyle}>
              <thead>
              <tr>
              <th>#</th>
            <th>Name</th>
            <th>Opening Balance</th>
            <th>22 jan,24</th>
            <th>23 jan,24</th>
            <th>24 jan,24</th>
            <th>25 jan,24</th>
            <th>26 jan,24</th>
            <th>27 jan,24</th>
            <th>28 jan,24</th>
            <th>Closing Balance</th>
          </tr>
              </thead>
              <tbody>
                {data.map((product,index) => (
                  <tr key={product.id}>
                  <td>{index}</td>
                  <td>{product.Name}</td>
                  <td title={product.OpeningBalance}>{product.OpeningBalance}</td>
                  <td>
                    {/* Action buttons or icons */}
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" ><i className="bi bi-plus-circle-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-dash-square-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-dash-circle-fill" /> </button>

                  </td>
                  <td>
                    {/* Action buttons or icons */}
                    <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" ><i className="bi bi-plus-circle-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-dash-square-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-dash-circle-fill" /> </button>
                  </td>
                  <td>
                    {/* Action buttons or icons */}
                    <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" ><i className="bi bi-plus-circle-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-dash-square-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-dash-circle-fill" /> </button>
                  </td>
                  <td>
                    {/* Action buttons or icons */}
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" ><i className="bi bi-plus-circle-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-dash-square-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-dash-circle-fill" /> </button>
                  </td>
                  <td>
                    {/* Action buttons or icons */}
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" ><i className="bi bi-plus-circle-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-dash-square-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-dash-circle-fill" /> </button>
                  </td>
                  <td>
                    {/* Action buttons or icons */}
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" ><i className="bi bi-plus-circle-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-dash-square-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-dash-circle-fill" /> </button>
                  </td>
                  <td>
                    {/* Action buttons or icons */}
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" ><i className="bi bi-plus-circle-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-dash-square-fill" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-dash-circle-fill" /> </button>
                  </td>
                  <td>
                    {product.ClosingBalance}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
            
    </div>
   </ComponentCard>  
   
  );
};

export default StockManagementHack;