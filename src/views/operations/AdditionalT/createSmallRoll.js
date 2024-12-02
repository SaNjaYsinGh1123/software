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

const JumbotronComponent = ({modal,toggle,faultData,severityData,data1,data2}) => {
  
  const [formDatas, setFormDataS] = useState({
    product_id:'0',
    roll_code:'sp',
    quantity:'',
    grade_id:'x',
    bin:'',
    weight:'',
    width:'',
    t1:'',
    t2:'',
    t3:'',
    send_to_factory_stock:'0',
    comment:'',
    qa_id:'x',
    is_trashed:'0',
    items:[],
    items1:[]
  });
  const [firstcheck, setFirstCheck] = useState(formDatas.send_to_factory_stock !== '0');
  
  console.log(severityData,faultData);
  
  const checkboxclick1 = () => {
    console.log('formdatas',formDatas.send_to_factory_stock);
    const send = formDatas.send_to_factory_stock=== '1' ? '0' : '1'
    setFormDataS((prevState) => ({
      ...prevState,
      send_to_factory_stock:send,
    }));
    setFirstCheck(!firstcheck);
  };

  const addItem = () => {
    const newItems = formDatas.items.slice();
    console.log("data",newItems);
    newItems.push({"cut_piece_length":''})
    setFormDataS(prevState => ({
      ...prevState,
      items: newItems
    }));
  };

  const removeItem = index => {
    const newItems = formDatas.items.slice();
    newItems.splice(index, 1);
    setFormDataS(prevState => ({
      ...prevState,
      items: newItems
    }));
  };

  const handleInputChange = (index, e) => {
    const newItems = formDatas.items.slice();
    console.log("data",index,newItems);
    newItems[index].cut_piece_length =  e.target.value;
    console.log('newX',newItems);
    setFormDataS(prevState => ({
      ...prevState,
      items: newItems
    }));
  };

  const addItem1 = () => {
    const newItems = formDatas.items1.slice();
    console.log("data",newItems);
    newItems.push({FaultId:'',faultStart:'',FaultLength:'',SeverityId:''})
    setFormDataS(prevState => ({
      ...prevState,
      items1: newItems
    }));
  };

  const removeItem1 = index => {
    const newItems = formDatas.items1.slice();
    newItems.splice(index, 1);
    setFormDataS(prevState => ({
      ...prevState,
      items1: newItems
    }));
  };

  const handleInputChange1 = (index, e) => {
    const newItems = formDatas.items1.slice();
    console.log("data",index,newItems);
    newItems[index].cut_piece_length =  e.target.value;
    console.log('newX',newItems);
    setFormDataS(prevState => ({
      ...prevState,
      items1: newItems
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

  return (
    <>
     <ComponentCard5 >
          
            <Modal isOpen={modal} toggle={toggle} style={{'--bs-modal-width': '800px'}}>
              <ModalHeader toggle={toggle}>Create Small Roll</ModalHeader>
              <ModalBody>
                 <Form>
                   <Row>
                     <Col>
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
                             {formDatas.items.map((item, index) => (
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
                            <Input type="text" 
                            name="quantity" 
                            id="name"
                            placeholder="Enter name" 
                            value={formDatas.quantity}
                            onChange={handleChange} 
                              />
                            
                            <FormText className="muted"></FormText>
                          </FormGroup>
                      </Col>
                      <Col md="3" className=''>
                        <FormGroup>
                          <Label>Grade</Label>
                          <Input type="select" 
                            name="grade_id" 
                            value={formDatas.grade_id}
                            onChange={handleTypeChange}>
                              {data1.map((item)=>{
      
                                return <option key={item.id} value={item.id}>{item.name}</option>
                              })}
                          </Input>

                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="3" >
                            <FormGroup>
                              <Label>BIN</Label>
                              <Input type="text"
                              name="bin"
                              id="name"
                              placeholder="Enter name" 
                              value={formDatas.bin}
                              onChange={handleChange} 
                                />
                              <FormText className="muted"></FormText>
                            </FormGroup>
                      </Col>

                      <Col md="3" >
                        <FormGroup>
                          <Label>Weight</Label>
                          <Input type="text" 
                          name="weight" 
                          id="name"
                          placeholder="Enter name" 
                          value={formDatas.weight}
                          onChange={handleChange} 
                            />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>

                      <Col md="3" >
                        <FormGroup>
                          <Label>Width</Label>
                          <Input type="text" 
                          name="width" 
                          id="name"
                          placeholder="Enter name" 
                          value={formDatas.width}
                          onChange={handleChange}
                            />
                          
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="3" >
                        <FormGroup>
                          <Label>T1</Label>
                          <Input type="text" 
                          name="t1" 
                          id="name"
                          placeholder="Enter name" 
                          value={formDatas.t1}
                          onChange={handleChange} 
                            />      
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                 
                      <Col md="3" >
                        <FormGroup>
                          <Label>T2</Label>
                          <Input type="text" 
                          name="t2" 
                          id="name"
                          placeholder="Enter name" 
                          value={formDatas.t2}
                          onChange={handleChange} 
                            />
                          
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="3" >
                        <FormGroup>
                          <Label>T3</Label>
                          <Input type="text" 
                          name="t3" 
                          id="name"
                          placeholder="Enter name" 
                          value={formDatas.t3}
                          onChange={handleChange} 
                            />
                          
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      

                      <Col md="12" >
                        <FormGroup>
                          <Label>Comments</Label>
                          <Input type="textarea" 
                          name="comment" 
                          id="name"
                          placeholder="Enter name" 
                          value={formDatas.comment}
                          onChange={handleChange} 
                            />
                          
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Table className="qa-packaging-roll-modal-items-padding">
                              <thead>
                                <tr>
                                <th><div>#</div></th>
                                <th><div >Fault</div></th>
                                <th><div >Fault start Point (m)</div></th>
                                <th><div >Fault Length(m)</div></th>
                                <th><div style={{textAlign:'center'}}>Severity</div></th>
                                <th><Button type="button" className='btn-success' onClick={addItem1}>+</Button></th>
                                </tr>
                              </thead>
                              <tbody>
                                {formDatas.items1.map((item, index) => (
                                    <tr key={item}>
                                      <td>#</td>
                                      <td>
                                          <Input name="product"
                                                value={item.FaultId} 
                                                type="select" 
                                                onChange={e => handleInputChange1(index, e)} 
                                                placeholder=""
                                                >
                                                  {
                                                    faultData.map((itema)=>
                                                      <option key={itema.id}>{itema.name}</option>
                                                    )
                                                  }
                                          </Input>
                                        </td>
                                        <td>
                                          <Input type="text" 
                                              name="faultStart" 
                                              id="name"
                                              placeholder="Enter name" 
                                              value={item.faultStart}
                                              onChange={e => handleInputChange1(index, e)} 
                                                />
                                        </td>
                                        <td>
                                          <Input type="text" 
                                              name="FaultLength" 
                                              id="name"
                                              placeholder="Enter name" 
                                              value={item.FaultLength}
                                              onChange={e => handleInputChange1(index, e)} 
                                                />
                                        </td>
                                        <td>
                                          <Input name="SeverityId"
                                                value={item.SeverityId} 
                                                type="select" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                >
                                                  {
                                                    severityData.map((itema)=>
                                                      <option key={itema.id}>{itema.name}</option>
                                                    )
                                                  }
                                          </Input>
                                        </td>
                                        <td><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem1(index)} >X</button></td>
                                    </tr>
                                ))}
                              </tbody>
                            </Table>
                          </FormGroup>
                        </Col>
                      </Row>
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
                                value={formDatas.qa_id}
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
  modal: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  faultData: PropTypes.array.isRequired,
  severityData: PropTypes.array.isRequired,
  data1: PropTypes.array.isRequired,
  data2: PropTypes.array.isRequired
};