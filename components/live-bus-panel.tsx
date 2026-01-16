"use client";

import { Bus } from "@/lib/bus-data";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { BusCard } from "./bus-card";
import { TrendingUp, Bus as BusIcon, Sparkles, Zap } from "lucide-react";

interface LiveBusPanelProps {
  buses: Bus[];
  onBusSelect?: (bus: Bus) => void;
}

export function LiveBusPanel({ buses, onBusSelect }: LiveBusPanelProps) {
  const { t } = useLanguage();

  // Group buses by route
  const busesByRoute = buses.reduce((acc, bus) => {
    if (!acc[bus.routeId]) {
      acc[bus.routeId] = [];
    }
    acc[bus.routeId].push(bus);
    return acc;
  }, {} as Record<string, Bus[]>);

  // Get popular routes (most buses)
  const popularRouteIds = Object.entries(busesByRoute)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 4)
    .map(([id]) => id);

  const popularBuses = popularRouteIds
    .map(routeId => busesByRoute[routeId][0])
    .filter(Boolean);

  return (
    <Card className="h-full flex flex-col bg-white/80 backdrop-blur border-2 border-red-200 shadow-xl shadow-red-500/10 rounded-2xl overflow-hidden">
      <CardHeader className="pb-3 flex-shrink-0 bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100">
        <CardTitle className="text-lg flex items-center gap-2 text-red-800">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          {t('liveTracking')}
          <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
        </CardTitle>
        <p className="text-sm text-red-600 flex items-center gap-1">
          <Zap className="h-3 w-3" />
          <span className="font-semibold">{buses.length}</span> {t('routes').toLowerCase()} active
        </p>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-4 pb-4">
          <div className="space-y-4 pt-3">
            <div>
              <h3 className="text-sm font-bold text-red-700 mb-3 flex items-center gap-2">
                <div className="p-1 rounded bg-gradient-to-br from-yellow-400 to-orange-500">
                  <BusIcon className="h-4 w-4 text-white" />
                </div>
                {t('popularRoutes')}
              </h3>
              <div className="space-y-3">
                {popularBuses.map((bus) => (
                  <BusCard
                    key={bus.id}
                    bus={bus}
                    onTrack={onBusSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
