import MapView from '@/components/dashboard/map-view';
import { Map as MapIcon } from 'lucide-react';

export default function RealTimeMapPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
            <MapIcon className="h-7 w-7 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold font-headline">Real-Time Relief Map</h1>
            <p className="text-muted-foreground">Identify and map refugee clusters from live data in Chennai.</p>
        </div>
      </div>
      <MapView />
    </div>
  );
}
