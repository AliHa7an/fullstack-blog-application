'use client';

import React from 'react';

const BlogCard = ({ blog }) => {
  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const getReadingTime = content => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  return (
    <div className="blog-card">
      <h2>{blog.title}</h2>
      {blog.sub_title && <h3>{blog.sub_title}</h3>}

      <div className="author-info">
        <img
          src={
            blog.author.profile_pic_url ||
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
          }
          alt={`${blog.author.first_name} ${blog.author.last_name}`}
          className="author-avatar"
          onError={e => {
            e.target.src =
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face';
          }}
        />
        <div>
          <p className="author-name">
            {blog.author.first_name} {blog.author.last_name}
          </p>
          {blog.author.bio && <p className="author-bio">{blog.author.bio}</p>}
        </div>
      </div>

      <div className="blog-content">
        <p className="content-preview">{truncateContent(blog.content)}</p>
      </div>

      <div className="tags">
        {blog.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="blog-meta">
        <p className="date">
          {new Date(blog.created_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p className="reading-time">
          ⏱️ {getReadingTime(blog.content)} min read
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
