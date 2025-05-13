import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter,Linkedin, Headphones } from 'lucide-react';
import Logo from './Logo';
import { socialMedia } from '../data/team';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const renderSocialIcon = (icon: string) => {
    switch (icon) {
      case 'Instagram':
        return <Instagram size={20} />;
      case 'Youtube':
        return <Youtube size={20} />;
      case 'Linkedin':
          return <Linkedin size={20} />;
      case 'Twitter':
        return <Twitter size={20} />;
      case 'Headphones':
        return <Headphones size={20} />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-charcoal-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Logo size="md" />
            <p className="mt-4 text-charcoal-300">
              Creating music that tells stories and evokes powerful emotions.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialMedia.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal-300 hover:text-purple-500 transition-colors"
                  aria-label={social.platform}
                >
                  {renderSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-charcoal-300 hover:text-purple-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-charcoal-300 hover:text-purple-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-charcoal-300 hover:text-purple-500 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/films" className="text-charcoal-300 hover:text-purple-500 transition-colors">
                  Films
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-charcoal-300 hover:text-purple-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-charcoal-300">Music Production</li>
              <li className="text-charcoal-300">Sound Design</li>
              <li className="text-charcoal-300">Film Scoring</li>
              <li className="text-charcoal-300">Orchestral Arrangement</li>
              <li className="text-charcoal-300">Audio Post-Production</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {/*<li className="flex items-start space-x-3">
                <MapPin size={20} className="text-purple-500 mt-1 flex-shrink-0" />
                <span className="text-charcoal-300">
                  123 Music Avenue, Suite 456<br />
                  Los Angeles, CA 90210
                </span>
              </li>*/}
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-purple-500 flex-shrink-0" />
                <span className="text-charcoal-300">+91 7306552530</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-purple-500 flex-shrink-0" />
                <span className="text-charcoal-300">dxnmusicals@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-charcoal-700 mt-12 pt-8 text-center text-charcoal-400 text-sm">
          <p>© {currentYear} DxN Musicals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;