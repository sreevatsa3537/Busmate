"use client";

import { useState, useEffect, useSyncExternalStore, useRef } from "react";
import dynamic from "next/dynamic";
import { Bus, BusStop, generateMockBuses, busStops } from "@/lib/bus-data";
import { useLanguage } from "@/lib/language-context";
import { Header } from "@/components/header";
import { WelcomeBanner } from "@/components/welcome-banner";
import { SearchPanel } from "@/components/search-panel";
import { LiveBusPanel } from "@/components/live-bus-panel";
import { BusDetailsPanel } from "@/components/bus-details-panel";
import { CrowdLegend } from "@/components/crowd-indicator";
import { LoginPage } from "@/components/login-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bus as BusIcon, 
  MapPin, 
  Navigation, 
  RefreshCw, 
  Maximize2,
  TrendingUp,
  Users,
  Clock,
  Sparkles,
  Zap,
  Activity
} from "lucide-react";

// Dynamically import the map component to avoid SSR issues with Leaflet
const BusMap = dynamic(() => import("@/components/bus-map").then(mod => ({ default: mod.BusMap })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse" />
          <div className="relative animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-500" />
        </div>
        <p className="text-sm text-green-700 font-medium">Loading map...</p>
      </div>
    </div>
  ),
});

// Store for bus data - manages state outside React to avoid hydration issues
let busStore = {
  buses: [] as Bus[],
  lastRefresh: '--:--:--',
  listeners: new Set<() => void>(),
};

function subscribe(listener: () => void) {
  busStore.listeners.add(listener);
  return () => busStore.listeners.delete(listener);
}

function getSnapshot() {
  return busStore;
}

// Cache the server snapshot to avoid infinite loop
const serverSnapshot = { buses: [], lastRefresh: '--:--:--', listeners: new Set<() => void>() };

function getServerSnapshot() {
  return serverSnapshot;
}

function initializeBuses() {
  if (busStore.buses.length === 0) {
    busStore = {
      ...busStore,
      buses: generateMockBuses(),
      lastRefresh: new Date().toLocaleTimeString(),
    };
    busStore.listeners.forEach(listener => listener());
  }
}

function updateBuses() {
  busStore = {
    ...busStore,
    buses: busStore.buses.map(bus => ({
      ...bus,
      currentLat: bus.currentLat + (Math.random() - 0.5) * 0.002,
      currentLng: bus.currentLng + (Math.random() - 0.5) * 0.002,
      estimatedArrival: Math.max(1, bus.estimatedArrival - 1),
      speed: Math.floor(Math.random() * 30) + 10,
      lastUpdated: new Date(),
    })),
    lastRefresh: new Date().toLocaleTimeString(),
  };
  busStore.listeners.forEach(listener => listener());
}

function refreshBuses() {
  busStore = {
    ...busStore,
    buses: generateMockBuses(),
    lastRefresh: new Date().toLocaleTimeString(),
  };
  busStore.listeners.forEach(listener => listener());
}

