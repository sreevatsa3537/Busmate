"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Bus, BusStop, generateMockBuses, busStops, routes } from "@/lib/bus-data";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BusDetailsPanel } from "@/components/bus-details-panel";
import { BusCard } from "@/components/bus-card";
import { 
  ArrowLeft, 
  MapPin, 
  Sparkles,
  RefreshCw,
  Maximize2,
  Bus as BusIcon,
  Zap,
  Navigation,
  Clock
} from "lucide-react";
import Link from "next/link";

// Dynamically import the map
const BusMap = dynamic(() => import("@/components/bus-map").then(mod => ({ default: mod.BusMap })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-900/50 to-rose-900/50 rounded-2xl">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 animate-heartbeat" />
          <div className="relative animate-spin rounded-full h-12 w-12 border-4 border-red-200 border-t-red-500" />
        </div>
        <p className="text-sm text-red-200 font-medium">Loading map...</p>
      </div>
    </div>
  ),
});

function TrackPageContent() {
  const searchParams = useSearchParams();
  const routeId = searchParams.get('route');
  const { language, t } = useLanguage();
  
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [lastRefresh, setLastRefresh] = useState('--:--:--');

  const selectedRoute = routeId ? routes.find(r => r.id === routeId) : null;

  useEffect(() => {
    const allBuses = generateMockBuses();
    const filteredBuses = routeId 
      ? allBuses.filter(b => b.routeId === routeId)
      : allBuses;
    setBuses(filteredBuses);
    setLastRefresh(new Date().toLocaleTimeString());

    const interval = setInterval(() => {
      setBuses(prev => prev.map(bus => ({
        ...bus,
        currentLat: bus.currentLat + (Math.random() - 0.5) * 0.002,
        currentLng: bus.currentLng + (Math.random() - 0.5) * 0.002,
        estimatedArrival: Math.max(1, bus.estimatedArrival - 1),
        speed: Math.floor(Math.random() * 30) + 10,
        lastUpdated: new Date(),
      })));
      setLastRefresh(new Date().toLocaleTimeString());
    }, 5000);

    return () => clearInterval(interval);
  }, [routeId]);

  const handleRefresh = () => {
    const allBuses = generateMockBuses();
    const filteredBuses = routeId 
      ? allBuses.filter(b => b.routeId === routeId)
      : allBuses;
    setBuses(filteredBuses);
    setLastRefresh(new Date().toLocaleTimeString());
  };

  const handleStopSelect = (stop: BusStop) => {
    const busesAtStop = buses.filter(b => b.nextStopId === stop.id);
    if (busesAtStop.length > 0) {
      setSelectedBus(busesAtStop[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-rose-900 to-red-900 relative overflow-hidden">
      {/* Background - Meteor Shower & Bottom Fumes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Meteors with trails */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`meteor-${i}`}
            className="absolute animate-meteor"
            style={{
              left: `${5 + Math.random() * 95}%`,
              top: '-100px',
              animationDuration: `${4 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 7}s`,
            }}
          >
            <div className="w-1.5 h-1.5 bg-red-300 rounded-full shadow-[0_0_8px_3px_rgba(252,165,165,0.7)]" />
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-t from-transparent via-red-400/15 to-red-300/50"
              style={{ height: `${90 + Math.random() * 70}px` }}
            />
          </div>
        ))}

        {/* Bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-red-600/25 via-red-500/8 to-transparent animate-glow-rise" />
        <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-rose-500/15 to-transparent animate-glow-rise" style={{ animationDelay: '-2s' }} />

        {/* Rising fumes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`fume-${i}`}
            className="absolute bottom-0 animate-fume"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          >
            <div 
              className="rounded-full bg-red-500/15 blur-2xl"
              style={{ width: `${70 + Math.random() * 90}px`, height: `${70 + Math.random() * 90}px` }}
            />
          </div>
        ))}

        {/* Embers */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`ember-${i}`}
            className="absolute bottom-0 w-1 h-1 rounded-full bg-red-400/60 shadow-[0_0_3px_rgba(248,113,113,0.5)] animate-ember"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}

        {/* Ambient glow */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 shadow-lg shadow-red-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={routeId ? "/routes" : "/"}>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur rounded-xl animate-glow-throb">
                  <Navigation className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white">
                    {selectedRoute ? `Route ${selectedRoute.number}` : 'Live Tracking'}
                  </h1>
                  <p className="text-red-100 text-sm">
                    {selectedRoute 
                      ? `${language === 'kn' ? selectedRoute.fromKn : selectedRoute.from} → ${language === 'kn' ? selectedRoute.toKn : selectedRoute.to}`
                      : `${buses.length} buses tracking`
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-white/20 text-white border-0">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-green-400 animate-pulse inline-block" />
                Live
              </Badge>
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bus List */}
          <div className="lg:col-span-1">
            <Card className="h-[600px] bg-white/10 backdrop-blur-xl border-2 border-red-400/30 rounded-2xl overflow-hidden">
              <CardHeader className="pb-3 bg-gradient-to-r from-red-500/20 to-rose-500/20 border-b border-red-400/20">
                <CardTitle className="text-lg flex items-center gap-2 text-red-100">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-red-500 to-rose-500">
                    <BusIcon className="h-4 w-4 text-white" />
                  </div>
                  Active Buses
                  <Badge className="bg-red-500/20 text-red-300 border-0 ml-auto">
                    {buses.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-60px)]">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-3">
                    {buses.map((bus) => (
                      <BusCard
                        key={bus.id}
                        bus={bus}
                        onTrack={setSelectedBus}
                      />
                    ))}
                    {buses.length === 0 && (
                      <div className="text-center py-12">
                        <BusIcon className="h-12 w-12 text-red-400/50 mx-auto mb-4" />
                        <p className="text-red-200/60">No active buses</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className={`lg:col-span-2 ${isMapFullscreen ? 'fixed inset-4 z-50' : ''}`}>
            <Card className={`${isMapFullscreen ? 'h-full' : 'h-[600px]'} flex flex-col bg-white/10 backdrop-blur-xl border-2 border-red-400/30 rounded-2xl overflow-hidden`}>
              <CardHeader className="pb-2 flex-shrink-0 bg-gradient-to-r from-red-500/20 to-rose-500/20 border-b border-red-400/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2 text-red-100">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-red-500 to-rose-500">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    Live Map
                    <Sparkles className="h-4 w-4 text-red-400 animate-pulse" />
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleRefresh}
                      className="hover:bg-red-500/20 text-red-200"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsMapFullscreen(!isMapFullscreen)}
                      className="hover:bg-red-500/20 text-red-200"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-red-300/60 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last updated: {lastRefresh}
                </p>
              </CardHeader>
              <CardContent className="flex-1 p-3">
                <BusMap 
                  buses={buses}
                  selectedBus={selectedBus}
                  onBusSelect={setSelectedBus}
                  onStopSelect={handleStopSelect}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Selected Bus Details */}
        {selectedBus && (
          <div className="fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] z-50">
            <div className="h-[400px]">
              <BusDetailsPanel 
                bus={selectedBus}
                onClose={() => setSelectedBus(null)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-rose-900 to-red-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200 border-t-red-500 mx-auto mb-4" />
          <p className="text-red-200">Loading...</p>
        </div>
      </div>
    }>
      <TrackPageContent />
    </Suspense>
  );
}
