import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (validateForm()) {
      setIsSubmitting(true);
  
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      formPayload.append('subject', formData.subject);
      formPayload.append('message', formData.message);
      formPayload.append('_captcha', 'false');
      formPayload.append('_template', 'box');
      formPayload.append('_subject', 'New message from Contact Form');
  
      try {
        const response = await fetch('https://formsubmit.co/dxnmusicals@gmail.com', {
          method: 'POST',
          body: formPayload,
        });
  
        if (response.ok) {
          setSubmitSuccess(true);
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          console.error('Form submission failed');
        }
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.name 
              ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
              : 'border-charcoal-300 dark:border-charcoal-600 focus:ring-purple-500 focus:border-purple-500'
          } bg-white dark:bg-charcoal-800 transition-colors`}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-error-500">{errors.name}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.email 
              ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
              : 'border-charcoal-300 dark:border-charcoal-600 focus:ring-purple-500 focus:border-purple-500'
          } bg-white dark:bg-charcoal-800 transition-colors`}
          placeholder="Your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error-500">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.subject 
              ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
              : 'border-charcoal-300 dark:border-charcoal-600 focus:ring-purple-500 focus:border-purple-500'
          } bg-white dark:bg-charcoal-800 transition-colors`}
          placeholder="Subject of your message"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-error-500">{errors.subject}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.message 
              ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
              : 'border-charcoal-300 dark:border-charcoal-600 focus:ring-purple-500 focus:border-purple-500'
          } bg-white dark:bg-charcoal-800 transition-colors`}
          placeholder="Your message"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-error-500">{errors.message}</p>
        )}
      </div>
      
      <div>
        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg ${
            isSubmitting 
              ? 'bg-purple-400 cursor-not-allowed' 
              : 'bg-purple-500 hover:bg-purple-600'
          } text-white font-medium transition-colors`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send size={18} />
            </>
          )}
        </button>
        
        {submitSuccess && (
          <p className="mt-3 text-success-500 text-center">
            Your message has been sent successfully!
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;