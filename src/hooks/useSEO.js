import { useEffect } from 'react';

// Custom hook for managing SEO meta tags
export const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author = 'Chandrakanta Mandal',
  siteName = 'Portfolio - Chandrakanta Mandal',
  twitterHandle = '@your_twitter',
  locale = 'en_US'
}) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = `${title} | ${siteName}`;
    }

    // Helper function to update or create meta tag
    const updateMetaTag = (property, content, isProperty = false) => {
      if (!content) return;
      
      const attribute = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, property);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);

    // Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', locale, true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', twitterHandle);
    updateMetaTag('twitter:creator', twitterHandle);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Additional SEO meta tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (url) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', url);
    }

    // JSON-LD structured data
    if (type === 'website') {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author,
        url: url,
        image: image,
        description: description,
        jobTitle: 'Web Developer',
        worksFor: {
          '@type': 'Organization',
          name: 'Freelance'
        },
        sameAs: [
          'https://github.com/your-github',
          'https://linkedin.com/in/your-linkedin',
          'https://twitter.com/your-twitter'
        ]
      };

      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

  }, [title, description, keywords, image, url, type, author, siteName, twitterHandle, locale]);
};

// Predefined SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: 'Home',
    description: 'Chandrakanta Mandal - Web Developer Portfolio. Passionate about creating interactive and engaging digital experiences with React, Next.js, and modern web technologies.',
    keywords: 'web developer, react developer, frontend developer, portfolio, javascript, next.js, tailwind css',
    image: '/Photo.jpeg',
    url: '/',
    type: 'website'
  },
  about: {
    title: 'About Me',
    description: 'Learn more about Chandrakanta Mandal, a passionate web developer specializing in React, JavaScript, and modern web technologies.',
    keywords: 'about, web developer, skills, experience, react, javascript',
    image: '/Photo.jpeg',
    url: '/#about',
    type: 'profile'
  },
  projects: {
    title: 'Projects',
    description: 'Explore my latest web development projects showcasing React, JavaScript, and modern web technologies.',
    keywords: 'projects, portfolio, web development, react projects, javascript projects',
    image: '/Photo.jpeg',
    url: '/#projects',
    type: 'website'
  },
  blog: {
    title: 'Blog',
    description: 'Read my latest blog posts about web development, React, JavaScript, and modern web technologies.',
    keywords: 'blog, web development, react, javascript, tutorials, tips',
    image: '/Photo.jpeg',
    url: '/#blog',
    type: 'blog'
  },
  contact: {
    title: 'Contact',
    description: 'Get in touch with Chandrakanta Mandal for web development projects and collaborations.',
    keywords: 'contact, hire, web developer, collaboration, projects',
    image: '/Photo.jpeg',
    url: '/#contact',
    type: 'website'
  },
  search: {
    title: 'Search',
    description: 'Search through projects, blog posts, and content on Chandrakanta Mandal\'s portfolio.',
    keywords: 'search, find, projects, blog posts, portfolio',
    image: '/Photo.jpeg',
    url: '/search',
    type: 'website'
  }
};

// Hook for specific page SEO
export const usePageSEO = (pageKey) => {
  const config = seoConfigs[pageKey];
  useSEO(config);
};

// Generate dynamic SEO for blog posts
export const generateBlogPostSEO = (post) => {
  return {
    title: post.title,
    description: post.excerpt || post.description,
    keywords: post.tags?.join(', '),
    image: post.image || '/Photo.jpeg',
    url: `/blog/${post.slug}`,
    type: 'article'
  };
};

// Generate dynamic SEO for projects
export const generateProjectSEO = (project) => {
  return {
    title: project.title,
    description: project.description,
    keywords: project.technologies?.join(', '),
    image: project.image || '/Photo.jpeg',
    url: `/projects/${project.slug}`,
    type: 'website'
  };
};

export default useSEO;
