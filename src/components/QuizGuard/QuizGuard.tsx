import React from "react";
import { Redirect, Route } from "react-router";
import { useAppSelector } from "../../helpers/hooks";
import {
  getNumQuestions,
  selectAllQuestions,
} from "../../features/quiz/quizSlice";

const QuizGuard = ({ children, ...rest }: any) => {
  const questionId = rest.computedMatch.params.questionId;
  const maxNumQuestions = useAppSelector((state) => getNumQuestions(state));
  const questions = useAppSelector((state) => selectAllQuestions(state));

  return (
    <Route
      {...rest}
      render={({ location }) =>
        questions.length ? (
          questionId && questionId <= maxNumQuestions ? (
            children
          ) : (
            <Redirect to={{ pathname: "/result", state: { from: location } }} />
          )
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    ></Route>
  );
};

export default QuizGuard;
