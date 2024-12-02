import React ,{useState,useEffect} from 'react';
import {
  Table
} from 'reactstrap';
import { useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import 'react-table-v6/react-table.css';

const JumbotronComponent = (props) => {
  const location = useLocation();
  const [data1,setData1] = useState('');
  const [data2,setData2] = useState('');
  const [data3,setData3] = useState('');
  const [data4,setData4] = useState('');
  const { data } = props;

  // console.log('locationHYBRID',location.state,props)

   useEffect(()=>{

    const fetchDataforCity = async (id)=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/cities/${id}?is_trashed=0`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
  //  console.log('responsejsonHYBRID',result);
   if(result.length !==0){
     setData1(result[0].name);
   }
  }
    const fetchDataforState = async (id)=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/states/${id}?is_trashed=0`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
  //  console.log('responsejsonHYBRID',result);
   if(result.length !==0){
    setData2(result[0].name);
  }
  }

    const fetchDataforAddressType = async (id)=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/addresstypes/${id}?is_trashed=0`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
  //  console.log('responsejsonHYBRID',result);
   if(result.length !==0){
    setData3(result[0].name);
  }
  }

    const fetchDataforCountry = async (id)=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/countries/${id}?is_trashed=0`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
  //  console.log('responsejsonHYBRID',result);
   if(result.length !==0){
    setData4(result[0].name);
  }
  }

    const fetchData = async ()=>{
     
    if(data){
      fetchDataforCity(data.city_id);
      fetchDataforAddressType(data.address_type_id);
      fetchDataforState(data.state_id);
      fetchDataforCountry(data.country_id);
    }
  }
    fetchData();
  },[]);
  
  // console.log('data',data);

  return (
    <>

                               <div className="order-view-page-flex-temp">
                                <div>{data3}</div> 
                                <div>{data.address_alias}</div> 
                                <div>{data.address_line_1}</div> 
                                <div>{data.address_line_2}</div> 
                                <div>{data1}</div> 
                                <div>{data2} - 06</div> 
                                <div>{data.pincode}, {data4}</div> 
                                <div> GST No. : {data.gst}</div> 
                              </div>
                                {data.addressrepresentatives ? data.addressrepresentatives.map((item)=>{
                                  return <>
                                   <Table className='table-margin-zero ' key={item} responsive size="sm">
                                      <thead>
                                        <tr>
                                          <th colSpan={20}>
                                          <p style={{background:'aliceblue',marginBottom:'0px'}}><i className="bi bi-person my-bell-color" style={{fontSize:'19px'}}/>Representatives Details</p>
                                          </th>
                                          </tr>
                                        <tr>
                                          <th scope="col">Name</th>
                                          <th scope="col">Email</th>
                                          <th scope="col">Designation</th>
                                          <th scope="col">Mobile</th>
                                          
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.designation}</td>
                                            <td>{item.mobile} </td>
                                        </tr>
                                      
                                      </tbody>
                              
                                   </Table>
                                   </>
                                }):""
                              }  
    </>
  );
};

export default JumbotronComponent;

JumbotronComponent.propTypes = {
  data: PropTypes.string.isRequired
};
