import React from 'react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';
import { PartyPopper, Edit3, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EngagementSection = ({ studentData, onAction }) => {
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
            {studentData.eventRegistrations.map(eventReg => (
              <div key={eventReg.id} className="p-3 bg-slate-700/60 rounded-md mb-2">
                <h4 className="font-semibold text-orange-300">{eventReg.name}</h4>
                <p className="text-xs text-slate-400">Date: {eventReg.date}</p>
                <p className={`text-sm font-medium ${eventReg.status === 'Registered' ? 'text-green-400' : 'text-yellow-400'}`}>
                  Status: {eventReg.status}
                </p>
                {eventReg.status !== 'Registered' && (
                  <Button onClick={() => onAction('Register for Event', eventReg)} size="sm" className="mt-2 bg-primary hover:bg-orange-600">
                    Register Now
                  </Button>
                )}
              </div>
            ))}
            {studentData.eventRegistrations.length === 0 && <p className="text-slate-400">No event registrations found. Check university announcements for upcoming events!</p>}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="feedback" className="mt-4">
          <DashboardCard icon={MessageSquare} title="Feedback Forms">
            {studentData.feedbackForms.map(form => (
              <div key={form.id} className="p-3 bg-slate-700/60 rounded-md mb-2">
                <h4 className="font-semibold text-orange-300">{form.title}</h4>
                <p className={`text-sm font-medium ${form.status === 'Submitted' ? 'text-green-400' : 'text-yellow-400'}`}>
                  Status: {form.status}
                </p>
                {form.status === 'Pending' && (
                  <Button onClick={() => onAction('Fill Feedback Form', form)} size="sm" className="mt-2 bg-primary hover:bg-orange-600">
                    <Edit3 className="mr-2 h-4 w-4" /> Fill Form
                  </Button>
                )}
              </div>
            ))}
            {studentData.feedbackForms.length === 0 && <p className="text-slate-400">No feedback forms currently available.</p>}
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EngagementSection;