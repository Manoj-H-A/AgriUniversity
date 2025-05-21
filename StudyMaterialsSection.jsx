import React, { useState } from 'react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, FileText, ClipboardCheck, Library, Download, Upload, Search, Trash2, PlusCircle, BookMarked, Edit } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';

const StudyMaterialsSection = ({ studentData, onAction, isEditable, onUpdateStudentData, availableBooks: globalAvailableBooks, addAvailableBook, updateAvailableBook, deleteAvailableBook }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', totalCopies: 1, availableCopies: 1 });
  const [editingBook, setEditingBook] = useState(null);

  const handleFieldChange = (e, section, field, index, subField) => {
    const { value, type, files } = e.target;
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));

    if (section === 'studyResources' && index !== undefined) {
      updatedStudentData.studyResources[index][field] = value;
    } else if (section === 'assignments' && index !== undefined) {
      if (field === 'submissionFile' && files && files[0]) {
        updatedStudentData.assignments[index].submissionUrl = `simulated/path/to/${files[0].name}`; 
        onAction('Upload Assignment File', { file: files[0], studentUsn: studentData.usn, assignId: updatedStudentData.assignments[index].id });
      } else {
        updatedStudentData.assignments[index][field] = value;
      }
    } else if (section === 'library' && field === 'issuedBooks' && index !== undefined) {
      updatedStudentData.library.issuedBooks[index][subField] = subField === 'fine' ? parseFloat(value) || 0 : value;
    }
    onUpdateStudentData(updatedStudentData);
  };

  const addArrayItem = (section, field) => {
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));
    if (section === 'studyResources') {
      updatedStudentData.studyResources.push({ id: `RES_${Date.now()}`, type: 'Notes', title: '', url: '' });
    } else if (section === 'assignments') {
      updatedStudentData.assignments.push({ id: `ASGN_${Date.now()}`, title: '', subject: '', dueDate: '', status: 'Pending', marks: '', url: '', submissionUrl: '' });
    } else if (section === 'library' && field === 'issuedBooks') {
      updatedStudentData.library.issuedBooks.push({ id: `BOOK_${Date.now()}`, title: '', author: '', issueDate: '', dueDate: '', fine: 0 });
    }
    onUpdateStudentData(updatedStudentData);
  };

  const removeArrayItem = (section, field, index) => {
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));
    if (section === 'studyResources') {
      updatedStudentData.studyResources.splice(index, 1);
    } else if (section === 'assignments') {
      updatedStudentData.assignments.splice(index, 1);
    } else if (section === 'library' && field === 'issuedBooks') {
      updatedStudentData.library.issuedBooks.splice(index, 1);
    }
    onUpdateStudentData(updatedStudentData);
  };

  const handleBookSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      toast({ title: "Search", description: "Please enter a book title or author.", variant: "destructive" });
      return;
    }
    const results = globalAvailableBooks.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    if (results.length === 0) {
      toast({ title: "No Results", description: "No books found matching your search.", duration: 3000 });
    }
  };

  const handleNewBookChange = (e) => {
    const { name, value, type } = e.target;
    setNewBook(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) : value }));
  };

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.isbn) {
        toast({ title: "Error", description: "Title, Author, and ISBN are required.", variant: "destructive" });
        return;
    }
    addAvailableBook(newBook);
    setNewBook({ title: '', author: '', isbn: '', totalCopies: 1, availableCopies: 1 });
  };
  
  const handleEditBookChange = (e) => {
    const { name, value, type } = e.target;
    setEditingBook(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) : value }));
  };

  const handleUpdateBook = () => {
    if (!editingBook.title || !editingBook.author || !editingBook.isbn) {
        toast({ title: "Error", description: "Title, Author, and ISBN are required.", variant: "destructive" });
        return;
    }
    updateAvailableBook(editingBook);
    setEditingBook(null);
  };


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
            {studentData.studyResources.map((res, index) => (
              <div key={res.id} className="p-2.5 bg-slate-700/60 rounded-md mb-2 space-y-2">
                {isEditable ? (
                  <>
                    <Label htmlFor={`resTitle-${index}`}>Title</Label>
                    <Input id={`resTitle-${index}`} value={res.title} onChange={(e) => handleFieldChange(e, 'studyResources', 'title', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`resType-${index}`}>Type (e.g., Notes, Presentation)</Label>
                    <Input id={`resType-${index}`} value={res.type} onChange={(e) => handleFieldChange(e, 'studyResources', 'type', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`resUrl-${index}`}>URL (Link to file/resource)</Label>
                    <Input id={`resUrl-${index}`} value={res.url} onChange={(e) => handleFieldChange(e, 'studyResources', 'url', index)} placeholder="Paste URL to PDF/Doc" className="bg-slate-600 border-slate-500"/>
                    <Button variant="destructive" size="sm" onClick={() => removeArrayItem('studyResources', null, index)} className="text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove Resource</Button>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{res.title}</p>
                      <p className="text-xs text-orange-400">{res.type}</p>
                    </div>
                    <Button onClick={() => onAction('Download Resource', res)} variant="ghost" size="sm" className="text-orange-300 hover:text-orange-100">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {isEditable && (
              <Button variant="outline" size="sm" onClick={() => addArrayItem('studyResources', null)} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Study Resource
              </Button>
            )}
            {studentData.studyResources.length === 0 && !isEditable && <p className="text-slate-400">No study resources available yet.</p>}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="assignments" className="mt-4">
          <DashboardCard icon={ClipboardCheck} title="Assignments">
            {studentData.assignments.map((assign, index) => (
              <div key={assign.id} className="p-3 bg-slate-700/60 rounded-md mb-2.5 space-y-2">
                {isEditable ? (
                   <>
                    <Label htmlFor={`assignTitle-${index}`}>Title</Label>
                    <Input id={`assignTitle-${index}`} value={assign.title} onChange={(e) => handleFieldChange(e, 'assignments', 'title', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`assignSubject-${index}`}>Subject</Label>
                    <Input id={`assignSubject-${index}`} value={assign.subject} onChange={(e) => handleFieldChange(e, 'assignments', 'subject', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`assignDueDate-${index}`}>Due Date</Label>
                    <Input id={`assignDueDate-${index}`} type="date" value={assign.dueDate} onChange={(e) => handleFieldChange(e, 'assignments', 'dueDate', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`assignStatus-${index}`}>Status</Label>
                    <Input id={`assignStatus-${index}`} value={assign.status} onChange={(e) => handleFieldChange(e, 'assignments', 'status', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`assignMarks-${index}`}>Marks (e.g., 18/20)</Label>
                    <Input id={`assignMarks-${index}`} value={assign.marks} onChange={(e) => handleFieldChange(e, 'assignments', 'marks', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`assignSubmissionUrl-${index}`}>Submission URL (Staff: Link to student's file)</Label>
                    <Input id={`assignSubmissionUrl-${index}`} value={assign.submissionUrl || ''} onChange={(e) => handleFieldChange(e, 'assignments', 'submissionUrl', index)} placeholder="Staff: Paste URL to student's submission" className="bg-slate-600 border-slate-500"/>
                    <Button variant="destructive" size="sm" onClick={() => removeArrayItem('assignments', null, index)} className="text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove Assignment</Button>
                   </>
                ) : (
                  <>
                    <h4 className="font-semibold text-orange-300">{assign.title}</h4>
                    <p className="text-sm text-slate-400">Subject: {assign.subject} | Due: {assign.dueDate}</p>
                    <p className={`text-sm font-medium ${assign.status === 'Submitted' ? 'text-green-400' : 'text-yellow-400'}`}>
                      Status: {assign.status} {assign.marks && `| Marks: ${assign.marks}`}
                    </p>
                    {assign.submissionUrl && <a href={assign.submissionUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-400 hover:underline">View Submission</a>}
                    {assign.status === 'Pending' && (
                      <div className="mt-2">
                        <Label htmlFor={`assignFile-${index}`} className="text-xs text-slate-400">Upload PDF/Image:</Label>
                        <Input id={`assignFile-${index}`} type="file" accept=".pdf,image/*" onChange={(e) => handleFieldChange(e, 'assignments', 'submissionFile', index)} className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 w-full mt-1"/>
                        <Button onClick={() => onAction('Submit Assignment', assign)} size="sm" className="mt-2 bg-primary hover:bg-orange-600">
                          <Upload className="mr-2 h-4 w-4" /> Submit
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            {isEditable && (
              <Button variant="outline" size="sm" onClick={() => addArrayItem('assignments', null)} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Assignment
              </Button>
            )}
            {studentData.assignments.length === 0 && !isEditable && <p className="text-slate-400">No assignments posted yet.</p>}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="library" className="mt-4">
          <DashboardCard icon={Library} title="Library Access">
            {!isEditable && (
              <>
                <div className="flex gap-2 mb-4">
                  <Input 
                    type="text" 
                    placeholder="Search books by title or author..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-700 border-slate-600"
                  />
                  <Button onClick={handleBookSearch} className="bg-primary hover:bg-orange-600"><Search className="mr-2 h-4 w-4"/>Search</Button>
                </div>
                {searchResults.length > 0 && (
                  <div className="mb-4 p-3 bg-slate-700/30 rounded-md">
                    <h5 className="text-sm font-semibold text-orange-300 mb-1">Search Results:</h5>
                    {searchResults.map(book => (
                      <div key={book.id} className="text-xs p-1.5 border-b border-slate-600 last:border-b-0">
                        <p className="font-medium">{book.title} <span className="text-slate-400">by {book.author}</span></p>
                        <p className={book.availableCopies > 0 ? 'text-green-400' : 'text-red-400'}>
                          {book.availableCopies > 0 ? `${book.availableCopies} copies available` : 'Not Available'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {searchResults.length === 0 && searchTerm && <p className="text-xs text-slate-400 mb-3">No books found for "{searchTerm}".</p>}
              </>
            )}

            <h4 className="text-md font-semibold text-orange-400 mb-2">
              {isEditable ? "Manage Student's Issued Books:" : "Your Issued Books:"}
            </h4>
            {studentData.library.issuedBooks.map((book, index) => (
              <div key={book.id} className="p-2.5 bg-slate-700/60 rounded-md mb-2 space-y-2">
                {isEditable ? (
                  <>
                    <Label htmlFor={`bookTitle-${index}`}>Book Title</Label>
                    <Input id={`bookTitle-${index}`} value={book.title} onChange={(e) => handleFieldChange(e, 'library', 'issuedBooks', index, 'title')} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`bookAuthor-${index}`}>Author</Label>
                    <Input id={`bookAuthor-${index}`} value={book.author} onChange={(e) => handleFieldChange(e, 'library', 'issuedBooks', index, 'author')} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`bookIssueDate-${index}`}>Issue Date</Label>
                    <Input id={`bookIssueDate-${index}`} type="date" value={book.issueDate} onChange={(e) => handleFieldChange(e, 'library', 'issuedBooks', index, 'issueDate')} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`bookDueDate-${index}`}>Due Date</Label>
                    <Input id={`bookDueDate-${index}`} type="date" value={book.dueDate} onChange={(e) => handleFieldChange(e, 'library', 'issuedBooks', index, 'dueDate')} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`bookFine-${index}`}>Fine (₹)</Label>
                    <Input id={`bookFine-${index}`} type="number" value={book.fine} onChange={(e) => handleFieldChange(e, 'library', 'issuedBooks', index, 'fine')} className="bg-slate-600 border-slate-500"/>
                    <Button variant="destructive" size="sm" onClick={() => removeArrayItem('library', 'issuedBooks', index)} className="text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove Book</Button>
                  </>
                ) : (
                  <>
                    <p className="font-medium">{book.title} <span className="text-xs text-slate-400">by {book.author}</span></p>
                    <p className="text-sm">Issued: {book.issueDate} | Due: {book.dueDate}</p>
                    {book.fine > 0 && <p className="text-sm text-red-400">Fine: ₹{book.fine.toLocaleString('en-IN')}</p>}
                  </>
                )}
              </div>
            ))}
             {isEditable && (
              <Button variant="outline" size="sm" onClick={() => addArrayItem('library', 'issuedBooks')} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Issued Book to Student
              </Button>
            )}
            {studentData.library.issuedBooks.length === 0 && !isEditable && <p className="text-slate-400 mb-3">No books currently issued.</p>}
            
            {!isEditable && studentData.library.issuedBooks.some(b => b.fine > 0) && (
                <Button onClick={() => onAction('Pay Library Fine')} className="w-full mt-4 bg-red-600 hover:bg-red-700">Pay Late Fees</Button>
            )}

            {isEditable && (
              <div className="mt-6 pt-4 border-t border-slate-600">
                <h4 className="text-md font-semibold text-orange-400 mb-2">Manage Global Available Books:</h4>
                {globalAvailableBooks.map(book => (
                  <div key={book.id} className="p-2.5 bg-slate-600/50 rounded-md mb-2 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{book.title} <span className="text-xs text-slate-400">by {book.author}</span></p>
                      <p className="text-xs">ISBN: {book.isbn} | Copies: {book.availableCopies}/{book.totalCopies}</p>
                    </div>
                    <div className="space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => setEditingBook(book)} className="text-blue-400 hover:text-blue-300"><Edit className="h-3 w-3"/></Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteAvailableBook(book.id)} className="text-red-400 hover:text-red-300"><Trash2 className="h-3 w-3"/></Button>
                    </div>
                  </div>
                ))}
                {editingBook && (
                    <div className="p-3 bg-slate-500/30 rounded-md mt-2 space-y-2">
                        <h5 className="text-sm font-semibold">Editing: {editingBook.title}</h5>
                        <Input name="title" value={editingBook.title} onChange={handleEditBookChange} placeholder="Title" className="bg-slate-600 border-slate-500 text-xs"/>
                        <Input name="author" value={editingBook.author} onChange={handleEditBookChange} placeholder="Author" className="bg-slate-600 border-slate-500 text-xs"/>
                        <Input name="isbn" value={editingBook.isbn} onChange={handleEditBookChange} placeholder="ISBN" className="bg-slate-600 border-slate-500 text-xs"/>
                        <Input name="totalCopies" type="number" value={editingBook.totalCopies} onChange={handleEditBookChange} placeholder="Total Copies" className="bg-slate-600 border-slate-500 text-xs"/>
                        <Input name="availableCopies" type="number" value={editingBook.availableCopies} onChange={handleEditBookChange} placeholder="Available Copies" className="bg-slate-600 border-slate-500 text-xs"/>
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleUpdateBook} className="text-xs">Save</Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingBook(null)} className="text-xs">Cancel</Button>
                        </div>
                    </div>
                )}
                <div className="mt-3 p-3 bg-slate-500/30 rounded-md space-y-2">
                    <h5 className="text-sm font-semibold">Add New Book to Library:</h5>
                    <Input name="title" value={newBook.title} onChange={handleNewBookChange} placeholder="Title" className="bg-slate-600 border-slate-500 text-xs"/>
                    <Input name="author" value={newBook.author} onChange={handleNewBookChange} placeholder="Author" className="bg-slate-600 border-slate-500 text-xs"/>
                    <Input name="isbn" value={newBook.isbn} onChange={handleNewBookChange} placeholder="ISBN" className="bg-slate-600 border-slate-500 text-xs"/>
                    <Input name="totalCopies" type="number" value={newBook.totalCopies} onChange={handleNewBookChange} placeholder="Total Copies" className="bg-slate-600 border-slate-500 text-xs"/>
                    <Input name="availableCopies" type="number" value={newBook.availableCopies} onChange={handleNewBookChange} placeholder="Available Copies" className="bg-slate-600 border-slate-500 text-xs"/>
                    <Button size="sm" onClick={handleAddBook} className="w-full text-xs"><BookMarked className="mr-1 h-3 w-3"/>Add Book to Global List</Button>
                </div>
              </div>
            )}
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyMaterialsSection;