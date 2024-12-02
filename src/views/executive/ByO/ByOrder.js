import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";
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
} from "reactstrap";

// Function to apply dagre layout
const applyDagreLayout = (nodes, edges, direction = "TB") => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 200, height: 100 }); // Adjust node dimensions as needed
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
      targetPosition: "top",
      sourcePosition: "bottom",
    };
  });

  return { nodes: layoutedNodes, edges };
};

const generateNodesAndEdges = (data) => {
  const nodes = [];
  const edges = [];

  const traverse = (node, parentId = null) => {
    const nodeId = `node-${node.id}`;
    nodes.push({
      id: nodeId,
      data: { label: node.label },
      style: {
        border: "1px solid #0000001a",
        backgroundColor: "white",
        color: "#DE5454",
        fontWeight: "700",
        fontSize: "18px",
        cursor: "pointer",
        padding: "15px 20px",
        textAlign: "center",
        borderRadius: "12px",
        boxShadow: "0 3px 6px rgba(204, 131, 103, 0.22)",
        whiteSpace: "pre-wrap",
        lineHeight: "1.5",
      },
    });

    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
        type: "straight", // Ensures straight lines
        animated: true,
        style: { stroke: "#000" },
      });
    }

    if (node.children) {
      node.children.forEach((child) => traverse(child, nodeId));
    }
  };

  traverse(data);
  return { nodes, edges };
};


const ByOrder = () => {
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [formDatas, setFormDataS] = useState({
    code: "",
  });
  const [errors, setErrors] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [graph, setGraph] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closer = () => {
    setErrorMessageFromApi([]);
  };
  
  const productionplannode = (planitem)=>{
    console.log(planitem);

    return (
      {
        id:`${planitem?.planDetails?.[0]?.id}3`,
        label: `Plan Date -${planitem?.planDetails?.[0]?.plan_date}\nLine: -${planitem?.planDetails?.[0]?.line_id}`,
        children: [
          {
            id: `${planitem?.planDetails?.[0]?.id}4`,
            label: `Jumbo Rolls: ${planitem?.planDetails?.[0]?.jumbo_roll_details.length}\nSmall Rolls:${planitem?.planDetails?.[0]?.jumbo_roll_details.length}`,
            children: [
              {
                id: `${planitem?.planDetails?.[0]?.id}5`,
                label: 'Dispatched: 33\nRTD: 0\nFactory Stock: 0',
              },
            ],
          },
        ],
      }
    )
  }



  const productnode = (products) => {
    const pairs = [];
  
    const frontSideProducts = products.filter(product => product.ref_product_id === "0");
    const backSideProducts = products.filter(product => product.ref_product_id !== "0");
  
    frontSideProducts.forEach(front => {
      const back2 = backSideProducts.find(back => back.ref_product_id === front.id);
      pairs.push({
        id: front.id,
        front_side: front,
        back_side: back2,
      });
    });
  
   

    return (
      pairs.map((item) => ({
        id: `${item.id}`,
        label: `Product ${item.id}\nUsed in ${
          Number(item?.front_side?.productionplans?.length || 0) +
          Number(item?.back_side?.productionplans?.length || 0)
        } Plans`,
        children: [
          ...(item?.front_side?.productionplans?.map(planitem => productionplannode(planitem)) || []),
          ...(item?.back_side?.productionplans?.map(planitem => productionplannode(planitem)) || []),
        ],
      }))

    )
  }

  async function apiCall(orderId) {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        `https://factory.teamasia.in/api/public/orders/report/${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 404) {
        setNotFound(true);
      } else if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const result = await response.json();
        setNotFound(false);

         const dataFrame = {
            id: '1',
            label: `Order #${orderId}`,
            children:productnode(result)
          };
          console.log('dataframe',dataFrame);

        const { nodes, edges } = generateNodesAndEdges(dataFrame);
        const layoutedGraph = applyDagreLayout(nodes, edges);
        setGraph(layoutedGraph);
      }
    } catch (error) {
      console.log(error);
      setErrorMessageFromApi(["Network error"]);
    }
  }

  const validateForm = () => {
    let formIsValid = true;
    const errors1 = {};

    if (formDatas.code === "") {
      formIsValid = false;
    // eslint-disable-next-line dot-notation
      errors1["code"] = "Required";
    } else if (Number.isNaN(formDatas.code)) {
      formIsValid = false;
      setNotFound(true);
    }

    setErrors(errors1);
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      apiCall(formDatas.code);
    }
  };

  const handleNodeClick = (event, node) => {
    alert(`Node clicked: ${node.data.label}`);
  };

  return (
    <div>
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="12">
                    {errorMessageFromApi.length !== 0 && (
                      <div
                        style={{
                          background: "#ff9c7a",
                          color: "black",
                          marginBottom: "10px",
                          padding: "5px 10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          Following errors were found:
                          <span onClick={closer} style={{ cursor: "pointer" }}>
                            X
                          </span>
                        </div>
                        <ul>
                          {errorMessageFromApi.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Col>
                  <Col md="8">
                    <FormGroup>
                      <Label>Order No</Label>
                      <Input
                        name="code"
                        id="name"
                        type="text"
                        placeholder="Enter Order No"
                        onChange={handleChange}
                        className={errors.code ? "is-invalid" : ""}
                      />
                      {errors.code && (
                        <FormText className="text-danger">
                          {errors.code}
                        </FormText>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Button
                        type="submit"
                        className="btn my-btn-color-yellow"
                        style={{ marginTop: "28px" }}
                      >
                        Find
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    {notFound ? (
                      <div
                        className="my-btn-color-temp"
                        style={{
                          background: "rgb(231 94 53)",
                          textAlign: "center",
                          border: "2px solid black",
                          color: "white",
                          marginBottom: "2px",
                          padding: "40px",
                        }}
                      >
                        <div>
                          <i
                            className="bi bi-emoji-frown my-trash-color"
                            style={{ fontSize: "25px" }}
                          />
                        </div>
                        Order Number entered is not valid.
                      </div>
                    ) : null}
                  </Col>
                </Row>
              </Form>

              {!notFound && graph ? (
                <div
                  style={{
                    height: "100vh",
                    width: "100%",
                    background: "#f4f3ef",
                  }}
                >
                  <ReactFlow
                    nodes={graph.nodes}
                    edges={graph.edges.map((edge) => ({
                      ...edge,
                      type: "smoothstep", // Use the default straight edge type
                    }))}
                    fitView
                    onNodeClick={handleNodeClick}
                  >
                    <Background color="#f4f3ef" gap={20} />
                    <Controls />
                  </ReactFlow>
                </div>
              ) : null}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ByOrder;
