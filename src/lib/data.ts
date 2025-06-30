// This file contains data to simulate a live environment for demonstration purposes.

import { Bell, Droplets, Utensils, Home, TriangleAlert, Ambulance } from 'lucide-react';

export const socialMediaData = `
- "Puzhal Lake camp needs immediate medical supplies. Fever spreading quickly among children." #ChennaiRelief @relief_orgs (geoloc: 13.15, 80.20)
- "Monsoon flooding has isolated the Manjampakkam settlement. We need food and clean water urgently." #ChennaiFloods (geoloc: 13.15, 80.24)
- "Just reached Madhavaram with my family. We have nothing. Need shelter." #refugeehelp (geoloc: 13.14, 80.23)
- "Major traffic jam on GNT Road is blocking aid trucks. Avoid the area." #ChennaiTraffic #emergency (geoloc: 13.16, 80.22)
`;

export const newsData = `
**Chennai Monsoon Crisis: Aid Efforts Overwhelmed**
As monsoon rains batter the city, humanitarian agencies are in a race against time. Displaced populations in informal settlements like Puzhal and Manjampakkam are facing dire conditions. Reports indicate severe shortages of medical supplies and potable water.

**Logistical Nightmare as Flooding Halts Aid**
Key arterial roads, including the Grand Northern Trunk Road, are experiencing major blockages due to flooding and traffic, severely hampering relief operations. Aid convoys are struggling to reach distribution points, and officials are exploring alternative routes to get supplies to those in need.
`;

export const mapData = {
  realTimeData: `
    - Hub: Central Aid Hub at Madhavaram (geoloc: 13.14, 80.23)
    - Cluster: Puzhal Lake Refugee Camp, high population density, 9500 population (geoloc: 13.15, 80.20)
    - Cluster: Naravarikuppam Settlement, sanitation issues reported, 7200 population (geoloc: 13.16, 80.21)
    - Delivery Point: Manjampakkam Aid Station, serving new arrivals (geoloc: 13.15, 80.24)
    - Delivery Point: Retteri Relief Point, serving southern areas (geoloc: 13.13, 80.22)
    - Incident: GNT Road Blockage (geoloc: 13.16, 80.22)
    `,
};

export const alertsData = [
  { id: 'AL-001', type: 'Medical', destination: 'Puzhal Lake Camp', details: 'Urgent need for fever medication and antibiotics.', status: 'Sent', time: '2m ago', icon: Ambulance, color: 'text-red-500' },
  { id: 'AL-002', type: 'Food & Water', destination: 'Manjampakkam', details: 'Dispatching emergency food and clean water for 5000 people.', status: 'Sent', time: '5m ago', icon: Utensils, color: 'text-green-500' },
  { id: 'AL-003', type: 'Logistics', destination: 'All Volunteers', details: 'GNT Road is blocked. All convoys must reroute via Madhavaram bypass.', status: 'Sent', time: '8m ago', icon: TriangleAlert, color: 'text-yellow-500' },
  { id: 'AL-004', type: 'Shelter', destination: 'Madhavaram', details: 'Preparing initial aid package with shelter kits for 150 new arrivals.', status: 'Sent', time: '12m ago', icon: Home, color: 'text-blue-500' },
  { id: 'AL-005', type: 'Water', destination: 'Naravarikuppam', details: 'Airdrop of water purification tablets scheduled for 16:00.', status: 'Queued', time: '1m ago', icon: Droplets, color: 'text-cyan-500' },
];

export const deliveriesData = [
    { id: 'AD-001', destination: 'Puzhal Lake Camp', contents: ['Food', 'Medical'], status: 'In-Transit', eta: '35m' },
    { id: 'AD-002', destination: 'Madhavaram Station', contents: ['Shelter Kits'], status: 'In-Transit', eta: '55m' },
    { id: 'AD-003', destination: 'Retteri Relief Point', contents: ['Water', 'Food'], status: 'Delivered', eta: '-' },
    { id: 'AD-004', destination: 'Manjampakkam', contents: ['Food'], status: 'Delayed', eta: '3h (Rerouted)' },
];
