import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  TextInput,
  Modal
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../store/blogSlice';
import BlogCard from '../components/BlogCard';

const SearchBar = ({ onSearch, placeholder = "Search blogs..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text) => {
    setSearchTerm(text);
    onSearch(text);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputWrapper}>
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={handleSearch}
          placeholder={placeholder}
          placeholderTextColor="#95a5a6"
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>
    </View>
  );
};

const BlogListScreen = () => {
  const dispatch = useDispatch();
  const { blogs, pagination, loading, error } = useSelector(state => state.blogs);
  const [selectedTags, setSelectedTags] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [allAvailableTags, setAllAvailableTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    loadBlogs();
  }, [selectedTags, debouncedSearchQuery]);

  useEffect(() => {
    // Extract all unique tags from blogs and maintain them
    const tags = [...new Set(blogs.flatMap(blog => blog.tags || []))];
    setAllAvailableTags(prevTags => {
      const newTags = [...new Set([...prevTags, ...tags])];
      return newTags;
    });
  }, [blogs]);

  const loadBlogs = (page = 1) => {
    const tags = selectedTags.join(',');
    dispatch(fetchBlogs({ page, limit: 10, tags, search: debouncedSearchQuery }));
  };

  const loadMore = () => {
    if (!loadingMore && pagination && pagination.has_next) {
      setLoadingMore(true);
      loadBlogs(currentPage + 1);
      setLoadingMore(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBlogs(1);
    setRefreshing(false);
  };

  const handleTagPress = (tag) => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
      return newTags;
    });
    // Remove this line so modal stays open for multiple selections
    // setShowTagsModal(false);
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  const handleBlogPress = (blog) => {
    // Navigate to blog detail screen
  };

  const renderBlog = ({ item }) => (
    <BlogCard blog={item} onPress={() => handleBlogPress(item)} />
  );

  const renderTag = (tag) => {
    if (!tag || typeof tag !== 'string') {
      return null;
    }
    
    return (
      <TouchableOpacity
        key={tag}
        style={[
          styles.tagButton,
          selectedTags.includes(tag) && styles.tagButtonActive
        ]}
        onPress={() => handleTagPress(tag)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.tagText,
          selectedTags.includes(tag) && styles.tagTextActive
        ]}>
          {tag}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTagsDropdown = () => {
    const availableTags = allAvailableTags.length > 0 ? allAvailableTags : 
      ['react', 'javascript', 'nodejs', 'frontend', 'backend', 'testing', 'cypress', 'jest'];
    
    return (
      <Modal
        visible={showTagsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTagsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter by Tags</Text>
              <TouchableOpacity onPress={() => setShowTagsModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.tagsModalContent}>
              <View style={styles.tagsGrid}>
                {availableTags.map(tag => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.modalTagButton,
                      selectedTags.includes(tag) && styles.modalTagButtonActive
                    ]}
                    onPress={() => handleTagPress(tag)}
                  >
                    <Text style={[
                      styles.modalTagText,
                      selectedTags.includes(tag) && styles.modalTagTextActive
                    ]}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setSelectedTags([]);
                  setShowTagsModal(false);
                }}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderResultsInfo = () => {
    if (!pagination) return null;
    
    const { total_blogs } = pagination;
    
    return (
      <View style={styles.resultsInfo}>
        <Text style={styles.resultsText}>
          {total_blogs} blogs found
          {searchQuery && ` for "${searchQuery}"`}
          {selectedTags.length > 0 && ` tagged with ${selectedTags.join(', ')}`}
        </Text>
      </View>
    );
  };

  if (loading && !refreshing && blogs.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#667eea" />
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Loading blogs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#667eea" />
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadBlogs}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Tech Blog</Text>
        <Text style={styles.subtitle}>Discover amazing articles</Text>
      </View>

      <SearchBar onSearch={handleSearch} />

      {loading && !refreshing && blogs.length > 0 && (
        <View style={styles.searchLoadingContainer}>
          <ActivityIndicator size="small" color="#667eea" />
          <Text style={styles.searchLoadingText}>Searching...</Text>
        </View>
      )}

      <View style={styles.tagsButtonContainer}>
        <TouchableOpacity
          style={styles.tagsDropdownButton}
          onPress={() => setShowTagsModal(true)}
        >
          <Text style={styles.tagsDropdownButtonText}>
            {selectedTags.length > 0 
              ? `Tags (${selectedTags.length} selected)` 
              : 'Filter by Tags'
            }
          </Text>
          <Text style={styles.tagsDropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      {renderResultsInfo()}

      <FlatList
        key={`blogs-${selectedTags.join(',')}-${debouncedSearchQuery}`}
        data={blogs}
        renderItem={renderBlog}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#667eea']}
            tintColor="#667eea"
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No blogs found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search terms or filters</Text>
          </View>
        }
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.loadingMoreContainer}>
              <ActivityIndicator size="small" color="#667eea" />
              <Text style={styles.loadingMoreText}>Loading more blogs...</Text>
            </View>
          ) : null
        }
      />
      
      {renderTagsDropdown()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#667eea',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '400',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  searchInputWrapper: {
    position: 'relative',
    backgroundColor: '#f8fafc',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2c3e50',
  },
  searchIcon: {
    fontSize: 18,
    color: '#667eea',
    marginLeft: 8,
  },
  searchLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8fafc',
  },
  searchLoadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
  },
  tagsButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  tagsDropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tagsDropdownButtonText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  tagsDropdownIcon: {
    fontSize: 18,
    color: '#667eea',
  },
  resultsInfo: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#2c3e50',
    textAlign: 'center',
    fontWeight: '500',
  },
  listContainer: {
    paddingVertical: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#667eea',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95a5a6',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    maxHeight: '70%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
  },
  closeButton: {
    fontSize: 24,
    color: '#667eea',
  },
  tagsModalContent: {
    maxHeight: 250, // Limit height for modal content
    marginBottom: 15,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  modalTagButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  modalTagButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  modalTagText: {
    color: '#34495e',
    fontSize: 14,
    fontWeight: '500',
  },
  modalTagTextActive: {
    color: 'white',
  },
  modalFooter: {
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  loadingMoreText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
  },
});

export default BlogListScreen; 