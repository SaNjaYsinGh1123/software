import React ,{useState,useEffect} from 'react';
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Input,
  Button,
  FormText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import MyProgressBarModal from './MyProgressBarModal';
import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';

const JumbotronComponent = ({modal,JumboUpdateDataFromPlan,toggle,data2,data6}) => {
  
  const [modalRoll,setModalRoll] = useState(false);
  const [modalPhysical,setModalPhysical] = useState(false);
  const [sendOption,setSendOption] = useState(JumboUpdateDataFromPlan.send_for_additional_treatment === "1");
  const [data7,setData7] = useState([]);
  const [formDatasRoll, setFormDatasRoll] = useState({});
  
  const [formDatas, setFormDataS] = useState({
    items1:[]
  });

// console.log('JumboUpdateDataFromPlan',JumboUpdateDataFromPlan);

  const [formDataP, setFormDataP] = useState({
    id: "x",
    jumbo_roll_id: JumboUpdateDataFromPlan.id,
    
    expected_gsm: "",
    observed_gsm: "",
    actual_gsm: "",
    remark:'',
    skin_peel_off:[{
      Npcheck:false,
      is_np_checked:'0',
      along: "",
      across: "",}],

    coating_adhesion:[{
              Npcheck:false,
              is_np_checked:'0',
              along: "",
              across: ""
            }],

    stiffness:[{
               Npcheck:false,
               is_np_checked:'0',
               along: "",
               across: ""
              }],
  });

  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errorMessageFromFaultApi, setErrorMessageFromFaultApi] = useState([]);
  const [errorMessageFromPhysicalApi, setErrorMessageFromPhysicalApi] = useState([]);
  const [errors,setErrors] = useState({});
  const [errorsP,setErrorsP] = useState({});
  const [faultChanged,setFaultChanged] = useState('1');

  const checkboxclick1 = () => {
    console.log('check',sendOption);
    setSendOption(!sendOption);
   
  };
