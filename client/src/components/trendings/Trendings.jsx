import { Container, Row } from "react-bootstrap";
import TrendingCard from "./TrendingCard";
import useFetch from "../../utils/useFetch";
import "./Trendings.css";

const Trendings = () => {
  const {
    data: hotels,
  } = useFetch(
    "http://localhost:8080/api/room/trendings"
  );
  return (
    <>
      <section>
        <Container className="app__trendings">
          <h4>Our most popular Room</h4>
          <Row>
            {hotels && hotels.map((hotel) => (
              <TrendingCard key={hotel.id} hotel={hotel} />
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Trendings;

