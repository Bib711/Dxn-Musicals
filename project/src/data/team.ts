import { TeamMember, TimelineEvent, SocialMedia } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Your Name',
    role: 'Your Role',
    bio: 'Your professional biography and experience',
    imageUrl: '/media/your-photo.jpg' // Add your photo to public/media/
  },
  // Add more team members...
];

export const timeline: TimelineEvent[] = [
  {
    id: '1',
    year: '2024',
    title: 'Your Milestone',
    description: 'Description of your achievement or company milestone'
  },
  // Add more timeline events...
];

export const socialMedia: SocialMedia[] = [
  {
    platform: 'Instagram',
    url: 'https://instagram.com/your-handle',
    icon: 'Instagram'
  },
  // Add your social media links...
];