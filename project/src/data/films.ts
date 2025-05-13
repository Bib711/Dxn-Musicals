import { Film } from '../types';

export const films: Film[] = [
  {
    id: '1',
    title: 'Your Film Title',
    description: 'Description of your film project',
    thumbnailUrl: '/media/film1-thumb.jpg', // Add your thumbnail to public/media/
    videoUrl: 'https://your-video-url.com/video1', // Your video URL (e.g., YouTube)
    duration: '12:34',
    director: 'Your Name',
    date: '2024-03-15'
  },
  // Add more films...
];