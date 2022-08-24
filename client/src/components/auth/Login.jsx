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

const Login = ({ setAuthContext }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ status: false, message: null });

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError({ status: true, message: "Please enter password" });
    } else if (!email) {
      setError({ status: true, message: "Password must be 8 characters long" });
    } else {
      let loginObject = {
        email,
        password,
      };
      fetch("http://localhost:8080/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginObject),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.message) throw new Error(data.message);
          else {
            setAuthContext(data);
            history.goBack();
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
      <Container className="app__auth">
        <Card>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingInput" label="Email ID">
                <Form.Control
                  type="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
              <Button type="submit">Login Securely</Button>
            </Form>
            <Card.Text>
              Don't have an account? <Link to="/signup">Create One</Link>
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

export default Login;
