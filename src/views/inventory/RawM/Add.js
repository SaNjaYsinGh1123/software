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
  const {name:CityName,unit,category_id:categoryId,sub_category:subCategoryId} = location.state || {}; // Default to an empty object if state is undefined

  const [selectedType, setSelectedType] = useState(categoryId|| '');
  const [selectedType1, setSelectedType1] = useState(subCategoryId|| '');
  const [selectedType2, setSelectedType2] = useState(unit|| '');

  

  const [data, setData] = useState([]);
  const [sub, setSub] = useState([]);

  const unitOptions = [{ id:1,name:'KG'},
  { id:2,name:'MTR'},
  { id:3,name:'Both'},
]
  const [formDatas, setFormDataS] = useState({
    name:CityName,
    categoryId,
    subCategoryId,
    unit
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
    const a1 = data.find(category => category.id === e.target.value);
    console.log('a2',a1);
    setSub(a1.subcategories);
    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
    setFormDataS(prevState => ({
      ...prevState,
      categoryId: e.target.value
    }));
  };

  const handleTypeChange1 = (e) => {
    setSelectedType1(e.target.value);
    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
    setFormDataS(prevState => ({
      ...prevState,
      subCategoryId: e.target.value
    }));
  };
  const handleTypeChange2 = (e) => {
    setSelectedType2(e.target.value);
    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
    setFormDataS(prevState => ({
      ...prevState,
      unit: e.target.value
    }));
  };
  
  async function apiCall() {
    try {

      const formData = new FormData();
      formData.append('name', formDatas.name);
      formData.append('category_id',formDatas.categoryId);
      formData.append('sub_category',formDatas.subCategoryId);
      formData.append('unit',formDatas.unit);

        const token = localStorage.getItem('userToken');
        console.log('country_id',formDatas)
        const response = await fetch(`https://factory.teamasia.in/api/public/rawmaterials`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`
            },
          
            body:formData,
           
        });
        const data1 = await response.json();
        console.log("dataapi",data1)
        if (response.ok) {


          navigate('/inventory/raw-materials');
            
        } 
            // Handle any errors, such as showing an error message to the user
            console.error("Authentication failed:", data1.message);
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

  // const fetchData2 = async () => {
  //   const token = localStorage.getItem('userToken');
  //   // console.log('token',token);
  //   const response = await fetch(`https://factory.teamasia.in/api/public/rawmaterials`, {
  //     method: 'GET', 
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   });
  //   // console.log('result',response);
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   const result = await response.json();
  //   console.log("responsejson2",result);
  //   setData2(result.countries); 
  // };

  const fetchData = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch('https://factory.teamasia.in/api/public/categories', {
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
    const a1 = result.categories[0];
    // const a2 = a1.subcategories.find(subcategory => subcategory.id === subCategoryId);
    // console.log('r',a2);
    setFormDataS(prevState => ({
      ...prevState,
      unit: '1',
      categoryId: a1.id,
      subCategoryId:a1.subcategories[0].id
    }));
    setSub(a1.subcategories);
    setData(result.categories);
  };

  fetchData()
  // fetchData2();


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
                 <Col md="8">
                    <FormGroup>
                      <Label>Raw Material Unit</Label>
                      <Input type="select" 
                         name="countryId" 
                         value={selectedType2}
                        onChange={handleTypeChange2}>
                           {unitOptions.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>

                 <Col md="8">
                    <FormGroup>
                      <Label>Category</Label>
                      <Input type="select" 
                         name="countryId" 
                         value={selectedType}
                        onChange={handleTypeChange}>
                           {data.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
                  <Col md="8">
                    <FormGroup>
                      <Label>Sub Category</Label>
                      <Input type="select"
                         name="countryId" 
                         value={selectedType1}
                        onChange={handleTypeChange1}>
                           {sub.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>
                 <Col md="8">
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