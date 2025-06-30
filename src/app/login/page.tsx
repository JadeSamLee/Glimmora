
import { GlimmoraLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <GlimmoraLogo className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl font-headline">Welcome, Admin</CardTitle>
          <CardDescription>Enter your credentials to access the relief dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@glimmora.org"
                defaultValue="admin@glimmora.org"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" tabIndex={-1} className="ml-auto inline-block text-sm underline opacity-50 cursor-not-allowed">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" defaultValue="password" required />
            </div>
            <Button asChild className="w-full">
              <Link href="/dashboard">Login</Link>
            </Button>
          </div>
           <div className="mt-4 text-center text-sm text-muted-foreground">
            Use <code className='font-semibold'>admin@glimmora.org</code> and any password to log in.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
