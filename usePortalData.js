import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { 
  initialCollegeStaffCredentials, 
  initialStudentsData, 
  defaultStudentStructure,
  initialGlobalRequests,
  initialAvailableBooks
} from '@/lib/initialData';

export const usePortalData = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);

  const [allStudentsData, setAllStudentsData] = useState(() => {
    const storedData = localStorage.getItem('allStudentsData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData.map(student => ({ ...defaultStudentStructure, ...student }));
    }
    return initialStudentsData.map(student => ({ ...defaultStudentStructure, ...student }));
  });

  const [collegeStaffCredentials, setCollegeStaffCredentials] = useState(() => {
    const storedCreds = localStorage.getItem('collegeStaffCredentials');
    return storedCreds ? JSON.parse(storedCreds) : initialCollegeStaffCredentials;
  });

  const [globalRequests, setGlobalRequests] = useState(() => {
    const storedRequests = localStorage.getItem('globalRequests');
    return storedRequests ? JSON.parse(storedRequests) : initialGlobalRequests;
  });

  const [availableBooks, setAvailableBooks] = useState(() => {
    const storedBooks = localStorage.getItem('availableBooks');
    return storedBooks ? JSON.parse(storedBooks) : initialAvailableBooks;
  });

  useEffect(() => {
    localStorage.setItem('allStudentsData', JSON.stringify(allStudentsData));
  }, [allStudentsData]);

  useEffect(() => {
    localStorage.setItem('collegeStaffCredentials', JSON.stringify(collegeStaffCredentials));
  }, [collegeStaffCredentials]);

  useEffect(() => {
    localStorage.setItem('globalRequests', JSON.stringify(globalRequests));
  }, [globalRequests]);
  
  useEffect(() => {
    localStorage.setItem('availableBooks', JSON.stringify(availableBooks));
  }, [availableBooks]);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedUserType = localStorage.getItem('userType');
    if (storedUser && storedUserType) {
      setCurrentUser(JSON.parse(storedUser));
      setUserType(storedUserType);
    }
  }, []);

  const handleLogin = useCallback((loginData) => {
    if (!loginData.username || !loginData.password) {
      toast({ title: "Login Error", description: "Please enter both username and password.", variant: "destructive", duration: 3000 });
      return;
    }

    const staff = collegeStaffCredentials;
    if (loginData.username === staff.username && loginData.password === staff.password) {
      toast({ title: "Staff Login Successful", description: `Welcome back, ${staff.username}!`, duration: 3000 });
      localStorage.setItem('currentUser', JSON.stringify({ username: staff.username }));
      localStorage.setItem('userType', 'staff');
      setCurrentUser({ username: staff.username });
      setUserType('staff');
      navigate('/college-dashboard');
      return;
    }

    const student = allStudentsData.find(s => (s.usn === loginData.username || s.name === loginData.username) && s.password === loginData.password);
    if (student) {
      toast({ title: "Student Login Successful", description: `Welcome back, ${student.name}!`, duration: 3000 });
      localStorage.setItem('currentUser', JSON.stringify({ usn: student.usn, name: student.name }));
      localStorage.setItem('userType', 'student');
      setCurrentUser({ usn: student.usn, name: student.name });
      setUserType('student');
      navigate('/dashboard');
      return;
    }

    toast({ title: "Login Failed", description: "Invalid credentials. Please try again.", variant: "destructive", duration: 3000 });
  }, [collegeStaffCredentials, allStudentsData, toast, navigate]);

  const handleLogout = useCallback(() => {
    toast({ title: "Logged Out", description: "You have been successfully logged out.", duration: 3000 });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
    setCurrentUser(null);
    setUserType(null);
    navigate('/');
  }, [toast, navigate]);

  const updateStudentDataInSystem = useCallback((updatedStudent) => {
    setAllStudentsData(prevStudents =>
      prevStudents.map(student => student.usn === updatedStudent.usn ? { ...defaultStudentStructure, ...student, ...updatedStudent } : student)
    );
  }, []);

  const addStudentToSystem = useCallback((newStudentData) => {
    const studentExists = allStudentsData.some(s => s.usn === newStudentData.usn);
    if (studentExists) {
      toast({ title: "Error", description: `Student with USN ${newStudentData.usn} already exists.`, variant: "destructive", duration: 3000 });
      return false;
    }
    const completeNewStudent = { ...defaultStudentStructure, ...newStudentData };
    setAllStudentsData(prevStudents => [...prevStudents, completeNewStudent]);
    toast({ title: "Success", description: `Student ${newStudentData.name} added successfully.`, duration: 3000 });
    return true;
  }, [allStudentsData, toast]);

  const addGlobalRequest = useCallback((requestData) => {
    const newRequest = {
      requestId: `REQ_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      ...requestData,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setGlobalRequests(prev => [...prev, newRequest]);
    toast({ title: "Request Submitted", description: `${requestData.type || 'Your request'} has been submitted.`, duration: 3000 });
  }, [toast]);

  const updateGlobalRequestStatus = useCallback((requestId, newStatus, staffNotes = '') => {
    setGlobalRequests(prevReqs => prevReqs.map(req => 
      req.requestId === requestId ? { ...req, status: newStatus, staffNotes } : req
    ));
    toast({ title: "Request Updated", description: `Request ${requestId} status changed to ${newStatus}.`, duration: 3000 });
  }, [toast]);
  
  const addAvailableBook = useCallback((bookData) => {
    const bookExists = availableBooks.some(b => b.isbn === bookData.isbn);
    if (bookExists && bookData.isbn) {
        toast({ title: "Error", description: `Book with ISBN ${bookData.isbn} already exists.`, variant: "destructive" });
        return false;
    }
    const newBook = { id: `LIB_${Date.now()}`, ...bookData };
    setAvailableBooks(prev => [...prev, newBook]);
    toast({ title: "Book Added", description: `${bookData.title} added to library.` });
    return true;
  }, [availableBooks, toast]);

  const updateAvailableBook = useCallback((updatedBook) => {
    setAvailableBooks(prev => prev.map(book => book.id === updatedBook.id ? updatedBook : book));
    toast({ title: "Book Updated", description: `${updatedBook.title} details updated.` });
  }, [toast]);

  const deleteAvailableBook = useCallback((bookId) => {
    setAvailableBooks(prev => prev.filter(book => book.id !== bookId));
    toast({ title: "Book Deleted", description: `Book removed from library.`, variant: "destructive" });
  }, [toast]);


  return {
    currentUser,
    userType,
    allStudentsData,
    setAllStudentsData,
    collegeStaffCredentials,
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
  };
};