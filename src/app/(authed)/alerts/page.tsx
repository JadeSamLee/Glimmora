import AlertsLog from '@/components/dashboard/alerts-log';
import { Siren } from 'lucide-react';

export default function AlertsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
            <Siren className="h-7 w-7 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold font-headline">Volunteer Alert Log</h1>
            <p className="text-muted-foreground">A real-time log of all alerts sent to volunteers.</p>
        </div>
      </div>
      <AlertsLog />
    </div>
  );
}
