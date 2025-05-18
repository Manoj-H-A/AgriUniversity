import React from 'react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, FileText, Award, Download, CreditCard } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FinanceSection = ({ studentData, onAction }) => {
  const totalFine = studentData.library.issuedBooks.reduce((sum, book) => sum + book.fine, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Finance and Fees</h2>
      <Tabs defaultValue="fees" className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-2 bg-slate-700/50 border border-secondary/30 p-1.5 rounded-lg">
          <TabsTrigger value="fees" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Fee Payment</TabsTrigger>
          <TabsTrigger value="scholarships" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Scholarships</TabsTrigger>
        </TabsList>

        <TabsContent value="fees" className="mt-4">
          <DashboardCard icon={CircleDollarSign} title="Fee Payment">
            <p className="text-slate-400">Total Fees: <span className="text-lg font-semibold text-orange-300">₹{studentData.fees.total.toLocaleString('en-IN')}</span></p>
            <p className="text-slate-400">Fees Paid: <span className="text-lg font-semibold text-orange-300">₹{studentData.fees.paid.toLocaleString('en-IN')}</span></p>
            <p className={`font-semibold ${studentData.fees.due > 0 ? 'text-red-400' : 'text-green-400'}`}>
              Amount Due: <span className="text-lg">₹{studentData.fees.due.toLocaleString('en-IN')}</span>
            </p>
            {studentData.fees.due > 0 && <p className="text-sm text-slate-500">Due Date: {studentData.fees.dueDate}</p>}
            
            {totalFine > 0 && <p className="text-red-400 font-semibold mt-2">Library Fine Due: <span className="text-lg">₹{totalFine.toLocaleString('en-IN')}</span></p>}

            <h4 className="text-md font-semibold text-orange-400 mt-4 mb-2">Fee Receipts:</h4>
            {studentData.fees.receipts.map(rec => (
              <div key={rec.id} className="flex justify-between items-center p-2 bg-slate-700/60 rounded-md mb-1.5 text-sm">
                <span>Receipt ({rec.date}) - Amount: ₹{rec.amount.toLocaleString('en-IN')}</span>
                <Button onClick={() => onAction('Download Receipt', rec)} variant="ghost" size="sm" className="text-orange-300 hover:text-orange-100">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {studentData.fees.receipts.length === 0 && <p className="text-slate-400 mb-3 text-sm">No receipts available.</p>}

            {(studentData.fees.due > 0 || totalFine > 0) && (
              <Button onClick={() => onAction('Pay Fees Online')} className="w-full mt-4 bg-gradient-to-r from-secondary to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white">
                <CreditCard className="mr-2 h-4 w-4" /> Pay Online Now
              </Button>
            )}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="scholarships" className="mt-4">
          <DashboardCard icon={Award} title="Scholarship Details">
            {studentData.scholarships.map(schol => (
              <div key={schol.id} className="p-3 bg-slate-700/60 rounded-md mb-2.5">
                <h4 className="font-semibold text-orange-300">{schol.name}</h4>
                <p className="text-sm text-slate-400">Eligibility: {schol.eligibility}</p>
                <p className={`text-sm font-medium ${schol.status === 'Applied' || schol.status === 'Approved' ? 'text-green-400' : 'text-yellow-400'}`}>
                  Status: {schol.status}
                </p>
                {schol.status === 'Not Applied' && (
                  <Button onClick={() => onAction('Apply for Scholarship', schol)} size="sm" className="mt-2 bg-primary hover:bg-orange-600">
                    Apply Now
                  </Button>
                )}
              </div>
            ))}
            {studentData.scholarships.length === 0 && <p className="text-slate-400">No scholarship information available.</p>}
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceSection;