import React,{useEffect,useState,useCallback} from 'react';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';
import {
  Row,
  Col,
  Input,
  FormText,
  FormGroup,
  Form,
  CardBody,
  Label,
  Card,
  Collapse,
  Button,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../../components/ComponentCard';
import 'react-table-v6/react-table.css';
// import Barcode from "../../../assets/images/bg/barcode.png"
// import SmallRollDetails from './smallRollDetails'
import OrderProductView from './orderProductView';

const useDebouncedFetchOptions = (endpoint) => {
  const fetchOptions = async (inputValue) => {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`https://factory.teamasia.in/api/public/${endpoint}?search=${inputValue}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result[endpoint].map(item => ({ value: item.id, label: item.name || item.code || item.company_name }));
  };

  const debouncedFetch = useCallback(debounce((inputValue, callback) => {
    fetchOptions(inputValue).then(callback).catch(error => {
      console.error(error);
      callback([]);
    });
  }, 300), [endpoint]);

  return debouncedFetch;
};

const JumbotronComponent = () => {
  const navigate = useNavigate();
  const [SaverityData, setSaverityData] = useState([]);

  const [OrderWithCompleteData,setOrderWithCompleteData] =  useState([]);

  const [collapse, setCollapse] = useState([false]);
  const [collapseSearch, setCollapseSearch] = useState(false);
  
  const toggle = () => setCollapseSearch(!collapseSearch);

  const [filteredOrderCompleteData, setFilteredOrderCompleteData] = useState([]);

  // console.log('OrderWithCompleteData',OrderWithCompleteData);
 
  const [searchData,setSearchData] = useState({
    customerId:{value: 'x', label: 'choose'},
    severityId:'x',
    grain: { value: 'x', label: 'choose'},
    searchBy:'0',
    orderID:'',
    sortOrder:'0'
  });

  const customerOptions = useDebouncedFetchOptions('customers');
  const grainOptions = useDebouncedFetchOptions('grains');

  const toggleSort = (op)=>{
    // console.log('op',op);
    setSearchData(prevState => ({
      ...prevState,
      sortOrder:op
    }));
  }

  const collapseSetter = (index)=>{

    const newCollapse = [...collapse];
    newCollapse[index] = !newCollapse[index];
    setCollapse(newCollapse);
  }
  
  const handleSelectChange = (selectedOption, actionMeta) => {
    setSearchData(prevState => ({
      ...prevState,
      [actionMeta.name]: selectedOption
    }));
  };

  const handleSearchChange = (e) => {
    const {name, value} = e.target;
    setSearchData(prevState => ({
      ...prevState,
      [name] : value
    }));
  };

  const handleSearchReset = () => {
    setSearchData({
      customerId:{ value: 'x', label: 'choose'},
      severityId:'x',
      grain: { value: 'x', label: 'choose'},
      searchBy:'0',
      orderID:'',
      sortOrder:'0'
    });
    setFilteredOrderCompleteData(OrderWithCompleteData);
  };

  const filterOrders = (orderArray, filterData) => {

    // console.log('orderArray',orderArray,filterData);
    const filterdOrders = orderArray.filter(order => {
      // Filter by customer ID
      const matchesCustomerId = (filterData.customerId?.value !== 'x'||'')
        ? order.customer_id === filterData.customerId.value
        : true;

      // const matchesCustomerId = true;
  
      // Filter by order ID
      const matchesOrderId = filterData.orderID !==''
        ? order.id === filterData.orderID
        : true;
  
      // Filter by severity ID
      const matchesSeverityId = filterData.severityId !== 'x'
        ? order.severity_id === filterData.severityId
        : true;
  
        // const matchesSeverityId = true;

      // Filter by grain ID in productDetails
      const matchesGrain = (filterData.grain?.value !== 'x'||'')
        ? order.productDetails.some(
            product => product.grain_id === filterData.grain.value
          )
        : true;
       
        // const matchesGrain = true;
      // Return true if all filters match
      return matchesCustomerId && matchesOrderId && matchesSeverityId && matchesGrain;
    });

    if(filterData.searchBy === '1'){
      filterdOrders.sort((A,B)=>{
        const DateA = new Date(A.expected_delivery_date);
        const DateB = new Date(B.expected_delivery_date);

        return filterData.sortOrder === '0'? DateA -DateB: DateB-DateA
      })
    }
    if(filterData.searchBy === '2'){
      filterdOrders.sort((A,B)=>{
        const DateA = new Date(A.created_at);
        const DateB = new Date(B.created_at);

        return filterData.sortOrder === '0'? DateA -DateB: DateB-DateA
      })
    }
 
    return filterdOrders;
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // console.log('form',searchData);
    const filteredOrders = filterOrders(OrderWithCompleteData, searchData);
    // console.log('Filtered Orders:', filteredOrders);
    setFilteredOrderCompleteData(filteredOrders);
  };
  
  function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    // Use Intl.DateTimeFormat to format the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);

  }

  const dispatchOrderAdd= (item)=>{
    // console.log('item',item);
    navigate('/operations/dispatch-order/add',{state:item});
  }



useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch('https://factory.teamasia.in/api/public/severities/?is_trashed=0', {
      method: 'GET', 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    // console.log('result',response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    // console.log("data severities",result.severities);
    const resultX = result.severities.slice();
    const sever = resultX.find(item => item.id === searchData.severityId);
    if(!sever){
      setSearchData(prevState => ({
        ...prevState,
        severityId:'x'
      }));
    }
    resultX.push({id:'x',name:'Choose'});
    setSaverityData(resultX); 
  };
  
  const fetchOrderWithCompleteData = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/orders/?status_id=1`, {
      method: 'GET', 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    // console.log('result',response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    // console.log("responsejson1",result?.orders);
    setOrderWithCompleteData(result?.orders);
    setFilteredOrderCompleteData(result?.orders);
    setCollapse(Array.from({length: result?.orders.length}, ()=>false));
  };
  fetchOrderWithCompleteData()
  fetchData();
},[]);

  return (
    <>
       {/* <SmallRollDetails modal={modal} toggle={smallRollDetailsTogglefunction}/> */}
       

      <ComponentCard title="">

        <Row style={{padding:'8px'}}>
              <Button className='' onClick={toggle.bind(null)} style={{background:'whitesmoke',width:'100%'}}>
                  <div style={{background:'#3780a2',width:'fit-content',borderRadius:'50%',padding:'5px 10px'}}>
                    <i className='bi-funnel' style={{fontSize:'20px',color:'white'}}/>
                  </div>
              </Button>
              <Collapse isOpen={collapseSearch}>
              <Card className="border">
                <CardBody>
                  <Form  onSubmit={handleSearch}>
                    <Row>
                      <Col md="2">
                        <FormGroup>
                          <Label>Order ID</Label>
                          <Input type="text" name="orderID" value={searchData.orderID} onChange={handleSearchChange} placeholder="Order ID" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Customer</Label>
                          <AsyncSelect
                                name="customerId"
                                onChange={handleSelectChange}
                                loadOptions={customerOptions}
                                value={searchData.customerId}
                                isClearable
                                isSearchable
                              />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Priority</Label>
                          <Input type="select" 
                                name="severityId" 
                                value={searchData.severityId}
                                onChange={handleSearchChange} >
                                  {SaverityData.map((item)=>{
          
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                  })}
                            </Input>
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                        <Label>Grain</Label>
                        <AsyncSelect
                          name="grain"
                          onChange={handleSelectChange}
                          loadOptions={grainOptions}
                          value={searchData.grain}
                          isClearable
                          isSearchable
                        />
                      </FormGroup>
                      </Col>

                      <Col md="1">
                        <FormGroup>
                          <Label>Sort By</Label>
                          <Input type="select"
                             name="searchBy" 
                             value={searchData.searchBy} 
                             onChange={handleSearchChange} 
                             >
                             <option value='0'>Sort By..</option>
                             <option value='1'>Expected Date</option>
                             <option value='2'>Order Date</option>
                            </Input>
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="1">
                        <FormGroup>
                            <Label>Sort By</Label>
                            <div>
                             {searchData.sortOrder === '0'?<i className="bi bi-sort-down-alt" style={{fontSize:'25px'}} onClick={()=>toggleSort('1')}></i>:null} 
                             {searchData.sortOrder === '1'?<i className="bi bi-sort-down" style={{fontSize:'25px'}} onClick={()=>toggleSort('0')}></i>:null} 
                            </div>
                        </FormGroup>
                      </Col>
                     
                      <Col md="2">
                        <FormGroup>
                          <Button type="submit" className="btn btn-info" style={{ marginTop: "28px" }}>
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
        </Row>
      {OrderWithCompleteData.length > 0? 
          <>
            {filteredOrderCompleteData.length > 0 ? <> {filteredOrderCompleteData.map((item,index) =>(
              <div key={item.id}>
                <Row  style={{background:'rgb(21 101 104)',padding:'10px',margin:"5px 0px"}}>
                  <Col md="5" onClick={()=>{collapseSetter(index)}} style={{color:'white'}}>
                    
                        {`# ${item.id}`} {item?.customer_details?.company_name}<br></br>
                        Order Date: {formatDate(item.created_at)} | Nearest Expected Date: {formatDate(item.expected_delivery_date)}
                    
                  </Col>
                  <Col md="3" onClick={()=>{collapseSetter(index)}} style={{textAlign:'right',color:'white'}}>
                    
                        {/* <span style={{borderRadius:'10px',padding:'2px 4px',background:'#1a1818',color:'white',fontWeight:'700'}}>26</span> Rolls Available */}
                    
                  </Col>
                  <Col md="2" onClick={()=>{collapseSetter(index)}} style={{textAlign:'right',color:'white'}}>
                    
                        {/* <span style={{borderRadius:'10px',padding:'2px 4px',background:'#1a1818',color:'white',fontWeight:'700'}}>26</span> Rolls Selected */}
                    
                  </Col>
                  <Col md="2" onClick={()=>{collapseSetter(index)}} style={{textAlign:'right'}}>
                    
                        <Button style={{borderRadius:'10px',background:'white',color:'black',fontWeight:'700'}} onClick={()=>dispatchOrderAdd(item)}>Dispatch</Button>
                    
                  </Col>
                </Row>
                <Row >
                  <Collapse isOpen={collapse[index]}>
                   {item?.id && <OrderProductView orderID={item.id} key={item.id} />} 
                  </Collapse>
                </Row>
              </div>
              ))}
              </>
              :<>
              <Row>
                <Col md="12"> 
                      
                      <div className="my-btn-color-red"  style={{textAlign:'center',color:'white',marginBottom:'2px',padding:'20px'}}> 
                          <div>
                            <i className="bi bi-emoji-frown" style={{fontSize:'25px',color:'white'}}/>
                          </div>
                             No confirmed orders to list.
                      </div>
                </Col>
              </Row>
            </>
            }
         </>
        :
        <>
          <Row>
            <Col md="12"> 
                  <div className="my-btn-color-green"  style={{textAlign:'center',color:'white',marginBottom:'2px',padding:'20px'}}> 
                        <div>
                            <i className="bi bi-emoji-frown" style={{fontSize:'25px',color:'white'}}/>
                        </div>
                        No confirmed orders to list.
                  </div>
            </Col>
          </Row>
        </>}
         
      </ComponentCard>
    </>
  );
};

export default JumbotronComponent;
