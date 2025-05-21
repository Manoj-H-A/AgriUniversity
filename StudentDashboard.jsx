import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import AcademicSection from '@/components/dashboard/AcademicSection';
import StudyMaterialsSection from '@/components/dashboard/StudyMaterialsSection';
import FinanceSection from '@/components/dashboard/FinanceSection';
import AdministrativeSection from '@/components/dashboard/AdministrativeSection';
import EngagementSection from '@/components/dashboard/EngagementSection';
import ProfileSection from '@/components/dashboard/ProfileSection';

import {
  GraduationCap, BookCopy, CircleDollarSign, FileBadge, PartyPopper, UserCircle, LayoutDashboard
} from 'lucide-react';


const dashboardTabs = [
  { name: 'Overview', path: 'overview', icon: LayoutDashboard, component: AcademicSection }, 
  { name: 'Academic', path: 'academic', icon: GraduationCap, component: AcademicSection },
  { name: 'Study Materials', path: 'study-materials', icon: BookCopy, component: StudyMaterialsSection },
  { name: 'Finance', path: 'finance', icon: CircleDollarSign, component: FinanceSection },
  { name: 'Administrative', path: 'administrative', icon: FileBadge, component: AdministrativeSection },
  { name: 'Engagement', path: 'engagement', icon: PartyPopper, component: EngagementSection },
  { name: 'Profile', path: 'profile', icon: UserCircle, component: ProfileSection },
];

const StudentDashboard = ({ currentUser, allStudentsData, addGlobalRequest, availableBooks }) => {
  const location = useLocation();
  const { toast } = useToast();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.usn && allStudentsData) {
      const foundStudent = allStudentsData.find(s => s.usn === currentUser.usn);
      if (foundStudent) {
        setStudentData(foundStudent);
      } else {
        toast({ title: "Error", description: "Student data not found.", variant: "destructive" });
      }
    }
  }, [currentUser, allStudentsData, toast]);
  
  const handleGenericAction = (action, item) => {
    toast({
      title: `${action}`,
      description: item ? `Action for ${item.title || item.name || item.type || item.id}` : `Action initiated.`,
      duration: 3000,
    });
  };

  if (!studentData) {
    return (
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-8 text-center">
        <p className="text-xl text-slate-300">Loading student data or data not found...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="container mx-auto px-2 sm:px-4 lg:px-6 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: 0.5}}
    >
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-400 to-yellow-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Welcome, {studentData.name}
      </motion.h1>
      <p className="text-center text-slate-400 mb-6 text-sm">USN: {studentData.usn} | Program: {studentData.program}</p>


      <div className="mb-6">
        <ScrollArea className="w-full whitespace-nowrap rounded-lg bg-slate-700/50 border border-secondary/30">
          <div className="flex w-max space-x-1 p-1.5">
            {dashboardTabs.map((tab) => (
              <Button
                key={tab.name}
                asChild
                variant={location.pathname.endsWith(`/${tab.path}`) || (tab.path === 'overview' && location.pathname.endsWith('/dashboard')) ? "default" : "ghost"}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md
                  ${location.pathname.endsWith(`/${tab.path}`) || (tab.path === 'overview' && location.pathname.endsWith('/dashboard'))
                    ? 'bg-gradient-to-r from-primary to-orange-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-primary/10 hover:text-primary'
                  }`}
              >
                <Link to={tab.path} className="flex items-center">
                  <tab.icon className="mr-2 h-5 w-5" />
                  {tab.name}
                </Link>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
            <Route index element={<Navigate to="overview" replace />} />
            {dashboardTabs.map(tab => {
                const TabComponent = tab.component;
                return (
                    <Route 
                        key={tab.path} 
                        path={tab.path} 
                        element={
                            <TabComponent 
                                studentData={studentData} 
                                currentUser={currentUser} 
                                onAction={handleGenericAction} 
                                toast={toast}
                                isEditable={false}
                                addGlobalRequest={addGlobalRequest}
                                availableBooks={availableBooks}
                            />
                        } 
                    />
                );
            })}
        </Routes>
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentDashboard;