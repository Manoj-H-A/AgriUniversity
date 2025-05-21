import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from '@/pages/LandingPage';
import StudentDashboard from '@/pages/StudentDashboard';
import CollegeDashboard from '@/pages/CollegeDashboard';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import EventDetailPage from '@/pages/EventDetailPage';
import { AnimatePresence } from 'framer-motion';
import { usePortalData } from '@/hooks/usePortalData';
import { services, events, defaultStudentStructure } from '@/lib/initialData';

function App() {
  const location = useLocation();
  const {
    currentUser,
    userType,
    allStudentsData,
    setAllStudentsData,
    handleLogin,
    handleLogout,
    updateStudentDataInSystem,
    addStudentToSystem,
    globalRequests,
    addGlobalRequest,
    updateGlobalRequestStatus,
    availableBooks,
    addAvailableBook,
    updateAvailableBook,
    deleteAvailableBook
  } = usePortalData();

  const isAuthenticated = !!currentUser;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-slate-100 flex flex-col">
      <SiteHeader isAuthenticated={isAuthenticated} userType={userType} onLogout={handleLogout} currentUser={currentUser} />
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
            <Route path="/services/:serviceId" element={<ServiceDetailPage services={services} />} />
            <Route path="/events/:eventId" element={<EventDetailPage events={events} />} />
            
            <Route 
              path="/dashboard/*" 
              element={
                isAuthenticated && userType === 'student' ? (
                  <StudentDashboard 
                    currentUser={currentUser} 
                    allStudentsData={allStudentsData}
                    addGlobalRequest={addGlobalRequest}
                    availableBooks={availableBooks}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/college-dashboard/*" 
              element={
                isAuthenticated && userType === 'staff' ? (
                  <CollegeDashboard 
                    allStudentsData={allStudentsData}
                    setAllStudentsData={setAllStudentsData} 
                    addStudentToSystem={addStudentToSystem}
                    updateStudentDataInSystem={updateStudentDataInSystem}
                    defaultStudentStructure={defaultStudentStructure}
                    globalRequests={globalRequests}
                    updateGlobalRequestStatus={updateGlobalRequestStatus}
                    availableBooks={availableBooks}
                    addAvailableBook={addAvailableBook}
                    updateAvailableBook={updateAvailableBook}
                    deleteAvailableBook={deleteAvailableBook}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}

export default App;