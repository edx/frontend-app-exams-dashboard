import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  currentExamIndex: 0,
  examsList: [],
  attemptsList: [],
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
    loadExamAttempts: (state, { payload }) => {
      if (payload.results.length > 0) {
        console.log("loadExamAttempts RESULTS:", payload.results)

        // for each attempt in the data, push to attempts list custom object values
        payload.results.forEach((attempt) => {
          const dataToAdd = {
            // “Username”, “Time Limit”, “Type”, “Started At”, “Completed At”, “Status”, and “Action”.
            // username: attempt.user.username, TODO: Figure out how this breaks react
            time_limit: attempt.allowed_time_limit_mins,
            // type: attempt.exam.exam_type,
            started_at: attempt.start_time,
            completed_at: attempt.end_time,
            status: attempt.status,
            // action:, NOTE: This value will be a link in the table
          }
          console.log("ADDING DATA:",dataToAdd)
          state.attemptsList.push(dataToAdd);
        })
        console.log("loadExamAttempts THE LIST:", state.attemptsList)
        // attemptsToAdd.forEach((attempt) => {
        //   state.attemptsList.push(attempt);
        // });
        // console.log("loadExamAttempts THE LIST AFTER concat:", state.attemptsList)

        // return {
        //   ...state,
        //   attemptsList: payload.results.map((attempt) => ({
        //         // “Username”, “Time Limit”, “Type”, “Started At”, “Completed At”, “Status”, and “Action”.
        //         //Note: Should these fields match the field names in the backend, or should the be in camelCase?
        //         // username: attempt.user.username, TODO: Figure out how this
        //         time_limit: attempt.allowed_time_limit_mins,
        //         // type: attempt.exam.exam_type,
        //         started_at: attempt.start_time,
        //         completed_at: attempt.end_time,
        //         status: attempt.status,
        //         // action:, NOTE: This value will be a link in the table
        //     }))
        // }

      }



      // set attemptsList to THAT concat'd value
      // and return it with ...state
      // return {
      //   ...state,
      //   attemptsList: newAttemptsList,
      // }
    },
  },
});

export const {
  loadExams,
  loadExamAttempts,
} = slice.actions;

export const {
  reducer,
} = slice;
