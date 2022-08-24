import { useState } from "react";
import {
  Col,
  Container,
  FloatingLabel,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import { GrLocation, GrGroup } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import "./Cover.css";

const Cover = ({ bookingContext, setBookingContext }) => {
  const [location, setLocation] = useState(bookingContext.location);
  const [checkin, setCheckin] = useState(bookingContext.checkin);
  const [checkout, setCheckout] = useState(bookingContext.checkout);
  const [guest, setGuest] = useState(bookingContext.guest);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newBookingContext = {
      ...bookingContext,
      location,
      checkin,
      checkout,
      guest,
    };
    setBookingContext(newBookingContext);

    history.push("/search");
  };

  return (
    <>
      <section>
        <Container className="app__cover">
          <Row>
            <Col className="cover-bg">
              <span className="heading">Find your perfect room to stay.</span>
              <span className="subheading">
                Lorem Ipsum is simply dummied text of the printing and
                typesetting industry.
              </span>
            </Col>
            <Col>
              <img src="images/cover.jpg" alt="Cover" className="cover" />
            </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Row className="actions">
              <Col>
                <GrLocation />
                <FloatingLabel controlId="floatingInput" label="Location">
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingInput" label="Check in">
                  <Form.Control
                    type="date"
                    placeholder="Check in"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingInput" label="Check out">
                  <Form.Control
                    type="date"
                    placeholder="Check out"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <GrGroup />
                <FloatingLabel controlId="floatingInput" label="Guests">
                  <Form.Control
                    type="number"
                    placeholder="Guests"
                    min={0}
                    max={4}
                    value={guest}
                    onChange={(e) => setGuest(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  style={{ padding: "1rem 3rem" }}
                  // as={Link}
                  // to="/search"
                  type="submit"
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default Cover;
