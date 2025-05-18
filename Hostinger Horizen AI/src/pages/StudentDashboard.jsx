import React, { useState } from 'react';
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

const StudentDashboard = ({ currentUser }) => {
  const location = useLocation();
  const { toast } = useToast();

  const studentData = {
    name: currentUser?.username || 'Valued Student',
    id: 'UASD2025001',
    program: 'B.Sc. (Hons.) Agriculture',
    year: '3rd Year',
    email: `${currentUser?.username.toLowerCase().replace(' ','')}@uasd.in` || 'student@uasd.in',
    phone: '+91-9876543210',
    address: 'UAS Campus, Krishinagar, Dharwad, Karnataka - 580005',
    attendance: {
      overall: '92%',
      subjects: [
        { name: 'Soil Science & Agri. Chemistry', attended: 28, total: 30, code: 'SAC201' },
        { name: 'Agronomy of Field Crops', attended: 25, total: 28, code: 'AGR202' },
        { name: 'Plant Pathology & Nematology', attended: 29, total: 30, code: 'PPN305' },
      ],
      summaryUrl: '/path/to/attendance-summary.pdf'
    },
    examResults: {
      semesters: [
        { name: 'Semester 1', sgpa: 8.5, marksheetUrl: '/path/to/sem1-marks.pdf' },
        { name: 'Semester 2', sgpa: 8.8, marksheetUrl: '/path/to/sem2-marks.pdf' },
      ],
      cgpa: 8.65
    },
    timetable: [
      { day: 'Monday', time: '09:00 - 11:00', subject: 'Soil Science & Agri. Chemistry', faculty: 'Dr. Ramesh K.', room: 'A101' },
      { day: 'Tuesday', time: '11:00 - 13:00', subject: 'Agronomy of Field Crops', faculty: 'Prof. Suresh M.', room: 'B203' },
      { day: 'Wednesday', time: '14:00 - 16:00', subject: 'Plant Pathology & Nematology', faculty: 'Dr. Anita P.', room: 'C105' },
      { day: 'Thursday', time: '09:00 - 11:00', subject: 'Horticulture', faculty: 'Dr. Vijay L.', room: 'D112' },
      { day: 'Friday', time: '13:00 - 15:00', subject: 'Agricultural Economics', faculty: 'Prof. Lakshmi G.', room: 'E201' },
    ],
    subjectRegistration: {
      availableElectives: [
        { id: 'ELE001', name: 'Organic Farming & Certification', credits: 3 },
        { id: 'ELE002', name: 'Precision Farming Techniques', credits: 3 },
      ],
      registeredSubjects: [
        { id: 'CORE001', name: 'Advanced Soil Fertility Management', credits: 4 },
      ]
    },
    studyResources: [
        { id: 'notes001', type: 'Notes', title: 'Soil Science Lecture Notes Week 1-5', url: '#' },
        { id: 'pres001', type: 'Presentation', title: 'Introduction to Agronomy Slides', url: '#' },
        { id: 'lab001', type: 'Lab Manual', title: 'Plant Pathology Lab Manual', url: '#' },
        { id: 'qp001', type: 'Question Paper', title: 'Mid-term Exam 2024 - Soil Science', url: '#' },
    ],
    assignments: [
        { id: 'assign001', title: 'Soil Composition Analysis Report', subject: 'Soil Science', dueDate: '2025-06-15', status: 'Submitted', marks: '18/20', url: '#' },
        { id: 'assign002', title: 'Crop Rotation Plan for Kharif', subject: 'Agronomy', dueDate: '2025-06-30', status: 'Pending', url: '#' },
    ],
    library: {
        issuedBooks: [
            { id: 'book001', title: 'Principles of Soil Chemistry', author: 'Kim H. Tan', issueDate: '2025-05-01', dueDate: '2025-06-01', fine: 0 },
            { id: 'book002', title: 'Modern Crop Protection', author: 'E. -C. Oerke', issueDate: '2025-04-15', dueDate: '2025-05-15', fine: 50 },
        ],
        searchUrl: '#',
        payFineUrl: '#',
    },
    fees: {
      total: 75000,
      paid: 60000,
      due: 15000,
      dueDate: '2025-07-30',
      receipts: [
        { id: 'receipt001', date: '2024-12-15', amount: 30000, url: '#' },
        { id: 'receipt002', date: '2025-03-10', amount: 30000, url: '#' },
      ],
      paymentLink: '#',
    },
    scholarships: [
        { id: 'schol001', name: 'UAS Merit Scholarship 2025', status: 'Applied', eligibility: 'CGPA > 8.5', applyUrl: '#' },
        { id: 'schol002', name: 'State Govt. Need-Based Grant', status: 'Not Applied', eligibility: 'Family Income < ₹2,50,000 p.a.', applyUrl: '#' },
    ],
    certificates: [
        { id: 'cert001', type: 'Study Certificate', status: 'Not Requested' },
        { id: 'cert002', type: 'Bonafide Certificate', status: 'Issued', downloadUrl: '#' },
    ],
    notices: [
        { id: 'notice001', title: 'Mid-term Exam Schedule Revision', date: '2025-05-10', type: 'Academic', url: '#' },
        { id: 'notice002', title: 'Guest Lecture on Sustainable Farming Practices', date: '2025-05-15', type: 'Event', url: '#' },
    ],
    leaveApplications: [
        { id: 'leave001', fromDate: '2025-04-20', toDate: '2025-04-22', reason: 'Family Function', status: 'Approved' },
    ],
    eventRegistrations: [
        { id: 'event001', name: 'AgriTech Symposium 2025', status: 'Registered', date: '2025-08-15', url: '#' },
    ],
    feedbackForms: [
        { id: 'feedback001', title: 'Course Feedback: Soil Science (SAC201)', status: 'Pending', url: '#' },
    ]
  };
  
  const handleGenericAction = (action, item) => {
    toast({
      title: `${action}`,
      description: item ? `Action for ${item.title || item.name || item.type}` : `Action initiated.`,
      duration: 3000,
    });
  };

  return (
    <motion.div 
      className="container mx-auto px-2 sm:px-4 lg:px-6 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: 0.5}}
    >
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-400 to-yellow-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Student Portal
      </motion.h1>

      <div className="mb-6">
        <ScrollArea className="w-full whitespace-nowrap rounded-lg bg-slate-700/50 border border-secondary/30">
          <div className="flex w-max space-x-1 p-1.5">
            {dashboardTabs.map((tab) => (
              <Button
                key={tab.name}
                asChild
                variant={location.pathname.includes(`/dashboard/${tab.path}`) ? "default" : "ghost"}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md
                  ${location.pathname.includes(`/dashboard/${tab.path}`)
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