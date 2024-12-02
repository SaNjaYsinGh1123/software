import { Card, CardBody, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';

const ComponentCard = ({ children, subtitle }) => {
  return (
    <Card>
      
      <CardBody className="p-4">
        <CardSubtitle className="text-muted mb-0">{subtitle || ''}</CardSubtitle>
        <div>{children}</div>
      </CardBody>
    </Card>
  );
};

ComponentCard.propTypes = {
  children: PropTypes.node,
  subtitle: PropTypes.node
};

export default ComponentCard;
