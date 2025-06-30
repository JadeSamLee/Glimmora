'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { alertsData } from '@/lib/data';
import { AlertTriangle, ShieldCheck, Truck, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const initialStats = [
  {
    title: 'Population Affected',
    icon: Users,
    value: 125340,
    change: '+1.2K today',
    color: 'text-blue-500',
  },
  {
    title: 'Active Deliveries',
    icon: Truck,
    value: alertsData.filter(a => a.status === 'Sent' || a.status === 'Queued').length,
    change: '3 completed',
    color: 'text-green-500',
  },
  {
    title: 'Critical Needs Alerts',
    icon: AlertTriangle,
    value: alertsData.length,
    change: `${alertsData.filter(a => a.time.includes('m')).length} in last hour`,
    color: 'text-yellow-500',
  },
  {
    title: 'Fairness Score',
    icon: ShieldCheck,
    value: 98.7,
    unit: '%',
    change: 'Stable',
    color: 'text-accent',
  },
];

const StatCards = () => {
    const [stats, setStats] = useState(initialStats);
    const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

    useEffect(() => {
        const timers = stats.map((stat, index) => {
            const duration = 1500;
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                
                let currentValue;
                if (stat.unit) {
                    currentValue = easedProgress * stat.value;
                    if (currentValue < 1) {
                         currentValue = parseFloat(currentValue.toFixed(1));
                    } else {
                         currentValue = Math.floor(currentValue * 10) / 10;
                    }
                } else {
                    currentValue = Math.ceil(easedProgress * stat.value);
                }

                setAnimatedStats(prev => {
                    const newStats = [...prev];
                    newStats[index] = currentValue;
                    return newStats;
                });

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                     setAnimatedStats(prev => {
                        const newStats = [...prev];
                        newStats[index] = stat.value;
                        return newStats;
                    });
                }
            };
            const timer = setTimeout(() => requestAnimationFrame(animate), index * 100);
            return timer;
        });
        return () => timers.forEach(clearTimeout);
    }, [stats]);


  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="transition-all hover:shadow-md hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {stat.unit ? animatedStats[index] : animatedStats[index].toLocaleString()}{stat.unit}
            </div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatCards;