export function BusMateApp() {
  const { t } = useLanguage();
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Refs for sections
  const searchRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'routes' || section === 'stops') {
      searchRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'favorites') {
      mapRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initialize buses on client
  useEffect(() => {
    initializeBuses();
    
    // Set up live updates
    const interval = setInterval(updateBuses, 5000);
    return () => clearInterval(interval);
  }, []);

  const buses = store.buses;
  const lastRefresh = store.lastRefresh;

  const handleRefresh = () => {
    refreshBuses();
  };

  const handleBusSelect = (bus: Bus) => {
    setSelectedBus(bus);
  };

  const handleStopSelect = (stop: BusStop) => {
    // Find buses near this stop and select the first one
    const busesAtStop = buses.filter(b => b.nextStopId === stop.id);
    if (busesAtStop.length > 0) {
      setSelectedBus(busesAtStop[0]);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Stats
  const totalBuses = buses.length;
  const totalStops = busStops.length;
  const onTimeBuses = buses.filter(b => b.status === 'onTime').length;
  const onTimePercentage = totalBuses > 0 ? Math.round((onTimeBuses / totalBuses) * 100) : 0;
  const delayedBuses = buses.filter(b => b.status === 'delayed').length;

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  // Show loading state during initial render on client
  const isLoading = buses.length === 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-rose-900 to-red-900 relative overflow-hidden">
        {/* Glowing orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-rose-500/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-red-400/30 rounded-full blur-3xl animate-heartbeat" style={{ animationDelay: '2s' }} />
        <Header onLogout={handleLogout} onNavigate={handleNavigate} activeSection={activeSection} />
        <main className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-40 animate-pulse" />
                <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-red-200 border-t-red-500" />
              </div>
              <p className="text-red-200 font-medium text-lg">{t('loading')}</p>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-red-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-rose-900 to-red-900 relative overflow-hidden">
      {/* Background - Meteor Shower & Bottom Fumes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Meteors with trails */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`meteor-${i}`}
            className="absolute animate-meteor"
            style={{
              left: `${5 + Math.random() * 95}%`,
              top: '-100px',
              animationDuration: `${4 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          >
            {/* Meteor head */}
            <div className="w-1.5 h-1.5 bg-red-300 rounded-full shadow-[0_0_8px_3px_rgba(252,165,165,0.7)]" />
            {/* Trail */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-t from-transparent via-red-400/15 to-red-300/50"
              style={{ height: `${100 + Math.random() * 80}px` }}
            />
          </div>
        ))}

        {/* Bottom glow layers */}
        <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-red-600/25 via-red-500/10 to-transparent animate-glow-rise" />
        <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-rose-500/15 via-rose-400/5 to-transparent animate-glow-rise" style={{ animationDelay: '-2s' }} />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[30%] bg-gradient-to-t from-red-500/20 to-transparent rounded-t-full blur-xl animate-glow-rise" style={{ animationDelay: '-1s' }} />

        {/* Rising fumes/smoke */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`fume-${i}`}
            className="absolute bottom-0 animate-fume"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          >
            <div 
              className="rounded-full bg-red-500/15 blur-3xl"
              style={{ 
                width: `${80 + Math.random() * 120}px`,
                height: `${80 + Math.random() * 120}px`,
              }}
            />
          </div>
        ))}

        {/* Rising embers */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`ember-${i}`}
            className="absolute bottom-0 rounded-full bg-red-400/60 shadow-[0_0_4px_rgba(248,113,113,0.5)] animate-ember"
            style={{
              width: `${2 + Math.random() * 2}px`,
              height: `${2 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${7 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 7}s`,
            }}
          />
        ))}

        {/* Subtle ambient glow */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
      </div>

      {/* Credit Banner - Moved to top */}
      <div className="bg-gradient-to-r from-red-800 via-red-900 to-red-800 text-white text-center py-2.5 relative z-20 border-b-2 border-red-400/50 shadow-lg shadow-red-500/20">
        <p className="text-sm font-bold flex items-center justify-center gap-2 tracking-wide">
          <Sparkles className="h-4 w-4 animate-pulse text-red-300" />
          <span className="text-red-200">A Group Project Made For </span>
          <span className="text-white font-black text-base bg-red-500/30 px-2 py-0.5 rounded">Banglore Buses </span>
          <Sparkles className="h-4 w-4 animate-pulse text-red-300" />
        </p>
      </div>

      <Header onLogout={handleLogout} onNavigate={handleNavigate} activeSection={activeSection} />
      
      <main className="container mx-auto px-4 py-6 relative z-10">
        {/* Welcome Banner */}
        <WelcomeBanner />
        
        {/* Stats Bar - Colorful Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-teal-400 to-cyan-500 border-0 shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transition-all hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur">
                <BusIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-white">{totalBuses}</p>
                <p className="text-xs text-teal-100 font-medium">Active Buses</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-400 to-violet-500 border-0 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-white">{totalStops}</p>
                <p className="text-xs text-indigo-100 font-medium">{t('busStops')}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-400 to-yellow-500 border-0 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-white">{onTimePercentage}%</p>
                <p className="text-xs text-amber-100 font-medium">{t('onTime')}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-400 to-slate-600 border-0 shadow-lg shadow-slate-500/30 hover:shadow-xl hover:shadow-slate-500/40 transition-all hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-white">{delayedBuses}</p>
                <p className="text-xs text-slate-100 font-medium">Delayed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crowd Legend */}
        <div className="mb-6">
          <CrowdLegend />
        </div>

        {/* Main Content - Rearranged: Map on left, Search on right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Map (Now on left side) */}
          <div ref={mapRef} className={`lg:col-span-2 lg:order-1 ${isMapFullscreen ? 'fixed inset-4 z-50' : ''}`}>
            <Card className={`${isMapFullscreen ? 'h-full' : 'h-[600px]'} flex flex-col bg-red-900/40 backdrop-blur-xl border-2 border-red-400/30 shadow-xl shadow-red-500/10 rounded-2xl overflow-hidden`}>
              <CardHeader className="pb-2 flex-shrink-0 bg-gradient-to-r from-red-500/20 to-rose-500/20 border-b border-red-400/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2 text-red-100">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-red-500 to-rose-500">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    {t('liveTracking')}
                    <Sparkles className="h-4 w-4 text-red-400 animate-pulse" />
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-red-500 to-rose-500 text-white border-0 shadow-md animate-glow-throb">
                      <span className="mr-1.5 h-2 w-2 rounded-full bg-white animate-pulse inline-block" />
                      Live
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleRefresh}
                      disabled={isLoading}
                      className="hover:bg-red-500/20 text-red-200"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
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
                  <Zap className="h-3 w-3" />
                  {t('lastUpdated')}: {lastRefresh}
                </p>
              </CardHeader>
              <CardContent className="flex-1 p-3">
                <BusMap 
                  buses={buses}
                  selectedBus={selectedBus}
                  onBusSelect={handleBusSelect}
                  onStopSelect={handleStopSelect}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Search/Routes (Now on right side) */}
          <div ref={searchRef} className="lg:col-span-1 lg:order-2 space-y-4">
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="w-full grid grid-cols-2 bg-red-500/10 border border-red-400/20 p-1 rounded-xl">
                <TabsTrigger 
                  value="search" 
                  className="gap-1.5 rounded-lg text-red-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <Navigation className="h-4 w-4" />
                  {t('search')}
                </TabsTrigger>
                <TabsTrigger 
                  value="live" 
                  className="gap-1.5 rounded-lg text-red-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <TrendingUp className="h-4 w-4" />
                  Live
                </TabsTrigger>
              </TabsList>
              <TabsContent value="search" className="mt-4">
                <div className="h-[500px]">
                  <SearchPanel 
                    buses={buses}
                    onStopSelect={handleStopSelect}
                    onBusSelect={handleBusSelect}
                  />
                </div>
              </TabsContent>
              <TabsContent value="live" className="mt-4">
                <div className="h-[500px]">
                  <LiveBusPanel 
                    buses={buses}
                    onBusSelect={handleBusSelect}
                  />
                </div>
              </TabsContent>
            </Tabs>
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

      {/* Footer */}
      <footer className="border-t-2 border-red-500/30 bg-gradient-to-r from-red-950/90 via-rose-900/90 to-red-950/90 backdrop-blur py-8 mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-500 shadow-lg shadow-red-500/30 animate-glow-throb">
                  <BusIcon className="h-5 w-5 text-white" />
                </div>
                <span className="font-black text-lg text-red-400">{t('appName')}</span>
              </div>
              <p className="text-sm text-red-200/70">
                {t('tagline')}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-red-400">{t('features')}</h4>
              <ul className="space-y-2 text-sm text-red-200/70">
                <li className="hover:text-red-300 cursor-pointer transition-colors">🚌 {t('realTimeTracking')}</li>
                <li className="hover:text-red-300 cursor-pointer transition-colors">👥 {t('crowdInfo')}</li>
                <li className="hover:text-red-300 cursor-pointer transition-colors">🗺️ {t('routePlanning')}</li>
                <li className="hover:text-red-300 cursor-pointer transition-colors">🔔 {t('notifications')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-red-400">{t('help')}</h4>
              <ul className="space-y-2 text-sm text-red-200/70">
                <li className="hover:text-red-300 cursor-pointer transition-colors">{t('aboutUs')}</li>
                <li className="hover:text-red-300 cursor-pointer transition-colors">{t('contact')}</li>
                <li className="hover:text-red-300 cursor-pointer transition-colors">FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-red-400">Legal</h4>
              <ul className="space-y-2 text-sm text-red-200/70">
                <li className="hover:text-red-300 cursor-pointer transition-colors">{t('privacy')}</li>
                <li className="hover:text-red-300 cursor-pointer transition-colors">{t('terms')}</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-red-500/30 text-center">
            <p className="text-red-400 font-black text-lg mb-2">Made For Bangalore </p>
            <p className="text-sm text-red-300/60">© 2026 BusMate. Bangalore Metropolitan Transport Corporation</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
