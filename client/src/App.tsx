import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.less";
import { auth } from "./Firebase";
import history from "./pages/history";
import Routes from "./pages/Routes";
import Navbar from "./shared/components/Navbar";

import { logoutUser, setCurrentUser } from "./redux/actions/user.action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logoutUser());
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router history={history}>
      <Navbar />
      <Routes />
    </Router>
  );
}

export default App;
