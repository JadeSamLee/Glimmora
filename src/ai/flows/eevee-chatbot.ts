'use server';

/**
 * @fileOverview Eevee, a multilingual voice chatbot for refugees.
 *
 * - eeveeChatbot - A function that provides assistance via a voice chatbot.
 * - EeveeChatbotInput - The input type for the eeveeChatbot function.
 * - EeveeChatbotOutput - The return type for the eeveeChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const EeveeChatbotInputSchema = z.object({
  query: z.string().describe('The query from the user.'),
  language: z.string().describe('The language of the query (e.g., "en", "ar", "uk").'),
});
export type EeveeChatbotInput = z.infer<typeof EeveeChatbotInputSchema>;

const EeveeChatbotOutputSchema = z.object({
  media: z.string().describe('The audio response from the chatbot in WAV format.'),
});
export type EeveeChatbotOutput = z.infer<typeof EeveeChatbotOutputSchema>;

export async function eeveeChatbot(input: EeveeChatbotInput): Promise<EeveeChatbotOutput> {
  return eeveeChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'eeveeChatbotPrompt',
  system: `You are Eevee, a helpful and empathetic AI assistant for Glimmora Rapid Relief. Your primary role is to provide clear and reassuring information to people affected by the crisis in Chennai.

  Current key information:
  - The main aid hub is at Madhavaram.
  - Medical aid is available at Puzhal Lake Camp.
  - Food and water are being distributed at Manjampakkam Aid Station and Retteri Relief Point.
  - Please advise people to avoid GNT Road due to blockages.

  When a user asks a question, first, understand their intent. Then, provide a helpful and concise answer based on the information above. The response should be in the user's specified language. Keep the response short and easy to understand for audio playback.`,
  input: { schema: EeveeChatbotInputSchema },
  output: { schema: z.object({ response: z.string().describe('A helpful, concise response in the specified language.') }) },
  prompt: `User Query: {{{query}}}\nLanguage: {{{language}}}`,
});


const eeveeChatbotFlow = ai.defineFlow(
  {
    name: 'eeveeChatbotFlow',
    inputSchema: EeveeChatbotInputSchema,
    outputSchema: EeveeChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    const textToSpeak = output!.response;

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Algenib'},
          },
        },
      },
      prompt: textToSpeak,
    });

    if (!media) {
      throw new Error('no media returned');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavDataUri = 'data:audio/wav;base64,' + (await toWav(audioBuffer));

    return {media: wavDataUri};
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
