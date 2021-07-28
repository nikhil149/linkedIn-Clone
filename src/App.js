import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
    return (
        <Switch>
            <Route path="/" exact>
                <Login />
            </Route>
            <Route path="/home" exact>
                <Header />
                <Home />
            </Route>
        </Switch>
    );
}

export default App;
