import React,{memo, useState,useEffect} from 'react';
import {

  Button,

} from 'reactstrap';

import PropTypes from 'prop-types';

const JumbotronComponent = (props) => {
  const {Refreshkey,line,planDate} = props;
 const [lineD,setLineD]  = useState(undefined);

//  console.log(line,Refreshkey,planDate);
  useEffect(() => {
    
    // Fetch the data from the API
    const fetchLine4Details = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/productionplan/getPlanDates?line_id=${line}&plan_date=${planDate}`, {
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
      // console.log("responsejson1 fetchLineDetails",result.planDates);
      setLineD(result?.planDates?.[0]);
    };  
    fetchLine4Details();
  },[Refreshkey]);

  return (
  <>
  {
     lineD?.length !== 0 ? <>
         <tr>
            <th scope="col"><Button className='my-btn-color'>{`Total Jumbo Rolls => Count : ${lineD?.details.total_jumbo_roll_count}, Qty : ${lineD?.details.total_jumbo_roll_quantity} m`}</Button></th>
            <th scope="col"><Button className='my-btn-color-red'>{`Total Small Rolls => Count : ${lineD?.details.total_small_roll_count}, Qty : ${lineD?.details.total_small_roll_quantity} m`}</Button></th>
        </tr> </>:''
  }
    
        </>
  );
};

export default memo(JumbotronComponent);

JumbotronComponent.propTypes = {
  Refreshkey: PropTypes.number.isRequired,
  line: PropTypes.number.isRequired,
  planDate: PropTypes.string.isRequired,
};