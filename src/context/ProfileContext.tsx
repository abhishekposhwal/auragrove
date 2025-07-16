"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Profile {
  name: string;
  address: string;
  contact: string;
}

interface ProfileContextType {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>({
    name: "AuraGrove User",
    address: "123 Green Way, Eco City, 110011",
    contact: "+91-9876543210",
  });

  const value = {
    profile,
    setProfile,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};