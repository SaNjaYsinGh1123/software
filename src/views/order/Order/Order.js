import React, {useState,useEffect } from 'react';
import { Row,Col,Button,Input,Label,Collapse,Card,CardBody,Form,FormGroup,FormText,Table} from 'reactstrap';
import PropTypes from 'prop-types';
import 'react-table-v6/react-table.css';
import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../../components/ComponentCard5';
import OrderProduct from './orderProduct';

const MyTooltip = ({children,text})=>{

  return (<div className="tooltip-container">
      {/* {console.log('children',children)} */}
      {children}
      <span className="my-tooltip">{text}</span>
  </div>)
}

const JumbotronComponent = () => {
// const [data,setData] = useState([]);
      const [collapse, setCollapse] = useState(false);
      const navigate = useNavigate();
      const [Orderdata,setOrderData] = useState([]);
     

      function formatDate(inputDate) {
        const date = new Date(inputDate);
      
        // Use Intl.DateTimeFormat to format the date
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(date);

      }
      
      const toggle = () => setCollapse(!collapse);
      const handleEditAdd = () => {   
        navigate('/order/orders/add');
      };

      const  editOrder = (order) => {
        navigate(`/order/orders/edit?id=${order.id}`);
      };

      const  viewOrder = (item) => {
        console.log('hi');
        navigate(`/order/orders/view/?id=${item.id}`);
      };

      const  viewCustomer = (customerId) => {
        console.log('hi');
        navigate(`/order/customers/view/?id=${customerId}`);
      };



      const StatusName = (statusId) => {
        switch(statusId) {
          case '0':
            return 'Under Review';
          case '1':
            return 'Confirmed';
          case '2':
            return 'Canceled';
          case '3':
            return 'Completed';
          case '4':
            return 'Parked';
          default:
            return 'Unknown Status';
        }
      };

      useEffect(()=>{
        const fetchOrderData = async ()=>{

          const token = localStorage.getItem('userToken');
          const response =await  fetch(`https://factory.teamasia.in/api/public/orders`,{
            method: "GET",
            headers:{
              'Authorization': `Bearer ${token}`
            }
          });

          if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const datas = await response.json();
          console.log('result order',datas.orders);
          
          setOrderData(datas?.orders.sort((a, b) =>  new Date(b.created_at) - new Date(a.created_at)));
        }

        fetchOrderData();
      },[])

  return (
    <>
      
            <ComponentCard>
              <Row>
                <Col md="4">
                  <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => handleEditAdd()}>
                    Add Order
                  </Button>
                  <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem',marginRight:'10px' }}>
                    Search
                  </Button>
                  {/* <Button className='my-btn-color-green' style={{ marginBottom: '1rem',marginRight:'10px' }} >
                    Parked
                  </Button>
                </Col>
                <Col md="8" style={{textAlign:'right'}}>
                   <Button className='my-btn-color-red' style={{ marginBottom: '1rem',marginRight:'10px' }} >
                     Print
                  </Button>
                   <Button className='my-btn-color-green' style={{ marginBottom: '1rem',marginRight:'10px' }} >
                    Sort By Customer
                  </Button> */}
                </Col>
              </Row>
              <Row>
                  <Collapse isOpen={collapse}>
                    <Card className="border">
                      <CardBody>
                      <Form>
                    <Row>
                      <Col md="2">
                        <FormGroup>
                          <Label>Order No</Label>
                          <Input type="text" placeholder="Order No" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Customer</Label>
                          <Input type="text" placeholder="" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Order Date</Label>
                          <Input type="date" placeholder="Order Date" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Expected Date</Label>
                          <Input type="date" placeholder="Expected Date" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Grain</Label>
                          <Input type="text" placeholder="" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                      <FormGroup>
                          <Label>Priority</Label>
                          <Input type="select">
                            <option>Choose Priority...</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                          </Input>
                      </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Status</Label>
                          <Input type="text" placeholder="" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Quality</Label>
                          <Input type="text" placeholder="" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Purchase Order</Label>
                          <Input type="text" placeholder="" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Color</Label>
                          <Input type="text" placeholder="" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Thickness</Label>
                          <Input type="text" placeholder="Thickness" />
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
              </Row>
              <div className='table-margin table-responsive'>
                <Table className='table-margin-zero-temp responsive table-size-x order-page-table-border' size="sm">
                  <thead>
                    <tr>
                      <th style={{paddingBottom:'25px',fontWeight:'600'}}>Order Details</th>
                      <th style={{paddingBottom:'25px',fontWeight:'600'}}>Order and Exp Date</th>
                      <th>
                        <Table className="order-page-table-product-heading order-page-table-border-not " style={{padding:'0px'}}>
                           <tbody>
                            <tr>
                            <td>         Grain </td>
                            <td>       Quality </td>
                            <td>         THKNS </td>
                            <td>         Color </td>
                            <td>         T.Qty </td>
                            <td>          2PLN </td>
                            <td>           MFG </td>
                            <td>          DISP </td>
                            <td>       DISP OT </td>
                            <td>Actual Pending </td>
                            </tr>
                           </tbody>
                        </Table>
                      </th>
                    </tr>
                  </thead>
                  <tbody >
                    {Orderdata.map((item)=>(
                          <tr key={item.id}>
                          <td>
                            <Table className="order-page-table order-page-table-border-not" size="sm">
                              <thead>
                                <tr>
                                  <th>
                                     <div style={{padding:"1px"}} className='my-btn-color-red'>
                                        #{item.id}
                                     </div> 
                                      
                                  </th>
                                  <th title={item?.customer_details?.company_name}>
                                      {item?.customer_details?.company_name}
                                  </th>
                                </tr>
                                <tr>
                                  <th>
                                      {StatusName(item.status_id)}
                                  </th>
                                  <th>
                                        <button type="button" className="btn mybtncustomer btn-secondary  mr-5" onClick={()=>{editOrder(item)}}><i className="bi bi-pencil-fill my-pen-color" /></button>
                                        <button type="button" className="btn mybtncustomer btn-secondary  mr-5" onClick={()=>{viewOrder(item)}}><i className="bi bi-eye-fill my-list-color" /></button>
                                        {/* <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-files my-eye-color" /></button> */}
                                        {/* <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-file-earmark-check-fill my-eye-color" /></button> */}
                                        <button type="button" className="btn mybtncustomer btn-secondary  mr-1" onClick={()=>{viewCustomer(item.customer_id)}}><i className="bi bi-person-fill my-trash-color" /></button>
                                  </th>
                                </tr>
                              </thead>
                            </Table>
                          </td>
                          
                          <td  className="date-cell">
                            <div style={{padding:'5px'}}>
                              {formatDate(item.created_at)}
                            </div>
                            <div style={{padding:'5px'}}>
                              {formatDate(item.expected_delivery_date)}
                            </div>
                          </td> 
                          <td>
                          <OrderProduct orderID = {item.id}/> 
                          </td>
                          </tr>
                    ))}
                   

                  </tbody>
                </Table>
                
              </div>
            </ComponentCard>
       
    </>
  );
};

export default JumbotronComponent;

MyTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};