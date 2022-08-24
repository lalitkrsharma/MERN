import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FloatingLabel,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./auth.css";

const Signup = ({ setAuthContext }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ status: false, message: null });

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || password.length < 8) {
      setError({ status: true, message: "Password must be 8 characters long" });
    } else if (password !== confirmPassword) {
      setError({ status: true, message: "Confirm Password is not matching" });
    } else if (!phone) {
      setError({ status: true, message: "Please give a Phone Number" });
    } else if (!phone.match(/^[6-9]\d{9}$/)) {
      setError({ status: true, message: "Please give a valid Phone Number" });
    } else if (!email) {
      setError({ status: true, message: "Please give a name" });
    } else {
      let signupObject = {
        name,
        email,
        phone,
        password,
        isAdmin: false,
      };
      fetch("http://localhost:8080/api/users/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupObject),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.message) throw new Error(data.message);
          else {
            setAuthContext({
              name: data.name, email: data.email, phone: data.phone, isAdmin: data.isAdmin
            })
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setError({ status: true, message: err.message });
        });
    }
  };
  return (
    <>
      <Container className="app__auth" style={{ height: "90vh" }}>
        <Card>
          <Card.Body>
            <Card.Title>Sign Up</Card.Title>
            <Form style={{ height: "60vh" }} onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingInput1" label="Full Name">
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput2" label="Email ID">
                <Form.Control
                  type="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput3" label="Phone">
                <Form.Control
                  type="number"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput4" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput5"
                label="Confirm Password"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FloatingLabel>
              <Button type="submit">Sign Up</Button>
            </Form>
            <Card.Text>
              Already have an account? <Link to="/login">Login</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
      {error && error.status && (
        <ToastContainer className="p-3" position={"top-end"}>
          <Toast
            bg="warning"
            onClose={() => setError({ status: false, message: null })}
            show={error.status}
            autohide
            delay={3000}
          >
            <Toast.Header>
              <img src="/imgages/logo.png" className="rounded me-2" alt="" />
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>{error.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
};

export default Signup;
