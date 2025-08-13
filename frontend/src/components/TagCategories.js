import React from 'react';

const TagCategories = ({ selectedTags, onTagClick, allTags }) => {
  // Define tag categories
  const tagCategories = {
    'Frontend Development': [
      'react',
      'javascript',
      'frontend',
      'css',
      'html',
      'vue',
      'angular',
      'typescript',
    ],
    'Backend & APIs': [
      'nodejs',
      'backend',
      'api',
      'rest',
      'microservices',
      'architecture',
      'web-services',
    ],
    'Mobile Development': [
      'react-native',
      'mobile',
      'ios',
      'swift',
      'android',
      'cross-platform',
    ],
    'DevOps & Cloud': [
      'docker',
      'kubernetes',
      'devops',
      'aws',
      'cloud',
      'infrastructure',
      'ci-cd',
      'orchestration',
    ],
    'Data & AI': [
      'machine-learning',
      'ai',
      'python',
      'data-science',
      'nlp',
      'big-data',
      'analytics',
      'data-engineering',
    ],
    'Security & Testing': [
      'security',
      'cybersecurity',
      'testing',
      'automation',
      'qa',
      'threat-hunting',
      'siem',
    ],
    'Design & UX': [
      'design',
      'ux-research',
      'accessibility',
      'ui-design',
      'design-systems',
      'inclusive-design',
    ],
    'Emerging Tech': [
      'blockchain',
      'web3',
      'defi',
      'smart-contracts',
      'game-development',
      'unity',
    ],
  };

  // Filter available tags for each category
  const getAvailableTagsInCategory = categoryTags => {
    return categoryTags.filter(tag => allTags.includes(tag));
  };

  return (
    <div className="tag-categories">
      {Object.entries(tagCategories).map(([categoryName, categoryTags]) => {
        const availableTags = getAvailableTagsInCategory(categoryTags);

        if (availableTags.length === 0) return null;

        return (
          <div key={categoryName} className="tag-category">
            <h4 className="category-title">{categoryName}</h4>
            <div className="category-tags">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TagCategories;
