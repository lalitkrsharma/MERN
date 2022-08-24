import { Col, Container, Row } from "react-bootstrap";
import {
  AiOutlineWifi,
  AiOutlineCreditCard,
  AiOutlineFieldTime,
  AiOutlineFire,
  AiOutlineBell,
} from "react-icons/ai";
import { MdDesktopWindows } from "react-icons/md";
import { BsSnow3 } from "react-icons/bs";
import {
  GiBathtub,
  GiElevator,
  GiSecurityGate,
  GiVacuumCleaner,
  GiBatteryPackAlt,
} from "react-icons/gi";
import { BiFirstAid } from "react-icons/bi";
import { IoRestaurantOutline, IoLanguage } from "react-icons/io5";

const Facilities = () => {
  return (
    <>
      <section>
        <Container>
          <h5>Facilities</h5>
          <hr />
          <Row className="facilities">
            <Col sm={4} lg={2}>
              <AiOutlineWifi /> Wifi
            </Col>
            <Col sm={4} lg={2}>
              <MdDesktopWindows /> Television
            </Col>
            <Col sm={4} lg={2}>
              <GiBatteryPackAlt /> Power Backup
            </Col>
            <Col sm={4} lg={2}>
              <BsSnow3 /> Air Conditioner
            </Col>
            <Col sm={4} lg={2}>
              <GiBathtub /> Attach Bathroom
            </Col>
            <Col sm={4} lg={2}>
              <GiElevator /> Elevator
            </Col>
            <Col sm={4} lg={2}>
              <IoRestaurantOutline /> Restaurant
            </Col>
            <Col sm={4} lg={2}>
              <BiFirstAid /> First Aid
            </Col>
            <Col sm={4} lg={2}>
              <AiOutlineCreditCard /> Card Payment
            </Col>
            <Col sm={4} lg={2}>
              <GiSecurityGate /> Security
            </Col>
            <Col sm={4} lg={2}>
              <AiOutlineFieldTime /> 24x7 Checkin
            </Col>
            <Col sm={4} lg={2}>
              <AiOutlineFire /> Fire Extinguisher
            </Col>
            <Col sm={4} lg={2}>
              <GiVacuumCleaner /> Daily Housekeeping
            </Col>
            <Col sm={4} lg={2}>
              <AiOutlineBell /> Buzzer/Door Bell
            </Col>
            <Col sm={4} lg={2}>
              <IoLanguage /> Language Assitant
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Facilities;
