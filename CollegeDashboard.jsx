import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus, Download, Users, Search, Eye, BellRing as BellRinging } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';

import StudentListTable from '@/components/college/StudentListTable';
import AddStudentDialog from '@/components/college/AddStudentDialog';
import ManageStudentDataDialog from '@/components/college/ManageStudentDataDialog';
import RequestsSection from '@/components/college/RequestsSection';

const CollegeDashboard = ({ 
  allStudentsData, 
  addStudentToSystem, 
  updateStudentDataInSystem, 
  setAllStudentsData, 
  defaultStudentStructure,
  globalRequests,
  addGlobalRequest,
  updateGlobalRequestStatus,
  availableBooks,
  addAvailableBook,
  updateAvailableBook,
  deleteAvailableBook
}) => {
  const { toast } = useToast();
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
  const [isManageStudentDataDialogOpen, setIsManageStudentDataDialogOpen] = useState(false);
  const [selectedStudentForManagement, setSelectedStudentForManagement] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleManageStudentData = (student) => {
    setSelectedStudentForManagement(student);
    setIsManageStudentDataDialogOpen(true);
  };
  
  const handleDeleteStudent = (usn) => {
    if (window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
      setAllStudentsData(prev => prev.filter(s => s.usn !== usn));
      toast({ title: "Student Deleted", description: `Student with USN ${usn} has been removed.`, variant: "destructive" });
    }
  };

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return '';
    
    const mainHeaders = [
      "USN", "Name", "Program", "Year", "CGPA", "Email", "Phone", "Address", 
      "Year of Admission", "Overall Attendance (%)", "Password (hashed/placeholder)"
    ];

    const rows = data.map(student => {
      return [
        `"${student.usn || ''}"`,
        `"${student.name || ''}"`,
        `"${student.program || ''}"`,
        `"${student.year || ''}"`,
        `"${student.cgpa || ''}"`,
        `"${student.email || ''}"`,
        `"${student.phone || ''}"`,
        `"${(student.address || '').replace(/"/g, '""')}"`,
        `"${student.yearOfAdmission || ''}"`,
        `"${student.attendance?.overall || '0%'}"`,
        `"${student.password ? '********' : ''}"` 
      ].join(',');
    });

    return [mainHeaders.join(','), ...rows].join('\r\n');
  };

  const downloadStudentDataCSV = () => {
    const csvData = convertToCSV(allStudentsData);
    if (!csvData) {
        toast({ title: "No Data", description: "There is no student data to export.", variant: "destructive" });
        return;
    }
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'student_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({title: "Data Exported", description: "Student data downloaded as CSV."});
  };
  
  const filteredStudents = allStudentsData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.program && student.program.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pendingRequestCount = globalRequests.filter(req => req.status === 'Pending').length;


  return (
    <motion.div 
      className="container mx-auto px-2 sm:px-4 lg:px-6 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: 0.5}}
    >
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-400 to-yellow-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        College Administration Panel
      </motion.h1>

      <Tabs defaultValue="studentManagement" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-2 gap-2 bg-slate-700/50 border border-secondary/30 p-1.5 rounded-lg mb-6">
          <TabsTrigger value="studentManagement" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Users className="mr-2 h-4 w-4" /> Student Management
          </TabsTrigger>
          <TabsTrigger value="requests" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative">
            <BellRinging className="mr-2 h-4 w-4" /> Requests
            {pendingRequestCount > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {pendingRequestCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="studentManagement">
          <div className="mb-6 p-4 bg-slate-800/50 border border-secondary/30 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Input 
                  type="text"
                  placeholder="Search students (Name, USN, Program)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-slate-200 pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"/>
              </div>
              <div className="flex gap-2 flex-wrap justify-center sm:justify-end">
                <Button onClick={() => setIsAddStudentDialogOpen(true)} className="bg-primary hover:bg-orange-600">
                  <UserPlus className="mr-2 h-4 w-4" /> Add Student
                </Button>
                <Button onClick={downloadStudentDataCSV} variant="outline" className="border-secondary text-secondary hover:bg-secondary/20">
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
              </div>
            </div>
          </div>
          
          <StudentListTable 
            students={filteredStudents}
            onManageData={handleManageStudentData}
            onDeleteStudent={handleDeleteStudent}
          />
        </TabsContent>

        <TabsContent value="requests">
          <RequestsSection 
            requests={globalRequests} 
            updateRequestStatus={updateGlobalRequestStatus}
          />
        </TabsContent>
      </Tabs>


      <AddStudentDialog
        isOpen={isAddStudentDialogOpen}
        onOpenChange={setIsAddStudentDialogOpen}
        addStudentToSystem={addStudentToSystem}
        defaultStudentStructure={defaultStudentStructure}
      />

      {selectedStudentForManagement && (
        <ManageStudentDataDialog
          isOpen={isManageStudentDataDialogOpen}
          onOpenChange={setIsManageStudentDataDialogOpen}
          studentData={selectedStudentForManagement}
          updateStudentDataInSystem={updateStudentDataInSystem}
          onClose={() => setSelectedStudentForManagement(null)}
          availableBooks={availableBooks}
          addAvailableBook={addAvailableBook}
          updateAvailableBook={updateAvailableBook}
          deleteAvailableBook={deleteAvailableBook}
          addGlobalRequest={addGlobalRequest}
        />
      )}
    </motion.div>
  );
};

export default CollegeDashboard;