import React ,{useState,useEffect,useCallback} from 'react';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';
import {
  Collapse,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  FormText,   
  Row,
  Col,
  Table,
  Input,
  FormGroup,
  Form,
  CardBody,
  Label,
  Card,
} from 'reactstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ComponentCard1 from '../../../components/ComponentCard1';
import ComponentCard4 from '../../../components/ComponentCard4';
import 'react-table-v6/react-table.css';
import OrderProduct from './orderProduct';


const useDebouncedFetchOptions = (endpoint) => {
  const fetchOptions = async (inputValue) => {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`https://factory.teamasia.in/api/public/${endpoint}?search=${inputValue}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result[endpoint].map(item => ({ value: item.id, label: item.name || item.code || item.company_name }));
  };

  const debouncedFetch = useCallback(debounce((inputValue, callback) => {
    fetchOptions(inputValue).then(callback).catch(error => {
      console.error(error);
      callback([]);
    });
  }, 300), [endpoint]);

  return debouncedFetch;
};

const JumbotronComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState([]);
  const {id,managePlanDate}    = location.state || {}; 
  // const [data,setData] = useState([]);
  const [line1, setLine1] = useState([]);
  const [line2, setLine2] = useState([]);
  const [line3, setLine3] = useState([]);
  const [line4, setLine4] = useState([]);
  const [line5, setLine5] = useState([]);
  const [line6, setLine6] = useState([]);
  const [errors,setErrors] = useState({});
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [OrderWithCompleteData,setOrderWithCompleteData] =  useState([]);
  const [filteredOrderCompleteData, setFilteredOrderCompleteData] = useState([]);
  const [collapseSearch, setCollapseSearch] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [SaverityData, setSaverityData] = useState([]);
  const [searchData,setSearchData] = useState({
    customerId:{value: 'x', label: 'choose'},
    severityId:'x',
    grain: { value: 'x', label: 'choose'},
    searchBy:'0',
    orderID:'',
    sortOrder:'0'
  });

  const customerOptions = useDebouncedFetchOptions('customers');
  const grainOptions = useDebouncedFetchOptions('grains');

  const toggleSort = (op)=>{
    // console.log('op',op);
    setSearchData(prevState => ({
      ...prevState,
      sortOrder:op
    }));
  }

  const handleSelectChange = (selectedOption, actionMeta) => {
    setSearchData(prevState => ({
      ...prevState,
      [actionMeta.name]: selectedOption
    }));
  };

  const handleSearchChange = (e) => {
    const {name, value} = e.target;
    setSearchData(prevState => ({
      ...prevState,
      [name] : value
    }));
  };

  const handleSearchReset = () => {
    setSearchData({
      customerId:{ value: 'x', label: 'choose'},
      severityId:'x',
      grain: { value: 'x', label: 'choose'},
      searchBy:'0',
      sortOrder:'0'
    });
    setFilteredOrderCompleteData(OrderWithCompleteData);
  };
  
  const filterOrders = (orderArray, filterData) => {

    // console.log('orderArray',orderArray,filterData);
    const filterdOrders = orderArray.filter(order => {
      // Filter by customer ID
      const matchesCustomerId = (filterData.customerId?.value !== 'x'||'')
        ? order.customer_id === filterData.customerId.value
        : true;

      // const matchesCustomerId = true;
  
      // Filter by order ID


  
      // Filter by severity ID
      const matchesSeverityId = filterData.severityId !== 'x'
        ? order.severity_id === filterData.severityId
        : true;
  
        // const matchesSeverityId = true;

      // Filter by grain ID in productDetails
      const matchesGrain = (filterData.grain?.value !== 'x'||'')
        ? order.productDetails.some(
            product => product.grain_id === filterData.grain.value
          )
        : true;
       
        // const matchesGrain = true;
      // Return true if all filters match
      return matchesCustomerId && matchesSeverityId && matchesGrain;
    });

    if(filterData.searchBy === '1'){
      filterdOrders.sort((A,B)=>{
        const DateA = new Date(A.expected_delivery_date);
        const DateB = new Date(B.expected_delivery_date);

        return filterData.sortOrder === '0'? DateA -DateB: DateB-DateA
      })
    }
    if(filterData.searchBy === '2'){
      filterdOrders.sort((A,B)=>{
        const DateA = new Date(A.created_at);
        const DateB = new Date(B.created_at);

        return filterData.sortOrder === '0'? DateA -DateB: DateB-DateA
      })
    }
 
    return filterdOrders;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log('form',searchData);
    const filteredOrders = filterOrders(OrderWithCompleteData, searchData);
    // console.log('Filtered Orders:', filteredOrders);
    setFilteredOrderCompleteData(filteredOrders);
  };

  const toggleSearch = () => setCollapseSearch(!collapseSearch);

  const toggle1 = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  console.log('location',id);
  const toggle = (index) => {
    const newArray = [...collapse];
    newArray[index]= !newArray[index];
    setCollapse(newArray);
  }

  const handleDragEnd = (result, line, setLine) => {
    console.log('result',result);
    if (!result.destination) return;
    const items = Array.from(line);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setLine(items);
  };

  
  const addItemToLine = (product) => {
    let newItems;
    // console.log('mega in additemline',line1,product);
    if(activeTab === '1'){
       newItems = line1.slice();
    }
    else if(activeTab === '2'){
       newItems = line2.slice();
    }
    else if(activeTab === '3'){
       newItems = line3.slice();
    }
    else if(activeTab === '4'){
       newItems = line4.slice();
    }
    else if(activeTab === '5'){
       newItems = line5.slice();
    }
    else if(activeTab === '6'){
       newItems = line6.slice();
    }

    newItems.push({...product,product_id:product.id,customer_details:{company_name:product.customerNameFromManagePlan},plan_date:managePlanDate,quantity:'',pre_skin:'',skin:'',top_coat:'',filler_in_top_coat:'',foam:'',filler_in_foam:'',adhesive:'',filler_in_adhesive:'',final_gsm:'',line_id:activeTab,sequence:uuidv4(),is_passed: "0",passBar:"0"});
    // console.log('mega',newItems);
    if(activeTab === '1'){
       setLine1(newItems);
   }
   else if(activeTab === '2'){
       setLine2(newItems);
   }
   else if(activeTab === '3'){
       setLine3(newItems);
   }
   else if(activeTab === '4'){
       setLine4(newItems);
   }
   else if(activeTab === '5'){
       setLine5(newItems);
   }
   else if(activeTab === '6'){
       setLine6(newItems);
   }
  };

  const addPassToLine = () => {
    let newItems;
    // console.log('mega in additemline',line1,product);
    if(activeTab === '1'){
       newItems = line1.slice();
    }
    else if(activeTab === '2'){
       newItems = line2.slice();
    }
    else if(activeTab === '3'){
       newItems = line3.slice();
    }
    else if(activeTab === '4'){
       newItems = line4.slice();
    }
    else if(activeTab === '5'){
       newItems = line5.slice();
    }
    else if(activeTab === '6'){
       newItems = line6.slice();
    }

    newItems.push({product_id:uuidv4(),line_id:activeTab,sequence:uuidv4(),passBar:"1"});
    // console.log('mega',newItems);
    if(activeTab === '1'){
       setLine1(newItems);
   }
   else if(activeTab === '2'){
       setLine2(newItems);
   }
   else if(activeTab === '3'){
       setLine3(newItems);
   }
   else if(activeTab === '4'){
       setLine4(newItems);
   }
   else if(activeTab === '5'){
       setLine5(newItems);
   }
   else if(activeTab === '6'){
       setLine6(newItems);
   }
  };

  const removeItemFromLine = index => {
    let newItems;
    // console.log('mega in removeitemline',line1);
    if(activeTab === '1'){
       newItems = line1.slice();
    }
    else if(activeTab === '2'){
       newItems = line2.slice();
    }
    else if(activeTab === '3'){
       newItems = line3.slice();
    }
    else if(activeTab === '4'){
       newItems = line4.slice();
    }
    else if(activeTab === '5'){
       newItems = line5.slice();
    }
    else if(activeTab === '6'){
       newItems = line6.slice();
    }

    newItems.splice(index, 1);

    // console.log('mega',newItems);
    if(activeTab === '1'){
       setLine1(newItems);
   }
   else if(activeTab === '2'){
       setLine2(newItems);
   }
   else if(activeTab === '3'){
       setLine3(newItems);
   }
   else if(activeTab === '4'){
       setLine4(newItems);
   }
   else if(activeTab === '5'){
       setLine5(newItems);
   }
   else if(activeTab === '6'){
       setLine6(newItems);
   }
  };

  const handleInputChangeOfPlan = (index, event) => {
    let newItems;
    const {name ,value} = event.target;
    if(activeTab === '1'){
      newItems = line1.slice();
   }
   else if(activeTab === '2'){
      newItems = line2.slice();
   }
   else if(activeTab === '3'){
      newItems = line3.slice();
   }
   else if(activeTab === '4'){
      newItems = line4.slice();
   }
   else if(activeTab === '5'){
      newItems = line5.slice();
   }
   else if(activeTab === '6'){
      newItems = line6.slice();
   }

  // console.log("data",index,newItems[index]);

  newItems[index][name] =  value;

if(activeTab === '1'){
    setLine1(newItems);
}
else if(activeTab === '2'){
    setLine2(newItems);
}
else if(activeTab === '3'){
    setLine3(newItems);
}
else if(activeTab === '4'){
    setLine4(newItems);
}
else if(activeTab === '5'){
    setLine5(newItems);
}
else if(activeTab === '6'){
    setLine6(newItems);
}
  };

  // const handleEditcustomer = () => {
  //   navigate('/order/customers/edit',{state:location.state});
  // };
  


function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    // Use Intl.DateTimeFormat to format the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);

}

const closer =()=>{
  setErrorMessageFromApi([]);
}

const LineWithSpFunction = (line)=>{
  const lineWithSp = [];
  let pass = 1; 
  let sequence = 1; 
  let encounteredZero = false; 
  
  // Loop through each product in line1
  line.forEach((productionPlan) => {
    if (productionPlan.passBar === '0') {
      encounteredZero = true; 
      lineWithSp.push({ ...productionPlan, sequence, is_passed: pass });
      sequence += 1; 
    } else if (productionPlan.passBar === '1' && encounteredZero) {
      pass += 1;
      sequence = 1;
      encounteredZero = false; 
    }
  });
  
  // console.log('line',lineWithSp);
  return lineWithSp;
}

async function apiCall() {
  try {
      
      console.log('item1',line1);
      console.log('item2',line2);
      console.log('item3',line3);
      console.log('item4',line4);
      console.log('item5',line5);
      console.log('item6',line6);
      
      const Line1WithSp = LineWithSpFunction(line1)
      const Line2WithSp = LineWithSpFunction(line2)
      const Line3WithSp = LineWithSpFunction(line3)
      const Line4WithSp = LineWithSpFunction(line4)
      const Line5WithSp = LineWithSpFunction(line5)
      const Line6WithSp = LineWithSpFunction(line6)
      
      console.log('Line1WithSp',Line1WithSp);
      console.log('Line2WithSp',Line2WithSp);
      console.log('Line3WithSp',Line3WithSp);
      console.log('Line4WithSp',Line4WithSp);
      console.log('Line4WithSp',Line5WithSp);
      console.log('Line4WithSp',Line6WithSp);

      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/productionplan`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
         
          body: JSON.stringify([...Line1WithSp,...Line2WithSp,...Line3WithSp,...Line4WithSp,...Line5WithSp,...Line6WithSp]),
      });

      const datas = await response.json();
      // console.log("dataapi",datas,response);
      if (response.status === 201) {
        console.log('product is added successfully ,please use this product id as ref_id in back side product')
        navigate(-1);
      } else {
        console.error("Authentication failed:", Object.values(datas.messages.errors));
        if (datas.error) {
          setErrorMessageFromApi(Object.values(datas.messages.errors));
        }
      }  
      return null;
    } catch (error) {
      console.log('error',error);
       setErrorMessageFromApi(["Network error"]);
      return null;
    }
}

