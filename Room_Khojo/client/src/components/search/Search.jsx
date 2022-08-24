import {
  Button,
  Card,
  Col,
  Form,
  FloatingLabel,
  Row,
  Container,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SearchResult from "./SearchResult";
import "./Search.css";
import { useState } from "react";
import useFetch from "../../utils/useFetch";

const Search = ({ bookingContext, setBookingContext }) => {
  const [location, setLocation] = useState(bookingContext.location);
  const [checkin, setCheckin] = useState(bookingContext.checkin);
  const [checkout, setCheckout] = useState(bookingContext.checkout);
  const [guest, setGuest] = useState(bookingContext.guest);

  const history = useHistory();
  const {
    // error,
    // isPending,
    data: rooms,
  } = useFetch(
    "http://localhost:8080/api/room/?location=" + location.toLowerCase()
  );

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
      <Container style={{ marginTop: "1rem" }}>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row style={{ alignItems: "center" }}>
                <Col sm={6} lg={4}>
                  <FloatingLabel controlId="floatingInput" label="Location">
                    <Form.Control
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm={6} lg={2}>
                  <FloatingLabel controlId="floatingInput" label="Check in">
                    <Form.Control
                      type="date"
                      placeholder="Check in"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm={6} lg={2}>
                  <FloatingLabel controlId="floatingInput" label="Check out">
                    <Form.Control
                      type="date"
                      placeholder="Check out"
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm={6} lg={2}>
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
                <Col sm={12} lg={2}>
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <SearchResult location={location} rooms={rooms} />
    </>
  );
};

export default Search;
