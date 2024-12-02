import React ,{useState,useEffect} from 'react';
import {
} from 'reactstrap';
// import { useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';

const JumbotronComponent = (props) => {
  // const location = useLocation();
  const [data,setData] = useState({});


  // console.log('locationHYBRID',location.state,props)

   useEffect(()=>{
    const fetchData = async ()=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/addresses/${props.addressId}`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
   console.log('responsejsonHYBRID',result);
   if(result){
     setData(result);
   }
  }
    fetchData();
  },[]);
  
  console.log('data',data);

  return (
    <>
                            <ComponentCard5 >
                               <div className="order-view-page-flex-temp">
                                <div>{data?.address_type_name}</div> 
                                <div>{data?.address_alias}</div> 
                                <div>{data?.address_line_1}</div> 
                                <div>{data?.address_line_2}</div> 
                                <div>{data?.city_name}</div> 
                                <div>{data?.state_name} -{data?.gst?.slice(0,2)}</div>
                                <div>{data?.pincode}, {data?.country_name}</div> 
                                {/* <div> GST No. : {data?.gst}</div>  */}
                                <div><span className='production-plan-page-collape-heading' > GST No. </span>: {data.gst}</div> 
                              </div>                    
                          </ComponentCard5>
                        
                    
     
         
    </>
  );
};

export default JumbotronComponent;

JumbotronComponent.propTypes = {
  addressId: PropTypes.string.isRequired
};