const handleTypeChange = (e) => {
    const { name, value } = e.target;
    console.log('name and value',name,value);
      setFormDatasRoll(prevState => ({
        ...prevState,
        [name]: value
      }));
   
    
    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
  };

  const updateRollToggle = ()=>{
    setModalRoll(!modalRoll);
    setModalPhysical(false);
    // setModal1(false);
       console.log('toggle',toggle);
  }

  const updatePhysicalToggle = ()=>{
    setModalPhysical(!modalPhysical);
    // setModal1(false);
    console.log('toggle',toggle);
  }

  const closer =()=>{
    setErrorMessageFromApi([]);
  }
  
    async function apiCall() {
      try {
          console.log('formdataRoll',formDatasRoll);
          const token = localStorage.getItem('userToken');
          const response = await fetch(`https://factory.teamasia.in/api/public/jumboroll/${formDatasRoll.id}`, {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
             
              body: JSON.stringify({
                production_plan_id:formDatasRoll.production_plan_id,
                line_id:formDatasRoll.line_id,
                order_id:formDatasRoll.order_id,
                product_id:formDatasRoll.product_id,
                qa_pe_id:formDatasRoll.qa_pe_id,
                quantity:formDatasRoll.quantity,
                start_date:formDatasRoll.start_date,
                end_date:formDatasRoll.end_date,
                note:formDatasRoll.note,
                send_for_additional_treatment: sendOption === false?0:1 
              }),
          });
  
          const dataZ = await response.json();
          console.log("dataapi",dataZ,response);
          if (response.status === 200) {
            updateRollToggle();
          } else {
            console.error("Authentication failed:", Object.values(dataZ.messages.errors));
            if (dataZ.error) {
              setErrorMessageFromApi(Object.values(dataZ.messages.errors));
            }
          }  
          return null;
        } catch (error) {
          console.log('error',error);
           setErrorMessageFromApi(["Network error"]);
          return null;
        }
  }
  
  
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
      apiCall();
  };

  const addItem1 = () => {
    const newItems = formDatas.items1.slice();
    console.log("data",newItems);
    newItems.push({ 
      id:'x',
      jumbo_roll_id : JumboUpdateDataFromPlan.id,
      small_roll_id : "0",
      fault_id : "x",
      fault_start_point : "",
      fault_length : "",
      severity_id : "x",
      is_external : "0",
    })
    setFormDataS(prevState => ({
      ...prevState,
      items1: newItems
    }));
  };

  const handleDeleteClick = async (itemId) => {
    try {
      // Call your API endpoint to delete the item
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/faultlogs/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      console.log('Item deleted successfully');
    } catch (error) {
      //only checks for error that are generated by fetch function , and cors 
      console.error('Failed to delete the item', error);
    }
  };
  
  const removeItem1 = index => {
    const newItems = formDatas.items1.slice();
    if(newItems[index].id !== 'x'){
      handleDeleteClick(newItems[index].id);
    }
    newItems.splice(index, 1);
    setFormDataS(prevState => ({
      ...prevState,
      items1: newItems
    }));
    setFaultChanged(faultChanged + 1);
  };

  const handleInputChange1 = (index, e) => {
    const { name, value } = e.target;
    const newItems = formDatas.items1.slice();
    console.log("data",index,newItems);
    newItems[index][name] = value;
    console.log('newX',newItems);
    setFormDataS(prevState => ({
      ...prevState,
      items1: newItems
    }));
  };

  

  const closerForFault =()=>{
    setErrorMessageFromFaultApi([]);
  }
  
    async function apiCallForFaultCreate(item) {
      try {
          console.log('formdatas',formDatas);
          const token = localStorage.getItem('userToken');
          const response = await fetch(`https://factory.teamasia.in/api/public/faultlogs`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
             
              body: JSON.stringify({
                jumbo_roll_id :item.jumbo_roll_id,
                small_roll_id :item.small_roll_id,
                fault_id:item.fault_id,
                fault_start_point:item.fault_start_point,
                fault_length:item.fault_length,
                severity_id:item.severity_id,
                is_external :item.is_external 
              }),
          });
  
          const dataZ = await response.json();
          console.log("dataapi",dataZ,response);
          if (response.status === 201) {
            setFaultChanged(faultChanged + 1);
            // updateRollToggle();
          } else {
            console.error("Authentication failed:", Object.values(dataZ.messages.errors));
            if (dataZ.error) {
              setErrorMessageFromFaultApi(Object.values(dataZ.messages.errors));
            }
          }  
          return null;
        } catch (error) {
          console.log('error',error);
          setErrorMessageFromFaultApi(["Network error"]);
          return null;
        }
  }

  async function apiCallForFaultUpdate(item) {
    try {
        console.log('formdatas',formDatas);
        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/faultlogs/${item.id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
                jumbo_roll_id :item.jumbo_roll_id,
                small_roll_id :item.small_roll_id,
                fault_id:item.fault_id,
                fault_start_point:item.fault_start_point,
                fault_length:item.fault_length,
                severity_id:item.severity_id,
                is_external :item.is_external
            }),
        });

        const dataZ = await response.json();
        console.log("dataapi",dataZ,response);
        if (response.status === 200) {
          setFaultChanged(faultChanged + 1);
          // updateRollToggle();
        } else {
          console.error("Authentication failed:", Object.values(dataZ.messages.errors));
          if (dataZ.error) {
            setErrorMessageFromFaultApi(Object.values(dataZ.messages.errors));
          }
        }  
        return null;
      } catch (error) {
        console.log('error',error);
        setErrorMessageFromFaultApi(["Network error"]);
        return null;
      }
}
  
  const validateForm=()=>{
    let formIsValid =true;
    const errors1 ={};
    
      formDatas.items1.forEach((element) => {
      console.log('element',element);
      if(element.fault_id === 'x'){
               formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["fault_id"] ="Required"
            }
      
      if(element.fault_start_point === ''){
              formIsValid = false;
       // eslint-disable-next-line dot-notation
             errors1["fault_start_point"] ="Required"
           }
    
            if(element.fault_length === ''){
               formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["fault_length"] ="Required"
            }
           
            if(element.severity_id === 'x'){
               formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["severity_id"] ="Required"
            }
        });
    setErrors(errors1);
    return formIsValid;
    }
  
  
  const handleSubmitforFault = async (item) => {
    if(validateForm()) {
      console.log('Form is valid, proceed with API call');
      if(item.id !== 'x')
      {
        apiCallForFaultUpdate(item);
      }
      else{
        apiCallForFaultCreate(item);
      }
    } else {
      console.log('Form is invalid, do not submit');
    }
  };

// physical start

const addItemSkin = () => {
  
  // console.log("datalo",formDataP, formDataP.Skin);
  
  const newItems = formDataP.skin_peel_off.slice();
  // console.log("data",newItems.length);
  newItems.push({ 
    Npcheck:false,
    is_np_checked:'0',
    along : "",
    across : "",
  })
  setFormDataP(prevState => ({
    ...prevState,
    skin_peel_off: newItems
  }));
};
const addItemCoating = () => {
  const newItems = formDataP.coating_adhesion.slice();
  // console.log("data",newItems);
  newItems.push({ 
    Npcheck:false,
    is_np_checked:'0',
    along : "",
    across : "",
  })
  setFormDataP(prevState => ({
    ...prevState,
    coating_adhesion: newItems
  }));
};
const addItemStiffness = () => {
  const newItems = formDataP.stiffness.slice();
  // console.log("data",newItems);
  newItems.push({ 
    Npcheck:false,
    is_np_checked:'0',
    along : "",
    across : "",
  })
  setFormDataP(prevState => ({
    ...prevState,
    stiffness: newItems
  }));
};

