import NeedsPrediction from '@/components/dashboard/needs-prediction';
import { BrainCircuit } from 'lucide-react';

export default function NeedsPredictionPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
            <BrainCircuit className="h-7 w-7 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold font-headline">AI-Powered Needs Prediction</h1>
            <p className="text-muted-foreground">Analyze real-time data to forecast refugee needs.</p>
        </div>
      </div>
      <NeedsPrediction />
    </div>
  );
}
