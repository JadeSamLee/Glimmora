'use client';

import { mapRefugeeClusters, type GeoJSONFeatureCollection, type MapRefugeeClustersOutput } from '@/ai/flows/map-refugee-clusters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { mapData } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Loader2, MapPin, Users, LifeBuoy, ServerCrash, Home as HomeIcon, ZoomIn, ZoomOut, Route } from 'lucide-react';
import React, { useState, useMemo, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';

type FeatureType = 'refugee_cluster' | 'aid_delivery_point' | 'critical_incident' | 'aid_hub';
type Feature = GeoJSONFeatureCollection['features'][0];

const pointTypeConfig: Record<FeatureType, { icon: React.ElementType; color: string; label: string }> = {
    refugee_cluster: { icon: Users, color: 'text-accent', label: 'Refugee Cluster' },
    aid_delivery_point: { icon: LifeBuoy, color: 'text-green-500', label: 'Aid Delivery' },
    critical_incident: { icon: ServerCrash, color: 'text-red-500', label: 'Critical Incident' },
    aid_hub: { icon: HomeIcon, color: 'text-blue-500', label: 'Aid Hub' }
};

// Dijkstra's Algorithm to find the shortest path
const dijkstra = (graph: Record<string, Record<string, number>>, startNode: string, endNode: string) => {
    const distances: Record<string, number> = {};
    const prev: Record<string, string | null> = {};
    const pq = new Set<string>();

    for (const node in graph) {
        distances[node] = Infinity;
        prev[node] = null;
        pq.add(node);
    }

    distances[startNode] = 0;

    while (pq.size > 0) {
        let closestNode = Array.from(pq).reduce((acc, node) => (distances[node] < distances[acc] ? node : acc));
        
        if (closestNode === endNode) break;
        
        pq.delete(closestNode);

        if (distances[closestNode] === Infinity) break;

        for (const neighbor in graph[closestNode]) {
            const newDist = distances[closestNode] + graph[closestNode][neighbor];
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                prev[neighbor] = closestNode;
            }
        }
    }

    const path = [];
    let currentNode: string | null = endNode;
    while (currentNode) {
        path.unshift(currentNode);
        currentNode = prev[currentNode];
    }
    
    return path[0] === startNode ? path : [];
};

