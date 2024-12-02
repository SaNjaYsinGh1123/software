import React, { useState, useEffect } from 'react';
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
  Table
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../../components/ComponentCard5';

const AdditionalTreat = () => {
  const [collapse, setCollapse] = useState(false);
  const [data, setData] = useState([]);
  const [orderID, setOrderID] = useState('');
  const [productionDate, setProductionDate] = useState('');

  const navigate = useNavigate();
  const tableStyle = {};

  const toggle = () => setCollapse(!collapse);



  const JumboQaView = (dispatchItem)=>{
    console.log('hi',dispatchItem);
    navigate('/operations/find-additional-jumbo-roll',{state: {jumboId:dispatchItem}});
  }



  const AdditionalTreatView = (rollItem) => {
    navigate('/operations/additional-treatment/view', { state: { id:rollItem.id}});
  };

  useEffect(() => {
    const fetchDispatch = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/jumboroll?send_for_additional_treatment=1&is_treated=0`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('result.jumborolls',result.jumborolls);
      setData(result.jumborolls);
    };

    fetchDispatch();
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === 'orderID') {
      setOrderID(value);
    } else if (name === 'productionDate') {
      setProductionDate(value);
    }
  };

  const handleSearchReset = () => {
    setOrderID('');
    setProductionDate('');
  };

  // const filteredData = data.filter((roll) => {
  //   const plan = plans?.find((p) => p.id === roll.production_plan_id);
  //   if (!plan) {
  //     return false; // If no plan is found, skip this entry
  //   }
  //   const dateMatch = productionDate ? new Date(plan.plan_date).toLocaleDateString() === new Date(productionDate).toLocaleDateString() : true;
  //   const orderIDMatch = orderID ? roll.order_id.includes(orderID) : true;

  //   console.log('Filtering:', {
  //     roll,
  //     plan,
  //     productionDate,
  //     planDate: plan.plan_date,
  //     dateMatch,
  //     orderIDMatch
  //   });

  //   return dateMatch && orderIDMatch;
  // });

  return (
    <ComponentCard
      title=""
      subtitle={
        <p>
          {/* Overview of the projects */}
        </p>
      }
    >
      <Button className='my-btn-color'onClick={()=>JumboQaView()} style={{ marginBottom: '1rem', marginRight: '10px' }}>
        Load By Code
      </Button>

      <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }}>
        Search
      </Button>
      <Collapse isOpen={collapse}>
        <Card className="border">
          <CardBody>
            <Form>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <Label>Order ID</Label>
                    <Input type="text" name="orderID" value={orderID} onChange={handleSearchChange} placeholder="Order ID" />
                    <FormText className="muted"></FormText>
                  </FormGroup>
                </Col>

                <Col md="4">
                  <FormGroup>
                    <Label>Production date</Label>
                    <Input type="date" name="productionDate" value={productionDate} onChange={handleSearchChange} placeholder="" />
                    <FormText className="muted"></FormText>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Button type="button" className="btn btn-info" style={{ marginTop: "28px" }}>
                      Search
                    </Button>
                    <Button type="button" className="btn btn-info" style={{ marginTop: "28px", marginLeft: "10px" }} onClick={handleSearchReset}>
                      Reset
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Collapse>
      <Table style={tableStyle} responsive>
        <thead>
          <tr>
            <th>Jumbo Roll Code</th>
            <th>Plan Date</th>
            <th>Company Name</th>
            <th>Quantity</th>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((roll) => (
            <tr key={roll.id}>
              <td>JUMBO{roll.id}</td>
              <td>{roll?.production_plan_details?.[0]?.plan_date}</td>
              <td>{roll?.production_plan_details?.[0]?.customer_details?.company_name}</td>
              <td>{roll.quantity}</td>
              <td>{roll.order_id}</td>
              <td>{roll.product_id}</td>
              <td>
                <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-eye-fill my-eye-color" onClick={() => { AdditionalTreatView(roll) }} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ComponentCard>
  );
};

export default AdditionalTreat;






