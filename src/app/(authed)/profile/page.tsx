'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
       <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
            <User className="h-7 w-7 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold font-headline">Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Public Profile</CardTitle>
          <CardDescription>This information will be displayed publicly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
                <AvatarFallback>
                    <User className="h-10 w-10" />
                </AvatarFallback>
            </Avatar>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <p className="text-sm text-muted-foreground">The user icon is currently used as the avatar.</p>
            </div>
          </div>
          <div className="grid w-full max-w-md items-center gap-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="Glimmora Team" />
          </div>
          <div className="grid w-full max-w-md items-center gap-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="admin@glimmora.org" />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button>Update Profile</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Manage your password. Leave fields blank to keep current password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid w-full max-w-md items-center gap-1.5">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="••••••••" />
            </div>
            <div className="grid w-full max-w-md items-center gap-1.5">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="••••••••" />
            </div>
             <div className="grid w-full max-w-md items-center gap-1.5">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button>Update Password</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
