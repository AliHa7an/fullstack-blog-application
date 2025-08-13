import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, setSearchQuery } from './store/blogSlice';
import BlogCard from './components/BlogCard';
import SearchBar from './components/SearchBar';
import TagCategories from './components/TagCategories';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { blogs, pagination, loading, error, searchQuery } = useSelector(state => state.blogs);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allAvailableTags, setAllAvailableTags] = useState([]);

  useEffect(() => {
    loadBlogs();
  }, [currentPage, selectedTags, searchQuery]);

  useEffect(() => {
    // Extract all unique tags from blogs and maintain them
    const tags = [...new Set(blogs.flatMap(blog => blog.tags))];
    setAllAvailableTags(prevTags => {
      const newTags = [...new Set([...prevTags, ...tags])];
      return newTags;
    });
  }, [blogs]);

  const loadBlogs = useCallback(() => {
    const tags = selectedTags.join(',');
    dispatch(fetchBlogs({ 
      page: currentPage, 
      limit: 10, 
      tags,
      search: searchQuery 
    }));
  }, [dispatch, currentPage, selectedTags, searchQuery]);

  const handleTagClick = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSearch = useCallback((searchTerm) => {
    dispatch(setSearchQuery(searchTerm));
    setCurrentPage(1); // Reset to first page when searching
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (!pagination || pagination.total_pages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.total_pages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="page-button"
        >
          ←
        </button>
      );
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="page-button"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="page-ellipsis">...</span>);
      }
    }

    // Visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-button ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < pagination.total_pages) {
      if (endPage < pagination.total_pages - 1) {
        pages.push(<span key="ellipsis2" className="page-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={pagination.total_pages}
          onClick={() => handlePageChange(pagination.total_pages)}
          className="page-button"
        >
          {pagination.total_pages}
        </button>
      );
    }

    // Next button
    if (currentPage < pagination.total_pages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="page-button"
        >
          →
        </button>
      );
    }

    return pages;
  };

  const renderResultsInfo = () => {
    if (!pagination) return null;
    
    const { total_blogs, current_page, blogs_per_page } = pagination;
    const startResult = (current_page - 1) * blogs_per_page + 1;
    const endResult = Math.min(current_page * blogs_per_page, total_blogs);
    
    return (
      <div className="results-info">
        <p>
          Showing {startResult}-{endResult} of {total_blogs} blogs
          {searchQuery && ` for "${searchQuery}"`}
          {selectedTags.length > 0 && ` tagged with ${selectedTags.join(', ')}`}
        </p>
      </div>
    );
  };

  if (loading && blogs.length === 0) {
    return <div className="loading">Loading blogs...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="App">
      <div className="blog-list">
        <h1>Tech Blog</h1>
        
        <div className="tag-filter">
          <h3>Filter by Categories</h3>
          <TagCategories 
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
            allTags={allAvailableTags}
          />
        </div>

        <div className="search-section">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {renderResultsInfo()}

        <div className="blogs-container">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        {blogs.length === 0 && !loading && (
          <div className="no-results">
            <h3>No blogs found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        )}

        <div className="pagination">
          {renderPagination()}
        </div>
      </div>
    </div>
  );
}

export default App; 