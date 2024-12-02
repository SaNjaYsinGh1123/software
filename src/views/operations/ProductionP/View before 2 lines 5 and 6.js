import React, {useState,useEffect } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {useLocation, useNavigate} from 'react-router-dom';
import ComponentCard from '../../../components/ComponentCard';
import ComponentCard4 from '../../../components/ComponentCard2';
import 'react-table-v6/react-table.css';
import CreateJumboRoll from './createJumboRoll'
import UpdateJumboRoll from './UpdateJumboRoll'
import PasteConsumption from './pasteConsumption'
import PlanViewProduct from "./planViewProduct";
import PlanViewJumbo from "./planViewJumbo";
import PlanLineDetailsView from "./planLineDetailsView";

const JumbotronComponent = () => {
  const [activeTab, setActiveTab] = useState('1');
  const navigate = useNavigate();
  const location = useLocation();
  const {Customerdata} = location.state
  const { date: planDate } = location.state.item
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [QaData, setQaData] = useState([]);
  const [line1, setLine1] = useState([]);
  const [line2, setLine2] = useState([]);
  const [line3, setLine3] = useState([]);
  const [line4, setLine4] = useState([]);
  const [data6, setData6] = useState([]);

  // const [line1D, setLine1D] = useState(undefined);


  const [JumboDataFromPlan, setJumboDataFromPlan] = useState({});
  const [JumboUpdateDataFromPlan, setJumboUpdateDataFromPlan] = useState({});
  const [refreshKey, setRefreshKey] = useState(0); // New state to trigger re-render

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };


//  console.log('data.....',location.state.item,location);

 function formatDate(inputDate) {
  const date = new Date(inputDate);

  // Use Intl.DateTimeFormat to format the date
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

 const CustomerName =(customerId)=>{
  const result =  Customerdata.find((item)=> item.id === customerId);
  if(!result){
    return 'unknown customer'
  }
  return result.company_name;
}

 const addRollTogglefunction = ()=>{
  console.log('click');
  setModal1(!modal1);
}
 const setterJumboDataFromPlan = (product)=>{
  // console.log('productxxxxxxxxxxxxxx',product)
  setJumboDataFromPlan(product);
  addRollTogglefunction();
}

 const  updateRollTogglefunction = ()=>{
  console.log('click');
  setModal2(!modal2);
}

const handleCreateJumboRoll = () => {
  // Callback function to handle jumbo roll creation
  console.log('something happened !');
  setRefreshKey(oldKey => oldKey + 1);
};

const setterJumboUpdateDataFromPlan = (product)=>{
  // console.log('product',product);
  setJumboUpdateDataFromPlan(product);
  updateRollTogglefunction();
}



 const addPasteConsumption = ()=>{
  console.log('click');
  setModal(!modal);
}

const setterPasteDataFromPlan = (product)=>{
  console.log('hi',product)
  setJumboUpdateDataFromPlan(product);
  addPasteConsumption();
}

 const LabReport = (product)=>{
  console.log('click');
  navigate('/operations/production-plans/manage-plan/lab-report',{state:{product}})
}

const BomReportFunction = (product)=>{
  // console.log('product',product);
  navigate('/operations/Bom-Report',{state:{productionPlanId : product?.id}});
}
const ParametersReportFunction = (product)=>{
  navigate('/operations/Production-Report',{state:{productionPlanId : product?.id}});
}

const handleSortAndGroup = (products) => {
  // Step 1: Group the products by their is_passed value
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.is_passed]) {
      acc[product.is_passed] = [];
    }
    acc[product.is_passed].push(product);
    return acc;
  }, {});

  // Step 2: Sort each group based on sequence
  Object.keys(groupedProducts).forEach((key) => {
    groupedProducts[key].sort((a, b) => a.sequence - b.sequence);
  });

  // Step 3: Combine the groups back into a single array
  // Assuming you want to sort by is_passed in ascending order, change if needed
  const sortedProducts = Object.keys(groupedProducts)
    .sort((a, b) => a - b) // Sort the groups by is_passed value (numeric ascending)
    .flatMap((key) => groupedProducts[key]); // Combine sorted groups

   sortedProducts.forEach((product, index) => {
      // Check if the next product has a different is_passed value or doesn't exist
      if (
        index === sortedProducts.length - 1 || // Last product in the list
        sortedProducts[index + 1].is_passed !== product.is_passed // Different is_passed value
      ) {
        product.isLastInPass = true; // Mark as last in the group
      } else {
        product.isLastInPass = false; // Mark as not last in the group
      }
    });

  return sortedProducts;
};

