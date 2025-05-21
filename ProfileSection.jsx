import React, { useState } from 'react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCircle, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileSection = ({ studentData, currentUser, onAction, toast, isEditable, onUpdateStudentData }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  const [profileDetails, setProfileDetails] = useState({
    email: studentData.email,
    phone: studentData.phone,
    address: studentData.address,
    profileImageUrl: studentData.profileImageUrl || '',
  });

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails(prev => ({ ...prev, [name]: value }));
    if (isEditable && onUpdateStudentData) {
      const updatedData = { ...studentData, [name]: value };
      onUpdateStudentData(updatedData);
    }
  };
  
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (isEditable && onUpdateStudentData) {
       onUpdateStudentData({ ...studentData, ...profileDetails });
    }
    toast({
      title: 'Profile Updated',
      description: 'Your personal details have been updated successfully.',
      duration: 3000,
    });
    setIsEditingProfile(false);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
  };


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Profile Management</h2>
      <DashboardCard icon={UserCircle} title="Student Profile">
        <div className="flex flex-col items-center md:flex-row md:items-start gap-6 mb-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-primary">
            <AvatarImage src={profileDetails.profileImageUrl || studentData.profileImageUrl} alt={studentData.name} />
            <AvatarFallback className="text-3xl bg-slate-600 text-slate-200">{getInitials(studentData.name)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-orange-400">{studentData.name}</h3>
            <p className="text-slate-300">USN: {studentData.usn}</p>
            <p className="text-slate-300">Program: {studentData.program} ({studentData.year})</p>
          </div>
        </div>
        
        <form onSubmit={handleUpdateProfile} className="space-y-4 pt-4 border-t border-slate-700/50">
          {isEditable && (
            <div>
              <Label htmlFor="profileImageUrl" className="text-sm text-slate-400">Profile Image URL</Label>
              <Input type="url" id="profileImageUrl" name="profileImageUrl" value={profileDetails.profileImageUrl} onChange={handleProfileInputChange} className="bg-slate-700/50 border-slate-600 text-slate-200"/>
            </div>
          )}
          <div>
            <Label htmlFor="email" className="text-sm text-slate-400">Email</Label>
            <Input type="email" id="email" name="email" value={profileDetails.email} onChange={handleProfileInputChange} disabled={!isEditingProfile && !isEditable} className="bg-slate-700/50 border-slate-600 disabled:opacity-70 text-slate-200"/>
          </div>
          <div>
            <Label htmlFor="phone" className="text-sm text-slate-400">Phone</Label>
            <Input type="tel" id="phone" name="phone" value={profileDetails.phone} onChange={handleProfileInputChange} disabled={!isEditingProfile && !isEditable} className="bg-slate-700/50 border-slate-600 disabled:opacity-70 text-slate-200"/>
          </div>
          <div>
            <Label htmlFor="address" className="text-sm text-slate-400">Address</Label>
            <Input type="text" id="address" name="address" value={profileDetails.address} onChange={handleProfileInputChange} disabled={!isEditingProfile && !isEditable} className="bg-slate-700/50 border-slate-600 disabled:opacity-70 text-slate-200"/>
          </div>
          
          {!isEditable && ( 
            isEditingProfile ? (
              <div className="flex gap-2">
                <Button type="submit" className="bg-primary hover:bg-orange-600">Save Changes</Button>
                <Button type="button" variant="ghost" onClick={() => { setIsEditingProfile(false); setProfileDetails({email: studentData.email, phone: studentData.phone, address: studentData.address, profileImageUrl: studentData.profileImageUrl || ''});}} className="text-slate-300 hover:text-slate-100">Cancel</Button>
              </div>
            ) : (
              <Button type="button" onClick={() => setIsEditingProfile(true)} variant="outline" className="border-primary text-primary hover:bg-primary/20">
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            )
          )}
        </form>
      </DashboardCard>
    </div>
  );
};

export default ProfileSection;