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
  Pagination, 
  PaginationItem, 
  PaginationLink,
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

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(500); // Track the total number of pages
  const itemsPerPage = 10; // Adjust this to the number of items per page

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

  const handlePageChange = (page) => {
    console.log(itemsPerPage);
    setCurrentPage(page);
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
      setDataPlan(result.planDates);
      setTotalPages(result.planDate.length)
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
  }, [])

  const filteredData = dataPlan.filter((plan) =>
    plan.date.includes(searchQuery)
  );


// Function to handle ellipsis pagination logic
const generatePaginationItems = () => {
  const items = [];
  const firstPage = 1;
  const lastPage = totalPages;
  console.log('currentPage',currentPage);
  // First and previous buttons
  items.push(
    <PaginationItem disabled={currentPage === firstPage} key="first">
      <PaginationLink first onClick={() => handlePageChange(firstPage)} />
    </PaginationItem>
  );

  items.push(
    <PaginationItem disabled={currentPage === firstPage} key="prev">
      <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
    </PaginationItem>
  );

  // Always show the first two pages
  items.push(
    <PaginationItem active={firstPage === currentPage} key={firstPage}>
      <PaginationLink onClick={() => handlePageChange(firstPage)}>{firstPage}</PaginationLink>
    </PaginationItem>
  );

  if (totalPages >= 2) {
    items.push(
      <PaginationItem active={currentPage === 2} key={2}>
        <PaginationLink onClick={() => handlePageChange(2)}>{2}</PaginationLink>
      </PaginationItem>
    );
  }

  // Show ellipsis (...) if there is a gap between the second and current page range
  if (currentPage > 4) {
    items.push(
      <PaginationItem key="ellipsis1" disabled>
        <PaginationLink>...</PaginationLink>
      </PaginationItem>
    );
  }

  // Pages around the current page
  for (let i = Math.max(3, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 2); i++) {
    items.push(
      <PaginationItem active={i === currentPage} key={i}>
        <PaginationLink onClick={() => handlePageChange(i)}>{i}</PaginationLink>
      </PaginationItem>
    );
  }

  // Show ellipsis (...) if there is a gap between the current page range and the second last page
  if (currentPage < totalPages - 3) {
    items.push(
      <PaginationItem key="ellipsis2" disabled>
        <PaginationLink>...</PaginationLink>
      </PaginationItem>
    );
  }

  // Always show the second last and last page
  if (totalPages - 1 > 2) {
    items.push(
      <PaginationItem active={totalPages - 1 === currentPage} key={totalPages - 1}>
        <PaginationLink onClick={() => handlePageChange(totalPages - 1)}>{totalPages - 1}</PaginationLink>
      </PaginationItem>
    );
  }

  items.push(
    <PaginationItem active={lastPage === currentPage} key={lastPage}>
      <PaginationLink onClick={() => handlePageChange(lastPage)}>{lastPage}</PaginationLink>
    </PaginationItem>
  );

  // Next and last buttons
  items.push(
    <PaginationItem disabled={currentPage === lastPage} key="next">
      <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
    </PaginationItem>
  );

  items.push(
    <PaginationItem disabled={currentPage === lastPage} key="last">
      <PaginationLink last onClick={() => handlePageChange(lastPage)} />
    </PaginationItem>
  );

  return items;
};


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
              <tr key={plan.id}>
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

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination aria-label="Page navigation example">
          {generatePaginationItems()}
        </Pagination>
      </div>
            
    </ComponentCard>
  );
};

export default ProductionPlan;
