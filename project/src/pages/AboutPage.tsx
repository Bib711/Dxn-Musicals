import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import PageTransition from '../components/PageTransition';
import { teamMembers, timeline } from '../data/team';

const AboutPage: React.FC = () => {
  const [headerRef, headerInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const [missionRef, missionInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const [teamRef, teamInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const [timelineRef, timelineInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
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
            About <span className="text-purple-500">Us</span>
          </h1>
          <p 
            className={`text-lg md:text-xl text-charcoal-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              headerInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-12'
            }`}
          >
            We're a team of passionate musicians, producers, and sound designers dedicated to crafting 
            exceptional audio experiences that tell stories.
          </p>
        </div>
      </section>
      
      {/* Mission */}
      <section 
        ref={missionRef}
        className="py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 
              className={`font-display text-3xl md:text-4xl font-bold mb-8 text-center transition-all duration-700 ${
                missionInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
              }`}
            >
              Our <span className="text-purple-500">Mission</span>
            </h2>
            
            <div 
              className={`text-lg text-charcoal-700 dark:text-charcoal-300 space-y-6 transition-all duration-700 delay-200 ${
                missionInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
              }`}
            >
              <p>
                At DxN Musicals, we believe that sound is a powerful storytelling medium that can 
                evoke emotions, create memories, and transform experiences. Our mission is to help 
                creators tell their stories through sound.
              </p>
              <p>
                Whether it's composing a film score that enhances every emotional beat of a scene, 
                producing music that defines an artist's unique voice, or designing sound that brings 
                a digital experience to life, we approach every project with dedication, creativity, 
                and technical excellence.
              </p>
              <p>
                We're committed to collaboration, innovation, and the pursuit of sonic excellence in 
                everything we do. Our goal is to create music and sound that not only meets but exceeds 
                the vision of our clients and resonates with their audiences.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section 
        ref={teamRef}
        className="py-20 bg-charcoal-50 dark:bg-charcoal-800"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className={`font-display text-3xl md:text-4xl font-bold mb-12 text-center transition-all duration-700 ${
              teamInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
            }`}
          >
            Meet Our <span className="text-purple-500">Team</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`bg-white dark:bg-charcoal-900 rounded-lg overflow-hidden shadow-md transition-all duration-700 ${
                  teamInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white">
                      {member.bio}
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold">{member.name}</h3>
                  <p className="text-purple-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline */}
      <section 
        ref={timelineRef}
        className="py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className={`font-display text-3xl md:text-4xl font-bold mb-12 text-center transition-all duration-700 ${
              timelineInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
            }`}
          >
            Our <span className="text-purple-500">Journey</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-200 dark:bg-charcoal-700"></div>
              
              {/* Timeline events */}
              {timeline.map((event, index) => (
                <div
                  key={event.id}
                  className={`relative z-10 flex items-center mb-12 last:mb-0 transition-all duration-700 ${
                    timelineInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Left side (even index) */}
                  {index % 2 === 0 && (
                    <div className="w-1/2 pr-8 text-right">
                      <h3 className="font-display text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-charcoal-600 dark:text-charcoal-400">{event.description}</p>
                    </div>
                  )}
                  
                  {/* Timeline node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                    {event.year}
                  </div>
                  
                  {/* Right side (odd index) */}
                  {index % 2 === 1 && (
                    <div className="w-1/2 pl-8 ml-auto">
                      <h3 className="font-display text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-charcoal-600 dark:text-charcoal-400">{event.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;