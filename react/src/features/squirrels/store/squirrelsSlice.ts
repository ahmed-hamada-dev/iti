import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Squirrel } from "../types";
import type { SquirrelFormData } from "../components/ControlledSquirrelForm";
import * as api from "../api/squirrelsApi";

interface SquirrelsState {
  squirrels: Squirrel[];
  loading: boolean;
  error: string | null;
}

const initialState: SquirrelsState = {
  squirrels: [],
  loading: false,
  error: null,
};


export const fetchSquirrels = createAsyncThunk(
  "squirrels/fetchSquirrels",
  async (args: { search?: string; type?: string } = {}) => {
    return await api.getSquirrels(args.search, args.type);
  }
);

export const addSquirrel = createAsyncThunk(
  "squirrels/addSquirrel",
  async (data: SquirrelFormData) => {
    return await api.createSquirrel(data);
  }
);

export const updateSquirrel = createAsyncThunk(
  "squirrels/updateSquirrel",
  async ({ id, data }: { id: string | number; data: Partial<SquirrelFormData> }) => {
    return await api.updateSquirrel(id, data);
  }
);

export const deleteSquirrel = createAsyncThunk(
  "squirrels/deleteSquirrel",
  async (id: string | number) => {
    await api.deleteSquirrel(id);
    return id;
  }
);

const squirrelsSlice = createSlice({
  name: "squirrels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchSquirrels
      .addCase(fetchSquirrels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSquirrels.fulfilled, (state, action) => {
        state.loading = false;
        state.squirrels = action.payload;
      })
      .addCase(fetchSquirrels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch squirrels";
      })
      // addSquirrel
      .addCase(addSquirrel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSquirrel.fulfilled, (state, action) => {
        state.loading = false;
        state.squirrels.push(action.payload);
      })
      .addCase(addSquirrel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add squirrel";
      })
      // updateSquirrel
      .addCase(updateSquirrel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSquirrel.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.squirrels.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.squirrels[index] = action.payload;
        }
      })
      .addCase(updateSquirrel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update squirrel";
      })
      // deleteSquirrel
      .addCase(deleteSquirrel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSquirrel.fulfilled, (state, action) => {
        state.loading = false;
        state.squirrels = state.squirrels.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteSquirrel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete squirrel";
      });
  },
});

export default squirrelsSlice.reducer;
