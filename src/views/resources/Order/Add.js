import React,{ useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import './editor.scss';
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
import {useNavigate } from 'react-router-dom';
import { stateFromHTML } from 'draft-js-import-html';
import DashCard from '../../../components/dashboard/dashboardCards/DashCard';



const Edit = () => {
  const navigate = useNavigate();
  

  const [data1,setData1] = useState(false)
  const [data2,setData2] = useState(false)
//   const content1 = `
//   <h5 style="color: rgb(97, 189, 109); font-family: 'Times New Roman'; font-size: 96px;">
//     Your text with <s>strikethrough</s> and <sup>superscript</sup>.
//   </h5>
// `;
const [formDatas, setFormDataS] = useState({
  name:'',
  Status:'',
  ShortDescription:'',
  SmsContent:'',
  EmailContent:'',
  Subject:'',
  isTrashed:'0'
});

  const content1 = formDatas.EmailContent;

// Convert HTML to Draft.js ContentState
  const contentFromHTML = stateFromHTML(content1);

  console.log('convertFromRaw(content)',contentFromHTML ,EditorState.createWithContent(contentFromHTML));

  const [contentState, setEditorState] = useState(EditorState.createWithContent(contentFromHTML));
  const [htmlContent, sethtmlContent] = useState('');
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);

  const onContentStateChange = (c) => {
    console.log('contentState',c);
    const htmlContent1 = draftToHtml(c);
    console.log('html',htmlContent1);
    console.log('htmlcontent',htmlContent);

    sethtmlContent(htmlContent1);

    setEditorState(c);
  };


  const checkboxclick1 = ()=>{
       console.log('hi',data1);
       setData1(!data1);
       console.log('by',data1);
  }
  const checkboxclick2 = ()=>{
    console.log('hi',data2);
    setData2(!data2);
    console.log('by',data2);
}




const handleChange = (e) => {
  const { name, value } = e.target;
  setFormDataS(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const closer =()=>{
  setErrorMessageFromApi([]);
}

async function apiCall() {
  const isDefault= data1?1:0;
  const isNotify = data2?1:0;
  try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/orderstatuses`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
         
          body: JSON.stringify({
            name:formDatas.name,
            status:formDatas.Status,
            is_default_status:isDefault,
            is_notify:isNotify,
            short_description:formDatas.ShortDescription,
            sms_content:formDatas.SmsContent,
            email_content:htmlContent,
            subject:formDatas.Subject,
            is_trashed:formDatas.isTrashed
          }),
      });

      const data = await response.json();
      console.log("dataapi",data,response.status);
        if (response.status === 201) {
          navigate('/resources/order-status');
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

const handleSubmit = async (event) => {
event.preventDefault();
console.log('event',event);
apiCall();

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
                  
                 <Col md="6">
                   <FormGroup>
                     <Label>Display Name</Label>
                     <Input   
                      type="text" 
                      name="name" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.name}
                      onChange={handleChange}
                     />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="6">
                   <FormGroup>
                     <Label>Status</Label>
                     <Input   
                      type="text" 
                      name="Status" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.Status}
                      onChange={handleChange}
                     />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="6">
                   <FormGroup>
                     {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                     <Input type="checkbox" checked={ data1} onChange={checkboxclick1}  />
                     <Label className='mx-1'> Use this as default status for Orders</Label>
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="6">
                   <FormGroup>
                     {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                     <Input type="checkbox" checked={ data2} onChange={checkboxclick2}  />
                     <Label className='mx-1'> Notify Customers via Email and SMS</Label>
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>

                 <Col md="12">
                   <FormGroup>
                     <Label>Short Description</Label>
                     <Input   
                      type="textarea" 
                      name="ShortDescription" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.ShortDescription}
                      onChange={handleChange}
                     />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="12">
                   <FormGroup>
                     <Label>SMS Content</Label>
                     <Input   
                      type="textarea" 
                      name="SmsContent" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.SmsContent}
                      onChange={handleChange}
                     />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="12">
                   <FormGroup>
                     <Label>Subject</Label>
                     <Input
                      type="text"   
                      name="Subject" 
                      id="name" 
                      placeholder="Enter" 
                      value={formDatas.Subject}
                      onChange={handleChange}
                     />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
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