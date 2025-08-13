import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../store/blogSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { pagination, selectedTags } = useSelector(state => state.blogs);
  
  const handlePageChange = (page) => {
    dispatch(fetchBlogs({ 
      page, 
      tags: selectedTags.join(',') 
    }));
  };
  
  if (!pagination.total_pages || pagination.total_pages <= 1) {
    return null;
  }
  
  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(pagination.current_page - 1)}
        disabled={pagination.current_page <= 1}
        className="page-button"
      >
        Previous
      </button>
      
      {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`page-button ${page === pagination.current_page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => handlePageChange(pagination.current_page + 1)}
        disabled={pagination.current_page >= pagination.total_pages}
        className="page-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination; 