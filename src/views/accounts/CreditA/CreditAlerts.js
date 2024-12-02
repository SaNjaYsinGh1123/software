import React, { } from 'react';


import ComponentCard from '../../../components/ComponentCard5';

const Ledgers = () => {

  const ledgerEntries = [
    {
      Customer: 'Shreeram Textile',
      CreditAlerts: ['Invoice TCINV/22-23/0660 of  689,108.00 on 03 Jun, 2022 has been overdue  268,897.78 for more than 90 days','Invoice TCINV/22-23/0660 of  689,108.00 on 03 Jun, 2022 has been overdue  268,897.78 for more than 90 days','Invoice TCINV/22-23/0660 of  689,108.00 on 03 Jun, 2022 has been overdue  268,897.78 for more than 90 days','Invoice TCINV/22-23/0660 of  689,108.00 on 03 Jun, 2022 has been overdue  268,897.78 for more than 90 days'],
      
    },
    {
      Customer: 'Shreeram Textile',
      CreditAlerts: ['Invoice TCINV/22-23/0660 of  689,108.00 on 03 Jun, 2022 has been overdue  268,897.78 for more than 90 days','Invoice TCINV/22-23/0660 of  689,108.00 on 03 Jun, 2022 has been overdue  268,897.78 for more than 90 days','Invoice TCINV/22-23/0660 of  689,108.00 on 03 Jun, 2022 has been overdue  268,897.78 for more than 90 days','Invoice TCINV/22-23/0660 of  689,108.00 on 03 Jun, 2022 has been overdue  268,897.78 for more than 90 days'],
      
    },
    
    // ... more dummy ledger entry objects
  ];
  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };


  return (
    <ComponentCard
    title=""
    subtitle={
      <p>
        {/* Overview of the projects */}
      </p>
    }
  >
    
   

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <table className="table" style={tableStyle}>
              <thead>
              <tr>
                  <th>Customer</th>
                  <th>Credit Alerts</th>
              </tr>
              </thead>
              <tbody>
              {ledgerEntries.map((entry) => (
                  <tr key={entry.netBalance}>
                    <td>{entry.Customer}</td>
                    <td>
                      {entry.CreditAlerts.map((item)=>(
                        <tr>{item}</tr>
                      ))}
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
    </div>
   
  </ComponentCard>

   
   
  );
};

export default Ledgers;