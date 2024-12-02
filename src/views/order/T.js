import { Row, Col } from 'reactstrap';
import TeamCards from '../../components/dashboard/minimalDashboard/TeamCard';

const T = () => {
  return (
    <>
      {/*********************Sales Overview ************************/}
      <Row>
        <Col lg="12">
          <TeamCards />
        </Col>
       
      </Row>
      
    </>
  );
};

export default T;