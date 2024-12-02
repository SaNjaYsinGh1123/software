import React,{ useState,useEffect} from 'react';
import { Table} from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard4 from '../../../components/ComponentCard5';


const JumbotronComponent = (props) => {

  const {orderID,formatDate,customerID,customerNameFromManagePlan,addItemToLine} = props;
  const [data, setData] = useState([]);

  //  console.log('removeItemFromLine',removeItemFromLine,addItemToLine);


  
  const productwithNames = data.map(product => ({
    ...product,
    customerNameFromManagePlan,
    customer_id:customerID,
    status_id:'0'
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
      // console.log("responsejson",result);
      // const resultFiltered = result.products.filter(product => product.ref_product_id === '0');
      // setData(resultFiltered);
      setData(result.products);

    };
    fetchData();  
  },[]);

  return (
  <>
    {productwithNames.length > 0 ? productwithNames.map((product) => {
      return  <ComponentCard4 key={product.created_at}>
                <div>
                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.ref_product_id !== '0'? product.ref_product_id: product.id}
                   {/* <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>{product.is_factory_surplus_product !== '0'?'':'factory product'}</button> */}
                   {(product.is_online_product !== '0' || product.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                   {product.is_online_product !== '0' && product.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                   {product.is_online_product === '0' && product.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                    <span style={{marginLeft:'5px',paddingTop:'2px'}}><i className="bi bi-arrow-right-square-fill" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>addItemToLine(product)}></i></span>
                 </div>
       <Table size='sm' className="order-page-table" responsive>
            <tbody>
                 
                  <tr >
                    <td title={product.grain_name}>{product.grain_name}</td>
                    <td title={product.color_name}>{product.color_name}</td>
                    <td title={product.quality_name}>{product.quality_name}</td>
                    <td title={product.fabric_name}>{product.fabric_name}</td>
                    <td title={product.fabric_color_name}>{product.fabric_color_name}</td>
                  </tr>
                  <tr >
                    <td title="">{}</td>
                    <td title="">{}</td>
                    <td title="">{}</td>
                    <td title="">{}</td>
                    <td title={product.thickness}>{product.thickness}mm</td>
                  </tr>
                  <tr >
                    <td title="" colSpan={3}>Additional Treatment :</td>
                  </tr>
                  <tr >
                    <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Delivery Date:</span> {formatDate(product.delivery_date)}</td>
                    <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit: ₹</span> {product.price}</td>
                  </tr>
                  <tr >
                    <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                    <td title="" colSpan={2}> <span className='production-plan-page-collape-heading'>Total Qty:</span> {product.total}m</td>
                  </tr>
                  <tr >
                    <td title="" colSpan={3}> <span className='production-plan-page-collape-heading'>Remaining Qty:</span> {Number(product.total)-Number(product.planned)}m</td>
                    <td title="" colSpan={2}> <span className='production-plan-page-collape-heading'>Planned Qty:</span>{product.planned}m</td>
                  </tr>
                </tbody>
                </Table> 
                </ComponentCard4>
                }):<div className="my-btn-color-temp"  style={{background: '#e0f1f2',textAlign:'center',border: '2px solid black',color:'black',marginBottom:'2px',padding:'20px'}}> 
                        NO PRODUCTS IN THIS ORDER
                  </div>}
  </>

  );
};

export default JumbotronComponent;

JumbotronComponent.propTypes = {
  orderID: PropTypes.string.isRequired,
  customerID: PropTypes.string.isRequired,
  customerNameFromManagePlan: PropTypes.string.isRequired,
  addItemToLine: PropTypes.func.isRequired,
  // removeItemFromLine: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
};