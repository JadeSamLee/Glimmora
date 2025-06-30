import AidCoordination from '@/components/dashboard/aid-coordination';
import { Truck } from 'lucide-react';

export default function AidCoordinationPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
            <Truck className="h-7 w-7 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold font-headline">Aid Coordination</h1>
            <p className="text-muted-foreground">Live status of AI-optimized aid deliveries.</p>
        </div>
      </div>
      <AidCoordination />
    </div>
  );
}
