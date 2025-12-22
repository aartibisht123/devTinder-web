import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],   // ✅ array, not null
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // must be array
    },
    removeFeed: () => {
      return []; // ✅ reset safely
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
