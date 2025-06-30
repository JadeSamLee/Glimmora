import EeveeChatbot from '@/components/dashboard/eevee-chatbot';
import { MessageCircle } from 'lucide-react';

export default function EeveeChatbotPage() {
  return (
    <div className="space-y-8">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
                <MessageCircle className="h-7 w-7 text-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold font-headline">Eevee Chatbot</h1>
                <p className="text-muted-foreground">Multilingual assistance for refugees, even without internet.</p>
            </div>
        </div>
      <EeveeChatbot />
    </div>
  );
}
