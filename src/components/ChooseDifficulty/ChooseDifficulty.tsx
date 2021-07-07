import React, { useState } from "react";
import { useHistory } from "react-router";
import { fetchQuestions } from "../../features/quiz/quizSlice";
import { useAppDispatch } from "../../helpers/hooks";

const ChooseDifficulty = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [difficulty, setDifficulty] = useState<string>("");

  const getQuestions = async () => {
    try {
      const action = await dispatch(fetchQuestions(difficulty));

      if (action.payload) {
        history.push("/quiz/1");
      } else {
        alert(
          "There has been a problem trying to fetch questions, please try again later"
        );
      }
    } catch (error) {
      // TODO: Handle error
    }
  };

  return (
    <div>
      <h1>QUIZ</h1>
      <select
        name="difficulty"
        id="difficulty"
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="">Select difficulty level</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <p>
        <button onClick={getQuestions} disabled={!difficulty}>
          START QUIZ
        </button>
      </p>
    </div>
  );
};

export default ChooseDifficulty;
