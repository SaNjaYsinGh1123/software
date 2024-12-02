import React ,{useState} from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Table,
  Collapse
} from 'reactstrap';
import PropTypes from 'prop-types';
import  {useNavigate} from 'react-router-dom';
import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';
import Barcode1 from "../../../assets/images/bg/barcode1.png"

const JumbotronComponent = ({modal,toggle}) => {

  const var1 = "Total: 170 meters"
  const var2 = "Remaining: 9.00 meters"
  const [collapse, setCollapse] = useState(false);
  const navigate = useNavigate();

  const collapser = () =>{   
    setCollapse(!collapse)
  }

  const BomReportFunction = ()=>{
    console.log('hi');
     navigate('/operations/Bom-Report');
  }
  const LabReportFunction = ()=>{
     navigate('/operations/Lab-Report-stock');
  }
  const ProductionFunction = ()=>{
     navigate('/operations/Production-Report');
  }

  return (
    <>
     <ComponentCard5 >
          
            <Modal isOpen={modal} toggle={toggle} style={{'--bs-modal-width': '1100px'}}>
              <ModalHeader toggle={toggle}>Small Roll Details</ModalHeader>
              <ModalBody>
              <Table responsive className='table-margin-zero QapViewtable' size="sm">
                  <thead>
                    <tr>
                      <th scope="col" >
                        <div><img src={Barcode1} style={{maxWidth:'250px' }} alt='barcode'/></div>
                      </th>
                      <th scope="col" style={{opacity:0}}>{var1}</th>
                      <th scope="col" style={{opacity:0}}>{var2}</th>

                      <th scope="col"><Button className='my-btn-color-green' style={{whiteSpace:'nowrap'}} onClick={()=>BomReportFunction()}>BOM Report</Button></th>
                      <th scope="col"><Button className='my-btn-color-green' style={{whiteSpace:'nowrap'}} onClick={()=>LabReportFunction()}>Lab Report</Button></th>
                      <th scope="col"><Button className='my-btn-color-green' style={{whiteSpace:'nowrap'}} onClick={()=>ProductionFunction()}>Production Level Parameters</Button></th>
                      <th scope="col"><Button className='my-btn-color-yellow' style={{whiteSpace:'nowrap'}}>Print</Button></th>
                      <th scope="col"><Button className='my-btn-color' style={{whiteSpace:'nowrap'}}>23.3</Button></th>
                    </tr>
                   
                  </thead>
                </Table>
                <Table responsive className='table-margin-zero QapViewtable' size="sm">
                  <tbody>
                    <tr>
                      <td><span className='production-plan-page-collape-heading'>Grade: </span> Ist</td>
                      <td><span className='production-plan-page-collape-heading'>BIN</span></td>
                      <td><span className='production-plan-page-collape-heading'>Weight: </span>46.62 KG</td>
                      <td><span className='production-plan-page-collape-heading'>Width: </span>1.4m</td>
                      <td><span className='production-plan-page-collape-heading'>QA By : </span> Malkhan Singh</td>
                      <td><span className='production-plan-page-collape-heading'>Created On : </span> 2 May, 2022</td>
                     
                    </tr>
                    <tr>
                      <td><span className='production-plan-page-collape-heading'>Thickness</span></td>
                      <td><span className='production-plan-page-collape-heading'>T1: </span> 1.75mm</td>
                      <td><span className='production-plan-page-collape-heading'>T2: </span> 1.75mm</td>
                      <td><span className='production-plan-page-collape-heading'>T3: </span> 1.75mm</td>
                      <td><span className='production-plan-page-collape-heading'>Planned On: </span> 2 May,2022</td>
                      <td><span className='production-plan-page-collape-heading'>Created From: </span> JUMBO008543</td>
                     
                     
                    </tr>
                  </tbody>
                  
                </Table>
                <Table responsive className='table-margin-zero QapViewtable' size="sm">
                  <thead>
                    <tr style={{border: "1px solid #dee2e6"}}>
                        <th style={{background:'#d5d2d2',padding:'8px'}}>
                                {" Combit Footwear Pvt. Ltd. (#1409) , Product(1409_1) "}
                        </th>
                        <th style={{background:'#d5d2d2',padding:'8px'}}>
                              <span className='' onClick={collapser.bind(null)} style={{ marginBottom: '1rem' }}>
                                <i className={collapse ?'bi-caret-down-square-fill':'bi-caret-right-square-fill'} />
                              </span>
                        </th>
                  </tr>
                  </thead>
                  
                </Table>
                <Collapse isOpen={collapse}>
                <Table responsive className='table-margin-zero QapViewtable' size="sm">
                  <thead>
                    <tr>
                      <th scope="col" ><span className='production-plan-page-collape-heading'>Order Date</span></th>
                      <th scope="col"><span className='production-plan-page-collape-heading'>Expected Date</span></th>
                      <th scope="col"><span className='production-plan-page-collape-heading'>Priority</span></th>
                      <th scope="col"><span className='production-plan-page-collape-heading'>Status</span></th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td >12 Apr,2022</td>
                        <td>15 Apr,2022</td>
                        <td>High</td>
                        <td>Completed</td>
                    </tr>
                  
                  </tbody>
                </Table>
                 <div style={{background:'#d5d2d2',padding:'8px'}}>
                      <span >
                          Product Details
                      </span>
                 </div>
                <Table responsive className='table-margin-zero QapViewtable' size="sm">
                  <thead>
                    <tr>
                      <th ><span className='production-plan-page-collape-heading'>Grain</span></th>
                      <th ><span className='production-plan-page-collape-heading'>Color</span></th>
                      <th ><span className='production-plan-page-collape-heading'>Quality</span></th>
                      <th ><span className='production-plan-page-collape-heading'>Thickness</span></th>
                      <th ><span className='production-plan-page-collape-heading'>Fabric</span></th>
                      <th ><span className='production-plan-page-collape-heading'>Fabric Color</span></th>
                      <th ><span className='production-plan-page-collape-heading'>HSN</span></th>
                      <th ><span className='production-plan-page-collape-heading'>Price($)</span></th>
                      <th ><span className='production-plan-page-collape-heading'>Tax</span></th>
                      <th ><span className='production-plan-page-collape-heading'>Embossing</span></th>
                      <th ><span className='production-plan-page-collape-heading'>Printing</span></th>
                      <th ><span className='production-plan-page-collape-heading'>CIR.</span></th>
                      <th ><span className='production-plan-page-collape-heading'>AT</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td >1001 A</td>
                              <td>black</td>
                              <td>Q2/CX0Y13Z03</td>
                              <td>1.7 mm </td>
                              <td>WP.matty_185g_120gsm</td>
                              <td>black</td>
                              <td>59031090</td>
                              <td>313.6</td>
                              <td>12%</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>N/A</td>

                    </tr>
                  
                  </tbody>
                </Table>

                <Table responsive size="sm" className="QapViewtable">
                  <thead>
                    <tr>
                      <th scope="col"><span className='production-plan-page-collape-heading'>Pre Skin</span></th>
                      <th scope="col"><span className='production-plan-page-collape-heading'>Skin</span></th>
                      <th scope="col"><span className='production-plan-page-collape-heading'>Top Coat</span></th>
                      <th scope="col"><span className='production-plan-page-collape-heading'>Filler In Top Coat</span></th>
                      <th scope="col"><span className='production-plan-page-collape-heading'>Foam</span></th>
                      <th scope="col"><span className='production-plan-page-collape-heading'>Filler In Foam</span></th>
                      <th scope="col"><span className='production-plan-page-collape-heading'>Adhesive</span></th>
                      <th scope="col"><span className='production-plan-page-collape-heading'>Filler In Adhesive</span></th>
                      <th scope="col"><span className='production-plan-page-collape-heading'>Final GSM</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>N/A</td>
                              <td>200 gsm</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>910 gsm</td>
                              <td>175 PHR</td>
                              <td>120 gsm</td>
                              <td>75 PHR</td>
                              <td>1350 gsm</td>
                              

                    </tr>
                  
                  </tbody>
                </Table>
            </Collapse>
            <ComponentCard5>
                <div style={{fontSize:'20px'}}>
                   Note From Production
                </div>
                <div>
                   printing fault , printing line and paper fold observed to be in this roll ( 5 p/c)
                </div>
            </ComponentCard5>
              </ModalBody>
             
            </Modal>
          </ComponentCard5>
    </>
  );
};

export default JumbotronComponent;
JumbotronComponent.propTypes = {
  modal: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired
};