"use client";

import { BusStop as BusStopType } from "@/lib/bus-data";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Bus, ChevronRight, Navigation } from "lucide-react";

interface BusStopCardProps {
  stop: BusStopType;
  distance?: string;
  onSelect?: (stop: BusStopType) => void;
}

export function BusStopCard({ stop, distance, onSelect }: BusStopCardProps) {
  const { language, t } = useLanguage();

  return (
    <Card 
      className="overflow-hidden hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-blue-300 bg-white/80 backdrop-blur rounded-xl"
      onClick={() => onSelect?.(stop)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 text-white shrink-0 shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-105">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm leading-tight text-gray-800">
                {language === 'kn' ? stop.nameKn : stop.name}
              </h3>
              <p className="text-xs text-blue-500 font-medium">{t('stopCode')}: {stop.code}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {stop.routes.slice(0, 4).map((route) => (
                  <Badge key={route} className="text-xs h-5 px-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-sm">
                    <Bus className="h-3 w-3 mr-1" />
                    {route}
                  </Badge>
                ))}
                {stop.routes.length > 4 && (
                  <Badge className="text-xs h-5 px-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-sm">
                    +{stop.routes.length - 4}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {distance && (
              <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded-full">{distance}</span>
            )}
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <Navigation className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
