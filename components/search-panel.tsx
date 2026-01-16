"use client";

import { useState } from "react";
import { Bus, BusStop, busStops, routes } from "@/lib/bus-data";
import { useLanguage } from "@/lib/language-context";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BusStopCard } from "./bus-stop-card";
import { RouteCard } from "./route-card";
import { Search, Bus as BusIcon, MapPin, X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface SearchPanelProps {
  buses: Bus[];
  onStopSelect?: (stop: BusStop) => void;
  onBusSelect?: (bus: Bus) => void;
}

export function SearchPanel({ buses, onStopSelect, onBusSelect }: SearchPanelProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStops = busStops.filter((stop) => {
    const query = searchQuery.toLowerCase();
    return (
      stop.name.toLowerCase().includes(query) ||
      stop.nameKn.includes(query) ||
      stop.code.toLowerCase().includes(query) ||
      stop.routes.some(r => r.toLowerCase().includes(query))
    );
  });

  const filteredRoutes = routes.filter((route) => {
    const query = searchQuery.toLowerCase();
    return (
      route.number.toLowerCase().includes(query) ||
      route.from.toLowerCase().includes(query) ||
      route.fromKn.includes(query) ||
      route.to.toLowerCase().includes(query) ||
      route.toKn.includes(query) ||
      route.via.toLowerCase().includes(query) ||
      route.viaKn.includes(query)
    );
  });

  const handleRouteSelect = (route: typeof routes[0]) => {
    const busesOnRoute = buses.filter(b => b.routeId === route.id);
    if (busesOnRoute.length > 0) {
      onBusSelect?.(busesOnRoute[0]);
    }
  };

  return (
    <Card className="h-full flex flex-col bg-gradient-to-br from-red-900/40 to-rose-900/40 backdrop-blur-xl border-2 border-red-400/30 shadow-xl shadow-red-500/10 rounded-2xl overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-red-500/20 to-rose-500/20 border-b border-red-400/20">
        <CardTitle className="text-lg flex items-center gap-2 text-red-100">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-red-500 to-rose-500">
            <Search className="h-4 w-4 text-white" />
          </div>
          {t('search')}
          <Sparkles className="h-4 w-4 text-red-400 animate-pulse" />
        </CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-400" />
          <Input
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-11 rounded-xl border-2 border-red-400/30 focus:border-red-400 focus:ring-red-400/20 bg-white/10 placeholder:text-red-300/50 text-red-100"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-red-400 hover:text-red-200 hover:bg-red-500/20 rounded-lg"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <Tabs defaultValue="routes" className="h-full flex flex-col">
          <TabsList className="mx-4 mt-3 grid w-auto grid-cols-2 bg-red-500/10 p-1 rounded-xl border border-red-400/20">
            <TabsTrigger 
              value="routes" 
              className="gap-1.5 rounded-lg text-red-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <BusIcon className="h-4 w-4" />
              {t('routes')}
            </TabsTrigger>
            <TabsTrigger 
              value="stops" 
              className="gap-1.5 rounded-lg text-red-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <MapPin className="h-4 w-4" />
              {t('stops')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="routes" className="flex-1 mt-0 overflow-hidden">
            <ScrollArea className="h-full px-4 pb-4">
              <div className="space-y-2 pt-3">
                {filteredRoutes.length > 0 ? (
                  filteredRoutes.map((route) => (
                    <RouteCard
                      key={route.id}
                      route={route}
                      onSelect={handleRouteSelect}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-500/20 mb-4">
                      <BusIcon className="h-8 w-8 text-red-400" />
                    </div>
                    <p className="text-red-200 font-medium">{t('noResults')}</p>
                    <p className="text-sm text-red-300/50 mt-1">Try a different search term</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="stops" className="flex-1 mt-0 overflow-hidden">
            <ScrollArea className="h-full px-4 pb-4">
              <div className="space-y-2 pt-3">
                {filteredStops.length > 0 ? (
                  filteredStops.map((stop) => (
                    <BusStopCard
                      key={stop.id}
                      stop={stop}
                      onSelect={onStopSelect}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 mb-4">
                      <MapPin className="h-8 w-8 text-rose-400" />
                    </div>
                    <p className="text-red-200 font-medium">{t('noResults')}</p>
                    <p className="text-sm text-red-300/50 mt-1">Try a different search term</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
