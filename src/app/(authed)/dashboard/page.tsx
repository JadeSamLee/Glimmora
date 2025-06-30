import StatCards from '@/components/dashboard/stat-cards';
import { LayoutDashboard } from 'lucide-react';
import DashboardGraphs from '@/components/dashboard/dashboard-graphs';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
            <LayoutDashboard className="h-7 w-7 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
            <p className="text-muted-foreground">An overview of the current relief situation.</p>
        </div>
      </div>
      <StatCards />
      <DashboardGraphs />
    </div>
  );
}
