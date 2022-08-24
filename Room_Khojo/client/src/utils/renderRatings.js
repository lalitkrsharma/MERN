import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";

const renderRatings = (rating) => {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating && rating - i === 0.5) {
      stars.push(<BsStarHalf key={Math.random()} />);
    } else if (i < rating) {
      stars.push(<BsStarFill key={Math.random()} />);
    } else {
      stars.push(<BsStar key={Math.random()} />);
    }
  }

  return stars;
};

export default renderRatings;
