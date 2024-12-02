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
import { useNavigate } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errors,setErrors] = useState({});
  const [selectedType, setSelectedType] = useState('1');
  const [formDatas, setFormDataS] = useState({
    InvoiceNo:'',
    InvoiceValue:'',
    OrderId:'',
    ItemQuantity:'',
    isTrashed : '0'
  });
  
  const handleTypeChange = (e) => {
    console.log('selectedType',e.target.value);
    setSelectedType(e.target.value);
  };

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
      formData.append('image_name','sanjay');
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
      console.error('Error:',data.messages,response);
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

      const formData = new FormData();
      formData.append('invoice_no',formDatas.InvoiceNo);
      formData.append('invoice_value',formDatas.InvoiceValue);
      formData.append('order_id',formDatas.OrderId);
      formData.append('invoice_unit',selectedType);
      formData.append('item_quantity',formDatas.ItemQuantity);
      formData.append('file_path',finalimagepath);
      formData.append('image_id',finalimageId);
      formData.append('is_trashed','0');

      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/invoices`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`
          },
         
          body: formData
      });
     
      const data = await response.json();
      console.log("dataapi",data,response.status);
      if (response.status === 201) {
        navigate('/operations/invoices');
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
       setErrorMessageFromApi(["Network error"]);
      return null;
    }
}

const validateForm=()=>{
  let formIsValid =true;
  const errors1 ={};
  
  if(formDatas.InvoiceNo === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["InvoiceNo"] = "Required";
  }
  if(formDatas.InvoiceValue === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["InvoiceValue"] = "Required";
  }
  if(formDatas.OrderId === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["OrderId"] = "Required";
  }
  if(formDatas.ItemQuantity === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["ItemQuantity"] = "Required";
  }
  if(imageFile === null) {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["imageFile"] = "Required";
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
                  
                 <Col md="10">
                   <FormGroup>
                   <Label>Invoice No.</Label>
                     <Input        
                     type="text" 
                      name="InvoiceNo" 
                      id="name" 
                      placeholder="Enter invoice number" 
                      value={formDatas.InvoiceNo}
                      onChange={handleChange} 
                      className={formDatas.InvoiceNo === '' && errors.InvoiceNo ? "is-invalid":""}
                      />
                      {formDatas.InvoiceNo === '' && errors.InvoiceNo &&  <FormText className="text-danger">Required</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="5">
                   <FormGroup>
                   <Label>Order Id</Label>
                     <Input        
                     type="number" 
                      name="OrderId" 
                      id="name" 
                      placeholder="Enter number" 
                      value={formDatas.OrderId}
                      onChange={handleChange}
                        className={formDatas.OrderId === '' && errors.OrderId ? "is-invalid":""}
                        />
                        {formDatas.OrderId === '' && errors.OrderId &&  <FormText className="text-danger">Required</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="5">
                   <FormGroup>
                   <Label>Item Quantity</Label>
                     <Input        
                     type="number" 
                      name="ItemQuantity" 
                      id="name" 
                      placeholder="Enter number" 
                      value={formDatas.ItemQuantity}
                      onChange={handleChange} 
                      className={formDatas.ItemQuantity === '' && errors.ItemQuantity ? "is-invalid":""}
                      />
                      { formDatas.ItemQuantity === '' && errors.ItemQuantity &&  <FormText className="text-danger">Required</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="5">
                   <FormGroup>
                     <Label>Invoice Unit</Label>
                     <Input type="select" name="Select Gender" value={selectedType} onChange={handleTypeChange}>
                        <option value="1">Mtr</option>
                        <option value="2">Kg</option>
                        <option value="3">Sq Mtr</option>
                      </Input>
                     <FormText className="muted"></FormText>
                   </FormGroup>
                  
                 </Col>
                 <Col md="5">
                   <FormGroup>
                   <Label>Invoice Value</Label>
                     <Input        
                     type="text" 
                      name="InvoiceValue" 
                      id="name" 
                      placeholder="Enter invoice number" 
                      value={formDatas.InvoiceValue}
                      onChange={handleChange} 
                      className={formDatas.InvoiceValue === '' && errors.InvoiceValue ? "is-invalid":""}
                      />
                      {formDatas.InvoiceValue === '' && errors.InvoiceValue &&  <FormText className="text-danger">Required</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="8">
                   <FormGroup>
                    <Label>File Upload</Label>
                     <Input type="file" 
                            name="imageFile" 
                            onChange={handleImageChange} 
                            className={imageFile === null && errors.imageFile ? "is-invalid":""}/>
                     
                     {!errors.imageFile &&  <FormText className="muted">Only jpg, jpeg, png</FormText>}
                     {imageFile === null && errors.imageFile &&  <FormText className="text-danger">Required</FormText>}
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