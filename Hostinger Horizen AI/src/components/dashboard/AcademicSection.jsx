import React from 'react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, CheckSquare, BookMarked, Percent, CalendarDays, Users, ListFilter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AcademicSection = ({ studentData, onAction }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Academic Overview</h2>
      
      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-slate-700/50 border border-secondary/30 p-1.5 rounded-lg">
          <TabsTrigger value="attendance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Attendance</TabsTrigger>
          <TabsTrigger value="results" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Exam Results</TabsTrigger>
          <TabsTrigger value="timetable" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Timetable</TabsTrigger>
          <TabsTrigger value="registration" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Subject Registration</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="mt-4">
          <DashboardCard icon={Percent} title="Attendance Record" className="col-span-1 md:col-span-2">
            <p className="text-4xl font-bold text-orange-400 mb-2">{studentData.attendance.overall}</p>
            <p className="text-sm text-slate-400 mb-4">Overall Attendance</p>
            <div className="space-y-2 mb-4">
              {studentData.attendance.subjects.map(subject => (
                <div key={subject.code} className="text-sm p-2 bg-slate-700/60 rounded-md">
                  <div className="flex justify-between items-center">
                    <span>{subject.name} ({subject.code})</span>
                    <span className="font-semibold text-orange-300">{(subject.attended / subject.total * 100).toFixed(1)}%</span>
                  </div>
                  <p className="text-xs text-slate-500">Attended: {subject.attended}/{subject.total} classes</p>
                </div>
              ))}
            </div>
            <Button onClick={() => onAction('Download Attendance Summary')} variant="outline" className="w-full border-primary text-primary hover:bg-primary/20">
              <Download className="mr-2 h-4 w-4" /> Download Summary
            </Button>
          </DashboardCard>
        </TabsContent>

        <TabsContent value="results" className="mt-4">
          <DashboardCard icon={BarChart3} title="Exam Results & Grades" className="col-span-1 md:col-span-2">
            <p className="text-slate-400 mb-1">Overall CGPA: <span className="text-2xl font-bold text-orange-400">{studentData.examResults.cgpa}</span></p>
            <div className="space-y-3 my-4">
              {studentData.examResults.semesters.map(sem => (
                <div key={sem.name} className="p-3 bg-slate-700/60 rounded-md">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-orange-300">{sem.name}</h4>
                    <span className="text-lg font-bold text-orange-300">{sem.sgpa} SGPA</span>
                  </div>
                  <Button onClick={() => onAction('Download Marksheet', sem)} variant="link" className="text-orange-400 hover:text-orange-200 p-0 h-auto mt-1">
                    <Download className="mr-1 h-3 w-3" /> Download Marksheet
                  </Button>
                </div>
              ))}
            </div>
          </DashboardCard>
        </TabsContent>

        <TabsContent value="timetable" className="mt-4">
           <DashboardCard icon={CalendarDays} title="Class Timetable">
            <div className="space-y-2 text-sm">
              {studentData.timetable.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-slate-700/60 rounded-md">
                  <p className="font-semibold text-orange-300">{item.day}: {item.time}</p>
                  <p>{item.subject}</p>
                  <p className="text-xs text-slate-400">Faculty: {item.faculty} | Room: {item.room}</p>
                </div>
              ))}
            </div>
             <Button onClick={() => onAction('View Full Timetable')} variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary/20">
              View Full Weekly Timetable
            </Button>
          </DashboardCard>
        </TabsContent>

        <TabsContent value="registration" className="mt-4">
          <DashboardCard icon={CheckSquare} title="Subject Registration">
            <h4 className="text-md font-semibold text-orange-400 mb-2">Registered Subjects for Next Semester:</h4>
            {studentData.subjectRegistration.registeredSubjects.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 mb-4 pl-1">
                {studentData.subjectRegistration.registeredSubjects.map(sub => (
                  <li key={sub.id}>{sub.name} ({sub.credits} credits)</li>
                ))}
              </ul>
            ) : <p className="text-slate-400 mb-4">No subjects registered for next semester yet.</p>}
            
            <h4 className="text-md font-semibold text-orange-400 mb-2">Available Electives:</h4>
            {studentData.subjectRegistration.availableElectives.map(ele => (
              <div key={ele.id} className="flex justify-between items-center p-2 bg-slate-700/60 rounded-md mb-2">
                <div>
                  <p>{ele.name}</p>
                  <p className="text-xs text-slate-400">{ele.credits} credits</p>
                </div>
                <Button onClick={() => onAction('Register Elective', ele)} size="sm" className="bg-primary hover:bg-orange-600">Register</Button>
              </div>
            ))}
            {studentData.subjectRegistration.availableElectives.length === 0 && <p className="text-slate-400">No electives available for registration at this time.</p>}
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicSection;