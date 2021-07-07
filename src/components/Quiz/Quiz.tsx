import React, { useState } from "react";

import { useParams, useHistory } from "react-router-dom";
import {
  selectQuestionByID,
  answerCorrect,
} from "../../features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";

const Quiz = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { questionId } = useParams<{ questionId: string }>();
  const question = useAppSelector((state) =>
    selectQuestionByID(state, questionId)
  );
  const [answer, setAnswer] = useState<"True" | "False" | undefined>(undefined);

  const goToNextQuestion = () => {
    const nextId = parseInt(questionId) + 1;

    setCorrectAnswer();
    setAnswer(undefined);
    history.push(`/quiz/${nextId}`);
  };

  const setCorrectAnswer = () => {
    if (answer === question?.correct_answer) {
      dispatch(answerCorrect());
    }
  };

  return (
    <div>
      <h1>Question {questionId}</h1>
      <h2>{question?.question}</h2>
      <div>
        <label>
          YES
          <input
            type="radio"
            checked={answer === "True"}
            name="answer"
            onClick={() => setAnswer("True")}
            readOnly
          />
        </label>
        <label>
          NO
          <input
            type="radio"
            name="answer"
            checked={answer === "False"}
            onClick={() => setAnswer("False")}
            readOnly
          />
        </label>
      </div>
      <p>
        <button onClick={goToNextQuestion} disabled={!answer}>
          NEXT QUESTION
        </button>
      </p>
    </div>
  );
};

export default Quiz;
