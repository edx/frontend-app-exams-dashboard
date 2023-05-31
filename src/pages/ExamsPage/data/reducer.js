import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  currentExamIndex: 0,
  examsList: [],
};

const slice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    loadExams: (state, { payload }) => ({
      ...state,
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
