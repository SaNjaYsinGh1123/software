import React, { useState, useEffect } from 'react';
import { Table} from 'reactstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const JumbotronComponent = (props) => {
  const { productID } = props;
  const navigate = useNavigate();
  const [data, setData] = useState({ front_side: {}, back_side: [] });
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);

  function getGrainNameById(grainId) {
    const Name = data1.find(item => item.id === grainId);
    return Name ? Name.name : 'Unknown grain';
  }

  function getFabricNameById(fabricId) {
    const Name = data2.find(item => item.id === fabricId);
    return Name ? Name.name : 'Unknown fabric';
  }

  function getFabricColorNameById(fabricId, fabricColorId) {
    const Name = data2.find(item => item.id === fabricId);
    let FabricColor = null;
    if (Name) {
      FabricColor = Name.fabriccolors.find(item => item.id === fabricColorId);
    }
    return FabricColor ? FabricColor.name : 'Unknown fabricColor';
  }

  function getQualityNameById(qualityId) {
    const Name = data3.find(item => item.id === qualityId);
    return Name ? Name.name : 'Unknown quality';
  }

  function getColorNameById(colorId) {
    const Name = data4.find(item => item.id === colorId);
    return Name ? Name.name : 'Unknown color';
  }

  function getHsnNameById(hsnId) {
    const Name = data5.find(item => item.id === hsnId);
    return Name ? Name.name : 'Unknown HSN';
  }

  useEffect(() => {
    const fetchData1 = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://factory.teamasia.in/api/public/grains', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData1(result.grains);
    };

    const fetchData2 = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://factory.teamasia.in/api/public/fabrics', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData2(result.fabrics);
    };

    const fetchData3 = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://factory.teamasia.in/api/public/qualities', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData3(result.qualities);
    };

    const fetchData4 = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://factory.teamasia.in/api/public/colors', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData4(result.colors);
    };

    const fetchData5 = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://factory.teamasia.in/api/public/hsns', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData5(result.hsns);
    };

    const fetchData = async (backProductData) => {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/products/pair/${backProductData.ref_product_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('result product',result)
      setData(result);
    };


     const checkProductFrontBack = async()=> {
      try {
          const token = localStorage.getItem('userToken');
          const response = await fetch(`https://factory.teamasia.in/api/public/products/${productID}`, {
            method: 'GET', 
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
  
           if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          console.log("responsejson1",result);
          if(result.is_online_product === '1' && result.ref_product_id === '0'){
            navigate(-1)
          }else{
            fetchData(result);
          }
          return null;
  
      } catch (error) {
        console.log('error',error);
          return null;
      }
  }
    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
    fetchData5();
    fetchData();
    checkProductFrontBack();
  }, [productID]);

  if (!data.front_side || !data.back_side) {
    return <div>Loading...</div>;
  }

  return (
    <>
    
        <div className='table-margin' >
          <Table className='table-margin-zero order-table-button' size="sm" style={{ background: '#e3e3e3', padding: '2px' }}>
            
             
                <div style={{ margin: '5px 0px' }}>
                  <div className='fix-wid-1'>
                    <i className="bi-menu-button-wide-fill my-eye-color" style={{ fontSize: '20px', marginRight: '1px' }} />
                    <span style={{ fontWeight: '900' }}> Product {data.front_side.id}</span>
                  </div>
                </div>
             
              
          
          </Table>
          <Table className='table-margin-zero' responsive size="sm">
            <thead>
              <tr>
                <th colSpan={13} style={{ background: '#777', textAlign: 'center', color: 'white' }}>{data.front_side.is_online_product === '1' && data.front_side.ref_product_id === '0' && 'Front Side'}{data.front_side.is_online_product === '0' && data.front_side.ref_product_id === '0' && ''}</th>
              </tr>
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
                <td title={getGrainNameById(data.front_side.grain_id)}>{getGrainNameById(data.front_side.grain_id)}</td>
                <td title={getColorNameById(data.front_side.color_id)}>{getColorNameById(data.front_side.color_id)}</td>
                <td title={getQualityNameById(data.front_side.quality_id)}>{getQualityNameById(data.front_side.quality_id)}</td>
                <td title={data.front_side.thickness}>{data.front_side.thickness}</td>
                <td title={getFabricNameById(data.front_side.fabric_id)}>{getFabricNameById(data.front_side.fabric_id)}</td>
                <td title={getFabricColorNameById(data.front_side.fabric_id, data.front_side.fabric_color_id)}>{getFabricColorNameById(data.front_side.fabric_id, data.front_side.fabric_color_id)}</td>
                <td title={getHsnNameById(data.front_side.hsn_id)}>{getHsnNameById(data.front_side.hsn_id)}</td>
                <td title={data.front_side.price}>{data.front_side.price}</td>
                <td title={data.front_side.tax_rate}>{data.front_side.tax_rate}%</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>
            </tbody>
          </Table>
        </div>
        {data.back_side.length > 0 && (
          <div>
            <Table className='table-margin-zero' responsive size="sm">
              <thead>
                <tr>
                  <th colSpan={13} style={{ background: '#777', textAlign: 'center', color: 'white' }}>Back Side</th>
                </tr>
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
                {data.back_side.map((back) => (
                  <tr key={back.id}>
                    <td title={getGrainNameById(back.grain_id)}>{getGrainNameById(back.grain_id)}</td>
                    <td title={getColorNameById(back.color_id)}>{getColorNameById(back.color_id)}</td>
                    <td title={getQualityNameById(back.quality_id)}>{getQualityNameById(back.quality_id)}</td>
                    <td title={back.thickness}>{back.thickness}</td>
                    <td title={getFabricNameById(back.fabric_id)}>{getFabricNameById(back.fabric_id)}</td>
                    <td title={getFabricColorNameById(back.fabric_id, back.fabric_color_id)}>{getFabricColorNameById(back.fabric_id, back.fabric_color_id)}</td>
                    <td title={getHsnNameById(back.hsn_id)}>{getHsnNameById(back.hsn_id)}</td>
                    <td title={back.price}>{back.price}</td>
                    <td title={back.tax_rate}>{back.tax_rate}%</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>N/A</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
    </>
  );
};

export default JumbotronComponent;

JumbotronComponent.propTypes = {
  productID: PropTypes.string.isRequired,
};
