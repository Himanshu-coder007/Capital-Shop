// src/pages/AboutUs/teamData.js
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
    bio: 'Sarah founded the company with a vision to make e-commerce more human. With 15 years of experience in tech, she leads our strategic direction.',
    socialLinks: [
      { name: 'Twitter', url: '#', icon: <FaTwitter /> },
      { name: 'LinkedIn', url: '#', icon: <FaLinkedin /> }
    ]
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'CTO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    bio: 'Michael oversees our technology stack and leads our engineering team. He specializes in scalable systems and AI applications.',
    socialLinks: [
      { name: 'Twitter', url: '#', icon: <FaTwitter /> },
      { name: 'GitHub', url: '#', icon: <FaGithub /> }
    ]
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    position: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    bio: 'Elena crafts our user experiences with a focus on accessibility and delight. She brings 10 years of UX/UI expertise to our team.',
    socialLinks: [
      { name: 'Twitter', url: '#', icon: <FaTwitter /> },
      { name: 'LinkedIn', url: '#', icon: <FaLinkedin /> }
    ]
  },
  // Add more team members as needed
];

export default teamMembers;