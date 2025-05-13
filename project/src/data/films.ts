import { Film } from '../types';

export const films: Film[] = [
  {
    id: '1',
    title: ' Train Station bgm',
    description: 'Description of your film project',
    thumbnailUrl: 'https://img.youtube.com/vi/C2BcTksgt0c/maxresdefault.jpg', // Add your thumbnail to public/media/
    videoUrl: 'https://www.youtube.com/embed/C2BcTksgt0c', // Your video URL (e.g., YouTube)
    duration: '1:55',
    director: 'Dan G Thomas',
    date: '2024-03-15'
  },
  {
    id: '2',
    title: 'Random copyright free song',
    description: 'Description of your film project',
    thumbnailUrl: 'https://img.youtube.com/vi/K4DyBUG242c/maxresdefault.jpg', // Add your thumbnail to public/media/
    videoUrl: 'https://www.youtube.com/embed/K4DyBUG242c', // Your video URL (e.g., YouTube)
    duration: '1:55',
    director: 'Dan G Thomas',
    date: '2024-03-15'
  },
  
  // Add more films...
];