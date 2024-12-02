import React, { useEffect,} from "react";
import JsPDF from "jspdf";
import "jspdf-autotable";
import { useLocation } from "react-router-dom";
// import { useNavigate, useLocation } from "react-router-dom";
// import Barcode from "react-barcode";
import JsBarcode from "jsbarcode";  // Import JsBarcode
import imgData from "./logo";

const Invoice = () => {
    const location = useLocation();
    // const navigate = useNavigate();
    // const barcodeRef = useRef(null);
    const jumboId = location.state;

    console.log('jumboId',jumboId);
    
    const getBarcodeDataUrl = (value) => {
        const canvas = document.createElement("canvas");
        JsBarcode(canvas, value, {
            format: "CODE128", // Barcode format
            width: 2,
            height: 40,
            displayValue: true, // Hide the text below the barcode
        });
        return canvas.toDataURL("image/png");
    };



    const addInvoiceContent = async (doc,temp,prod) => {

        const barcodeImage = getBarcodeDataUrl(`JUMBO${jumboId}`); 

        doc.setFontSize(10);
        doc.autoTable({
            head: [["", "", ""]],
            body: [
                [
                    { content: "", colSpan: 1, styles: { halign: "center" } },
                    { content: "JUMBO ROLL", colSpan: 2, styles: { valign: "middle", halign:'center' } },
                ],
                [
                    {
                        content: "",
                        colSpan: 3,
                        styles: { halign: "center",valign:'middle', fontStyle: "bold",fontSize:10},
                    },
                ],
                [
                    {
                        content: `Order No : #${prod.order_id}`,
                        colSpan: 1,
                        styles: { halign: "left"},
                    },
                    {
                        content: `Line: Line ${temp.line_id}`,
                        colSpan: 2,
                        styles: { halign: "left" },
                    },
                ],
                [
                    {
                        content: `Length: ${temp.quantity} meters`,
                        colSpan: 3,
                        styles: { halign: "left" },
                    },
                ],
                [
                    {
                        content: `Grade: ${temp.grade_id} - missing`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                    {
                        content: `Mfg. Date: ${temp.created_at}`,
                        colSpan: 2,
                        styles: { halign: "left" },
                    },
                ],
                [
                    {
                        content: `QA Engineer: ${temp.qa_id} - missing`,
                        colSpan: 3,
                        styles: { halign: "left" },
                    },
                ],
                [
                    {
                        content: `Grain \n${prod.grain_name}`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                    {
                        content: `Color \n${prod.color_name}`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                    {
                        content: `Quality \n${prod.quality_name}`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                ],
                [
                    {
                        content: `Thickness \n${prod.thickness}mm`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                    {
                        content: `Fabric \n${prod.fabric_name}m`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                    {
                        content: `Fabric Color \n${prod.fabric_color_name}`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                ],
            ],
            styles: {
                lineColor: [0, 0, 0],
                lineWidth: 0.2,
                fontSize: 9,
                cellWidth: "auto",
                cellPadding: 1, // Set cell padding to reduce space inside cells
            },
            theme: "plain",
            headStyles: {
                textColor: [0, 0, 0],
            },
            columnStyles: {
                0: { cellWidth: 31 },
                1: { cellWidth: 31 },
                2: { cellWidth: 31 },
            },
            margin: 3.5,
            tableLineWidth: 0.35,
            tableLineColor: [0, 0, 0],
            cellPadding:1,
            showHead: "never",
            didDrawCell: (data) => {
                if (data.section === "body" && data.row.index === 0 && data.column.index === 0) {
                    // Draw logo image in the first cell
                    doc.addImage(imgData, "PNG", data.cell.x + 1, data.cell.y + 1, 28, 14);
                }
                if (data.section === "body" && data.row.index === 1 && data.column.index === 0) {
                    // Draw barcode image in the first cell of the second row
                    doc.text("Teamasia Marketing Pvt. Ltd.  - missing", data.cell.x + 20, data.cell.y + 5); // Adjust the coordinates as needed
                    doc.addImage(barcodeImage, "PNG", data.cell.x + 5, data.cell.y + 6,80, 14);
                }
            },
            didParseCell: (data) => {
                if (data.section === 'body' && data.row.index === 0) { // Adjust condition as needed
                    data.cell.styles.minCellHeight = 15; // Set the desired cell height
                }
                if (data.section === 'body' && data.row.index === 1) { // Adjust condition as needed
                    data.cell.styles.minCellHeight = 20; // Set the desired cell height
                }
            },
        });
    };

    const addInvoiceContentSp = async (doc,temp,prod) => {

        const barcodeImage = getBarcodeDataUrl(`JUMBO${jumboId}`); 

        doc.setFontSize(10);
        doc.autoTable({
            head: [["", "", ""]],
            body: [
                [
                    { content: "", colSpan: 1, styles: { halign: "center" } },
                    { content: "JUMBO ROLL", colSpan: 2, styles: { valign: "middle", halign:'center' } },
                ],
                [
                    {
                        content: "",
                        colSpan: 3,
                        styles: { halign: "center",valign:'middle', fontStyle: "bold",fontSize:10},
                    },
                ],
                [
                    {
                        content: `Order No : #${prod.order_id}`,
                        colSpan: 1,
                        styles: { halign: "left"},
                    },
                    {
                        content: `Line: Line ${temp.line_id}`,
                        colSpan: 2,
                        styles: { halign: "left" },
                    },
                ],
                [
                    {
                        content: `Length: ${temp.quantity} meters`,
                        colSpan: 3,
                        styles: { halign: "left" },
                    },
                ],
                [
                    {
                        content: `Grade: ${temp.grade_id} - missing`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                    {
                        content: `Mfg. Date: ${temp.created_at}`,
                        colSpan: 2,
                        styles: { halign: "left" },
                    },
                ],
                [
                    {
                        content: `QA Engineer: ${temp.qa_id} - missing`,
                        colSpan: 3,
                        styles: { halign: "left" },
                    },
                ],
                [
                    {
                        content: `Grain \n${prod.grain_name}`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                    {
                        content: `Color \n${prod.color_name}`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                    {
                        content: `Quality \n${prod.quality_name}`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                ],
                [
                    {
                        content: `Thickness \n${prod.thickness}mm`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                    {
                        content: `Fabric \n${prod.fabric_name}m`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                    {
                        content: `Fabric Color \n${prod.fabric_color_name}`,
                        colSpan: 1,
                        styles: { halign: "left" },
                    },
                ],
            ],
            styles: {
                lineColor: [0, 0, 0],
                lineWidth: 0.2,
                fontSize: 9,
                cellWidth: "auto",
                cellPadding: 1, // Set cell padding to reduce space inside cells
            },
            theme: "plain",
            headStyles: {
                textColor: [0, 0, 0],
            },
            columnStyles: {
                0: { cellWidth: 31 },
                1: { cellWidth: 31 },
                2: { cellWidth: 31 },
            },
            margin: 3.5,
            tableLineWidth: 0.35,
            tableLineColor: [0, 0, 0],
            cellPadding:1,
            showHead: "never",
            didDrawCell: (data) => {
                if (data.section === "body" && data.row.index === 0 && data.column.index === 0) {
                    // Draw logo image in the first cell
                    doc.addImage(imgData, "PNG", data.cell.x + 1, data.cell.y + 1, 28, 14);
                }
                if (data.section === "body" && data.row.index === 1 && data.column.index === 0) {
                    // Draw barcode image in the first cell of the second row
                    doc.text("Teamasia Marketing Pvt. Ltd.  - missing", data.cell.x + 20, data.cell.y + 5); // Adjust the coordinates as needed
                    doc.addImage(barcodeImage, "PNG", data.cell.x + 5, data.cell.y + 6,80, 14);
                }
            },
            didParseCell: (data) => {
                if (data.section === 'body' && data.row.index === 0) { // Adjust condition as needed
                    data.cell.styles.minCellHeight = 15; // Set the desired cell height
                }
                if (data.section === 'body' && data.row.index === 1) { // Adjust condition as needed
                    data.cell.styles.minCellHeight = 20; // Set the desired cell height
                }
            },
        });
    };

    function formatDate(inputDate) {
        const date = new Date(inputDate);
      
        // Use Intl.DateTimeFormat to format the date
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
      }

    const generatePDF = async (temp,prod,op) => {
        const doc = new JsPDF({
            unit: "mm",
            format: [100, 150],
        });

        temp.created_at = formatDate(temp.end_date);
        if(op === 1){
            await addInvoiceContent(doc,temp,prod);
        }else{
            await addInvoiceContentSp(doc,temp,prod);
        }

        const pdfData1 = `${doc.output("bloburl")}`;
        console.log(pdfData1);
        window.open(pdfData1);
    };


    useEffect(() => {

        const fetchProductPair = async (jumboResult,productData) => {
            try{
             let urlId = '';

            //  {(product.is_online_product !== '0' || product.ref_product_id !== '0') online product}
                            
                            // {product.is_online_product === '0' && product.ref_product_id !== '0' back side}

             if(productData.is_online_product === '1' && productData.ref_product_id === '0'){
                urlId = productData.id
             }else{
                urlId = productData.ref_product_id
             }


              const token = localStorage.getItem('userToken');
              // console.log('token',token);
              const response = await fetch(`https://factory.teamasia.in/api/public/products/${urlId}`, {
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
              console.log("responsejson1 product (may be front side or back side",result);
              
              if(result){
                  //setData(result);
                    generatePDF(jumboResult,result,2);
                  //   navigate(-1);
              };
            }catch(error){
             console.log('error',error);
            }
          }

        const fetchProduct = async (jumboResult) => {
              try{
                const token = localStorage.getItem('userToken');
                // console.log('token',token);
                const response = await fetch(`https://factory.teamasia.in/api/public/products/${jumboResult.product_id}`, {
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
                console.log("responsejson1 product (may be front side or back side",result);
                
                if(result){
                    //setData(result);
                    if(result.is_online_product === '0' && result.ref_product_id === '0'){
                        generatePDF(jumboResult,result,1);
                    }else{
                        fetchProductPair(jumboResult,result);
                    }
                    //   navigate(-1);
                };
              }catch(error){
               console.log('error',error);
              }
            }

            const fetchData = async () => {
            console.log('location',jumboId)
              try{
                const token = localStorage.getItem('userToken');
                // console.log('token',token);
                const response = await fetch(`https://factory.teamasia.in/api/public/jumboroll/${jumboId}`, {
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
                console.log("responsejson1 jumboroll",result[0]);
                
                if(result?.length > 0){
                    //setData(result);
                    fetchProduct(result[0]);
                };
              }catch(error){
               console.log('error',error);
              }
            }
            fetchData();
        },[]);
    return (
        <>
           <button type="button" onClick={generatePDF}>Download PDF</button>
        </>
    );
};

export default Invoice;
