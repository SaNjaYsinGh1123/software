import React from 'react';
import {
  Table
} from 'reactstrap';
import { useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import 'react-table-v6/react-table.css';

const JumbotronComponent = (props) => {
  const location = useLocation();
  const { data } = props;

  console.log('locationHYBRID',location.state,props)

  console.log('data',data);

  return (
    <>

                               <div className="order-view-page-flex-temp">
                                <div>{data?.address_type_name}</div> 
                                <div>{data?.address_alias}</div> 
                                <div>{data?.address_line_1}</div> 
                                <div>{data?.address_line_2}</div> 
                                <div>{data?.city_name}</div> 
                                <div>{data?.state_name} -{data?.gst?.slice(0,2)}</div>
                                <div>{data?.pincode}, {data?.country_name}</div> 
                                <div> GST No. : {data?.gst}</div> 
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
