import _ from "lodash";
import { useSelector } from "react-redux";

const useAuthorized = () => {
  const user = useSelector((state) => state.user);

  return !_.isUndefined(user.roles) && !_.isEmpty(user.roles);
};

export default useAuthorized;
