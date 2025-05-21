import React from 'react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileBadge, Bell, FilePlus, Download, Send, Trash2, PlusCircle, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdministrativeSection = ({ studentData, onAction, isEditable, onUpdateStudentData, addGlobalRequest }) => {

  const handleFieldChange = (e, section, field, index, subField) => {
    const { value, type, files } = e.target;
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));

    if (section === 'certificates' && index !== undefined) {
      if (field === 'fileUpload' && files && files[0]) {
        updatedStudentData.certificates[index].fileUrl = `simulated/path/to/${files[0].name}`;
        onAction('Upload Certificate File', {file: files[0], studentUsn: studentData.usn, certId: updatedStudentData.certificates[index].id });
      } else {
        updatedStudentData.certificates[index][field] = value;
      }
    } else if (section === 'notices' && index !== undefined) {
       updatedStudentData.notices[index][field] = value;
    } else if (section === 'leaveApplications' && index !== undefined) {
        updatedStudentData.leaveApplications[index][field] = value;
    }
    onUpdateStudentData(updatedStudentData);
  };

  const addArrayItem = (section) => {
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));
    if (section === 'certificates') {
      updatedStudentData.certificates.push({ id: `CERT_${Date.now()}`, type: '', status: 'Not Requested', downloadUrl: '', fileUrl: '' });
    } else if (section === 'notices') {
      updatedStudentData.notices.push({ id: `NOTICE_${Date.now()}`, title: '', date: '', type: '', url: '' });
    } else if (section === 'leaveApplications') {
      updatedStudentData.leaveApplications.push({ id: `LEAVE_${Date.now()}`, fromDate: '', toDate: '', reason: '', status: 'Pending' });
    }
    onUpdateStudentData(updatedStudentData);
  };

  const removeArrayItem = (section, index) => {
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));
    if (section === 'certificates') {
      updatedStudentData.certificates.splice(index, 1);
    } else if (section === 'notices') {
      updatedStudentData.notices.splice(index, 1);
    } else if (section === 'leaveApplications') {
      updatedStudentData.leaveApplications.splice(index, 1);
    }
    onUpdateStudentData(updatedStudentData);
  };

  const handleStudentRequest = (type, item) => {
    const requestData = {
      studentUsn: studentData.usn,
      studentName: studentData.name,
      type: type,
      itemDetails: item,
    };
    if (type === 'CertificateRequest') requestData.itemType = item.type;
    if (type === 'LeaveApplication') {
        requestData.fromDate = item.fromDate; // Assuming these are set before calling
        requestData.toDate = item.toDate;
        requestData.reason = item.reason;
    }
    addGlobalRequest(requestData);
    onAction(type, item); 
  };


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Administrative Services</h2>
      <Tabs defaultValue="certificates" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-slate-700/50 border border-secondary/30 p-1.5 rounded-lg">
          <TabsTrigger value="certificates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Certificates</TabsTrigger>
          <TabsTrigger value="notices" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Notices</TabsTrigger>
          <TabsTrigger value="leave" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Leave</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="mt-4">
          <DashboardCard icon={FileBadge} title="Certificates">
            {studentData.certificates.map((cert, index) => (
              <div key={cert.id} className="p-3 bg-slate-700/60 rounded-md mb-2 space-y-2">
                {isEditable ? (
                  <>
                    <Label htmlFor={`certType-${index}`}>Certificate Type</Label>
                    <Input id={`certType-${index}`} value={cert.type} onChange={(e) => handleFieldChange(e, 'certificates', 'type', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`certStatus-${index}`}>Status</Label>
                    <Input id={`certStatus-${index}`} value={cert.status} onChange={(e) => handleFieldChange(e, 'certificates', 'status', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`certFileUrl-${index}`}>File URL (PDF/Image)</Label>
                    <Input id={`certFileUrl-${index}`} value={cert.fileUrl || ''} onChange={(e) => handleFieldChange(e, 'certificates', 'fileUrl', index)} placeholder="Paste URL to uploaded file" className="bg-slate-600 border-slate-500"/>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`certFileUpload-${index}`} className="text-xs text-slate-400">Upload File:</Label>
                      <Input type="file" id={`certFileUpload-${index}`} accept=".pdf,image/*" className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 w-auto" onChange={(e) => handleFieldChange(e, 'certificates', 'fileUpload', index)} />
                      <Button variant="destructive" size="sm" onClick={() => removeArrayItem('certificates', index)} className="text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove</Button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{cert.type}</p>
                      <p className={`text-sm ${cert.status === 'Issued' ? 'text-green-400' : cert.status === 'Pending Request' ? 'text-blue-400' : 'text-yellow-400'}`}>{cert.status}</p>
                       {cert.fileUrl && <a href={cert.fileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-400 hover:underline">View Uploaded File</a>}
                    </div>
                    {cert.status === 'Not Requested' && (
                      <Button onClick={() => handleStudentRequest('CertificateRequest', cert)} size="sm" className="bg-primary hover:bg-orange-600">Request</Button>
                    )}
                    {cert.status === 'Issued' && cert.downloadUrl && (
                      <Button onClick={() => onAction('Download Certificate', cert)} variant="ghost" size="sm" className="text-orange-300 hover:text-orange-100">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
            {isEditable && (
              <Button variant="outline" size="sm" onClick={() => addArrayItem('certificates')} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Certificate Entry
              </Button>
            )}
            {studentData.certificates.length === 0 && !isEditable && <p className="text-slate-400">No certificate requests found.</p>}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="notices" className="mt-4">
          <DashboardCard icon={Bell} title="Notices & Circulars">
            {studentData.notices.map((notice, index) => (
              <div key={notice.id} className="p-3 bg-slate-700/60 rounded-md mb-2 space-y-2">
                {isEditable ? (
                  <>
                    <Label htmlFor={`noticeTitle-${index}`}>Title</Label>
                    <Input id={`noticeTitle-${index}`} value={notice.title} onChange={(e) => handleFieldChange(e, 'notices', 'title', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`noticeDate-${index}`}>Date</Label>
                    <Input id={`noticeDate-${index}`} type="date" value={notice.date} onChange={(e) => handleFieldChange(e, 'notices', 'date', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`noticeType-${index}`}>Type</Label>
                    <Input id={`noticeType-${index}`} value={notice.type} onChange={(e) => handleFieldChange(e, 'notices', 'type', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`noticeUrl-${index}`}>URL (Optional)</Label>
                    <Input id={`noticeUrl-${index}`} value={notice.url} onChange={(e) => handleFieldChange(e, 'notices', 'url', index)} placeholder="Link to details" className="bg-slate-600 border-slate-500"/>
                    <Button variant="destructive" size="sm" onClick={() => removeArrayItem('notices', index)} className="text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove Notice</Button>
                  </>
                ) : (
                  <>
                    <h4 className="font-semibold text-orange-300">{notice.title}</h4>
                    <p className="text-xs text-slate-400">Date: {notice.date} | Type: {notice.type}</p>
                    <Button onClick={() => onAction('View Notice', notice)} variant="link" className="text-orange-400 hover:text-orange-200 p-0 h-auto mt-1 text-sm">
                      View Details
                    </Button>
                  </>
                )}
              </div>
            ))}
            {isEditable && (
              <Button variant="outline" size="sm" onClick={() => addArrayItem('notices')} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Notice
              </Button>
            )}
            {studentData.notices.length === 0 && !isEditable && <p className="text-slate-400">No new notices or circulars.</p>}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="leave" className="mt-4">
          <DashboardCard icon={FilePlus} title="Leave Application">
            {!isEditable && <h4 className="text-md font-semibold text-orange-400 mb-2">Recent Leave Applications:</h4>}
            {studentData.leaveApplications.map((leave, index) => (
              <div key={leave.id} className="p-2.5 bg-slate-700/60 rounded-md mb-2 space-y-2">
                 {isEditable ? (
                  <>
                    <Label htmlFor={`leaveFromDate-${index}`}>From Date</Label>
                    <Input id={`leaveFromDate-${index}`} type="date" value={leave.fromDate} onChange={(e) => handleFieldChange(e, 'leaveApplications', 'fromDate', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`leaveToDate-${index}`}>To Date</Label>
                    <Input id={`leaveToDate-${index}`} type="date" value={leave.toDate} onChange={(e) => handleFieldChange(e, 'leaveApplications', 'toDate', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`leaveReason-${index}`}>Reason</Label>
                    <Input id={`leaveReason-${index}`} value={leave.reason} onChange={(e) => handleFieldChange(e, 'leaveApplications', 'reason', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`leaveStatus-${index}`}>Status</Label>
                    <Input id={`leaveStatus-${index}`} value={leave.status} onChange={(e) => handleFieldChange(e, 'leaveApplications', 'status', index)} className="bg-slate-600 border-slate-500"/>
                    <Button variant="destructive" size="sm" onClick={() => removeArrayItem('leaveApplications', index)} className="text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove Leave</Button>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-sm">Reason: {leave.reason}</p>
                    <p className="text-xs text-slate-400">From: {leave.fromDate} To: {leave.toDate}</p>
                    <p className={`text-xs font-medium ${
                      leave.status === 'Approved' ? 'text-green-400' : 
                      leave.status === 'Pending' || leave.status === 'Pending Request' ? 'text-yellow-400' : 'text-red-400'
                    }`}>Status: {leave.status}</p>
                  </>
                 )}
              </div>
            ))}
             {isEditable && (
              <Button variant="outline" size="sm" onClick={() => addArrayItem('leaveApplications')} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Leave Application
              </Button>
            )}
            {studentData.leaveApplications.length === 0 && !isEditable && <p className="text-slate-400 mb-3 text-sm">No leave applications found.</p>}
            {!isEditable && (
                <Button onClick={() => handleStudentRequest('LeaveApplication', { fromDate: '', toDate: '', reason: 'New Leave Request' })} className="w-full mt-4 bg-primary hover:bg-orange-600">
                <Send className="mr-2 h-4 w-4" /> Apply for New Leave
                </Button>
            )}
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdministrativeSection;