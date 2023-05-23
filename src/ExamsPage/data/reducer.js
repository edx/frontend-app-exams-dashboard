import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentExam: null,
  examsList: [],
};

export const examId = (exam) => `exam-${exam.id}`;

const slice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    loadExams: (state, { payload }) => ({
      ...state,
      currentExam: examId(payload[0]),
      examsList: payload.map((exam) => ({
        id: exam.id,
        name: exam.exam_name,
      })),
    }),
  },
});

export const {
  loadExams,
} = slice.actions;

export const {
  reducer,
} = slice;