'use client';

import { offlineVoiceChatbot } from '@/ai/flows/offline-voice-chatbot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MessageCircle, Send, Volume2 } from 'lucide-react';
import React, { useState } from 'react';

const VoiceChatbot = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      toast({
        title: 'Query Required',
        description: 'Please enter a question or phrase.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setAudioUrl(null);
    try {
      const result = await offlineVoiceChatbot({ query, language });
      setAudioUrl(result.media);
    } catch (error) {
      console.error('Error with voice chatbot:', error);
      toast({
        title: 'Chatbot Failed',
        description: 'An error occurred while generating a response.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Get Audio Response</CardTitle>
        <CardDescription>Enter a query to generate a spoken response.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="query">Your Question</Label>
            <Input
              id="query"
              placeholder="e.g., 'Where is the nearest medical center?'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">Arabic (العربية)</SelectItem>
                <SelectItem value="uk">Ukrainian (Українська)</SelectItem>
                <SelectItem value="es">Spanish (Español)</SelectItem>
                <SelectItem value="fr">French (Français)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Get Audio Response
              </>
            )}
          </Button>
        </form>
        {(isLoading || audioUrl) && (
            <div className='pt-6'>
                <div className="w-full h-px bg-border my-4" />
                {isLoading && (
                <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p>Generating audio response...</p>
                </div>
                )}
                {audioUrl && (
                <div className="mt-4 space-y-2 flex flex-col items-center">
                    <Volume2 className="h-10 w-10 text-primary mb-2" />
                    <p className="text-sm font-semibold text-center">Your audio response is ready.</p>
                    <audio controls src={audioUrl} className="w-full">
                    Your browser does not support the audio element.
                    </audio>
                </div>
                )}
            </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceChatbot;
