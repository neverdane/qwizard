import React from "react";
import AdminLayout from "../components/Layout/AdminLayout";
import Dashboard from "./Dashboard/Dashboard";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import QuizLayout from "../components/Layout/QuizLayout";
import Quiz from "./Quiz/Quiz";

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
      <Route path="/quiz/:quizId" exact={true} render={() => <QuizLayout>
        <Quiz/>
      </QuizLayout>} />
    </Switch>
  </Router>
);