const MapView = () => {
    const [clusters, setClusters] = useState<MapRefugeeClustersOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [visibleTypes, setVisibleTypes] = useState<Record<FeatureType, boolean>>({
        refugee_cluster: true,
        aid_delivery_point: true,
        critical_incident: true,
        aid_hub: true,
    });
    const [zoom, setZoom] = useState(1);
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
    const [shortestPath, setShortestPath] = useState<string[]>([]);
    const [totalDistance, setTotalDistance] = useState(0);

    const nodeCoordinates: Record<string, { x: number, y: number }> = {
        'A': { x: 28, y: 40 }, // Puzhal Lake Camp
        'B': { x: 45, y: 25 }, // Naravarikuppam
        'C': { x: 70, y: 55 }, // Manjampakkam
        'D': { x: 60, y: 80 }, // Retteri
        'E': { x: 80, y: 85 }, // Madhavaram (Aid Hub)
        'F': { x: 50, y: 45 }, // GNT Road Blockage Area
        'G': { x: 48, y: 65 }, // Intersection 1
        'H': { x: 68, y: 35 }, // Intersection 2
        'I': { x: 80, y: 50 }, // Intersection 3
    };

    const graph: Record<string, Record<string, number>> = {
        'A': { 'B': 5, 'G': 6 },
        'B': { 'A': 5, 'H': 4, 'F': 8 }, // Higher cost through blockage area
        'C': { 'H': 3, 'I': 2 },
        'D': { 'G': 2, 'E': 3 },
        'E': { 'D': 3, 'I': 4 },
        'F': { 'B': 8, 'G': 9, 'H': 10 },
        'G': { 'A': 6, 'D': 2, 'F': 9 },
        'H': { 'B': 4, 'C': 3, 'F': 10, 'I': 5 },
        'I': { 'C': 2, 'H': 5, 'E': 4 },
    };

    const featureNodeMap: Record<string, string> = {
        "Puzhal Lake Refugee Camp": 'A',
        "Naravarikuppam Settlement": 'B',
        "Manjampakkam Aid Station": 'C',
        "Retteri Relief Point": 'D',
        "Central Aid Hub at Madhavaram": 'E',
        "GNT Road Blockage": 'F',
    };

    const calculatePath = useCallback((startNode: string, endNode: string) => {
        if (startNode && endNode && startNode !== endNode) {
            const path = dijkstra(graph, startNode, endNode);
            setShortestPath(path);
            let distance = 0;
            for (let i = 0; i < path.length - 1; i++) {
                distance += graph[path[i]][path[i+1]];
            }
            setTotalDistance(distance);
        } else {
            setShortestPath([]);
            setTotalDistance(0);
        }
    }, []);

    const handlePinClick = useCallback((feature: Feature) => {
        setSelectedFeature(feature);
        const startNode = featureNodeMap[feature.properties.name];
        const endNode = 'E'; // Aid Hub
        calculatePath(startNode, endNode);
    }, [calculatePath]);

    const runAnalysis = useCallback(async () => {
        setIsLoading(true);
        setClusters(null);
        setShortestPath([]);
        setSelectedFeature(null);
        try {
            const result = await mapRefugeeClusters({ realTimeData: mapData.realTimeData });
            setClusters(result);
        } catch (error) {
            console.error('Error mapping clusters:', error);
            toast({
                title: 'Mapping Failed',
                description: 'An error occurred while mapping clusters.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);
    
    React.useEffect(() => {
        runAnalysis();
    }, [runAnalysis]);
    
    const filteredFeatures = useMemo(() => {
        if (!clusters) return [];
        return clusters.features.filter(feature => visibleTypes[feature.properties.type as FeatureType]);
    }, [clusters, visibleTypes]);

    const getCoords = (feature: Feature) => {
        const lonMin = 80.18;
        const lonMax = 80.25;
        const latMin = 13.12;
        const latMax = 13.18;
        return {
            x: ((feature.geometry.coordinates[0] - lonMin) / (lonMax - lonMin)) * 100,
            y: ((-feature.geometry.coordinates[1] + latMax) / (latMax - latMin)) * 100
        };
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className='text-xl'>Real-Time Map</CardTitle>
                <CardDescription>Visualizing refugee clusters, incidents, and aid routes in Chennai.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div className="flex flex-wrap items-center gap-4 px-1 py-2 mb-2 border-y">
                    <h4 className="text-sm font-semibold shrink-0">Map Layers:</h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        {Object.entries(pointTypeConfig).map(([type, config]) => (
                            <div key={type} className="flex items-center space-x-2">
                                <Checkbox id={type} checked={visibleTypes[type as FeatureType]} onCheckedChange={() => setVisibleTypes(p => ({...p, [type]: !p[type]}))} className="border-primary data-[state=checked]:bg-primary" />
                                <Label htmlFor={type} className="flex items-center gap-1.5 text-sm font-medium cursor-pointer"><config.icon className={cn("h-4 w-4", config.color)} /> {config.label}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative w-full aspect-video rounded-lg mt-4 border overflow-hidden bg-gray-100 dark:bg-gray-800/50">
                    <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
                        <Button size="icon" className="h-8 w-8" onClick={() => setZoom(z => Math.min(z + 0.2, 2.5))}><ZoomIn className="h-4 w-4" /></Button>
                        <Button size="icon" className="h-8 w-8" onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}><ZoomOut className="h-4 w-4" /></Button>
                    </div>

                    <div className="absolute inset-0 transition-transform duration-300" style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}>
                         {/* Map Background */}
                        <div className="absolute inset-0 z-0">
                            {/* Roads */}
                            <div className="absolute top-[30%] left-0 w-full h-1 bg-gray-300/70 dark:bg-gray-700/50 -skew-y-[5deg]"></div>
                            <div className="absolute top-[68%] left-0 w-[50%] h-1 bg-gray-300/70 dark:bg-gray-700/50 skew-y-[8deg]"></div>
                            <div className="absolute top-0 left-[20%] w-1 h-full bg-gray-300/70 dark:bg-gray-700/50 -skew-x-[20deg]"></div>
                            <div className="absolute top-0 left-[48%] w-1 h-[70%] bg-gray-300/70 dark:bg-gray-700/50 skew-x-[10deg]"></div>
                            <div className="absolute top-[50%] right-0 w-[40%] h-1 bg-gray-300/70 dark:bg-gray-700/50 -skew-y-[15deg]"></div>
                            <div className="absolute top-0 right-[25%] w-1 h-full bg-gray-300/70 dark:bg-gray-700/50 skew-x-[30deg]"></div>
                            
                            {/* Lakes */}
                            <div className="absolute top-[10%] left-[2%] w-[35%] h-[70%] bg-blue-200/50 dark:bg-blue-900/50 rounded-tr-[50%] rounded-br-[10%] rounded-bl-[40%] rounded-tl-[20%] -skew-y-6 flex items-center justify-center text-blue-900/30 dark:text-blue-200/30 text-xs font-semibold -rotate-12">Puzhal Lake</div>
                            <div className="absolute top-[60%] left-[45%] w-[20%] h-[30%] bg-blue-200/50 dark:bg-blue-900/50 rounded-[50%] skew-x-12 flex items-center justify-center text-blue-900/30 dark:text-blue-200/30 text-xs font-semibold">Retteri Lake</div>
                            
                            {/* Area Labels */}
                            <div className="absolute top-[15%] left-[45%] text-[8px] text-muted-foreground font-bold uppercase">Naravarikuppam</div>
                            <div className="absolute top-[45%] left-[65%] text-[8px] text-muted-foreground font-bold uppercase">Manjampakkam</div>
                            <div className="absolute top-[75%] left-[70%] text-[8px] text-muted-foreground font-bold uppercase">Madhavaram</div>
                            <div className="absolute top-[15%] right-[5%] text-[8px] text-muted-foreground font-bold uppercase">Mathur</div>
                        </div>

                        {/* Path SVG */}
                        {shortestPath.length > 1 && (
                            <svg className="absolute inset-0 z-10 pointer-events-none">
                                <polyline
                                    points={shortestPath.map(node => `${nodeCoordinates[node].x},${nodeCoordinates[node].y}`).join(' ')}
                                    fill="none"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={1.5 / zoom}
                                    strokeDasharray={`${2 / zoom},${1 / zoom}`}
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap="round"
                                />
                            </svg>
                        )}
                        
                        {/* Pins Layer */}
                        <div className="absolute inset-0 z-20">
                            {filteredFeatures.map((feature, index) => {
                                const {x, y} = getCoords(feature);
                                const config = pointTypeConfig[feature.properties.type as FeatureType] || pointTypeConfig.critical_incident;
                                return (
                                    <TooltipProvider key={index}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    onClick={() => handlePinClick(feature)}
                                                    className="absolute -translate-x-1/2 -translate-y-1/2"
                                                    style={{ left: `${x}%`, top: `${y}%` }}
                                                >
                                                    <MapPin className={cn("h-7 w-7 drop-shadow-lg", config.color, selectedFeature?.properties.name === feature.properties.name && "fill-current opacity-100 scale-125")} />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className='font-bold'>{feature.properties.name}</p>
                                                <p className='text-xs'>{feature.properties.description}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                );
                            })}
                        </div>
                    </div>
                     {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg z-30">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="mt-2 text-sm text-foreground">Analyzing data...</p>
                        </div>
                    )}
                </div>
                {selectedFeature && shortestPath.length > 0 && (
                    <div className="mt-4 p-3 border rounded-lg bg-secondary/50 text-sm">
                        <h4 className="font-semibold flex items-center gap-2"><Route className="h-4 w-4 text-primary" /> Shortest Route to Aid Hub</h4>
                        <p className="mt-1 text-muted-foreground">From: <span className="font-medium text-foreground">{selectedFeature.properties.name}</span></p>
                        <p className="text-muted-foreground">Path: <span className="font-medium text-foreground">{shortestPath.join(' → ')}</span></p>
                         <p className="text-muted-foreground">Est. Distance: <span className="font-medium text-foreground">{totalDistance} units</span></p>
                    </div>
                )}
            </CardContent>
            {filteredFeatures.length > 0 && (
                <CardFooter className="flex-col !items-start">
                    <h4 className="font-semibold mb-2">Visible Locations</h4>
                    <div className="w-full max-h-48 overflow-y-auto rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className='text-right'>Population</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredFeatures.map((f, i) => {
                                    const config = pointTypeConfig[f.properties.type as FeatureType] || pointTypeConfig.critical_incident;
                                    return (
                                        <TableRow key={i} className={cn(selectedFeature?.properties.name === f.properties.name && 'bg-primary/10')}>
                                            <TableCell className="font-medium">{f.properties.name}</TableCell>
                                            <TableCell><Badge variant="outline" className={cn('border-none gap-1.5', config.color.replace('text-', 'bg-') + '/20', config.color)}><config.icon className="h-3 w-3" />{config.label}</Badge></TableCell>
                                            <TableCell className="text-right">{f.properties.population?.toLocaleString() || 'N/A'}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
};

export default MapView;
