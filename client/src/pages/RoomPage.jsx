import Room from "../components/booking/Room";
import AppNavbar from "../components/navbar/AppNavbar";

const RoomPage = ({ appContext, setBookingContext, setAuthContext }) => {
  return (
    <>
      <AppNavbar
        authContext={appContext.user}
        setAuthContext={setAuthContext}
      />
      <Room
        bookingContext={appContext.booking}
        setBookingContext={setBookingContext}
      />
    </>
  );
};

export default RoomPage;
