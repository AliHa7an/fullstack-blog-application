import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../store/blogSlice';
import BlogCard from '../components/BlogCard';
import TagFilter from '../components/TagFilter';
import Pagination from '../components/Pagination';

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs({}));
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Loading blogs...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="blog-list">
      <h1>Blog Posts</h1>
      <TagFilter />

      <div className="blogs-container">
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)
        )}
      </div>

      <Pagination />
    </div>
  );
};

export default BlogList;