const removeItemSkin = index => {
  const newItems = formDataP.skin_peel_off.slice();
  newItems.splice(index, 1);
  setFormDataP(prevState => ({
    ...prevState,
    skin_peel_off: newItems
  }));
};
const removeItemCoating = index => {
  const newItems = formDataP.coating_adhesion.slice();
  newItems.splice(index, 1);
  setFormDataP(prevState => ({
    ...prevState,
    coating_adhesion: newItems
  }));
};
const removeItemStiffness = index => {
  const newItems = formDataP.stiffness.slice();
  newItems.splice(index, 1);
  setFormDataP(prevState => ({
    ...prevState,
    stiffness: newItems
  }));
};

const handleInputSkinChange = (index, e) => {
  const { name, value } = e.target;
  // console.log('name,value',name,value);
  if(name === 'Npcheck')
  {
    const newItems = formDataP.skin_peel_off.slice();
    // console.log("data",index,newItems);
    if(newItems[index].Npcheck === false){
      console.log('0');    
      newItems[index].Npcheck = true;
      newItems[index].along = '0';
      newItems[index].across = '0';
      console.log('newX',newItems);
      setFormDataP(prevState => ({
        ...prevState,
        skin_peel_off: newItems
      }));
    }
    else{
      console.log('01');
      newItems[index].Npcheck = false;
      newItems[index].along = '';
      newItems[index].across = '';
      console.log('newX',newItems);
      setFormDataP(prevState => ({
        ...prevState,
        skin_peel_off: newItems
      }));
    }
  }else{
    console.log('1');
      const newItems = formDataP.skin_peel_off.slice();
      console.log("data",index,newItems);
      newItems[index][name] = value;
      console.log('newX',newItems);
      setFormDataP(prevState => ({
        ...prevState,
        skin_peel_off: newItems
      }));
  }
};
const handleInputCoatingChange = (index, e) => {
  const { name, value } = e.target;
  if(name === 'Npcheck')
    {
      const newItems = formDataP.coating_adhesion.slice();
        console.log("data",index,newItems);
      if(newItems[index].Npcheck === false){
        console.log('0');    
        newItems[index].Npcheck = true;
        newItems[index].along = '0';
        newItems[index].across = '0';
        console.log('newX',newItems);
        setFormDataP(prevState => ({
          ...prevState,
          coating_adhesion: newItems
        }));
      }
      else{
        console.log('01');
        newItems[index].Npcheck = false;
        newItems[index].along = '';
        newItems[index].across = '';
        console.log('newX',newItems);
        setFormDataP(prevState => ({
          ...prevState,
          coating_adhesion: newItems
        }));
      }
    }else{
        const newItems = formDataP.coating_adhesion.slice();
        console.log("data",index,newItems);
        newItems[index][name] = value;
        console.log('newX',newItems);
        setFormDataP(prevState => ({
          ...prevState,
          coating_adhesion: newItems
        }));
    }
};
const handleInputStiffnessChange = (index, e) => {
  const { name, value } = e.target;
  if(name === 'Npcheck')
    {
      const newItems = formDataP.stiffness.slice();
      console.log("data",index,newItems);
      if(newItems[index].Npcheck === false){
        console.log('0');    
        newItems[index].Npcheck = true;
        newItems[index].along = '0';
        newItems[index].across = '0';
        console.log('newX',newItems);
        setFormDataP(prevState => ({
          ...prevState,
          stiffness: newItems
        }));
      } else{
        console.log('01');
        newItems[index].Npcheck = false;
        newItems[index].along = '';
        newItems[index].across = '';
        console.log('newX',newItems);
        setFormDataP(prevState => ({
          ...prevState,
          stiffness: newItems
        }));
      }

    }else{
        const newItems = formDataP.stiffness.slice();
        console.log("data",index,newItems);
        newItems[index][name] = value;
        console.log('newX',newItems);
        setFormDataP(prevState => ({
          ...prevState,
          stiffness: newItems
        }));
    }
};
const handleInputPhysicalChange = (e) => {
  const { name, value } = e.target;
  console.log('name, value',name,value);
  setFormDataP(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const closerForPhysical =()=>{
  setErrorMessageFromPhysicalApi([]);
}

async function apiCallForPhysicalCreate() {
  try {
      console.log('formdatas',formDataP);
      const token = localStorage.getItem('userToken');
      let url = `https://factory.teamasia.in/api/public/physicalproperties`;
      let MethodP = 'POST';
      let StatusP = 201;
      
      if(formDataP.id !== 'x'){
        console.log('yes',formDataP.id);
         url = `https://factory.teamasia.in/api/public/physicalproperties/1`;
         MethodP="PUT";
         StatusP=200;
      }
      const response = await fetch(url, {
          method: MethodP,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
         
          body: JSON.stringify([{
            id:formDataP.id,
            jumbo_roll_id: JumboUpdateDataFromPlan.id,
            expected_gsm: "23",
            actual_gsm: "45",
            observed_gsm: formDataP.observed_gsm,
            remark:formDataP.remark,
            skin_peel_off:formDataP.skin_peel_off,
            coating_adhesion:formDataP.coating_adhesion,
            stiffness:formDataP.stiffness,
          }])
      });

      const dataZ = await response.json();
      console.log("dataapi",dataZ,response);
      if (response.status === StatusP) {
        updatePhysicalToggle();
      } else {
        console.error("Authentication failed:", Object.values(dataZ.messages.errors));
        if (dataZ.error) {
          setErrorMessageFromPhysicalApi(Object.values(dataZ.messages.errors));
        }
      }  
      return null;
    } catch (error) {
      console.log('error',error);
      setErrorMessageFromPhysicalApi(["Network error"]);
      return null;
    }
}

const validateFormPhysical=()=>{
  let formIsValid =true;
  const errors1 ={};
  
    formDataP.skin_peel_off.forEach((element) => {
        console.log('element',element);
        if(element.along === ''){
                formIsValid = false;
          // eslint-disable-next-line dot-notation
                errors1["alongs"] ="Required"
              }
        
        if(element.across === ''){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["acrosss"] ="Required"
            }
      });
    formDataP.coating_adhesion.forEach((element) => {
        console.log('element',element);
        if(element.along === ''){
                formIsValid = false;
          // eslint-disable-next-line dot-notation
                errors1["alongc"] ="Required"
              }
        
        if(element.across === ''){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["acrossc"] ="Required"
            }
      });
    formDataP.stiffness.forEach((element) => {
        console.log('element',element);
        if(element.along === ''){
                formIsValid = false;
          // eslint-disable-next-line dot-notation
                errors1["alongst"] ="Required"
              }
        
        if(element.across === ''){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["acrossst"] ="Required"
            }
      });
  setErrorsP(errors1);
  return formIsValid;
  }


const handleSubmitforPhysical = async (e) => {
  e.preventDefault();
  if(validateFormPhysical()) {
    console.log('Form is valid, proceed with API call');
    apiCallForPhysicalCreate();
  } else {
    console.log('Form is invalid, do not submit');
  }
};
// physical end
  
  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/faultlogs/?jumbo_roll_id=${JumboUpdateDataFromPlan.id}&small_roll_id=0`, {
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

      setFormDataS(prevState => ({
        ...prevState,
        items1: result.faultlogs
      }));
      // console.log('result fault................',result.faultlogs);
    };
    fetchData();
  }, [faultChanged]);

  useEffect(() => {
    const fetchSeverityData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/severities`, {
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
      const resultX = result.severities.slice();
      resultX.push({id:'x',name:'Choose'});
      setData7(resultX);
      // console.log('result',result.severities);
    };
    const fetchPhysicalData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/physicalproperties/?jumbo_roll_id=${JumboUpdateDataFromPlan.id}`, {
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
      if(result.physicalproperties){
        if(result.physicalproperties.length !== 0){
          setFormDataP(result.physicalproperties[0]);
        }
      }
      
      // console.log('resultaaaaaaaaaaaaaaaaaaaa',result.physicalproperties);
    };
    fetchPhysicalData();
    fetchSeverityData();
    // console.log('JumboUpdateDataFromPlan.............',JumboUpdateDataFromPlan);
    setFormDatasRoll(JumboUpdateDataFromPlan);
  }, []);

  return (
    <>
     <ComponentCard5 >
            <Modal isOpen={modal} toggle={toggle} style={{'--bs-modal-width': '1000px'}}>
              <ModalHeader toggle={toggle}>
                           <span>JUMBO {JumboUpdateDataFromPlan.id}</span> 
                           <Button onClick={()=>{updateRollToggle()}}><i className="bi bi-pencil-fill my-pen-color" />Update Jumbo Roll</Button>
              </ModalHeader>
              <ModalBody>
                    <div style={{ padding: '50px' }}>
                        {/* <MyProgressBar segments={segments} /> */}
                        <div style={{ background:'#31E1F7' }}>
                        <MyProgressBarModal BarRefreshkey={faultChanged } jumboId={JumboUpdateDataFromPlan.id} containerWidth={300} progressBarId="progress-0"/>
                        </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>0m</span>
                              <span>{300}m</span>
                          </div>
                    </div>

                 <Form>
                    <Row>
                        <Col md="9">{errorMessageFromFaultApi.length !== 0 && (
                          <div style={{ background:'#ff9c7a',color: 'black', marginBottom: '10px', padding:"5px 10px"}}>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                              Following errors were found:
                              <span onClick={closerForFault} style={{cursor:'pointer'}}>X</span>
                            </div>
                            <ul>
                              {errorMessageFromFaultApi.map((item)=>
                              <li>
                                  {item}
                              </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </Col>
                      <Col md="12">
                           <div style={{display:'flex',background:'#e3e3e3',justifyContent:'space-between',ackground:'#e3e3e3',padding:'10px'}}><span style={{fontWeight:'900',fontSize:'18px'}}> Physical Properties</span><Button className='my-btn-color' onClick={()=>{updatePhysicalToggle()}}><i className="bi bi-pencil-fill" /></Button></div>
                            <Table className="report-page-lab-table" size="sm" responsive>
                              <thead>
                                <tr>
                                  <th colSpan={3}><div style={{textAlign:'center'}}>GSM (g/m2)</div></th>
                                  <th colSpan={2}><div style={{textAlign:'center'}}>PEEL OFF (N/mm)	</div></th>
                                  <th colSpan={2}><div style={{textAlign:'center'}}>COATING ADHES. (N/mm)	</div></th>
                                  <th colSpan={2}><div style={{textAlign:'center'}}>STIFFNESS (mm)</div></th>
                                </tr>
                              </thead>
                              <tbody>
                                    <tr>
                                      <td>Expected</td>
                                      <td>Observed</td>
                                      <td>Actual</td>
                                      <td>Along	</td>
                                      <td>Across</td>
                                      <td>Along	</td>
                                      <td>Across</td>
                                      <td>Along	</td>
                                      <td>Across</td>
                                    </tr>
                                    
                                      <tr> 
                                        <td>{formDataP.actual_gsm}</td>
                                        <td>{formDataP.expected_gsm}</td>
                                        <td>{formDataP.observed_gsm}</td>
                                        <td>{formDataP.skin_peel_off[0].along}</td>
                                        <td>{formDataP.skin_peel_off[0].across}</td>
                                        <td>{formDataP.coating_adhesion[0].along}</td>
                                        <td>{formDataP.coating_adhesion[0].across}</td>
                                        <td>{formDataP.stiffness[0].along}</td>
                                        <td>{formDataP.stiffness[0].across}</td>
                                      </tr>
                                      <tr> 
                                        <td>{formDataP.actual_gsm}</td>
                                        <td>{formDataP.expected_gsm}</td>
                                        <td>{formDataP.observed_gsm}</td>
                                        <td>{formDataP.skin_peel_off[1]? formDataP.skin_peel_off[1].along:'-'}</td>
                                        <td>{formDataP.skin_peel_off[1]? formDataP.skin_peel_off[1].across:'-'}</td>
                                        <td>{formDataP.coating_adhesion[1]?formDataP.coating_adhesion[1].along:'-'}</td>
                                        <td>{formDataP.coating_adhesion[1]?formDataP.coating_adhesion[1].across:'-'}</td>
                                        <td>{formDataP.stiffness[1] ?formDataP.stiffness[1].along:'-'}</td>
                                        <td>{formDataP.stiffness[1] ?formDataP.stiffness[1].across:'-'}</td>
                                      </tr>
                                      <tr> 
                                        <td>{formDataP.actual_gsm}</td>
                                        <td>{formDataP.expected_gsm}</td>
                                        <td>{formDataP.observed_gsm}</td>
                                        <td>{formDataP.skin_peel_off[2] ?formDataP.skin_peel_off[2].along:'-'}</td>
                                        <td>{formDataP.skin_peel_off[2] ?formDataP.skin_peel_off[2].across:'-'}</td>
                                        <td>{formDataP.coating_adhesion[2] ? formDataP.coating_adhesion[2].along:'-'}</td>
                                        <td>{formDataP.coating_adhesion[2] ? formDataP.coating_adhesion[2].across:'-'}</td>
                                        <td>{formDataP.stiffness[2] ? formDataP.stiffness[2].along:'-'}</td>
                                        <td>{formDataP.stiffness[2] ? formDataP.stiffness[2].across:'-'}</td>
                                      </tr>
                              </tbody>
                            </Table>
                      </Col>
                      <Col>
                         <div style={{background:'#e3e3e3',padding:'10px',marginTop:'10px'}}><span style={{fontWeight:'900'}}>Fault Log(s)</span></div>
                          <FormGroup>
                            <Table className="qa-packaging-roll-modal-items-padding" size="sm">
                              <thead>
                                <tr>
                                <th><div> #	</div></th>
                                <th><div>Fault</div></th>
                                <th><div>Fault Start Point (m)</div></th>
                                <th><div>Fault Length (m)</div></th>
                                <th><div>Severity</div></th>
                                <th><Button type="button" className='btn-success' onClick={addItem1}>+</Button></th>
                                </tr>
                              </thead>
                              <tbody>
                                {formDatas.items1.map((item, index) => (
                                    <tr key={item}>
                                      <td>{item.id === 'x' ? '#':item.id}</td>
                                      <td>
                                          <Input name="fault_id"
                                                value={item.fault_id} 
                                                type="select" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                className={item.fault_id === 'x' && errors.fault_id? "is-invalid":""}
                                                >
                                                   {data6.map((fault)=>{
                                                        return <option key={fault.id} value={fault.id}>{fault.name}</option>
                                                      })}
                                                  </Input>
                                                  {item.fault_id === 'x' && errors.fault_id &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>

                                        <td>
                                          <Input type="number" 
                                              name="fault_start_point" 
                                              id="name"
                                              value={item.fault_start_point}
                                              onChange={e => handleInputChange1(index, e)} 
                                              className={item.fault_start_point === '' && errors.fault_start_point ? "is-invalid":""}

                                              />
                                            {item.fault_start_point === '' && errors.fault_start_point &&  <FormText className="text-danger">Required</FormText>}
                                        </td>
                                        <td>
                                          <Input type="number" 
                                              name="fault_length" 
                                              id="name"
                                              value={item.fault_length}
                                              onChange={e => handleInputChange1(index, e)} 
                                              className={item.fault_length === '' && errors.fault_length ? "is-invalid":""}

                                                />
                                              {item.fault_length === '' && errors.fault_length &&  <FormText className="text-danger">Required</FormText>}
                                        </td>
                                        <td>
                                          <Input name="severity_id"
                                                value={item.severity_id} 
                                                type="select" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                className={item.severity_id === 'x' && errors.severity_id ? "is-invalid":""}
                                                >
                                                   {data7.map((severity)=>{
                                                        return <option key={severity.id} value={severity.id}>{severity.name}</option>
                                                      })}
                                                  </Input>
                                                  {item.severity_id === 'x' && errors.severity_id &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Button style={{ marginTop:"5px"}}  onClick={() => handleSubmitforFault(item)} className="btn-sm mybtncustomer btn-secondary" outline color="info" >✓</Button>
                                          <Button style={{ marginTop:"5px"}} onClick={() => removeItem1(index)} className="btn-sm mybtncustomer btn-secondary" outline color="danger" >X</Button></td>
                                    </tr>
                                ))}
                              </tbody>
                            </Table>
                          </FormGroup>
                        </Col>
                       <Row>
                       </Row>
                   </Row>
                 </Form>
              </ModalBody>
             
            </Modal>


            {modalPhysical ? <Modal isOpen={modalPhysical} toggle={updatePhysicalToggle} style={{'--bs-modal-width': '1000px'}}>
              <ModalHeader toggle={updatePhysicalToggle}>
                           <span>JUMBO {JumboUpdateDataFromPlan.id}</span> 
                           <Button onClick={()=>{updateRollToggle()}}><i className="bi bi-pencil-fill my-pen-color" />Update Jumbo Roll</Button>
              </ModalHeader>
              <ModalBody>
                 <Form onSubmit={handleSubmitforPhysical}>
                    <Row>
                        <Col md="9">{errorMessageFromPhysicalApi.length !== 0 && (
                          <div style={{ background:'#ff9c7a',color: 'black', marginBottom: '10px', padding:"5px 10px"}}>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                              Following errors were found:
                              <span onClick={closerForPhysical} style={{cursor:'pointer'}}>X</span>
                            </div>
                            <ul>
                              {errorMessageFromPhysicalApi.map((item)=>
                              <li>
                                  {item}
                              </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </Col>
                     
                    
                          <Col md="12">
                            <div style={{background:'#e3e3e3',padding:'10px',marginTop:'10px'}}><span style={{fontWeight:'900'}}>Physical Properties</span></div>
                            <FormGroup>
                              <Table className="qa-packaging-roll-modal-items-padding" size="sm">
                                <thead>
                                  <tr><div>Skin Peel-off</div></tr>
                                  <tr>
                                  <th><div> #	</div></th>
                                  <th><div>NP	</div></th>
                                  <th><div>Along (N/mm)	</div></th>
                                  <th><div>Across (N/mm)</div></th>
                                  <th><Button type="button" className='btn-success' onClick={addItemSkin}>+</Button></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formDataP.skin_peel_off.map((item, index) => (
                                      <tr key={item}>
                                        <td>#</td>
                                        <td>
                                            <Col md="12" className='' style={{marginTop:"20px"}}>
                                              <FormGroup>
                                                <Input type="checkbox" 
                                                  name="Npcheck"
                                                  checked={item.Npcheck}
                                                  onChange={e => handleInputSkinChange(index, e)}
                                                  />                                              
                                                <FormText className="muted"></FormText>
                                              </FormGroup>
                                            </Col>
                                          </td>

                                          <td>
                                            <Input type="number" 
                                                name="along" 
                                                id="name"
                                                value={item.along}
                                                onChange={e => handleInputSkinChange(index, e)} 
                                                className={item.along === '' && errorsP.alongs ? "is-invalid":""}

                                                />
                                              {item.along === '' && errorsP.alongs &&  <FormText className="text-danger">Required</FormText>}
                                          </td>
                                          <td>
                                            <Input type="number" 
                                                name="across" 
                                                id="name"
                                                value={item.across}
                                                onChange={e => handleInputSkinChange(index, e)} 
                                                className={item.across === '' && errorsP.acrosss ? "is-invalid":""}

                                                  />
                                                {item.across === '' && errorsP.acrosss &&  <FormText className="text-danger">Required</FormText>}
                                          </td>
                                          
                                          <td>
                                            <Button style={{ marginTop:"5px"}} onClick={() => removeItemSkin(index)} className="btn-sm mybtncustomer btn-secondary" outline color="danger" >X</Button></td>
                                      </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </FormGroup>
                          </Col>

                        <Col md="12">
                            <FormGroup>
                              <Table className="qa-packaging-roll-modal-items-padding" size="sm">
                                <thead>
                                  <tr><div>Coating Adhesion</div></tr>
                                  <tr>
                                  <th><div> #	</div></th>
                                  <th><div>NP	</div></th>
                                  <th><div>Along (N/mm)	</div></th>
                                  <th><div>Across (N/mm)</div></th>
                                  <th><Button type="button" className='btn-success' onClick={addItemCoating}>+</Button></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formDataP.coating_adhesion.map((item, index) => (
                                      <tr key={item}>
                                        <td>#</td>
                                        <td>
                                            <Col md="12" className='' style={{marginTop:"20px"}}>
                                              <FormGroup>
                                                <Input type="checkbox" 
                                                  name="Npcheck"
                                                  checked={item.Npcheck}
                                                  onChange={e => handleInputCoatingChange(index, e)}
                                                  />                                              
                                                <FormText className="muted"></FormText>
                                              </FormGroup>
                                            </Col>
                                          </td>

                                          <td>
                                            <Input type="number" 
                                                name="along" 
                                                id="name"
                                                value={item.along}
                                                onChange={e => handleInputCoatingChange(index, e)} 
                                                className={item.along === '' && errorsP.alongc ? "is-invalid":""}

                                                />
                                              {item.along === '' && errorsP.alongc &&  <FormText className="text-danger">Required</FormText>}
                                          </td>
                                          <td>
                                            <Input type="number" 
                                                name="across" 
                                                id="name"
                                                value={item.across}
                                                onChange={e => handleInputCoatingChange(index, e)} 
                                                className={item.across === '' && errorsP.acrossc ? "is-invalid":""}

                                                  />
                                                {item.across === '' && errorsP.acrossc &&  <FormText className="text-danger">Required</FormText>}
                                          </td>
                                          
                                          <td>
                                            <Button style={{ marginTop:"5px"}} onClick={() => removeItemCoating(index)} className="btn-sm mybtncustomer btn-secondary" outline color="danger" >X</Button></td>
                                      </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </FormGroup>
                          </Col>
                        <Col md="12">
                            <FormGroup>
                              <Table className="qa-packaging-roll-modal-items-padding" size="sm">
                                <thead>
                                  <tr><div>Stiffness</div></tr>
                                  <tr>
                                  <th><div> #	</div></th>
                                  <th><div>NP	</div></th>
                                  <th><div>Along (N/mm)	</div></th>
                                  <th><div>Across (N/mm)</div></th>
                                  <th><Button type="button" className='btn-success' onClick={addItemStiffness}>+</Button></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formDataP.stiffness.map((item, index) => (
                                      <tr key={item}>
                                        <td>#</td>
                                        <td>
                                            <Col md="12" className='' style={{marginTop:"20px"}}>
                                              <FormGroup>
                                                <Input type="checkbox" 
                                                  name="Npcheck"
                                                  checked={item.Npcheck}
                                                  onChange={e => handleInputStiffnessChange(index, e)}
                                                  />                                              
                                                <FormText className="muted"></FormText>
                                              </FormGroup>
                                            </Col>
                                          </td>

                                          <td>
                                            <Input type="number" 
                                                name="along" 
                                                id="name"
                                                value={item.along}
                                                onChange={e => handleInputStiffnessChange(index, e)} 
                                                className={item.along === '' && errorsP.alongst ? "is-invalid":""}

                                                />
                                              {item.along === '' && errorsP.alongst &&  <FormText className="text-danger">Required</FormText>}
                                          </td>
                                          <td>
                                            <Input type="number" 
                                                name="across" 
                                                id="name"
                                                value={item.across}
                                                onChange={e => handleInputStiffnessChange(index, e)}
                                                className={item.across === '' && errorsP.acrossst ? "is-invalid":""}

                                                  />
                                                {item.across === '' && errorsP.acrossst &&  <FormText className="text-danger">Required</FormText>}
                                          </td>
                                          
                                          <td>
                                            <Button style={{ marginTop:"5px"}} onClick={() => removeItemStiffness(index)} className="btn-sm mybtncustomer btn-secondary" outline color="danger" >X</Button></td>
                                      </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </FormGroup>
                          </Col>

                          <Col md="12">
                          <Label style={{marginTop:'20px'}}>Observed GSM</Label>
                            <Input type="text" 
                                name="observed_gsm" 
                                id="name"
                                value={formDataP.observed_gsm}
                                onChange={e => handleInputPhysicalChange(e)} 
                                className={formDataP.observed_gsm === '' && errorsP.observed_gsm ? "is-invalid":""}

                                  />
                                {formDataP.observed_gsm === '' && errorsP.observed_gsm &&  <FormText className="text-danger">Required</FormText>}
                          </Col>
                          <Col md="12">
                          <Label style={{marginTop:'20px'}}>Remark</Label>
                            <Input type="text" 
                                name="remark" 
                                id="name"
                                value={formDataP.remark}
                                onChange={e => handleInputPhysicalChange(e)} 
                                className={formDataP.remark === '' && errorsP.remark ? "is-invalid":""}

                                  />
                                {formDataP.remark === '' && errorsP.remark &&  <FormText className="text-danger">Required</FormText>}
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}>
                                  Save
                              </Button>
                            </FormGroup>
                          </Col>
                   </Row>
                 </Form>
              </ModalBody>
             
            </Modal>:""}

            <Modal isOpen={modalRoll} toggle={updateRollToggle} style={{'--bs-modal-width': '800px'}}>
              <ModalHeader toggle={updateRollToggle}></ModalHeader>
              <ModalBody>
                 <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md="9">{errorMessageFromApi.length !== 0 && (
                          <div style={{ background:'#ff9c7a',color: 'black', marginBottom: '10px', padding:"5px 10px"}}>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                              Following errors were found:
                              <span onClick={closer} style={{cursor:'pointer'}}>X</span>
                            </div>
                            <ul>
                              {errorMessageFromApi.map((item)=>
                              <li>
                                  {item}
                              </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </Col>
                       <Row>
                       <Col md="12" className=''>
                            <FormGroup>
                              <Label>*Quantity</Label>
                              <Input type="text" 
                                name="quantity" 
                                value={formDatasRoll.quantity}
                                onChange={handleTypeChange}/>

                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                       <Col md="6" className=''>
                            <FormGroup>
                              <Label>*Start time</Label>
                              <Input type="datetime-local" 
                                name="start_date" 
                                value={formDatasRoll.start_date}
                                onChange={handleTypeChange}/>

                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                       <Col md="6" className=''>
                            <FormGroup>
                              <Label>*End time</Label>
                              <Input type="datetime-local" 
                                name="end_date" 
                                value={formDatasRoll.end_date}
                                onChange={handleTypeChange}/>

                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>

                       <Col md="6" className=''>
                            <FormGroup>
                              <Label>*Note</Label>
                              <Input type="textarea" 
                                name="note" 
                                value={formDatasRoll.note}
                                onChange={handleTypeChange}/>
                              
                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>

                       <Col md="12" className='' style={{marginTop:"20px"}}>
                            <FormGroup>
                              <Input type="checkbox" 
                                name="sendOption"
                                checked={sendOption}
                                onChange={checkboxclick1}
                                />
                              <Label>Send for Additional Treatment</Label>
                              
                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                     
                          <Col md="12" className=''>
                            <FormGroup>
                              <Label>*Name of the Production Engineer</Label>
                              <Input type="select" 
                                name="qa_id" 
                                value={formDatasRoll.qa_pe_id}
                                onChange={handleTypeChange}>
                                  {data2.map((item)=>{
                                    
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                  })}
                              </Input>

                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                       </Row>
                       <Col md="4">
                          <FormGroup>
                            <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}>
                               Updates
                            </Button>
                            <Button onClick={()=>{updateRollToggle()}} className="btn my-btn-color" style={{marginTop:"28px"}}>
                                Cancel
                            </Button>
                          </FormGroup>
                       </Col>
                   </Row>
                 </Form>
              </ModalBody>
             
            </Modal>
          </ComponentCard5>
    </>
  );
};

export default JumbotronComponent;
JumbotronComponent.propTypes = {
  modal: PropTypes.string.isRequired,
  // setModal1: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  data2: PropTypes.array.isRequired,
  data6: PropTypes.array.isRequired,
  JumboUpdateDataFromPlan: PropTypes.object.isRequired,
};