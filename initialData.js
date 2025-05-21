export const initialCollegeStaffCredentials = {
  username: 'admin',
  password: 'adminpassword',
};

export const defaultStudentStructure = {
  usn: '', name: '', password: '', cgpa: '0.0', yearOfAdmission: '', program: '', year: '', email: '', phone: '', address: '',
  profileImageUrl: '',
  attendance: { 
    overall: '0%', 
    subjects: [], 
    summaryUrl: '' 
  },
  examResults: { 
    semesters: [], 
    cgpa: '0.0' 
  },
  timetable: [],
  subjectRegistration: { 
    availableElectives: [], 
    registeredSubjects: [] 
  },
  studyResources: [],
  assignments: [],
  library: { 
    issuedBooks: [],
    availableBooks: [],
    searchUrl: '#', 
    payFineUrl: '#' 
  },
  fees: { 
    total: 0, paid: 0, due: 0, dueDate: '', 
    receipts: [], 
    paymentLink: '#' 
  },
  scholarships: [],
  certificates: [],
  notices: [],
  leaveApplications: [],
  eventRegistrations: [],
  feedbackForms: [],
  pendingRequests: []
};

export const initialStudentsData = [
  {
    ...defaultStudentStructure, 
    usn: 'UASD001',
    name: 'Alice Smith',
    password: 'password1',
    cgpa: '8.5',
    yearOfAdmission: '2022',
    program: 'B.Sc. (Hons.) Agriculture',
    year: '3rd Year',
    email: 'alice.smith@uasd.in',
    phone: '+91-9876543210',
    address: 'UAS Campus, Krishinagar, Dharwad, Karnataka - 580005',
    profileImageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    attendance: {
      overall: '92%',
      subjects: [
        { name: 'Soil Science & Agri. Chemistry', attended: 28, total: 30, code: 'SAC201' },
        { name: 'Agronomy of Field Crops', attended: 25, total: 28, code: 'AGR202' },
      ],
      summaryUrl: '#'
    },
    examResults: {
      semesters: [{ name: 'Semester 1', sgpa: 8.5, marksheetUrl: '#' }],
      cgpa: '8.5'
    },
     timetable: [
      { day: 'Monday', time: '09:00 - 11:00', subject: 'Soil Science & Agri. Chemistry', faculty: 'Dr. Ramesh K.', room: 'A101' },
      { day: 'Tuesday', time: '11:00 - 13:00', subject: 'Agronomy of Field Crops', faculty: 'Prof. Suresh M.', room: 'B203' },
    ],
    library: {
      ...defaultStudentStructure.library,
      availableBooks: [
        { id: 'LIB001', title: 'Principles of Agronomy', author: 'S. R. Reddy', availableCopies: 5, totalCopies: 5 },
        { id: 'LIB002', title: 'Soil Science: An Introduction', author: 'M. S. Verma', availableCopies: 3, totalCopies: 3 },
      ],
      issuedBooks: [
        { id: 'BOOK_ALICE_001', title: 'Soil Chemistry', author: 'Kim H. Tan', issueDate: '2025-05-01', dueDate: '2025-06-01', fine: 0 }
      ]
    },
    fees: { 
      ...defaultStudentStructure.fees,
      total: 75000, paid: 60000, due: 15000, dueDate: '2025-07-30', 
      receipts: [{ id: 'receipt001', date: '2024-12-15', amount: 30000, url: '#', fileUrl: 'path/to/receipt1.pdf' }]
    },
    certificates: [
      { id: 'cert001', type: 'Study Certificate', status: 'Not Requested', fileUrl: '', downloadUrl: '' },
      { id: 'cert002', type: 'Bonafide Certificate', status: 'Issued', downloadUrl: '#', fileUrl: 'path/to/bonafide.pdf' },
    ],
    assignments: [
        { id: 'assign001', title: 'Soil Report', subject: 'Soil Science', dueDate: '2025-06-15', status: 'Submitted', marks: '18/20', url: '#', submissionUrl: 'path/to/soilreport_alice.pdf' }
    ],
  }
];

export const initialGlobalRequests = [];
export const initialAvailableBooks = [
    { id: 'LIB001', title: 'Principles of Agronomy', author: 'S. R. Reddy', availableCopies: 5, totalCopies: 5, isbn: '978-0000000001' },
    { id: 'LIB002', title: 'Soil Science: An Introduction', author: 'M. S. Verma', availableCopies: 3, totalCopies: 3, isbn: '978-0000000002' },
    { id: 'LIB003', title: 'Plant Pathology', author: 'George N. Agrios', availableCopies: 7, totalCopies: 7, isbn: '978-0000000003' },
];


export const services = [
  { id: 'library', title: 'Library & E-Resources', description: 'Access a vast collection of books, journals, and digital resources.', details: 'The University Library offers an extensive collection of books and online resources.' },
  { id: 'career-counseling', title: 'Career Counseling', description: 'Guidance for your future career path.', details: 'Our Career Counseling service provides personalized guidance to help you explore career options.' },
  { id: 'academic-support', title: 'Academic Support', description: 'Tutoring and resources to help you succeed.', details: 'The Academic Support Center offers peer tutoring and workshops.' },
];

export const events = [
  { id: 'agritech-symposium', title: 'AgriTech Symposium', date: '2025-08-15', description: 'Latest in agricultural technology.', details: 'The Annual AgriTech Symposium discusses innovations in agricultural technology.' },
  { id: 'farmers-market-expo', title: 'Farmers Market', date: '2025-09-05', description: 'Local produce and farming techniques.', details: 'Our annual Farmers Market celebrates local agriculture.' },
];