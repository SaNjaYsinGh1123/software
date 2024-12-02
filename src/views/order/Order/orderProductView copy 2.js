import React,{ useState,useEffect} from 'react';
import { Table ,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button
  } from 'reactstrap';
import PropTypes from 'prop-types';

const Products = (props) => {
  const {orderID} = props;

  const [data, setData] = useState([]);
  const [data7, setData7] = useState([]);
  const [data8, setData8] = useState([]);

  console.log('in product',orderID);
  const printing  = (productprints)=>{
    console.log('productprints',productprints);
    
   const printArray =  productprints.map((item)=> {
      let str = ''
      const design = data7.find((d)=> d.id === item.design_id);
      const shade = data8.find((s)=> s.id === item.shade_id);
      
      console.log('design,shade',design,shade)
      if(design){
        str += `${design.code}/${design.code}/`
      }
      if(shade){
        str += shade.name
      }
      return str
    }  
)

    return printArray.length > 0? printArray:[];
  }

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
      // const resultFiltered = result.products.filter(product => product.ref_product_id === '0');

      const products = result.products.slice();

      // Create an array to store the paired products
      const pairedProducts = [];

      // Create a function to find the back side of a product
      const findBackside = (frontId) => {
          return products.find(product => product.ref_product_id === frontId);
      };

      // Iterate over the products to create pairs
      products.forEach(product => {
          if (product.ref_product_id === "0") {
              // If the product is a front side, create a pair object
              const pair = {
                  front: product,
                  back: findBackside(product.id)
              };
              pairedProducts.push(pair);
          }
      });

      console.log('pairedProducts',pairedProducts);

      // setData(resultFiltered);
      setData(pairedProducts);

    };

    
    const fetchData7 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/designs', {
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
      const resultX = result.designs.slice();
      // resultX.push({id:'x',design_id:'x',code:'Choose'});
      setData7(resultX);
    };

    const fetchData8 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/shades', {
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
      const resultX = result.shades.slice();
      // resultX.push({id:'x',shade_id:'x',name:'Choose'});
      setData8(resultX);
    };

    fetchData8();
    fetchData7();




    fetchData();  
  },[]);

  return (
    <Card>
         <CardTitle tag="h4" className="mb-0 text-white">
           </CardTitle>
          
           <CardBody>
           {data.length > 0 ? data.map(({ front, back }) => (
          <div key={front.id} className='table-margin'>
            <Table className='table-margin-zero order-table-button' size="sm" style={{ background: '#e3e3e3', padding: '2px'}}>
              <Row style={{ background: '#e3e3e3', padding: '2px' }} >
                <Col md="2">
                  <div style={{ margin: '5px 0px' }}>
                    <div className='fix-wid-1'><i className="bi-menu-button-wide-fill my-eye-color" style={{ fontSize: '20px', marginRight: '1px' }} /><span style={{ fontWeight: '900' }}> Product {front.id}</span></div>
                  </div>
                </Col>
                <Col md="10" style={{ padding: '5px 0px',display:'flex',justifyContent:'space-around'}}>
                          <Button  className="btn mybtncustomer btn-secondary" outline color="info"> Planned: 2000.00m</Button>
                          <Button  className="btn mybtncustomer btn-secondary" outline color="danger"> Mfd Length: 996.70m</Button>
                          <Button  className="btn mybtncustomer btn-secondary" outline color="info"> Dispatched: 0.00m</Button>
                          <Button  className="btn mybtncustomer btn-secondary" outline color="danger"> Actual Pending: 3.30m</Button>
                          <Button  className="btn mybtncustomer btn-secondary" outline color="info"> Delivery Date: 20 Dec, 2021</Button>
                          <button type='button' className="btn mybtncustomer my-btn-color mr-1"> Total: 1000m</button>
                </Col>
              </Row>
            </Table>
            <div>
              <Table className='table-margin-zero ' responsive size="sm">
                <thead>
                  <tr>
                    <th colSpan={20}>
                      <p style={{ background: '#777', textAlign: 'center', color: 'white', marginBottom: '0px' }}> Front Side </p>
                    </th>
                  </tr>
                  <tr>
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
                    <td title={front.grain_name}>{front.grain_name}</td>
                    <td title={front.color_name}>{front.color_name}</td>
                    <td title={front.quality_name}>{front.quality_name}</td>
                    <td title={front.thickness}>{front.thickness}</td>
                    <td title={front.fabric_name}>{front.fabric_name}</td>
                    <td title={front.fabric_color_name}>{front.fabric_color_name}</td>
                    <td title={front.hsn_name}>{front.hsn_name}</td>
                    <td title={front.price}>{front.price}</td>
                    <td title={front.tax_rate}>{front.tax_rate}%</td>
                    <td title={front.emboss_name}>{front.emboss_name}</td>
                    <td>{printing(front.productprints).map(item=> <div>{item}</div>)}</td>
                    <td>N/A</td>
                    <td>N/A</td>
                  </tr>
                </tbody>
              </Table>
              {back && (
                <Table className='table-margin-zero ' responsive size="sm">
                  <thead>
                    <tr>
                      <th colSpan={20}>
                        <p style={{ background: '#777', textAlign: 'center', color: 'white', marginBottom: '0px' }}> Back Side </p>
                      </th>
                    </tr>
                    <tr>
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
                    <td title={back.grain_name}>{back.grain_name}</td>
                    <td title={back.color_name}>{back.color_name}</td>
                    <td title={back.quality_name}>{back.quality_name}</td>
                    <td title={back.thickness}>{back.thickness}</td>
                    <td title={back.fabric_name}>{back.fabric_name}</td>
                    <td title={back.fabric_color_name}>{back.fabric_color_name}</td>
                    <td title={back.hsn_name}>{back.hsn_name}</td>
                    <td title={back.price}>{back.price}</td>
                    <td title={back.tax_rate}>{back.tax_rate}%</td>
                    <td title={back.emboss_name}>{back.emboss_name}</td>
                    <td>{printing(back.productprints).map(item=> <div>{item}</div>)}</td>
                    <td>N/A</td>
                    <td>N/A</td>
                  </tr>
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        )):<div className="my-btn-color-temp"  style={{background: 'rgb(227, 227, 227)',fontWeight: '700',textAlign:'center',color:'black',marginBottom:'2px',padding:'20px'}}> 
                NO PRODUCTS IN THIS ORDER
          </div>}
   </CardBody>
   </Card>
   
   
  );
};

export default Products;
Products.propTypes = {
  orderID: PropTypes.string.isRequired
};