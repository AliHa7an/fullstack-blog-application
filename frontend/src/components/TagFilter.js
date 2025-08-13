import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTags, fetchBlogs } from '../store/blogSlice';

const TagFilter = () => {
  const dispatch = useDispatch();
  const { blogs, selectedTags } = useSelector(state => state.blogs);

  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];

  const handleTagClick = tag => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];

    dispatch(setSelectedTags(newTags));
    dispatch(fetchBlogs({ tags: newTags.join(',') }));
  };

  return (
    <div className="tag-filter">
      <h3>Filter by Tags:</h3>
      <div className="tags-container">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
