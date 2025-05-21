import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Eye, Trash2 } from 'lucide-react';

const StudentListTable = ({ students, onManageData, onDeleteStudent }) => {
  return (
    <Card className="bg-slate-800/70 border-secondary/60">
      <CardHeader>
        <CardTitle className="text-primary flex items-center"><Users className="mr-2"/> Student List</CardTitle>
      </CardHeader>
      <CardContent>
        {students.length === 0 ? (
          <p className="text-slate-400 text-center py-4">No students found matching your search or no students added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-300">
              <thead className="text-xs text-orange-400 uppercase bg-slate-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3">USN</th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Program</th>
                  <th scope="col" className="px-6 py-3">CGPA</th>
                  <th scope="col" className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.usn} className="border-b border-slate-700 hover:bg-slate-700/30">
                    <td className="px-6 py-4 font-medium">{student.usn}</td>
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.program}</td>
                    <td className="px-6 py-4">{student.cgpa}</td>
                    <td className="px-6 py-4 text-center space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => onManageData(student)} className="text-teal-400 hover:text-teal-300" title="View & Manage Data">
                        <Eye className="h-4 w-4"/>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDeleteStudent(student.usn)} className="text-red-400 hover:text-red-300" title="Delete Student">
                        <Trash2 className="h-4 w-4"/>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentListTable;
