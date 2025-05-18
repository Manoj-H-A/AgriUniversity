import React, { useState } from 'react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCircle, Lock, Edit } from 'lucide-react';

const ProfileSection = ({ studentData, currentUser, onAction, toast }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    email: studentData.email,
    phone: studentData.phone,
    address: studentData.address,
  });
  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    toast({
      title: 'Profile Updated',
      description: 'Your personal details have been updated successfully.',
      duration: 3000,
    });
    setIsEditing(false);
  };
  
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'New password and confirm password do not match.',
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }
    toast({
      title: 'Password Changed',
      description: 'Your password has been changed successfully.',
      duration: 3000,
    });
    setPasswordDetails({ currentPassword: '',newPassword: '', confirmPassword: '' });
  };


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Profile Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard icon={UserCircle} title="Student Profile">
          <div className="space-y-3">
            <p><strong className="text-orange-400">Name:</strong> {studentData.name}</p>
            <p><strong className="text-orange-400">Student ID:</strong> {studentData.id}</p>
            <p><strong className="text-orange-400">Program:</strong> {studentData.program} ({studentData.year})</p>
            
            <form onSubmit={handleUpdateProfile} className="space-y-3 pt-3 border-t border-slate-700/50">
              <div>
                <Label htmlFor="email" className="text-sm text-slate-400">Email</Label>
                <Input type="email" id="email" name="email" value={profileDetails.email} onChange={handleProfileInputChange} disabled={!isEditing} className="bg-slate-700/50 border-slate-600 disabled:opacity-70 text-slate-200"/>
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm text-slate-400">Phone</Label>
                <Input type="tel" id="phone" name="phone" value={profileDetails.phone} onChange={handleProfileInputChange} disabled={!isEditing} className="bg-slate-700/50 border-slate-600 disabled:opacity-70 text-slate-200"/>
              </div>
              <div>
                <Label htmlFor="address" className="text-sm text-slate-400">Address</Label>
                <Input type="text" id="address" name="address" value={profileDetails.address} onChange={handleProfileInputChange} disabled={!isEditing} className="bg-slate-700/50 border-slate-600 disabled:opacity-70 text-slate-200"/>
              </div>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button type="submit" className="bg-primary hover:bg-orange-600">Save Changes</Button>
                  <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} className="text-slate-300 hover:text-slate-100">Cancel</Button>
                </div>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)} variant="outline" className="border-primary text-primary hover:bg-primary/20">
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              )}
            </form>
          </div>
        </DashboardCard>

        <DashboardCard icon={Lock} title="Change Password">
          <form onSubmit={handleChangePassword} className="space-y-4">
             <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input type="password" id="currentPassword" name="currentPassword" value={passwordDetails.currentPassword} onChange={handlePasswordInputChange} required className="bg-slate-700/50 border-slate-600 text-slate-200"/>
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input type="password" id="newPassword" name="newPassword" value={passwordDetails.newPassword} onChange={handlePasswordInputChange} required className="bg-slate-700/50 border-slate-600 text-slate-200"/>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input type="password" id="confirmPassword" name="confirmPassword" value={passwordDetails.confirmPassword} onChange={handlePasswordInputChange} required className="bg-slate-700/50 border-slate-600 text-slate-200"/>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-secondary to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white">Update Password</Button>
          </form>
        </DashboardCard>
      </div>
    </div>
  );
};

export default ProfileSection;