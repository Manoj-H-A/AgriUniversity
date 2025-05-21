import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BellRing as BellRinging, CheckCircle, XCircle, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const RequestCard = ({ request, onUpdateStatus }) => {
  const [staffNotes, setStaffNotes] = useState(request.staffNotes || '');

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(request.requestId, newStatus, staffNotes);
  };

  const getStatusColor = (status) => {
    if (status === 'Approved') return 'text-green-400';
    if (status === 'Rejected') return 'text-red-400';
    return 'text-yellow-400'; 
  };

  const renderRequestDetails = (req) => {
    switch (req.type) {
      case 'CertificateRequest':
        return <p>Certificate Type: <span className="font-medium">{req.itemType || req.itemDetails?.type}</span></p>;
      case 'LeaveApplication':
        return (
          <>
            <p>From: <span className="font-medium">{req.fromDate || req.itemDetails?.fromDate}</span> To: <span className="font-medium">{req.toDate || req.itemDetails?.toDate}</span></p>
            <p>Reason: <span className="font-medium">{req.reason || req.itemDetails?.reason}</span></p>
          </>
        );
      case 'EventRegistration':
        return <p>Event: <span className="font-medium">{req.eventName || req.itemDetails?.name}</span></p>;
      case 'FeedbackSubmission':
        return <p>Form: <span className="font-medium">{req.formTitle || req.itemDetails?.title}</span></p>;
      default:
        return <p>Details: <span className="font-medium">{JSON.stringify(req.itemDetails)}</span></p>;
    }
  };

  return (
    <Card className="bg-slate-800/70 border-secondary/60 mb-4">
      <CardHeader>
        <CardTitle className="text-lg text-primary flex justify-between items-center">
          <span>{request.type} - {request.studentName} ({request.studentUsn})</span>
          <span className={`text-sm font-semibold ${getStatusColor(request.status)}`}>{request.status}</span>
        </CardTitle>
        <p className="text-xs text-slate-400">Requested on: {new Date(request.date).toLocaleDateString()}</p>
      </CardHeader>
      <CardContent className="text-sm space-y-1">
        {renderRequestDetails(request)}
      </CardContent>
      {request.status === 'Pending' && (
        <CardFooter className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-slate-700">
          <Textarea 
            placeholder="Add notes (optional)..." 
            value={staffNotes}
            onChange={(e) => setStaffNotes(e.target.value)}
            className="bg-slate-700 border-slate-600 text-xs min-h-[60px]"
          />
          <div className="flex gap-2 self-end sm:self-center">
            <Button onClick={() => handleStatusChange('Approved')} size="sm" className="bg-green-600 hover:bg-green-700"><CheckCircle className="mr-1 h-4 w-4"/>Approve</Button>
            <Button onClick={() => handleStatusChange('Rejected')} size="sm" className="bg-red-600 hover:bg-red-700"><XCircle className="mr-1 h-4 w-4"/>Reject</Button>
          </div>
        </CardFooter>
      )}
      {request.status !== 'Pending' && request.staffNotes && (
        <CardFooter className="pt-2 border-t border-slate-700">
            <p className="text-xs text-slate-400">Staff Notes: {request.staffNotes}</p>
        </CardFooter>
      )}
    </Card>
  );
};


const RequestsSection = ({ requests, updateRequestStatus }) => {
  const [filterStatus, setFilterStatus] = useState('Pending');

  const filteredRequests = requests.filter(req => filterStatus === 'All' || req.status === filterStatus);
  const pendingRequests = requests.filter(req => req.status === 'Pending');

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-secondary/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl text-primary flex items-center"><BellRinging className="mr-3 h-6 w-6"/> Student Requests</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Filter by status:</span>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px] bg-slate-700 border-slate-600 text-slate-200">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600 text-slate-200">
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {pendingRequests.length > 0 && filterStatus !== 'All' && (
            <p className="text-orange-400 mb-4 text-sm">{pendingRequests.length} request(s) require your attention.</p>
          )}
          {filteredRequests.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No requests found matching "{filterStatus}" status.</p>
          ) : (
            <ScrollArea className="h-[60vh] pr-3">
              {filteredRequests.sort((a,b) => new Date(b.date) - new Date(a.date)).map(request => (
                <RequestCard key={request.requestId} request={request} onUpdateStatus={updateRequestStatus} />
              ))}
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestsSection;