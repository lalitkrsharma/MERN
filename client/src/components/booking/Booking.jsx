import {
  Card,
  Col,
  Container,
  Form,
  FloatingLabel,
  Row,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import renderRatings from "../../utils/renderRatings";
import AppNavbar from "../navbar/AppNavbar";
import { BsCalendarWeek } from "react-icons/bs";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { useState } from "react";
import "./Booking.css";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../../utils/useFetch";
import getDateAsString from "../../utils/getDateAsString";
import getRandomString from "../../utils/getRandomString";
import { useEffect } from "react";

const Booking = ({ appContext, setAuthContext }) => {
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (appContext.user === null) {
      history.push("/login");
    }
    if (appContext.booking.roomType === null) {
      history.push("/room/" + id);
    }
  }, appContext);
  const [roomType, setRoomType] = useState(appContext.booking.roomType);
  const [checkin, setCheckin] = useState(appContext.booking.checkin);
  const [checkout, setCheckout] = useState(appContext.booking.checkout);
  const [guest, setGuest] = useState(appContext.booking.guest);
  const [price, setPrice] = useState(appContext.booking.price);
  const [email, setEmail] = useState(
    appContext.user ? appContext.user.email : ""
  );
  const [name, setName] = useState(appContext.user ? appContext.user.name : "");
  const [phone, setPhone] = useState(
    appContext.user ? appContext.user.phone : ""
  );
  const [warning, setWarning] = useState(null);

  const { error, data: room } = useFetch(
    "http://localhost:8080/api/room/?id=" + id
  );

  const calculateDateDiff = (checkin, checkout) => {
    const date1 = new Date(checkin);
    const date2 = new Date(checkout);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) {
      setWarning({ status: true, message: "Please give a Phone Number" });
    } else if (!String(phone).match(/^[6-9]\d{9}$/)) {
      setWarning({ status: true, message: "Please give a valid Phone Number" });
    } else if (!name) {
      setWarning({ status: true, message: "Please give a name" });
    } else {
      let bookingID = getRandomString(11);
      let booking = {
        id: bookingID,
        name,
        email,
        phone,
        roomName: room.name,
        roomAddress: room.address,
        roomType,
        guest,
        checkin,
        checkout,
        price: Math.round(price * 1.28 - price * 0.25),
        duration: calculateDateDiff(checkin, checkout),
      };
      fetch("http://localhost:8080/api/booking/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          history.push("/confirmation/" + bookingID);
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
          error = { status: true, message: err.message };
        });
    }
  };
  return (
    <>
      <AppNavbar
        authContext={appContext.user}
        setAuthContext={setAuthContext}
      />
      <section>
        <Container>
          <Row>
            <Col sm={12} lg={6}>
              <Card className="booking-details">
                <Card.Body>
                  <Card.Title>Customer Details</Card.Title>
                  <Card.Text>
                    We will use these details to share your booking information
                  </Card.Text>
                  <br />
                  {/* <Card.Text> */}
                  <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingInput" label="Full Name">
                      <Form.Control
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        // required
                      />
                    </FloatingLabel>
                    <Row>
                      <Col>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Email ID"
                        >
                          <Form.Control
                            type="email"
                            placeholder="Email ID"
                            value={email}
                            disabled={true}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Phone Number"
                        >
                          <Form.Control
                            type="number"
                            // min={0}
                            // max={9999999999}
                            // minLength={10}
                            // maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            placeholder="Phone Number"
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                      Book Now
                    </Button>
                  </Form>
                  {/* </Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} lg={6}>
              <Card className="booking-hotel-details">
                <Card.Body>
                  <Card.Title>{room && room.name}</Card.Title>
                  <Card.Subtitle>{room && room.address}</Card.Subtitle>
                  <Card.Text className="ratings">{renderRatings(4)}</Card.Text>
                  <Card.Text>
                    {calculateDateDiff(checkin, checkout)} Night
                  </Card.Text>
                  <Card.Text>
                    <BsCalendarWeek /> {getDateAsString("day, mon dd", checkin)}{" "}
                    - {getDateAsString("day, mon dd", checkout)} | 1 Room,{" "}
                    {guest} Guest
                  </Card.Text>
                  <Card.Text>
                    <MdOutlineMeetingRoom />
                    {roomType}
                  </Card.Text>
                  <hr />
                  <Row>
                    <Col>
                      Room Price <br />
                      Tax <br />
                      25% Coupon Discount
                    </Col>
                    <Col className="text-right">
                      ₹{price} <br />+ ₹{Math.round(price * 0.28)} <br />- ₹
                      {Math.round(price * 0.25)}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>
                      <Card.Subtitle>
                        Total Payable <br />
                        <small className="text-secondary">
                          inclusive all taxes
                        </small>
                      </Card.Subtitle>
                    </Col>
                    <Col>
                      <Card.Title className="text-right">
                        <b>₹{Math.round(price * 1.28 - price * 0.25)}</b>
                      </Card.Title>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
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
            autohide
            delay={3000}
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

export default Booking;
