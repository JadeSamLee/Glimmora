'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, Truck } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { deliveriesData } from '@/lib/data';
import { Button } from '../ui/button';
import Link from 'next/link';

type DeliveryStatus = 'Queued' | 'In-Transit' | 'Delivered' | 'Delayed';

interface AidDelivery {
  id: string;
  destination: string;
  contents: string[];
  status: DeliveryStatus;
  eta: string;
}

const statusConfig: Record<DeliveryStatus, { color: string; icon: React.ElementType }> = {
  Queued: { color: 'bg-gray-400/20 text-gray-600', icon: Clock },
  'In-Transit': { color: 'bg-blue-400/20 text-blue-600 animate-pulse', icon: Truck },
  Delivered: { color: 'bg-green-400/20 text-green-600', icon: CheckCircle },
  Delayed: { color: 'bg-red-400/20 text-red-600', icon: AlertCircle },
};

const AidCoordination = () => {
  const [deliveries, setDeliveries] = React.useState<AidDelivery[]>(deliveriesData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Deliveries</CardTitle>
        <CardDescription>Live status of AI-optimized aid deliveries.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Contents</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.length > 0 ? (
                deliveries.map((delivery) => {
                  const config = statusConfig[delivery.status];
                  return (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-medium">{delivery.id}</TableCell>
                      <TableCell>{delivery.destination}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {delivery.contents.map((item) => (
                            <Badge key={item} variant="secondary" className="font-normal">{item}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{delivery.eta}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className={cn('border-none gap-1.5', config.color)}>
                          <config.icon className="h-3.5 w-3.5" />
                          {delivery.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">No active deliveries.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className='justify-end'>
          <Button asChild variant="outline">
              <Link href="/alerts">View Alert Log</Link>
          </Button>
      </CardFooter>
    </Card>
  );
};

export default AidCoordination;
