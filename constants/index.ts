import { label } from "framer-motion/client";

// NAVIGATION
export const NAV_LINKS = [
    { href: '/', key: 'home', label: 'Home' },
    { href: '/pages/how-do-we-work/', key: 'how_we_work', label: 'How do we work?' },
    { href: '/pages/services', key: 'services', label: 'Services' },
    { href: '/pages/discover', key: 'discover ', label: 'Discover ' },
    { href: '/pages/contact-us', key: 'contact_us', label: 'Contact Us' },
  ];
  
  // CAMP SECTION
  export const PEOPLE_URL = [
    '/person-1.png',
    '/person-2.png',
    '/person-3.png',
    '/person-4.png',
  ];
  
  // FEATURES SECTION
  export const FEATURES = [
    {
      title: 'Endless New Destinations',
      icon: '/location.svg',
      variant: 'orange',
      description:
        'Lots of new locations every month, because we have a worldwide community of travellers who share their best experiences with travelling',
    },
    {
      title: 'Adventure Scheduling Made Easy',
      icon: '/calendar.svg',
      variant: 'green',
      description:
        "Schedule an adventure with friends. On holidays, there are many interesting offers from PathfinderX. That way, there's no more discussion",
    },
    {
      title: 'Live Pricing, Real-Time Updates',
      icon: '/tech.svg',
      variant: 'green',
      description:
        'We display live updates of pricing and availability for flights, accommodations, and transport options, ensuring users have the most current information.',
    },
    {
      title: 'AI-Driven Travel Recommendations',
      icon: '/map.svg',
      variant: 'green',
      description:
        'Our AI-powered recommendation engine provides personalized travel suggestions based on user preferences, ensuring a unique and tailored experience.',
    },

  ];
  
  // FOOTER SECTION
  export const FOOTER_LINKS = [
    {
      title: 'Learn More',
      links: [
        {label: 'About PathfinderX', href: '/pages/how-do-we-work'},
        {label: 'Press Releases', href: '#'},
        {label: 'Environment', href: '#'},
        {label: 'Jobs', href: '#'},
        {label: 'Privacy Policy', href: '#'},
        {label: 'Contact Us', href: '#'},
      ],
    },
    {
      title: 'Our Community',
      links: [
        { label: 'Backpacking', href: '#' },
        { label: 'Solo Travelling', href: '#' },
        { label: 'Cultural Travelling', href: '#' },
        { label: 'Budget Travel', href: '#' },
        { label: 'Adventure Travel', href: '#' },
        { label: 'Family Travel', href: '#' },
        { label: 'Luxury Travel', href: '#' },
      ],
    },
  ];
  
  export const FOOTER_CONTACT_INFO = {
    title: 'Contact Us',
    links: [
      { label: 'Admin Officer', value: '123-456-7890' },
      { label: 'Email Officer', value: 'pathfinderx@gmail.com' },
    ],
  };
  
  export const SOCIALS = {
    title: 'Social',
    links: [
      '/facebook.svg',
      '/instagram.svg',
      '/twitter.svg',
      '/youtube.svg',
      '/wordpress.svg',
    ],
  };
