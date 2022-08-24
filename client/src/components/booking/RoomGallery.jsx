import { Col, Container, Row } from "react-bootstrap";
import "./RoomGallery.css";

const RoomGallery = ({ images }) => {
  return (
    <>
      <Container className="room__gallery">
        <Row>
          <Col sm={12} lg={6}>
            <img src={images[0]} alt={images[0]} style={{ height: "98%" }} />
          </Col>
          <Col sm={12} lg={6}>
            <Row>
              <Col>
                <img src={images[1]} alt={images[1]} />
              </Col>
              <Col>
                <img src={images[2]} alt={images[2]} />
              </Col>
            </Row>
            <Row>
              <Col>
                <img src={images[3]} alt={images[3]} />
              </Col>
              <Col>
                <img src={images[4]} alt={images[4]} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RoomGallery;
