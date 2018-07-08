import React from "react";
import AdminLayout from "../components/Layout/AdminLayout";
import Dashboard from "./Dashboard/Dashboard";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

export default () => (
  <Router>
    <Switch>
      <Redirect exact={true} from="/" to={"/admin"} />
      <Route
        path="/admin"
        render={() => (
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        )}
      />
    </Switch>
  </Router>
);
