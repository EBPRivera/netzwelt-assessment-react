import _ from "lodash";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import useAxiosInstance from "../hooks/useAxiosInstance";
import useAuthorized from "../hooks/useAuthorized";
import parseTerritories from "../helpers/parseTerritories";
import Errors from "../components/Errors";

const Home = () => {
  const [errors, setErrors] = useState([]);
  const [territories, setTerritories] = useState([]);
  const isAuthorized = useAuthorized();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const fetchTerritories = async () => {
      await axiosInstance
        .get("/territories/all")
        .then((response) => {
          setTerritories(parseTerritories(response.data.data));
        })
        .catch((e) => {
          setErrors([e.message]);
        });
    };

    if (!isAuthorized) {
      navigate("/account/login");
    } else {
      fetchTerritories();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseError = (key) => {
    setErrors((errors) =>
      _.remove(errors, (error, index) => _.isEqual(key, index))
    );
  };

  const renderErrors = () => {
    if (_.isEmpty(errors)) return;

    return (
      <Row>
        <Errors errors={errors} onClose={handleCloseError} />
      </Row>
    );
  };

  const renderTerritories = (territories) => {
    if (_.isEmpty(territories)) return;

    return (
      <ul>
        {_.map(territories, (territory, key) => {
          return (
            <li key={key}>
              {territory.name}
              {renderTerritories(territory.children)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Container className="text-center pt-3">
      {renderErrors()}
      <Row className="text-start">{renderTerritories(territories)}</Row>
    </Container>
  );
};

export default Home;
