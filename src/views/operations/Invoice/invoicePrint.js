import React from 'react';
import PropTypes from 'prop-types';

const OpenImageButton = ({ imageUrl }) => {
  const handleButtonClick = () => {
    window.open(`https://factory.teamasia.in/api/public/uploads/${imageUrl}`, '_blank');
  };

  return (
   
      <button type="button" onClick={handleButtonClick} className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-printer-fill my-printer-color" /></button>
   
  );
};

export default OpenImageButton;
OpenImageButton.propTypes = {
  imageUrl: PropTypes.string.isRequired,

};