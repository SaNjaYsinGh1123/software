import React ,{ useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
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





const generateNodesAndEdges = (data1, x1 = 0, y1 = 50, parentId1 = null, level1 = 0) => {
  const nodes = [];
  const edges = [];

  const traverse = (node, x, y, parentId, level) => {
    const nodeId = `node-${node.id}`;
    if(node.children){
      nodes.push({
        id: nodeId,
        data: { label: node.label },
        position: { x, y },
        style: {
          border: '1px solid #0000001a',
          backgroundColor: 'white',
          color:'#DE5454',
          fontWeight:'700',
          fontSize:'18px',
          cursor: 'pointer',
          fontFamily: 'Muli, "Helvetica", Arial, sans-serif',
          padding: '15px 20px',
          minWidth: '180px',
          maxWidth: '200px',
          textAlign: 'center',
          borderRadius: '12px',
          // border: '1px solid #ddd', 
          background: 'linear-gradient(145deg, #f3f3f3, #ffffff)',
          boxShadow: '0 3px 6px rgba(204, 131, 103, 0.22)',
          whiteSpace: 'pre-wrap', // Ensure text wraps correctly
          overflow: 'hidden',
          lineHeight: '1.5', // Better line height for text readability
        },
      });
    }else{
      nodes.push({
        id: nodeId,
        data: { label: node.label },
        position: { x, y },
        style: {
          border: '1px solid #0000001a',
          backgroundColor: 'white',
          color:'rgb(2 101 129)',
          fontWeight:'700',
          fontSize:'18px',
          cursor: 'pointer',
          fontFamily: 'Muli, "Helvetica", Arial, sans-serif',
          padding: '15px 20px',
          minWidth: '180px',
          maxWidth: '200px',
          textAlign: 'center',
          borderRadius: '12px',
          // border: '1px solid #ddd', 
          background: 'linear-gradient(145deg, #f3f3f3, #ffffff)',
          boxShadow: '0 3px 6px rgba(204, 131, 103, 0.22)',
          whiteSpace: 'pre-wrap', // Ensure text wraps correctly
          overflow: 'hidden',
          lineHeight: '1.5', // Better line height for text readability
        },
      });
    }
    


    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
        animated: true,
        style: { stroke: '#000' },
      });
    }

    if (node.children) {
      node.children.forEach((child, index) => {
        const childX = x + (index - Math.floor(node.children.length / 2)) * 200; // Adjust horizontal spacing
        const childY = y + 150; // Vertical spacing between levels
        traverse(child, childX, childY, nodeId, level + 1);
      });
    }
  };

  traverse(data1, x1, y1, parentId1, level1);

  return { nodes, edges };
};

const BySmallRoll = () => {
 
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [formDatas, setFormDataS] = useState({
    code:'',
  });
  const [errors,setErrors] = useState({});
  const [notFound,setNotFound] = useState(false);
  const [data,setData] = useState();
  const [graph,setGraph] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  
  const closer =()=>{
    setErrorMessageFromApi([]);  
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
          setNotFound(false);
          const dataFrame = {
            id: '2',
            label: `Small Roll SMALL${result?.[0].id}`,
            children: [
              {
                id: '3',
                label: `Order #${result?.[0].id}`,
                children: [
                  {
                    id: '4',
                    label: `Product ${result?.[0]?.product_details.id}`,
                    children: [
                      {
                        id: '5',
                        label: `Plan Date : ${result?.[0].id}`,
                        children: [
                          {
                            id: '6',
                            label: `Jumbo Roll : JUMBO${result?.[0].jumbo_roll_id}`,
                            children: [
                              {
                                id: '7',
                                label: `Small Roll : SMALL${result?.[0].id}`,
                                children: [
                                  {
                                    id: '8',
                                    label: `Dispatched #${result?.[0].id}`,
                                  },
                                ]
                              },
                            ]
                          },
                        ]
                      },
                    ],
                  },
                ],
              },
            ],
           }
          const {nodes,edges} = generateNodesAndEdges(dataFrame);
          setGraph({nodes,edges});
          setData(dataFrame);
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

// Handle node click
const handleNodeClick = (event, node) => {
  alert(`Node clicked: ${node.data.label}`);
  // Add your custom logic here
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
                  <Label>Small Roll</Label>
                  <Input 
                   name="code" 
                   id="name"
                   type="text" 
                   placeholder="Enter Small Roll Code" 
                   onChange={handleChange} 
                   className={errors.code ? "is-invalid":""}
                     />
                     {errors.code &&  <FormText className="text-danger">{errors.code}</FormText>}
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
          {!notFound && data ?
            <div style={{ height: '100vh', width: '100%',background:'#f4f3ef' }}>
              <ReactFlow nodes={graph?.nodes} edges={graph?.edges} fitView onNodeClick={handleNodeClick}>
                <Background color="#f4f3ef" gap={20} />
                <Controls />
              </ReactFlow>
            </div>:null
          }
          
        </CardBody>
      </Card>
    </Col> 
  </Row>
    </div>
  );
};
export default BySmallRoll;