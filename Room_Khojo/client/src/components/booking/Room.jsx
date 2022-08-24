import {
  Col,
  Form,
  FloatingLabel,
  Row,
  Container,
  Button,
  Card,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import Footer from "../footer/Footer";
import Reviews from "./Reviews";
import RoomGallery from "./RoomGallery";
import { useHistory, useParams } from "react-router-dom";
import "./Room.css";
import Facilities from "./Facilities";
import renderRatings from "../../utils/renderRatings";
import useFetch from "../../utils/useFetch";
import { useState } from "react";

const Room = ({ bookingContext, setBookingContext }) => {
  const { id } = useParams();
  const {
    error,
    // isPending,
    data: room,
  } = useFetch("http://localhost:8080/api/room/?id=" + id);

  const [roomType, setRoomType] = useState(null);
  const [checkin, setCheckin] = useState(bookingContext.checkin);
  const [checkout, setCheckout] = useState(bookingContext.checkout);
  const [guest, setGuest] = useState(bookingContext.guest);
  const [price, setPrice] = useState(bookingContext.price);
  const [warning, setWarning] = useState({ status: false, message: null });

  const history = useHistory();


  const updatePrice = (roomType) => {
    setRoomType(roomType);
    for (let i = 0; i < room.category.length; i++) {
      if (room.category[i].type === roomType) {
        setPrice(room.category[i].price);
        break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkin) {
      setWarning({ status: true, message: "Please select Checkin Date." });
    } else if (!checkout) {
      setWarning({ status: true, message: "Please select Checkout Date." });
    } else if (!roomType) {
      // console.log("roomType");
      setWarning({ status: true, message: "Please select a Room Type." });
    } else if (!guest || guest > 4 || guest < 1) {
      setWarning({
        status: true,
        message: "Please select supply number of guests between 1 to 4",
      });
    } else {
      let newBookingContext = {
        ...bookingContext,
        roomType,
        checkin,
        checkout,
        guest,
        price,
      };
      setBookingContext(newBookingContext);

      history.push("/booking/" + id);
    }
  };

  return (
    <>
      {" "}
      {room && (
        <>
          <RoomGallery images={room.images} />
          <Container>
            <Row>
              <Col lg={8}>
                <h5 className="room-title">
                  {room.name}&nbsp;{" - "}&nbsp;{renderRatings(room.rating)}
                </h5>
                <p>{room.address}</p>
              </Col>
              {price && (
                <Col lg={4}>
                  <div className="room-page-price">
                    ₹{price}
                    <div>per room per night</div>
                  </div>
                </Col>
              )}
            </Row>
          </Container>

          <section>
            <Container>
              <Card>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row style={{ alignItems: "center" }}>
                      <Col sm={6} lg={3}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Check in"
                        >
                          <Form.Control
                            type="date"
                            placeholder="Check in"
                            value={checkin}
                            onChange={(e) => setCheckin(e.target.value)}
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col sm={6} lg={3}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Check out"
                        >
                          <Form.Control
                            type="date"
                            placeholder="Check out"
                            value={checkout}
                            onChange={(e) => setCheckout(e.target.value)}
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col sm={6} lg={2}>
                        <FloatingLabel controlId="floatingInput" label="Rooms">
                          <Form.Select
                            aria-label="Floating label select example"
                            onChange={(e) => updatePrice(e.target.value)}
                            required
                          >
                            <option>Select Room</option>
                            {room.category.map((item) => (
                              <option value={item.type}>{item.type}</option>
                            ))}
                          </Form.Select>
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
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col sm={12} lg={2}>
                        <Button variant="primary" type="submit">
                          Continue to Book
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Container>
          </section>

          <Facilities />
          <Reviews reviews={room.reviews} />
          <br />
          <Footer />
        </>
      )}
      {error && error.status && (
        <ToastContainer className="p-3" position={"top-end"}>
          <Toast
            bg="dark"
            onClose={(error = { status: false, message: null })}
            show={error.status}
            autohide
            delay={3000}
          >
            <Toast.Header closeButton={(error.status = false)}>
              <img src="/imgages/logo.png" className="rounded me-2" alt="" />
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>{error.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      {warning && warning.status && (
        <ToastContainer className="p-3" position={"top-end"}>
          <Toast
            bg="warning"
            onClose={() => setWarning({ status: false, message: null })}
            show={warning.status}
            delay={3000}
            autohide
          >
            <Toast.Header
              closeButton={() => setWarning({ status: false, message: null })}
            >
              <img src="/imgages/logo.png" className="rounded me-2" alt="" />
              <strong className="me-auto">Warning</strong>
            </Toast.Header>
            <Toast.Body>{warning.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
};

export default Room;
