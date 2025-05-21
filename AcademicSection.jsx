import React from 'react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BarChart3, Download, CheckSquare, Percent, CalendarDays, Trash2, PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AcademicSection = ({ studentData, onAction, isEditable, onUpdateStudentData }) => {

  const handleFieldChange = (e, section, field, index, subField) => {
    const { value } = e.target;
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));

    if (section === 'attendance' && field === 'subjects') {
      updatedStudentData.attendance.subjects[index][subField] = subField === 'attended' || subField === 'total' ? parseInt(value) || 0 : value;
    } else if (section === 'examResults' && field === 'semesters') {
      updatedStudentData.examResults.semesters[index][subField] = value;
    } else if (section === 'timetable') {
       updatedStudentData.timetable[index][subField] = value;
    } else if (section === 'subjectRegistration' && field === 'registeredSubjects') {
        updatedStudentData.subjectRegistration.registeredSubjects[index][subField] = value;
    } else if (section === 'subjectRegistration' && field === 'availableElectives') {
        updatedStudentData.subjectRegistration.availableElectives[index][subField] = value;
    }
     else {
      let current = updatedStudentData;
      const parts = `${section}.${field}`.split('.');
      parts.forEach((part, idx) => {
        if (idx === parts.length - 1) {
          current[part] = value;
        } else {
          if (!current[part]) current[part] = {};
          current = current[part];
        }
      });
    }
    onUpdateStudentData(updatedStudentData);
  };
  
  const addArrayItem = (section, field) => {
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));
    if (section === 'attendance' && field === 'subjects') {
        updatedStudentData.attendance.subjects.push({ name: '', attended: 0, total: 0, code: `SUBJ${Date.now()}` });
    } else if (section === 'examResults' && field === 'semesters') {
        updatedStudentData.examResults.semesters.push({ name: '', sgpa: '', marksheetUrl: '' });
    } else if (section === 'timetable') {
        updatedStudentData.timetable.push({ day: 'Monday', time: '', subject: '', faculty: '', room: ''});
    } else if (section === 'subjectRegistration' && field === 'registeredSubjects') {
        updatedStudentData.subjectRegistration.registeredSubjects.push({ id: `NEW_${Date.now()}`, name: '', credits: '' });
    } else if (section === 'subjectRegistration' && field === 'availableElectives') {
        updatedStudentData.subjectRegistration.availableElectives.push({ id: `NEW_ELE_${Date.now()}`, name: '', credits: '' });
    }
    onUpdateStudentData(updatedStudentData);
  };

  const removeArrayItem = (section, field, index) => {
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));
     if (section === 'attendance' && field === 'subjects') {
        updatedStudentData.attendance.subjects.splice(index, 1);
    } else if (section === 'examResults' && field === 'semesters') {
        updatedStudentData.examResults.semesters.splice(index, 1);
    } else if (section === 'timetable') {
        updatedStudentData.timetable.splice(index, 1);
    } else if (section === 'subjectRegistration' && field === 'registeredSubjects') {
        updatedStudentData.subjectRegistration.registeredSubjects.splice(index, 1);
    } else if (section === 'subjectRegistration' && field === 'availableElectives') {
        updatedStudentData.subjectRegistration.availableElectives.splice(index, 1);
    }
    onUpdateStudentData(updatedStudentData);
  };


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
            {isEditable ? (
              <div className="mb-4">
                <Label htmlFor="overallAttendance" className="text-slate-400">Overall Attendance (%)</Label>
                <Input id="overallAttendance" name="attendance.overall" value={studentData.attendance.overall} onChange={(e) => handleFieldChange(e, 'attendance', 'overall')} className="bg-slate-700 border-slate-600 text-slate-200 text-4xl font-bold !h-auto p-1" />
              </div>
            ) : (
              <p className="text-4xl font-bold text-orange-400 mb-2">{studentData.attendance.overall}</p>
            )}
            {!isEditable && <p className="text-sm text-slate-400 mb-4">Overall Attendance</p>}
            
            <div className="space-y-3 mb-4">
              {(studentData.attendance.subjects || []).map((subject, index) => (
                <div key={subject.code || index} className="text-sm p-3 bg-slate-700/60 rounded-md space-y-2">
                  {isEditable ? (
                    <>
                      <Label htmlFor={`subjectName-${index}`}>Subject Name</Label>
                      <Input id={`subjectName-${index}`} value={subject.name} onChange={(e) => handleFieldChange(e, 'attendance', 'subjects', index, 'name')} className="bg-slate-600 border-slate-500" />
                      <Label htmlFor={`subjectCode-${index}`}>Subject Code</Label>
                      <Input id={`subjectCode-${index}`} value={subject.code} onChange={(e) => handleFieldChange(e, 'attendance', 'subjects', index, 'code')} className="bg-slate-600 border-slate-500" />
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label htmlFor={`attended-${index}`}>Attended Classes</Label>
                            <Input id={`attended-${index}`} type="number" value={subject.attended} onChange={(e) => handleFieldChange(e, 'attendance', 'subjects', index, 'attended')} className="bg-slate-600 border-slate-500" />
                        </div>
                        <div>
                            <Label htmlFor={`total-${index}`}>Total Classes</Label>
                            <Input id={`total-${index}`} type="number" value={subject.total} onChange={(e) => handleFieldChange(e, 'attendance', 'subjects', index, 'total')} className="bg-slate-600 border-slate-500" />
                        </div>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => removeArrayItem('attendance', 'subjects', index)} className="mt-1 text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove Subject</Button>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span>{subject.name} ({subject.code})</span>
                        <span className="font-semibold text-orange-300">{(subject.total > 0 ? (subject.attended / subject.total * 100) : 0).toFixed(1)}%</span>
                      </div>
                      <p className="text-xs text-slate-500">Attended: {subject.attended}/{subject.total} classes</p>
                    </>
                  )}
                </div>
              ))}
              {isEditable && (
                  <Button variant="outline" size="sm" onClick={() => addArrayItem('attendance','subjects')} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Subject Attendance
                  </Button>
              )}
            </div>
            {!isEditable && (
                <Button onClick={() => onAction('Download Attendance Summary')} variant="outline" className="w-full border-primary text-primary hover:bg-primary/20">
                <Download className="mr-2 h-4 w-4" /> Download Summary
                </Button>
            )}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="results" className="mt-4">
          <DashboardCard icon={BarChart3} title="Exam Results & Grades">
            {isEditable ? (
                <div className="mb-4">
                    <Label htmlFor="overallCgpa">Overall CGPA</Label>
                    <Input id="overallCgpa" name="examResults.cgpa" value={studentData.examResults.cgpa} onChange={(e) => handleFieldChange(e, 'examResults', 'cgpa')} className="bg-slate-700 border-slate-600 text-slate-200 text-2xl font-bold !h-auto p-1" />
                </div>
            ) : (
                 <p className="text-slate-400 mb-1">Overall CGPA: <span className="text-2xl font-bold text-orange-400">{studentData.examResults.cgpa}</span></p>
            )}
            <div className="space-y-3 my-4">
              {(studentData.examResults.semesters || []).map((sem, index) => (
                <div key={sem.name || index} className="p-3 bg-slate-700/60 rounded-md space-y-2">
                  {isEditable ? (
                    <>
                      <Label htmlFor={`semName-${index}`}>Semester Name</Label>
                      <Input id={`semName-${index}`} value={sem.name} onChange={(e) => handleFieldChange(e, 'examResults', 'semesters', index, 'name')} className="bg-slate-600 border-slate-500" />
                      <Label htmlFor={`semSgpa-${index}`}>SGPA</Label>
                      <Input id={`semSgpa-${index}`} value={sem.sgpa} onChange={(e) => handleFieldChange(e, 'examResults', 'semesters', index, 'sgpa')} className="bg-slate-600 border-slate-500" />
                      <Label htmlFor={`semMarksheetUrl-${index}`}>Marksheet URL</Label>
                      <Input id={`semMarksheetUrl-${index}`} value={sem.marksheetUrl} onChange={(e) => handleFieldChange(e, 'examResults', 'semesters', index, 'marksheetUrl')} placeholder="Paste URL to PDF/Image" className="bg-slate-600 border-slate-500" />
                      <Button variant="destructive" size="sm" onClick={() => removeArrayItem('examResults','semesters',index)} className="mt-1 text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove Semester</Button>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-orange-300">{sem.name}</h4>
                        <span className="text-lg font-bold text-orange-300">{sem.sgpa} SGPA</span>
                      </div>
                      <Button onClick={() => onAction('Download Marksheet', sem)} variant="link" className="text-orange-400 hover:text-orange-200 p-0 h-auto mt-1">
                        <Download className="mr-1 h-3 w-3" /> Download Marksheet
                      </Button>
                    </>
                  )}
                </div>
              ))}
              {isEditable && (
                  <Button variant="outline" size="sm" onClick={() => addArrayItem('examResults','semesters')} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Semester Result
                  </Button>
              )}
            </div>
          </DashboardCard>
        </TabsContent>

        <TabsContent value="timetable" className="mt-4">
           <DashboardCard icon={CalendarDays} title="Class Timetable">
            <div className="space-y-3 text-sm">
              {(studentData.timetable || []).map((item, index) => (
                <div key={index} className="p-2.5 bg-slate-700/60 rounded-md space-y-1.5">
                  {isEditable ? (
                    <>
                        <Label htmlFor={`ttDay-${index}`}>Day</Label>
                        <Input id={`ttDay-${index}`} value={item.day} onChange={(e) => handleFieldChange(e, 'timetable', null, index, 'day')} className="bg-slate-600 border-slate-500"/>
                        <Label htmlFor={`ttTime-${index}`}>Time (e.g., 09:00 - 11:00)</Label>
                        <Input id={`ttTime-${index}`} value={item.time} onChange={(e) => handleFieldChange(e, 'timetable', null, index, 'time')} className="bg-slate-600 border-slate-500"/>
                        <Label htmlFor={`ttSubject-${index}`}>Subject</Label>
                        <Input id={`ttSubject-${index}`} value={item.subject} onChange={(e) => handleFieldChange(e, 'timetable', null, index, 'subject')} className="bg-slate-600 border-slate-500"/>
                        <Label htmlFor={`ttFaculty-${index}`}>Faculty</Label>
                        <Input id={`ttFaculty-${index}`} value={item.faculty} onChange={(e) => handleFieldChange(e, 'timetable', null, index, 'faculty')} className="bg-slate-600 border-slate-500"/>
                        <Label htmlFor={`ttRoom-${index}`}>Room</Label>
                        <Input id={`ttRoom-${index}`} value={item.room} onChange={(e) => handleFieldChange(e, 'timetable', null, index, 'room')} className="bg-slate-600 border-slate-500"/>
                        <Button variant="destructive" size="sm" onClick={() => removeArrayItem('timetable', null, index)} className="mt-1 text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove Entry</Button>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-orange-300">{item.day}: {item.time}</p>
                      <p>{item.subject}</p>
                      <p className="text-xs text-slate-400">Faculty: {item.faculty} | Room: {item.room}</p>
                    </>
                  )}
                </div>
              ))}
              {isEditable && (
                  <Button variant="outline" size="sm" onClick={() => addArrayItem('timetable',null)} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Timetable Entry
                  </Button>
              )}
            </div>
             {!isEditable && (
                <Button onClick={() => onAction('View Full Timetable')} variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary/20">
                View Full Weekly Timetable
                </Button>
             )}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="registration" className="mt-4">
          <DashboardCard icon={CheckSquare} title="Subject Registration">
            <h4 className="text-md font-semibold text-orange-400 mb-2">Registered Subjects:</h4>
            {(studentData.subjectRegistration.registeredSubjects || []).map((sub, index) => (
                 <div key={sub.id || index} className="p-2.5 bg-slate-700/60 rounded-md mb-2 space-y-1.5">
                    {isEditable ? (
                        <>
                            <Label htmlFor={`regSubName-${index}`}>Subject Name</Label>
                            <Input id={`regSubName-${index}`} value={sub.name} onChange={(e) => handleFieldChange(e, 'subjectRegistration', 'registeredSubjects', index, 'name')} className="bg-slate-600 border-slate-500"/>
                            <Label htmlFor={`regSubCredits-${index}`}>Credits</Label>
                            <Input id={`regSubCredits-${index}`} type="number" value={sub.credits} onChange={(e) => handleFieldChange(e, 'subjectRegistration', 'registeredSubjects', index, 'credits')} className="bg-slate-600 border-slate-500"/>
                            <Button variant="destructive" size="sm" onClick={() => removeArrayItem('subjectRegistration','registeredSubjects',index)} className="mt-1 text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove Subject</Button>
                        </>
                    ) : (
                         <p>{sub.name} ({sub.credits} credits)</p>
                    )}
                 </div>
            ))}
            {isEditable && (
                <Button variant="outline" size="sm" onClick={() => addArrayItem('subjectRegistration','registeredSubjects')} className="w-full border-primary text-primary hover:bg-primary/20 mb-4">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Registered Subject
                </Button>
            )}
            {studentData.subjectRegistration.registeredSubjects && studentData.subjectRegistration.registeredSubjects.length === 0 && !isEditable && <p className="text-slate-400 mb-4">No subjects registered for next semester yet.</p>}
            
            <h4 className="text-md font-semibold text-orange-400 mb-2 mt-4">Available Electives:</h4>
            {(studentData.subjectRegistration.availableElectives || []).map((ele, index) => (
              <div key={ele.id || index} className="flex justify-between items-start p-2.5 bg-slate-700/60 rounded-md mb-2 space-y-1.5">
                {isEditable ? (
                    <div className="w-full space-y-1.5">
                        <Label htmlFor={`eleName-${index}`}>Elective Name</Label>
                        <Input id={`eleName-${index}`} value={ele.name} onChange={(e) => handleFieldChange(e, 'subjectRegistration', 'availableElectives', index, 'name')} className="bg-slate-600 border-slate-500"/>
                        <Label htmlFor={`eleCredits-${index}`}>Credits</Label>
                        <Input id={`eleCredits-${index}`} type="number" value={ele.credits} onChange={(e) => handleFieldChange(e, 'subjectRegistration', 'availableElectives', index, 'credits')} className="bg-slate-600 border-slate-500"/>
                        <Button variant="destructive" size="sm" onClick={() => removeArrayItem('subjectRegistration','availableElectives',index)} className="mt-1 text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove Elective</Button>
                    </div>
                ): (
                    <>
                        <div>
                            <p>{ele.name}</p>
                            <p className="text-xs text-slate-400">{ele.credits} credits</p>
                        </div>
                        <Button onClick={() => onAction('Register Elective', ele)} size="sm" className="bg-primary hover:bg-orange-600">Register</Button>
                    </>
                )}
              </div>
            ))}
             {isEditable && (
                <Button variant="outline" size="sm" onClick={() => addArrayItem('subjectRegistration','availableElectives')} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Available Elective
                </Button>
            )}
            {studentData.subjectRegistration.availableElectives && studentData.subjectRegistration.availableElectives.length === 0 && !isEditable && <p className="text-slate-400">No electives available for registration at this time.</p>}
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicSection;
