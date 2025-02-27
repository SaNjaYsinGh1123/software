import React,{useState,useEffect}  from 'react';
import {
  Button,
  Row,
  Table,
  Col,
} from 'reactstrap';
import { useLocation, useNavigate} from 'react-router-dom';
import Barcode from 'react-barcode';
import ComponentCard1 from '../../../components/ComponentCard1';
import ComponentCard4 from '../../../components/ComponentCard4';
import 'react-table-v6/react-table.css';
// import Barcode from "../../../assets/images/bg/barcode.png"

import  AddressBlock from "./AddressBlock";

const JumbotronComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [dispatchData, setDispatchData] = useState(undefined);
  const dispatchId = location.state;
  // const dispatchData = product.dispatchItem;

  console.log('dispatchData',dispatchId);

  // const handleSmallRollEdit = (rollItem) => {
  //   navigate('/order/factory-surplus/small-roll-edit', {state: rollItem});
  // };


  const InvoiceView = (dispatchItem)=>{
    console.log('hi',dispatchItem);
    navigate('/operations/invoices/print',{state: dispatchItem});
  }

  function formatDate(inputDate) {

    if(!inputDate){
      return inputDate;
    }
    console.log(inputDate);
    const date = new Date(inputDate);
  
    // Use Intl.DateTimeFormat to format the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);

  }

  // const handleDeleteClick = async (itemId) => {
  //   try {
  //     // Call your API endpoint to delete the item
  //     const token = localStorage.getItem('userToken');
  //     const response = await fetch(`https://factory.teamasia.in/api/public/smallrolls/${itemId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });
  
  //     // Check if the request was successful
  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }
  
  //     // Filter out the deleted item from your data state
  //     const updatedData = data.filter((item) => item.id !== itemId);
  //     setData(updatedData);
  
  //     console.log('Item deleted successfully');
  //   } catch (error) {
  //     //only checks for error that are generated by fetch function , and cors 
  //     console.error('Failed to delete the item', error);
  //   }
  // };

  useEffect(() => {
    const fetchSmallRollsData = async (dispatch) => {
      try{
        const token = localStorage.getItem('userToken');
        // console.log('token',token);
        const response = await fetch(`https://factory.teamasia.in/api/public/smallrolls?small_roll_ids=${dispatch?.small_roll_ids}`, {
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
        console.log("responsejson1 small rolls",result.smallrolls);
        
        if(result && result.smallrolls.length !== 0){
          // const SmallRollIDs = dispatchData.small_roll_ids.split(',');
          //     const smallRolls = result.smallrolls.filter((smallRoll) => {
          //       return SmallRollIDs.includes(smallRoll.id.toString())
          //     })
              setData(result.smallrolls);
      };
      }catch(error){
       console.log('error',error);
      }
    }

    const fetchOrderDispatchAddresses = async (addressId) => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/addresses/${addressId}`, {
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
      console.log("responsejson1",result);
      setDispatchData(prevState=>({
        ...prevState,
        customer_name:result?.customer_name
      }))
    };

    const fetchOrderWithCompleteData = async (dispatch) => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/orders/${dispatch.order_id}`, {
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
      console.log("responsejson1",{...result,...dispatch});
      if(result){
        setDispatchData({...result,...dispatch});
      }else{
        setDispatchData(dispatch);
      }
      fetchOrderDispatchAddresses(dispatch.delivery_address_id)
      fetchSmallRollsData(dispatch);
    };

    const fetchDispatch = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/dispatch/${dispatchId}`, {
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
      console.log("responsejson1",result);
      fetchOrderWithCompleteData(result?.[0]);
    };
    fetchDispatch();
},[]);

  return (
    <>
     {dispatchData ?<ComponentCard1 title="">
          <ComponentCard4>
            <Row  style={{background:'white',padding:'2px'}}>
                    <Col md="5">
                      <div><span className='production-plan-page-collape-heading'>Order No.</span> # {dispatchData?.order_id} ({dispatchData?.customer_name})</div>
                      <div>{formatDate(dispatchData?.expected_delivery_date)}</div>
                    </Col>
                    <Col md="7" style={{padding:'5px 0px'}}>
                      <Button  className="btn mybtncustomer btn-secondary" outline color="danger"><i className="bi bi-printer-fill" style={{fontSize:'20px',marginRight:'1px'}}/>Package List </Button>
                      <Button  className="btn mybtncustomer btn-secondary" outline onClick={()=>InvoiceView(dispatchData?.invoice_id)}  color="success"><i className="bi bi-printer-fill" style={{fontSize:'20px',marginRight:'1px'}}/>Invoice </Button>
                      <Button  className="btn mybtncustomer btn-secondary" outline color="danger">Send On <i className="bi bi-envelope" style={{fontSize:'20px',marginRight:'1px'}}/></Button>
                      <Button  className="btn mybtncustomer btn-secondary" outline color="success">Send On <i className="bi bi-whatsapp" style={{fontSize:'20px',marginRight:'1px'}}/></Button>
                      <button type='button' className="btn mybtncustomer my-btn-color mr-1"> Show History</button>
                    </Col>
            </Row>
            <Row>
              <Col md="6">
                <div style={{padding:'10px'}}><i className="bi-geo-alt my-list-color" style={{fontSize:'19px',marginRight:'5px'}}/><span style={{fontWeight:'500'}}>Dispatched To</span></div>
                <AddressBlock addressId={dispatchData?.delivery_address_id}/>
              </Col>
              <Col md="6">
                <div style={{padding:'10px'}}><i className="bi bi-truck my-list-color" style={{fontSize:'19px',marginRight:'5px'}}/><span style={{fontWeight:'500'}}>Transportation Details</span></div>
                     <ComponentCard4 >
                               <div className="order-view-page-flex-temp">
                                <div><span className='production-plan-page-collape-heading'>Vehicle No</span>.: {dispatchData?.vehicle_no}</div> 
                                <div><span className='production-plan-page-collape-heading'>Driver &apos;s Name</span>: {dispatchData?.driver_name}</div> 
                                <div><span className='production-plan-page-collape-heading'>Driver &apos;s Mobile</span>: {dispatchData?.driver_mobile}</div> 
                              </div>
                     </ComponentCard4>
              </Col>
            </Row>
          </ComponentCard4>
           
             
           
              <ComponentCard4 title="">  
                      <Table responsive size="sm">
                        <thead>
                          <tr>
                            <th>S. No.</th>
                            <th>Quantity</th>
                            <th>Grade</th>
                            <th>Weight</th>
                            <th>BIN</th>
                            <th>GSM(g/m2)</th>
                            <th>Code</th>
                            {/* <th scope="col">Action</th> */}
                            <th>Comment</th>
                          </tr>
                        </thead>
                        <tbody>
                            {
                              data?.map((roll,index)=>{
                            return (
                                      <tr key={roll.id}>
                                          <td>{index}</td>
                                          <td>{roll.quantity}</td>
                                          <td>{roll?.grade_details?.[0]?.name}</td>
                                          <td>{roll.weight}</td>
                                          <td>{roll.bin}</td>
                                          <td>{((roll.weight * 1000) / (roll.quantity * roll.width)).toFixed(2)}</td>
                                          <td><Barcode value={`SMALL${roll.id}`} height={20} /></td>
                                          {/* <td>
                                            <td ><Button ><i className="bi bi-printer-fill my-pen-color" /></Button></td>
                                            <td ><Button ><i className="bi bi-pencil-fill my-eye-color" onClick={()=>handleSmallRollEdit(roll)} /></Button></td>
                                            <td ><Button ><i className="bi bi-trash-fill my-bell-color" onClick={() => handleDeleteClick(roll.id)}/></Button></td>
                                          </td> */}
                                          <td>{roll.comment}</td>
                                        </tr>
                                 )
                              })
                            }
                        </tbody>
                      </Table>
              </ComponentCard4>
           
        
      </ComponentCard1>:''}
      
    </>
  );
};

export default JumbotronComponent;
