import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';

const ComponentCard = ({ children, title, subtitle }) => {
  return (
    <Card>
      <CardTitle tag="h4" className="px-0 ">
        {title}
      </CardTitle>
      <CardBody className="" style={{paddingTop:'0px',paddingBottom:'0px',paddingLeft:'0px'}}>
        <CardSubtitle className="text-muted">{subtitle || ''}</CardSubtitle>
        <div>{children}</div>
      </CardBody>
    </Card>
  );
};

ComponentCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.node
};

export default ComponentCard;
