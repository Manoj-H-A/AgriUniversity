import React from 'react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';
import { FileBadge, Bell, FilePlus, Download, Send } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdministrativeSection = ({ studentData, onAction }) => {
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
            {studentData.certificates.map(cert => (
              <div key={cert.id} className="flex justify-between items-center p-3 bg-slate-700/60 rounded-md mb-2">
                <div>
                  <p className="font-medium">{cert.type}</p>
                  <p className={`text-sm ${cert.status === 'Issued' ? 'text-green-400' : 'text-yellow-400'}`}>{cert.status}</p>
                </div>
                {cert.status === 'Not Requested' && (
                  <Button onClick={() => onAction('Request Certificate', cert)} size="sm" className="bg-primary hover:bg-orange-600">Request</Button>
                )}
                {cert.status === 'Issued' && cert.downloadUrl && (
                  <Button onClick={() => onAction('Download Certificate', cert)} variant="ghost" size="sm" className="text-orange-300 hover:text-orange-100">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {studentData.certificates.length === 0 && <p className="text-slate-400">No certificate requests found.</p>}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="notices" className="mt-4">
          <DashboardCard icon={Bell} title="Notices & Circulars">
            {studentData.notices.map(notice => (
              <div key={notice.id} className="p-3 bg-slate-700/60 rounded-md mb-2">
                <h4 className="font-semibold text-orange-300">{notice.title}</h4>
                <p className="text-xs text-slate-400">Date: {notice.date} | Type: {notice.type}</p>
                <Button onClick={() => onAction('View Notice', notice)} variant="link" className="text-orange-400 hover:text-orange-200 p-0 h-auto mt-1 text-sm">
                  View Details
                </Button>
              </div>
            ))}
            {studentData.notices.length === 0 && <p className="text-slate-400">No new notices or circulars.</p>}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="leave" className="mt-4">
          <DashboardCard icon={FilePlus} title="Leave Application">
            <h4 className="text-md font-semibold text-orange-400 mb-2">Recent Leave Applications:</h4>
            {studentData.leaveApplications.map(leave => (
              <div key={leave.id} className="p-2.5 bg-slate-700/60 rounded-md mb-2">
                <p className="font-medium text-sm">Reason: {leave.reason}</p>
                <p className="text-xs text-slate-400">From: {leave.fromDate} To: {leave.toDate}</p>
                <p className={`text-xs font-medium ${
                  leave.status === 'Approved' ? 'text-green-400' : 
                  leave.status === 'Pending' ? 'text-yellow-400' : 'text-red-400'
                }`}>Status: {leave.status}</p>
              </div>
            ))}
            {studentData.leaveApplications.length === 0 && <p className="text-slate-400 mb-3 text-sm">No leave applications found.</p>}
            <Button onClick={() => onAction('Apply for Leave')} className="w-full mt-4 bg-primary hover:bg-orange-600">
              <Send className="mr-2 h-4 w-4" /> Apply for New Leave
            </Button>
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdministrativeSection;