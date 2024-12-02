import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

import ComponentCard from '../../../components/ComponentCard';

const ProductionPlan = () => {
  const [collapse, setCollapse] = useState(false);
  const [collapse1, setCollapse1] = useState(false);
  const navigate = useNavigate();
  const [dataPlan, setDataPlan] = useState([]);
  const [Customerdata, setCustomerData] = useState([]);
  const [managePlanDate, setManagePlanDate] = useState('');
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggle = () => setCollapse(!collapse);
  const toggle1 = () => setCollapse1(!collapse1);

  const handleDateChange = (e) => {
    setManagePlanDate(e.target.value);
  };

  const handleEditClick = (item) => {
    navigate('/operations/production-plans/edit', { state: { item } });
  };

  const handleViewClick = (item) => {
    navigate('/operations/production-plans/view', { state: { item, Customerdata} });
  };

  const validateForm = () => {
    let formIsValid = true;
    const errors1 = {};

    if (managePlanDate === '') {
      formIsValid = false;
      errors1.managePlanDate = "Required";
    }

    setErrors(errors1);
    return formIsValid;
  }

  const handleManagePlan = () => {
    if (validateForm()) {
      console.log('Form is valid, proceed with API call');
      navigate('/operations/production-plans/manage-plan', { state: { managePlanDate } });
    } else {
      console.log('Form is invalid, do not submit');
    }
  };

  const CustomerName = (customerId) => {
    // console.log('customerData', Customerdata);
    const result = Customerdata.find((item) => item.id === customerId);
    if (!result) {
      return 'unknown customer';
    }
    return result.company_name.toUpperCase();
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchReset = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    const fetchDataPlan = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://factory.teamasia.in/api/public/productionplan/getPlanDates', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('result.planDates',result.planDates);
      setDataPlan(result.planDates);
    };

    const fetchCustomerData = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://factory.teamasia.in/api/public/customers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const datas = await response.json();
      setCustomerData(datas.customers);
    }

    fetchDataPlan();
    fetchCustomerData();
  }, []);

  const filteredData = dataPlan.filter((plan) =>
    plan.date.includes(searchQuery)
  );

  return (
    <ComponentCard
      title=""
      subtitle={
        <p>
          {/* Overview of the projects */}
        </p>
      }
    >
      <Button className='my-btn-color-red' onClick={toggle1.bind(null)} style={{ marginBottom: '1rem', marginRight: '10px' }}>
        Manage Plan
      </Button>
      <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }}>
        Search
      </Button>
      <Collapse isOpen={collapse1}>
        <Card className="border">
          <CardBody>
            <Form>
              <Row>
                <Col md="8">
                  <FormGroup>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={managePlanDate}
                      onChange={handleDateChange}
                      className={managePlanDate === '' && errors.managePlanDate ? "is-invalid" : ""}
                    />
                    {managePlanDate === '' && errors.managePlanDate && <FormText className="text-danger">Required</FormText>}
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Button className="btn btn-danger" style={{ marginTop: "28px" }} onClick={() => handleManagePlan()}>
                      Go
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Collapse>

      <Collapse isOpen={collapse}>
        <Card className="border">
          <CardBody>
            <Form>
              <Row>
                <Col md="8">
                  <FormGroup>
                    <Label>Plan Date</Label>
                    <Input
                      type="date"
                      placeholder=""
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
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

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Plan Date</th>
              <th>Created By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((plan) => (
              <tr key={plan.date}>
                <td>{plan.date}</td>
                <td style={{display:'none'}}>{CustomerName(plan.customer_id)}</td>
                <td>testing team</td>
                <td>Published</td>
                {/* <td>{plan.status_id}</td> */}
                <td>
                  <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleEditClick(plan)}><i className="bi bi-pencil-fill my-pen-color" /></button>
                  <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleViewClick(plan)}><i className="bi bi-eye-fill my-eye-color" /></button>
                  <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-printer-fill my-bell-color" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ComponentCard>
  );
};

export default ProductionPlan;
