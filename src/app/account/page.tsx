
// This is an autogenerated file from Firebase Studio.
"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, User as UserIcon, Edit, Save, XCircle } from "lucide-react";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignOut, useUpdateProfile } from "react-firebase-hooks/auth";
import { useProfile } from "@/context/ProfileContext";

export default function AccountPage() {
  const [user, loading] = useAuthState(auth);
  const [
    createUserWithEmailAndPassword,
    _signUpUser,
    signUpLoading,
    signUpError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [
    signInWithEmailAndPassword,
    _signInUser,
    signInLoading,
    signInError,
  ] = useSignInWithEmailAndPassword(auth);
  const [signOut, signOutLoading] = useSignOut(auth);
  const [updateProfile, updatingProfile] = useUpdateProfile(auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // State for profile information from context
  const { profile, setProfile } = useProfile();
  const [tempProfile, setTempProfile] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
        // In a real app, you'd fetch this from a database
        // For now, we'll set a default name if it's not set
        setProfile(prev => ({...prev, name: user.displayName || prev.name || "AuraGrove User"}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setTempProfile(profile);
  }, [profile]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = await createUserWithEmailAndPassword(email, password);
    if (newUser) {
      await updateProfile({ displayName: name });
      // Refresh user to get the latest profile info including displayName
      await newUser.user.reload();
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInWithEmailAndPassword(email, password);
  };
  
  const handleSaveProfile = async () => {
    if (user && tempProfile.name !== user.displayName) {
        await updateProfile({ displayName: tempProfile.name });
    }
    setProfile(tempProfile);
    setIsEditing(false);
    // In a real app, you would also save this to your database
  };

  const handleCancelEdit = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };
  
  if (loading || signUpLoading || signInLoading || signOutLoading || updatingProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
       <div className="container mx-auto max-w-4xl px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <Card className="bg-muted/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader className="text-center items-center">
                        <UserIcon className="h-16 w-16 mb-4 text-primary" />
                        <CardTitle>Welcome Back!</CardTitle>
                        <CardDescription className="break-all">
                           {user.email}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex-col gap-4">
                        <Button asChild className="w-full">
                            <Link href="/community">Go to Community</Link>
                        </Button>
                        <Button onClick={signOut} className="w-full hover:bg-destructive hover:text-destructive-foreground" variant="outline">Sign Out</Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="md:col-span-2">
                 <Card className="bg-muted/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Your Profile</CardTitle>
                            {!isEditing && (
                                <Button variant="ghost" size="icon" onClick={() => { setTempProfile(profile); setIsEditing(true); }}>
                                    <Edit className="h-5 w-5" />
                                </Button>
                            )}
                        </div>
                        <CardDescription>Manage your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isEditing ? (
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="profile-name">Name</Label>
                                    <Input id="profile-name" value={tempProfile.name} onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="profile-address">Address</Label>
                                    <Input id="profile-address" value={tempProfile.address} onChange={(e) => setTempProfile({...tempProfile, address: e.target.value})} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="profile-city">City</Label>
                                    <Input id="profile-city" value={tempProfile.city} onChange={(e) => setTempProfile({...tempProfile, city: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="profile-zip">Zip Code</Label>
                                    <Input id="profile-zip" value={tempProfile.zip} onChange={(e) => setTempProfile({...tempProfile, zip: e.target.value})} />
                                </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="profile-country">Country</Label>
                                    <Input id="profile-country" value={tempProfile.country} onChange={(e) => setTempProfile({...tempProfile, country: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="profile-contact">Contact Number</Label>
                                    <Input id="profile-contact" value={tempProfile.contact} onChange={(e) => setTempProfile({...tempProfile, contact: e.target.value})} />
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold">Name</h4>
                                    <p className="text-muted-foreground">{profile.name}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Address</h4>
                                    <p className="text-muted-foreground whitespace-pre-wrap">{profile.address}</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold">City</h4>
                                        <p className="text-muted-foreground whitespace-pre-wrap">{profile.city}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Zip Code</h4>
                                        <p className="text-muted-foreground whitespace-pre-wrap">{profile.zip}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Country</h4>
                                    <p className="text-muted-foreground whitespace-pre-wrap">{profile.country}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Contact Number</h4>
                                    <p className="text-muted-foreground">{profile.contact}</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    {isEditing && (
                        <CardFooter className="justify-end gap-2">
                            <Button variant="ghost" onClick={handleCancelEdit}>
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                            <Button onClick={handleSaveProfile}>
                                <Save className="mr-2 h-4 w-4" />
                                Save
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-lg px-4 md:px-6 py-12">
       {(signInError || signUpError) && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{signInError?.message || signUpError?.message}</AlertDescription>
        </Alert>
      )}
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back!</CardTitle>
              <CardDescription>
                Log in to manage your account, orders, and rewards.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email-login">Email</Label>
                    <Input id="email-login" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password-login">Password</Label>
                    <Input id="password-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button className="w-full" type="submit">Log In</Button>
                </CardContent>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>
                Join our community and start your sustainable journey today.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name-signup">Name</Label>
                    <Input id="name-signup" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input id="email-signup" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input id="password-signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button className="w-full" type="submit">Create Account</Button>
                </CardContent>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
      <Separator className="my-6" />
      <p className="text-center text-sm text-muted-foreground">
        By continuing, you agree to our{' '}
        <Link href="/policies" className="underline hover:text-primary">Terms of Service</Link>.
      </p>
    </div>
  );
}
