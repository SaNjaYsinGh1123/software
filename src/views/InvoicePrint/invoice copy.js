import React from "react";
import JsPDF from "jspdf";
import "jspdf-autotable"; // Optional: For table support

const Invoice = () => {
    const orderDetails = {
        orderId: '7055',
        invoiceNumber: 'TQC1M',
        purchaseOrderNumber: '1234',
        orderDate: '25 Aug, 2024',
        itemCount: 1,
        invoiceDate: '26 Aug, 2024',
        vehicleNumber: '4655',
        driverName: 'John Doe',
        driverMobile: '5456789675'
    };

    const sellerDetails = {
        name: 'Team Asia Private Limited',
        uamNo: 'U17299DL2020PTC369861',
        address: 'KH 31/2 Mile Part A, Metrar Pillar No. 767, Bahadurgarh, Haryana - 06 124507, India',
        gstNo: '06AACIT0794B1ZI'
    };

    const buyerDetails = {
        name: 'TestMQ',
        address: 'Faridabad, Haryana - 06 234567, India'
    };

    const products = [
        {
            name: 'PVC Film',
            grade: 'ACR / GRY E123',
            hsn: '39209999',
            unitPrice: '8.28',
            quantity: '70 m',
            total: '840.00'
        }
    ];

    const addInvoiceContent = (doc,forWhat) => {
    // Title 210 = 180 + 30 = 
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Tax Invoice', 100, 20, { align: 'center' });


    const imgData = 'data:image/png;base64,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'; // Add your base64 image string here

    // Add image to the PDF at (x, y) position with specified width and height
    doc.addImage(imgData, 'PNG', 13, 20, 30, 15); // (x, y, width, height)




    doc.setFontSize(9);

    doc.setFont(undefined, 'normal');
    doc.text(forWhat, 180, 20, { align: 'center' });

    // Order details section
    doc.setFont(undefined, 'bold');
    doc.text('Order Details:', 15, 40);
    
    doc.setFont(undefined, 'bold');
    doc.text('Order ID:', 15, 44);
    doc.setFont(undefined, 'normal');
    doc.text('7055', doc.getTextWidth('Order ID: ') + 18, 44);  // Increase space between label and value
    
    doc.setFont(undefined, 'bold');
    doc.text('Invoice Number:', 15, 48);
    doc.setFont(undefined, 'normal');
    doc.text('TQC1M', doc.getTextWidth('Invoice Number: ') + 18, 48);  // Increase space between label and value
    
    doc.setFont(undefined, 'bold');
    doc.text('Purchase Order No.:', 15, 52);
    doc.setFont(undefined, 'normal');
    doc.text('1234', doc.getTextWidth('Purchase Order No.: ') + 18, 52);  // Increase space between label and value
    
    doc.setFont(undefined, 'bold');
    doc.text('Order Date:', 15, 56);
    doc.setFont(undefined, 'normal');
    doc.text('25 Aug, 2024', doc.getTextWidth('Order Date: ') + 18, 56);  // Increase space between label and value
    




    // Dispatch details section (Right-aligned with bold labels)
    doc.setFont(undefined, 'bold');
    doc.text('Dispatch Details :', 195, 40, { align: 'right' });
    doc.setFont(undefined, 'bold');
    doc.text(`Item Count : `, 175, 44, { align: 'right' });
    doc.setFont(undefined, 'normal');
    doc.text(`1`, 195, 44, { align: 'right' });
    doc.setFont(undefined, 'bold');
    doc.text(`Invoice Date : `, 175, 48, { align: 'right' });
    doc.setFont(undefined, 'normal');
    doc.text(`26 Aug, 2024`, 195, 48, { align: 'right' });
    doc.setFont(undefined, 'bold');
    doc.text(`Vehicle Number : `, 180, 52, { align: 'right' });
    doc.setFont(undefined, 'normal');
    doc.text(`4655`, 195, 52, { align: 'right' });
    doc.setFont(undefined, 'bold');
    doc.text(`Driver Name : `, 175, 56, { align: 'right' });
    doc.setFont(undefined, 'normal');
    doc.text(`John Doe`, 195, 56, { align: 'right' });
    doc.setFont(undefined, 'bold');
    doc.text(`Driver Mobile :`, 175, 60, { align: 'right' });
    doc.setFont(undefined, 'normal');
    doc.text(`5456789675`, 195, 60, { align: 'right' });

    
    // Seller details section
    doc.setFont(undefined, 'bold');
    doc.text('Seller Details:', 15, 66);
    
    doc.setFont(undefined, 'normal');
    doc.text('Team Asia Private Limited', 15, 70);

    doc.setFont(undefined, 'bold');
    doc.text('UAM No:', 15, 74);
    doc.setFont(undefined, 'normal');
    doc.text('U17299DL2020PTC369861', doc.getTextWidth('UAM No: ') + 18, 74);
    
    doc.setFont(undefined, 'bold');
    doc.text('Address:', 15, 78);
    doc.setFont(undefined, 'normal');
    doc.text('KH 31/2 Mile Part A', doc.getTextWidth('Address: ') + 18, 78);

    doc.text('Bahadurgarh, Haryana', 15, 82);

    doc.setFont(undefined, 'bold');
    doc.text('GST No:', 15, 86);
    doc.setFont(undefined, 'normal');
    doc.text('06AACIT0794B1ZI', doc.getTextWidth('GST No: ') + 18, 86);

    
    // Buyer details section
    doc.setFont(undefined, 'bold');
    doc.text('Buyer Details:', 90, 66);
    
    doc.setFont(undefined, 'normal');
    doc.text('TestMQ', 90, 70);
    doc.text('Faridabad,', 90, 74);
    doc.text('Haryana - 06', 90, 78);
    doc.text('234567, India', 90, 82);
    
    // Delivery details section (Right-aligned with proper spacing)
    doc.setFont(undefined, 'bold');
    doc.text('Delivery Details :', 195, 66, { align: 'right' });
    
    doc.setFont(undefined, 'normal');
    doc.text('TestMQ', 195, 70, { align: 'right' });
    doc.text('TMQ-L1', 195, 74, { align: 'right' });
    doc.text('Faridabad,', 195, 78, { align: 'right' });
    doc.text('Haryana - 06', 195, 82, { align: 'right' });
    doc.text('234567, India', 195, 86, { align: 'right' });


    doc.autoTable({
        head: [['Sr. No.', 'Products', 'Grade', 'HSN', 'Unit Price', 'Qty', 'SGST', 'CGST', 'Total']],
        body: [
            [
                '1',
                {
                    content: 'PVC Film \n CRN: 56 \n Front Side \n 1001 A | E102 | ACR | 23 mm | apple | P013 / P013 / Neutral \n Additional Treatments 12356 \n Back Side \n 1002 A | ACR | GRY E123',
                    colSpan: 1, // Merge across 7 columns
                },
                'Ist','39209999', '8.28', '70 m', '130.41', '130.41', '579.60'
            ],
            [
                {
                    content: '70 m',
                    colSpan: 6,
                    styles: { halign: 'right',fontStyle: 'bold'} // Align text to the right
                },
                {
                    content: 'Sub Total',
                    colSpan: 2,
                    styles: { halign: 'right' ,fontStyle: 'bold'} // Align text to the right
                },
                '579.60'
            ],
            [
                {
                    content: 'CGST',
                    colSpan: 8,
                    styles: { halign: 'right',fontStyle: 'bold' }
                },
                '130.41'
            ],
            [
                {
                    content: 'SGST',
                    colSpan: 8,
                    styles: { halign: 'right' ,fontStyle: 'bold'}
                },
                '130.41'
            ],
            [
                {
                    content: 'Round Off / UP',
                    colSpan: 8,
                    styles: { halign: 'right',fillColor: [211, 211, 211],fontStyle: 'bold'}
                },
                {
                    content: '-0.42',
                    colSpan: 1,
                    styles: { halign: 'left',fillColor: [211, 211, 211]}
                },
                
            ],
            [
                {
                    content: 'Grand Total (INR)',
                    colSpan: 8,
                    styles: { halign: 'right',fillColor: [211, 211, 211], fontStyle: 'bold'}
                },
                {
                    content: '840.00',
                    colSpan: 1,
                    styles: { halign: 'left',fillColor: [211, 211, 211], fontStyle: 'bold'}
                },
            ],
            [
                {
                    content: 'Amount In Words: Eight Hundred and Forty Rupees only',
                    colSpan: 9,
                    styles: { halign: 'center',fillColor: [211, 211, 211],fontStyle: 'bold'}
                }
            ]
        ],
        startY: 95,  // Adjust as per your layout
        styles: { 
            lineColor: [0, 0, 0], 
            lineWidth: 0.2,
            fontSize: 8,
        },
        theme: 'plain',
        headStyles: {
            fillColor: [211, 211, 211], // Light Grey
            textColor: [0,0,0]
        },
        columnStyles: {
            0: { cellWidth: 10 },
            1: { cellWidth: 30 },
            2: { cellWidth: 20 },
            3: { cellWidth: 20 },
            4: { cellWidth: 20 },
            5: { cellWidth: 20 },
            6: { cellWidth: 20 },
            7: { cellWidth: 20 },
            8: { cellWidth: 20 }
        },
    });
    
    // Products table with SGST, CGST, and Total

    doc.autoTable({
        head: [['* Terms & Conditions', 'For Team Asia Private Limited']],
        body: [
            [
                `
1. Goods once sold shall not be taken back or exchanged.
2. Discrepancy, if any, in the goods sold, are to be notified in writing to the seller, within the period of 7 days from the date of delivery.
3. Under no circumstances, the liability of seller can exceed the value of the present invoice.
4. In all cases, except those where the seller specifically reserves its right of disposal of goods, the property in goods passes to buyer simultaneously with the delivery of goods to carrier or bailee for transmission.
5. All disputes are subject to the jurisdiction of courts at Jhajjar, Haryana, only.`,
                `






                Authorized Signatory
                `
            ]
        ],
        startY: doc.lastAutoTable.finalY + 2,  // Adjust as per your layout
        styles: { 
            lineColor: [0, 0, 0], 
            lineWidth: 0.2,
            fontSize: 8,
        },
        theme: 'plain',
        headStyles: {
            // fillColor: [211, 211, 211], // Light Grey
            textColor: [0,0,0],
            halign: 'left'
        },
        columnStyles: {
            0: { cellWidth: 130, valign: 'top' },
            1: { cellWidth: 50, valign: 'top', halign: 'center' },
        },
        tableLineColor: [0, 0, 0],
        // tableLineWidth: 0.2,
    });

    };

    const generatePDF = () => {
        
        const doc = new JsPDF();
    
        addInvoiceContent(doc,'(Original For Buyer)');
    // doc.save('invoice.pdf');

        doc.addPage();
        addInvoiceContent(doc,'(Duplicate For Transporter)');

        // Add another page and duplicate the content
        doc.addPage();
        addInvoiceContent(doc,'(Triplicate For Suppliers)');

        const pdfData1 = `${doc.output('bloburl')}`;
        // const pdfData2 = `${doc.output('bloburl')}#2`;
        // const pdfData3 = `${doc.output('bloburl')}#3`;

        window.open(pdfData1);
        // window.open(pdfData2);
        // window.open(pdfData3);
    };

    return (
        <div className="invoice-container">
            <header className="invoice-header">
                <h1>Tax Invoice</h1>
                <p>(Original For Buyer)</p>
            </header>

            <section className="invoice-section">
                <div className="section-left">
                    <h3>Order Details:</h3>
                    <p>Order ID: {orderDetails.orderId}</p>
                    <p>Invoice Number: {orderDetails.invoiceNumber}</p>
                    <p>Purchase Order No.: {orderDetails.purchaseOrderNumber}</p>
                    <p>Order Date: {orderDetails.orderDate}</p>
                </div>
                <div className="section-right">
                    <h3>Dispatch Details:</h3>
                    <p>Item Count: {orderDetails.itemCount}</p>
                    <p>Invoice Date: {orderDetails.invoiceDate}</p>
                    <p>Vehicle Number: {orderDetails.vehicleNumber}</p>
                    <p>Driver Name: {orderDetails.driverName}</p>
                    <p>Driver Mobile: {orderDetails.driverMobile}</p>
                </div>
            </section>

            <section className="invoice-section">
                <div className="section-left">
                    <h3>Seller Details:</h3>
                    <p>{sellerDetails.name}</p>
                    <p>UAM No: {sellerDetails.uamNo}</p>
                    <p>{sellerDetails.address}</p>
                    <p>GST No: {sellerDetails.gstNo}</p>
                </div>
                <div className="section-right">
                    <h3>Buyer Details:</h3>
                    <p>{buyerDetails.name}</p>
                    <p>{buyerDetails.address}</p>
                </div>
            </section>

            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Products</th>
                        <th>Grade</th>
                        <th>HSN</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.grade}</td>
                            <td>{product.hsn}</td>
                            <td>{product.unitPrice}</td>
                            <td>{product.quantity}</td>
                            <td>{product.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <footer className="invoice-footer">
                <p>Terms & Conditions:</p>
                <ul>
                    <li>Goods once sold shall not be taken back or exchanged.</li>
                    <li>All disputes are subject to the jurisdiction of courts at [Your City], Haryana only.</li>
                </ul>
            </footer>

            <button type="button" onClick={generatePDF}>Download PDF</button>
        </div>
    );
};

export default Invoice;

