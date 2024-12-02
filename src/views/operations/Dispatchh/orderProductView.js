import React,{ useState,useEffect} from 'react';
import { 
  Card,
  CardBody,
  CardTitle,

  } from 'reactstrap';
import PropTypes from 'prop-types';
import ProductPairView from './ProductPairView'

const Products = (props) => {
  const {orderID} = props;
  const [data, setData] = useState([]);
  // console.log('in product',orderID);



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
      // console.log('pairedProducts',resultFiltered);
      // setData(resultFiltered);
      setData(resultFiltered);

    };

    





    fetchData();  
  },[]);

  return (
    <Card>
         <CardTitle tag="h4" className="mb-0 text-white">
           </CardTitle>
          
           <CardBody>
           {data.length > 0 ? data.map((item) => (
             <div key={item.id}>
               <ProductPairView productID={item?.id}/>
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