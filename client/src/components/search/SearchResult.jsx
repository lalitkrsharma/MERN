import { Container } from "react-bootstrap";
import useFetch from "../../utils/useFetch";
import SearchResultCard from "./SearchResultCard";

const SearchResult = ({ location, rooms }) => {
  return (
    <>
      <section>
        <Container>
          {rooms &&
            rooms.map((room) => (
              <SearchResultCard room={room} key={room._id} />
            ))}
        </Container>
      </section>
    </>
  );
};

export default SearchResult;
