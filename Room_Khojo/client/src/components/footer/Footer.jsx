import { Container } from "react-bootstrap";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <section className="app__footer">
        <Container>
          <hr />
        </Container>

        <img
          src="/images/footer-cover.svg"
          alt="Footer Cover"
          className="footer-image"
        />
      </section>
      <div className="copyright">
        <Container>
          <span>© 2022, Room Khojo</span>
          <span>Crafted with 💚 in India</span>
        </Container>
      </div>
    </>
  );
};

export default Footer;
