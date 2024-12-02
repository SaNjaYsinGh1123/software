import React ,{ useState } from 'react';

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
import { useLocation, useNavigate } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [imageFile, setImageFile] = useState(null);
  const {id,name:Name,code,description,is_trashed:isTrashed} = location.state || {};  // Default to an empty object if state is undefined
  const [errors,setErrors] = useState({});
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [formDatas, setFormDataS] = useState({
    name:Name,
    code,
    description,
    isTrashed
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
    switch (name){
      case 'code':
          //   if (validationData.some(item => item.code.toLowerCase() === value.toLowerCase().trim())) {
          //     setErrors((prev)=>({...prev,"code": "This name has already been used"}));
          // } else {
          // }
          setErrors((prev)=>({...prev,"code": ""}));
          break;

      case 'name':
          //   if (validationData.some(item => item.name.toLowerCase() === value.toLowerCase().trim())) {
          //     setErrors((prev)=>({...prev,"name": "This name has already been used"}));
          // } else {
          // }
          setErrors((prev)=>({...prev,"name": ""}));
          break;
      
      default:
            break;
    
        }

  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  async function uploadImage(file){
    const token = localStorage.getItem('userToken');
    if(!file){
      return null
    }
    try{
      const formData  = new  FormData();
      formData.append('image_name','team');
      formData.append('image_path[]',file);
      const response = await fetch('https://factory.teamasia.in/api/public/fileuploads',{
          method : 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body:formData,
      });

      const data= await response.json();
      if(response.status === 201){
        console.error('success:',data.messages.image_details[0],response);
        const imageDetails = data.messages.image_details[0]; 
        return imageDetails;
      }
      setErrorMessageFromApi(Object.values(data.messages.errors));
      console.error('Error:',data.message,response);
      return null;
    }catch(error){
      setErrorMessageFromApi(['something went wrong']);
      console.error('Error uploading image:',error);
      return null;
    }
  }

  const closer =()=>{
    setErrorMessageFromApi([]);
  }
  async function apiCall() {
    try {
      const imageDetails = await uploadImage(imageFile);
      let finalimagepath='';
      let finalimageId='';
      
      console.log('imageDetails',imageDetails);
      if(imageDetails){
        finalimagepath = imageDetails.image_path;
        finalimageId = imageDetails.image_id;
      }
      console.log('formdata',formDatas);

      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/faults/${id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
         
          body: JSON.stringify({
            name:formDatas.name,
            code:formDatas.code,
            description:formDatas.description,
            image_path:finalimagepath,
            image_id:finalimageId,
            is_trashed:formDatas.isTrashed,
          }),
      });
     
      const data = await response.json();
      console.log("dataapi",data,response.status);
      if (response.status === 200) {
        navigate('/resources/faults');
      } else {
        console.error("Authentication failed:", Object.values(data.messages.errors));
        if (data.messages && data.messages.errors) {
          setErrorMessageFromApi(Object.values(data.messages.errors));
        }else {
          setErrorMessageFromApi(["Unknown error occurred"]);
        }
      }  
        return null;
    } catch (error) {
      console.log('error',error);
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
  if(formDatas.code === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["code"] = "Required";
  }

  
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

                 <Col md="4">
                   <FormGroup>
                     <Label>Fault Code</Label>
                     <Input        
                     type="text" 
                      name="code" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.code}
                      onChange={handleChange} 
                      className={errors.code ? "is-invalid":""}
                      />
                      {errors.code &&  <FormText className="text-danger">{errors.code}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                     <Label>Fault Name</Label>
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
                 <Col md="8">
                   <FormGroup>
                     <Label>Description</Label>
                     <Input        
                     type="text" 
                      name="description" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.description}
                      onChange={handleChange} 
                     />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="8">
                   <FormGroup>
                     <Label>Fault Image</Label>
                     <Input type="file" onChange={handleImageChange}/>
                     <FormText className="muted">Only jpg, jpeg, png</FormText>
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