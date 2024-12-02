import React,{ useState,useEffect} from 'react';
import { Table} from 'reactstrap';
import PropTypes from 'prop-types';


const JumbotronComponent = (props) => {

  const {orderID} = props;
  const [data, setData] = useState([]);


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
      // console.log("responsejson in orderProduct",result);
      const resultFiltered = result.products.filter(product => product.ref_product_id === '0');
      setData(resultFiltered);
    };
    fetchData();  
  },[]);
  
  return (
    <Table size='sm' className="order-page-table order-page-table-border-not">
    
              <tbody>
                {data.map((product) => (
                  <tr key={product.id}>
                  <td title={product.grain_name}>{product.grain_name}</td>
                  <td title={product.quality_name}>{product.quality_name}</td>
                  <td title={product.thickness}>{product.thickness}</td>
                  {/* <td title={product.fabricName}>{product.fabricName}</td> */}
                  <td title={product.color_name}>{product.color_name}</td>
                  <td title={product.quantity}>{product.quantity}</td>
                  <td title="996.70m">996.70m</td>
                  <td title="491.10m"> 491.10m</td>
                  <td title="0.00m">0.00m</td>
                  <td title="3.30m">3.30m</td>
                  <td title="3.30m">3.30m</td>
                </tr>
                ))}
              </tbody>
            
              </Table>  
   


   
   
  );
};

export default JumbotronComponent;

JumbotronComponent.propTypes = {
  orderID: PropTypes.string.isRequired
};