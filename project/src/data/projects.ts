import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Your Project Title',
    category: 'Your Category',
    description: 'Description of your music project',
    imageUrl: '/media/project1-cover.jpg', // Add your image to public/media/
    audioUrl: '/media/project1.mp3', // Add your audio to public/media/
    tags: ['Your Genre', 'Style', 'Mood'],
    date: '2024-03-20'
  },
  // Add more projects...
];