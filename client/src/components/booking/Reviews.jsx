import { Card, Col, Container, Row } from "react-bootstrap";
import renderRatings from "../../utils/renderRatings";

const Reviews = ({ reviews }) => {
  return (
    <>
      <section>
        <Container>
          <h5>Reviews and Ratings</h5>
          <hr />
          <Row>
            {reviews.map((review) => (
              <Col
                sm={12}
                lg={6}
                style={{ marginBottom: "1rem" }}
                key={review.id}
              >
                <Card>
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted ratings">
                      {review.name} <br />
                      {renderRatings(review.rating)}
                    </Card.Subtitle>
                    <Card.Text>{review.comment}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Card></Card>
        </Container>
      </section>
    </>
  );
};

export default Reviews;
