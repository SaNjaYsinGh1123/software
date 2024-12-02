import React ,{useState} from 'react';
import {
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  Button,
  Table
} from 'reactstrap';

import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';

const JumbotronComponent = () => {
  const data2 = [];
  const [formDatas, setFormDataS] = useState({
    items1:[]
  });
  
  







  const addItem1 = () => {
    const newItems = formDatas.items1.slice();
    console.log("data",newItems);
    newItems.push({ 
      TestName	:'',
      TestMethod	:'',
      Direction	:'',
      Unit	:'',
       Temperature:'',
      MinimumExpectation:'',
      Result	:'',
      Notes:''
    })
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


  




  console.log('modal',data2);
  return (
    <>
     <ComponentCard5 >
          
           
                 <Form>
                   <Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Table className="qa-packaging-roll-modal-items-padding">
                              <thead>
                                <tr>
                                <th><div>Test Name	</div></th>
                                <th><div>Test Method	</div></th>
                                <th><div>Direction	</div></th>
                                <th><div>Unit	</div></th>
                                <th><div> Temperature</div></th>
                                <th><div>Minimum Expectation</div></th>
                                <th><div>Result	</div></th>
                                <th><div>Notes</div></th>

                                <th><Button type="button" className='btn-success' onClick={addItem1}>+</Button></th>
                                </tr>
                              </thead>
                              <tbody>
                                {formDatas.items1.map((item, index) => (
                                    <tr key={item}>
                                      
                                      <td>
                                          <Input name="TestName"
                                                value={item.TestName} 
                                                type="text" 
                                                onChange={e => handleInputChange1(index, e)} 
                                                placeholder=""
                                                />
                                               
                                          
                                        </td>
                                        <td>
                                          <Input type="text" 
                                              name="TestMethod" 
                                              id="name"
                                              placeholder="Enter name" 
                                              value={item.TestMethod}
                                              onChange={e => handleInputChange1(index, e)} 
                                                />
                                        </td>
                                        <td>
                                          <Input name="Direction"
                                                value={item.Direction} 
                                                type="text" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                />
                                                 
                                        </td>
                                        <td>
                                          <Input name="Unit"
                                                value={item.Unit} 
                                                type="text" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                />
                                                 
                                        </td>
                                        <td>
                                          <Input name="Temperature"
                                                value={item.Temperature} 
                                                type="text" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                />
                                                 
                                        </td>
                                        <td>
                                          <Input name="MinimumExpectation"
                                                value={item.MinimumExpectation} 
                                                type="text" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                />
                                                 
                                        </td>
                                        <td>
                                          <Input name="Result"
                                                value={item.Result} 
                                                type="text" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                />
                                                 
                                        </td>
                                        <td>
                                          <Input name="Notes"
                                                value={item.Notes} 
                                                type="text" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                />
                                                 
                                        </td>
                                      
                                      
                                   
                                
                                        <td><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem1(index)} >X</button></td>
                                    </tr>
                                ))}
                              </tbody>
                            </Table>
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
              
          </ComponentCard5>
    </>
  );
};

export default JumbotronComponent;
