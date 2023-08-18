import { Routes, Route } from "react-router-dom";

import Home from "../containers/Home";
import Login from "../containers/Login";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account/login" element={<Login />} />
    </Routes>
  );
};

export default Routing;
