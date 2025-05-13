import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter, Headphones } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ContactForm from '../components/ContactForm';
import { socialMedia } from '../data/team';

const ContactPage: React.FC = () => {
  const [headerRef, headerInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const [contentRef, contentInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const renderSocialIcon = (icon: string) => {
    switch (icon) {
      case 'Instagram':
        return <Instagram size={24} />;
      case 'Youtube':
        return <Youtube size={24} />;
      case 'Twitter':
        return <Twitter size={24} />;
      case 'Headphones':
        return <Headphones size={24} />;
      default:
        return null;
    }
  };

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
            Contact <span className="text-purple-500">Us</span>
          </h1>
          <p 
            className={`text-lg md:text-xl text-charcoal-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              headerInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-12'
            }`}
          >
            Have a project in mind? We'd love to hear from you and discuss how we can bring your vision to life.
          </p>
        </div>
      </section>
      
      {/* Contact Content */}
      <section 
        ref={contentRef}
        className="py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div 
              className={`bg-white dark:bg-charcoal-900 rounded-lg shadow-md p-8 transition-all duration-700 ${
                contentInView ? 'opacity-100 transform-none' : 'opacity-0 translate-x-12'
              }`}
            >
              <h2 className="font-display text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
            
            {/* Contact Info */}
            <div 
              className={`space-y-12 transition-all duration-700 ${
                contentInView ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-purple-500 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-medium text-lg mb-1">Studio Location</h3>
                      <p className="text-charcoal-600 dark:text-charcoal-400">
                        123 Music Avenue, Suite 456<br />
                        Los Angeles, CA 90210<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="text-purple-500 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-medium text-lg mb-1">Email Us</h3>
                      <p className="text-charcoal-600 dark:text-charcoal-400">
                        hello@dxnmusicals.com
                      </p>
                      <p className="text-charcoal-500 dark:text-charcoal-500 text-sm mt-1">
                        We aim to respond within 24 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="text-purple-500 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-medium text-lg mb-1">Call Us</h3>
                      <p className="text-charcoal-600 dark:text-charcoal-400">
                        (310) 555-7890
                      </p>
                      <p className="text-charcoal-500 dark:text-charcoal-500 text-sm mt-1">
                        Monday to Friday, 9:00 AM - 6:00 PM PT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Connect With Us</h2>
                <div className="flex flex-wrap gap-4">
                  {socialMedia.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-charcoal-800 rounded-lg shadow-sm hover:shadow-md transition-shadow text-charcoal-700 dark:text-white"
                      aria-label={social.platform}
                    >
                      {renderSocialIcon(social.icon)}
                      <span>{social.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Map */}
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Find Us</h2>
                <div className="bg-charcoal-100 dark:bg-charcoal-800 rounded-lg overflow-hidden h-64 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-charcoal-500 dark:text-charcoal-400">
                    <p>Interactive map would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-purple-50 dark:bg-charcoal-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Ready to start your project?
          </h2>
          <p className="text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto mb-8">
            We're excited to collaborate with you on your next music or audio project. Reach out to us today!
          </p>
        </div>
      </section>
    </PageTransition>
  );
};

export default ContactPage;