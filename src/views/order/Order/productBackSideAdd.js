import React, { useState, useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Custom hook for fetching options
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
    return result[endpoint].map(item => ({ value: item.id, label: item.name || item.code }));
  };

  const debouncedFetch = useCallback(debounce((inputValue, callback) => {
    fetchOptions(inputValue).then(callback).catch(error => {
      console.error(error);
      callback([]);
    });
  }, 300), [endpoint]);

  return debouncedFetch;
};

const useDebouncedFetchOptionsForHsn = (endpoint) => {
  const fetchOptions = async (inputValue) => {
  
    const token = localStorage.getItem('userToken');
    const response = await fetch(`https://factory.teamasia.in/api/public/${endpoint}?hsn_code=${inputValue}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result[endpoint].map(item => ({ value: item.id, label:  item.hsn_code }));
  };

  const debouncedFetch = useCallback(debounce((inputValue, callback) => {
    fetchOptions(inputValue).then(callback).catch(error => {
      console.error(error);
      callback([]);
    });
  }, 300), [endpoint]);

  return debouncedFetch;
};

const ProductBackSideAdd = ({ orderID, FrontSubmitBlock, frontSidedata ,fronthandleSubmit}) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [items1, setItems1] = useState([{ design_id: { value: 'x', label: 'chooses' }, shade_id: { value: 'x', label: 'choose' } }]);
  const [items2, setItems2] = useState([]);
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errors, setErrors] = useState({});

  const [formDatas, setFormDataS] = useState({
    grain: { value: 'x', label: 'choose' },
    fabricId: { value: 'x', label: 'choose' },
    fabricColorId: { id: 'x', value: 'choose' },
    qualityId: { value: 'x', label: 'choose' },
    colorId: { value: 'x', label: 'choose' },
    hsnId: { value: 'x', label: 'choose' },
    quantity: '0',
    PricePerUnit: '0',
    Thickness: '0',
    TaxRate: '0',
    deliveryDate: '',
    CustomerItemRefernce: ''
  });

  const grainOptions = useDebouncedFetchOptions('grains');
  const qualityOptions = useDebouncedFetchOptions('qualities');
  const colorOptions = useDebouncedFetchOptions('colors');
  const hsnOptions = useDebouncedFetchOptionsForHsn('hsns');
  const embossOptions = useDebouncedFetchOptions('embosses');
  const designOptions = useDebouncedFetchOptions('designs');
  const shadeOptions = useDebouncedFetchOptions('shades');

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormDataS(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormDataS(prevState => ({
      ...prevState,
      [actionMeta.name]: selectedOption
    }));
  };

  const handleInputChange = (index, selectedOption, actionMeta) => {
    const newItems = [...items];
    newItems[index][actionMeta.name] = selectedOption;
    setItems(newItems);
  };

  const handleInputChange1 = (index, selectedOption, actionMeta) => {
    const newItems = [...items1];
    newItems[index][actionMeta.name] = selectedOption;
    setItems1(newItems);
  };

  const handleInputChange2 = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items2];
    newItems[index][name] = value;
    setItems2(newItems);
  };
  
  const validateFormBack = () => {
    console.log('formdata in product', formDatas);

    let formIsValid = true;
    const errors1 = {};

    if (formDatas.grain === null || formDatas.grain.value === 'x') {
      formIsValid = false;
      errors1.grain = "Please select a grain.";
    }
    if(formDatas.qualityId === null || formDatas.qualityId.value === 'x') {
      formIsValid = false;
      errors1.qualityId = "Please select a quality.";
    }
    if(formDatas.colorId === null || formDatas.colorId.value === 'x') {
      formIsValid = false;
      errors1.colorId = "Please select a color.";
    }
    if (formDatas.hsnId === null || formDatas.hsnId.value === 'x') {
      formIsValid = false;
      errors1.hsnId = "Please select a hsn.";
    }
    
    items1.map((item)=>{
      console.log('item',item);
      if (
        (item.design_id === null || (item.design_id.value === 'x' || item.design_id.value === '0')) &&
        (item.shade_id !== null && (item.shade_id.value !== 'x' && item.shade_id.value !== '0'))
      ) {
        formIsValid = false;
        console.log('reason1');
        errors1.print = "Required";
      }
      else if (
        (item.shade_id === null || (item.shade_id.value === 'x' || item.shade_id.value === '0')) &&
        (item.design_id !== null && (item.design_id.value !== 'x' && item.design_id.value !== '0'))
      ) {
        formIsValid = false;
        console.log('reason2');
        errors1.print = "Required";
      }
      return ''
    });

    setErrors(errors1);
    return formIsValid;
  };

  const closer = () => {
    setErrorMessageFromApi([]);
  };

  const apiCallBack = async (frontProductId) => {
    console.log('frontSidedata',frontSidedata);

    try {
      
      console.log('items in backside',items);
      console.log('items1 in backside',items1);
      console.log('items2 in backside',items2);

      const filtered = items.filter(temp => temp.emboss_id !== null && temp.emboss_id.value !== 'x');
      const filtered1 = items1.filter(temp => (temp.design_id !== null && temp.design_id.value !== 'x') && (temp.shade_id !== null && temp.shade_id.value !== 'x'));
      const filtered2 = items2.filter(temp => temp.description !== '');

      const csvString = filtered.map(item => item.emboss_id.value).join(',');

      console.log('filtered in backside',items,filtered);
      console.log('filtered1 in backside',items1,filtered1);
      console.log('filtered2 in backside',items2,filtered2);

      console.log('csvString in backside',csvString);

      if(filtered2.length < 1){
        filtered2.push({description:''});
      }

      if(filtered1.length < 1){
        filtered1.push({ design_id: { value: '0', label: 'choose' }, shade_id: { value: '0', label: 'choose' } });
      }

      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/products`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          order_id: orderID,
          template_id: '0',
          grain_id: formDatas.grain.value,
          fabric_id: '0',
          fabric_color_id: '0',
          quality_id: formDatas.qualityId.value,
          color_id: formDatas.colorId.value,
          hsn_id: formDatas.hsnId.value,
          quantity: frontSidedata.quantity,
          price: frontSidedata.PricePerUnit,
          thickness: frontSidedata.Thickness,
          tax_rate: frontSidedata.TaxRate,
          delivery_date: frontSidedata.deliveryDate,
          customer_item_reference: frontSidedata.CustomerItemRefernce,
          topcoat: 'temp',
          foam_1: 'temp',
          filler_in_foam_1: 'temp',
          foam_2: 'temp',
          filler_in_foam_2: 'temp',
          adhesive: 'temp',
          filler_in_adhesive: 'temp',
          final_gsm: 'temp',
          is_factory_surplus_product: '0',
          is_online_product: '0',
          is_trashed: '0',
          emboss_ids: csvString,
          product_print: filtered1.map(item => ({
            design_id: item.design_id.value,
            shade_id: item.shade_id.value
          })),
          product_additional_treatment: filtered2,
          ref_product_id: frontProductId
        }),
      });

      const datas = await response.json();
      if (response.status === 201) {
        navigate(-1);
      } else {
        console.error("Authentication failed:", Object.values(datas.messages.errors));
        if (datas.error) {
          setErrorMessageFromApi(Object.values(datas.messages.errors));
        }
      }
      return null;
    } catch (error) {
      console.log('error', error);
      setErrorMessageFromApi(["Network error"]);
      return null;
    }
  };

  const handleSubmitBack = async (event) => {
    event.preventDefault();
    if (validateFormBack()) {
      // console.log(fronthandleSubmit());
      const frontResult = await fronthandleSubmit();  // Wait for the apiCall to resolve
      console.log('API call result:', frontResult);
      if(Number(frontResult) !== 0 && Number(frontResult) !== 2)
      {
        console.log('FrontSubmitBlock',FrontSubmitBlock)
        apiCallBack(frontResult);
        // console.log(apiCallBack);
      }
      else{
        console.log('API call result else:', frontResult);
        // setErrorMessageFromApi(["Something went wrong !"]);
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // This adds a smooth scrolling effect
        });
        console.log('error in front side of product');
      }
    }
  };

  const addItem = () => {
    const newItems = items.slice();
    newItems.push({ emboss_id: { value: 'x', label: 'choose' } });
    setItems(newItems);
  };

  const removeItem = index => {
    const newItems = items.slice();
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const addItem1 = () => {
    const newItems = items1.slice();
    newItems.push({ design_id: { value: 'x', label: 'choose' }, shade_id: { value: 'x', label: 'choose' } });
    setItems1(newItems);
  };

  const removeItem1 = index => {
    const newItems = items1.slice();
    newItems.splice(index, 1);
    setItems1(newItems);
  };

  const addItem2 = () => {
    const newItems = items2.slice();
    newItems.push({ description: '' });
    setItems2(newItems);
  };

  const removeItem2 = index => {
    const newItems = items2.slice();
    newItems.splice(index, 1);
    setItems2(newItems);
  };

  return (
    <div>
      <Row>
        <Col md="12">
          <Card>
            <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
              Back Side
            </CardTitle>
            <CardBody>
              <Form onSubmit={handleSubmitBack}>
                <Row>
                  <Col md="9">
                    {errorMessageFromApi.length !== 0 && (
                      <div style={{ background: '#ff9c7a', color: 'black', marginBottom: '10px', padding: "5px 10px" }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          Following errors were found:
                          <span onClick={closer} style={{ cursor: 'pointer' }}>X</span>
                        </div>
                        <ul>
                          {errorMessageFromApi.map((item) =>
                            <li key={item}>
                              {item}
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Grain</Label>
                      <AsyncSelect
                        name="grain"
                        onChange={handleSelectChange}
                        loadOptions={grainOptions}
                        value={formDatas.grain}
                        className={errors.grain ? "is-invalid" : ""}
                        isClearable
                        isSearchable
                      />
                      {errors.grain && (formDatas.grain === null || formDatas.grain.value === 'x' ) && (
                        <FormText className="text-danger">{errors.grain}</FormText>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Quality</Label>
                      <AsyncSelect
                        name="qualityId"
                        onChange={handleSelectChange}
                        loadOptions={qualityOptions}
                        value={formDatas.qualityId}
                        className={errors.qualityId ? "is-invalid" : ""}
                        isClearable
                        isSearchable
                      />
                      {errors.qualityId && (formDatas.qualityId === null || formDatas.qualityId.value === 'x' ) && (
                        <FormText className="text-danger">{errors.qualityId}</FormText>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Color</Label>
                      <AsyncSelect
                        name="colorId"
                        onChange={handleSelectChange}
                        loadOptions={colorOptions}
                        value={formDatas.colorId}
                        className={errors.colorId ? "is-invalid" : ""}
                        isClearable
                        isSearchable
                      />
                      {errors.colorId && (formDatas.colorId === null || formDatas.colorId.value === 'x' ) && (
                        <FormText className="text-danger">{errors.colorId}</FormText>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>HSN Code</Label>
                      <AsyncSelect
                        name="hsnId"
                        onChange={handleSelectChange}
                        loadOptions={hsnOptions}
                        value={formDatas.hsnId}
                        className={errors.hsnId ? "is-invalid" : ""}
                        isClearable
                        isSearchable
                      />
                      {errors.hsnId && (formDatas.hsnId === null || formDatas.hsnId.value === 'x' ) && (
                        <FormText className="text-danger">{errors.hsnId}</FormText>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="8">
                    <Label>Embosses</Label>
                  </Col>
                  <table className="table">
                    <thead>
                      <tr>
                        <Row>
                          <Col md="8"><th className='noborder'>Embosses</th></Col>
                          <Col md="2">
                            <Button type="button" className='btn-success' onClick={addItem}>Add More</Button>
                          </Col>
                        </Row>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={item.index}>
                          <Row>
                            <Col md="8">
                              <AsyncSelect
                                name="emboss_id"
                                onChange={(selectedOption, actionMeta) => handleInputChange(index, selectedOption, actionMeta)}
                                loadOptions={embossOptions}
                                value={item.emboss_id}
                                isClearable
                                isSearchable
                              />
                            </Col>
                            <Col md="2"><button type="button" style={{ backgroundColor: "red", marginTop: "5px" }} onClick={() => removeItem(index)}>X</button></Col>
                          </Row>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Row>
                <Row>
                  <Col md="8">
                    <Label>Prints</Label>
                  </Col>
                  <table className="table">
                    <thead>
                      <tr>
                        <Row>
                          <Col md="4"><th className='noborder'>Designs</th></Col>
                          <Col md="4"><th className='noborder'>Shades</th></Col>
                          <Col md="2">
                            <Button type="button" className='btn-success' onClick={addItem1}>Add More</Button>
                          </Col>
                        </Row>
                      </tr>
                    </thead>
                    <tbody>
                      {items1.map((item, index) => (
                        <tr key={item.design_id + item.shade_id}>
                          <Row>
                            <Col md="4">
                              <AsyncSelect
                                name="design_id"
                                onChange={(selectedOption, actionMeta) => handleInputChange1(index, selectedOption, actionMeta)}
                                loadOptions={designOptions}
                                value={item.design_id}
                                isClearable
                                isSearchable
                              />
                              {errors.print && (((item.design_id === null) || (item.design_id?.value === 'x') || (item.design_id?.value === '0')) && ((item.shade_id?.value !== 'x') || (item.shade_id?.value !== '0')) ) && (
                                    <FormText className="text-danger">{errors.print}</FormText>
                              )}
                            </Col>
                            <Col md="4">
                              <AsyncSelect
                                name="shade_id"
                                onChange={(selectedOption, actionMeta) => handleInputChange1(index, selectedOption, actionMeta)}
                                loadOptions={shadeOptions}
                                value={item.shade_id}
                                isClearable
                                isSearchable
                              />
                              {errors.print && (((item.shade_id === null) || (item.shade_id?.value === 'x') || (item.shade_id?.value === '0')) && ((item.design_id?.value !== 'x') || (item.design_id?.value !== '0')) ) && (
                                <FormText className="text-danger">{errors.print}</FormText>
                              )}
                            </Col>
                            <Col md="2"><button type="button" style={{ backgroundColor: "red", marginTop: "5px" }} onClick={() => removeItem1(index)}>X</button></Col>
                          </Row>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Row>
                <Row>
                  <Col md="8">
                    <Label>Additional Treatments</Label>
                  </Col>
                  <table className="table">
                    <thead>
                      <tr>
                        <Row>
                          <Col md="8"><th className='noborder'>Additional Treatments</th></Col>
                          <Col md="2">
                            <Button type="button" className='btn-success' onClick={addItem2}>Add More</Button>
                          </Col>
                        </Row>
                      </tr>
                    </thead>
                    <tbody>
                      {items2.map((item, index) => (
                        <tr key={item.index}>
                          <Row>
                            <Col md="8"><Input name="description" value={item.description} type="text" onChange={e => handleInputChange2(index, e)} placeholder="" /></Col>
                            <Col md="2"><button type="button" style={{ backgroundColor: "red", marginTop: "5px" }} onClick={() => removeItem2(index)}>X</button></Col>
                          </Row>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Row>
                <Col md="4">
                  <FormGroup>
                    <Button
                      type="submit"
                      className="btn my-btn-color"
                      style={{ marginTop: "28px" }}
                      // disabled={!FrontSubmitBlock}
                      >
                      Submit
                    </Button>
                  </FormGroup>
                  {/* <div className="text-danger">Note: Please Submit Front Side First</div> */}
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductBackSideAdd;

ProductBackSideAdd.propTypes = {
  orderID: PropTypes.string.isRequired,
  // refproductidforParent: PropTypes.number.isRequired,
  FrontSubmitBlock: PropTypes.bool.isRequired,
  frontSidedata: PropTypes.object.isRequired,
  fronthandleSubmit:PropTypes.func.isRequired
};


