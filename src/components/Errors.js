import _ from "lodash";
import { Alert } from "react-bootstrap";

const Errors = ({ errors, onClose }) => {
  return _.map(errors, (error, key) => {
    return (
      <Alert
        dismissible
        key={key}
        onClose={() => onClose(key)}
        variant="danger"
      >
        {error}
      </Alert>
    );
  });
};

export default Errors;
