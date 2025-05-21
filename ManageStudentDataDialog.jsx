import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

import AddStudentFormFields from './AddStudentFormFields'; 
import AcademicSection from '@/components/dashboard/AcademicSection';
import StudyMaterialsSection from '@/components/dashboard/StudyMaterialsSection';
import FinanceSection from '@/components/dashboard/FinanceSection';
import AdministrativeSection from '@/components/dashboard/AdministrativeSection';
import EngagementSection from '@/components/dashboard/EngagementSection';
import ProfileSection from '@/components/dashboard/ProfileSection';


const ManageStudentDataDialog = ({ 
    isOpen, 
    onOpenChange, 
    studentData: initialStudentData, 
    updateStudentDataInSystem, 
    onClose,
    availableBooks,
    addAvailableBook,
    updateAvailableBook,
    deleteAvailableBook,
    addGlobalRequest
}) => {
  const { toast } = useToast();
  const [editableStudentData, setEditableStudentData] = useState(initialStudentData);

  useEffect(() => {
    setEditableStudentData(initialStudentData);
  }, [initialStudentData]);

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setEditableStudentData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileAction = (action, details) => {
    toast({
        title: `File Action: ${action}`,
        description: `For ${details.certId || details.assignId || details.receiptId || 'item'}. File: ${details.file?.name || 'N/A'}. (URL update simulation for now)`,
        duration: 3000,
    });

    let updatedData = { ...editableStudentData };

    if (action === 'Upload Certificate File' && details.certId) {
        updatedData.certificates = editableStudentData.certificates.map(cert => 
            cert.id === details.certId ? { ...cert, fileUrl: `simulated/path/to/${details.file.name}` } : cert
        );
    } else if (action === 'Upload Fee Receipt File' && details.receiptId) {
        updatedData.fees.receipts = editableStudentData.fees.receipts.map(rec => 
            rec.id === details.receiptId ? { ...rec, fileUrl: `simulated/path/to/${details.file.name}` } : rec
        );
    } else if (action === 'Upload Assignment File' && details.assignId) {
        updatedData.assignments = editableStudentData.assignments.map(assign =>
            assign.id === details.assignId ? { ...assign, submissionUrl: `simulated/path/to/${details.file.name}` } : assign
        );
    }
    setEditableStudentData(updatedData);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudentDataInSystem(editableStudentData);
    toast({ title: "Success", description: `Student ${editableStudentData.name}'s data updated.` });
    onOpenChange(false);
    if(onClose) onClose();
  };

  if (!editableStudentData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { onOpenChange(open); if(!open && onClose) onClose(); }}>
      <DialogContent className="max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] h-[90vh] flex flex-col bg-slate-800 border-secondary text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-primary">Manage Student Data: {editableStudentData.name} ({editableStudentData.usn})</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="basicInfo" className="flex-grow flex flex-col overflow-hidden">
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-1 bg-slate-700/50 p-1">
            <TabsTrigger value="basicInfo" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-1.5 sm:text-sm">Basic Info</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-1.5 sm:text-sm">Profile</TabsTrigger>
            <TabsTrigger value="academic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-1.5 sm:text-sm">Academic</TabsTrigger>
            <TabsTrigger value="study" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-1.5 sm:text-sm">Study</TabsTrigger>
            <TabsTrigger value="finance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-1.5 sm:text-sm">Finance</TabsTrigger>
            <TabsTrigger value="admin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-1.5 sm:text-sm">Admin</TabsTrigger>
            <TabsTrigger value="engagement" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-1.5 sm:text-sm">Engagement</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-grow mt-2 pr-3">
            <TabsContent value="basicInfo" className="mt-0">
              <form className="space-y-3 p-1">
                <AddStudentFormFields formData={editableStudentData} handleInputChange={handleBasicInfoChange} formTypeSuffix="-editBasic"/>
              </form>
            </TabsContent>
             <TabsContent value="profile" className="mt-0">
              <ProfileSection 
                studentData={editableStudentData}
                onUpdateStudentData={setEditableStudentData}
                isEditable={true} 
                toast={toast}
                onAction={handleFileAction}
              />
            </TabsContent>
            <TabsContent value="academic" className="mt-0">
               <AcademicSection 
                    studentData={editableStudentData} 
                    onUpdateStudentData={setEditableStudentData} 
                    isEditable={true}
                    onAction={handleFileAction} 
                />
            </TabsContent>
            <TabsContent value="study" className="mt-0">
              <StudyMaterialsSection 
                studentData={editableStudentData}
                onUpdateStudentData={setEditableStudentData}
                isEditable={true}
                onAction={handleFileAction}
                availableBooks={availableBooks}
                addAvailableBook={addAvailableBook}
                updateAvailableBook={updateAvailableBook}
                deleteAvailableBook={deleteAvailableBook}
              />
            </TabsContent>
             <TabsContent value="finance" className="mt-0">
              <FinanceSection
                studentData={editableStudentData}
                onUpdateStudentData={setEditableStudentData}
                isEditable={true}
                onAction={handleFileAction}
              />
            </TabsContent>
            <TabsContent value="admin" className="mt-0">
              <AdministrativeSection
                studentData={editableStudentData}
                onUpdateStudentData={setEditableStudentData}
                isEditable={true}
                onAction={handleFileAction}
                addGlobalRequest={addGlobalRequest}
              />
            </TabsContent>
            <TabsContent value="engagement" className="mt-0">
                <EngagementSection
                    studentData={editableStudentData}
                    onUpdateStudentData={setEditableStudentData}
                    isEditable={true}
                    onAction={handleFileAction}
                    addGlobalRequest={addGlobalRequest}
                />
            </TabsContent>
          </ScrollArea>
        </Tabs>
        
        <DialogFooter className="mt-4 pt-4 border-t border-slate-700">
          <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
          <Button type="button" onClick={handleSubmit} className="bg-primary hover:bg-orange-600">Save All Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageStudentDataDialog;