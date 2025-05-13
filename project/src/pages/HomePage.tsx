import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Music, Film, Mic, PlayCircle,Guitar,Drum } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import WaveBackground from '../components/WaveBackground';
import ParallaxSection from '../components/ParallaxSection';
import TypewriterHeading from '../components/TypewriterHeading';
import AudioPlayer from '../components/AudioPlayer';
import { projects } from '../data/projects';
import { films } from '../data/films';

const HomePage: React.FC = () => {
  const featuredProjects = projects.slice(0, 3);
  const featuredFilm = films[0];
  
  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const [projectsRef, projectsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const [filmsRef, filmsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <PageTransition>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <WaveBackground />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 
              className={`font-display text-4xl md:text-6xl font-bold mb-6 transition-opacity duration-1000 ${
                heroInView ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                Your Story,
              </span>
              <br />
              Told Through Sound
            </h1>
            
            <TypewriterHeading 
              text="Where music meets imagination"
              element="p"
              className="text-xl md:text-2xl text-charcoal-700 dark:text-charcoal-300 mb-8"
            />
            
            <div className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-300 ${
              heroInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
            }`}>
              <Link
                to="/projects"
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                Explore Projects <ArrowRight size={18} />
              </Link>
              
              <Link
                to="/contact"
                className="px-6 py-3 bg-transparent hover:bg-charcoal-100 dark:hover:bg-charcoal-800 border border-charcoal-300 dark:border-charcoal-600 rounded-lg transition-colors font-medium"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
        
        <ParallaxSection speed={0.2} className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        </ParallaxSection>
      </section>
      
      {/* Services Section */}
      <section 
        ref={sectionRef}
        className="py-20 bg-charcoal-50 dark:bg-charcoal-800"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What We <span className="text-purple-500">Do</span>
            </h2>
            <p className="text-lg text-charcoal-600 dark:text-charcoal-300">
              We create custom music and sound experiences that elevate your creative vision
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Music className="text-purple-500" size={40} />,
                title: 'Music Production',
                description: 'From concept to final mix, we create custom music that brings your vision to life.',
              },
              {
                icon: <Film className="text-purple-500" size={40} />,
                title: 'Film Scoring',
                description: 'Elevate your visual storytelling with music that enhances every emotional moment.',
              },
              
              {
                icon: <Guitar className="text-purple-500" size={40} />,
                title: 'Band Performance',
                description: 'Deliver powerful live experiences through dynamic and expressive band performances.',
              },
            ].map((service, index) => (
              <div 
                key={index}
                className={`bg-white dark:bg-charcoal-900 p-8 rounded-lg shadow-md transition-all duration-700 ${
                  sectionInView
                    ? 'opacity-100 transform-none'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-center mb-5">{service.icon}</div>
                <h3 className="font-display text-xl font-semibold mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-charcoal-600 dark:text-charcoal-400 text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section 
        ref={projectsRef}
        className="py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Featured <span className="text-purple-500">Projects</span>
              </h2>
              <p className="text-lg text-charcoal-600 dark:text-charcoal-300">
                Explore our recent music production work
              </p>
            </div>
            
            <Link
              to="/projects"
              className="hidden md:flex items-center gap-2 text-purple-500 hover:text-purple-600 font-medium transition-colors"
            >
              View All <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group bg-white dark:bg-charcoal-900 rounded-lg overflow-hidden shadow-md transition-all duration-700 ${
                  projectsInView
                    ? 'opacity-100 transform-none'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="w-full">
                      <p className="text-white text-sm mb-2">{project.category}</p>
                      <AudioPlayer url={project.audioUrl || ''} title="" small />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-charcoal-600 dark:text-charcoal-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 text-xs rounded-full bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-600 font-medium transition-colors"
            >
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Film */}
      <section 
        ref={filmsRef}
        className="py-20 bg-charcoal-900 text-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Featured <span className="text-blue-500">Film</span>
              </h2>
              <p className="text-lg text-charcoal-300">
                Our work extends beyond music to complete audio-visual experiences
              </p>
            </div>
            
            <div 
              className={`transition-all duration-700 ${
                filmsInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={featuredFilm.thumbnailUrl}
                  alt={featuredFilm.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <h3 className="font-display text-2xl font-semibold mb-2">
                    {featuredFilm.title}
                  </h3>
                  <p className="text-charcoal-300 mb-4 max-w-2xl">
                    {featuredFilm.description}
                  </p>
                  <Link
                    to="/films"
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-medium transition-colors"
                  >
                    <PlayCircle size={20} /> Watch Film
                  </Link>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <Link
                  to="/films"
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-medium transition-colors"
                >
                  Explore All Films <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Ready to bring your story to life?
          </h2>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto mb-8">
            Let's collaborate to create music and sound that resonates with your audience and elevates your project.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default HomePage;