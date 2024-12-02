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
import { useLocation,useNavigate  } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [items, setItems] = useState([{"name":''}]);
  const [errors, setErrors] = useState({});
 console.log("items",items);
 console.log("state",location.state);
            


 

  const [formDatas, setFormDataS] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addItem = () => {
    const newItems = items.slice();
    console.log("data",newItems);
    newItems.push({"name":''})
    setItems(newItems);
  };

  const removeItem = index => {
    const newItems = items.slice();
    newItems.splice(index, 1);
    setItems(newItems);
    setFormDataS(prevState => ({
      ...prevState,
      items: newItems
    }));
  };

  const handleInputChange = (index, e) => {
    const newItems = items.slice();
    console.log("data",index,newItems);
    newItems[index].name =  e.target.value;
    console.log('newX',newItems);
    setFormDataS(prevState => ({
      ...prevState,
      items: newItems
    }));

    setItems(newItems);
  };

  async function apiCall() {
    try {
        // const formData = new FormData();
        // formData.append('name', formDatas.name);
        // formData.append('iso_code', formDatas.isoCode);
        // formData.append('isd_code', formDatas.isdCode);
        const filtered = formDatas.items.filter((temp)=>{
          return temp.name !== '';
        })

        console.log('filtered',filtered);

        // console.log('formdata',formData);
        // const formData = new FormData();
        // formData.append('name', formDatas.name);
        // formData.append('is_trashed', '1');
        // formData.append('sub_category', filtered);

        // console.log('json',JSON.stringify({
        //   name:formDatas.name,
        //   is_trashed:'1',
        //   sub_category:filtered
        // }));

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/categories`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              name:formDatas.name,
              is_trashed:'0',
              sub_category:filtered
            }),
        });

        const data = await response.json();
        console.log("dataapi",data,response.status);
        if (response.status === 201) {
          navigate(-1);
        } else {
          console.error("Authentication failed:", Object.values(data.messages.errors));
          if (data.error) {
            setErrorMessageFromApi(Object.values(data.messages.errors));
          }
        }  
        return null;
    } catch (error) {
        console.error("Network error:", error);
        return null;
    }
}

const validateForm = () => {
  let formIsValid = true;
  const errors1 = {};

  formDatas.items.forEach((element) => {
    console.log('element',element);
          if(element.name === ''){
              formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["subName"] ="Required"
          }
      });

  setErrors(errors1);
  return formIsValid;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  if(validateForm()) {
    console.log('Form is valid, proceed with API call');
    apiCall();
  } else {
    console.log('Form is invalid, do not submit');
  }
};

const closer =()=>{
  setErrorMessageFromApi([]);
}

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
                 <Col md="8 mb-4" >
                   <FormGroup>
                     <Label>Name</Label>
                     <Input        
                     type="text" 
                      name="name" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.name}
                      onChange={handleChange} 
                     />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Row>
                  <Col md="8">
                      <Button disabled className='btn btn-warning'>Sub Categories</Button>
                  </Col>
                  <Col md="2">
                    <Button type="button" className='btn-success' onClick={addItem}>+</Button>
                  </Col>
                </Row>

                 <table className="table" style={{marginTop:'10px'}}>        
                  <thead className='nobordertop'>
                        <tr className='nobordertop'>
                          {/* <Row>
                            <Col md="3"><th className='noborder'>Sub Category</th></Col>
                          </Row> */}
                        </tr>
                      </thead>
          
              <tbody>
              {items.map((item, index) => (
                  <tr key={item}>
                    <Row>
                      <Col md="8">
                        <Input 
                          name="product" 
                          value={item.name} 
                          type="text" 
                          onChange={e => handleInputChange(index, e)} 
                          placeholder="" 
                          className={errors.subName && item.name === '' ? "is-invalid":""}
                          />
                          {errors.subName && item.name === ''  &&  <FormText className="text-danger">Required</FormText>}
                      </Col>
                      <Col md="1"><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem(index)}>X</button></Col>
                    </Row>
                  </tr>
                ))}
              </tbody>
            </table>

                 <Col md="4">
                   <FormGroup>
                    <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}>
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