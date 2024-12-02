import React,{ useState,useEffect} from 'react';
import { Table} from 'reactstrap';
import PropTypes from 'prop-types';
// import ComponentCard4 from '../../../components/ComponentCard5';


const JumbotronComponent = (props) => {

  const {productID} = props;
  const [data, setData] = useState([]);
  const [data7, setData7] = useState([]);
  const [data8, setData8] = useState([]);
  
  // console.log('productID',productID)

  const printing  = (productprints)=>{
    // console.log('productprints',productprints);
    
   const printArray =  productprints.map((item)=> {
      let str = ''
      const design = data7.find((d)=> d.id === item.design_id);
      const shade = data8.find((s)=> s.id === item.shade_id);
      
      // console.log('design,shade',design,shade)
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
      const response = await fetch(`https://factory.teamasia.in/api/public/products/${productID}`, {
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
      // console.log("responsejson in s..11111",result);
      setData([result]);
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
  <>
    
    {data.map((pro) => {
      return  <Table key={pro.id} size='sm' className="table-margin-zero" responsive>
                  <thead>
                    <tr>
                      <th scope="col">Grain</th>
                      <th scope="col">Color</th>
                      <th scope="col">Quality</th>
                      <th scope="col">Thickness</th>
                      <th scope="col">Fabric</th>
                      <th scope="col">Fabric Color</th>
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
                    <td title={pro.grain_name}>{pro.grain_name}</td>
                    <td title={pro.color_name}>{pro.color_name}</td>
                    <td title={pro.quality_name}>{pro.quality_name}</td>
                    <td title={pro.thickness}>{pro.thickness}</td>
                    <td title={pro.fabric_name}>{pro.fabric_name}</td>
                    <td title={pro.fabric_color_name}>{pro.fabric_color_name}</td>
                    <td title={pro.hsn_name}>{pro.hsn_name}</td>
                    <td title={pro.price}>{pro.price}</td>
                    <td title={pro.tax_rate}>{pro.tax_rate}%</td>
                    <td title={pro.emboss_name}>{pro.emboss_name}</td>
                    <td>{printing(pro.productprints).map(item=> <div key={item}>{item}</div>)}</td>
                    <td title={pro.customer_item_reference}>{pro.customer_item_reference !== ''?pro.customer_item_reference:'N/a'}</td>
                    <td>{(pro?.productadditionaltreatments)?.map(item=> <div>{item.description}</div>)}</td>
                    </tr>
                </tbody>
                </Table> 
                })}
  </>

  );
};

export default JumbotronComponent;

JumbotronComponent.propTypes = {
  productID: PropTypes.string.isRequired,
};