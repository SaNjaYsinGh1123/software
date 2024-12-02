import React,{ useState,useEffect} from 'react';
import { Table ,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  } from 'reactstrap';
import PropTypes from 'prop-types';

const Products = (props) => {
  const {orderID,data1,data2,data3,data4,data5} = props;

  const [data, setData] = useState([]);

  console.log('in product',orderID);

  function getGrainNameById(grainId) {
    const Name = data1.find(item => item.id === grainId);
    // console.log('a1',Name);
    return Name ? Name.name : 'Unknown grain';
  }

  function getFabricNameById(fabricId) {
    const Name = data2.find(item => item.id === fabricId);
    // console.log('a1',Name);
    return Name ? Name.name : 'Unknown fabric';
  }
  function getFabricColorNameById(fabricId,fabricColorId) {
    const Name = data2.find(item => item.id === fabricId);
    let FabricColor = null;
    if(Name){
       FabricColor = Name.fabriccolors.find(item => item.id === fabricColorId);
    }
    // console.log('a1',Name);
    return FabricColor ? FabricColor.name : 'Unknown fabricColor';
  }

  function getQualityNameById(qualityId) {
    const Name = data3.find(item => item.id === qualityId);
    // console.log('a1',Name);
    return Name ? Name.name : 'Unknown quality';
  }

  function getColorNameById(colorId) {
    const Name = data4.find(item => item.id === colorId);
    // console.log('a1',Name);
    return Name ?  Name.name : 'Unknown color';
  }
  function getHsnNameById(hsnId) {
    // console.log('dataX',data5)
    const Name = data5.find(item => item.id === hsnId);
    // console.log('a1',Name);
    return Name ?  Name.name : 'Unknown hsn';
  }

  
  const productwithNames = data.map(product => ({
    ...product,
    grainName: getGrainNameById(product.grain_id),
    fabricName: getFabricNameById(product.fabric_id),
    fabricColorName: getFabricColorNameById(product.fabric_id,product.fabric_color_id),
    qualityName: getQualityNameById(product.quality_id),
    colorName: getColorNameById(product.color_id),
    hsnName: getHsnNameById(product.hsn_id)
  }));


  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/products/?order_id=${orderID}`, {
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
      // console.log("responsejson in products",result);
      const resultFiltered = result.products.filter(product => product.ref_product_id === '0');
      setData(resultFiltered);

    };
    fetchData();  
  },[]);

  return (
    <Card>
         <CardTitle tag="h4" className="mb-0 text-white">
           </CardTitle>
          
           <CardBody>
           {productwithNames.map((product) => (
                <div key={product.id} className='table-margin'>
                    <Table className='table-margin-zero order-table-button' size="sm">
                      
                      <Row  style={{background:'#e3e3e3',padding:'2px'}}>
                        <Col md="2">
                          <div style={{margin:'5px 0px'}}>
                            <div className='fix-wid-1'><i className="bi-menu-button-wide-fill my-eye-color" style={{fontSize:'20px',marginRight:'1px'}}/><span style={{fontWeight:'900'}}> Product {product.id}</span></div> 
                          </div>
                        </Col>
                        <Col md="10" style={{padding:'5px 0px'}}>

                          {/* <Button  className="btn mybtncustomer btn-secondary" outline color="info"> Planned: 2000.00m</Button>
                          <Button  className="btn mybtncustomer btn-secondary" outline color="danger"> Mfd Length: 996.70m</Button>
                          <Button  className="btn mybtncustomer btn-secondary" outline color="info"> Dispatched: 0.00m</Button>
                          <Button  className="btn mybtncustomer btn-secondary" outline color="danger"> Actual Pending: 3.30m</Button>
                          <Button  className="btn mybtncustomer btn-secondary" outline color="info"> Delivery Date: 20 Dec, 2021</Button>
                          <button type='button' className="btn mybtncustomer my-btn-color mr-1"> Total: 1000m</button> */}
                        </Col>
                      </Row>
                      
                    </Table>
          
                    <div>
                      <Table className='table-margin-zero ' responsive size="sm">
                              <thead>
                            <tr>
                                <th colSpan={20}>
                                  <p style={{background:'#777',textAlign:'center',color:'white',marginBottom:'0px'}}> Front Side </p>
                                </th>
                            </tr>
                            <tr >
                              <th scope="col">Grain</th>
                              <th scope="col">Color</th>
                              <th scope="col">Quality</th>
                              <th scope="col">Thickness</th>
                              <th scope="col">Fabric</th>
                              <th scope="col">FabricColor</th>
                              <th scope="col">HSN</th>
                              <th scope="col">Price($)</th>
                              <th scope="col">Tax</th>
                              <th scope="col">Embossing</th>
                              <th scope="col">Printing</th>
                              <th scope="col">CIR.</th>
                              <th scope="col">AT</th>
                            </tr>
                      </thead>

                      <tbody>
                      
                          <tr>
                          <td title={product.grainName}>{product.grainName}</td>
                          <td title={product.colorName}>{product.colorName}</td>
                          <td title={product.qualityName}>{product.qualityName}</td>
                          <td title={product.thickness}>{product.thickness}</td>
                          <td title={product.fabricName}>{product.fabricName}</td>
                          <td title={product.fabricColorName}>{product.fabricColorName}</td>
                          <td title={product.hsnName}>{product.hsnName}</td>
                          <td title={product.price}>{product.price}</td>
                          <td title={product.tax_rate}>{product.tax_rate}%</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                        </tr>
                      </tbody>
                    
                      </Table>  
                    </div>
                </div>
                ))}
   </CardBody>
   </Card>
   
   
  );
};

export default Products;
Products.propTypes = {
  orderID: PropTypes.string.isRequired,
  data1: PropTypes.array.isRequired,
  data2: PropTypes.array.isRequired,
  data3: PropTypes.array.isRequired,
  data4: PropTypes.array.isRequired,
  data5: PropTypes.array.isRequired,
};