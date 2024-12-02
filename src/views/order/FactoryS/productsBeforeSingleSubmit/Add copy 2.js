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
import { useNavigate } from 'react-router-dom';
import ProductBackSideAdd from './productBackSideAdd';

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

const Add = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [items1, setItems1] = useState([{ design_id: { value: 'x', label: 'choose' }, shade_id: { value: 'x', label: 'choose' } }]);
  const [items2, setItems2] = useState([]);
  const [dataX, setDataX] = useState([]);
  const [errors, setErrors] = useState({});
  const [refproductidforParent, setrefproductidforParent] = useState(0);
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [submitBlock, setsubmitBlock] = useState(false);
  const [formDatas, setFormDataS] = useState({
    grain: { value: 'x', label: 'choose' },
    fabricId: { value: 'x', label: 'choose' },
    fabricColorId: { id: 'x', value: 'choose' },
    qualityId: { value: 'x', label: 'choose' },
    colorId: { value: 'x', label: 'choose' },
    hsnId: { value: 'x', label: 'choose' },
    quantity: '',
    PricePerUnit: '',
    Thickness: '',
    TaxRate: '',
    deliveryDate: '',
    CustomerItemRefernce: '',
    isOnlineProduct: '0'
  });

  const checkboxclick1 = () => {
    setFormDataS(prevState => ({
      ...prevState,
      isOnlineProduct: formDatas.isOnlineProduct === '0' ? '1' : '0'
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormDataS(prevState => ({
      ...prevState,
      [actionMeta.name]: selectedOption
    }));
  };

  const fetchFabricColors = async (fabricId) => {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`https://factory.teamasia.in/api/public/fabrics/${fabricId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log('result color',result);
    setFormDataS(prevState => ({
      ...prevState,
      fabricColorId: result.fabriccolors[0].id
    }))
    setDataX(result.fabriccolors);
  };

  const grainOptions = useDebouncedFetchOptions('grains');
  const fabricOptions = useDebouncedFetchOptions('fabrics');
  const qualityOptions = useDebouncedFetchOptions('qualities');
  const colorOptions = useDebouncedFetchOptions('colors');
  const hsnOptions = useDebouncedFetchOptionsForHsn('hsns');
  const embossOptions = useDebouncedFetchOptions('embosses');
  const designOptions = useDebouncedFetchOptions('designs');
  const shadeOptions = useDebouncedFetchOptions('shades');

  const handleTypeChange = (selectedOption, actionMeta) => {
    setFormDataS(prevState => ({
      ...prevState,
      [actionMeta.name]: selectedOption
    }));

    if (actionMeta.name === 'fabricId') {
      if (selectedOption.value === 'x') {
        setDataX([]);
        setFormDataS(prevState => ({
          ...prevState,
          fabricColorId: ''
        }));
      } else {
        fetchFabricColors(selectedOption.value);
      }
    }
  };
  const handleFabricColorChange = (e) => {
    const { name, value } = e.target;
    // setSelectedType(e.target.value);

    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const addItem = () => {
    const newItems = items.slice();
    newItems.push({ emboss_id: { value: 'x', label: 'choose' }});
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

  const validateForm = () => {
    console.log('formdata in product', formDatas);

    let formIsValid = true;
    const errors1 = {};

    if (formDatas.grain === null || formDatas.grain.value === 'x') {
      formIsValid = false;
      errors1.grain = "Please select a grain.";
    }

    if(formDatas.fabricId === null || formDatas.fabricId.value === 'x') {
      formIsValid = false;
      errors1.fabricId = "Please select a fabric.";
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

  const apiCall = async () => {
    try {
      
      console.log('items',items);
      console.log('items1',items1);
      console.log('items2',items2);

      const filtered = items.filter(temp => temp.emboss_id !== null && temp.emboss_id.value !== 'x');
      const filtered1 = items1.filter(temp => (temp.design_id !== null && temp.design_id.value !== 'x') && (temp.shade_id !== null && temp.shade_id.value !== 'x'));
      const filtered2 = items2.filter(temp => temp.description !== '');

      const csvString = filtered.map(item => item.emboss_id.value).join(',');

      console.log('filtered',items,filtered);
      console.log('filtered1',items1,filtered1);
      console.log('filtered2',items2,filtered2);

      console.log('csvString',csvString);

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
          order_id: '0',
          template_id: '0',
          grain_id: formDatas.grain.value,
          fabric_id: formDatas.fabricId.value,
          fabric_color_id: formDatas.fabricColorId,
          quality_id: formDatas.qualityId.value,
          color_id: formDatas.colorId.value,
          hsn_id: formDatas.hsnId.value,
          quantity: formDatas.quantity,
          price: formDatas.PricePerUnit,
          thickness: formDatas.Thickness,
          tax_rate: formDatas.TaxRate,
          delivery_date: formDatas.deliveryDate,
          customer_item_reference: formDatas.CustomerItemRefernce,
          topcoat: 'temp',
          foam_1: 'temp',
          filler_in_foam_1: 'temp',
          foam_2: 'temp',
          filler_in_foam_2: 'temp',
          adhesive: 'temp',
          filler_in_adhesive: 'temp',
          final_gsm: 'temp',
          is_factory_surplus_product: '1',
          is_online_product: formDatas.isOnlineProduct,
          is_trashed: '0',
          emboss_ids: csvString,
          product_print: filtered1.map(item => ({
            design_id: item.design_id.value,
            shade_id: item.shade_id.value
          })),
          product_additional_treatment: filtered2,
          ref_product_id: '0'
        }),
      });

      const datas = await response.json();
      if (response.status === 201) {
        if (formDatas.isOnlineProduct === '0') {
          navigate(-1);
        }
        setrefproductidforParent(datas.product_id);
        setsubmitBlock(true);
        console.log('product is added successfully ,please use this product id as ref_id in back side product');
      } else {
        console.error("Authentication failed:", Object.values(datas.messages.errors));
        if (datas.error) {
          setErrorMessageFromApi(Object.values(datas.messages.errors));
        }
      }
      return null;
    } catch (error) {
      setErrorMessageFromApi(["Network error"]);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form is valid, proceed with API call');
      apiCall();
    } else {
      console.log('Form is invalid, do not submit');
    }
  };

  return (
    <div>
      <Row>
        <Col md="9">{errorMessageFromApi.length !== 0 && (
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

        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
                Add Product
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="10">
                    <FormGroup>
                      <Label>Grain</Label>
                      <AsyncSelect
                        name="grain"
                        onChange={handleSelectChange}
                        loadOptions={grainOptions}
                        value={formDatas.grain}
                        isDisabled={submitBlock}
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
                      <Label>Fabric</Label>
                      <AsyncSelect
                        name="fabricId"
                        onChange={handleTypeChange}
                        loadOptions={fabricOptions}
                        value={formDatas.fabricId}
                        isDisabled={submitBlock}
                        className={errors.fabricId ? "is-invalid" : ""}
                        isClearable
                        isSearchable
                      />
                      {errors.fabricId && (formDatas.fabricId === null || formDatas.fabricId.value === 'x' ) && (
                        <FormText className="text-danger">{errors.fabricId}</FormText>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="10">
                     <FormGroup>
                      <Label>Fabric Color</Label>
                        <Input type="select" 
                          name="fabricColorId" 
                          value={formDatas.fabricColorId}
                          onChange={handleFabricColorChange}
                          disabled={submitBlock}
                          >
                            {dataX.map((item)=>{
                              return <option key={item.id} value={item.id}>{item.name}</option>
                            })}
                        </Input>
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
                        isDisabled={submitBlock}
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
                        isDisabled={submitBlock}
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
                        isDisabled={submitBlock}
                        className={errors.hsnId ? "is-invalid" : ""}
                        isClearable
                        isSearchable
                      />
                      {errors.hsnId && (formDatas.hsnId === null || formDatas.hsnId.value === 'x' ) && (
                        <FormText className="text-danger">{errors.hsnId}</FormText>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Quantity (in meters)</Label>
                      <Input
                        type="number"
                        name="quantity"
                        placeholder="Enter number"
                        value={formDatas.quantity}
                        onChange={handleChange}
                        disabled={submitBlock}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Price Per Unit (Inclusive of Tax)</Label>
                      <Input
                        type="number"
                        name="PricePerUnit"
                        placeholder="Enter number"
                        value={formDatas.PricePerUnit}
                        onChange={handleChange}
                        disabled={submitBlock}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Thickness (in mm)</Label>
                      <Input
                        type="number"
                        name="Thickness"
                        placeholder="Enter number"
                        value={formDatas.Thickness}
                        onChange={handleChange}
                        disabled={submitBlock}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Tax Rate (in %)</Label>
                      <Input
                        type="number"
                        name="TaxRate"
                        placeholder="Enter number"
                        value={formDatas.TaxRate}
                        onChange={handleChange}
                        disabled={submitBlock}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Delivery Date</Label>
                      <Input
                        type="date"
                        name="deliveryDate"
                        value={formDatas.deliveryDate}
                        onChange={handleChange}
                        disabled={submitBlock}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Customer Item Reference</Label>
                      <Input
                        type="text"
                        name="CustomerItemRefernce"
                        placeholder="Enter"
                        value={formDatas.CustomerItemRefernce}
                        onChange={handleChange}
                        disabled={submitBlock}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Embosses</Label>
                      <table className="table">
                        <thead>
                          <tr>
                            <Row>
                              <Col md="8"><th className='noborder'>Embosses</th></Col>
                              <Col md="2">
                                <Button type="button" className='btn-success' onClick={addItem} disabled={submitBlock}>Add More</Button>
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
                                    isDisabled={submitBlock}
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
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Prints</Label>
                      <table className="table">
                        <thead>
                          <tr>
                            <Row>
                              <Col md="4"><th className='noborder'>Designs</th></Col>
                              <Col md="4"><th className='noborder'>Shades</th></Col>
                              <Col md="2">
                                <Button type="button" className='btn-success' onClick={addItem1} disabled={submitBlock}>Add More</Button>
                              </Col>
                            </Row>
                          </tr>
                        </thead>
                        <tbody>
                          {items1.map((item, index) => (
                            <tr key={item.index}>
                              <Row>
                                <Col md="4">
                                  <AsyncSelect
                                    name="design_id"
                                    onChange={(selectedOption, actionMeta) => handleInputChange1(index, selectedOption, actionMeta)}
                                    loadOptions={designOptions}
                                    value={item.design_id}
                                    isDisabled={submitBlock}
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
                                    isDisabled={submitBlock}
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
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Additional Treatments</Label>
                      <table className="table">
                        <thead>
                          <tr>
                            <Row>
                              <Col md="8"><th className='noborder'>Additional Treatments</th></Col>
                              <Col md="2">
                                <Button type="button" className='btn-success' onClick={addItem2} disabled={submitBlock}>Add More</Button>
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
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Input type="checkbox" checked={formDatas.isOnlineProduct === '1'} onChange={checkboxclick1} disabled={submitBlock} />
                      <Label className='mx-1'> This is an online product</Label>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Button type="submit" className="btn my-btn-color" style={{ marginTop: "28px" }} disabled={submitBlock}>
                        Submit
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              {formDatas.isOnlineProduct === '1' && (
                <ProductBackSideAdd
                  refproductidforParent={refproductidforParent}
                  FrontSubmitBlock={submitBlock}
                  frontSidedata={formDatas}
                />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Add;
