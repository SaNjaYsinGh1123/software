import React ,{useState} from 'react';
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
  FormText,
} from 'reactstrap';

import PropTypes from 'prop-types';
import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';

const JumbotronComponent = ({handleCreateJumboRoll,modal,toggle,JumboDataFromPlan,data2}) => {
  
  const [modalRoll,setModalRoll] = useState(false);
  const [sendOption,setSendOption] = useState(false);
  
  const formatDateForInput = (date) => {
    const indianOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const localDate = new Date(date.getTime() + indianOffset); // Adjust to IST
    return localDate.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:MM'
  };

  const [formDatasRoll, setFormDatasRoll] = useState({
     quantity:'',
     startTime: formatDateForInput(new Date()),
     endTime:'',
     note:'',
     qa_pe_id:'x'
  });
  
  console.log('jumboooooo',JumboDataFromPlan, formDatasRoll);
  
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errors,setErrors] = useState({});

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
    const errors1 ={};

    if(formDatasRoll.qa_pe_id === 'x'){
    // eslint-disable-next-line dot-notation
      errors1["qa_pe_id"] ="Required"
      setErrors(errors1);

    }else{
      setModalRoll(!modalRoll);
      // setModal1(false);
      console.log('toggle',toggle);
    }
    
  }



  const closer =()=>{
    setErrorMessageFromApi([]);
  }
  
    async function apiCall() {
      try {
          console.log('formdatas',formDatasRoll);
          const token = localStorage.getItem('userToken');
          const response = await fetch(`https://factory.teamasia.in/api/public/jumboroll`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
             
              body: JSON.stringify({
                production_plan_id:JumboDataFromPlan.id,
                line_id:JumboDataFromPlan.line_id,
                order_id:JumboDataFromPlan.order_id,
                product_id:JumboDataFromPlan.product_id,
                qa_pe_id:formDatasRoll.qa_pe_id,
                quantity:formDatasRoll.quantity,
                start_date:formDatasRoll.startTime,
                end_date:formDatasRoll.endTime,
                note:formDatasRoll.note,
                send_for_additional_treatment: sendOption === false?0:1 
              }),
          });
  
          const dataZ = await response.json();
          console.log("dataapi",dataZ,response);
          if (response.status === 201) {
            handleCreateJumboRoll();
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

  const validateForm=()=>{
    let formIsValid =true;
    const errors1 ={};
  
    if(formDatasRoll.quantity === ''){
      formIsValid = false;
  // eslint-disable-next-line dot-notation
     errors1["quantity"] ="Required"
   }
    if(formDatasRoll.startTime === ''){
      formIsValid = false;
  // eslint-disable-next-line dot-notation
     errors1["startTime"] ="Required"
   }
    if(formDatasRoll.endTime === ''){
      formIsValid = false;
  // eslint-disable-next-line dot-notation
     errors1["endTime"] ="Required"
   }
    if(formDatasRoll.note === ''){
      formIsValid = false;
  // eslint-disable-next-line dot-notation
     errors1["note"] ="Required"
   }
    if(formDatasRoll.qa_pe_id === 'x'){
      formIsValid = false;
  // eslint-disable-next-line dot-notation
     errors1["qa_pe_id"] ="Required"
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

  return (
    <>
     <ComponentCard5 >
            <Modal isOpen={modal} toggle={toggle} style={{'--bs-modal-width': '800px'}}>
              <ModalHeader toggle={toggle}></ModalHeader>
              <ModalBody>
                 <Form>
                    <Row>
                       <Row>
                          <Col md="12" className=''>
                            <FormGroup>
                              <Label>*Name of the Production Engineer</Label>
                              <Input type="select" 
                                name="qa_pe_id" 
                                value={formDatasRoll.qa_pe_id}
                                onChange={handleTypeChange}
                                className={formDatasRoll.qa_pe_id === 'x' && errors.qa_pe_id ? "is-invalid":""}
                                >
                                  {data2.map((item)=>{    
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                  })}
                              </Input>
                                 { formDatasRoll.qa_pe_id === 'x' && errors.qa_pe_id &&  <FormText className="text-danger">Required</FormText>}
                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                       </Row>
                       <Col md="4">
                          <FormGroup>
                            <Button className="btn my-btn-color" style={{marginTop:"28px"}} onClick={()=>{updateRollToggle()}}>
                                Save
                            </Button>
                          </FormGroup>
                       </Col>
                   </Row>
                 </Form>
              </ModalBody>
             
            </Modal>
            
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
                                onChange={handleTypeChange}
                                
                                className={formDatasRoll.quantity === '' && errors.quantity ? "is-invalid":""}
                                />
                                 { formDatasRoll.quantity === '' && errors.quantity &&  <FormText className="text-danger">Required</FormText>}

                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                       <Col md="6" className=''>
                            <FormGroup>
                              <Label>*Start time</Label>
                              <Input type="datetime-local" 
                                name="startTime" 
                                value={formDatasRoll.startTime}
                                onChange={handleTypeChange}
                                className={formDatasRoll.startTime === '' && errors.startTime ? "is-invalid":""}
                                />
                                 { formDatasRoll.startTime === '' && errors.startTime &&  <FormText className="text-danger">Required</FormText>}

                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                       <Col md="6" className=''>
                            <FormGroup>
                              <Label>*End time</Label>
                              <Input type="datetime-local" 
                                name="endTime" 
                                value={formDatasRoll.endTime}
                                onChange={handleTypeChange}
                                className={formDatasRoll.endTime === '' && errors.endTime ? "is-invalid":""}
                                />
                                 { formDatasRoll.endTime === '' && errors.endTime &&  <FormText className="text-danger">Required</FormText>}

                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>

                       <Col md="6" className=''>
                            <FormGroup>
                              <Label>*Note</Label>
                              <Input type="textarea" 
                                name="note" 
                                value={formDatasRoll.note}
                                onChange={handleTypeChange}
                                className={formDatasRoll.note === '' && errors.note ? "is-invalid":""}
                                />
                                 { formDatasRoll.note === '' && errors.note &&  <FormText className="text-danger">Required</FormText>}
                              
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
                                name="qa_pe_id" 
                                value={formDatasRoll.qa_pe_id}
                                onChange={handleTypeChange}
                                className={formDatasRoll.qa_pe_id === 'x' && errors.qa_pe_id ? "is-invalid":""}
                                >
                                  {data2.map((item)=>{    
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                  })}
                              </Input>
                                 { formDatasRoll.qa_pe_id === 'x' && errors.qa_pe_id &&  <FormText className="text-danger">Required</FormText>}
                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                       </Row>
                       <Col md="4">
                          <FormGroup>
                            <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}>
                               Create
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
  handleCreateJumboRoll: PropTypes.func.isRequired,
  JumboDataFromPlan: PropTypes.object.isRequired,
  data2: PropTypes.array.isRequired,
};