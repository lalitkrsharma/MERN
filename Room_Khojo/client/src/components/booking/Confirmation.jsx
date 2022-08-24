import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AppNavbar from "../navbar/AppNavbar";
import { BsCalendarWeek, BsCalendarCheck } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { GrDirections } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import "./Confirmation.css";
import useFetch from "../../utils/useFetch";
import { useHistory, useParams } from "react-router-dom";
import getDateAsString from "../../utils/getDateAsString";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ConfirmationPage = ({ authContext, setAuthContext }) => {
  const history = useHistory();
  useEffect(() => {
    if (authContext === null) {
      history.push("/login");
    }
  }, authContext);
  const { id } = useParams();

  console.log(id);
  const { data: confirm } = useFetch(
    "http://localhost:8080/api/booking/?id=" + id
  );
  return (
    <>
      <AppNavbar authContext={authContext} setAuthContext={setAuthContext} />
      <section>
        {confirm && (
          <Container className="confirmation-page">
            <Card style={{ width: "32rem" }}>
              <div className="booking-confirmed-bg">
                <Card.Body>
                  <Row>
                    <Col sm={9}>
                      <Card.Title>
                        <b>Booking Confirmed!</b>
                      </Card.Title>
                      <Card.Subtitle>Booking ID: {confirm.id}</Card.Subtitle>
                    </Col>
                    <Col sm={3}>
                      <BsCalendarCheck />
                    </Col>
                  </Row>
                </Card.Body>
              </div>
              <Card.Body className="text-center">
                <Card.Subtitle className="confirmation-name">
                  {confirm.name}{" "}
                  {confirm.guest > 1 ? ` + ${confirm.guest - 1}` : ""}
                </Card.Subtitle>
                <Card.Text className="confirmation-date">
                  <BsCalendarWeek />{" "}
                  {getDateAsString("day, mon dd", confirm.checkin)} -{" "}
                  {getDateAsString("day, mon dd", confirm.checkout)} | 1 Room,{" "}
                  {confirm.guest} Guest
                </Card.Text>
                <hr />
                <Card.Title>{confirm.roomName}</Card.Title>
                <br />
                <Row style={{ padding: "0 2rem" }}>
                  <Col className="confirmation-info">
                    {confirm.duration} Night
                  </Col>
                  <Col className="confirmation-info">
                    {confirm.roomType.substring(0, 24)}
                  </Col>
                  <Col className="confirmation-info">₹{confirm.price}</Col>
                </Row>
                <hr />
                <Card.Subtitle>Location: {confirm.roomAddress}</Card.Subtitle>
                <hr />
                <Row style={{ padding: "0 2rem" }}>
                  <Col className="confirmation-action">
                    <IoCallOutline />
                    <br /> Call
                  </Col>
                  <Col className="confirmation-action">
                    <GrDirections />
                    <br /> Direction
                  </Col>
                  <Col className="confirmation-action">
                    <MdOutlineCancel />
                    <br />
                    Cancel
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Button variant="outline-success" as={Link} to={`/`}>
              Back to Home
            </Button>
          </Container>
        )}
      </section>
    </>
  );
};

export default ConfirmationPage;
