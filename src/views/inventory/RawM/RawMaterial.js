import React,{ useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Col,
  Row,
} from 'reactstrap';

import ComponentCard from '../../../components/ComponentCard5';

const RawMaterial = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [newData, setNewData] = useState([]);

  // const data = [
  //   { RawMaterialName:'WP.matty_165g_110gsm-Red' , InputItem: 'Both', CategoryName: 'RM-Textile', SubCategoryName: 'Woven'},
  //   { RawMaterialName:'WP.matty_165g_110gsm-Blue' , InputItem: 'Both', CategoryName: 'RM-Textile', SubCategoryName: 'Woven'},
  //   { RawMaterialName:'WP.matty_165g_110gsm-Red' , InputItem: 'Both', CategoryName: 'RM-Textile', SubCategoryName: 'Woven'},
  //   { RawMaterialName:'WP.matty_165g_110gsm-Blue' , InputItem: 'Both', CategoryName: 'RM-Textile', SubCategoryName: 'Woven'},
  //   { RawMaterialName:'WP.matty_165g_110gsm-Red' , InputItem: 'Both', CategoryName: 'RM-Textile', SubCategoryName: 'Woven'},
  //   { RawMaterialName:'WP.matty_165g_110gsm-Blue' , InputItem: 'Both', CategoryName: 'RM-Textile', SubCategoryName: 'Woven'},
  //   { RawMaterialName:'WP.matty_165g_110gsm-Red' , InputItem: 'Both', CategoryName: 'RM-Textile', SubCategoryName: 'Woven'},
  //   { RawMaterialName:'WP.matty_165g_110gsm-Blue' , InputItem: 'Both', CategoryName: 'RM-Textile', SubCategoryName: 'Woven'},
  //   { RawMaterialName:'WP.matty_165g_110gsm-Red' , InputItem: 'Both', CategoryName: 'RM-Textile', SubCategoryName: 'Woven'},
  //   { RawMaterialName:'WP.matty_165g_110gsm-Blue' , InputItem: 'Both', CategoryName: 'RM-Textile', SubCategoryName: 'Woven'},
  

  
  // ];
  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };

  const handleEditClick = (item) => {
    // Navigate to the edit page with the item's id
    // Navigate(`/resources/address-types/edit/${itemId}`);
    navigate('/inventory/raw-materials/edit', { state: item });
  };
  const handleEditAdd = () => {
    // Navigate to the edit page with the item's id
    // Navigate(`/resources/address-types/edit/${itemId}`);
    navigate('/inventory/raw-materials/add');
  };
  const handleDeleteClick = async (itemId) => {
    try {
      // Call your API endpoint to delete the item
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/rawmaterials/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Filter out the deleted item from your data state
      const updatedData = data.filter((item) => item.id !== itemId);
      setData(updatedData);
  
      console.log('Item deleted successfully');
    } catch (error) {
      //only checks for error that are generated by fetch function , and cors 
      console.error('Failed to delete the item', error);
    }
  };
  
  // function getSubCategoryNameById(stateId) {
  //   const countryName = data2.find(country => country.subcategories.id === stateId);
  //   console.log('state',countryName);
  //   return countryName ? countryName.subcategories.id : 'Unknown Country';
  // }
  
  // This function finds the name of the country by its ID
  function getCategoryNameById(categoryId,subCategoryId) {
    const a1 = data2.find(category => category.id === categoryId);
    
    console.log('a1',a1);
    const subcategory = a1.subcategories.find(sub => sub.id === subCategoryId);
    console.log('subcategory',subcategory);

    return {
      a1 : a1 ? a1.name : 'Unknown Country',
      subcategory: subcategory ? subcategory.name : 'Unknown Country'
    
    };
  }

  // ...
const unitMapper =(unitId)=>{
  console.log('unitId',unitId);
  if(unitId === '1')
  {
    return 'KG'
  }
  if(unitId === '2'){
    return 'MTR'
  }
  return 'Both'
}

  const NewDataMapper = () =>{
    console.log('hi data',data);
    const newData1 = data.map(item =>{
      const red = getCategoryNameById(item.category_id, item.sub_category);
      console.log("red",red);
      // const [a1,subcategoryName] = getCategoryNameById(item.category_id, item.sub_category);
  
      // console.log("subcategoryName",subcategoryName);
      
      return {
        ...item ,
       "categoryName": red.a1,
       "subcategoryName":red.subcategory
      };
      // subcategoryName: getSubCategoryNameById(item.category_id,item.sub_category)
    });
    console.log('hi newdata',newData1);
    setNewData(newData1);
    console.log('hi');

  }
  


// useEffect to watch data and data2 changes
useEffect(() => {
  // Ensure both data and data2 are not empty
  if (data.length && data2.length) {
    NewDataMapper();
  }
}, [data, data2]); // Dependency array

// Rest of the code remains the same


  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/rawmaterials', {
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
      console.log("responsejson",result);
      setData(result.rawmaterials); 
    };

    const fetchData2 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/categories', {
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
      console.log("responsejson2",result);
      setData2(result.categories); 
    };
    
   
 
    
    fetchData();
    fetchData2();
    // NewDataMapper();

    // Promise.all([fetchData(), fetchData2()])
    // .then(() => {
    //   NewDataMapper();
    // })
    // .catch(error => {
    //   console.error('Error fetching data:', error);
    // });

  },[]);

  return (
    <ComponentCard
    title=""
    subtitle={
      <p>
        {/* Overview of the projects */}
      </p>
    }
  >
    <Row>
      <Col md="8">
        <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => handleEditAdd()}>
          Add Raw Material
        </Button>
      </Col>
    </Row>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <table className="table" style={tableStyle}>
              <thead>
              <tr>  
                <th>Raw Material Name</th>
                <th>Input Item</th>
                <th>Category Name</th>
                <th>Sub Category Name</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
                {newData.map((raw) => (
                  <tr key={raw}>
                    <td>{raw.name}</td>
                  <td>{unitMapper(raw.unit)}</td>
                  <td>{raw.categoryName}</td>
                  <td>{raw.subcategoryName}</td>
                  <td>
                    {/* Action buttons or icons */}
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleEditClick(raw)} ><i className="bi bi-pencil-fill my-pen-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-printer-fill my-printer-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleDeleteClick(raw.id)}><i className="bi bi-trash-fill my-trash-color" /></button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
            
    </div>
   
  </ComponentCard>

   
   
  );
};

export default RawMaterial;