useEffect(()=>{
  // const fetchLine1Details = async () => {
  //   const token = localStorage.getItem('userToken');
  //   // console.log('token',token);
  //   const response = await fetch(`https://factory.teamasia.in/api/public/productionplan/getPlanDates?line_id=1&plan_date=${planDate}`, {
  //     method: 'GET', 
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   });
  //   // console.log('result',response);
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   const result = await response.json();
  //   console.log("responsejson1 fetchLineDetails",result.planDates);
  //   setLine1D(result?.planDates?.[0]);
  // };



  const fetchData6 = async () => {
    const token = localStorage.getItem('userToken');
    const response = await fetch('https://factory.teamasia.in/api/public/pasteteams/?is_trashed=0', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    const resultX = result.pasteteams.slice();
    resultX.push({ id: 'x', name: 'Choose' });
    setData6(resultX);
  };

 

  const fetchQaData = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch('https://factory.teamasia.in/api/public/qapateams/?is_trashed=0', {
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
    // console.log("responsejson1",result);
    const resultX = result.qapateams.slice();
    resultX.push({id:'x',name:'Choose'});
    setQaData(resultX); 
  };
  const fetchDataPlan = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/productionplan/?plan_date=${planDate}`, {
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
    // console.log("responsejson1 producton",result);
    const plans = result.production_plan;

    const line1Data = plans.filter(plan => plan.line_id === '1');
    const line2Data = plans.filter(plan => plan.line_id === '2');
    const line3Data = plans.filter(plan => plan.line_id === '3');
    const line4Data = plans.filter(plan => plan.line_id === '4');

    console.log('line1Data',handleSortAndGroup(line1Data));
    console.log('line2Data',handleSortAndGroup(line2Data));
    console.log('line3Data',handleSortAndGroup(line3Data));
    console.log('line4Data',handleSortAndGroup(line4Data));
    // Set state
    setLine1(handleSortAndGroup(line1Data));
    setLine2(handleSortAndGroup(line2Data));
    setLine3(handleSortAndGroup(line3Data));
    setLine4(handleSortAndGroup(line4Data));

  };
  // fetchLine1Details();
  fetchData6();
  fetchDataPlan();
  fetchQaData();
},[]);
  
// console.log(line1,line2,line3,line4);

  return (
    <>
       {/* <CreateJumboRoll modal={modal1} JumboDataFromPlan={JumboDataFromPlan} setModal1={setModal1} toggle={addRollTogglefunction}   data2={QaData} data6={data6}/>
       <UpdateJumboRoll modal={modal2} JumboUpdateDataFromPlan={JumboUpdateDataFromPlan} setModal1={setModal2} toggle={updateRollTogglefunction}   data2={QaData} data6={data6}/>
       <PasteConsumption modal={modal}  toggle={addPasteConsumption }  data2={QaData} data3={data3} data4={data4} data6={data6}/> */}

       {modal1 && <CreateJumboRoll handleCreateJumboRoll ={handleCreateJumboRoll} modal={modal1} JumboDataFromPlan={JumboDataFromPlan} setModal1={setModal1} toggle={addRollTogglefunction} data2={QaData} data6={data6} />}
      {modal2 && <UpdateJumboRoll modal={modal2} JumboUpdateDataFromPlan={JumboUpdateDataFromPlan} setModal1={setModal2} toggle={updateRollTogglefunction} data2={QaData} data6={data6} />}
      {modal && <PasteConsumption modal={modal} toggle={addPasteConsumption} JumboDataFromPlan={JumboUpdateDataFromPlan} data2={QaData} data3={[]} data4={[]} data6={data6} />}
      
      <ComponentCard title="">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Line 1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Line 2
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Line 1 (night)
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '4' ? 'active' : ''}
              onClick={() => {
                toggle('4');
              }}
            >
              Line 2 (night)
            </NavLink>
          </NavItem>
          {/* <Button >Print Plan</Button> */}
          <button type="button">Print Plan</button>
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            
              <Table responsive size="sm">
                <thead>
                  {activeTab === '1' &&  <PlanLineDetailsView Refreshkey={refreshKey} line={1} planDate={planDate}/>}  
                </thead>
              </Table>
            {line1?.length <1 ? <div className="my-btn-color-temp"  style={{background: 'aliceblue',textAlign:'center',border: '2px solid black',color:'black',marginBottom:'2px',padding:'40px'}}>
                    <div>
                      <i className="bi bi-emoji-frown" style={{fontSize:'25px',color:'black'}}/>
                    </div>
                    No item on this production line.
               </div>:line1.map((product)=>{
                return <React.Fragment key={product.id}>
                          <ComponentCard4>
                            <div className='table-margin' >
                              <Table className='table-margin-zero'  responsive size="sm">
                                <thead>
                                  <tr>
                                    <th scope="col">
                                      <div style={{margin:"16px"}}>
                                        <div>{CustomerName(product.customer_id)}  
                                          <button type="button" style={{background:'rgb(28 81 28)',color:'white',borderRadius:'7px'}}>Product({product?.product_details.ref_product_id !== '0'? product?.product_details.ref_product_id :product.product_id})</button>
                                            {(product?.product_details.is_online_product !== '0' || product?.product_details.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                            {product?.product_details.is_online_product !== '0' && product?.product_details.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                            {product?.product_details.is_online_product === '0' && product?.product_details.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                        </div>
                                        <div>Delivery Date :{ formatDate(product.created_at)}, Total : {product.quantity} |  Remaining : {Number(product.quantity)-Number(product.total_jumbo_roll_quantity)} </div>
                                      </div>
                                      </th>
                                    <th scope="col"><Button style={{margin:"16px"}} className='my-btn-color' onClick={()=>setterJumboDataFromPlan(product)}>Create Jumbo Roll</Button></th>
                                    <th scope="col"><Button style={{margin:"16px"}} className='my-btn-color-red' onClick={()=>setterPasteDataFromPlan(product)}>Paste Consumption</Button></th>
                                    <th scope="col"><Button style={{margin:"16px"}} className='my-btn-color-red'>Manage daily Usage</Button></th>
                                    <th scope="col"><Button style={{margin:"16px"}} className='my-btn-color-red' onClick={()=>LabReport(product)}>Lab Report</Button></th>
                                    <th scope="col">
                                          <UncontrolledDropdown direction="left">
                                              <DropdownToggle caret  className='my-btn-mo-color' style={{margin:"16px"}}>
                                                  More
                                              </DropdownToggle>
                                              <DropdownMenu className="custom-dropdown-menu">
                                                <DropdownItem className="custom-dropdown-item" onClick={()=>ParametersReportFunction(product)}>Production Level Parameters</DropdownItem>
                                                <DropdownItem className="custom-dropdown-item" onClick={()=>BomReportFunction(product)}>BOM Report</DropdownItem>
                                              </DropdownMenu>
                                          </UncontrolledDropdown>
                                    </th>

                                  </tr>
                                </thead>
                                
                              </Table>
                              
                              <PlanViewProduct productID ={product.product_id}/>
                              
                              <Table responsive size="sm">
                                <thead>
                                  <tr>
                                    <th scope="col">Pre Skin</th>
                                    <th scope="col">Skin</th>
                                    <th scope="col">Top Coat</th>
                                    <th scope="col">Filler In Top Coat</th>
                                    <th scope="col">Foam</th>
                                    <th scope="col">Filler In Foam</th>
                                    <th scope="col">Adhesive</th>
                                    <th scope="col">Filler In Adhesive</th>
                                    <th scope="col">Final GSM</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{product.pre_skin}</td>
                                    <td>{product.skin} gsm</td>
                                    <td>{product.top_coat}</td>
                                    <td>{product.filler_in_top_coat}</td>
                                    <td>{product.foam} gsm</td>
                                    <td>{product.filler_in_foam} PHR</td>
                                    <td>{product.adhesive} gsm</td>
                                    <td>{product.filler_in_adhesive} PHR</td>
                                    <td>{product.final_gsm} gsm</td>
                                  </tr>
                                
                                </tbody>
                              </Table>
                                {activeTab === '1' &&  <PlanViewJumbo Refreshkey={refreshKey} product={product} updateRollTogglefunction={setterJumboUpdateDataFromPlan}/>}
                            
                                {product.isLastInPass ? <div style={{display:'flex',justifyContent:'space-between',background:'#f1c76f',alignItems:'center',margin:"10px 0px",padding:"5px"}}>
                                                                                <span className='production-plan-page-collape-heading' style={{width:'100%',textAlign:'center'}}>Pass {product.is_passed} Completed</span>
                                                                            </div>:''}
                            </div>
                            
                          </ComponentCard4>
                       </React.Fragment>
              })
            }
          </TabPane>
          <TabPane tabId="2">
                <Table responsive size="sm">
                  <thead>
                      {activeTab === '2' &&  <PlanLineDetailsView Refreshkey={refreshKey} line={2} planDate={planDate}/>}  
                  </thead>
                </Table>
                {line2?.length <1 ? <div className="my-btn-color-temp"  style={{background: 'aliceblue',textAlign:'center',border: '2px solid black',color:'black',marginBottom:'2px',padding:'40px'}}>
                    <div>
                      <i className="bi bi-emoji-frown" style={{fontSize:'25px',color:'black'}}/>
                    </div>
                    No item on this production line.
               </div>:line2.map((product)=>{
                return <React.Fragment key={product.id}>
                          <ComponentCard4>

                            <div className='table-margin'>
                            <Table className='table-margin-zero' responsive size="sm">
                                <thead>
                                  <tr>
                                    <th scope="col">
                                      <div>{CustomerName(product.customer_id)}  
                                        <button type="button" style={{background:'rgb(28 81 28)',color:'white',borderRadius:'7px'}}>Product({product?.product_details.ref_product_id !== '0'? product?.product_details.ref_product_id :product.product_id})</button>
                                          {(product?.product_details.is_online_product !== '0' || product?.product_details.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                          {product?.product_details.is_online_product !== '0' && product?.product_details.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                          {product?.product_details.is_online_product === '0' && product?.product_details.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                      </div>
                                      <div>Delivery Date :{ formatDate(product.created_at)}, Total : {product.quantity} | {Number(product.quantity)-Number(product.total_jumbo_roll_quantity)} </div>
                                      </th>
                                    <th scope="col"><Button className='my-btn-color' onClick={()=>setterJumboDataFromPlan(product)}>Create Jumbo Roll</Button></th>
                                    <th scope="col"><Button className='my-btn-color-red' onClick={()=>setterPasteDataFromPlan(product)}>Paste Consumption</Button></th>
                                    <th scope="col"><Button className='my-btn-color-red'>Manage daily Usage</Button></th>
                                    <th scope="col"><Button className='my-btn-color-red' onClick={()=>LabReport(product)}>Lab Report</Button></th>
                                    <th scope="col">
                                          <UncontrolledDropdown direction="left">
                                              <DropdownToggle caret  className='my-btn-mo-color' style={{margin:"16px"}}>
                                                  More
                                              </DropdownToggle>
                                              <DropdownMenu className="custom-dropdown-menu">
                                                <DropdownItem className="custom-dropdown-item" onClick={()=>ParametersReportFunction(product)}>Production Level Parameters</DropdownItem>
                                                <DropdownItem className="custom-dropdown-item" onClick={()=>BomReportFunction(product)}>BOM Report</DropdownItem>
                                              </DropdownMenu>
                                          </UncontrolledDropdown>
                                    </th>
                                  </tr>
                                </thead>
                                
                              </Table>

                              <PlanViewProduct productID ={product.product_id}/>
                            
                              
                              <Table responsive size="sm">
                                <thead>
                                  <tr>
                                    <th scope="col">Pre Skin</th>
                                    <th scope="col">Skin</th>
                                    <th scope="col">Top Coat</th>
                                    <th scope="col">Filler In Top Coat</th>
                                    <th scope="col">Foam</th>
                                    <th scope="col">Filler In Foam</th>
                                    <th scope="col">Adhesive</th>
                                    <th scope="col">Filler In Adhesive</th>
                                    <th scope="col">Final GSM</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{product.pre_skin}</td>
                                    <td>{product.skin} gsm</td>
                                    <td>{product.top_coat}</td>
                                    <td>{product.filler_in_top_coat}</td>
                                    <td>{product.foam} gsm</td>
                                    <td>{product.filler_in_foam} PHR</td>
                                    <td>{product.adhesive} gsm</td>
                                    <td>{product.filler_in_adhesive} PHR</td>
                                    <td>{product.final_gsm} gsm</td>
                                  </tr>
                                
                                </tbody>
                              </Table>
                                {activeTab === '2' &&  <PlanViewJumbo Refreshkey={refreshKey} product={product} updateRollTogglefunction={setterJumboUpdateDataFromPlan}/>}
                              
                                {product.isLastInPass ? <div style={{display:'flex',justifyContent:'space-between',background:'#f1c76f',alignItems:'center',margin:"10px 0px",padding:"5px"}}>
                                                                                <span className='production-plan-page-collape-heading' style={{width:'100%',textAlign:'center'}}>Pass {product.is_passed} Completed</span>
                                                                            </div>:''}
                            </div>
                            
                          </ComponentCard4>
                       </React.Fragment>
                })
            }
          </TabPane>
          <TabPane tabId="3">
                <Table responsive size="sm">
                  <thead>
                      {activeTab === '3' &&  <PlanLineDetailsView Refreshkey={refreshKey} line={3} planDate={planDate}/>}  
                  </thead>
                  
                </Table>
                {line3?.length <1 ? <div className="my-btn-color-temp"  style={{background: 'aliceblue',textAlign:'center',border: '2px solid black',color:'black',marginBottom:'2px',padding:'40px'}}>
                    <div>
                      <i className="bi bi-emoji-frown" style={{fontSize:'25px',color:'black'}}/>
                    </div>
                    No item on this production line.
               </div>:line3.map((product)=>{
                return <React.Fragment key={product.id}>
                        <ComponentCard4>

                          <div className='table-margin'>
                             <Table className='table-margin-zero' responsive size="sm">
                              <thead>
                                <tr>
                                  <th scope="col">
                                    <div>{CustomerName(product.customer_id)}  
                                      <button type="button" style={{background:'rgb(28 81 28)',color:'white',borderRadius:'7px'}}>Product({product?.product_details.ref_product_id !== '0'? product?.product_details.ref_product_id :product.product_id})</button>
                                        {(product?.product_details.is_online_product !== '0' || product?.product_details.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                        {product?.product_details.is_online_product !== '0' && product?.product_details.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                        {product?.product_details.is_online_product === '0' && product?.product_details.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                    </div>
                                    <div>Delivery Date :{ formatDate(product.created_at)}, Total : {product.quantity} | Remaining : {Number(product.quantity)-Number(product.total_jumbo_roll_quantity)} </div>
                                    </th>
                                  <th scope="col"><Button className='my-btn-color' onClick={()=>setterJumboDataFromPlan(product)}>Create Jumbo Roll</Button></th>
                                  <th scope="col"><Button className='my-btn-color-red' onClick={()=>setterPasteDataFromPlan(product)}>Paste Consumption</Button></th>
                                  <th scope="col"><Button className='my-btn-color-red'>Manage daily Usage</Button></th>
                                  <th scope="col"><Button className='my-btn-color-red' onClick={()=>LabReport(product)}>Lab Report</Button></th>
                                  <th scope="col">
                                          <UncontrolledDropdown direction="left">
                                              <DropdownToggle caret  className='my-btn-mo-color' style={{margin:"16px"}}>
                                                  More
                                              </DropdownToggle>
                                              <DropdownMenu className="custom-dropdown-menu">
                                                <DropdownItem className="custom-dropdown-item" onClick={()=>ParametersReportFunction(product)}>Production Level Parameters</DropdownItem>
                                                <DropdownItem className="custom-dropdown-item" onClick={()=>BomReportFunction(product)}>BOM Report</DropdownItem>
                                              </DropdownMenu>
                                          </UncontrolledDropdown>
                                    </th>
                                </tr>
                              </thead>
                              
                             </Table>

                             <PlanViewProduct productID ={product.product_id}/>
                          
                             <Table responsive size="sm">
                                <thead>
                                  <tr>
                                    <th scope="col">Pre Skin</th>
                                    <th scope="col">Skin</th>
                                    <th scope="col">Top Coat</th>
                                    <th scope="col">Filler In Top Coat</th>
                                    <th scope="col">Foam</th>
                                    <th scope="col">Filler In Foam</th>
                                    <th scope="col">Adhesive</th>
                                    <th scope="col">Filler In Adhesive</th>
                                    <th scope="col">Final GSM</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{product.pre_skin}</td>
                                    <td>{product.skin} gsm</td>
                                    <td>{product.top_coat}</td>
                                    <td>{product.filler_in_top_coat}</td>
                                    <td>{product.foam} gsm</td>
                                    <td>{product.filler_in_foam} PHR</td>
                                    <td>{product.adhesive} gsm</td>
                                    <td>{product.filler_in_adhesive} PHR</td>
                                    <td>{product.final_gsm} gsm</td>
                                  </tr>
                                
                                </tbody>
                             </Table>
                              {activeTab === '3' &&  <PlanViewJumbo Refreshkey={refreshKey} product={product} updateRollTogglefunction={setterJumboUpdateDataFromPlan}/>}
                               
                              {product.isLastInPass ? <div style={{display:'flex',justifyContent:'space-between',background:'#f1c76f',alignItems:'center',margin:"10px 0px",padding:"5px"}}>
                                                                  <span className='production-plan-page-collape-heading' style={{width:'100%',textAlign:'center'}}>Pass {product.is_passed} Completed</span>
                                                              </div>:''}
                          </div>
                          
                        </ComponentCard4>
                      </React.Fragment>
              })
            }
          </TabPane>
          <TabPane tabId="4">
                <Table responsive size="sm">
                   <thead>
                      {activeTab === '4' &&  <PlanLineDetailsView Refreshkey={refreshKey} line={4} planDate={planDate}/>}  
                  </thead>
                  
                </Table>
                {line4?.length <1 ? <div className="my-btn-color-temp"  style={{background: 'aliceblue',textAlign:'center',border: '2px solid black',color:'black',marginBottom:'2px',padding:'40px'}}>
                    <div>
                      <i className="bi bi-emoji-frown" style={{fontSize:'25px',color:'black'}}/>
                    </div>
                    No item on this production line.
               </div>:line4.map((product)=>{
                return <React.Fragment key={product.id}>
                        <ComponentCard4>
                          <div className='table-margin'>
                          <Table className='table-margin-zero' responsive size="sm">
                              <thead>
                                <tr>
                                  <th scope="col">
                                    <div>{CustomerName(product.customer_id)}  
                                      <button type="button" style={{background:'rgb(28 81 28)',color:'white',borderRadius:'7px'}}>Product({product?.product_details.ref_product_id !== '0'? product?.product_details.ref_product_id :product.product_id})</button>
                                        {(product?.product_details.is_online_product !== '0' || product?.product_details.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                        {product?.product_details.is_online_product !== '0' && product?.product_details.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                        {product?.product_details.is_online_product === '0' && product?.product_details.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                    </div>
                                    <div>Delivery Date :{ formatDate(product.created_at)}, Total : {product.quantity} | Remaining : {Number(product.quantity)-Number(product.total_jumbo_roll_quantity)} </div>
                                    </th>
                                  <th scope="col"><Button className='my-btn-color' onClick={()=>setterJumboDataFromPlan(product)}>Create Jumbo Roll</Button></th>
                                  <th scope="col"><Button className='my-btn-color-red' onClick={()=>setterPasteDataFromPlan(product)}>Paste Consumption</Button></th>
                                  <th scope="col"><Button className='my-btn-color-red'>Manage daily Usage</Button></th>
                                  <th scope="col"><Button className='my-btn-color-red' onClick={()=>LabReport(product)}>Lab Report</Button></th>
                                  <th scope="col">
                                          <UncontrolledDropdown direction="left">
                                              <DropdownToggle caret  className='my-btn-mo-color' style={{margin:"16px"}}>
                                                  More
                                              </DropdownToggle>
                                              <DropdownMenu className="custom-dropdown-menu">
                                                <DropdownItem className="custom-dropdown-item" onClick={()=>ParametersReportFunction(product)}>Production Level Parameters</DropdownItem>
                                                <DropdownItem className="custom-dropdown-item" onClick={()=>BomReportFunction(product)}>BOM Report</DropdownItem>
                                              </DropdownMenu>
                                          </UncontrolledDropdown>
                                    </th>
                                </tr>
                              </thead>
                              
                            </Table>

                            <PlanViewProduct productID ={product.product_id}/>
                          
                            
                            <Table responsive size="sm">
                              <thead>
                                <tr>
                                  <th scope="col">Pre Skin</th>
                                  <th scope="col">Skin</th>
                                  <th scope="col">Top Coat</th>
                                  <th scope="col">Filler In Top Coat</th>
                                  <th scope="col">Foam</th>
                                  <th scope="col">Filler In Foam</th>
                                  <th scope="col">Adhesive</th>
                                  <th scope="col">Filler In Adhesive</th>
                                  <th scope="col">Final GSM</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{product.pre_skin}</td>
                                  <td>{product.skin} gsm</td>
                                  <td>{product.top_coat}</td>
                                  <td>{product.filler_in_top_coat}</td>
                                  <td>{product.foam} gsm</td>
                                  <td>{product.filler_in_foam} PHR</td>
                                  <td>{product.adhesive} gsm</td>
                                  <td>{product.filler_in_adhesive} PHR</td>
                                  <td>{product.final_gsm} gsm</td>
                                </tr>
                              
                              </tbody>
                            </Table>
                              {activeTab === '4' &&  <PlanViewJumbo Refreshkey={refreshKey} product={product} updateRollTogglefunction={setterJumboUpdateDataFromPlan}/>}
                              {product.isLastInPass ? <div style={{display:'flex',justifyContent:'space-between',background:'#f1c76f',alignItems:'center',margin:"10px 0px",padding:"5px"}}>
                                                                                <span className='production-plan-page-collape-heading' style={{width:'100%',textAlign:'center'}}>Pass {product.is_passed} Completed</span>
                                                                            </div>:''}
                          </div>
                        </ComponentCard4>
                       </React.Fragment>
              })
            }
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default JumbotronComponent;
