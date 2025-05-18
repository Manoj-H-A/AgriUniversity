import React from 'react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, ClipboardCheck, Library, Download, Upload, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudyMaterialsSection = ({ studentData, onAction }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Study & Course Materials</h2>
      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-slate-700/50 border border-secondary/30 p-1.5 rounded-lg">
          <TabsTrigger value="resources" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Resources</TabsTrigger>
          <TabsTrigger value="assignments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Assignments</TabsTrigger>
          <TabsTrigger value="library" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Library</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="mt-4">
          <DashboardCard icon={BookOpen} title="Study Resources">
            {studentData.studyResources.map(res => (
              <div key={res.id} className="flex justify-between items-center p-2.5 bg-slate-700/60 rounded-md mb-2">
                <div>
                  <p className="font-medium">{res.title}</p>
                  <p className="text-xs text-orange-400">{res.type}</p>
                </div>
                <Button onClick={() => onAction('Download Resource', res)} variant="ghost" size="sm" className="text-orange-300 hover:text-orange-100">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {studentData.studyResources.length === 0 && <p className="text-slate-400">No study resources available yet.</p>}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="assignments" className="mt-4">
          <DashboardCard icon={ClipboardCheck} title="Assignments">
            {studentData.assignments.map(assign => (
              <div key={assign.id} className="p-3 bg-slate-700/60 rounded-md mb-2.5">
                <h4 className="font-semibold text-orange-300">{assign.title}</h4>
                <p className="text-sm text-slate-400">Subject: {assign.subject} | Due: {assign.dueDate}</p>
                <p className={`text-sm font-medium ${assign.status === 'Submitted' ? 'text-green-400' : 'text-yellow-400'}`}>
                  Status: {assign.status} {assign.marks && `| Marks: ${assign.marks}`}
                </p>
                {assign.status === 'Pending' && (
                  <Button onClick={() => onAction('Submit Assignment', assign)} size="sm" className="mt-2 bg-primary hover:bg-orange-600">
                    <Upload className="mr-2 h-4 w-4" /> Submit
                  </Button>
                )}
              </div>
            ))}
            {studentData.assignments.length === 0 && <p className="text-slate-400">No assignments posted yet.</p>}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="library" className="mt-4">
          <DashboardCard icon={Library} title="Library Access">
            <h4 className="text-md font-semibold text-orange-400 mb-2">Issued Books:</h4>
            {studentData.library.issuedBooks.map(book => (
              <div key={book.id} className="p-2.5 bg-slate-700/60 rounded-md mb-2">
                <p className="font-medium">{book.title} <span className="text-xs text-slate-400">by {book.author}</span></p>
                <p className="text-sm">Issued: {book.issueDate} | Due: {book.dueDate}</p>
                {book.fine > 0 && <p className="text-sm text-red-400">Fine: ₹{book.fine.toLocaleString('en-IN')}</p>}
              </div>
            ))}
            {studentData.library.issuedBooks.length === 0 && <p className="text-slate-400 mb-3">No books currently issued.</p>}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button onClick={() => onAction('Search Books')} variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/20">
                <Search className="mr-2 h-4 w-4" /> Check Book Availability
              </Button>
              {studentData.library.issuedBooks.some(b => b.fine > 0) && (
                <Button onClick={() => onAction('Pay Library Fine')} className="flex-1 bg-red-600 hover:bg-red-700">Pay Late Fees</Button>
              )}
            </div>
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyMaterialsSection;