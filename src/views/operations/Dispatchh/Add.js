import React ,{ useState ,useEffect} from 'react';

import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Table,
} from 'reactstrap';
// import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import Barcode from 'react-barcode';
import ComponentCard4 from '../../../components/ComponentCard4';
// import Barcode from "../../../assets/images/bg/barcode.png"


const Add = () => {
  const navigate = useNavigate();
  const location= useLocation();
  const [errors,setErrors] = useState({});
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [dataSmallRoll, setDataSmallRoll] = useState([]);
  const [sendDisable, setSendDisable] = useState(false);
  const [dataSmallRollItems, setDataSmallRollItems] = useState([]);
  const {id:orderId} = location.state;

  const [formDatas, setFormDataS] = useState({
    RollCode:'',
    vehicle:'',
    driverName:'',
    driverMobile:'',
    billNo:'',
  });
  
  console.log('location',location.state);

  const handleChange = (e) => {
    setErrorMessageFromApi([]);
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));

    console.log('hi',value);
    
    switch (name){
      case 'name':{
          // const regex = /^[A-Za-z\s/]+$/;
          // console.log('hi');
          //  if (!regex.test(value.trim())) {
          //     setErrors((prev)=>({...prev,"name": "Please use only characters"}));
          // } else {
          //     setErrors((prev)=>({...prev,"name": ""}));
          // }
          setErrors((prev)=>({...prev,"name": ""}));
          break;
        }
      case 'RollCode':{
          
          setErrors((prev)=>({...prev,"RollCode": ""}));
          break;
        }
      default:
            break;
    
        }

  };


  async function scanRoll(smallrollid) {
    try {
      console.log('smallrollid',smallrollid);

        const token = localStorage.getItem('userToken');
        // https://factory.teamasia.in/api/public/smallrolls/scan/${smallrollid}/?order_id=${orderId}
        const response = await fetch(`https://factory.teamasia.in/api/public/smallrolls/scan/${smallrollid}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        console.log("dataapi",data,response.status);
        if (response.status === 200) {
          console.log('hi')
          return {state:'200',data: data?.smallrolls[0]}
        }
        if (response.status !== 200) {
          console.log('bi',response);
          return {state:'404',data: data?.messages?.error}
        }
        // if (data.error) {
        //   setErrorMessageFromApi(Object.values(data.error));
        // }
        return null;
    } catch (error) {
      setErrorMessageFromApi(["Network error"]);
        return null;
    }
}

  async function addSmallRoll(){
    console.log('dataSmallRollItems',dataSmallRollItems);
    const extractedRoll = formDatas.RollCode.split('SMALL')[1];
    console.log('extractedRoll',String(extractedRoll));

    if(dataSmallRollItems.find((roll)=>roll.id === extractedRoll)){
      console.log('hi');
      setErrorMessageFromApi((prev)=>([...prev,"Roll Code already exist"]));
    }
    else if(!dataSmallRoll.find((roll)=>roll.id === String(extractedRoll))){
      console.log('bye');
      const scannedRollData = await scanRoll(extractedRoll);
      console.log('scannedRollData',scannedRollData.state);

      if(scannedRollData.state === '200'){
        const newDataSmallRollItems = dataSmallRollItems.slice(0)
       newDataSmallRollItems.push(scannedRollData.data);
       setDataSmallRollItems(newDataSmallRollItems);
      }
      else{
        setErrorMessageFromApi((prev)=>([...prev,scannedRollData.data]));
      }
    }
    else{
      console.log('bi');
      const newRoll = dataSmallRoll.find((roll)=> roll.id === String(extractedRoll));
      const newDataSmallRollItems = dataSmallRollItems.slice(0)
      newDataSmallRollItems.push(newRoll);
      setDataSmallRollItems(newDataSmallRollItems);
      setDataSmallRoll(dataSmallRoll.filter((roll)=> roll.id !== String(extractedRoll)));
    }
  }

  const removeItem = index => {
    const newItems = dataSmallRollItems.slice();
    newItems.splice(index, 1);
    setDataSmallRollItems(newItems);  
  };

  const closer =()=>{
    setErrorMessageFromApi([]);  
  }

  async function apiCall() {
    try {
      setSendDisable(true);
      const csvString = dataSmallRollItems.map((roll)=> roll.id).join(',')
      console.log('formdata',formDatas,orderId,csvString);
      
        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/dispatch`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
               order_id:orderId,
              vehicle_no:formDatas.vehicle,
              driver_name: formDatas.driverName,
              driver_mobile: formDatas.driverMobile,
              bill_no:formDatas.billNo,
              small_roll_ids: csvString,
            }),
        });
        const data = await response.json();
        console.log("dataapi",data,response.status);
        if (response.status === 201) {
          navigate(-1);
        } else {
          console.error("Authentication failed:", Object.values(data.messages.errors));
          if (data.error) {
            setErrorMessageFromApi(Object.values(data.messages.errors));
          }
        }
        return null;
    } catch (error) {
      setErrorMessageFromApi(["Network error"]);
        return null;
    }
}

const validateForm=()=>{
let formIsValid =true;
const errors1 ={};

if(formDatas.vehicle === '') {
  formIsValid = false;
  // eslint-disable-next-line dot-notation
  errors1["vehicle"] = "Required";
}
if(formDatas.driverName === '') {
  formIsValid = false;
  // eslint-disable-next-line dot-notation
  errors1["driverName"] = "Required";
}
if(formDatas.driverMobile === '') {
  formIsValid = false;
  // eslint-disable-next-line dot-notation
  errors1["driverMobile"] = "Required";
}
if(formDatas.billNo === '') {
  formIsValid = false;
  // eslint-disable-next-line dot-notation
  errors1["billNo"] = "Required";
}
if(dataSmallRollItems.length === 0) {
  formIsValid = false;
  // eslint-disable-next-line dot-notation
  errors1["RollCode"] = "Required";
}

setErrors(errors1);
return formIsValid;

}

const handleSubmit = async (event) => {
  event.preventDefault();
  if(validateForm()) {
    console.log('Form is valid, proceed with API call');
    apiCall();
  } else {
    console.log('Form is invalid, do not submit');
  }
};

const isNumericString = (str) => {
  const num = Number(str);
  return !(num).isNaN && str.trim() !== '' && String(num) === str.trim();
};

const handleScan = async (event) => {
  const errors1 ={};
  event.preventDefault();
  if(formDatas.RollCode === '') {
    errors1.RollCode = "Required";
    setErrors(errors1);
    console.log('Form is invalid, do not submit');
  }
  else  if(!formDatas.RollCode.startsWith("SMALL")) {
    errors1.RollCode = "Small Roll Code entered is not valid.";
    setErrors(errors1);
    console.log('Form is invalid, do not submit');
  }
  else  if(!isNumericString(formDatas.RollCode.split('SMALL')[1])) {
    errors1.RollCode = "Small Roll Code entered is not valid.";
    setErrors(errors1);
    console.log('Form is invalid, do not submit');
  }
   else {
    console.log('Form is valid, proceed with API call');
    addSmallRoll();
  }
};

useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/smallrolls/?order_id=${orderId}&is_dispatched=0`, {
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
    console.log("responsejson1",result.smallrolls);
    
    
    setDataSmallRoll(result.smallrolls); 
  };

  fetchData();

},[]);

  return (
<div>
     <Row>
       <Col md="12">
         <Card>
           <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
           </CardTitle>
           <CardBody className="bg-light">
             <CardTitle tag="h4" className="mb-0">
             </CardTitle>
           </CardBody>
           <CardBody>
             <Form onSubmit={handleSubmit}>
               <Row>
                  <Col md="12">{errorMessageFromApi.length !== 0 && (
                      <div style={{ background:'#ff9c7a',color: 'black', marginBottom: '10px', padding:"5px 10px"}}>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                          Following errors were found:
                          <span onClick={closer} style={{cursor:'pointer'}}>X</span>
                        </div>
                        <ul>
                        {errorMessageFromApi.map((item)=>
                        <li key={item.id}>
                            {item}
                        </li>
                        )}
                        </ul>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row style={{margin:"2px 0px"}}>
                  <Col md="10">
                      Dispatch Details
                  </Col>
                  <Col md="2">
                    <Button type="submit" 
                              className="btn my-btn-color" 
                              disabled={sendDisable}
                      >
                          Send
                      </Button>
                  </Col>
                 </Row>
                 <Row>
                 <Col md="4">
                   <FormGroup>
                     <Label>*Vehicle No</Label>
                     <Input        
                     type="text" 
                      name="vehicle" 
                      id="name"
                      placeholder="Enter" 
                      value={formDatas.vehicle}
                      onChange={handleChange}
                      className={errors.vehicle ? "is-invalid":""}
                     />
                     {errors.vehicle &&  <FormText className="text-danger">{errors.vehicle}</FormText>}
                    
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                     <Label>*Driver Name</Label>
                     <Input        
                     type="text" 
                      name="driverName" 
                      id="name"
                      placeholder="Enter" 
                      value={formDatas.driverName}
                      onChange={handleChange}
                      className={errors.driverName ? "is-invalid":""}
                     />
                     {errors.driverName &&  <FormText className="text-danger">{errors.driverName}</FormText>}
                    
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                     <Label>*Driver Mobile</Label>
                     <Input        
                     type="text" 
                      name="driverMobile" 
                      id="name"
                      placeholder="Enter" 
                      value={formDatas.driverMobile}
                      onChange={handleChange}
                      className={errors.driverMobile ? "is-invalid":""}
                     />
                     {errors.driverMobile &&  <FormText className="text-danger">{errors.driverMobile}</FormText>}
                    
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                     <Label>*Bill No</Label>
                     <Input        
                     type="text" 
                      name="billNo"
                      id="name"
                      placeholder="Enter" 
                      value={formDatas.billNo}
                      onChange={handleChange}
                      className={errors.billNo ? "is-invalid":""}
                     />
                     {errors.billNo &&  <FormText className="text-danger">{errors.billNo}</FormText>}
                    
                   </FormGroup>
                 </Col>
                 
               </Row>
               {dataSmallRollItems.length !== 0 ?<Row>
                      <Table responsive size="sm">
                        <thead>
                          <tr>
                            <th scope="col">S. No.</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Grade</th>
                            <th scope="col">BIN</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Code</th>
                            <th scope="col">Price</th>
                            <th scope="col">Comment</th>
                            <th scope="col"></th>
                          
                          </tr>
                        </thead>
                        <tbody>
                            {
                              dataSmallRollItems.length !== 0?
                              dataSmallRollItems.map((roll,index)=>{
                            return (
                                      <tr key={roll.id}>
                                          <td>{index}</td>
                                          <td>{roll.quantity}</td>
                                          <td>{roll?.grade_details?.[0].name}</td>
                                          <td>{roll.bin}</td>
                                          <td>{roll.weight}</td>
                                          {/* <td><img src={Barcode} alt='barcode'/></td> */}
                                          <td><Barcode value={`SMALL${roll.id}`} height={20} /></td>
                                          <td>missing in api</td>
                                          
                                          <td>{roll.comment}</td>
                                          <td><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem(index)}>X</button></td>
                                        </tr>
                                 )
                              })
                              :''
                            }
                        </tbody>
                      </Table>
              </Row>:''}
             </Form>

             <Form onSubmit={handleScan}>
                <Row>
                <Col md="4">
                  <Input type="text"
                         name="RollCode" 
                         placeholder="enter small roll code"
                         value={formDatas.RollCode}
                         onChange={handleChange}
                         className={errors.RollCode ? "is-invalid":""}
                         />
                         {errors.RollCode  &&  <FormText className="text-danger">{errors.RollCode}</FormText>}
                </Col>
                <Col md="6">
                   <Button className="my-btn-color-yellow" type="submit"> Add </Button>
                </Col>
              </Row>
              </Form>
           </CardBody>
          
          
           
         </Card>

         <ComponentCard4 title="">  
                      <Table responsive size="sm">
                        <thead>
                          <tr>
                            <th scope="col">S. No.</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Grade</th>
                            <th scope="col">Weight</th>
                            <th scope="col">BIN</th>
                            <th scope="col">GSM(g/m2)</th>
                            <th scope="col">Code</th>
                            <th scope="col">Comment</th>
                          
                          </tr>
                        </thead>
                        <tbody>
                            {dataSmallRoll.length !== 0?
                              dataSmallRoll.map((roll,index)=>{
                            return (
                                      <tr key={roll.id}>
                                          <td>{index}</td>
                                          <td>{roll.quantity}</td>
                                          <td>{roll?.grade_details?.[0].name}</td>
                                          <td>{roll.weight}</td>
                                          <td>{roll.bin}</td>
                                          <td>{((roll.weight * 1000) / (roll.quantity * roll.width)).toFixed(2)}</td>
                                          {/* <td><img src={Barcode} alt='barcode'/></td> */}
                                          <td><Barcode value={`SMALL${roll.id}`} height={20} /></td>
                                          
                                          <td>{roll.comment}</td>
                                        </tr>
                                 )
                              }):''
                            }
                        </tbody>
                      </Table>
              </ComponentCard4>
       </Col> 
     </Row>
     
   </div>

   
   
  );
};

export default Add;