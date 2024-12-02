import { Row, Col } from 'reactstrap';
import TeamCards from '../../components/dashboard/minimalDashboard/TeamCard';

const Team = () => {
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

export default Team;
