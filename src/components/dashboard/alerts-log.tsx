'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { alertsData } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface AlertsLogProps {
  dashboardMode?: boolean;
}

const AlertsLog = ({ dashboardMode = false }: AlertsLogProps) => {
  const alertsToShow = dashboardMode ? alertsData.slice(0, 4) : alertsData;

  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn(dashboardMode ? 'text-xl' : '')}>Alerts Log</CardTitle>
        {!dashboardMode && <CardDescription>A log of all alerts dispatched to volunteers.</CardDescription>}
      </CardHeader>
      <CardContent>
        <ScrollArea className={cn(dashboardMode ? 'h-auto' : 'h-[60vh]')}>
          <Table>
            {!dashboardMode && (
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {alertsToShow.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                       <alert.icon className={cn('h-5 w-5', alert.color)} />
                       <div>
                         {alert.type}
                         {dashboardMode && <p className="text-xs text-muted-foreground font-normal">{alert.destination}</p>}
                       </div>
                    </div>
                  </TableCell>
                  {!dashboardMode && <TableCell>{alert.destination}</TableCell>}
                  <TableCell className="text-xs text-muted-foreground">{alert.details}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={alert.status === 'Sent' ? 'default' : 'secondary'} className={cn(alert.status === 'Queued' && 'bg-yellow-400/20 text-yellow-600')}>
                      {alert.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AlertsLog;
