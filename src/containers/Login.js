import _ from "lodash";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAxiosInstance from "../hooks/useAxiosInstance";
import LoginForm from "../components/LoginForm";
import Errors from "../components/Errors";
import { login } from "../features/user";

const INIT_PARAMS = {
  username: "",
  password: "",
};

const Login = () => {
  const [params, setParams] = useState(INIT_PARAMS);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  const handleLogin = async () => {
    setIsLoading(true);

    await axiosInstance
      .post("/account/signin", params)
      .then((response) => {
        if (_.isUndefined(response.data.roles)) {
          setErrors(_.map(response.data, (val) => val));
        } else {
          dispatch(login(response.data));
          navigate("/");
        }
      })
      .catch((e) => {
        setErrors([e.message]);
      });

    setIsLoading(false);
  };

  const handleChangeParam = (key, val) => {
    setParams((params) => ({ ...params, [key]: val }));
  };

  const handleCloseAlert = (key) => {
    setErrors((errors) =>
      _.remove(errors, (error, index) => _.isEqual(key, index))
    );
  };

  const renderErrors = () => {
    return (
      <Row>
        <Errors errors={errors} onClose={handleCloseAlert} />
      </Row>
    );
  };

  return (
    <Container md={3} className="pt-3">
      {!_.isEmpty(errors) && renderErrors()}
      <Row className="d-flex justify-content-center">
        <LoginForm
          isLoading={isLoading}
          onSubmit={handleLogin}
          onChangeParam={handleChangeParam}
          params={params}
        />
      </Row>
    </Container>
  );
};

export default Login;
