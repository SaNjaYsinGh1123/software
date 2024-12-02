import React,{useState,useEffect} from 'react';

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
import { useLocation,useNavigate } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {id,name:CityName,country_id:CountryId,state_id:StateId} = location.state || {}; // Default to an empty object if state is undefined

  const [selectedType, setSelectedType] = useState(CountryId|| '');
  const [selectedType1, setSelectedType1] = useState(StateId|| '');

  

  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const [formDatas, setFormDataS] = useState({
    name:CityName,
    CountryId,
    StateId
  });

  console.log("formdata",location.state);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('hi')
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
    setFormDataS(prevState => ({
      ...prevState,
      CountryId: e.target.value
    }));
  };

  const handleTypeChange1 = (e) => {
    setSelectedType1(e.target.value);
    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
    setFormDataS(prevState => ({
      ...prevState,
      StateId: e.target.value
    }));
  };
  
  async function apiCall() {
    try {
     
        const token = localStorage.getItem('userToken');
        console.log('country_id',formDatas)
        const response = await fetch(`https://factory.teamasia.in/api/public/cities/${id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          
            body: JSON.stringify({
              name:formDatas.name,
              country_id:formDatas.CountryId,
              state_id:formDatas.StateId,
            }),
        });
        const data = await response.json();
        console.log("dataapi",data)
        if (response.ok) {


          navigate('/resources/cities');
            
        } 
            // Handle any errors, such as showing an error message to the user
            console.error("Authentication failed:", data.message);
            return null;;
      
    } catch (error) {
        console.error("Network error:", error);
        return null;
    }
}

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log('event',event);
  apiCall();

};

useEffect(() => {

  const fetchData2 = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/countries`, {
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
    console.log("responsejson2",result);
    setData2(result.countries); 
  };

  const fetchData3 = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch('https://factory.teamasia.in/api/public/states', {
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
    console.log("responsejson3",result);
    setData3(result.states); 
  };

  fetchData3()
  fetchData2();


},[]);

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
                 <Col md="8">
                   <FormGroup>
                     <Label>Name</Label>
                     <Input type="text" 
                     name="name" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.name}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="6">
                    <FormGroup>
                      <Label>Country</Label>
                      <Input type="select" 
                         name="countryId" 
                         value={selectedType}
                        onChange={handleTypeChange}>
                           {data2.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>State</Label>
                      <Input type="select"
                         name="countryId" 
                         value={selectedType1}
                        onChange={handleTypeChange1}>
                           {data3.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
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