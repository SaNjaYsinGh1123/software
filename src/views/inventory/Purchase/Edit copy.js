import React,{useEffect,useState} from 'react';
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
import {useLocation, useNavigate} from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertFromRaw,EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import './editor.scss';
import DashCard from '../../../components/dashboard/dashboardCards/DashCard';
// import ComponentCard from '../../components/ComponentCard';

const Add = () => {
  const location = useLocation();
  const navigate= useNavigate();
const {vendor_id:vendorId,address_id:addressId,purchase_number:purchaseNumber,purchase_description:purchaseDescription,purchase_document_file_path:purchaseDocumentFilePath,vendor_invoice_number:vendorInvoiceNumber,vendor_invoice_file_path:vendorInvoiceFilePath,purchase_date:purchaseDate,purchaseadditionaldocuments,purchaserawmaterials} = location.state || {}; // Default to an empty object if state is undefined 
const [data1, setData1] = useState([]);
const [data2, setData2] = useState([]);
const [data3, setData3] = useState([]);
const [data4, setData4] = useState([]);
const [errors, setErrors] = useState({});
const [items2, setItems2] = useState(purchaserawmaterials);
const [categoryText, setCategoryText] = useState([]);

  const content = {
    "blocks": [
      {
          "key": "4oo9e",
          "text": " jhbjmb,jjmn jftujtf",
          "type": "header-five",
          "depth": 0,
          "inlineStyleRanges": [
              {
                  "offset": 0,
                  "length": 20,
                  "style": "color-rgb(97,189,109)"
              },
              {
                  "offset": 0,
                  "length": 20,
                  "style": "fontfamily-Times New Roman"
              },
              {
                  "offset": 0,
                  "length": 20,
                  "style": "SUPERSCRIPT"
              },
              {
                  "offset": 0,
                  "length": 20,
                  "style": "STRIKETHROUGH"
              },
              {
                  "offset": 0,
                  "length": 20,
                  "style": "fontsize-96"
              }
          ],
          "entityRanges": [],
          "data": {}
      }
  ],
  "entityMap": {}
  };

  const [compdoc, setCompdoc] = useState(purchaseadditionaldocuments);
  const [contentState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(content)));
  const [htmlContent, sethtmlContent] = useState('');



  
  const [formDatas, setFormDataS] = useState({
    vendorId,
    addressId,
    purchaseNumber,
    purchaseDescription,
    purchaseDocumentFilePath,
    vendorInvoiceNumber,
    vendorInvoiceFilePath,
    purchaseDate,
  });
  
  const onContentStateChange = (c) => {
    console.log('contentState',c);
    const htmlContent1 = draftToHtml(c);
    console.log('html',htmlContent1);
    console.log('htmlcontent',htmlContent);

    sethtmlContent(htmlContent1);

    setEditorState(c);
  };

  // const [data2, setData2] = useState([
  //   {
  //     id:'1',
  //     name:'black'
  //   },
  //   {
  //     id:'2',
  //     name:'white'
  //   }
  // ]);

// const [selectedType, setSelectedType] = useState('');

