import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AddStudentFormFields = ({ formData, handleInputChange, formTypeSuffix = '' }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`usn${formTypeSuffix}`}>USN <span className="text-red-500">*</span></Label>
          <Input id={`usn${formTypeSuffix}`} name="usn" value={formData.usn} onChange={handleInputChange} required className="bg-slate-700 border-slate-600"/>
        </div>
        <div>
          <Label htmlFor={`name${formTypeSuffix}`}>Name <span className="text-red-500">*</span></Label>
          <Input id={`name${formTypeSuffix}`} name="name" value={formData.name} onChange={handleInputChange} required className="bg-slate-700 border-slate-600"/>
        </div>
        <div>
          <Label htmlFor={`password${formTypeSuffix}`}>Password <span className="text-red-500">*</span></Label>
          <Input id={`password${formTypeSuffix}`} name="password" type="password" value={formData.password} onChange={handleInputChange} required className="bg-slate-700 border-slate-600"/>
        </div>
        <div>
          <Label htmlFor={`cgpa${formTypeSuffix}`}>CGPA</Label>
          <Input id={`cgpa${formTypeSuffix}`} name="cgpa" value={formData.cgpa} onChange={handleInputChange} className="bg-slate-700 border-slate-600"/>
        </div>
        <div>
          <Label htmlFor={`yearOfAdmission${formTypeSuffix}`}>Year of Admission</Label>
          <Input id={`yearOfAdmission${formTypeSuffix}`} name="yearOfAdmission" type="number" placeholder="YYYY" value={formData.yearOfAdmission} onChange={handleInputChange} className="bg-slate-700 border-slate-600"/>
        </div>
        <div>
          <Label htmlFor={`program${formTypeSuffix}`}>Program</Label>
          <Input id={`program${formTypeSuffix}`} name="program" value={formData.program} onChange={handleInputChange} className="bg-slate-700 border-slate-600"/>
        </div>
        <div>
          <Label htmlFor={`year${formTypeSuffix}`}>Current Year</Label>
          <Input id={`year${formTypeSuffix}`} name="year" value={formData.year} onChange={handleInputChange} className="bg-slate-700 border-slate-600"/>
        </div>
        <div>
          <Label htmlFor={`email${formTypeSuffix}`}>Email</Label>
          <Input id={`email${formTypeSuffix}`} name="email" type="email" value={formData.email} onChange={handleInputChange} className="bg-slate-700 border-slate-600"/>
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor={`phone${formTypeSuffix}`}>Phone</Label>
        <Input id={`phone${formTypeSuffix}`} name="phone" value={formData.phone} onChange={handleInputChange} className="bg-slate-700 border-slate-600"/>
      </div>
      <div className="mt-4">
        <Label htmlFor={`address${formTypeSuffix}`}>Address</Label>
        <Input id={`address${formTypeSuffix}`} name="address" value={formData.address} onChange={handleInputChange} className="bg-slate-700 border-slate-600"/>
      </div>
      <div className="mt-4">
        <Label htmlFor={`profileImageUrl${formTypeSuffix}`}>Profile Image URL</Label>
        <Input id={`profileImageUrl${formTypeSuffix}`} name="profileImageUrl" value={formData.profileImageUrl || ''} onChange={handleInputChange} placeholder="Paste URL to student's photo" className="bg-slate-700 border-slate-600"/>
      </div>
    </>
  );
};

export default AddStudentFormFields;
