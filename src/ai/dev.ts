import { config } from 'dotenv';
config();

import '@/ai/flows/ensure-fair-aid-distribution.ts';
import '@/ai/flows/predict-refugee-needs.ts';
import '@/ai/flows/map-refugee-clusters.ts';
import '@/ai/flows/eevee-chatbot.ts';
