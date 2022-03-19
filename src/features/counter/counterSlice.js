import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "axios";

export const trialThunk = createAsyncThunk(
  "counter/trialThunk",
  async (state, { getState, requestId, rejectWithValue }) => {
    try {
      console.log("getThunk");
      const { currentRequestId, loading } = getState().counter;
      //only one request at a time
      if (loading !== "pending" || requestId !== currentRequestId) {
        return;
      }
      const response = await axios.get(" http://localhost:4000/superheroes?");

      return response.data;
    } catch (error) {
      throw rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const deleteThunk = createAsyncThunk(
  "counter/deleteThunk",
  async (id, { getState, requestId, rejectWithValue }) => {
    try {
      // console.log("deleteThunk");
      const { currentRequestId, loading } = getState().counter;
      //only one request at a time
      if (loading !== "pending" || requestId !== currentRequestId) {
        return;
      }
      await axios.delete(` http://localhost:4000/superheroes/${id}`);
      // console.log("respone", response);

      return id;
    } catch (error) {
      throw rejectWithValue({ errorMessage: error.message });
    }
  }
);

// export const trialThunk2 = createAsyncThunk(
//   "counter/trialThunk",
//   async (state, { getState, requestId, rejectWithValue }) => {
//     try {
//       const { currentRequestId, loading } = getState().counter;
//       //only one request at a time
//       if (loading !== "pending" || requestId !== currentRequestId) {
//         return;
//       }
//       const response = await axios.get(" http://localhost:4000/superheroes");
//       // console.log("respone", response.data);

//       return response.data.data;
//     } catch (error) {
//       throw rejectWithValue({ network: error.message });
//     }
//   }
// );

const Adaptar = createEntityAdapter({
  selectId: (entity) => entity.id,
});

// console.log(Adaptar);

export const counterSlice = createSlice({
  name: "counter",
  initialState: Adaptar.getInitialState({
    loading: "idle",
    currentRequestId: undefined,
    error: null,
  }),

  reducers: { initial: Adaptar.setAll },

  extraReducers: {
    [trialThunk.pending](state, action) {
      console.log("pending");
      const { requestId } = action.meta;
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = requestId;
      }
    },
    [trialThunk.fulfilled](state, action) {
      console.log("fulfilled");
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.currentRequestId = undefined;
        Adaptar.setAll(state, action);
      }
    },
    [trialThunk.rejected](state, action) {
      console.log("rejected");
      // console.log("rejected", action);
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";

        state.currentRequestId = undefined;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }
      }
    },
    [deleteThunk.pending](state, action) {
      console.log(" delete pending");
      const { requestId } = action.meta;
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = requestId;
      }
    },
    [deleteThunk.fulfilled](state, action) {
      console.log("delete fulfilled");
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.currentRequestId = undefined;
        Adaptar.removeOne(state, action.payload);
      }
    },
    [deleteThunk.rejected](state, action) {
      console.log("delete rejected");
      // console.log("rejected", action);
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";

        state.currentRequestId = undefined;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }
      }
    },
  },
});

export const selectors = Adaptar.getSelectors((state) => state.counter);
// console.log("selectors", selectors);

export const { initial } = counterSlice.actions;

export default counterSlice.reducer;
