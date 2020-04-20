/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Route } from "react-router-dom";
import Kancolle from "./Kancolle";
import Home from "./Home";

const App = () => (
  <div>
    <Route path="/" component={Home} exact />
    <Route path="/kancolle" component={Kancolle} exact />
  </div>
);

export default App;
