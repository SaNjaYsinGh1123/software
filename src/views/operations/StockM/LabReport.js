import React, {useState, useEffect} from 'react';
import 'react-table-v6/react-table.css';
import { useLocation } from 'react-router-dom';
import { Table } from 'reactstrap';
import ComponentCard5 from '../../../components/ComponentCard5';



const JumbotronComponent = () => {
  const [Labdata,setLabData] = useState([]);

  const location = useLocation();
  const {rollItem} = location.state;
  const [labResData,setLabResData] = useState([]);

  console.log(rollItem);

  useEffect(()=>{
    const fetchData = async(resultXY)=>{

      try{
        const token = localStorage.getItem('userToken');
        // console.log('token',token);
        const response = await fetch(`https://factory.teamasia.in/api/public/labreports/?production_plan_id=${rollItem.production_plan_id}&line_id=${rollItem.line_id}&order_id=${rollItem.order_id}&product_id=${rollItem.product_id}`, {
          method: 'GET', 
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })

        // console.log('result',response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Labdata',response);
        const result = await response.json();
     
       console.log('Labdata',Labdata);
        if(result && result.labreports.length !== 0){

          console.log('result labreports',result,result.labreports);

          let el = {};
          let el2 = {};
  
          const LabReportFromGet = result.labreports.map((lab)=>{
            el = resultXY.find((labs)=> labs.id ===  lab.lab_test_id);
            el2 = el.labtestdirections.find((labs)=> labs.id ===  lab.lab_test_direction_id);
  
            console.log('element',el,el.labtestdirections,el2);
            return { 
              id:lab.id,
              production_plan_id:lab.production_plan_id,
              line_id: lab.line_id,
              order_id:lab.order_id,
              product_id:lab.product_id,
              lab_test_id: el.id,
              labtestname:el.name,
              method_name:el.method_name,
              lab_test_direction_id:el2?el2.name:'direction',
              dataX:[],
              unit: lab.unit,
              temperature: lab.temperature,
              minimum_expectation: lab.minimum_expectation,
              result: lab.result,
              notes: lab.notes,
              signature: lab.signature,
              }
          }
          )
          // newItems[index].lab_test_direction_id = 'x';
       console.log('LabReportFromGet',LabReportFromGet);
       
  
          setLabData(LabReportFromGet);
        }

       }catch (error){
        console.log("error",error);
       }
      } 

      const fetchlabResorceData = async () => {
        const token = localStorage.getItem('userToken');
        console.log('token',token);
        const response = await fetch(`https://factory.teamasia.in/api/public/labtests/?is_trashed=0`, {
          method: 'GET', 
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('result',response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const resultX = result.labtests.slice();
        resultX.push({id:'x',name:'Choose'});
        setLabResData(resultX);
        fetchData(resultX);
        console.log('result.labtests',result.labtests,labResData);
      };

      fetchlabResorceData();  
  },[rollItem]);

  return (
    <>
      <ComponentCard5>
        <Table className="report-page-lab-table" responsive size="sm">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Test Name</th>
              <th>Test Method</th>
              <th>Direction</th>
              <th>Unit</th>
              <th>Temperature</th>
              <th>Minimum Expectations</th>
              <th>Result</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {Labdata.length !== 0 ?Labdata.map((lab,index)=>{
               
               return <tr key={lab.id}>
                        <td>{index+1}</td>
                        <td>{lab.labtestname}</td>
                        <td>{lab.method_name}</td>
                        <td>{lab.lab_test_direction_id}</td>
                        <td>{lab.unit}</td>
                        <td>{lab.temperature}</td>
                        <td>{lab.minimum_expectation}</td>
                        <td>{lab.result}</td>
                        <td>{lab.notes}</td>
                      </tr>
            }):<tr><td colSpan={12}>No records to display</td></tr>}
            
           
          </tbody>
          {/* <tbody>
            <tr>
              <td>1</td>
              <td>Mass Per Unit Area</td>
              <td>SATRA TM28 July 2021</td>
              <td>Along</td>
              <td>g/m2</td>
              <td>24</td>
              <td>610</td>
              <td>586</td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan="2">2</td>
              <td rowSpan="2">Breaking Strength</td>
              <td rowSpan="2">SATRA TM29 April 2017</td>
              <td>Along</td>
              <td>N/mm</td>
              <td>24</td>
              <td></td>
              <td>15.10</td>
              <td></td>
            </tr>
            <tr>
              <td>Across</td>
              <td>N/mm</td>
              <td>24</td>
              <td></td>
              <td>8.64</td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan="2">4</td>
              <td rowSpan="2">Extension at Break</td>
              <td rowSpan="2">SATRA TM29 April 2017</td>
              <td>Along</td>
              <td>%</td>
              <td>24</td>
              <td></td>
              <td>13.24</td>
              <td></td>
            </tr>
            <tr>
              <td>Across</td>
              <td>%</td>
              <td>24</td>
              <td></td>
              <td>20.56</td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan="2">6</td>
              <td rowSpan="2">Tear Strength</td>
              <td rowSpan="2">SATRA TM30 April 2017</td>
              <td>Along</td>
              <td>N</td>
              <td>24</td>
              <td></td>
              <td>15.10</td>
              <td></td>
            </tr>
            <tr>
              <td>Across</td>
              <td>N</td>
              <td>24</td>
              <td></td>
              <td>20.79</td>
              <td></td>
            </tr>
            <tr>
              <td>8</td>
              <td>Bally Flex Resistance</td>
              <td>SATRA TM55 March 1999</td>
              <td>Along</td>
              <td>cycles</td>
              <td>24</td>
              <td></td>
              <td>1,20,000</td>
              <td>No crack</td>
            </tr>
          </tbody> */}
        </Table>
      </ComponentCard5>
    </>
  );
};

export default JumbotronComponent;
