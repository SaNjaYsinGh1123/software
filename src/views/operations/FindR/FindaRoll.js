import React ,{useState } from 'react';

import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,

} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const FindaRoll = () => {
  const navigate = useNavigate();
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [formDatas, setFormDataS] = useState({
    code:'',
  });
  const [errors,setErrors] = useState({});
  const [notFound,setNotFound] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
    setNotFound(false);
  }
  
  const closer =()=>{
    setErrorMessageFromApi([]);  
  }

  function checkProductFrontBack(SmallRollData) {
    
      navigate('/operations/find-a-roll/small-roll',{state: SmallRollData.id})
}


  async function apiCall(JumboCode) {
    try {
      const extractedRoll = JumboCode.split('SMALL')[1]
      console.log('extractedRoll',extractedRoll);

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/smallrolls/${extractedRoll}`, {
          method: 'GET', 
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

         if (response.status === 404) {
          setNotFound(true);
        }
        else if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }else{
          const result = await response.json();
          console.log("responsejson1",result?.[0]);
          return checkProductFrontBack(result?.[0]);
        }
        return null;

    } catch (error) {
      console.log(error);
      setErrorMessageFromApi(["Network error"]);
        return null;
    }
}

const validateForm=()=>{
  let formIsValid =true;
  const errors1 ={};

  if(formDatas.code === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["code"] = "Required";
  }
  else if(!formDatas.code.startsWith("SMALL")) {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    // errors1["code"] = "This is not a valid Jumbo roll code";
    setNotFound(true);
  }


  
  setErrors(errors1);
  return formIsValid;
  
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validateForm()) {
      console.log('Form is valid, proceed with API call');
      apiCall(formDatas.code);
    } else {
      console.log('Form is invalid, do not submit');
    }
  };

  return (
    <div>
<Row>
    <Col md="12">
      <Card>
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
              <Col md="8">
                <FormGroup>
                  <Label>Small</Label>
                  <Input 
                   name="code" 
                   id="name"
                   type="text" 
                   placeholder="Enter Roll Code" 
                   onChange={handleChange} 
                   className={errors.code ? "is-invalid":""}
                     />
                     { formDatas.code === '' && errors.code &&  <FormText className="text-danger">{errors.code}</FormText>}
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                 <Button type="submit" className="btn my-btn-color-yellow" style={{marginTop:"28px"}}>
                     Find
                 </Button>
                </FormGroup>
              </Col>
              <Col md="12">
              {notFound?<div className="my-btn-color-temp"  style={{background: 'rgb(231 94 53)',textAlign:'center',border: '2px solid black',color:'white',marginBottom:'2px',padding:'40px'}}>
                    <div>
                      <i className="bi bi-emoji-frown my-trash-color" style={{fontSize:'25px'}}/>
                    </div>
                    Small Roll Code entered is not valid.
               </div>
              :null} 
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

export default FindaRoll;
