import React from 'react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleDollarSign, FileText, Award, Download, CreditCard, Trash2, PlusCircle, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FinanceSection = ({ studentData, onAction, isEditable, onUpdateStudentData }) => {
  const totalFine = studentData.library.issuedBooks.reduce((sum, book) => sum + (parseFloat(book.fine) || 0), 0);

  const handleFieldChange = (e, section, field, index, subField) => {
    const { value, type, files } = e.target;
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));

    if (section === 'fees' && field === 'receipts' && index !== undefined) {
        if (subField === 'fileUpload' && files && files[0]) {
            updatedStudentData.fees.receipts[index].fileUrl = `simulated/path/to/${files[0].name}`;
            onAction('Upload Fee Receipt File', {file: files[0], studentUsn: studentData.usn, receiptId: updatedStudentData.fees.receipts[index].id });
        } else {
            updatedStudentData.fees.receipts[index][subField] = subField === 'amount' ? parseFloat(value) || 0 : value;
        }
    } else if (section === 'scholarships' && index !== undefined) {
        updatedStudentData.scholarships[index][field] = value;
    } else {
        let current = updatedStudentData;
        const parts = `${section}.${field}`.split('.');
        parts.forEach((part, idx) => {
            if (idx === parts.length - 1) {
                current[part] = (field === 'total' || field === 'paid' || field === 'due') ? parseFloat(value) || 0 : value;
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
    if (section === 'fees' && field === 'receipts') {
        updatedStudentData.fees.receipts.push({ id: `REC_${Date.now()}`, date: '', amount: 0, url: '', fileUrl: '' });
    } else if (section === 'scholarships') {
        updatedStudentData.scholarships.push({ id: `SCHOL_${Date.now()}`, name: '', status: 'Not Applied', eligibility: '', applyUrl: '' });
    }
    onUpdateStudentData(updatedStudentData);
  };

  const removeArrayItem = (section, field, index) => {
    const updatedStudentData = JSON.parse(JSON.stringify(studentData));
    if (section === 'fees' && field === 'receipts') {
        updatedStudentData.fees.receipts.splice(index, 1);
    } else if (section === 'scholarships') {
        updatedStudentData.scholarships.splice(index, 1);
    }
    onUpdateStudentData(updatedStudentData);
  };


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
            {isEditable ? (
              <div className="space-y-3 mb-4">
                <div><Label htmlFor="totalFees">Total Fees (₹)</Label><Input id="totalFees" type="number" name="fees.total" value={studentData.fees.total} onChange={(e) => handleFieldChange(e, 'fees', 'total')} className="bg-slate-600 border-slate-500"/></div>
                <div><Label htmlFor="feesPaid">Fees Paid (₹)</Label><Input id="feesPaid" type="number" name="fees.paid" value={studentData.fees.paid} onChange={(e) => handleFieldChange(e, 'fees', 'paid')} className="bg-slate-600 border-slate-500"/></div>
                <div><Label htmlFor="feesDue">Amount Due (₹)</Label><Input id="feesDue" type="number" name="fees.due" value={studentData.fees.due} onChange={(e) => handleFieldChange(e, 'fees', 'due')} className="bg-slate-600 border-slate-500"/></div>
                <div><Label htmlFor="dueDate">Due Date</Label><Input id="dueDate" type="date" name="fees.dueDate" value={studentData.fees.dueDate} onChange={(e) => handleFieldChange(e, 'fees', 'dueDate')} className="bg-slate-600 border-slate-500"/></div>
                <div><Label htmlFor="paymentLink">Online Payment Link</Label><Input id="paymentLink" name="fees.paymentLink" value={studentData.fees.paymentLink} onChange={(e) => handleFieldChange(e, 'fees', 'paymentLink')} className="bg-slate-600 border-slate-500"/></div>
              </div>
            ) : (
              <>
                <p className="text-slate-400">Total Fees: <span className="text-lg font-semibold text-orange-300">₹{studentData.fees.total.toLocaleString('en-IN')}</span></p>
                <p className="text-slate-400">Fees Paid: <span className="text-lg font-semibold text-orange-300">₹{studentData.fees.paid.toLocaleString('en-IN')}</span></p>
                <p className={`font-semibold ${studentData.fees.due > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  Amount Due: <span className="text-lg">₹{studentData.fees.due.toLocaleString('en-IN')}</span>
                </p>
                {studentData.fees.due > 0 && <p className="text-sm text-slate-500">Due Date: {studentData.fees.dueDate}</p>}
              </>
            )}
            
            {totalFine > 0 && <p className="text-red-400 font-semibold mt-2">Library Fine Due: <span className="text-lg">₹{totalFine.toLocaleString('en-IN')}</span></p>}

            <h4 className="text-md font-semibold text-orange-400 mt-4 mb-2">Fee Receipts:</h4>
            {studentData.fees.receipts.map((rec, index) => (
              <div key={rec.id} className="p-2.5 bg-slate-700/60 rounded-md mb-1.5 text-sm space-y-2">
                {isEditable ? (
                  <>
                    <Label htmlFor={`recDate-${index}`}>Receipt Date</Label>
                    <Input id={`recDate-${index}`} type="date" value={rec.date} onChange={(e) => handleFieldChange(e, 'fees', 'receipts', index, 'date')} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`recAmount-${index}`}>Amount (₹)</Label>
                    <Input id={`recAmount-${index}`} type="number" value={rec.amount} onChange={(e) => handleFieldChange(e, 'fees', 'receipts', index, 'amount')} className="bg-slate-600 border-slate-500"/>
                    <Label htmlFor={`recFileUrl-${index}`}>Receipt File URL</Label>
                    <Input id={`recFileUrl-${index}`} value={rec.fileUrl || ''} onChange={(e) => handleFieldChange(e, 'fees', 'receipts', index, 'fileUrl')} placeholder="Link to PDF/Image" className="bg-slate-600 border-slate-500"/>
                    <div className="flex items-center gap-2">
                        <Label htmlFor={`recFileUpload-${index}`} className="text-xs text-slate-400">Upload File:</Label>
                        <Input type="file" id={`recFileUpload-${index}`} accept=".pdf,image/*" className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 w-auto" onChange={(e) => handleFieldChange(e, 'fees', 'receipts', index, 'fileUpload')} />
                        <Button variant="destructive" size="sm" onClick={() => removeArrayItem('fees','receipts',index)} className="text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove</Button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                        <span>Receipt ({rec.date}) - Amount: ₹{rec.amount.toLocaleString('en-IN')}</span>
                        {rec.fileUrl && <a href={rec.fileUrl} target="_blank" rel="noopener noreferrer" className="text-xs block text-orange-400 hover:underline">View Uploaded Receipt</a>}
                    </div>
                    {rec.url && !rec.fileUrl && ( 
                        <Button onClick={() => onAction('Download Receipt', rec)} variant="ghost" size="sm" className="text-orange-300 hover:text-orange-100">
                        <Download className="h-4 w-4" />
                        </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
            {isEditable && (
                <Button variant="outline" size="sm" onClick={() => addArrayItem('fees','receipts')} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Fee Receipt
                </Button>
            )}
            {studentData.fees.receipts.length === 0 && !isEditable && <p className="text-slate-400 mb-3 text-sm">No receipts available.</p>}

            {!isEditable && (studentData.fees.due > 0 || totalFine > 0) && (
              <Button onClick={() => onAction('Pay Fees Online')} className="w-full mt-4 bg-gradient-to-r from-secondary to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white">
                <CreditCard className="mr-2 h-4 w-4" /> Pay Online Now
              </Button>
            )}
          </DashboardCard>
        </TabsContent>

        <TabsContent value="scholarships" className="mt-4">
          <DashboardCard icon={Award} title="Scholarship Details">
            {studentData.scholarships.map((schol, index) => (
              <div key={schol.id} className="p-3 bg-slate-700/60 rounded-md mb-2.5 space-y-2">
                 {isEditable ? (
                    <>
                        <Label htmlFor={`scholName-${index}`}>Scholarship Name</Label>
                        <Input id={`scholName-${index}`} value={schol.name} onChange={(e) => handleFieldChange(e, 'scholarships', 'name', index)} className="bg-slate-600 border-slate-500"/>
                        <Label htmlFor={`scholEligibility-${index}`}>Eligibility</Label>
                        <Input id={`scholEligibility-${index}`} value={schol.eligibility} onChange={(e) => handleFieldChange(e, 'scholarships', 'eligibility', index)} className="bg-slate-600 border-slate-500"/>
                        <Label htmlFor={`scholStatus-${index}`}>Status</Label>
                        <Input id={`scholStatus-${index}`} value={schol.status} onChange={(e) => handleFieldChange(e, 'scholarships', 'status', index)} className="bg-slate-600 border-slate-500"/>
                        <Label htmlFor={`scholApplyUrl-${index}`}>Apply URL (Optional)</Label>
                        <Input id={`scholApplyUrl-${index}`} value={schol.applyUrl} onChange={(e) => handleFieldChange(e, 'scholarships', 'applyUrl', index)} placeholder="Link to application" className="bg-slate-600 border-slate-500"/>
                        <Button variant="destructive" size="sm" onClick={() => removeArrayItem('scholarships',null,index)} className="text-xs"><Trash2 className="h-3 w-3 mr-1"/> Remove Scholarship</Button>
                    </>
                 ) : (
                    <>
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
                    </>
                 )}
              </div>
            ))}
            {isEditable && (
                <Button variant="outline" size="sm" onClick={() => addArrayItem('scholarships',null)} className="w-full border-primary text-primary hover:bg-primary/20 mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Scholarship
                </Button>
            )}
            {studentData.scholarships.length === 0 && !isEditable && <p className="text-slate-400">No scholarship information available.</p>}
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceSection;