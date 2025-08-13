import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTags, fetchBlogs } from '../store/blogSlice';

const TagFilter = () => {
  const dispatch = useDispatch();
  const { blogs, selectedTags } = useSelector(state => state.blogs);
  
  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];
  
  const handleTagPress = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    dispatch(setSelectedTags(newTags));
    dispatch(fetchBlogs({ tags: newTags.join(',') }));
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Tags:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {allTags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tagButton,
              selectedTags.includes(tag) && styles.activeTagButton
            ]}
            onPress={() => handleTagPress(tag)}
          >
            <Text style={[
              styles.tagText,
              selectedTags.includes(tag) && styles.activeTagText
            ]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tagButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'white',
  },
  activeTagButton: {
    backgroundColor: '#3498db',
  },
  tagText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTagText: {
    color: 'white',
  },
});

export default TagFilter; 