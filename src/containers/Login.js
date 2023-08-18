import { Container } from "react-bootstrap";

import LoginForm from "../components/LoginForm";

const Login = () => {
  const handleLogin = (params) => {
    console.log(params);
  };

  return (
    <Container md={3} className="d-flex justify-content-center pt-3">
      <LoginForm onSubmit={handleLogin} />
    </Container>
  );
};

export default Login;
