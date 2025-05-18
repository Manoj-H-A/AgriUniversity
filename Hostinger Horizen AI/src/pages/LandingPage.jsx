import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import ServicesSection from '@/components/landing/ServicesSection';
import EventsSection from '@/components/landing/EventsSection';
import LoginSection from '@/components/landing/LoginSection';
import ContactSection from '@/components/landing/ContactSection';

const LandingPage = ({ onLogin, services, events }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5}}>
      <HeroSection />
      <AboutSection />
      <ServicesSection services={services} />
      <EventsSection events={events} />
      <LoginSection onLogin={onLogin} />
      <ContactSection />
    </motion.div>
  );
};

export default LandingPage;