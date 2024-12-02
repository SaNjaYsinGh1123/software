import React from 'react';
import 'react-table-v6/react-table.css';
import { Table } from 'reactstrap';
import ComponentCard5 from '../../../components/ComponentCard5';



const JumbotronComponent = () => {
  const Labdata =[
 {
  labtestname:'1',
  method_name:'d',
  lab_test_direction_id:'along',
  unit:'mgr',
  temperature:'-35f',
  minimum_expectation:'',
  result:'OK',
  notes:"increment",
 },
 {
  labtestname:'1',
  method_name:'e',
  lab_test_direction_id:'accross',
  unit:'mgr',
  temperature:'40f',
  minimum_expectation:'',
  result:'OK',
  notes:"increment",
 }
  ]



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
