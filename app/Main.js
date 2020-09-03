import React, { useState } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";
//component
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Footer from "./components/Footer";
import About from "./components/About";
import Terms from "./components/Terms";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import ViewSinglePost from "./components/ViewSinglePost";
import FlashMessage from "./components/FlashMessage";

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")));
  const [flashMassage, setFlashMassage] = useState([]);

  function addFlashMessage(msg) {
    setFlashMassage((prev) => prev.concat(msg));
  }
  return (
    <BrowserRouter>
      <FlashMessage msg={flashMassage} />
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Home /> : <HomeGuest />}
        </Route>
        <Route path="/post/:id" exact>
          <ViewSinglePost />
        </Route>
        <Route path="/about-us" exact>
          <About />
        </Route>
        <Route path="/terms" exact>
          <Terms />
        </Route>
        <Route path="/create-post" exact>
          <CreatePost addFlashMessage={addFlashMessage} />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

ReactDom.render(<Main />, document.querySelector("#app"));

if (module.hot) {
  module.hot.accept();
}
