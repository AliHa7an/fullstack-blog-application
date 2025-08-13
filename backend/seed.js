const mongoose = require('mongoose');
const User = require('./models/User');
const Blog = require('./models/Blog');
require('dotenv').config();

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/SampleBlogs',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Blog.deleteMany({});

    const user1 = await User.create({
      first_name: 'John',
      last_name: 'Doe',
      bio: 'Senior Software Engineer at TechCorp. Passionate about React, Node.js, and building scalable applications.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    });

    const user2 = await User.create({
      first_name: 'Sarah',
      last_name: 'Johnson',
      bio: 'Full-stack developer and tech blogger. Love exploring new technologies and sharing knowledge.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    });

    const user3 = await User.create({
      first_name: 'Michael',
      last_name: 'Chen',
      bio: 'DevOps engineer and cloud architecture enthusiast. Building the future of scalable infrastructure.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    });

    const user4 = await User.create({
      first_name: 'Emily',
      last_name: 'Davis',
      bio: 'UI/UX Designer and frontend developer. Creating beautiful and functional user experiences.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    });

    const user5 = await User.create({
      first_name: 'David',
      last_name: 'Wilson',
      bio: 'Backend architect and database specialist. Expert in microservices and distributed systems.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    });

    const user6 = await User.create({
      first_name: 'Lisa',
      last_name: 'Anderson',
      bio: 'Mobile app developer and React Native expert. Creating cross-platform experiences.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    });

    const user7 = await User.create({
      first_name: 'Alex',
      last_name: 'Martinez',
      bio: 'Data scientist and machine learning engineer. Turning data into actionable insights.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop&crop=face',
    });

    const user8 = await User.create({
      first_name: 'Rachel',
      last_name: 'Thompson',
      bio: 'Security specialist and ethical hacker. Protecting digital assets and educating on cybersecurity.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    });

    const user9 = await User.create({
      first_name: 'James',
      last_name: 'Brown',
      bio: 'Product manager and agile coach. Bridging the gap between business and technology.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    });

    const user10 = await User.create({
      first_name: 'Maria',
      last_name: 'Garcia',
      bio: 'QA engineer and testing automation expert. Ensuring software quality and reliability.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    });

    const user11 = await User.create({
      first_name: 'Kevin',
      last_name: 'Lee',
      bio: 'Blockchain developer and DeFi enthusiast. Building the future of decentralized finance.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    });

    const user12 = await User.create({
      first_name: 'Sophie',
      last_name: 'Taylor',
      bio: 'AI researcher and natural language processing specialist. Making machines understand humans.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    });

    const user13 = await User.create({
      first_name: 'Robert',
      last_name: 'Clark',
      bio: 'System administrator and infrastructure engineer. Keeping the digital world running smoothly.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    });

    const user14 = await User.create({
      first_name: 'Amanda',
      last_name: 'White',
      bio: 'Frontend architect and accessibility advocate. Making the web better for everyone.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    });

    const user15 = await User.create({
      first_name: 'Daniel',
      last_name: 'Harris',
      bio: 'Game developer and Unity expert. Creating immersive digital experiences.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    });

    const user16 = await User.create({
      first_name: 'Jessica',
      last_name: 'Miller',
      bio: 'Cloud solutions architect and AWS specialist. Scaling applications to the cloud.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    });

    const user17 = await User.create({
      first_name: 'Thomas',
      last_name: 'Moore',
      bio: 'DevOps engineer and Kubernetes expert. Orchestrating containerized applications.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    });

    const user18 = await User.create({
      first_name: 'Nicole',
      last_name: 'Jackson',
      bio: 'UX researcher and user advocate. Understanding human behavior to create better products.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    });

    const user19 = await User.create({
      first_name: 'Christopher',
      last_name: 'Martin',
      bio: 'Backend developer and API specialist. Building robust and scalable services.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    });

    const user20 = await User.create({
      first_name: 'Ashley',
      last_name: 'Lee',
      bio: 'Full-stack developer and startup enthusiast. Building products that make a difference.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    });

    const user21 = await User.create({
      first_name: 'Ryan',
      last_name: 'Gonzalez',
      bio: 'Mobile developer and iOS specialist. Creating native experiences for Apple devices.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    });

    const user22 = await User.create({
      first_name: 'Lauren',
      last_name: 'Perez',
      bio: 'Data engineer and ETL specialist. Building data pipelines that transform businesses.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    });

    const user23 = await User.create({
      first_name: 'Brandon',
      last_name: 'Robinson',
      bio: 'Cybersecurity analyst and threat hunter. Protecting organizations from digital threats.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    });

    const user24 = await User.create({
      first_name: 'Megan',
      last_name: 'Walker',
      bio: 'Product designer and design systems expert. Creating consistent and beautiful interfaces.',
      profile_pic_url:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    });

    await Blog.create([
      {
        title: 'Getting Started with React Hooks',
        sub_title: 'A comprehensive guide to modern React development',
        content:
          "React Hooks have revolutionized how we write React components. In this post, we'll explore useState, useEffect, and custom hooks to build more maintainable and readable code. We'll also look at best practices and common patterns that will help you write better React applications.",
        slug: 'getting-started-with-react-hooks',
        tags: ['react', 'javascript', 'frontend', 'hooks'],
        author: user1._id,
      },
      {
        title: 'Building Scalable APIs with Node.js',
        sub_title: 'Best practices for creating robust backend services',
        content:
          "Node.js has become the go-to runtime for building scalable APIs. In this comprehensive guide, we'll cover everything from setting up your project structure to implementing authentication, error handling, and database optimization. Learn how to build APIs that can handle millions of requests.",
        slug: 'building-scalable-apis-nodejs',
        tags: ['nodejs', 'javascript', 'backend', 'api'],
        author: user2._id,
      },
      {
        title: 'Mastering MongoDB with Mongoose',
        sub_title: 'Advanced techniques for database modeling and queries',
        content:
          "Mongoose is an elegant MongoDB object modeling for Node.js. This post covers advanced topics like schema design, middleware, virtuals, and aggregation pipelines. We'll also explore performance optimization techniques and real-world examples.",
        slug: 'mastering-mongodb-mongoose',
        tags: ['mongodb', 'mongoose', 'database', 'nodejs'],
        author: user3._id,
      },
      {
        title: 'Modern CSS Techniques for 2024',
        sub_title: 'CSS Grid, Flexbox, and advanced styling patterns',
        content:
          "CSS has evolved dramatically in recent years. Learn about CSS Grid, Flexbox, custom properties, and modern layout techniques. We'll also explore CSS-in-JS solutions and how to create responsive, accessible designs that work across all devices.",
        slug: 'modern-css-techniques-2024',
        tags: ['css', 'frontend', 'design', 'responsive'],
        author: user4._id,
      },
      {
        title: 'State Management with Redux Toolkit',
        sub_title: 'Simplifying Redux with modern patterns',
        content:
          'Redux Toolkit is the official, opinionated way to write Redux logic. This guide covers createSlice, createAsyncThunk, and the Redux Toolkit Query. Learn how to write less boilerplate code while maintaining predictable state management.',
        slug: 'state-management-redux-toolkit',
        tags: ['redux', 'javascript', 'state-management', 'react'],
        author: user1._id,
      },
      {
        title: 'Testing React Applications',
        sub_title:
          'Unit testing, integration testing, and E2E testing strategies',
        content:
          'Testing is crucial for building reliable React applications. This post covers Jest, React Testing Library, and Cypress for comprehensive testing strategies. Learn how to write maintainable tests that give you confidence in your code.',
        slug: 'testing-react-applications',
        tags: ['testing', 'react', 'jest', 'cypress'],
        author: user2._id,
      },
      {
        title: 'Docker for Development',
        sub_title:
          'Containerizing your applications for consistent environments',
        content:
          "Docker has become essential for modern development workflows. Learn how to containerize your Node.js applications, set up development environments, and use Docker Compose for multi-service applications. We'll also cover best practices for production deployments.",
        slug: 'docker-for-development',
        tags: ['docker', 'devops', 'containers', 'deployment'],
        author: user3._id,
      },
      {
        title: 'Performance Optimization in React',
        sub_title: 'Techniques to make your React apps lightning fast',
        content:
          'Performance is key to user experience. This guide covers React.memo, useMemo, useCallback, code splitting, and lazy loading. Learn how to identify performance bottlenecks and implement optimization strategies that make your apps feel instant.',
        slug: 'performance-optimization-react',
        tags: ['react', 'performance', 'optimization', 'frontend'],
        author: user4._id,
      },
      {
        title: 'Microservices Architecture Patterns',
        sub_title: 'Designing scalable and maintainable distributed systems',
        content:
          'Microservices have become the standard for building large-scale applications. This comprehensive guide covers service discovery, API gateways, circuit breakers, and event-driven architectures. Learn how to design systems that scale with your business.',
        slug: 'microservices-architecture-patterns',
        tags: ['microservices', 'architecture', 'backend', 'scalability'],
        author: user5._id,
      },
      {
        title: 'React Native Performance Tips',
        sub_title: 'Optimizing your mobile apps for better user experience',
        content:
          'React Native performance can make or break your mobile app. This post covers memory management, bundle optimization, native module usage, and profiling techniques. Learn how to create smooth, responsive mobile experiences.',
        slug: 'react-native-performance-tips',
        tags: ['react-native', 'mobile', 'performance', 'optimization'],
        author: user6._id,
      },
      {
        title: 'Machine Learning for Developers',
        sub_title: 'Practical introduction to ML concepts and implementation',
        content:
          'Machine learning is no longer just for data scientists. This guide introduces developers to core ML concepts, popular frameworks like TensorFlow and PyTorch, and practical implementation strategies. Start building intelligent applications today.',
        slug: 'machine-learning-for-developers',
        tags: ['machine-learning', 'ai', 'python', 'data-science'],
        author: user7._id,
      },
      {
        title: 'Web Security Best Practices',
        sub_title: 'Protecting your applications from common vulnerabilities',
        content:
          'Security should be a top priority for every developer. This comprehensive guide covers OWASP Top 10 vulnerabilities, authentication best practices, data encryption, and security testing. Learn how to build applications that users can trust.',
        slug: 'web-security-best-practices',
        tags: [
          'security',
          'web-development',
          'authentication',
          'cybersecurity',
        ],
        author: user8._id,
      },
      {
        title: 'Agile Development Methodologies',
        sub_title: 'Implementing effective project management practices',
        content:
          'Agile methodologies have transformed how teams deliver software. This post covers Scrum, Kanban, user stories, sprint planning, and retrospectives. Learn how to implement agile practices that improve team productivity and product quality.',
        slug: 'agile-development-methodologies',
        tags: ['agile', 'project-management', 'scrum', 'kanban'],
        author: user9._id,
      },
      {
        title: 'Automated Testing Strategies',
        sub_title: 'Building comprehensive test suites for reliable software',
        content:
          'Automated testing is essential for maintaining code quality and preventing regressions. This guide covers unit testing, integration testing, end-to-end testing, and continuous testing practices. Learn how to build robust test suites that give you confidence.',
        slug: 'automated-testing-strategies',
        tags: ['testing', 'automation', 'qa', 'ci-cd'],
        author: user10._id,
      },
      {
        title: 'Blockchain Development Fundamentals',
        sub_title: 'Building decentralized applications with smart contracts',
        content:
          'Blockchain technology is revolutionizing how we think about trust and decentralization. This guide covers smart contract development, Web3 integration, DeFi protocols, and blockchain architecture. Start building the future of decentralized applications.',
        slug: 'blockchain-development-fundamentals',
        tags: ['blockchain', 'smart-contracts', 'web3', 'defi'],
        author: user11._id,
      },
      {
        title: 'Natural Language Processing with Python',
        sub_title: 'Building intelligent text processing applications',
        content:
          'NLP is transforming how we interact with computers. This comprehensive guide covers text preprocessing, sentiment analysis, named entity recognition, and language models. Learn how to build applications that understand and process human language.',
        slug: 'natural-language-processing-python',
        tags: ['nlp', 'python', 'machine-learning', 'ai'],
        author: user12._id,
      },
      {
        title: 'Linux System Administration',
        sub_title: 'Managing servers and infrastructure effectively',
        content:
          'Linux system administration is a crucial skill for DevOps engineers and system administrators. This guide covers user management, process control, networking, security, and automation. Learn how to maintain and optimize Linux systems.',
        slug: 'linux-system-administration',
        tags: ['linux', 'system-admin', 'devops', 'infrastructure'],
        author: user13._id,
      },
      {
        title: 'Web Accessibility Guidelines',
        sub_title: 'Making the web inclusive for all users',
        content:
          "Web accessibility is not just a legal requirement—it's the right thing to do. This guide covers WCAG guidelines, semantic HTML, ARIA attributes, and testing tools. Learn how to create websites that work for everyone, including users with disabilities.",
        slug: 'web-accessibility-guidelines',
        tags: ['accessibility', 'frontend', 'wcag', 'inclusive-design'],
        author: user14._id,
      },
      {
        title: 'Game Development with Unity',
        sub_title: 'Creating engaging games for multiple platforms',
        content:
          'Unity has democratized game development, making it accessible to developers of all skill levels. This guide covers game mechanics, physics, animation, and platform deployment. Learn how to create engaging games that players love.',
        slug: 'game-development-unity',
        tags: ['game-development', 'unity', 'c#', 'gaming'],
        author: user15._id,
      },
      {
        title: 'AWS Cloud Architecture',
        sub_title: 'Designing scalable and cost-effective cloud solutions',
        content:
          'AWS provides a comprehensive suite of cloud services for building scalable applications. This guide covers EC2, S3, Lambda, RDS, and architectural patterns like serverless and microservices. Learn how to leverage AWS for optimal performance and cost.',
        slug: 'aws-cloud-architecture',
        tags: ['aws', 'cloud', 'architecture', 'serverless'],
        author: user16._id,
      },
      {
        title: 'Kubernetes Orchestration',
        sub_title: 'Managing containerized applications at scale',
        content:
          'Kubernetes has become the standard for container orchestration. This comprehensive guide covers pods, services, deployments, and advanced features like auto-scaling and rolling updates. Learn how to manage complex containerized applications effectively.',
        slug: 'kubernetes-orchestration',
        tags: ['kubernetes', 'containers', 'devops', 'orchestration'],
        author: user17._id,
      },
      {
        title: 'User Experience Research Methods',
        sub_title: 'Understanding users to create better products',
        content:
          'UX research is the foundation of user-centered design. This guide covers user interviews, surveys, usability testing, and data analysis techniques. Learn how to gather insights that drive product decisions and improve user satisfaction.',
        slug: 'user-experience-research-methods',
        tags: ['ux-research', 'user-research', 'design', 'product'],
        author: user18._id,
      },
      {
        title: 'RESTful API Design Principles',
        sub_title: 'Creating intuitive and scalable web APIs',
        content:
          'Well-designed APIs are crucial for successful software systems. This guide covers REST principles, HTTP methods, status codes, authentication, and API documentation. Learn how to create APIs that developers love to use.',
        slug: 'restful-api-design-principles',
        tags: ['api', 'rest', 'backend', 'web-services'],
        author: user19._id,
      },
      {
        title: 'Startup Development Strategies',
        sub_title: 'Building and scaling successful tech products',
        content:
          'Building a successful startup requires more than just technical skills. This guide covers MVP development, user acquisition, growth hacking, and scaling strategies. Learn how to turn your ideas into successful products that users love.',
        slug: 'startup-development-strategies',
        tags: ['startup', 'product-development', 'mvp', 'growth'],
        author: user20._id,
      },
      {
        title: 'iOS App Development with Swift',
        sub_title: 'Creating native applications for Apple devices',
        content:
          'Swift has revolutionized iOS development with its modern syntax and powerful features. This guide covers Swift fundamentals, UIKit, Core Data, and App Store deployment. Learn how to create beautiful and performant iOS applications.',
        slug: 'ios-app-development-swift',
        tags: ['ios', 'swift', 'mobile', 'apple'],
        author: user21._id,
      },
      {
        title: 'Data Engineering Fundamentals',
        sub_title: 'Building robust data pipelines and infrastructure',
        content:
          'Data engineering is the backbone of modern data-driven organizations. This guide covers ETL processes, data warehousing, streaming data, and big data technologies. Learn how to build scalable data infrastructure that powers analytics and ML.',
        slug: 'data-engineering-fundamentals',
        tags: ['data-engineering', 'etl', 'big-data', 'analytics'],
        author: user22._id,
      },
      {
        title: 'Cybersecurity Threat Hunting',
        sub_title: 'Proactive security monitoring and incident response',
        content:
          'Threat hunting is a proactive approach to cybersecurity that involves actively searching for threats in your environment. This guide covers threat intelligence, SIEM tools, incident response, and security automation. Learn how to protect your organization from advanced threats.',
        slug: 'cybersecurity-threat-hunting',
        tags: ['cybersecurity', 'threat-hunting', 'siem', 'incident-response'],
        author: user23._id,
      },
      {
        title: 'Design Systems Implementation',
        sub_title: 'Creating consistent and scalable design languages',
        content:
          'Design systems are essential for maintaining consistency across large applications and teams. This guide covers component libraries, design tokens, documentation, and governance. Learn how to create design systems that scale with your organization.',
        slug: 'design-systems-implementation',
        tags: ['design-systems', 'ui-design', 'components', 'design-tokens'],
        author: user24._id,
      },
    ]);

    console.log('Database seeded successfully with 24 users and 28 blogs');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
