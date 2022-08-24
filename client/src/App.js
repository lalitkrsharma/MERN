import { useState } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Booking from "./components/booking/Booking";
import ConfirmationPage from "./components/booking/Confirmation";
import AppNavbar from "./components/navbar/AppNavbar";
import Search from "./components/search/Search";
import Home from "./pages/Home";
import RoomPage from "./pages/RoomPage";
import getDateAsString from "./utils/getDateAsString";
import About from "./components/about/About";

function App() {
  let today = new Date();
  const [appContext, setAppContext] = useState({
    user: null,
    booking: {
      checkin: getDateAsString("yyyy-mm-dd", today),
      checkout: getDateAsString(
        "yyyy-mm-dd",
        new Date(today.setDate(today.getDate() + 1))
      ),
      location: "Kolkata",
      guest: 2,
      price: null,
      roomType: null,
    },
  });

  const setAuthContext = (user) => {
    let newUser = { ...appContext, user: user };
    setAppContext(newUser);
  };
  const setBookingContext = (booking) => {
    let newBooking = { ...appContext, booking: booking };
    setAppContext(newBooking);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home
            appContext={appContext}
            setBookingContext={setBookingContext}
            setAuthContext={setAuthContext}
          />
        </Route>
        <Route path="/login">
          <AppNavbar
            authContext={appContext.user}
            setAuthContext={setAuthContext}
          />
          <Login setAuthContext={setAuthContext} />
        </Route>
        <Route path="/signup">
          <AppNavbar
            authContext={appContext.user}
            setAuthContext={setAuthContext}
          />
          <Signup setAuthContext={setAuthContext} />
        </Route>
        <Route path="/search">
          <AppNavbar
            authContext={appContext.user}
            setAuthContext={setAuthContext}
          />
          <Search
            bookingContext={appContext.booking}
            setBookingContext={setBookingContext}
          />
        </Route>
        <Route path="/room/:id">
          <RoomPage
            appContext={appContext}
            setBookingContext={setBookingContext}
            setAuthContext={setAuthContext}
          />
        </Route>
        <Route path="/booking/:id">
          <Booking appContext={appContext} setAuthContext={setAuthContext} />
        </Route>
        <Route path="/confirmation/:id">
          <ConfirmationPage
            authContext={appContext.user}
            setAuthContext={setAuthContext}
          />
        </Route>
        <Route path="/about">
          <About
            authContext={appContext.user}
            setAuthContext={setAuthContext}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
