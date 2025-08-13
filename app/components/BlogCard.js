import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BlogCard = ({ blog, onPress }) => {
  const truncateContent = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.title}>{blog.title}</Text>
        {blog.sub_title && <Text style={styles.subtitle}>{blog.sub_title}</Text>}
      </View>
      
      <View style={styles.authorContainer}>
        <Image 
          source={{ uri: blog.author.profile_pic_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }}
          style={styles.authorImage}
          defaultSource={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }}
        />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>
            {blog.author.first_name} {blog.author.last_name}
          </Text>
          {blog.author.bio && <Text style={styles.authorBio}>{blog.author.bio}</Text>}
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.contentPreview}>
          {truncateContent(blog.content)}
        </Text>
      </View>
      
      <View style={styles.tagsContainer}>
        {blog.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.metaContainer}>
        <Text style={styles.date}>
          📅 {new Date(blog.created_date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </Text>
        <Text style={styles.readingTime}>
          ⏱️ {getReadingTime(blog.content)} min read
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 6,
    lineHeight: 26,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '400',
    lineHeight: 22,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(102, 126, 234, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.1)',
  },
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#667eea',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 2,
  },
  authorBio: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  contentContainer: {
    marginBottom: 16,
  },
  contentPreview: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    backgroundColor: 'rgba(102, 126, 234, 0.03)',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  tag: {
    backgroundColor: '#667eea',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(102, 126, 234, 0.1)',
  },
  date: {
    fontSize: 14,
    color: '#95a5a6',
    fontWeight: '500',
  },
  readingTime: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
});

export default BlogCard; 