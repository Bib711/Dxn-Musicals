import React, { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Search } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import AudioPlayer from '../components/AudioPlayer';
import { projects } from '../data/projects';

// Get unique categories and tags
const allCategories = ['All', ...new Set(projects.map(project => project.category))];
const allTags = [...new Set(projects.flatMap(project => project.tags))];

const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [headerRef, headerInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const [filtersRef, filtersInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const [projectsRef, projectsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Filter projects based on category, search, and tags
  const filteredProjects = projects.filter(project => {
    // Category filter
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    
    // Search filter
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tags filter
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => project.tags.includes(tag));
    
    return matchesCategory && matchesSearch && matchesTags;
  });

  return (
    <PageTransition>
      {/* Header */}
      <section 
        ref={headerRef}
        className="pt-32 pb-20 bg-gradient-to-b from-charcoal-800 to-charcoal-900 text-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 ${
              headerInView ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-12'
            }`}
          >
            Our <span className="text-purple-500">Projects</span>
          </h1>
          <p 
            className={`text-lg md:text-xl text-charcoal-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              headerInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-12'
            }`}
          >
            Explore our portfolio of music production, sound design, and audio projects across various genres and styles.
          </p>
        </div>
      </section>
      
      {/* Filters */}
      <section 
        ref={filtersRef}
        className="py-8 border-b border-charcoal-200 dark:border-charcoal-700 sticky top-0 bg-white dark:bg-charcoal-900 z-30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`transition-all duration-700 ${
              filtersInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-500" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-charcoal-300 dark:border-charcoal-600 rounded-lg bg-white dark:bg-charcoal-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-3">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-purple-500 text-white'
                        : 'bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-200 dark:hover:bg-charcoal-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-500 text-white'
                        : 'bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-200 dark:hover:bg-charcoal-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section 
        ref={projectsRef}
        className="py-16"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="font-display text-2xl font-bold">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'Result' : 'Results'}
            </h2>
            
            {/* Sort options could go here */}
          </div>
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-charcoal-500 dark:text-charcoal-400">
                No projects match your current filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setSelectedTags([]);
                }}
                className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group bg-white dark:bg-charcoal-900 rounded-lg overflow-hidden shadow-md transition-all duration-700 ${
                    projectsInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${Math.min(index, 5) * 100}ms` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-xl font-semibold">
                        {project.title}
                      </h3>
                      <span className="text-xs text-charcoal-500 dark:text-charcoal-400">
                        {new Date(project.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                    
                    <p className="text-sm text-purple-500 mb-3">{project.category}</p>
                    
                    <p className="text-charcoal-600 dark:text-charcoal-400 mb-6">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-3 py-1 text-xs rounded-full bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {project.audioUrl && (
                      <AudioPlayer url={project.audioUrl} title={project.title} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default ProjectsPage;