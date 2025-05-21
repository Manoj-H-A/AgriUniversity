import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import AddStudentFormFields from './AddStudentFormFields';

const AddStudentDialog = ({ isOpen, onOpenChange, addStudentToSystem, defaultStudentStructure }) => {
  const { toast } = useToast();
  const [newStudentData, setNewStudentData] = useState(defaultStudentStructure);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudentData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudentData.usn || !newStudentData.name || !newStudentData.password) {
        toast({ title: "Error", description: "USN, Name, and Password are required.", variant: "destructive" });
        return;
    }
    const success = addStudentToSystem(newStudentData);
    if (success) {
      setNewStudentData(defaultStudentStructure); 
      onOpenChange(false); 
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { onOpenChange(open); if (!open) setNewStudentData(defaultStudentStructure); }}>
      <DialogContent className="sm:max-w-[625px] bg-slate-800 border-secondary text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-primary">Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddStudentSubmit} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto px-2">
          <AddStudentFormFields formData={newStudentData} handleInputChange={handleInputChange} formTypeSuffix="-new"/>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
            <Button type="submit" className="bg-primary hover:bg-orange-600">Add Student</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentDialog;
