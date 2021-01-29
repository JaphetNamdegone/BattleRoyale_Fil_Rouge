import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import 'reactjs-popup/dist/index.css';
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateGame from "./pages/CreateGame";
import ForgotPassword from "./pages/Forgot-password";
import ModifyPassword from "./pages/ModifyPassword";
import Account from "./pages/Account";
import CurrentGames from "./pages/CurrentGames";
import Map1 from "./maps/Map1";
import SearchGame from "./pages/SearchGame";
import SearchGameStore from "./observers/SearchGameStore";
import Saloon from "./pages/Saloon";
import SaloonStore from "./observers/SaloonStore";
import PrivateRoute from "./context/PrivateRoute";

function App() {

    initialize();

    return (
      <Router>
          <Route exact path="/" render={ (props) => <Login {...props}/> } />
          <Route path="/login" render={ (props) => <Login {...props}/> } />
          <Route path="/signup" render={ (props) => <Signup {...props}/> } />
          <Route path="/modify-password" component={ModifyPassword} />
          <PrivateRoute path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute path="/map/game/:gameId/player/:playerId" component={Map1} />
          <PrivateRoute path="/createGame" component={CreateGame} />
          <PrivateRoute path="/account" component={Account} />
          {/* <PrivateRoute path="/saloon" render={ (props) => <Saloon {...props} store={SaloonStore}/> } /> */}
          <PrivateRoute path="/saloon/game/:gameId/player/:playerId" component={() => <Saloon store={SaloonStore} /> } />
          <PrivateRoute path="/currentGames" component={CurrentGames} />
          <PrivateRoute path="/searchGame" component={() => <SearchGame store={SearchGameStore} />} />
      </Router>
    
    )

    // init DOM, just after render() in component life cycle
    function initialize() {
        document.body.style.backgroundColor = "#053244";
    }
}
export default App;