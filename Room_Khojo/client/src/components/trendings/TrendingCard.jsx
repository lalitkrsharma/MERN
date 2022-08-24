import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const TrendingCard = ({ hotel }) => {
  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={hotel.images[0]} />
        <Card.Body>
          <Card.Title>{hotel.name}</Card.Title>
          <Card.Text>{hotel.address}</Card.Text>
          <Card.Text className="price-tag-btn">
            ₹{hotel.category[0].price}
            <Button as={Link} to={`/room/${hotel._id}`}>
              View Rooms
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TrendingCard;
