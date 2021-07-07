import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

import type { RootState } from "../../store";

export type Question = {
  _id: number;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: boolean;
  incorrect_answers: boolean;
};

type Response = {
  response_code: number;
  results: Question[];
};

const quizAdapter = createEntityAdapter<Question>({
  selectId: (question) => question._id,
});

const parseQuestion = (question: string) =>
  question
    .replace(/&#(\d+);/g, function (m, n) {
      return String.fromCharCode(n).replace(/(&quot;)/g, '"');
    })
    .replace(/&quot;/g, '"');

export const fetchQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async (difficulty: string) => {
    try {
      const response = await axios.get<Response>(
        `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=boolean`
      );
      return response.data.results;
    } catch (error: unknown) {
      return new Promise((resolve, reject) => reject(error));
    }
  }
);

export const quizSlice = createSlice({
  name: "questions",
  initialState: quizAdapter.getInitialState({
    status: "idle",
    error: null,
    numQuestions: 5,
    correctAnswers: 0,
  }),
  reducers: {
    answerCorrect: (state) => {
      state.correctAnswers = ++state.correctAnswers;
    },
    restartCorrectAnswers: (state) => {
      state.correctAnswers = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action: any) => {
      let questions = action.payload;
      state.status = "succeeded";
      questions = questions.map((question: Question, index: number) => {
        return {
          ...question,
          question: parseQuestion(question.question),
          _id: ++index,
        };
      });
      quizAdapter.setAll(state, questions);
    });
    builder.addCase(fetchQuestions.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const { answerCorrect, restartCorrectAnswers } = quizSlice.actions;

export const quizSelectors = quizAdapter.getSelectors();

export const selectAllQuestions = (state: RootState) =>
  quizSelectors.selectAll(state.questions);

export const selectQuestionByID = (state: RootState, id: string) =>
  quizSelectors.selectById(state.questions, id);

export const getNumQuestions = (state: RootState): number =>
  state.questions.numQuestions;

export const getCorrectAnswers = (state: RootState): number =>
  state.questions.correctAnswers;

export default quizSlice.reducer;
