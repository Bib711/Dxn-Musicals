import React, { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Search, Calendar, User } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import VideoPlayer from '../components/VideoPlayer';
import { films } from '../data/films';

const FilmsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [headerRef, headerInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const [searchRef, searchInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const [filmsRef, filmsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Filter films based on search
  const filteredFilms = films.filter(film => {
    return searchQuery === '' || 
      film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.director.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <PageTransition>
      {/* Header */}
      <section 
        ref={headerRef}
        className="pt-32 pb-20 bg-gradient-to-b from-blue-800 to-charcoal-900 text-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 ${
              headerInView ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-12'
            }`}
          >
            Short <span className="text-blue-500">Films</span>
          </h1>
          <p 
            className={`text-lg md:text-xl text-charcoal-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              headerInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-12'
            }`}
          >
            Explore our collection of short films featuring original scores and sound design by our team.
          </p>
        </div>
      </section>
      
      {/* Search */}
      <section 
        ref={searchRef}
        className="py-8 border-b border-charcoal-200 dark:border-charcoal-700 sticky top-0 bg-white dark:bg-charcoal-900 z-30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`transition-all duration-700 ${
              searchInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-500" size={20} />
              <input
                type="text"
                placeholder="Search films by title, description, or director..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-charcoal-300 dark:border-charcoal-600 rounded-lg bg-white dark:bg-charcoal-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Films */}
      <section 
        ref={filmsRef}
        className="py-16"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFilms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-charcoal-500 dark:text-charcoal-400">
                No films match your search.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredFilms.map((film, index) => (
                <div
                  key={film.id}
                  className={`transition-all duration-700 ${
                    filmsInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="order-2 lg:order-1">
                      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                        {film.title}
                      </h2>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal-600 dark:text-charcoal-400 mb-4">
                        <div className="flex items-center gap-1">
                          <User size={16} />
                          <span>Director: {film.director}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>Released: {new Date(film.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}</span>
                        </div>
                        <div>Duration: {film.duration}</div>
                      </div>
                      
                      <p className="text-charcoal-600 dark:text-charcoal-400 mb-6">
                        {film.description}
                      </p>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">Our Contribution</h3>
                        <ul className="list-disc list-inside space-y-2 text-charcoal-600 dark:text-charcoal-400">
                          <li>Original score composition</li>
                          <li>Sound design and atmospheric elements</li>
                          <li>Audio post-production and mixing</li>
                          <li>Foley and sound effects</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="order-1 lg:order-2">
                      <VideoPlayer 
                        url={film.videoUrl} 
                        title={film.title} 
                        thumbnailUrl={film.thumbnailUrl} 
                      />
                    </div>
                  </div>
                  
                  {index < filteredFilms.length - 1 && (
                    <div className="border-b border-charcoal-200 dark:border-charcoal-700 mt-16"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default FilmsPage;