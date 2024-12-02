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
  Table
} from 'reactstrap';

import PropTypes from 'prop-types';
import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';

const JumbotronComponent = ({modal,rollItem,handleCreateSmallRoll,toggle,faultData,severityData,data1,data2}) => {
  
  const [formDataS, setFormDataS] = useState({
    id:'x',
    product_id: rollItem.product_id,
    jumbo_roll_id: rollItem.id,
    quantity: "",
    grade_id: "x",
    bin : "",
    weight: "",
    width : "1.4",
    t1 : "",
    t2 : "",
    t3 : "",
    send_to_factory_stock : "",
    price : "0",
    comment : "",
    qa_id : "x",
    items:[],
    items1:[]
  });
  const [firstcheck, setFirstCheck] = useState(formDataS.send_to_factory_stock !== '0');
  const [errorsP,setErrorsP] = useState({});
  const [errorMessageFromSmallApi, setErrorMessageFromSmallApi] = useState([]);
  
  console.log(severityData,faultData);
  
  console.log('rollItem',rollItem,faultData,severityData,data1,data2);

  const checkboxclick1 = () => {
    console.log('formdatas',formDataS.send_to_factory_stock);
    const send = formDataS.send_to_factory_stock=== '1' ? '0' : '1'
    setFormDataS((prevState) => ({
      ...prevState,
      send_to_factory_stock:send,
    }));
    setFirstCheck(!firstcheck);
  };

  const addItem = () => {
    const newItems = formDataS.items.slice();
    console.log("data",newItems);
    newItems.push({"cut_piece_length":''})
    setFormDataS(prevState => ({
      ...prevState,
      items: newItems
    }));
  };

  const removeItem = index => {
    const newItems = formDataS.items.slice();
    newItems.splice(index, 1);

    let totalQuantity =0;

    newItems.forEach((item) => {
      const length = parseInt(item.cut_piece_length, 10); // Use radix 10
      totalQuantity += Number.isNaN(length) ? 0 : length; // Handle NaN values
    });

    setFormDataS(prevState => ({
      ...prevState,
      quantity:totalQuantity,
      items: newItems
    }));
  };

  const handleInputChange = (index, e) => {
    const newItems = formDataS.items.slice();
    console.log("data",index,newItems);
    newItems[index].cut_piece_length =  e.target.value;
    console.log('newX',newItems);
    let totalQuantity =0;

    newItems.forEach((item) => {
      const length = parseInt(item.cut_piece_length, 10); // Use radix 10
      totalQuantity += Number.isNaN(length) ? 0 : length; // Handle NaN values
    });

    setFormDataS(prevState => ({
      ...prevState,
      quantity:totalQuantity,
      items: newItems
    }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('hi')
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

const handleTypeChange = (e) => {
    const { name, value } = e.target;
      setFormDataS(prevState => ({
        ...prevState,
        [name]: value
      }));
   
    
    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
  };

// small roll start
const closerForSmall =()=>{
  setErrorMessageFromSmallApi([]);
}

async function apiCallForSmallCreate() {
  try {
      console.log('formdataP',formDataS);
      const token = localStorage.getItem('userToken');
      let url = `https://factory.teamasia.in/api/public/smallrolls`;
      let MethodP = 'POST';
      let StatusP = 201;
      
      if(formDataS.id !== 'x'){
        console.log('yes',formDataS.id);
         url = `https://factory.teamasia.in/api/public/smallrolls`;
         MethodP="PUT";
         StatusP=200;
      }
      const cutPiece = formDataS.items.slice();
      let cutPieceR = 0
      if(cutPiece.length > 0){
         cutPieceR = cutPiece.map((item) => item.cut_piece_length).join(',')
      }
      console.log('cutPiece',cutPiece);
      const response = await fetch(url, {
          method: MethodP,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
         
          body: JSON.stringify({
              product_id: formDataS.product_id,
              jumbo_roll_id: formDataS.jumbo_roll_id,
              cut_piece_length: cutPieceR,
              quantity: formDataS.quantity,
              grade_id: formDataS.grade_id,
              bin : formDataS.bin,
              weight: formDataS.weight,
              width : formDataS.width,
              t1 : formDataS.t1,
              t2 : formDataS.t2,
              t3 : formDataS.t3,
              send_to_factory_stock : formDataS.send_to_factory_stock,
              price : "0",
              comment : formDataS.comment,
              qa_id : formDataS.qa_id,
          })
      });

      const dataZ = await response.json();
      console.log("dataapi",dataZ,response);
      if (response.status === StatusP) {
          handleCreateSmallRoll();
          toggle();
      } else {
        console.error("Authentication failed:", Object.values(dataZ.messages.errors));
        if (dataZ.error) {
          setErrorMessageFromSmallApi(Object.values(dataZ.messages.errors));
        }
      }  
      return null;
    } catch (error) {
      console.log('error',error);
      setErrorMessageFromSmallApi(["Network error"]);
      return null;
    }
}

const validateFormSmall=()=>{
  let formIsValid =true;
  const errors1 ={};
    
  if(formDataS.quantity === ''){
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["quantity"] ="Required"
   }
  if(formDataS.grade_id === 'x'){
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["grade_id"] ="Required"
   }
  if(formDataS.weight === ''){
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["weight"] ="Required"
   }
  if(formDataS.width === ''){
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["width"] ="Required"
   }
  if(formDataS.qa_id === 'x'){
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["qa_id"] ="Required"
   }

  setErrorsP(errors1);
  return formIsValid;
  }


const handleSubmitforSmall = async (e) => {
  e.preventDefault();
  if(validateFormSmall()) {
    console.log('Form is valid, proceed with API call');
    apiCallForSmallCreate();
  } else {
    console.log('Form is invalid, do not submit');
  }
};
// small roll end

  return (
    <>
     <ComponentCard5 >
          
            <Modal isOpen={modal} toggle={toggle} style={{'--bs-modal-width': '800px'}}>
              <ModalHeader toggle={toggle}>Create Small Roll</ModalHeader>
              <ModalBody>
                 <Form onSubmit={handleSubmitforSmall}>
                   <Row>
                     <Col md="12">{errorMessageFromSmallApi.length !== 0 && (
                          <div style={{ background:'#ff9c7a',color: 'black', marginBottom: '10px', padding:"5px 10px"}}>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                              Following errors were found:
                              <span onClick={closerForSmall} style={{cursor:'pointer'}}>X</span>
                            </div>
                            <ul>
                              {errorMessageFromSmallApi.map((item)=>
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
                         <Table className="qa-packaging-roll-modal-items-padding">
                          <thead>
                            <tr >
                             <th >#</th>
                             <th style={{textAlign:'center'}}>cut Piece Length(m)</th>
                             <th ><button type="button" className='my-btn-color-green' onClick={addItem}>+</button></th>
                            </tr>
                          </thead>
                          <tbody>
                             {formDataS.items.map((item, index) => (
                                <tr key={item}>
                                  <td>#</td>
                                  <td>

                                      <Input name="product"
                                            value={item.cut_piece_length} 
                                            type="text" 
                                            onChange={e => handleInputChange(index, e)} 
                                            placeholder=""
                                            />
                                    </td>
                                    <td><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem(index)} >X</button></td>
                                </tr>
                            ))}
                          </tbody>
                         </Table>
                       </FormGroup>
                     </Col>
                   </Row>
                   <Row>
                      <Col md="3" >
                          <FormGroup>
                            <Label>Quantity (in meters)</Label>
                            <Input type="number" 
                            name="quantity" 
                            id="name"
                            placeholder="Enter Value" 
                            value={formDataS.quantity}
                            onChange={handleChange} 
                            disabled = {formDataS.items.length > 0}
                            className={formDataS.quantity === '' && errorsP.quantity ? "is-invalid":""}
                            />
                            {formDataS.quantity === '' && errorsP.quantity &&  <FormText className="text-danger">Required</FormText>}
                          </FormGroup>
                      </Col>
                      <Col md="3" className=''>
                        <FormGroup>
                          <Label>Grade</Label>
                          <Input type="select" 
                            name="grade_id" 
                            value={formDataS.grade_id}
                            onChange={handleTypeChange}
                            className={formDataS.grade_id === 'x' && errorsP.grade_id ? "is-invalid":""}
                            >
                              {data1.map((item)=>{
      
                                return <option key={item.id} value={item.id}>{item.name}</option>
                              })}
                          </Input>

                          {formDataS.grade_id === 'x' && errorsP.grade_id &&  <FormText className="text-danger">Required</FormText>}
                        </FormGroup>
                      </Col>
                      <Col md="3" >
                            <FormGroup>
                              <Label>BIN</Label>
                              <Input type="text"
                              name="bin"
                              id="name"
                              placeholder="Enter name" 
                              value={formDataS.bin}
                              onChange={handleChange} 
                              className={formDataS.bin === '' && errorsP.bin ? "is-invalid":""}
                              />
                              {formDataS.bin === '' && errorsP.bin &&  <FormText className="text-danger">Required</FormText>}
                            </FormGroup>
                      </Col>

                      <Col md="3" >
                        <FormGroup>
                          <Label>Weight</Label>
                          <Input type="number" 
                          name="weight" 
                          id="name"
                          placeholder="Enter name" 
                          value={formDataS.weight}
                          onChange={handleChange} 
                          className={formDataS.weight === '' && errorsP.weight ? "is-invalid":""}
                          />
                          {formDataS.weight === '' && errorsP.weight &&  <FormText className="text-danger">Required</FormText>}
                        </FormGroup>
                      </Col>

                      <Col md="3" >
                        <FormGroup>
                          <Label>Width</Label>
                          <Input type="number" 
                          name="width" 
                          id="name"
                          placeholder="Enter name" 
                          value={formDataS.width}
                          onChange={handleChange}
                          className={formDataS.width === '' && errorsP.width ? "is-invalid":""}
                          />
                          {formDataS.width === '' && errorsP.width &&  <FormText className="text-danger">Required</FormText>}
                        </FormGroup>
                      </Col>
                      <Col md="3" >
                        <FormGroup>
                          <Label>T1</Label>
                          <Input type="number" 
                          name="t1" 
                          id="name"
                          placeholder="Enter number" 
                          value={formDataS.t1}
                          onChange={handleChange} 
                          className={formDataS.t1 === '' && errorsP.t1 ? "is-invalid":""}
                          />
                          {formDataS.t1 === '' && errorsP.t1 &&  <FormText className="text-danger">Required</FormText>}
                        </FormGroup>
                      </Col>
                 
                      <Col md="3" >
                        <FormGroup>
                          <Label>T2</Label>
                          <Input type="number" 
                          name="t2" 
                          id="name"
                          placeholder="Enter number" 
                          value={formDataS.t2}
                          onChange={handleChange} 
                          className={formDataS.t2 === '' && errorsP.t2 ? "is-invalid":""}
                          />
                          {formDataS.t2 === '' && errorsP.t2 &&  <FormText className="text-danger">Required</FormText>}
                        </FormGroup>
                      </Col>
                      <Col md="3" >
                        <FormGroup>
                          <Label>T3</Label>
                          <Input type="number" 
                          name="t3" 
                          id="name"
                          placeholder="Enter number" 
                          value={formDataS.t3}
                          onChange={handleChange} 
                          className={formDataS.t3 === '' && errorsP.t3 ? "is-invalid":""}
                          />
                          {formDataS.t3 === '' && errorsP.t3 &&  <FormText className="text-danger">Required</FormText>}
                        </FormGroup>
                      </Col>
                      

                      <Col md="12" >
                        <FormGroup>
                          <Label>Comments</Label>
                          <Input type="textarea" 
                          name="comment" 
                          id="name"
                          placeholder="Enter name" 
                          value={formDataS.comment}
                          onChange={handleChange} 
                          className={formDataS.comment === '' && errorsP.comment ? "is-invalid":""}
                          />
                          {formDataS.comment === '' && errorsP.comment &&  <FormText className="text-danger">Required</FormText>}
                        </FormGroup>
                      </Col>

                      

                       <Row>
                          <Col md="6">
                          <FormGroup style={{opacity:0}}>
                              <Input type="checkbox" 
                              name="send_to_factory_stock" 
                              id="name"
                              placeholder="Enter name" 
                              value=""
                              />
                              <Label> Send to factory stock</Label>
                              <FormText className="muted"></FormText>
                            </FormGroup>
                            <FormGroup>
                              <Input type="checkbox" 
                              name="send_to_factory_stock" 
                              id="name"
                              placeholder="Enter name" 
                              value={firstcheck}
                              onChange={checkboxclick1} 
                              />
                              <Label> Send to factory stock</Label>
                              
                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                          <Col md="6" className=''>
                            <FormGroup>
                              <Label>Name Of the QA</Label>
                              <Input type="select" 
                                name="qa_id" 
                                value={formDataS.qa_id}
                                onChange={handleTypeChange}
                                className={formDataS.qa_id === 'x' && errorsP.qa_id ? "is-invalid":""}
                                >
                                  {data2.map((item)=>{
                                    
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                  })}
                              </Input>
                              {formDataS.qa_id === 'x' && errorsP.qa_id &&  <FormText className="text-danger">Required</FormText>}
                            </FormGroup>
                          </Col>
                       </Row>
                      <Col md="4">
                        <FormGroup>
                          <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}>
                              Submit
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
  modal: PropTypes.bool.isRequired,
  handleCreateSmallRoll: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  faultData: PropTypes.array.isRequired,
  severityData: PropTypes.array.isRequired,
  data1: PropTypes.array.isRequired,
  data2: PropTypes.array.isRequired,
  rollItem: PropTypes.object.isRequired,
};