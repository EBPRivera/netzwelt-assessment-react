import { useState } from "react";

import { Card, Form } from "react-bootstrap";

const INIT_PARAMS = {
  username: "",
  password: "",
};

const LoginForm = (onSubmit) => {
  const params = useState(INIT_PARAMS);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e);
    onSubmit(params);
  };

  return (
    <Card className="p-3 w-50">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
      </Form>
    </Card>
  );
};

export default LoginForm;
