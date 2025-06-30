import FairnessAudit from '@/components/dashboard/fairness-audit';
import { ShieldCheck } from 'lucide-react';

export default function FairnessAuditPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
            <ShieldCheck className="h-7 w-7 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold font-headline">AI Fairness & Ethics Audit</h1>
            <p className="text-muted-foreground">Ensure equitable and GDPR-compliant aid distribution.</p>
        </div>
      </div>
      <FairnessAudit />
    </div>
  );
}
