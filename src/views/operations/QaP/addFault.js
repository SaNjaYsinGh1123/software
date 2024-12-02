import React ,{useState,useEffect} from 'react';
import {
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
  FormText
} from 'reactstrap';

import PropTypes from 'prop-types';
import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';

const JumbotronComponent = ({modal,rollItem,toggle,faultData,severityData}) => {
  const [data,setData] = useState([]);
  const [errors,setErrors] = useState({});
  const [errorMessageFromFaultApi, setErrorMessageFromFaultApi] = useState([]);

  const [formData, setFormData] = useState({
    jumbo_roll_id : rollItem.id,
    small_roll_id : 'choose',
    fault_id : "x",
    fault_start_point : "",
    fault_length : "",
    severity_id : "x",
    is_external : "0",
  });

  const closerForFault =()=>{
    setErrorMessageFromFaultApi([]);
  }

  async function apiCallForFaultCreate() {
    try {
        console.log('formdatas',formData.small_roll_id.split('SMALL')[1]);
        
        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/faultlogs`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              jumbo_roll_id :rollItem.id,
              small_roll_id :formData.small_roll_id.split('SMALL')[1],
              fault_id:formData.fault_id,
              fault_start_point:formData.fault_start_point,
              fault_length:formData.fault_length,
              severity_id:formData.severity_id,
              is_external :formData.is_external 
            }),
        });

        const dataZ = await response.json();
        console.log("dataapi",dataZ,response);
        if (response.status === 201) {
          // setFaultChanged(faultChanged + 1);
          // updateRollToggle();
          // toggle();
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
  
    
    if(formData.small_roll_id === 'choose'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["small_roll_id"] ="Required"
          }
    if(formData.fault_id === 'x'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["fault_id"] ="Required"
          }
    
    if(formData.fault_start_point === ''){
            formIsValid = false;
     // eslint-disable-next-line dot-notation
           errors1["fault_start_point"] ="Required"
         }
  
          if(formData.fault_length === ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["fault_length"] ="Required"
          }
         
          if(formData.severity_id === 'x'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["severity_id"] ="Required"
          }
    
  setErrors(errors1);
  return formIsValid;
  }


const handleSubmitforFault = async (e) => {
  e.preventDefault();
  if(validateForm()) {
      apiCallForFaultCreate();
  } else {
    console.log('Form is invalid, do not submit');
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('hi')
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/smallrolls?product_id=${rollItem.product_id}`, {
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
      console.log("responsejson in s..",result);
      const resultX = result.smallrolls.slice();
      resultX.push({id:'choose'});
      setData(resultX);
    };
    fetchData();  
  },[]);
  return (
    <>
     <ComponentCard5 >
          
            <Modal isOpen={modal} toggle={toggle} style={{'--bs-modal-width': '400px'}}>
              <ModalHeader toggle={toggle}>Create Fault</ModalHeader>
              <ModalBody>
                 <Form onSubmit={handleSubmitforFault}>
                   <Row>
                         <Col md="12">{errorMessageFromFaultApi.length !== 0 && (
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
                          <FormGroup>
                            <Label>Small Roll</Label>
                            <Input name="small_roll_id"
                              value={formData.small_roll_id} 
                              type="select" 
                              onChange={e => handleChange(e)}  
                              className={formData.small_roll_id === 'choose' && errors.small_roll_id ? "is-invalid":""}
                              >
                                  {
                                data.map((item)=>
                                  <option key={item.id}>{item.id === 'choose' ? 'choose':`SMALL${item.id}`}</option>
                                )
                              }
                                </Input>
                                {formData.small_roll_id === 'choose' && errors.small_roll_id &&  <FormText className="text-danger">Required</FormText>}
                           
                          </FormGroup>
                        </Col>
                   
                     <Col md="12">
                       <FormGroup>
                         <Label>Fault</Label>
                         <Input name="fault_id"
                              value={formData.fault_id} 
                              type="select" 
                              onChange={e => handleChange(e)}  
                              className={formData.fault_id === 'x' && errors.fault_id? "is-invalid":""}
                              >
                                  {faultData.map((fault)=>{
                                      return <option key={fault.id} value={fault.id}>{fault.name}</option>
                                    })}
                                </Input>
                                {formData.fault_id === 'x' && errors.fault_id &&  <FormText className="text-danger">Required</FormText>}
                       </FormGroup>
                     </Col>
                   </Row>
                   <Row>
                     <Col md="12">
                       <FormGroup>
                         <Label>Fault Start Point(m)</Label>
                        <Input type="number" 
                            name="fault_start_point" 
                            id="name"
                            value={formData.fault_start_point}
                            onChange={e => handleChange(e)} 
                            className={formData.fault_start_point === '' && errors.fault_start_point ? "is-invalid":""}

                            />
                          {formData.fault_start_point === '' && errors.fault_start_point &&  <FormText className="text-danger">Required</FormText>}
                       </FormGroup>
                     </Col>
                   </Row>
                   <Row>
                     <Col md="12">
                       <FormGroup>
                         <Label>Fault Length(m)</Label>
                         <Input type="number" 
                              name="fault_length" 
                              id="name"
                              value={formData.fault_length}
                              onChange={e => handleChange(e)} 
                              className={formData.fault_length === '' && errors.fault_length ? "is-invalid":""}

                                />
                              {formData.fault_length === '' && errors.fault_length &&  <FormText className="text-danger">Required</FormText>}
                       </FormGroup>
                     </Col>
                   </Row>
                   <Row>
                     <Col md="12">
                       <FormGroup>
                         <Label>Severity</Label>
                         <Input name="severity_id"
                            value={formData.severity_id} 
                            type="select" 
                            onChange={e => handleChange(e)}  
                            className={formData.severity_id === 'x' && errors.severity_id ? "is-invalid":""}
                            >
                                {severityData.map((severity)=>{
                                    return <option key={severity.id} value={severity.id}>{severity.name}</option>
                                  })}
                              </Input>
                              {formData.severity_id === 'x' && errors.severity_id &&  <FormText className="text-danger">Required</FormText>}
                       </FormGroup>
                     </Col>
                   </Row>
                    <Row>
                      <Col md="12" style={{textAlign:'center'}}>
                        <Button type="submit" className="btn my-btn-color">
                           submit
                        </Button>
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
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  faultData: PropTypes.array.isRequired,
  severityData: PropTypes.array.isRequired,
  rollItem: PropTypes.object.isRequired,
};