const handleChange = (e) => {
  const { name, value } = e.target;
  console.log('hi')
  setFormDataS(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const addCompdoc= () => {
  const newItems = compdoc.slice();
  newItems.push({name:'',file_path:''})
  setCompdoc(newItems);
  setFormDataS(prevState => ({
    ...prevState,
    CompanyDocuments: newItems
  }));
};


const removeCompdoc = index => {
  const newItems = compdoc.slice();
  newItems.splice(index, 1);
  setCompdoc(newItems);
  setFormDataS(prevState => ({
    ...prevState,
    CompanyDocuments: newItems
  }));
};

const handleCompdoc = (index, e) => {
  const { name , value} = e.target;
  const newItems = compdoc.slice();
  console.log("data",index,newItems);
  newItems[index][name] = value;
  setCompdoc(newItems);
  setFormDataS(prevState => ({
    ...prevState,
    CompanyDocuments: newItems
  }));
};




const addItem2 = () => {
  console.log('mega',items2);
  const newItems = items2.slice();
  newItems.push({raw_material_id: "",
  purchaserawmaterialdetails: [
      {
          id: "",
          type: "",
          vendor_reference_number: "",
          quantity_in_kg: "",
          quantity_in_mtr: ""
      }]})
  console.log('mega',newItems);
  setItems2(newItems);
};

const removeItem2 = index => {
  const newItems = items2.slice();
  newItems.splice(index, 1);
  const newCategoryText= categoryText.slice();
  newCategoryText.splice(index,1);
  setItems2(newItems);
  setCategoryText(newCategoryText);
};


  const handleInputChange2 = (index,dataItem,event) => {
    const {name,value} = event.target;
      
      const newItems = items2.slice();
      console.log("10",newItems);
      newItems[index][name] = value;
      setItems2(newItems);

      console.log('1',dataItem);
      console.log('2 ',data4 );
      const a1 = data4.filter(item => item.id === dataItem.raw_material_id);
      console.log('3 ',a1[0]);
      console.log('4 ',data2);
      const category = data2.filter(item => item.id === a1[0].category_id);
      console.log('5 ',category[0].name);
      const subcategory =   category[0].subcategories.filter(item => item.id === a1[0].sub_category);
      console.log('6 ',subcategory[0].name);
      const catsub = `${category[0].name}/${subcategory[0].name}`
      console.log('7',catsub);
      // console.log('element',category[0].name,subcategory[0].name);
      const newCategoryText = categoryText.slice();
      console.log('8',categoryText);
      newCategoryText[index] = catsub;
      console.log('9',newCategoryText);
      setCategoryText(newCategoryText);
  };

  const addItem3 = (index) => {
    console.log('mega',items2);
    const newItems = items2.slice();
    newItems[index].purchaserawmaterialdetails.push({ type: "",vendor_reference_number: "",quantity_in_kg: "",quantity_in_mtr: ""})
    console.log('mega',newItems);
    setItems2(newItems);
  };
  
  const removeItem3 = (index,index3) => {
    const newItems = items2.slice();
    newItems[index].purchaserawmaterialdetails.splice(index3, 1);
    setItems2(newItems);
  };
  
  
    const handleInputChange3 = (index,index3, event) => {
      const {name,value} = event.target;
      const newItems = items2.slice();
      console.log("data2",index,name,value,newItems);
      newItems[index].purchaserawmaterialdetails[index3][name] = value;
      console.log('hybrid',newItems);
      setItems2(newItems);
    };

  async function apiCall() {
    try {
      
        // const formData = new FormData();
        // formData.append('name', formDatas.name);
        // formData.append('iso_code', formDatas.isoCode);
        // formData.append('isd_code', formDatas.isdCode);

        console.log('item2',items2);
        // console.log('dataX',formDatas);
      

        const filtered2 = items2.filter((temp) => {
          return temp.raw_material_id !== '' 
        });

   
        const filtered3 = filtered2.map((temp)=>{
           const hybrid = temp.purchaserawmaterialdetails.filter((temp1)=>{
            return (temp1.type !== '' && temp1.vendor_reference_number !== '' && temp1.quantity_in_kg !== '') &&(temp1.quantity_in_mtr !== '');
        })
        return {raw_material_id:temp.raw_material_id,purchaserawmaterialdetails:hybrid }
      });
        // const filtered1 = formDatas.CompanyDocuments.filter((temp)=>{
        //   return temp.name !== '';
        // });

        console.log('formdataX',formDatas);
        console.log('filtered2',filtered3);
        console.log('final', JSON.stringify({
              order_id:'2',
              template_id:'2',
              grain_id: formDatas.grain,
              fabric_id: formDatas.fabricId,
              fabric_color_id: formDatas.fabricColorId.id,
              quality_id: formDatas.qualityId,
              color_id: formDatas.colorId,
              hsn_id: formDatas.hsnId,
              quantity: formDatas.quantity,
              price: formDatas.PricePerUnit,
              thickness: formDatas.Thickness,
              tax_rate: formDatas.TaxRate,
              delivery_date: formDatas.deliveryDate,
              customer_item_reference: formDatas.CustomerItemRefernce,
              is_factory_surplus_product: '1',
              is_online_product: '1',
              is_trashed:  '0',
              product_additional_treatment: filtered2,
        }));

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/products`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              order_id:'2',
              template_id:'2',
              grain_id: formDatas.grain,
              fabric_id: formDatas.fabricId,
              fabric_color_id: formDatas.fabricColorId.id,
              quality_id: formDatas.qualityId,
              color_id: formDatas.colorId,
              hsn_id: formDatas.hsnId,
              quantity: formDatas.quantity,
              price: formDatas.PricePerUnit,
              thickness: formDatas.Thickness,
              tax_rate: formDatas.TaxRate,
              delivery_date: formDatas.deliveryDate,
              customer_item_reference: formDatas.CustomerItemRefernce,
              is_factory_surplus_product: '1',
              is_online_product: '1',
              is_trashed:  '0',
              product_additional_treatment: filtered2,
            }),
        });

        const dataZ = await response.json();
        console.log("dataapi",dataZ)
        if (response.ok) {


          navigate('/order/factory-surplus');
            
        } 
            // Handle any errors, such as showing an error message to the user
            console.error("Authentication failed:", dataZ.message);
            return null;
      
    } catch (error) {
        console.error("Network error:", error);
        return null;
    }
}

const validateForm = () => {
  let formIsValid = true;
  const errors1 = {};

  if(formDatas.grain === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["grain"] = "Please select a grain.";
  }

  if(formDatas.fabricId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["fabricId"] = "Please select a fabric.";
  }
  if(formDatas.qualityId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["qualityId"] = "Please select a quality.";
  }
  if(formDatas.colorId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["colorId"] = "Please select a color.";
  }
  if(formDatas.hsnId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["hsnId"] = "Please select a hsn.";
  }
  


  // ... repeat for other fields ...

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

  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    // setSelectedType(e.target.value);
      setFormDataS(prevState => ({
        ...prevState,
        [name]: value
      }));
   
    
    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
  };

  useEffect(()=>{

    const Itemsetter = async() =>{
      const newCategory = items2.map((d)=>{
        console.log('d',d);
        console.log('data4',data4);
        const a1 = data4.find(item => item.id === d.raw_material_id);
        console.log('a1',a1);
        const category = data2.find(item=> item.id === a1.category_id);
        console.log('category',category);
        const subcategory =category.subcategories.find(item => item.id === a1.sub_category); 
        console.log('subcategory',subcategory);
        const catsub = `${category.name}/${subcategory.name}`
        console.log('catsub',catsub);
         return catsub;
      })

      console.log('newcatgory',newCategory);
      setCategoryText(newCategory);
    }
    if(data2.length > 0 && data4.length >0){
      Itemsetter();
    }  
  },[data2,data4])

  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData1 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/vendors', {
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
      console.log("data1 vendor",result.vendor);
      const resultX = result.vendor.slice();
      resultX.push({id:'x',company_name:'Choose'});
      setData1(resultX); 
    };
    const fetchData2 = async () => {
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
      console.log("data2 category",result.categories);
      // const resultX = result.fabrics.slice();
      // resultX.push({id:'x',name:'Choose'});
      setData2(result.categories);
    };
    const fetchData3 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/addresses', {
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
      console.log("data3 addresses",result.addresses);
      const resultX = result.addresses.slice();
      resultX.push({id:'x',name:'Choose'});
      setData3(resultX);
    };

    const fetchData4 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/rawmaterials', {
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
      console.log("data4 rawmaterials",result.rawmaterials);
      // const resultX = result.qualities.slice();
      // resultX.push({id:'x',name:'Choose'});
      setData4(result.rawmaterials);
    };

    fetchData4();
    fetchData3();
    fetchData2();
    fetchData1();

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
                  <Col md="10" className=''>
                    <FormGroup>
                      <Label>Vendor Details</Label>
                      <Input type="select" 
                         name="vendorId" 
                         value={formDatas.vendorId}
                        onChange={handleTypeChange}
                        className={errors.grain ? "is-invalid" : ""}
                        >
                           {data1.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.company_name}</option>
                           })}
                      </Input>
                      {errors.grain && (
                        <FormText className="text-danger">{errors.grain}</FormText>
                      )}
                      
                    </FormGroup>
                  </Col>

                

                  <Col md="10">
                    <FormGroup>
                      <Label>Vendor Address</Label>
                      <Input type="select" 
                         name="addressId" 
                         value={formDatas.addressId}
                        onChange={handleTypeChange}
                        className={errors.qualityId ? "is-invalid" : ""}
                        >
                           {data3.map((item)=>{
                          
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.qualityId && (
                        <FormText className="text-danger">{errors.qualityId}</FormText>
                      )}
                    </FormGroup>
                  </Col>

                 <Row>
                  <table className="table">        
                  <thead>
                   
                        <tr>
                        <Row className='mt-4'>
                          <Col md="10">
                              <td>Upload Document</td>
                          </Col>
                          <Col md="2">
                            <Button type="button" className='btn-success' onClick={addCompdoc}>+</Button>
                          </Col>
                        </Row>
                        </tr>
                      </thead>
          
              <tbody>
              {compdoc.map((item, index) => (
                  <tr key={item.id}>
                    <Row>
                      <Col md="4"><Input name="name" value={item.name} type="text" onChange={e => handleCompdoc(index, e)} placeholder="" /></Col>
                      <Col md="6"><Input name="file_path"  type="file" onChange={e => handleCompdoc(index, e)} placeholder="" /></Col>
                      <Col md="1"><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeCompdoc(index)}>X</button></Col>
                    </Row>
                    
                  </tr>
                ))}
       
              </tbody>
            </table>
                 
                 </Row>
                

                 

                <Row>
                  <Col md="12">
                    <DashCard title="Additional Documents" >
                        <Editor
                          defaultEditorState={contentState}
                          wrapperClassName="demo-wrapper mb-0"
                          editorClassName="demo-editor border mb-4 edi-height"
                          onContentStateChange={onContentStateChange}
                        />
                        {/* <Input type="textarea" raw={4} disabled value={JSON.stringify(contentState, null, 4)} /> */}
                    </DashCard>
                  </Col>
                  {/* <Col md="12">
                    <div className="editor-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  </Col> */}
                </Row>

                <Row>
                  {/* <Col md="8">
                    <Label>Raw Materials</Label>
                  </Col> */}
                  <table className="table">        
                     <thead>
                        <tr>
                          <Row>
                            <Col md="10"><th className='noborder'>Raw Materials</th></Col>
                            <Col md="2">
                              <Button type="button" className='btn-success' onClick={addItem2}>Add More</Button>
                            </Col>
                          </Row>
                        </tr>
                      </thead>
          
                    <tbody>
                    {items2.map((dataItem, index) => (
                        <tr key={dataItem.id}>
                          <Row>
                            <Col md="10">
                                  <Input type="select" 
                                    name="raw_material_id" 
                                    value={dataItem.raw_material_id}
                                    onChange={e => handleInputChange2(index,dataItem, e)}
                                    
                                    >
                                      {data4.map((item1)=>{
              
                                        return <option key={item1.id} value={item1.id}>{item1.name}</option>
                                      })}
                                  </Input>
                                  <Row> 
                                  <table className="table">        
                                    <thead className='noborder'>
                                        <tr className='noborder'>
                                          <Row>
                                            <Col md="10"><th className='noborder'>Category:{categoryText[index]} </th></Col>
                                          </Row>
                                        </tr>
                                      </thead>
                
                                      <tbody>
                                      {dataItem.purchaserawmaterialdetails.map((item3, index3) => (
                                          <tr key={item3.id}>
                                            <Row>
                                              <Col md="2">
                                                <Input type="select" 
                                                  name="type" 
                                                  value={item3.type}
                                                  onChange={e => handleInputChange3(index,index3, e)}
                                                  
                                                  >
                                                    {data4.map((item1)=>{
                            
                                                      return <option key={item1.id} value={item1.id}>{item1.name}</option>
                                                    })}
                                                </Input>
                                              </Col>
                                              <Col md="3"><Input name="vendor_reference_number" value={item3.vendor_reference_number} type="text" onChange={e => handleInputChange3(index,index3, e)} placeholder="" /></Col>
                                              <Col md="3"><Input name="quantity_in_kg" value={item3.quantity_in_kg} type="text" onChange={e => handleInputChange3(index,index3, e)} placeholder="" /></Col>
                                              <Col md="3"><Input name="quantity_in_mtr" value={item3.quantity_in_mtr} type="text" onChange={e => handleInputChange3(index,index3, e)} placeholder="" /></Col>
                                              <Col md="1"><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem3(index,index3)}>X</button></Col>
                                            </Row>
                                            
                                          </tr>
                                        ))}
                                        <Row>
                                            <Col md="10"><th className='noborder'></th></Col>
                                            <Col md="2">
                                              <Button type="button" className='btn-success' onClick={()=>addItem3(index)}>Add More</Button>
                                            </Col>
                                          </Row>
                                      </tbody>
                                    </table>
                                  </Row>

                              </Col>
                            <Col md="2"><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem2(index)}>X</button></Col>
                          </Row>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Row>
                <Row style={{borderTop:'1px solid black',marginTop:'10px'}}>
                  <Col md="12">
                    <DashCard title="Other Information" >
                    <Col md="8">
                        <FormGroup>
                          <Label>Purchase Number</Label>
                          <Input type="text" 
                          name="purchaseNumber" 
                          id="name"
                          placeholder="Enter name" 
                          value={formDatas.purchaseNumber}
                          onChange={handleChange}
                            />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                   </Col>
                    <Col md="8">
                        <FormGroup>
                          <Label>Upload Purchase Document</Label>
                          <Input type="file" 
                          name="purchaseDocumentFilePath" 
                          id="name"
                          placeholder="Enter name" 
                          onChange={handleChange} 
                            />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                   </Col>
                    <Col md="8">
                        <FormGroup>
                          <Label>Vendor Invoice Number</Label>
                          <Input type="text" 
                          name="vendorInvoiceNumber" 
                          id="name"
                          placeholder="Enter name" 
                          value={formDatas.vendorInvoiceNumber}
                          onChange={handleChange} 
                            />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                   </Col>
                    <Col md="8">
                        <FormGroup>
                          <Label>Upload Invoice</Label>
                          <Input type="file" 
                          name="vendorInvoiceFilePath" 
                          id="name"
                          placeholder="Enter name" 
                          onChange={handleChange} 
                            />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                   </Col>
                    <Col md="8">
                        <FormGroup>
                          <Label>Purchase Date</Label>
                          <Input type="text" 
                          name="purchaseDate" 
                          id="name"
                          placeholder="Enter name" 
                          value={formDatas.purchaseDate}
                          onChange={handleChange} 
                            />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                   </Col>
                    </DashCard>
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
             
           </CardBody>
          
          
           
         </Card>
       </Col> 
     </Row>
     
   </div>

   
   
  );
};

export default Add;