const validateForm =()=>{
  let formIsValid =true;
  const errors1 ={};

  
    line1.forEach((element) => {
    console.log('element',element);
    if(element.quantity=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["quantity"] ="Required"
          }
          if(element.pre_skin === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["pre_skin"] ="Required"
          }
          if(element.skin	=== '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["skin"] ="Required"
          }
          if(element.top_coat === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["top_coat"] ="Required"
          }
          if(element.filler_in_top_coat === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["filler_in_top_coat"] ="Required"
          }
          if(element.foam === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["foam"] ="Required"
          }
          if(element.filler_in_foam === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["filler_in_foam"] ="Required"
          }
          if(element.adhesive === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["adhesive"] ="Required"
          }
          if(element.filler_in_adhesive === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["filler_in_adhesive"] ="Required"
          }
          if(element.final_gsm === '0000'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["final_gsm"] ="Required"
          }
      });
    
    line2.forEach((element) => {
      console.log('element',element);
      if(element.quantity=== ''){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["quantity"] ="Required"
            }
            if(element.pre_skin === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["pre_skin"] ="Required"
            }
            if(element.skin	=== '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["skin"] ="Required"
            }
            if(element.top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["top_coat"] ="Required"
            }
            if(element.filler_in_top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_top_coat"] ="Required"
            }
            if(element.foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["foam"] ="Required"
            }
            if(element.filler_in_foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_foam"] ="Required"
            }
            if(element.adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["adhesive"] ="Required"
            }
            if(element.filler_in_adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_adhesive"] ="Required"
            }
            if(element.final_gsm === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["final_gsm"] ="Required"
            }
        });

    line3.forEach((element) => {
      console.log('element',element);
      if(element.quantity=== ''){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["quantity"] ="Required"
            }
            if(element.pre_skin === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["pre_skin"] ="Required"
            }
            if(element.skin	=== '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["skin"] ="Required"
            }
            if(element.top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["top_coat"] ="Required"
            }
            if(element.filler_in_top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_top_coat"] ="Required"
            }
            if(element.foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["foam"] ="Required"
            }
            if(element.filler_in_foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_foam"] ="Required"
            }
            if(element.adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["adhesive"] ="Required"
            }
            if(element.filler_in_adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_adhesive"] ="Required"
            }
            if(element.final_gsm === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["final_gsm"] ="Required"
            }
        });

    line4.forEach((element) => {
      console.log('element',element);
      if(element.quantity=== ''){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["quantity"] ="Required"
            }
            if(element.pre_skin === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["pre_skin"] ="Required"
            }
            if(element.skin	=== '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["skin"] ="Required"
            }
            if(element.top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["top_coat"] ="Required"
            }
            if(element.filler_in_top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_top_coat"] ="Required"
            }
            if(element.foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["foam"] ="Required"
            }
            if(element.filler_in_foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_foam"] ="Required"
            }
            if(element.adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["adhesive"] ="Required"
            }
            if(element.filler_in_adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_adhesive"] ="Required"
            }
            if(element.final_gsm === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["final_gsm"] ="Required"
            }
        });

    line5.forEach((element) => {
      console.log('element',element);
      if(element.quantity=== ''){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["quantity"] ="Required"
            }
            if(element.pre_skin === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["pre_skin"] ="Required"
            }
            if(element.skin	=== '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["skin"] ="Required"
            }
            if(element.top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["top_coat"] ="Required"
            }
            if(element.filler_in_top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_top_coat"] ="Required"
            }
            if(element.foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["foam"] ="Required"
            }
            if(element.filler_in_foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_foam"] ="Required"
            }
            if(element.adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["adhesive"] ="Required"
            }
            if(element.filler_in_adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_adhesive"] ="Required"
            }
            if(element.final_gsm === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["final_gsm"] ="Required"
            }
        });

    line6.forEach((element) => {
      console.log('element',element);
      if(element.quantity=== ''){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["quantity"] ="Required"
            }
            if(element.pre_skin === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["pre_skin"] ="Required"
            }
            if(element.skin	=== '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["skin"] ="Required"
            }
            if(element.top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["top_coat"] ="Required"
            }
            if(element.filler_in_top_coat === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_top_coat"] ="Required"
            }
            if(element.foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["foam"] ="Required"
            }
            if(element.filler_in_foam === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_foam"] ="Required"
            }
            if(element.adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["adhesive"] ="Required"
            }
            if(element.filler_in_adhesive === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["filler_in_adhesive"] ="Required"
            }
            if(element.final_gsm === '0000'){
                formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["final_gsm"] ="Required"
            }
        });

  setErrors(errors1);
  return formIsValid;
}




