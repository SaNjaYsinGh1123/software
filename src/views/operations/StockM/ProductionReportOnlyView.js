import React, {useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-table-v6/react-table.css';
import {Table} from 'reactstrap'
import ComponentCard5 from '../../../components/ComponentCard5';

const ProductionReport = () => {
  const location= useLocation();
  const { productionPlanId = 0 } = location.state;
  const [flag,setFlag] = useState(false);
  const [customerPlanData,SetcustomerPlanData] = useState({});
  const [data, setData] = useState({
    customer_id: "0",
    production_plan_id: "0",
    line_id: "0",
    order_id: "0",
    product_id: "0",
    signature: "",
    status: "2",
    date:"00-00-0000",
    production_level_parameter: [

        //production
        {
            parameter_name:"Top Coat (GSM)",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Final Weight (GSM)",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Line Speed (M/Min)",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Cell Structure",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Surface",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Bonding",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },

        //process

        {
            parameter_name:"Temperature Z1 O1",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z2 O1",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z1 O1",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z2 O1",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },

        {
            parameter_name:"Temperature Z1 O2",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z2 O2",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z1 O2",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z2 O2",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },

        {
            parameter_name:"Temperature Z1 O3",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z2 O3",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z3 O3",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z4 O3",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z1 O3",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z2 O3",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z3 O3",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z4 O3",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Top Coat Weight (g)",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },

        {
            parameter_name:"Temperature Z1 O4",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z2 O4",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z3 O4",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z4 O4",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z5 O4",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z6 O4",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z1 O4",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z2 O4",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z3 O4",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z4 O4",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z5 O4",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z6 O4",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Foam Coat Weight (g)",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },

        {
            parameter_name:"Temperature Z1 O5",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z2 O5",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z3 O5",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z4 O5",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z5 O5",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Temperature Z6 O5",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z1 O5",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z2 O5",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z3 O5",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z4 O5",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z5 O5",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        },
        {
            parameter_name:"Blower RPM Z6 O5",
            initial_expected:"",
            initial_actual:"",
            after_500_actual:"",
            after_1000_actual:"",
            after_1500_actual:"",
            after_2000_actual:""
        }
    ]
});

// console.log(data);








useEffect(()=>{
  const fetchBomReport = async ()=>{
    try{
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      // const response = await fetch(`https://factory.teamasia.in/api/public/bomreports/?production_plan_id=${productionPlanId}`, {
      //   method: 'GET', 
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //   }
      // });
      
      console.log(productionPlanId);
      
      const response = await fetch(`https://factory.teamasia.in/api/public/productionlevelparameters?production_plan_id=${productionPlanId}`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Labdata',response);
      const result = await response.json();

      console.log('result.....',result);
      
      

      if(result?.productionlevel?.length > 0){
        setData(prevState => ({
          ...prevState,
          id:result.productionlevel[0].id,
          production_level_parameter:result.productionlevel[0].productionlevelparameters,
          signature:result.productionlevel[0].signature,
          status:result.productionlevel[0].status,
          date:result.productionlevel[0].created_at,
        }));
        setFlag(true);
      }
     }catch (error){
      console.log("error",error);
     }
  }
  const fetchCustomer = async (planData)=>{
    try{
      const token = localStorage.getItem('userToken'); 
      console.log(productionPlanId);
      
      const response = await fetch(`https://factory.teamasia.in/api/public/customers/${planData.customer_id}`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Labdata',response);
      const result = await response.json();

      console.log('result',result);
      SetcustomerPlanData({
        customer_id: planData.customer_id,
        customerName: result.company_name,
        dateofPlan:planData.created_at,
        production_plan_id: planData.id,
        line_id: planData.line_id,
        order_id: planData.order_id,
        product_id: planData.product_id,
        grain_name: planData.product_details.grain_name,
        quality_name: planData.product_details.quality_name,
        thickness:planData.product_details.thickness,
        color_name: planData.product_details.color_name,
      });
      fetchBomReport(planData,result);
     }catch (error){
      console.log("error",error);
     }
  }

  const fetchProductionPlan = async ()=>{
    try{
      const token = localStorage.getItem('userToken'); 
      console.log(productionPlanId);
      
      const response = await fetch(`https://factory.teamasia.in/api/public/productionplan/${productionPlanId}`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Labdata',response);
      const result = await response.json();

      console.log('result',{...result});

      fetchCustomer(result);
     }catch (error){
      console.log("error",error);
     }
  }
  fetchProductionPlan();
},[]);
 
  return (

    <>
    {!flag?<div className="my-btn-color-temp"  style={{background: 'rgb(236 239 247)',textAlign:'center',border: '2px solid black',color:'black',marginBottom:'2px',padding:'40px',fontSize:'20px'}}>
                    <div>
                      <i className="bi bi-emoji-frown" style={{fontSize:'30px'}}/>
                    </div>
                     No production parameters found.
               </div>:
    <>
          <ComponentCard5>
      <Table responsive>
        <thead>
          <tr>
           <th>Machine No :</th>
           <td>Line {customerPlanData?.line_id}</td>
           <th>Date :</th>
           <td>{customerPlanData?.dateofPlan}</td>
          </tr>
          <tr>
           <th>Product Quality</th>
           <td>{customerPlanData?.quality_name}</td>	
          </tr>
          <tr>
            <th>Color</th>
            <td>{customerPlanData?.color_name}</td>
          </tr>
          <tr>
            <th>Thickness</th>
            <td>{customerPlanData?.thickness} mm</td>
          </tr>
        </thead>			
        </Table>
          </ComponentCard5>

          <ComponentCard5>
              <Table className="report-page-table" responsive>
                <thead>
                  <tr>
                    <th colSpan={7} style={{textAlign:'center',color:'green'}}>PRODUCTION PARAMETERS TO BE CHECKED</th>
                  </tr>
                  <tr>
                      <th></th>
                      <th colSpan={2} style={{textAlign:'center'}}>Initial	</th>
                      <th>After 500 mtrs</th>
                      <th>After 1000 mtrs</th>
                      <th>After 1500 mtrs</th>
                      <th>After 2000 mtrs</th>
                  </tr>
                  <tr>
                      <th></th>
                      <th>Expected</th>
                      <th>Actual</th>
                      <th>Actual</th>
                      <th>Actual</th>
                      <th>Actual</th>
                      <th>Actual</th>
                  </tr>
                </thead>
                <tbody>
                  
                  <tr>			
                    <th> Top Coat (GSM)</th>
                    <td>
                      
                         {data.production_level_parameter[0].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[0].initial_actual} 
                       
                    </td>
                    <td>
                      
                         {data.production_level_parameter[0].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[0].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[0].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[0].after_2000_actual} 
                       
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Final Weight (GSM)</th>
                    <td>
                      
                         {data.production_level_parameter[1].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[1].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[1].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[1].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[1].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[1].after_2000_actual} 
                        
                    </td>
                    
                  </tr>
      
                  <tr>			
                    <th> Line Speed (M/Min)</th>
                    <td>
                      
                         {data.production_level_parameter[2].initial_expected} 
                       
                    </td>
                    <td>
                      
                         {data.production_level_parameter[2].initial_actual} 
                       
                    </td>
                    <td>
                      
                         {data.production_level_parameter[2].after_500_actual} 
                       
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[2].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[2].after_1500_actual} 
                       
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[2].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Cell Structure</th>
                    <td>
                      
                         {data.production_level_parameter[3].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[3].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[3].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[3].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[3].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[3].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Surface	</th>
                    <td>
                      
                         {data.production_level_parameter[4].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[4].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[4].after_500_actual} 
                       
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[4].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[4].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[4].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Bonding	</th>
                    <td>
                      
                         {data.production_level_parameter[5].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[5].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[5].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[5].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[5].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[5].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                </tbody>
                </Table>
          </ComponentCard5>

          <ComponentCard5>
              <Table className="report-page-table" responsive>
                <thead>
                  <tr>
                    <th colSpan={7} style={{textAlign:'center',color:'green'}}>PROCESS PARAMETERS TO BE CHECKED</th>
                  </tr>
                  <tr>
                      <th></th>
                      <th colSpan={2} style={{textAlign:'center'}}>Initial	</th>
                      <th>After 500 mtrs</th>
                      <th>After 1000 mtrs</th>
                      <th>After 1500 mtrs</th>
                      <th>After 2000 mtrs</th>
                  </tr>
                  <tr>
                      <th></th>
                      <th>Expected</th>
                      <th>Actual</th>
                      <th>Actual</th>
                      <th>Actual</th>
                      <th>Actual</th>
                      <th>Actual</th>
                  </tr>
                </thead>
                <tbody>
                  
                  <tr>			
                    <th style={{color:'blue'}}> COATING ZONE-1</th>
                    <td>
                      
                    </td>
                    <td>
                      
                    </td>
                    <td>
                      
                    </td>
                    <td>  
                      
                    </td>
                    <td>  
                      
                    </td>
                    <td>  
                      
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z1 O1</th>
                    <td>
                      
                         {data.production_level_parameter[6].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[6].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[6].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[6].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[6].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[6].after_2000_actual} 
                       
                    </td>
                    
                  </tr>
      
                  <tr>			
                    <th> Temperature Z2 O1</th>
                    <td>
                      
                         {data.production_level_parameter[7].initial_expected} 
                       
                    </td>
                    <td>
                      
                         {data.production_level_parameter[7].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[7].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[7].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[7].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[7].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z1 O1</th>
                    <td>
                      
                         {data.production_level_parameter[8].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[8].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[8].after_500_actual} 
                       
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[8].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[8].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[8].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z2 O1		</th>
                    <td>
                      
                         {data.production_level_parameter[9].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[9].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[9].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[9].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[9].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[9].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th style={{color:'blue'}}> COATING ZONE-2</th>
                    <td>
                      
                    </td>
                    <td>
                      
                    </td>
                    <td>
                      
                    </td>
                    <td>  
                      
                    </td>
                    <td>  
                      
                    </td>
                    <td>  
                      
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z1 O2</th>
                    <td>
                      
                         {data.production_level_parameter[10].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[10].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[10].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[10].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[10].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[10].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z2 O2	</th>
                    <td>
                      
                         {data.production_level_parameter[11].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[11].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[11].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[11].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[11].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[11].after_2000_actual} 
                        
                    </td>
                    
                  </tr>


                  <tr>			
                    <th> Blower RPM Z1 O2</th>
                    <td>
                      
                         {data.production_level_parameter[12].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[12].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[12].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[12].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[12].after_1500_actual} 
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[12].after_2000_actual} 
                        
                    </td>
                    
                  </tr>


                  <tr>			
                    <th> Blower RPM Z2 O2</th>
                    <td>
                      
                         {data.production_level_parameter[13].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[13].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[13].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[13].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[13].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[13].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th style={{color:'blue'}}> COATING ZONE-3</th>
                    <td>
                      
                    </td>
                    <td>
                      
                    </td>
                    <td>
                      
                    </td>
                    <td>  
                      
                    </td>
                    <td>  
                      
                    </td>
                    <td>  
                      
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z1 O3</th>
                    <td>
                      
                         {data.production_level_parameter[14].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[14].initial_actual} 
                       
                    </td>
                    <td>
                      
                         {data.production_level_parameter[14].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[14].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[14].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[14].after_2000_actual} 
                       
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z2 O3</th>
                    <td>
                      
                         {data.production_level_parameter[15].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[15].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[15].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[15].after_1000_actual} 
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[15].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[15].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z3 O3</th>
                    <td>
                      
                         {data.production_level_parameter[16].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[16].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[16].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[16].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[16].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[16].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z4 O3</th>
                    <td>
                      
                         {data.production_level_parameter[17].initial_expected} 
                       
                    </td>
                    <td>
                      
                         {data.production_level_parameter[17].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[17].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[17].after_1000_actual} 
                       
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[17].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[17].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z1 O3</th>
                    <td>
                      
                         {data.production_level_parameter[18].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[18].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[18].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[18].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[18].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[18].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z2 O3</th>
                    <td>
                      
                         {data.production_level_parameter[19].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[19].initial_actual} 
                    </td>
                    <td>
                      
                         {data.production_level_parameter[19].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[19].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[19].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[19].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z3 O3</th>
                    <td>
                      
                         {data.production_level_parameter[20].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[20].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[20].after_500_actual} 
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[20].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[20].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[20].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z4 O3</th>
                    <td>
                      
                         {data.production_level_parameter[21].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[21].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[21].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[21].after_1000_actual} 
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[21].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[21].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th>Top Coat Weight (g)</th>
                    <td>
                      
                         {data.production_level_parameter[22].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[22].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[22].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[22].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[22].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[22].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th style={{color:'blue'}}> COATING ZONE-4</th>
                    <td>
                      
                    </td>
                    <td>
                      
                    </td>
                    <td>
                      
                    </td>
                    <td>  
                      
                    </td>
                    <td>  
                      
                    </td>
                    <td>  
                      
                    </td>
                    
                  </tr>
                  
                  <tr>			
                    <th> Temperature Z1 O4</th>
                    <td>
                      
                         {data.production_level_parameter[23].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[23].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[23].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[23].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[23].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[23].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z2 O4	</th>
                    <td>
                      
                         {data.production_level_parameter[24].initial_expected} 
                       
                    </td>
                    <td>
                      
                         {data.production_level_parameter[24].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[24].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[24].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[24].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[24].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z3 O4</th>
                    <td>
                      
                         {data.production_level_parameter[25].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[25].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[25].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[25].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[25].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[25].after_2000_actual} 
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z4 O4</th>
                    <td>
                      
                         {data.production_level_parameter[26].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[26].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[26].after_500_actual} 
                       
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[26].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[26].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[26].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z5 O4</th>
                    <td>
                      
                         {data.production_level_parameter[27].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[27].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[27].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[27].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[27].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[27].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z6 O4</th>
                    <td>
                      
                         {data.production_level_parameter[28].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[28].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[28].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[28].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[28].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[28].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z1 O4</th>
                    <td>
                      
                         {data.production_level_parameter[29].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[29].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[29].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[29].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[29].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[29].after_2000_actual} 
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z2 O4</th>
                    <td>
                      
                         {data.production_level_parameter[30].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[30].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[30].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[30].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[30].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[30].after_2000_actual} 
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z3 O4</th>
                    <td>
                      
                         {data.production_level_parameter[31].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[31].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[31].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[31].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[31].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[31].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z4 O4</th>
                    <td>
                      
                         {data.production_level_parameter[32].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[32].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[32].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[32].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[32].after_1500_actual} 
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[32].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z5 O4</th>
                    <td>
                      
                         {data.production_level_parameter[33].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[33].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[33].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[33].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[33].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[33].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z6 O4	</th>
                    <td>
                      
                         {data.production_level_parameter[34].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[34].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[34].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[34].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[34].after_1500_actual} 
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[34].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Foam Coat Weight (g)</th>
                    <td>
                      
                         {data.production_level_parameter[35].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[35].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[35].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[35].after_1000_actual} 
                       
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[35].after_1500_actual} 
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[35].after_2000_actual} 
                    </td>
                    
                  </tr>

                  <tr>			
                    <th style={{color:'blue'}}> COATING ZONE-5</th>
                    <td>
                      
                    </td>
                    <td>
                      
                    </td>
                    <td>
                      
                    </td>
                    <td>  
                      
                    </td>
                    <td>  
                      
                    </td>
                    <td>  
                      
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z1 O5</th>
                    <td>
                      
                         {data.production_level_parameter[36].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[36].initial_actual} 
                    </td>
                    <td>
                      
                         {data.production_level_parameter[36].after_500_actual} 
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[36].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[36].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[36].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z2 O5	</th>
                    <td>
                      
                         {data.production_level_parameter[37].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[37].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[37].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[37].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[37].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[37].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z3 O5	</th>
                    <td>
                      
                         {data.production_level_parameter[38].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[38].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[38].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[38].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[38].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[38].after_2000_actual} 
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z4 O5</th>
                    <td>
                      
                         {data.production_level_parameter[39].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[39].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[39].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[39].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[39].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[39].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Temperature Z5 O5</th>
                    <td>
                      
                         {data.production_level_parameter[40].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[40].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[40].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[40].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[40].after_1500_actual} 
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[40].after_2000_actual} 
                    </td>
                    
                  </tr>


                  <tr>			
                    <th> Temperature Z6 O5	</th>
                    <td>
                      
                         {data.production_level_parameter[41].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[41].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[41].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[41].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[41].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[41].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z1 O5</th>
                    <td>
                      
                         {data.production_level_parameter[42].initial_expected} 
                    </td>
                    <td>
                      
                         {data.production_level_parameter[42].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[42].after_500_actual} 
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[42].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[42].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[42].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z2 O5</th>
                    <td>
                      
                         {data.production_level_parameter[43].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[43].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[43].after_500_actual} 
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[43].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[43].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[43].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z3 O5</th>
                    <td>
                      
                         {data.production_level_parameter[44].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[44].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[44].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[44].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[44].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[44].after_2000_actual} 
                    </td>
                    
                  </tr>
                  
                  <tr>			
                    <th> Blower RPM Z4 O5</th>
                    <td>
                      
                         {data.production_level_parameter[45].initial_expected} 
                    </td>
                    <td>
                      
                         {data.production_level_parameter[45].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[45].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[45].after_1000_actual} 
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[45].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[45].after_2000_actual} 
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z5 O5</th>
                    <td>
                      
                         {data.production_level_parameter[46].initial_expected} 
                    </td>
                    <td>
                      
                         {data.production_level_parameter[46].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[46].after_500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[46].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[46].after_1500_actual} 
                       
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[46].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th> Blower RPM Z6 O5</th>
                    <td>
                      
                         {data.production_level_parameter[47].initial_expected} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[47].initial_actual} 
                        
                    </td>
                    <td>
                      
                         {data.production_level_parameter[47].after_500_actual} 
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[47].after_1000_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[47].after_1500_actual} 
                        
                    </td>
                    <td>  
                      
                         {data.production_level_parameter[47].after_2000_actual} 
                        
                    </td>
                    
                  </tr>

                  <tr>			
                    <th >
                      <div>
                           Parameters Signature
                      </div>
                      <div>
                           {data.signature} 
                          
                      </div>
                    </th>
                  </tr>
                </tbody>
                </Table>
          </ComponentCard5>
    </>
    }
    </> 
  );
};

export default ProductionReport;
