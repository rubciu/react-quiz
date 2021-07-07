import React from "react";
import { useHistory } from "react-router";
import {
  getNumQuestions,
  getCorrectAnswers,
  restartCorrectAnswers,
} from "../../features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";

const QuizResult = (): JSX.Element => {
  const history = useHistory();
  const maxNumQuestions = useAppSelector((state) => getNumQuestions(state));
  const numCorrectQuestions = useAppSelector((state) =>
    getCorrectAnswers(state)
  );
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>QUIZ</h1>
      <h3>
        Your score is {numCorrectQuestions}/{maxNumQuestions}
      </h3>
      <p>
        <button
          onClick={() => {
            dispatch(restartCorrectAnswers());
            history.push("/");
          }}
        >
          START AGAIN
        </button>
      </p>
    </div>
  );
};

export default QuizResult;
