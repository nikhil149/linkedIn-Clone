import React, {useEffect} from "react";
import { useDispatch} from 'react-redux';
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import {getUserAuth} from "./actions"

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserAuth());
    }, [dispatch])
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
