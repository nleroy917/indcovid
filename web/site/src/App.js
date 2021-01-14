import React from 'react';
import './App.css';

import AboutUsPage from './pages/about-us';
import BackOnTrack from './pages/back-on-track';
import IndexPage from './pages/index';
import MoreInfoPage from './pages/more-info';
import StayHealthyPage from './pages/stay-healthy';
import VaccinePage from './pages/vaccine';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
      <Switch>
        <Route path="/vaccine/" component={VaccinePage}>
        </Route>
        <Route path="/about-us/" component={AboutUsPage}>
        </Route>
        <Route path="/more-info/" component={MoreInfoPage}>
        </Route>
        <Route path="/back-on-track/" component={BackOnTrack}>
        </Route>
        <Route path="/stay-healthy/" component={StayHealthyPage}>
        </Route>
        <Route path="/" exact component={IndexPage}>
        </Route>
      </Switch>
      </Router>
    </>
  );
}

export default App;
