import React, { Component } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";
import { Home,Sukses } from "./pages";
export default class App extends Component {
  render() {
    return ( 
        <BrowserRouter>
        <NavbarComponent />
        <main>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/sukses" component={Sukses}/>
          </Switch>
        </main>
        </BrowserRouter>
    )
  }
}
