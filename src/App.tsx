import React from "react";
import { Switch, Route } from "react-router-dom";
import { QuizGuard, ChooseDifficulty, Quiz, QuizResult } from "./components";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <QuizGuard exact path="/quiz/:questionId">
          <Quiz />
        </QuizGuard>

        <Route exact path="/result">
          <QuizResult />
        </Route>

        <Route exact path="/">
          <ChooseDifficulty />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