const handleSubmit = async () => {
  console.log('line1',line1);
  

  if(validateForm()) {
    console.log('Form is valid, proceed with API call');
    apiCall();
  } else {
    console.log('Form is invalid, do not submit');
  }
  
};

useEffect(()=>{
    const fetchData = async ()=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/orders/?status_id=1`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
   console.log('responsejson.........',result);
   if(result.orders.length !== 0){
     setCollapse(Array(result.orders.length).fill(false));
    //  setData(result.orders);
     setOrderWithCompleteData(result?.orders);
     setFilteredOrderCompleteData(result?.orders);
   }
  }


  const fetchSeverityData = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch('https://factory.teamasia.in/api/public/severities/?is_trashed=0', {
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
    // console.log("data severities",result.severities);
    const resultX = result.severities.slice();
    const sever = resultX.find(item => item.id === searchData.severityId);
    if(!sever){
      setSearchData(prevState => ({
        ...prevState,
        severityId:'x'
      }));
    }
    resultX.push({id:'x',name:'Choose'});
    setSaverityData(resultX); 
  };


    fetchSeverityData();
    fetchData();
  },[]);
  
  // console.log('data',data);

  return (
    <>
      <ComponentCard1 title="">
              <Row>
                <Col md="12">
                    <ComponentCard4>
                        <div className="order-view-page-flex">
                          <div style={{fontSize:'17px',fontWeight:'500',textTransform:'uppercase'}}> Manage Production Plan @ <span style={{fontWeight:'800'}}>{formatDate(managePlanDate)} </span>
                            <span style={{marginLeft:'17px'}}>
                                    {/* <Button className='my-btn-color' onClick={() => handleEditcustomer()}>
                                        Change Date
                                    </Button> */}
                            </span>
                          </div>
                        </div>
                    </ComponentCard4>
                   
                </Col>
              </Row>
               
              <Row style={{padding:'8px'}}>
                  <Button className='' onClick={toggleSearch.bind(null)} style={{background:'whitesmoke',width:'100%'}}>
                      <div style={{background:'#3780a2',width:'fit-content',borderRadius:'50%',padding:'5px 10px'}}>
                        <i className='bi-funnel' style={{fontSize:'20px',color:'white'}}/>
                      </div>
                  </Button>
                  <Collapse isOpen={collapseSearch}>
                  <Card className="border">
                    <CardBody>
                      <Form  onSubmit={handleSearch}>
                        <Row>
                          <Col md="2">
                            <FormGroup>
                              <Label>Customer</Label>
                              <AsyncSelect
                                    name="customerId"
                                    onChange={handleSelectChange}
                                    loadOptions={customerOptions}
                                    value={searchData.customerId}
                                    isClearable
                                    isSearchable
                                  />
                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                          <Col md="2">
                            <FormGroup>
                              <Label>Priority</Label>
                              <Input type="select" 
                                    name="severityId" 
                                    value={searchData.severityId}
                                    onChange={handleSearchChange} >
                                      {SaverityData.map((item)=>{
              
                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                      })}
                                </Input>
                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                          <Col md="2">
                            <FormGroup>
                            <Label>Grain</Label>
                            <AsyncSelect
                              name="grain"
                              onChange={handleSelectChange}
                              loadOptions={grainOptions}
                              value={searchData.grain}
                              isClearable
                              isSearchable
                            />
                          </FormGroup>
                          </Col>

                          <Col md="1">
                            <FormGroup>
                              <Label>Sort By</Label>
                              <Input type="select"
                                name="searchBy" 
                                value={searchData.searchBy} 
                                onChange={handleSearchChange} 
                                >
                                <option value='0'>Sort By..</option>
                                <option value='1'>Expected Date</option>
                                <option value='2'>Order Date</option>
                                </Input>
                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                          <Col md="1">
                            <FormGroup>
                                <Label>Sort By</Label>
                                <div>
                                {searchData.sortOrder === '0'?<i className="bi bi-sort-down-alt" style={{fontSize:'25px'}} onClick={()=>toggleSort('1')}></i>:null} 
                                {searchData.sortOrder === '1'?<i className="bi bi-sort-down" style={{fontSize:'25px'}} onClick={()=>toggleSort('0')}></i>:null} 
                                </div>
                            </FormGroup>
                          </Col>
                        
                          <Col md="2">
                            <FormGroup>
                              <Button type="submit" className="btn btn-info" style={{ marginTop: "28px" }}>
                                Search
                              </Button>
                              <Button type="button" className="btn btn-info" style={{ marginTop: "28px", marginLeft: "10px" }} onClick={handleSearchReset}>
                                Reset
                              </Button>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                  </Collapse>   
               </Row>
              
              <Row>
                 <Col md="5"> 
                        {filteredOrderCompleteData.length !== 0?
                          filteredOrderCompleteData.map((AddressItem,index)=>(
                            <div key={AddressItem.id}>
                                {/* <div className="my-btn-color" onClick={()=>toggle(index)} style={{textAlign:'center',color:'white',marginBottom:'2px',padding:'5px'}}> #{AddressItem.id} {CustomerName(AddressItem.customer_id)} (Grains : ALINEA,3001 A) <br></br> */}
                                <div className="my-btn-color" onClick={()=>toggle(index)} style={{textAlign:'center',color:'white',marginBottom:'2px',padding:'5px'}}> #{AddressItem.id} {AddressItem.customer_details.company_name}<br></br>
                                    Order Date: {formatDate(AddressItem.created_at)} | Nearest Expected Date: {formatDate(AddressItem.expected_delivery_date)}
                                </div>
                                <Collapse isOpen={collapse[index]}>
                                    <OrderProduct orderID ={AddressItem.id} formatDate = {formatDate} addItemToLine={addItemToLine} removeItemFromLine = {removeItemFromLine} customerNameFromManagePlan={AddressItem.customer_details.company_name} customerID={AddressItem.customer_id}/>
                                </Collapse>
                            </div>
                          ))
                          :<div className="my-btn-color"  style={{textAlign:'center',color:'white',marginBottom:'2px',padding:'20px'}}> 
                               NO CONFIRMED ORDER
                          </div>
                        }
                 </Col>
                <Col md="7">
                    <ComponentCard4 title="">
                      <div>{errorMessageFromApi.length !== 0 && (
                        <div style={{ background:'#ff9c7a',color: 'black', marginBottom: '10px', padding:"5px 10px"}}>
                          <div style={{display:'flex',justifyContent:'space-between'}}>
                            Following errors were found:
                            <span onClick={closer} style={{cursor:'pointer'}}>X</span>
                          </div>
                          <ul>
                            {errorMessageFromApi.map((item)=>
                            <li>
                                {item}
                            </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={activeTab === '1' ? 'active' : ''}
                            onClick={() => {
                              toggle1('1');
                            }}
                          >
                            P1
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === '2' ? 'active' : ''}
                            onClick={() => {
                              toggle1('2');
                            }}
                          >
                            P1N
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === '3' ? 'active' : ''}
                            onClick={() => {
                              toggle1('3');
                            }}
                          >
                            P2
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === '4' ? 'active' : ''}
                            onClick={() => {
                              toggle1('4');
                            }}
                          >
                            P2N
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === '5' ? 'active' : ''}
                            onClick={() => {
                              toggle1('5');
                            }}
                          >
                            P3
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === '6' ? 'active' : ''}
                            onClick={() => {
                              toggle1('6');
                            }}
                          >
                            P3N
                          </NavLink>
                        </NavItem>
                        <Button className="my-btn-mo-color" style={{margin:'0px 20px 0px 10px'}} onClick={()=>addPassToLine()}><i className='bi bi-arrow-down-square-fill' style={{color:'red'}}></i></Button>
                        <Button className='my-btn-color' onClick={()=>handleSubmit()}>Save Plan</Button>
                      </Nav>
                      <TabContent className="p-2" activeTab={activeTab}>
                        <TabPane tabId="1">
                           <DragDropContext
                              onDragEnd={(result) => handleDragEnd(result, line1, setLine1)}
                            >
                                <Droppable droppableId="line1">
                                  {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                          {
                                            line1.map((product,index)=>
                                                    ( 

                                                      <Draggable
                                                        key={`line1${product.sequence}`}
                                                        draggableId={String(product.id + product.sequence)}
                                                        index={index}
                                                       >
                                                      {(provided1) => (
                                                        <div
                                                          ref={provided1.innerRef}
                                                          {...provided1.draggableProps}
                                                          {...provided1.dragHandleProps}
                                                         >
                                                          {product.passBar === '1' ?<div style={{display:'flex',justifyContent:'space-between',background:'#f1c76f',alignItems:'center',margin:"10px 0px",padding:"5px"}}>
                                                                  <span className='production-plan-page-collape-heading' style={{width:'80%',textAlign:'center'}}>Pass Completed</span>
                                                                  
                                                                  <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                                              </div>:
                                                              <div key={product.id + product.sequence}>
                                                                <div>
                                                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.ref_product_id !== '0'? product.ref_product_id: product.id} 
                                                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customer_details.company_name}</button>
                                                                  {/* {product.is_factory_surplus_product !== '0' && <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>factory product</button>} */}
                                                                  {(product.is_online_product !== '0' || product.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                                                  {product.is_online_product !== '0' && product.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                                                  {product.is_online_product === '0' && product.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                                                  <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                                              </div>
                                                              <Table size='sm' className="order-page-table" responsive>     
                                                                    <tbody> 
                                                                          <tr>
                                                                              <td title={product.grain_name}>{product.grain_name}</td>
                                                                              <td title={product.color_name}>{product.color_name}</td>
                                                                              <td title={product.quality_name}>{product.quality_name}</td>
                                                                              <td title={product.fabric_name}>{product.fabric_name}</td>
                                                                              <td title={product.fabric_color_name}>{product.fabric_color_name}</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title={product.thickness}>{product.thickness}mm</td>
                                                                          </tr>
                                                                          
                                                                          <tr>
                                                                            <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                                                            <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="" colSpan={5}>Additional Treatment :</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="quantity" 
                                                                                value={product.quantity} 
                                                                                type="number" 
                                                                                
                                                                                placeholder="quantity"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.quantity  === '' && errors.quantity  ? "is-invalid":""}
                                                                                />
                                                                                { product.quantity === '' && errors.quantity  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="pre_skin" 
                                                                                value={product.pre_skin} 
                                                                                type="text" 
                                                            
                                                                                placeholder="pre Skin"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.pre_skin  === '' && errors.pre_skin  ? "is-invalid":""}
                                                                                />
                                                                                { product.pre_skin === '' && errors.pre_skin  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="skin" 
                                                                                value={product.skin} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="skin"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.skin  === '' && errors.skin  ? "is-invalid":""}
                                                                                />
                                                                                { product.skin === '' && errors.skin  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="top_coat" 
                                                                                value={product.top_coat} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="topCoat"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)} 
                                                                                className={product.top_coat  === '' && errors.top_coat  ? "is-invalid":""}
                                                                                />
                                                                                { product.top_coat === '' && errors.top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_top_coat" 
                                                                                value={product.filler_in_top_coat} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In TopCoat" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_top_coat  === '' && errors.filler_in_top_coat  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_top_coat === '' && errors.filler_in_top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="foam" 
                                                                                value={product.foam} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="foam" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.foam  === '' && errors.foam  ? "is-invalid":""}
                                                                                />
                                                                                { product.foam === '' && errors.foam  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_foam" 
                                                                                value={product.filler_in_foam} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In Form" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_foam  === '' && errors.filler_in_foam  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_foam === '' && errors.filler_in_foam  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="adhesive" 
                                                                                value={product.adhesive} 
                                                                                type="text"  
                                                                                placeholder="adhesive" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.adhesive  === '' && errors.adhesive  ? "is-invalid":""}
                                                                                />
                                                                                { product.adhesive === '' && errors.adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_adhesive" 
                                                                                value={product.filler_in_adhesive} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In Adhesive" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_adhesive  === '' && errors.filler_in_adhesive  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_adhesive === '' && errors.filler_in_adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="final_gsm" 
                                                                                value={product.final_gsm} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="finalGsm"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)} 
                                                                                className={product.final_gsm  === '' && errors.final_gsm ? "is-invalid":""}
                                                                                />
                                                                                { product.final_gsm === '' && errors.final_gsm  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            
                                                                          </tr>
                                                                    </tbody>
                                                              </Table> 
                                                            </div>  
                                                          }
                                                            
                                                        </div>
                                                        )}
                                                      </Draggable>
                                                    ))}
                                                 
                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                           </DragDropContext>

                        </TabPane>
                        <TabPane tabId="2">
                           <DragDropContext
                              onDragEnd={(result) => handleDragEnd(result, line2, setLine2)}
                            >
                                <Droppable droppableId="line2">
                                  {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                          {
                                            line2.map((product,index)=>
                                                    ( 

                                                      <Draggable
                                                        key={`line2${product.sequence}`}
                                                        draggableId={String(product.id + product.sequence)}
                                                        index={index}
                                                       >
                                                      {(provided1) => (
                                                        <div
                                                          ref={provided1.innerRef}
                                                          {...provided1.draggableProps}
                                                          {...provided1.dragHandleProps}
                                                         >
                                                          {product.passBar === '1' ?<div style={{display:'flex',justifyContent:'space-between',background:'#f1c76f',alignItems:'center',margin:"10px 0px",padding:"5px"}}>
                                                                  <span className='production-plan-page-collape-heading' style={{width:'80%',textAlign:'center'}}>Pass Completed</span>
                                                                  
                                                                  <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                                              </div>:<div key={product.id+ product.sequence}>
                                                                <div>
                                                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.ref_product_id !== '0'? product.ref_product_id:product.id} 
                                                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customer_details.company_name}</button>
                                                                  {/* {product.is_factory_surplus_product !== '0' && <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>factory product</button>} */}
                                                                  {(product.is_online_product !== '0' || product.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                                                  {product.is_online_product !== '0' && product.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                                                  {product.is_online_product === '0' && product.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                                                  <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                                              </div>
                                                              <Table size='sm' className="order-page-table" responsive>     
                                                                    <tbody> 
                                                                          <tr>
                                                                              <td title={product.grain_name}>{product.grain_name}</td>
                                                                              <td title={product.color_name}>{product.color_name}</td>
                                                                              <td title={product.quality_name}>{product.quality_name}</td>
                                                                              <td title={product.fabric_name}>{product.fabric_name}</td>
                                                                              <td title={product.fabric_color_name}>{product.fabric_color_name}</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title={product.thickness}>{product.thickness}mm</td>
                                                                          </tr>
                                                                          
                                                                          <tr>
                                                                            <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                                                            <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="" colSpan={3}>Additional Treatment :</td>
                                                                          </tr>
                                                                          <tr>
                                                                                <td title="">
                                                                                  <Input 
                                                                                    name="quantity" 
                                                                                    value={product.quantity} 
                                                                                    type="number" 
                                                                                    
                                                                                    placeholder="quantity"
                                                                                    onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                    className={product.quantity  === '' && errors.quantity  ? "is-invalid":""}
                                                                                    />
                                                                                    { product.quantity === '' && errors.quantity  &&  <FormText className="text-danger">Required</FormText>}
                                                                                </td>
                                                                                <td title="">
                                                                                  <Input 
                                                                                    name="pre_skin" 
                                                                                    value={product.pre_skin} 
                                                                                    type="text" 
                                                                
                                                                                    placeholder="pre Skin"
                                                                                    onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                    className={product.pre_skin  === '' && errors.pre_skin  ? "is-invalid":""}
                                                                                    />
                                                                                    { product.pre_skin === '' && errors.pre_skin  &&  <FormText className="text-danger">Required</FormText>}
                                                                                </td>
                                                                                <td title="">
                                                                                  <Input 
                                                                                    name="skin" 
                                                                                    value={product.skin} 
                                                                                    type="text" 
                                                                                    
                                                                                    placeholder="skin"
                                                                                    onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                    className={product.skin  === '' && errors.skin  ? "is-invalid":""}
                                                                                    />
                                                                                    { product.skin === '' && errors.skin  &&  <FormText className="text-danger">Required</FormText>}
                                                                                </td>
                                                                                <td title="">
                                                                                  <Input 
                                                                                    name="top_coat" 
                                                                                    value={product.top_coat} 
                                                                                    type="text" 
                                                                                    
                                                                                    placeholder="topCoat"
                                                                                    onChange={e => handleInputChangeOfPlan(index, e)} 
                                                                                    className={product.top_coat  === '' && errors.top_coat  ? "is-invalid":""}
                                                                                    />
                                                                                    { product.top_coat === '' && errors.top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                                                                </td>
                                                                                <td title="">
                                                                                  <Input 
                                                                                    name="filler_in_top_coat" 
                                                                                    value={product.filler_in_top_coat} 
                                                                                    type="text" 
                                                                                    
                                                                                    placeholder="filler In TopCoat" 
                                                                                    onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                    className={product.filler_in_top_coat  === '' && errors.filler_in_top_coat  ? "is-invalid":""}
                                                                                    />
                                                                                    { product.filler_in_top_coat === '' && errors.filler_in_top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                                                                </td>
                                                                           </tr>
                                                                          <tr>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="foam" 
                                                                                value={product.foam} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="foam" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.foam  === '' && errors.foam  ? "is-invalid":""}
                                                                                />
                                                                                { product.foam === '' && errors.foam  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_foam" 
                                                                                value={product.filler_in_foam} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In Form" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_foam  === '' && errors.filler_in_foam  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_foam === '' && errors.filler_in_foam  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="adhesive" 
                                                                                value={product.adhesive} 
                                                                                type="text"  
                                                                                placeholder="adhesive" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.adhesive  === '' && errors.adhesive  ? "is-invalid":""}
                                                                                />
                                                                                { product.adhesive === '' && errors.adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_adhesive" 
                                                                                value={product.filler_in_adhesive} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In Adhesive" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_adhesive  === '' && errors.filler_in_adhesive  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_adhesive === '' && errors.filler_in_adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="final_gsm" 
                                                                                value={product.final_gsm} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="finalGsm"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)} 
                                                                                className={product.final_gsm  === '' && errors.final_gsm ? "is-invalid":""}
                                                                                />
                                                                                { product.final_gsm === '' && errors.final_gsm  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            
                                                                          </tr>
                                                                    </tbody>
                                                              </Table> 
                                                            </div>  
                                                          }
                                                            
                                                        </div>
                                                        )}
                                                      </Draggable>
                                                    ))}
                                                 
                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                           </DragDropContext>
                        </TabPane>
                        <TabPane tabId="3">
                           <DragDropContext
                              onDragEnd={(result) => handleDragEnd(result, line3, setLine3)}
                            >
                                <Droppable droppableId="line3">
                                  {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                          {
                                            line3.map((product,index)=>
                                                    ( 

                                                      <Draggable
                                                        key={`line3${product.sequence}`}
                                                        draggableId={String(product.id + product.sequence)}
                                                        index={index}
                                                       >
                                                      {(provided1) => (
                                                        <div
                                                          ref={provided1.innerRef}
                                                          {...provided1.draggableProps}
                                                          {...provided1.dragHandleProps}
                                                         >
                                                          {product.passBar === '1' ?<div style={{display:'flex',justifyContent:'space-between',background:'#f1c76f',alignItems:'center',margin:"10px 0px",padding:"5px"}}>
                                                                  <span className='production-plan-page-collape-heading' style={{width:'80%',textAlign:'center'}}>Pass Completed</span>
                                                                  
                                                                  <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                                              </div>:<div key={product.id+ product.sequence}>
                                                                <div>
                                                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> {product.ref_product_id !== '0'? product.ref_product_id: product.id} 
                                                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customer_details.company_name}</button>
                                                                  {/* {product.is_factory_surplus_product !== '0' && <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>factory product</button>} */}
                                                                  {(product.is_online_product !== '0' || product.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                                                  {product.is_online_product !== '0' && product.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                                                  {product.is_online_product === '0' && product.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                                                  <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                                              </div>
                                                              <Table size='sm' className="order-page-table" responsive>     
                                                                    <tbody> 
                                                                          <tr>
                                                                              <td title={product.grain_name}>{product.grain_name}</td>
                                                                              <td title={product.color_name}>{product.color_name}</td>
                                                                              <td title={product.quality_name}>{product.quality_name}</td>
                                                                              <td title={product.fabric_name}>{product.fabric_name}</td>
                                                                              <td title={product.fabric_color_name}>{product.fabric_color_name}</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title={product.thickness}>{product.thickness}mm</td>
                                                                          </tr>
                                                                          
                                                                          <tr>
                                                                            <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                                                            <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="" colSpan={3}>Additional Treatment :</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="quantity" 
                                                                                value={product.quantity} 
                                                                                type="number" 
                                                                                
                                                                                placeholder="quantity"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.quantity  === '' && errors.quantity  ? "is-invalid":""}
                                                                                />
                                                                                { product.quantity === '' && errors.quantity  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="pre_skin" 
                                                                                value={product.pre_skin} 
                                                                                type="text" 
                                                            
                                                                                placeholder="pre Skin"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.pre_skin  === '' && errors.pre_skin  ? "is-invalid":""}
                                                                                />
                                                                                { product.pre_skin === '' && errors.pre_skin  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="skin" 
                                                                                value={product.skin} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="skin"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.skin  === '' && errors.skin  ? "is-invalid":""}
                                                                                />
                                                                                { product.skin === '' && errors.skin  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="top_coat" 
                                                                                value={product.top_coat} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="topCoat"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)} 
                                                                                className={product.top_coat  === '' && errors.top_coat  ? "is-invalid":""}
                                                                                />
                                                                                { product.top_coat === '' && errors.top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_top_coat" 
                                                                                value={product.filler_in_top_coat} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In TopCoat" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_top_coat  === '' && errors.filler_in_top_coat  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_top_coat === '' && errors.filler_in_top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="foam" 
                                                                                value={product.foam} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="foam" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.foam  === '' && errors.foam  ? "is-invalid":""}
                                                                                />
                                                                                { product.foam === '' && errors.foam  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_foam" 
                                                                                value={product.filler_in_foam} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In Form" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_foam  === '' && errors.filler_in_foam  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_foam === '' && errors.filler_in_foam  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="adhesive" 
                                                                                value={product.adhesive} 
                                                                                type="text"  
                                                                                placeholder="adhesive" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.adhesive  === '' && errors.adhesive  ? "is-invalid":""}
                                                                                />
                                                                                { product.adhesive === '' && errors.adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_adhesive" 
                                                                                value={product.filler_in_adhesive} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In Adhesive" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_adhesive  === '' && errors.filler_in_adhesive  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_adhesive === '' && errors.filler_in_adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="final_gsm" 
                                                                                value={product.final_gsm} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="finalGsm"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)} 
                                                                                className={product.final_gsm  === '' && errors.final_gsm ? "is-invalid":""}
                                                                                />
                                                                                { product.final_gsm === '' && errors.final_gsm  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            
                                                                          </tr>
                                                                    </tbody>
                                                              </Table> 
                                                            </div>  }
                                                            
                                                        </div>
                                                        )}
                                                      </Draggable>
                                                    ))}
                                                 
                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                           </DragDropContext>
                        </TabPane>
                        <TabPane tabId="4">
                           <DragDropContext
                              onDragEnd={(result) => handleDragEnd(result, line4, setLine4)}
                            >
                                <Droppable droppableId="line4">
                                  {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                          {
                                            line4.map((product,index)=>
                                                    ( 

                                                      <Draggable
                                                        key={`line4${product.sequence}`}
                                                        draggableId={String(product.id + product.sequence)}
                                                        index={index}
                                                       >
                                                      {(provided1) => (
                                                        <div
                                                          ref={provided1.innerRef}
                                                          {...provided1.draggableProps}
                                                          {...provided1.dragHandleProps}
                                                         >
                                                          {product.passBar === '1' ?<div style={{display:'flex',justifyContent:'space-between',background:'#f1c76f',alignItems:'center',margin:"10px 0px",padding:"5px"}}>
                                                                  <span className='production-plan-page-collape-heading' style={{width:'80%',textAlign:'center'}}>Pass Completed</span>
                                                                  
                                                                  <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                                              </div>:<div key={product.id+ product.sequence}>
                                                                <div>
                                                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.ref_product_id !== '0'? product.ref_product_id:product.id} 
                                                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customer_details.company_name}</button>
                                                                  {/* {product.is_factory_surplus_product !== '0' && <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>factory product</button>} */}
                                                                  {(product.is_online_product !== '0' || product.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                                                  {product.is_online_product !== '0' && product.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                                                  {product.is_online_product === '0' && product.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                                                  <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                                              </div>
                                                              <Table size='sm' className="order-page-table" responsive>     
                                                                    <tbody> 
                                                                          <tr>
                                                                              <td title={product.grain_name}>{product.grain_name}</td>
                                                                              <td title={product.color_name}>{product.color_name}</td>
                                                                              <td title={product.quality_name}>{product.quality_name}</td>
                                                                              <td title={product.fabric_name}>{product.fabric_name}</td>
                                                                              <td title={product.fabric_color_name}>{product.fabric_color_name}</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title={product.thickness}>{product.thickness}mm</td>
                                                                          </tr>
                                                                          
                                                                          <tr>
                                                                            <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                                                            <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="" colSpan={3}>Additional Treatment :</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="quantity" 
                                                                                value={product.quantity} 
                                                                                type="number" 
                                                                                
                                                                                placeholder="quantity"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.quantity  === '' && errors.quantity  ? "is-invalid":""}
                                                                                />
                                                                                { product.quantity === '' && errors.quantity  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="pre_skin" 
                                                                                value={product.pre_skin} 
                                                                                type="text" 
                                                            
                                                                                placeholder="pre Skin"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.pre_skin  === '' && errors.pre_skin  ? "is-invalid":""}
                                                                                />
                                                                                { product.pre_skin === '' && errors.pre_skin  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="skin" 
                                                                                value={product.skin} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="skin"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.skin  === '' && errors.skin  ? "is-invalid":""}
                                                                                />
                                                                                { product.skin === '' && errors.skin  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="top_coat" 
                                                                                value={product.top_coat} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="topCoat"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)} 
                                                                                className={product.top_coat  === '' && errors.top_coat  ? "is-invalid":""}
                                                                                />
                                                                                { product.top_coat === '' && errors.top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_top_coat" 
                                                                                value={product.filler_in_top_coat} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In TopCoat" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_top_coat  === '' && errors.filler_in_top_coat  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_top_coat === '' && errors.filler_in_top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="foam" 
                                                                                value={product.foam} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="foam" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.foam  === '' && errors.foam  ? "is-invalid":""}
                                                                                />
                                                                                { product.foam === '' && errors.foam  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_foam" 
                                                                                value={product.filler_in_foam} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In Form" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_foam  === '' && errors.filler_in_foam  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_foam === '' && errors.filler_in_foam  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="adhesive" 
                                                                                value={product.adhesive} 
                                                                                type="text"  
                                                                                placeholder="adhesive" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.adhesive  === '' && errors.adhesive  ? "is-invalid":""}
                                                                                />
                                                                                { product.adhesive === '' && errors.adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_adhesive" 
                                                                                value={product.filler_in_adhesive} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In Adhesive" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_adhesive  === '' && errors.filler_in_adhesive  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_adhesive === '' && errors.filler_in_adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="final_gsm" 
                                                                                value={product.final_gsm} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="finalGsm"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)} 
                                                                                className={product.final_gsm  === '' && errors.final_gsm ? "is-invalid":""}
                                                                                />
                                                                                { product.final_gsm === '' && errors.final_gsm  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            
                                                                          </tr>
                                                                    </tbody>
                                                              </Table> 
                                                            </div>  }
                                                            
                                                        </div>
                                                        )}
                                                      </Draggable>
                                                    ))}
                                                 
                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                           </DragDropContext>
                        </TabPane>
                        <TabPane tabId="5">
                           <DragDropContext
                              onDragEnd={(result) => handleDragEnd(result, line5, setLine5)}
                            >
                                <Droppable droppableId="line5">
                                  {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                          {
                                            line5.map((product,index)=>
                                                    ( 

                                                      <Draggable
                                                        key={`line5${product.sequence}`}
                                                        draggableId={String(product.id + product.sequence)}
                                                        index={index}
                                                       >
                                                      {(provided1) => (
                                                        <div
                                                          ref={provided1.innerRef}
                                                          {...provided1.draggableProps}
                                                          {...provided1.dragHandleProps}
                                                         >
                                                          {product.passBar === '1' ?<div style={{display:'flex',justifyContent:'space-between',background:'#f1c76f',alignItems:'center',margin:"10px 0px",padding:"5px"}}>
                                                                  <span className='production-plan-page-collape-heading' style={{width:'80%',textAlign:'center'}}>Pass Completed</span>
                                                                  
                                                                  <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                                              </div>:<div key={product.id+ product.sequence}>
                                                                <div>
                                                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.ref_product_id !== '0'? product.ref_product_id:product.id} 
                                                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customer_details.company_name}</button>
                                                                  {/* {product.is_factory_surplus_product !== '0' && <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>factory product</button>} */}
                                                                  {(product.is_online_product !== '0' || product.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                                                  {product.is_online_product !== '0' && product.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                                                  {product.is_online_product === '0' && product.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                                                  <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                                              </div>
                                                              <Table size='sm' className="order-page-table" responsive>     
                                                                    <tbody> 
                                                                          <tr>
                                                                              <td title={product.grain_name}>{product.grain_name}</td>
                                                                              <td title={product.color_name}>{product.color_name}</td>
                                                                              <td title={product.quality_name}>{product.quality_name}</td>
                                                                              <td title={product.fabric_name}>{product.fabric_name}</td>
                                                                              <td title={product.fabric_color_name}>{product.fabric_color_name}</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title={product.thickness}>{product.thickness}mm</td>
                                                                          </tr>
                                                                          
                                                                          <tr>
                                                                            <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                                                            <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="" colSpan={3}>Additional Treatment :</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="quantity" 
                                                                                value={product.quantity} 
                                                                                type="number" 
                                                                                
                                                                                placeholder="quantity"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.quantity  === '' && errors.quantity  ? "is-invalid":""}
                                                                                />
                                                                                { product.quantity === '' && errors.quantity  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="pre_skin" 
                                                                                value={product.pre_skin} 
                                                                                type="text" 
                                                            
                                                                                placeholder="pre Skin"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.pre_skin  === '' && errors.pre_skin  ? "is-invalid":""}
                                                                                />
                                                                                { product.pre_skin === '' && errors.pre_skin  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="skin" 
                                                                                value={product.skin} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="skin"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.skin  === '' && errors.skin  ? "is-invalid":""}
                                                                                />
                                                                                { product.skin === '' && errors.skin  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="top_coat" 
                                                                                value={product.top_coat} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="topCoat"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)} 
                                                                                className={product.top_coat  === '' && errors.top_coat  ? "is-invalid":""}
                                                                                />
                                                                                { product.top_coat === '' && errors.top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_top_coat" 
                                                                                value={product.filler_in_top_coat} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In TopCoat" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_top_coat  === '' && errors.filler_in_top_coat  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_top_coat === '' && errors.filler_in_top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="foam" 
                                                                                value={product.foam} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="foam" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.foam  === '' && errors.foam  ? "is-invalid":""}
                                                                                />
                                                                                { product.foam === '' && errors.foam  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_foam" 
                                                                                value={product.filler_in_foam} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In Form" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_foam  === '' && errors.filler_in_foam  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_foam === '' && errors.filler_in_foam  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="adhesive" 
                                                                                value={product.adhesive} 
                                                                                type="text"  
                                                                                placeholder="adhesive" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.adhesive  === '' && errors.adhesive  ? "is-invalid":""}
                                                                                />
                                                                                { product.adhesive === '' && errors.adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_adhesive" 
                                                                                value={product.filler_in_adhesive} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In Adhesive" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_adhesive  === '' && errors.filler_in_adhesive  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_adhesive === '' && errors.filler_in_adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="final_gsm" 
                                                                                value={product.final_gsm} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="finalGsm"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)} 
                                                                                className={product.final_gsm  === '' && errors.final_gsm ? "is-invalid":""}
                                                                                />
                                                                                { product.final_gsm === '' && errors.final_gsm  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            
                                                                          </tr>
                                                                    </tbody>
                                                              </Table> 
                                                            </div>  }
                                                            
                                                        </div>
                                                        )}
                                                      </Draggable>
                                                    ))}
                                                 
                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                           </DragDropContext>
                        </TabPane>
                        <TabPane tabId="6">
                           <DragDropContext
                              onDragEnd={(result) => handleDragEnd(result, line6, setLine6)}
                            >
                                <Droppable droppableId="line6">
                                  {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                          {
                                            line6.map((product,index)=>
                                                    ( 

                                                      <Draggable
                                                        key={`line6${product.sequence}`}
                                                        draggableId={String(product.id + product.sequence)}
                                                        index={index}
                                                       >
                                                      {(provided1) => (
                                                        <div
                                                          ref={provided1.innerRef}
                                                          {...provided1.draggableProps}
                                                          {...provided1.dragHandleProps}
                                                         >
                                                          {product.passBar === '1' ?<div style={{display:'flex',justifyContent:'space-between',background:'#f1c76f',alignItems:'center',margin:"10px 0px",padding:"5px"}}>
                                                                  <span className='production-plan-page-collape-heading' style={{width:'80%',textAlign:'center'}}>Pass Completed</span>
                                                                  
                                                                  <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                                              </div>:<div key={product.id+ product.sequence}>
                                                                <div>
                                                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.ref_product_id !== '0'? product.ref_product_id:product.id} 
                                                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customer_details.company_name}</button>
                                                                  {/* {product.is_factory_surplus_product !== '0' && <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>factory product</button>} */}
                                                                  {(product.is_online_product !== '0' || product.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                                                                  {product.is_online_product !== '0' && product.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                                                                  {product.is_online_product === '0' && product.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                                                                  <span style={{paddingTop:'2px',cursor:'pointer'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                                              </div>
                                                              <Table size='sm' className="order-page-table" responsive>     
                                                                    <tbody> 
                                                                          <tr>
                                                                              <td title={product.grain_name}>{product.grain_name}</td>
                                                                              <td title={product.color_name}>{product.color_name}</td>
                                                                              <td title={product.quality_name}>{product.quality_name}</td>
                                                                              <td title={product.fabric_name}>{product.fabric_name}</td>
                                                                              <td title={product.fabric_color_name}>{product.fabric_color_name}</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title="">{}</td>
                                                                            <td title={product.thickness}>{product.thickness}mm</td>
                                                                          </tr>
                                                                          
                                                                          <tr>
                                                                            <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                                                            <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="" colSpan={3}>Additional Treatment :</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="quantity" 
                                                                                value={product.quantity} 
                                                                                type="number" 
                                                                                
                                                                                placeholder="quantity"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.quantity  === '' && errors.quantity  ? "is-invalid":""}
                                                                                />
                                                                                { product.quantity === '' && errors.quantity  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="pre_skin" 
                                                                                value={product.pre_skin} 
                                                                                type="text" 
                                                            
                                                                                placeholder="pre Skin"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.pre_skin  === '' && errors.pre_skin  ? "is-invalid":""}
                                                                                />
                                                                                { product.pre_skin === '' && errors.pre_skin  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="skin" 
                                                                                value={product.skin} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="skin"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.skin  === '' && errors.skin  ? "is-invalid":""}
                                                                                />
                                                                                { product.skin === '' && errors.skin  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="top_coat" 
                                                                                value={product.top_coat} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="topCoat"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)} 
                                                                                className={product.top_coat  === '' && errors.top_coat  ? "is-invalid":""}
                                                                                />
                                                                                { product.top_coat === '' && errors.top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_top_coat" 
                                                                                value={product.filler_in_top_coat} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In TopCoat" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_top_coat  === '' && errors.filler_in_top_coat  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_top_coat === '' && errors.filler_in_top_coat  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            
                                                                          </tr>
                                                                          <tr>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="foam" 
                                                                                value={product.foam} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="foam" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.foam  === '' && errors.foam  ? "is-invalid":""}
                                                                                />
                                                                                { product.foam === '' && errors.foam  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_foam" 
                                                                                value={product.filler_in_foam} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In Form" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_foam  === '' && errors.filler_in_foam  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_foam === '' && errors.filler_in_foam  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="adhesive" 
                                                                                value={product.adhesive} 
                                                                                type="text"  
                                                                                placeholder="adhesive" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.adhesive  === '' && errors.adhesive  ? "is-invalid":""}
                                                                                />
                                                                                { product.adhesive === '' && errors.adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="filler_in_adhesive" 
                                                                                value={product.filler_in_adhesive} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="filler In Adhesive" 
                                                                                onChange={e => handleInputChangeOfPlan(index, e)}
                                                                                className={product.filler_in_adhesive  === '' && errors.filler_in_adhesive  ? "is-invalid":""}
                                                                                />
                                                                                { product.filler_in_adhesive === '' && errors.filler_in_adhesive  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            <td title="">
                                                                              <Input 
                                                                                name="final_gsm" 
                                                                                value={product.final_gsm} 
                                                                                type="text" 
                                                                                
                                                                                placeholder="finalGsm"
                                                                                onChange={e => handleInputChangeOfPlan(index, e)} 
                                                                                className={product.final_gsm  === '' && errors.final_gsm ? "is-invalid":""}
                                                                                />
                                                                                { product.final_gsm === '' && errors.final_gsm  &&  <FormText className="text-danger">Required</FormText>}
                                                                            </td>
                                                                            
                                                                          </tr>
                                                                    </tbody>
                                                              </Table> 
                                                            </div>  }
                                                            
                                                        </div>
                                                        )}
                                                      </Draggable>
                                                    ))}
                                                 
                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                           </DragDropContext>
                        </TabPane>
                      </TabContent>
                    </ComponentCard4>
                 </Col>
              </Row>
         
      </ComponentCard1>
    </>
  );
};

export default JumbotronComponent;
