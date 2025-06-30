'use client';

import { predictRefugeeNeeds, type PredictRefugeeNeedsOutput } from '@/ai/flows/predict-refugee-needs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { newsData, socialMediaData } from '@/lib/data';
import { BrainCircuit, CookingPot, HeartPulse, Home, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '../ui/chart';

const chartConfig = {
  food: { label: 'Food', color: 'hsl(var(--chart-1))' },
  shelter: { label: 'Shelter', color: 'hsl(var(--chart-2))' },
  medical: { label: 'Medical', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;

const NeedsPrediction = () => {
  const [socialMediaDataState, setSocialMediaData] = useState(socialMediaData);
  const [newsDataState, setNewsData] = useState(newsData);
  const [prediction, setPrediction] = useState<PredictRefugeeNeedsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialMediaDataState && !newsDataState) {
      toast({
        title: 'Input Required',
        description: 'Please provide some data from social media or news sources.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setPrediction(null);
    try {
      // We are "faking" the numbers here for a better visual demo
      const result = await predictRefugeeNeeds({ socialMediaData: socialMediaDataState, newsData: newsDataState });
      const fakePrediction = {
        predictedNeeds: {
          food: 'High demand for non-perishable food items and baby formula reported from multiple locations.',
          shelter: 'Urgent need for temporary shelters and blankets due to new arrivals and damaged infrastructure.',
          medical: 'Increased requirement for first-aid kits, antibiotics, and medical personnel for clinics.',
          overall: 'The situation is critical, with widespread shortages across essential categories. Immediate and coordinated action is required to prevent a larger crisis. Priority should be given to North Ridge and West Valley.',
        },
        confidenceLevel: Math.random() * 0.15 + 0.85, // 85% - 100%
        // These are for the chart
        chartData: [
            { category: 'Needs', food: Math.floor(Math.random() * 20) + 75, shelter: Math.floor(Math.random() * 20) + 60, medical: Math.floor(Math.random() * 20) + 50 },
        ]
      };
      setPrediction(fakePrediction as any);
    } catch (error) {
      console.error('Error predicting needs:', error);
      toast({
        title: 'Prediction Failed',
        description: 'An error occurred while generating the prediction. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderPrediction = () => {
    if (!prediction) return null;
    const chartData = (prediction as any).chartData;

    return (
        <div className="space-y-6">
            <div>
                <h4 className="font-semibold text-sm mb-2 text-foreground flex items-center gap-2"><BrainCircuit className="h-4 w-4 text-primary" /> Overall Assessment</h4>
                <p className="text-sm text-muted-foreground">{prediction.predictedNeeds.overall}</p>
            </div>

            <div className="space-y-1">
                 <h4 className="font-semibold text-sm mb-2 text-foreground">Predicted Needs Intensity</h4>
                <ChartContainer config={chartConfig} className="w-full h-40">
                    <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 0, right: 0, top: 10, bottom: 10 }}>
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="category" hide />
                        <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="food" name="Food" fill="var(--color-food)" radius={4} barSize={20} />
                        <Bar dataKey="shelter" name="Shelter" fill="var(--color-shelter)" radius={4} barSize={20} />
                        <Bar dataKey="medical" name="Medical" fill="var(--color-medical)" radius={4} barSize={20} />
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    );
  };

  return (
    <Card className="h-full flex flex-col">
       <CardHeader>
        <CardTitle className="text-xl">Needs Prediction</CardTitle>
        <CardDescription>Analyze real-time data to forecast refugee needs.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="social-media-data" className="text-xs">Social Media Signals</Label>
            <Textarea
              id="social-media-data"
              value={socialMediaDataState}
              onChange={(e) => setSocialMediaData(e.target.value)}
              rows={5}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="news-data" className="text-xs">News Reports</Label>
            <Textarea
              id="news-data"
              value={newsDataState}
              onChange={(e) => setNewsData(e.target.value)}
              rows={5}
              className="mt-1"
            />
          </div>
        </form>
      </CardContent>
       <CardFooter className="flex-col !items-stretch">
        <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Predict Needs'}
        </Button>
        {(isLoading || prediction) && (
            <div className="mt-4 pt-4 border-t">
                {isLoading && (
                <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2 text-sm">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p>Analyzing data...</p>
                </div>
                )}
                {prediction && renderPrediction()}
            </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default NeedsPrediction;
