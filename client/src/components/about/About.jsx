import { Container, Col, Row } from "react-bootstrap";
import Footer from "../footer/Footer";
import AppNavbar from "../navbar/AppNavbar";
import "./About.css";
const About = ({ authContext, setAuthContext }) => {
  return (
    <>
      <AppNavbar authContext={authContext}
        setAuthContext={setAuthContext} />
      <section>
        <Container className="app__about">
          <Row>
            <Col>
              <img src="/images/cover.jpg" alt="About" className="about" />
            </Col>
            <Col className="about-bg">
              <span className="heading">Discover our History.</span>
              <span className="subheading">
                Lorem Ipsum is simply dummied text of the printing and
                typesetting industry.
              </span>
              <span>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </span>
            </Col>
          </Row>
        </Container>
      </section>
      <br />
      <Footer />
    </>
  );
};

export default About;
