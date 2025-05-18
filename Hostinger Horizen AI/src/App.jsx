import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import LandingPage from '@/pages/LandingPage';
import StudentDashboard from '@/pages/StudentDashboard';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import EventDetailPage from '@/pages/EventDetailPage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setCurrentUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (loginData) => {
    if (!loginData.username || !loginData.password) {
      toast({
        title: "Login Error",
        description: "Please enter both username and password.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    toast({
      title: "Login Successful",
      description: `Welcome back, ${loginData.username}!`,
      duration: 3000,
    });
    localStorage.setItem('userData', JSON.stringify(loginData));
    setCurrentUser(loginData);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
    localStorage.removeItem('userData');
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  const services = [
    { id: 'library', title: 'Library & E-Resources', description: 'Access a vast collection of books, journals, and digital resources. Our digital library is available 24/7.', details: 'The University Library offers an extensive collection of over 500,000 books, 2,000 journal subscriptions, and access to numerous online databases and e-resources. We provide quiet study spaces, computer labs, and research assistance. Our librarians are available to help you with your research needs. We also host workshops on information literacy and academic writing.' },
    { id: 'career-counseling', title: 'Career Counseling', description: 'Guidance and support for your future career path in agriculture.', details: 'Our Career Counseling service provides personalized guidance to help you explore career options, develop job search strategies, and prepare for interviews. We offer resume and cover letter workshops, mock interviews, and networking events with industry professionals. We aim to equip you with the skills and confidence needed to succeed in the agricultural sector and beyond.' },
    { id: 'academic-support', title: 'Academic Support', description: 'Tutoring, workshops, and resources to help you succeed.', details: 'The Academic Support Center offers a range of services to help students achieve their academic goals. This includes peer tutoring for various subjects, supplemental instruction for challenging courses, and workshops on study skills, time management, and exam preparation. We are committed to providing a supportive learning environment for all students.' },
  ];

  const events = [
    { id: 'agritech-symposium', title: 'Annual AgriTech Symposium', date: '2025-08-15', description: 'Join us for discussions on the latest advancements in agricultural technology.', details: 'The Annual AgriTech Symposium brings together leading researchers, industry experts, and students to discuss the latest innovations and trends in agricultural technology. The event will feature keynote speakers, panel discussions, and poster presentations. It is an excellent opportunity to network and learn about cutting-edge developments in areas such as precision agriculture, sustainable farming, and food technology. The symposium will be held at the University Auditorium from 9 AM to 5 PM.' },
    { id: 'farmers-market-expo', title: 'Farmers Market & Expo', date: '2025-09-05', description: 'Showcasing local produce and innovative farming techniques.', details: 'Our annual Farmers Market & Expo celebrates local agriculture and sustainable practices. Browse a wide variety of fresh, locally grown produce, artisanal food products, and handmade crafts. The expo will also feature demonstrations of innovative farming techniques, workshops on organic gardening, and activities for all ages. Join us at the University Green from 10 AM to 4 PM.' },
    { id: 'research-poster-competition', title: 'Research Poster Competition', date: '2025-10-20', description: 'Students present their groundbreaking research projects.', details: 'The Student Research Poster Competition provides a platform for undergraduate and graduate students to showcase their research findings to the university community and a panel of expert judges. This is a great opportunity to gain experience in presenting research and to receive valuable feedback. Cash prizes will be awarded for the best posters in various categories. The competition will take place in the Grand Hall from 1 PM to 4 PM.' },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-slate-100 flex flex-col">
      <SiteHeader isAuthenticated={isAuthenticated} onLogout={handleLogout} currentUser={currentUser} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={
                <LandingPage 
                  onLogin={handleLogin} 
                  services={services}
                  events={events}
                />
              } 
            />
            <Route 
              path="/services/:serviceId" 
              element={<ServiceDetailPage services={services} />} 
            />
            <Route 
              path="/events/:eventId" 
              element={<EventDetailPage events={events} />} 
            />
            {isAuthenticated ? (
              <Route 
                path="/dashboard/*" 
                element={
                  <StudentDashboard 
                    currentUser={currentUser} 
                  />
                } 
              />
            ) : (
              <Route path="/dashboard/*" element={<LandingPage onLogin={handleLogin} services={services} events={events} />} /> 
            )}
          </Routes>
        </AnimatePresence>
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}

export default App;