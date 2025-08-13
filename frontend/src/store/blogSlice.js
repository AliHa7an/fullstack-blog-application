import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async ({ page = 1, limit = 10, tags = '', search = '' }) => {
    const params = new URLSearchParams({ page, limit });
    if (tags) params.append('tags', tags);
    if (search) params.append('search', search);
    
    const response = await axios.get(`/api/blogs?${params}`);
    return response.data;
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    pagination: {},
    loading: false,
    error: null,
    selectedTags: [],
    searchQuery: ''
  },
  reducers: {
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSelectedTags, setSearchQuery, clearError } = blogSlice.actions;
export default blogSlice.reducer; 