import _ from "lodash";
import { useEffect, useState } from "react";
import { Container, Row, Spinner, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import useAxiosInstance from "../hooks/useAxiosInstance";
import useAuthorized from "../hooks/useAuthorized";
import parseTerritories from "../helpers/parseTerritories";
import Errors from "../components/Errors";

const Home = () => {
  const [errors, setErrors] = useState([]);
  const [territories, setTerritories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthorized = useAuthorized();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const fetchTerritories = async () => {
      setIsLoading(true);

      await axiosInstance
        .get("/territories/all")
        .then((response) => {
          setTerritories(parseTerritories(response.data.data));
        })
        .catch((e) => {
          setErrors([e.message]);
        });

      setIsLoading(false);
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

  const renderLoading = () => {
    return (
      <Alert variant="warning">
        <span>Fetching Data </span>
        <Spinner as="span" size="sm" />
      </Alert>
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
    <Container className="text-center pt-3" id="home-page">
      {renderErrors()}
      {isLoading && renderLoading()}
      {!_.isEmpty(territories) && (
        <Row as={Card} className="text-start territories p-3">
          {renderTerritories(territories)}
        </Row>
      )}
    </Container>
  );
};

export default Home;
