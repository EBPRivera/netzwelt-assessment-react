import { Card, Form, Button, Spinner } from "react-bootstrap";

const LoginForm = ({ isLoading, onSubmit, onChangeParam, params }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Card className="p-3 w-50">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={params.username}
            onChange={(e) => onChangeParam("username", e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={params.password}
            onChange={(e) => onChangeParam("password", e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" disabled={isLoading} type="submit">
          {isLoading ? <Spinner as="span" size="sm" /> : "Submit"}
        </Button>
      </Form>
    </Card>
  );
};

export default LoginForm;
