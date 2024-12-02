import React ,{ useEffect, useState } from 'react';

import { Button } from 'reactstrap';

import { useNavigate } from 'react-router-dom';

import ComponentCard from '../../../components/ComponentCard5';

const Payments = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  


  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/payments', {
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
      setData(result.payments); 
    };

    fetchData();
  },[]);



  const addPayment =()=>{
    navigate('/accounts/payments/add')
  }

  const addimport =()=>{
    navigate('/accounts/payments/upload-file')
  }

  const paymentDetails =(payment)=>{
    navigate('/accounts/payments/payment-details', {state:payment})
  }

  return (
    <ComponentCard
    title=""
    subtitle={
      <p>
        {/* Overview of the projects */}
      </p>
    }
  >
    <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={addPayment}>
           Add Payment
            </Button>
            <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={addimport}>
           Import Payments
            </Button>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <table className="table">
              <thead>
              <tr>
                <th>Type</th>
                <th>Voucher No</th>
                <th>Customer Name</th>
                <th>Payment Date</th>
                <th>Amount (₹)</th>
                <th>Desc</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {data.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.is_credit_note === '1'? 'Credit Note':'Receipt'}</td>
                    <td>{payment.voucher_no}</td>
                    <td>{payment?.customer_details === ''?'The customer does not exist.': payment?.customer_details?.company_name}</td>
                    <td>{payment.payment_date}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.description}</td>
                    <td>
                      {/* Replace with actual action components or icons */}
                       <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={()=>paymentDetails(payment)}>
                        <i className="bi bi-eye-fill my-eye-color" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
    </div>
   
  </ComponentCard>
  );
};

export default Payments;