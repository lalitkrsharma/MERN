import { Col, Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import renderRatings from "../../utils/renderRatings";
import { AiOutlineWifi } from "react-icons/ai";
import { IoTvOutline } from "react-icons/io5";
import { FaCarBattery } from "react-icons/fa";

const SearchResultCard = ({ room }) => {
  return (
    <>
      <Card className="search-result-card">
        <Card.Body>
          <Row>
            <Col sm={12} lg={6} style={{ display: "flex", gap: "0.5rem" }}>
              <img
                src={room.images[0]}
                alt={room.images[0]}
                className="room-img"
              />
              <span className="img-stack">
                <img src={room.images[1]} alt={room.images[1]} />
                <img src={room.images[2]} alt={room.images[2]} />
                <img src={room.images[4]} alt={room.images[4]} />
              </span>
            </Col>
            <Col sm={12} lg={6}>
              <Card.Title>{room.name}</Card.Title>
              <Card.Text>{room.location} West Bengali, India, World</Card.Text>
              <Card.Text className="ratings">
                {renderRatings(room.rating)} &nbsp; {room.rating}
              </Card.Text>
              <Card.Subtitle>
                <AiOutlineWifi /> Wifi <IoTvOutline /> TV <FaCarBattery /> Power
                Backup +12 More
              </Card.Subtitle>
              <Row className="search-card-footer">
                <Col>
                  <Card.Text className="price">
                    ₹{room.category[0].price}
                    <div>per room per night</div>
                  </Card.Text>
                </Col>
                <Col>
                  <Button
                    variant="outline-success"
                    as={Link}
                    to={`room/${room._id}`}
                  >
                    View Details
                  </Button>
                  <Button variant="primary" as={Link} to={`room/${room._id}`}>
                    Book Now
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default SearchResultCard;
