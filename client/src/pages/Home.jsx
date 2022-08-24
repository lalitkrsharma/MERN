import Cover from "../components/cover/Cover";
import Footer from "../components/footer/Footer";
import AppNavbar from "../components/navbar/AppNavbar";
import Trendings from "../components/trendings/Trendings";

const Home = ({ appContext, setBookingContext, setAuthContext }) => {
  return (
    <>
      <AppNavbar
        authContext={appContext.user}
        setAuthContext={setAuthContext}
      />
      <Cover
        bookingContext={appContext.booking}
        setBookingContext={setBookingContext}
      />
      <Trendings />
      <Footer />
    </>
  );
};

export default Home;
