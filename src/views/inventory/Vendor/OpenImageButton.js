import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const OpenImageButton = ({ imageUrl }) => {
  const handleButtonClick = () => {
    window.open(`https://factory.teamasia.in/api/public/uploads/${imageUrl}`, '_blank');
  };

  return (
    <Button color="primary" onClick={handleButtonClick}>
      Open Image
    </Button>
  );
};

export default OpenImageButton;
OpenImageButton.propTypes = {
  imageUrl: PropTypes.string.isRequired,

};