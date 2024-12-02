import React, {useState} from 'react';
import {
  Row,
  Col,
  Collapse,
  Table,
  Button,
} from 'reactstrap';
import ComponentCard from '../../../components/ComponentCard';
import 'react-table-v6/react-table.css';
import Barcode from "../../../assets/images/bg/barcode.png"
import SmallRollDetails from './smallRollDetails'

const JumbotronComponent = () => {
  const data = [
    '256',
    '254',
    '272',
    '292',
    '296'
  ]
  const [collapse, setCollapse] = useState(Array.from({length: data.length}, ()=>false));
  const [modal, setModal] = useState(false);

 
  




  const collapseSetter = (index)=>{

    const newCollapse = [...collapse];
    newCollapse[index] = !newCollapse[index];
    setCollapse(newCollapse);
  }
  
  const smallRollDetailsTogglefunction = ()=>{
    console.log('click');
    setModal(!modal)
  }
  
  return (
    <>
       <SmallRollDetails modal={modal} toggle={smallRollDetailsTogglefunction}/>
      <ComponentCard title="">
       { data.map((item,index) =>(

  <Row style={{padding:'5px 0px'}} key={item}>
             <Col className='' onClick={()=>{collapseSetter(index)}} style={{background:'whitesmoke',padding:'10px'}}>
               
                  {`# ${item} (Total: 2 )`}
                 
              
            </Col>
            <Collapse isOpen={collapse[index]}>
            <Table className='table-margin-zero' responsive>
                  <thead>
                    <tr>
                      <th scope="col">Quantity</th>
                      <th scope="col">Grade</th>
                      <th scope="col">Weight</th>
                      <th scope="col">BIN</th>
                      <th scope="col">Grain</th>
                      <th scope="col">Color</th>
                      <th scope="col">Thickness</th>
                      <th scope="col">Code</th>
                      <th scope="col">Action</th>
                      <th scope="col">Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                              <td >40m</td>
                              <td>Ist</td>
                              <td>44.36 kg</td>
                              <td> </td>
                              <td>3008 B</td>
                              <td>brown</td>
                              <td>1.2 mm</td>
                              <td >
                                  <span onClick={()=>smallRollDetailsTogglefunction()}>
                                    <img src={Barcode} alt='barcode'/>
                                  </span>
                              </td>
                              <td>
                                <td ><Button ><i className="bi bi-printer-fill my-bell-color" /></Button></td>
                                <td ><Button ><i className="bi bi-pencil-fill my-pen-color" /></Button></td>
                                <td ><Button ><i className="bi bi-trash-fill my-trash-color" /></Button></td>
                              </td>
                              <td></td>
                              

                    </tr>
                    <tr>
                              <td >38m</td>
                              <td>Ist</td>
                              <td>42.04 kg</td>
                              <td> </td>
                              <td>3008 B</td>
                              <td>brown</td>
                              <td>1.2 mm</td>
                              <td><img src={Barcode} alt='barcode'/></td>
                              <td>
                                <td ><Button ><i className="bi bi-printer-fill my-bell-color" /></Button></td>
                                <td ><Button ><i className="bi bi-pencil-fill my-pen-color" /></Button></td>
                                <td ><Button ><i className="bi bi-trash-fill my-trash-color" /></Button></td>
                              </td>
                              <td></td>
                              

                    </tr>
                  
                  </tbody>
                </Table>
            </Collapse>
            
          </Row>

        )) }
          
           
      </ComponentCard>
    </>
  );
};

export default JumbotronComponent;
