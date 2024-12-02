import React, { useEffect, useState } from 'react';
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
} from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    id,
    product_id: productId,
    roll_code: rollCode,
    cut_piece_length: cutPieceLength,
    quantity,
    grade_id: gradeId,
    bin,
    weight,
    width,
    t1,
    t2,
    t3,
    send_to_factory_stock: sendToFactoryStock,
    comment,
    qa_id: qaId,
    is_trashed: isTrashed,
  } = location.state || {}; // Default to an empty object if state is undefined

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [errorsP,setErrorsP] = useState({});
  const [firstcheck, setFirstCheck] = useState(sendToFactoryStock === '1');
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);

  const [formDatas, setFormDataS] = useState({
    id,
    productId,
    rollCode,
    cutPieceLength,
    quantity,
    gradeId,
    bin,
    weight,
    width,
    t1,
    t2,
    t3,
    sendToFactoryStock,
    comment,
    qaId,
    isTrashed,
  });

  const checkboxclick1 = () => {
    setFormDataS((prevState) => ({
      ...prevState,
      sendToFactoryStock: formDatas.sendToFactoryStock === '1' ? '0' : '1',
    }));
    setFirstCheck(!firstcheck);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log('loc', location.state);

  const closer =()=>{
    setErrorMessageFromApi([]);
  }

  async function apiCall() {
    try {
      console.log('formdatas',formDatas.gradeId);

      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/smallrolls/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: formDatas.productId,
          roll_code: formDatas.rollCode,
          cut_piece_length: formDatas.cutPieceLength,
          quantity: formDatas.quantity,
          grade_id: formDatas.gradeId,
          bin: formDatas.bin,
          weight: formDatas.weight,
          width: formDatas.width,
          t1: formDatas.t1,
          t2: formDatas.t2,
          t3: formDatas.t3,
          send_to_factory_stock: formDatas.sendToFactoryStock,
          comment: formDatas.comment,
          qa_id: formDatas.qaId,
          is_trashed: formDatas.isTrashed,
        }),
      });

      const dataZ = await response.json();
      console.log('dataapi', dataZ);
       if (response.status === 200) {
          navigate(-1);
        } else {
          console.error("Authentication failed:", Object.values(dataZ.messages.errors));
          if (dataZ.error) {
            setErrorMessageFromApi(Object.values(dataZ.messages.errors));
          }
        }  
        return null;
    } catch (error) {
      setErrorMessageFromApi(["Network error"]);
        return null;
    }
  }

  const validateFormSmall=()=>{
    let formIsValid =true;
    const errors1 ={};
      
    if(formDatas.quantity === ''){
      formIsValid = false;
      // eslint-disable-next-line dot-notation
      errors1["quantity"] ="Required"
     }
    if(formDatas.gradeId === 'x'){
      formIsValid = false;
      // eslint-disable-next-line dot-notation
      errors1["grade_id"] ="Required"
     }
  
    if(formDatas.weight === ''){
      formIsValid = false;
      // eslint-disable-next-line dot-notation
      errors1["weight"] ="Required"
     }
    if(formDatas.width === ''){
      formIsValid = false;
      // eslint-disable-next-line dot-notation
      errors1["width"] ="Required"
     }
    if(formDatas.t1 === ''){
      formIsValid = false;
      // eslint-disable-next-line dot-notation
      errors1["t1"] ="Required"
     }
    if(formDatas.t2 === ''){
      formIsValid = false;
      // eslint-disable-next-line dot-notation
      errors1["t2"] ="Required"
     }
    if(formDatas.t3 === ''){
      formIsValid = false;
      // eslint-disable-next-line dot-notation
      errors1["t3"] ="Required"
     }
  
    if(formDatas.qaId === 'x'){
      formIsValid = false;
      // eslint-disable-next-line dot-notation
      errors1["qa_id"] ="Required"
     }
  
    setErrorsP(errors1);
    return formIsValid;
    }


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('event', event);
    if(validateFormSmall()) {
      console.log('Form is valid, proceed with API call');
      apiCall();
    } else {
      console.log('Form is invalid, do not submit');
    }
    
  };

  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    setFormDataS((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log('e', e.target.value);
  };

  useEffect(() => {
    const fetchData1 = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://factory.teamasia.in/api/public/grades?is_trashed=0', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const resultX = result.grades.slice();
      resultX.push({ id: 'x', name: 'Choose' });
      setData1(resultX);
    };

    const fetchData2 = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://factory.teamasia.in/api/public/qapateams/?is_trashed=0', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const resultX = result.qapateams.slice();
      resultX.push({ id: 'x', name: 'Choose' });
      setData2(resultX);
    };

    fetchData2();
    fetchData1();
  }, []);

  return (
    <div>
      <Row>
        <Col md="12">
          <Card>
            <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
              Edit Roll
            </CardTitle>
            <CardBody className="bg-light">
              <Form onSubmit={handleSubmit}>
                <Row>
                <Col md="8">{errorMessageFromApi.length !== 0 && (
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
                  
                  <Col md="10">
                    <FormGroup>
                      <Label>Quantity (in meters)</Label>
                      <Input
                        type="number"
                        name="quantity"
                        placeholder="Enter quantity"
                        value={formDatas.quantity}
                        onChange={handleChange}
                        className={formDatas.quantity === '' && errorsP.quantity ? "is-invalid":""}
                        />
                        {formDatas.quantity === '' && errorsP.quantity &&  <FormText className="text-danger">Required</FormText>}
                    </FormGroup>
                  </Col>
                  <Col md="10" className="">
                    <FormGroup>
                      <Label>Grade</Label>
                      <Input
                        type="select"
                        name="gradeId"
                        value={formDatas.gradeId}
                        onChange={handleTypeChange}
                        className={formDatas.gradeId === 'x' && errorsP.grade_id ? "is-invalid":""}
                      >
                        {data1.map((item) => {
                          return <option key={item.id} value={item.id}>{item.name}</option>;
                        })}
                      </Input>
                      {formDatas.gradeId === 'x' && errorsP.grade_id &&  <FormText className="text-danger">Required</FormText>}
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>BIN</Label>
                      <Input
                        type="text"
                        name="bin"
                        placeholder="Enter bin"
                        value={formDatas.bin}
                        onChange={handleChange}
                        className={formDatas.bin === '' && errorsP.bin ? "is-invalid":""}
                        />
                        {formDatas.bin === '' && errorsP.bin &&  <FormText className="text-danger">Required</FormText>}
                    </FormGroup>
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <Label>Weight</Label>
                      <Input
                        type="number"
                        name="weight"
                        placeholder="Enter weight"
                        value={formDatas.weight}
                        onChange={handleChange}
                        className={formDatas.weight === '' && errorsP.weight ? "is-invalid":""}
                        />
                        {formDatas.weight === '' && errorsP.weight &&  <FormText className="text-danger">Required</FormText>}
                    </FormGroup>
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <Label>Width</Label>
                      <Input
                        type="number"
                        name="width"
                        placeholder="Enter width"
                        value={formDatas.width}
                        onChange={handleChange}
                        className={formDatas.width === '' && errorsP.width ? "is-invalid":""}
                        />
                        {formDatas.width === '' && errorsP.width &&  <FormText className="text-danger">Required</FormText>}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>T1</Label>
                      <Input
                        type="number"
                        name="t1"
                        placeholder="Enter T1"
                        value={formDatas.t1}
                        onChange={handleChange}
                        className={formDatas.t1 === '' && errorsP.t1 ? "is-invalid":""}
                        />
                        {formDatas.t1 === '' && errorsP.t1 &&  <FormText className="text-danger">Required</FormText>}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>T2</Label>
                      <Input
                        type="number"
                        name="t2"
                        placeholder="Enter T2"
                        value={formDatas.t2}
                        onChange={handleChange}
                        className={formDatas.t2 === '' && errorsP.t2 ? "is-invalid":""}
                        />
                        {formDatas.t2 === '' && errorsP.t2 &&  <FormText className="text-danger">Required</FormText>}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>T3</Label>
                      <Input
                        type="number"
                        name="t3"
                        placeholder="Enter T3"
                        value={formDatas.t3}
                        onChange={handleChange}
                        className={formDatas.t3 === '' && errorsP.t3 ? "is-invalid":""}
                        />
                        {formDatas.t3 === '' && errorsP.t3 &&  <FormText className="text-danger">Required</FormText>}
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Input
                        type="checkbox"
                        name="sendToFactoryStock"
                        checked={firstcheck}
                        onChange={checkboxclick1}
                        disabled
                      />
                      <Label> Send to factory stock</Label>
                      <FormText className="muted"></FormText>
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Comments</Label>
                      <Input
                        type="textarea"
                        name="comment"
                        placeholder="Enter comments"
                        value={formDatas.comment}
                        onChange={handleChange}
                      />
                      <FormText className="muted"></FormText>
                    </FormGroup>
                  </Col>
                  <Col md="4" className="">
                    <FormGroup>
                      <Label>Name Of the QA</Label>
                      <Input
                        type="select"
                        name="qaId"
                        value={formDatas.qaId}
                        onChange={handleTypeChange}
                        className={formDatas.qaId === 'x' && errorsP.qa_id ? "is-invalid":""}
                      >
                        {data2.map((item) => {
                          return <option key={item.id} value={item.id}>{item.name}</option>;
                        })}
                      </Input>
                      {formDatas.qaId === 'x' && errorsP.qa_id &&  <FormText className="text-danger">Required</FormText>}

                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Button type="submit" className="btn my-btn-color" style={{ marginTop: "28px" }}>
                        Submit
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Add;
