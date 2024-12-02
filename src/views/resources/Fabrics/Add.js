import React,{useState} from 'react';

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
// import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
  const navigate = useNavigate();
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);

  const [errors,setErrors] = useState({});
  // const [items, setItems] = useState([{"fabric_name":''}]);

  // console.log("items",items);
  
  const [formDatas, setFormDataS] = useState({
    name:'',
    isTrashed:'0',
    items:[{"fabric_name":''}]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
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
      default:
            break;
    
        }
  };

  const addItem = () => {
    const newItems = formDatas.items.slice();
    console.log("data",newItems);
    newItems.push({"fabric_name":''})
    setFormDataS(prevState => ({
      ...prevState,
      items: newItems
    }));
    // setItems(newItems);
  };

  const removeItem = index => {
    const newItems = formDatas.items.slice();
    newItems.splice(index, 1);
    // setItems(newItems);
    setFormDataS(prevState => ({
      ...prevState,
      items: newItems
    }));
  };

  const handleInputChange = (index, e) => {
    const newItems = formDatas.items.slice();
    console.log("data",index,newItems);
    newItems[index].fabric_name =  e.target.value;
    console.log('newX',newItems);
    setFormDataS(prevState => ({
      ...prevState,
      items: newItems
    }));

    // setItems(newItems);
  };

  const closer =()=>{
    setErrorMessageFromApi([]);
  }


  async function apiCall() {
    try {
        
        // const filtered = formDatas.items.filter((temp)=>{
        //   return temp.fabric_name !== '';
        // });

        // console.log('filtered',filtered);

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/fabrics`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              name:formDatas.name,
              is_trashed:formDatas.isTrashed,
              fabric_color:formDatas.items
            }),
        });
        const data = await response.json();
        console.log("dataapi",data,response.status);
        if (response.status === 201) {
          navigate('/resources/fabrics');
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
  
  if(formDatas.name === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["name"] = "Required";
  }
  
 formDatas.items.forEach((element) => {
  console.log('element',element);
        if(element.fabric_name === ''){
           formIsValid = false;
    // eslint-disable-next-line dot-notation
          errors1["fabric_name_field"] ="Required"
        }
    });

  console.log('hi',formDatas.items,errors1);
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
                 <Col md="8" >
                   <FormGroup>
                     <Label>Fabric Name</Label>
                     <Input        
                     type="text" 
                      name="name" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.name}
                      onChange={handleChange} 
                      className={errors.name ? "is-invalid":""}
                      />
                      {errors.name &&  <FormText className="text-danger">{errors.name}</FormText>}
                   </FormGroup>
                 </Col>
                 <Row>
                  <Col md="8">
                      <Button disabled className='btn btn-warning'>Colors</Button>
                  </Col>
                  <Col md="2">
                    <Button type="button" className='btn-success' onClick={addItem}>+</Button>
                  </Col>
                </Row>

                 <table className="table">        
                  <thead className='nobordertop'>
                        <tr className='nobordertop'>
                          <Row>
                            <Col md="3"><th className='noborder'>Name</th></Col>
                          </Row>
                        </tr>
                      </thead>
              <tbody>
              {formDatas.items.map((item, index) => (
                  <tr key={item}>
                    <Row>
                      <Col md="8">
                        <Input name="product" 
                               value={item.fabric_name}
                               type="text"
                               onChange={e => handleInputChange(index, e)} 
                               placeholder=""
                               className={errors.fabric_name_field && item.fabric_name === '' ? "is-invalid":""}
                               />
                               {errors.fabric_name_field && item.fabric_name === ''  &&  <FormText className="text-danger">Required</FormText>}
                        </Col>
                      <Col md="1"><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem(index)} disabled={index === 0}>X</button></Col>
                    </Row>
                  </tr>
                ))}
              </tbody>
            </table>
                 <Col md="4">
                   <FormGroup>
                   <Button type="submit" 
                            className="btn my-btn-color" 
                            style={{marginTop:"28px"}}
                            disabled={errors.name}
                    >
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

export default Edit;