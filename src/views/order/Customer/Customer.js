import React, { useState, useEffect } from 'react';
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
  Table,
  Pagination, 
  PaginationItem, 
  PaginationLink,
} from 'reactstrap';
import ComponentCard from '../../../components/ComponentCard5';

const Customer = () => {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData,setfilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track the total number of pages

  const toggle = () => setCollapse(!collapse);

  const handleEditClick = (item) => {
    console.log('item',item);
    navigate(`/order/customers/edit/?id=${item.id}`);
  };

  const handleEditAdd = () => {
    navigate('/order/customers/add');
  };

  const handleView = (customer) => {
    navigate(`/order/customers/view/?id=${customer.id}`);
  };

  const handleEditAddress = (customer) => {
    navigate(`/order/customers/address/?id=${customer.id}`);
  };

  const handlePendingReport = (customer) => {
    navigate(`/order/customers/pending-report/?id=${customer.id}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchReset = () => {
    setSearchQuery('');
    setfilteredData(data);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/customers/?page=${currentPage}&limit=10&title=company_name&order=asc`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('result',result.customers);
      setTotalPages(Math.ceil(result.numOfRows / 10));

      const sortedCustomers  = result?.customers?.sort((a, b) => {
        return a.company_name.toLowerCase().localeCompare(b.company_name.toLowerCase());
    });
      setData(sortedCustomers);
      setfilteredData( sortedCustomers?.filter((customer) =>
        customer.company_name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    };

    fetchData();
  }, [currentPage]);

  const handleSearch =()=>{
    setfilteredData( data?.filter((customer) =>
      customer.company_name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  } 



  return (
    <ComponentCard title="" subtitle={<p>{/* Overview of the projects */}</p>}>
      <Button className="my-btn-color" style={{ marginBottom: '1rem', marginRight: '10px' }} onClick={() => handleEditAdd()}>
        Add Customer
      </Button>
      <Button className="my-btn-color" onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }} disabled>
        Search
      </Button>
      <Collapse isOpen={collapse}>
        <Card className="border">
          <CardBody>
            <Form>
              <Row>
                <Col md="8">
                  <FormGroup>
                    <Label>Search By Company Name or Company Label</Label>
                    <Input
                      type="text"
                      placeholder=""
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <FormText className="muted"></FormText>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Button type="button" className="btn btn-info" style={{ marginTop: '28px' }} onClick={() => {handleSearch()}}>
                      Find
                    </Button>
                    <Button type="button" className="btn btn-info" style={{ marginTop: '28px', marginLeft: '10px' }} onClick={handleSearchReset}>
                      Reset
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Collapse>
      
      <Row>
            <Table  responsive>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.company_name} {customer.labels !== '' && customer.labels.split(',').map((label)=><Button style={{backgroundColor:'#00abdb',color:'white',padding:"0px 5px"}}> {label}</Button>)}</td>
                    <td>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleEditClick(customer)}>
                        <i className="bi bi-pencil-fill my-pen-color" />
                      </button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleView(customer)}>
                        <i className="bi bi-eye-fill my-eye-color" />
                      </button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleEditAddress(customer)}>
                        <i className="bi bi-geo-alt-fill my-geo-color" />
                      </button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handlePendingReport(customer)}>
                        <i className="bi bi-list my-list-color" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
      </Row>

      {
    totalPages>1?<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination aria-label="Page navigation example">
            {generatePaginationItems()}
          </Pagination>
      </div>:null
   }

    </ComponentCard>
  );
};

export default Customer;
