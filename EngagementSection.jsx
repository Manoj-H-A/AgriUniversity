import React from 'react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PartyPopper, Edit3, MessageSquare, Trash2, PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EngagementSection = ({ studentData, onAction, isEditable, onUpdateStudentData, addGlobalRequest }) => {
  
  const handleFieldChange = (e, section, field, index) => {
    const { value } = e.target;
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));

    if (section === 'eventRegistrations' && index !== undefined) {
      updatedStudentData.eventRegistrations[index][field] = value;
    } else if (section === 'feedbackForms' && index !== undefined) {
      updatedStudentData.feedbackForms[index][field] = value;
    }
    onUpdateStudentData(updatedStudentData);
  };

  const addArrayItem = (section) => {
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));
    if (section === 'eventRegistrations') {
      updatedStudentData.eventRegistrations.push({ id: `EVENTREG_${Date.now()}`, name: '', status: 'Not Registered', date: '', url: '' });
    } else if (section === 'feedbackForms') {
      updatedStudentData.feedbackForms.push({ id: `FEEDBACK_${Date.now()}`, title: '', status: 'Pending', url: '' });
    }
    onUpdateStudentData(updatedStudentData);
  };

  const removeArrayItem = (section, index) => {
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));
    if (section === 'eventRegistrations') {
      updatedStudentData.eventRegistrations.splice(index, 1);
    } else if (section === 'feedbackForms') {
      updatedStudentData.feedbackForms.splice(index, 1);
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
    if (type === 'EventRegistration') requestData.eventName = item.name;
    if (type === 'FeedbackSubmission') requestData.formTitle = item.title;
    
    addGlobalRequest(requestData);
    onAction(type, item); 
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Engagement & Events</h2>
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-2 bg-slate-700/50 border border-secondary/30 p-1.5 rounded-lg">
          <TabsTrigger value="events" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Event Registrations</TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Feedback Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-4">
          <DashboardCard icon={PartyPopper} title="Event Registrations">
            {studentData.eventRegistrations.map((eventReg, index) => (
              <div key={eventReg.id} className="p-3 bg-slate-700/60 rounded-md mb-2 space-y-2">
                {isEditable ? (
                   <>
                    <Label htmlFor={`eventName-${index}`}>Event Name</Label>
                    <Input id={`eventName-${index}`} value={eventReg.name} onChange={(e) => handleFieldChange(e, 'eventRegistrations', 'name', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`eventDate-${index}`}>Date</Label>
                    <Input id={`eventDate-${index}`} type="date" value={eventReg.date} onChange={(e) => handleFieldChange(e, 'eventRegistrations', 'date', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`eventStatus-${index}`}>Status</Label>
                    <Input id={`eventStatus-${index}`} value={eventReg.status} onChange={(e) => handleFieldChange(e, 'eventRegistrations', 'status', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`eventUrl-${index}`}>URL (Optional)</Label>
                    <Input id={`eventUrl-${index}`} value={eventReg.url} onChange={(e) => handleFieldChange(e, 'eventRegistrations', 'url', index)} placeholder="Link to event page" className="bg-slate-600 border-slate-500"/>
                    <Button variant="destructive" size="sm" onClick={() => removeArrayItem('eventRegistrations', index)} className="text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove Registration</Button>
                   </>
                ) : (
                  <>
                    <h4 className="font-semibold text-orange-300">{eventReg.name}</h4>
                    <p className="text-xs text-slate-400">Date: {eventReg.date}</p>
                    <p className={`text-sm font-medium ${eventReg.status === 'Registered' ? 'text-green-400' : eventReg.status === 'Pending Request' ? 'text-blue-400' : 'text-yellow-400'}`}>
                      Status: {eventReg.status}
                    </p>
                    {eventReg.status !== 'Registered' && eventReg.status !== 'Pending Request' && (
                      <Button onClick={() => handleStudentRequest('EventRegistration', eventReg)} size="sm" className="mt-2 bg-primary hover:bg-orange-600">
                        Register Now
                      </Button>
                    )}
                  </>
                )}
              </div>
            ))}
            {isEditable && (
                <Button variant="outline" size="sm" onClick={() => addArrayItem('eventRegistrations')} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Event Registration
                </Button>
            )}
            {studentData.eventRegistrations.length === 0 && !isEditable && <p className="text-slate-400">No event registrations found. Check university announcements for upcoming events!</p>}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="feedback" className="mt-4">
          <DashboardCard icon={MessageSquare} title="Feedback Forms">
            {studentData.feedbackForms.map((form, index) => (
              <div key={form.id} className="p-3 bg-slate-700/60 rounded-md mb-2 space-y-2">
                {isEditable ? (
                  <>
                    <Label htmlFor={`formTitle-${index}`}>Form Title</Label>
                    <Input id={`formTitle-${index}`} value={form.title} onChange={(e) => handleFieldChange(e, 'feedbackForms', 'title', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`formStatus-${index}`}>Status</Label>
                    <Input id={`formStatus-${index}`} value={form.status} onChange={(e) => handleFieldChange(e, 'feedbackForms', 'status', index)} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`formUrl-${index}`}>Form URL</Label>
                    <Input id={`formUrl-${index}`} value={form.url} onChange={(e) => handleFieldChange(e, 'feedbackForms', 'url', index)} placeholder="Link to form" className="bg-slate-600 border-slate-500"/>
                    <Button variant="destructive" size="sm" onClick={() => removeArrayItem('feedbackForms', index)} className="text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove Form</Button>
                  </>
                ) : (
                  <>
                    <h4 className="font-semibold text-orange-300">{form.title}</h4>
                    <p className={`text-sm font-medium ${form.status === 'Submitted' ? 'text-green-400' : form.status === 'Pending Request' ? 'text-blue-400' : 'text-yellow-400'}`}>
                      Status: {form.status}
                    </p>
                    {form.status === 'Pending' && (
                      <Button onClick={() => handleStudentRequest('FeedbackSubmission', form)} size="sm" className="mt-2 bg-primary hover:bg-orange-600">
                        <Edit3 className="mr-2 h-4 w-4" /> Fill Form
                      </Button>
                    )}
                  </>
                )}
              </div>
            ))}
            {isEditable && (
                <Button variant="outline" size="sm" onClick={() => addArrayItem('feedbackForms')} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Feedback Form
                </Button>
            )}
            {studentData.feedbackForms.length === 0 && !isEditable && <p className="text-slate-400">No feedback forms currently available.</p>}
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EngagementSection;