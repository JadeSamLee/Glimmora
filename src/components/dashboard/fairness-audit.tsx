'use client';

import { ensureFairAidDistribution, type EnsureFairAidDistributionOutput } from '@/ai/flows/ensure-fair-aid-distribution';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck, ThumbsUp, AlertTriangle } from 'lucide-react';
import React, { useState } from 'react';

const FairnessAudit = () => {
  const [aidData, setAidData] = useState('');
  const [gdprPolicies, setGdprPolicies] = useState('');
  const [result, setResult] = useState<EnsureFairAidDistributionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const mockAidDataPlaceholder = JSON.stringify(
    [
      { "recipientId": "R1023", "age": 34, "gender": "Female", "ethnicity": "Tamil", "location": "Puzhal Lake Camp", "aidPackage": ["food", "water", "hygiene_kit"], "date": "2024-07-28" },
      { "recipientId": "R1024", "age": 45, "gender": "Male", "ethnicity": "Telugu", "location": "Manjampakkam", "aidPackage": ["food", "shelter_materials"], "date": "2024-07-28" },
      { "recipientId": "R1025", "age": 28, "gender": "Female", "ethnicity": "Tamil", "location": "Puzhal Lake Camp", "aidPackage": ["medical_supplies"], "date": "2024-07-29" },
      { "recipientId": "R1026", "age": 67, "gender": "Male", "ethnicity": "Kannada", "location": "Retteri", "aidPackage": ["food", "water"], "date": "2024-07-29" }
    ],
    null,
    2
  );

  const mockGdprPlaceholder = JSON.stringify(
    {
      "dataMinimization": true,
      "purposeLimitation": "humanitarian_aid_distribution",
      "dataRetentionPeriodDays": 90,
      "consentRequired": true,
      "anonymizeLocationData": true,
      "prohibitedBiasFactors": ["ethnicity", "gender"]
    },
    null,
    2
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aidData || !gdprPolicies) {
      toast({
        title: 'Input Required',
        description: 'Please provide both aid distribution data and GDPR policies.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setResult(null);
    try {
      const auditResult = await ensureFairAidDistribution({ aidData, gdprPolicies });
      setResult(auditResult);
    } catch (error) {
      console.error('Error in fairness audit:', error);
      toast({
        title: 'Audit Failed',
        description: 'An error occurred during the fairness audit.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>New Audit</CardTitle>
        <CardDescription>Enter data to start a new fairness audit.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="aid-data">Aid Distribution Data (JSON)</Label>
            <Textarea
              id="aid-data"
              placeholder={mockAidDataPlaceholder}
              value={aidData}
              onChange={(e) => setAidData(e.target.value)}
              rows={8}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gdpr-policies">GDPR Policies (JSON)</Label>
            <Textarea
              id="gdpr-policies"
              placeholder={mockGdprPlaceholder}
              value={gdprPolicies}
              onChange={(e) => setGdprPolicies(e.target.value)}
              rows={8}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Auditing...
              </>
            ) : (
              'Run Fairness Audit'
            )}
          </Button>
        </form>
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2 pt-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Running adversarial AI audit...</p>
          </div>
        )}
      </CardContent>
      {result && (
        <CardFooter className="flex-col !items-start gap-4">
          <div className="w-full space-y-4">
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2"><ThumbsUp className="h-5 w-5 text-green-500" /> Fairness Assessment</h4>
                <p className="text-sm text-muted-foreground p-3 bg-secondary/50 rounded-md">{result.fairnessAssessment}</p>
              </div>
               <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2"><AlertTriangle className="h-5 w-5 text-yellow-500" /> Recommendations</h4>
                <p className="text-sm text-muted-foreground p-3 bg-secondary/50 rounded-md">{result.recommendations}</p>
              </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default FairnessAudit;
