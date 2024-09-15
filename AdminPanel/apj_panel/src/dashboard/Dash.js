import { Card, Row, Col, Button} from 'react-bootstrap';
function Dash() {
  return (
    
    <div className='container-fluid'>
      <div className='container d-flex justify-content-center w-100'>
        <Row className='mt-5'>

          <Col className='mx-4'>
          <Card className="text-center" style={{ width: '18rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: '#007bff' }}>
              <Card.Body>
                <Card.Title className="text-white">Active Tasks</Card.Title>
                <Card.Subtitle className="mb-2 text-light">Ongoing Projects</Card.Subtitle>
                <Card.Text className="display-4 text-white">8</Card.Text>
                <Button variant="light" href="#">
                  View Active Tasks
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col className='mx-4'>
          <Card className="text-center" style={{ width: '18rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: '#28a745' }}>
              <Card.Body>
                <Card.Title className="text-white">Pending Tasks</Card.Title>
                <Card.Subtitle className="mb-2 text-light">Tasks Awaiting Action</Card.Subtitle>
                <Card.Text className="display-4 text-white">8</Card.Text>
                <Button variant="light" href="#">
                  View Pending Tasks
                </Button>
              </Card.Body>
            </Card></Col>

          <Col className='mx-4'>
          <Card className="text-center" style={{ width: '18rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: '#ffc107' }}>
              <Card.Body>
                <Card.Title className="text-white">Total Tasks</Card.Title>
                <Card.Subtitle className="mb-2 text-light">All Tasks Overview</Card.Subtitle>
                <Card.Text className="display-4 text-white">8</Card.Text>
                <Button variant="light" href="#">
                  View All Tasks
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Dash