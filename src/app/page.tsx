import { GlimmoraLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Map, ShieldCheck, MessageCircle, Truck, Siren } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const features = [
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      title: 'Predictive Needs Analysis',
      description: 'Leverage AI to analyze real-time data from social media and news to accurately forecast refugee needs for food, shelter, and medical supplies.',
    },
    {
      icon: <Map className="h-8 w-8 text-primary" />,
      title: 'Real-Time Mapping',
      description: 'Visualize refugee clusters, aid delivery points, and critical incidents on a live map, enabling efficient resource allocation and coordination.',
    },
     {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: 'AI Aid Coordination',
      description: 'Our AI swarm optimizes aid delivery routes and schedules, ensuring that critical supplies reach their destinations as quickly as possible.',
    },
    {
      icon: <Siren className="h-8 w-8 text-primary" />,
      title: 'Automated Volunteer Alerts',
      description: 'Instantly notify volunteers about critical needs and logistical changes, ensuring a rapid and coordinated response on the ground.',
    },
     {
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      title: 'Offline Voice Chatbot',
      description: 'Eevee, our multilingual chatbot, provides crucial information to refugees, even without an internet connection, breaking down communication barriers.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: 'Ethical & Fair Distribution',
      description: 'Utilize an adversarial AI to continuously audit aid distribution, ensuring fairness, equity, and GDPR compliance in all relief operations.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <GlimmoraLogo />
            <span className="font-headline font-semibold text-lg text-foreground">Glimmora</span>
          </Link>
          <nav>
            <Button asChild>
              <Link href="/login">Admin Login</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid lg:grid-cols-2 lg:gap-10 items-center py-12 md:py-24 lg:py-32">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
              AI for Humanity:
              <br />
              <span className="text-primary">Rapid Relief, Reimagined.</span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
              Glimmora is a groundbreaking platform for humanitarian aid, predicting refugee needs, mapping locations in real-time, and coordinating aid via an autonomous AI swarm.
            </p>
            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center lg:justify-start">
              <Button asChild size="lg">
                <Link href="/dashboard">View Live Dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-auto w-full max-w-[300px] text-primary drop-shadow-[0_5px_15px_hsl(var(--primary)/0.2)]"
            >
              <title>Peace Icon</title>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="12" y1="12" x2="7" y2="17" />
              <line x1="12" y1="12" x2="17" y2="17" />
            </svg>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/40">
            <div className="container space-y-12 px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Complete AI Ecosystem for Crisis Response</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            From initial data analysis to final delivery, Glimmora provides a suite of powerful AI tools designed to maximize the impact of humanitarian relief efforts.
                        </p>
                    </div>
                 </div>
                 <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card key={index} className="p-2 flex flex-col">
                            <CardHeader>
                                {feature.icon}
                                <CardTitle className="mt-4">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by the Glimmora Team. © {new Date().getFullYear()} All rights reserved.
            </p>
        </div>
      </footer>
    </div>
  );
}
