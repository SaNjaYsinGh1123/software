import React, {useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-table-v6/react-table.css';
import {Table,} from 'reactstrap'
import ComponentCard5 from '../../../components/ComponentCard5';

const BomReport = () => {
  const location= useLocation();
  const { productionPlanId = 0 } = location.state;
  const [flag,setFlag] = useState(false);
  const [customerPlanData,SetcustomerPlanData] = useState({});
  const [data, setData] = useState({
    top_weight: "",
    foam_weight: "",
    adhesive_weight: "",
    fabric_weight: "",
    final_weight: "",
    department: "",
    date: "2024-09-22",
    signature: "",
    status: "2",
    bom_parameter:[

      // PVC
          {
          raw_material: "Chemplast 124",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "LG PB 1202",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "LG LP 170",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "LG LP 090",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "Formolon NVA",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "Blending Resin",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 1",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 2",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 3",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },

          // Plasticizer
          {
          raw_material: "DOP",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "DOA",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "DBP",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "CPW",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "EPOXY",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "X",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "Y",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "High Molecular Weight",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "Reach Compliant",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 1",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 2",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 3",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },

          // Stabilize
          {
          raw_material: "Baerlocher 1090",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 1",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 2",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 3",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },

          // Foaming
          {
          raw_material: "ADCL",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 1",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 2",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },

          // Filler
          {
          raw_material: "Dolomite",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "Talc",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 1",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 2",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },

          // Reducer
          {
          raw_material: "D80",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "MTO",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 1",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 2",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },

          // Pigment
          {
          raw_material: "Pigment M.B",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 1",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
          },
          {
          raw_material: "ETC 2",
          top_coat: "",
          first_coat: "",
          foam_coat: "",
          adhesive_coat: "",
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
      
      const response = await fetch(`https://factory.teamasia.in/api/public/bomreports?production_plan_id=${productionPlanId}`, {
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

      console.log('result....',result);

      if(result?.bomreport?.length > 0){
        setData(prevState => ({
          ...prevState,
          id:result.bomreport[0].id,
          bom_parameter:result.bomreport[0].bomparameters,
          top_weight: result.bomreport[0].top_weight,
          foam_weight:result.bomreport[0].foam_weight,
          adhesive_weight:result.bomreport[0].adhesive_weight,
          fabric_weight: result.bomreport[0].fabric_weight,
          final_weight:result.bomreport[0].final_weight,
          department:result.bomreport[0].department,
          signature:result.bomreport[0].signature,
          status:result.bomreport[0].status,
          date:result.bomreport[0].date,
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
        production_plan_id: planData.id,
        line_id: planData.line_id,
        order_id: planData.order_id,
        product_id: planData.product_id,
        grain_name: planData.product_details.grain_name,
        quality_name: planData.product_details.quality_name,
        thickness:planData.product_details.thickness,
        fabric_name: planData.product_details.fabric_name,
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
                      No BOM Report found.
               </div>:<>
     <ComponentCard5>
       <Table responsive>
         <thead>
           <tr>
             <th colSpan={4}>Customer: {customerPlanData?.customerName}</th>
           </tr>
           <tr>
            <th>Grain</th>
            <th>Product Quality</th>
            <th>Thickness</th>
            <th>Fabric</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td>{customerPlanData?.grain_name}</td>
             <td>{customerPlanData?.quality_name}</td>
             <td>{customerPlanData?.thickness}mm</td>
             <td>{customerPlanData?.fabric_name}</td>
           </tr>
         </tbody>
         </Table>
     </ComponentCard5>
 
     <ComponentCard5>
         <Table className="report-page-table" responsive>
           <thead>
             <tr>
               <th colSpan={7} style={{textAlign:'center',color:'green'}}>BOM PARAMETERS TO BE CHECKED</th>
             </tr>
             <tr>
             <th>Raw Material</th>
             <th>Top Coat</th>
             <th>First Coat</th>
             <th>Foam Coat</th>
             <th>Adhesive Coat</th>
             <th><span style={{opacity:0}}>Top</span></th>
             <th><span style={{opacity:0}}>Top</span></th>
             </tr>
           </thead>
           <tbody>
 
             <tr>
               <th> PVC </th>				
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
             </tr>
 
             <tr>			
               <th> Chemplast </th>
               <td>
                 
                   {data.bom_parameter[0].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[0].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[0].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[0].adhesive_coat} 
                   
               </td>
 
               <td> 
               </td>
             </tr>
 
             <tr>
               <th>LG PB 1202</th>
 
               <td>
                 
                   {data.bom_parameter[1].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[1].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[1].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[1].adhesive_coat} 
                   
               </td>
 
               <td>
               </td>
             </tr>
 
             <tr>
               <th> LG LP 170</th>
               <td>
                 
                   {data.bom_parameter[2].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[2].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[2].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[2].adhesive_coat} 
                   
               </td>
 
               <td>
               </td>
             </tr>
 
             <tr>
             
               <th> LG LP 090</th>
               <td>
                 
                   {data.bom_parameter[3].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[3].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[3].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[3].adhesive_coat} 
                   
               </td>
 
               <td>
               </td>
             </tr>
 
             <tr>
             
               <th> Formolon NVA</th>
               <td>
                 
                   {data.bom_parameter[4].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[4].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[4].foam_coat} 
                  
               </td>
               <td>  
                 
                   {data.bom_parameter[4].adhesive_coat} 
                   
               </td>
 
               <td> 
               </td>
             </tr>
 
             <tr>
                       
               <th> Blending Resin	</th>	
               <td>
                 
                   {data.bom_parameter[5].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[5].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[5].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[5].adhesive_coat} 
                   
               </td>
 
               <td>
               </td>
               
             </tr>
 
             <tr>
                 
               <th>
                 
                   {data.bom_parameter[6].raw_material} 
                  
               </th>
               <td>
                 
                   {data.bom_parameter[6].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[6].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[6].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[6].adhesive_coat} 
                   
               </td>
 
               <td>
               </td>
               
             </tr>
 
             <tr>
               <th>
                 
                   {data.bom_parameter[7].raw_material} 
                   
               </th>
               <td>
                 
                   {data.bom_parameter[7].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[7].first_coat} 
                  
               </td>
               <td>
                
                   {data.bom_parameter[7].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[7].adhesive_coat} 
                   
               </td>
 
               <td>
               </td>
             </tr>
 
             <tr>
             
               <th>
                 
                   {data.bom_parameter[8].raw_material} 
                   
               </th>
               <td>
                 
                   {data.bom_parameter[8].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[8].first_coat} 
                  
               </td>
               <td>
                
                   {data.bom_parameter[8].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[8].adhesive_coat} 
                   
               </td>
 
               <td>
               </td>
               
             </tr>
 
             <tr>
               
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <th colSpan={2} style={{textAlign:'center',color:'green'}}>Weight in GSM</th>
             </tr>
 
             <tr>
               
               <th> Plasticizer</th>
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
               
               <th> DOP </th>
               <td>
                 
                   {data.bom_parameter[9].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[9].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[9].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[9].adhesive_coat} 
                   
               </td>
 
               <td>Top</td>
               <td>
                 
                   {data.top_weight} 
                  
               </td>
             </tr>
 
             <tr>
               
               <th>DOA</th>
               <td>
                 
                   {data.bom_parameter[10].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[10].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[10].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[10].adhesive_coat} 
                   
               </td>
 
               <td>Foam</td>
               <td>
                 
                   {data.foam_weight} 
                   
               </td>
             </tr>
 
             <tr>
               
               <th>DBP</th>
               <td>
                 
                   {data.bom_parameter[11].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[11].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[11].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[11].adhesive_coat} 
                   
               </td>
 
               <td>Adhesive</td>
               <td>
                   {data.adhesive_weight} 
                   
               </td>
             </tr>
 
             <tr>
               
               <th>CPW</th>
               <td>
                 
                   {data.bom_parameter[12].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[12].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[12].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[12].adhesive_coat} 
                  
               </td>
 
               <td>Fabric</td>
               <td>
                   {data.fabric_weight} 
                   
               </td>
             </tr>
             
             <tr>
               
               <th> EPOXY </th>
               <td>
                 
                   {data.bom_parameter[13].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[13].first_coat} 
                  
               </td>
               <td>
                
                   {data.bom_parameter[13].foam_coat} 
                  
               </td>
               <td>  
                 
                   {data.bom_parameter[13].adhesive_coat} 
                   
               </td>
 
               <td>Final Wt.</td>
               <td>
                   {data.final_weight} 
                   
               </td>
             </tr>
 
             <tr>
               
             <th>X</th>	
             <td>
                 
                   {data.bom_parameter[14].top_coat} 
                 
               </td>
               <td>
                 
                   {data.bom_parameter[14].first_coat} 
                  
               </td>
               <td>
                
                   {data.bom_parameter[14].foam_coat} 
                  
               </td>
               <td>  
                 
                   {data.bom_parameter[14].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
             <th>Y</th>
             <td>
                 
                   {data.bom_parameter[15].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[15].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[15].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[15].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
             <th>High Molecular Weight</th>
             <td>
                 
                   {data.bom_parameter[16].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[16].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[16].foam_coat} 
                  
               </td>
               <td>  
                 
                   {data.bom_parameter[16].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
             <th>Reach Compliant</th>
             <td>
                 
                   {data.bom_parameter[17].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[17].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[17].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[17].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
             <th>
                 
                   {data.bom_parameter[18].raw_material} 
                      
             </th>
             <td>
                 
                   {data.bom_parameter[18].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[18].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[18].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[18].adhesive_coat} 
                   
               </td>
               
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th>
                   
                     {data.bom_parameter[19].raw_material} 
                        
               </th>
               <td>
                 
                   {data.bom_parameter[19].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[19].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[19].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[19].adhesive_coat} 
                   
               </td>
 
                 <td></td>
                 <td></td>
             </tr>
 
             <tr>
                 
               <th>
                   
                     {data.bom_parameter[20].raw_material} 
                        
               </th>
               <td>
                 
                   {data.bom_parameter[20].top_coat} 
                  
               </td>
               <td>
                 
                   {data.bom_parameter[20].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[20].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[20].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               <th></th>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <th>Department:</th>
               <td>
                   {data.department} 
               </td>
             </tr>
 
             <tr>
               <th>Stabilizer</th>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <th>Date:</th>
               <td>
                   {data.date} 
               </td>
             </tr>
 
             <tr>
               
             <th>Baerlocher 1090</th>
             <td>
                 
                   {data.bom_parameter[21].top_coat} 
                  
               </td>
               <td>
                 
                   {data.bom_parameter[21].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[21].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[21].adhesive_coat} 
                   
               </td>
 
               <th>Signature:</th>
               <td>
                   {data.signature}
                   
               </td>
             </tr>
 
             <tr>
               
             <th>
                 
                   {data.bom_parameter[22].raw_material} 
                  
               </th>
               <td>
                 
                   {data.bom_parameter[22].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[22].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[22].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[22].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr> 
               <th>
                   
                     {data.bom_parameter[23].raw_material} 
                        
                 </th>
                 <td>
                 
                   {data.bom_parameter[23].top_coat} 
                  
               </td>
               <td>
                 
                   {data.bom_parameter[23].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[23].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[23].adhesive_coat} 
                   
               </td>
 
                 <td></td>
                 <td></td>
               </tr>
 
             <tr>
               
             <th>
                 
                   {data.bom_parameter[24].raw_material} 
                    
               </th>
               <td>
                 
                   {data.bom_parameter[24].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[24].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[24].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[24].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th></th>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th> Foaming </th>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th>ADCL</th>
               <td>
                 
                   {data.bom_parameter[25].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[25].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[25].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[25].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
             <th>
                 
                   {data.bom_parameter[26].raw_material} 
                      
               </th>
               <td>
                 
                   {data.bom_parameter[26].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[26].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[26].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[26].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th>
                   
                     {data.bom_parameter[27].raw_material} 
                         
                 </th>
                 <td>
                 
                   {data.bom_parameter[27].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[27].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[27].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[27].adhesive_coat} 
                   
               </td>
 
                 <td></td>
                 <td></td>
             </tr>
 
             <tr>
               
               <th></th>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th>Filler </th>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th> Dolomite	 </th>
               <td>
                 
                   {data.bom_parameter[28].top_coat} 
                  
               </td>
               <td>
                 
                   {data.bom_parameter[28].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[28].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[28].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th> Talc </th>
               <td>
                 
                   {data.bom_parameter[29].top_coat} 
                  
               </td>
               <td>
                 
                   {data.bom_parameter[29].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[29].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[29].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
             <th>
                 
                   {data.bom_parameter[30].raw_material} 
                    
               </th>
               <td>
                 
                   {data.bom_parameter[30].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[30].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[30].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[30].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
             
             <tr>
               <th>
                 
                   {data.bom_parameter[31].raw_material} 
                      
               </th>
               <td>
                 
                   {data.bom_parameter[31].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[31].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[31].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[31].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th></th>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th> Reducer</th>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th> D80	 </th>
               <td>
                 
                   {data.bom_parameter[32].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[32].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[32].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[32].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th> MTO </th>
               <td>
                 
                   {data.bom_parameter[33].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[33].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[33].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[33].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
             <th>
                 
                   {data.bom_parameter[34].raw_material} 
                      
               </th>
               <td>
                 
                   {data.bom_parameter[34].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[34].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[34].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[34].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
           
             <tr>
               
             <th>
                 
                   {data.bom_parameter[35].raw_material} 
                       
               </th>
               <td>
                 
                   {data.bom_parameter[35].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[35].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[35].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[35].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th></th>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th> Pigment </th>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th> Pigment M.B </th>
               <td>
                 
                   {data.bom_parameter[36].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[36].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[36].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[36].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
             <th>
                 
                   {data.bom_parameter[37].raw_material} 
                      
               </th>
               <td>
                 
                   {data.bom_parameter[37].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[37].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[37].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[37].adhesive_coat} 
                   
               </td>
 
               <td></td>
               <td></td>
             </tr>
 
             <tr>
               
               <th>
                   
                     {data.bom_parameter[38].raw_material} 
                 </th>
                 <td>
                 
                   {data.bom_parameter[38].top_coat} 
                   
               </td>
               <td>
                 
                   {data.bom_parameter[38].first_coat} 
                   
               </td>
               <td>
                
                   {data.bom_parameter[38].foam_coat} 
                   
               </td>
               <td>  
                 
                   {data.bom_parameter[38].adhesive_coat} 
                   
               </td>
 
                 <td></td>
                 <td></td>
             </tr>
           </tbody>
           </Table>
     </ComponentCard5>
     </>
     }
     
    </>
  );
};

export default BomReport;
