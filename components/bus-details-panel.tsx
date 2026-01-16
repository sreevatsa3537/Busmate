"use client";

import { useState } from "react";
import { Bus, busStops } from "@/lib/bus-data";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CrowdIndicator } from "./crowd-indicator";
import { ScrollArea } from "./ui/scroll-area";
import { 
  X, 
  MapPin, 
  Clock, 
  Navigation, 
  Gauge,
  ArrowRight,
  Bell,
  Star,
  Share2,
  RefreshCw,
  Sparkles,
  Check
} from "lucide-react";
import { Separator } from "./ui/separator";

interface BusDetailsPanelProps {
  bus: Bus;
  onClose: () => void;
}

export function BusDetailsPanel({ bus, onClose }: BusDetailsPanelProps) {
  const { language, t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);
  const [reminder, setReminder] = useState(false);
  
  const nextStop = busStops.find(s => s.id === bus.nextStopId);

  const getStatusConfig = (status: Bus['status']) => {
    const configs = {
      onTime: { bg: 'bg-gradient-to-r from-green-400 to-emerald-500', text: t('onTime') },
      delayed: { bg: 'bg-gradient-to-r from-yellow-400 to-orange-500', text: t('delayed') },
      cancelled: { bg: 'bg-gradient-to-r from-red-400 to-pink-500', text: t('cancelled') },
    };
    return configs[status];
  };

  const statusConfig = getStatusConfig(bus.status);

  return (
    <Card className="h-full flex flex-col bg-white/95 backdrop-blur border-2 border-green-300 shadow-2xl shadow-green-500/20 rounded-2xl overflow-hidden">
      <CardHeader className="pb-3 flex-shrink-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-black text-lg shadow-lg">
              {bus.number}
            </div>
            <div className="text-white">
              <CardTitle className="text-base flex items-center gap-2">
                {t('busNumber')} {bus.number}
                <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
              </CardTitle>
              <p className="text-sm text-green-100">
                {language === 'kn' ? bus.fromKn : bus.from} → {language === 'kn' ? bus.toKn : bus.to}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 rounded-xl">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <ScrollArea className="flex-1">
        <CardContent className="space-y-4 pt-4">
          {/* Status and Crowd */}
          <div className="flex items-center justify-between">
            <Badge className={`${statusConfig.bg} text-white border-0 shadow-md px-4 py-1`}>
              {statusConfig.text}
            </Badge>
            <CrowdIndicator level={bus.crowdLevel} size="sm" />
          </div>

          <Separator className="bg-green-200" />

          {/* Key Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
              <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-yellow-700">{t('estimatedArrival')}</p>
                <p className="font-black text-xl text-yellow-800">{bus.estimatedArrival} <span className="text-sm font-medium">{t('minutes')}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 text-white">
                <Gauge className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-blue-700">Speed</p>
                <p className="font-black text-xl text-blue-800">{bus.speed} <span className="text-sm font-medium">km/h</span></p>
              </div>
            </div>
          </div>

          {/* Next Stop */}
          {nextStop && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 text-white">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold text-green-700">Next Stop</span>
              </div>
              <p className="font-bold text-green-800 text-lg">
                {language === 'kn' ? nextStop.nameKn : nextStop.name}
              </p>
              <p className="text-xs text-green-600">{t('stopCode')}: <span className="font-semibold">{nextStop.code}</span></p>
            </div>
          )}

          {/* Route Info */}
          <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <h4 className="text-sm font-bold text-purple-700 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                <Navigation className="h-4 w-4" />
              </div>
              {t('route')}
            </h4>
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <span className="font-bold text-purple-800 bg-purple-100 px-2 py-1 rounded-lg">{language === 'kn' ? bus.fromKn : bus.from}</span>
              <ArrowRight className="h-4 w-4 text-pink-500" />
              <span className="text-purple-600 bg-pink-100 px-2 py-1 rounded-lg">{t('via')} {language === 'kn' ? bus.viaKn : bus.via}</span>
              <ArrowRight className="h-4 w-4 text-pink-500" />
              <span className="font-bold text-purple-800 bg-purple-100 px-2 py-1 rounded-lg">{language === 'kn' ? bus.toKn : bus.to}</span>
            </div>
          </div>

          <Separator className="bg-green-200" />

          {/* Actions */}
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setReminder(!reminder)}
              className={`flex-col h-auto py-3 gap-1 border-2 transition-all duration-300 ${
                reminder 
                  ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white border-red-400 shadow-lg shadow-red-500/30' 
                  : 'border-red-200 hover:bg-red-50 hover:border-red-400 text-red-600'
              }`}
            >
              {reminder ? <Check className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
              <span className="text-xs font-semibold">{reminder ? 'Set!' : t('setReminder')}</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex-col h-auto py-3 gap-1 border-2 transition-all duration-300 ${
                isFavorite 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-yellow-400 shadow-lg shadow-yellow-500/30' 
                  : 'border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400 text-yellow-600'
              }`}
            >
              <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              <span className="text-xs font-semibold">{isFavorite ? 'Saved!' : t('favorites')}</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigator.share?.({ title: `Bus ${bus.number}`, text: `Track bus ${bus.number} on BusMate!` })}
              className="flex-col h-auto py-3 gap-1 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-400 text-blue-600 transition-all duration-300"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-xs font-semibold">Share</span>
            </Button>
          </div>

          {/* Last Updated */}
          <div className="flex items-center justify-between text-xs pt-2 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200">
            <span className="flex items-center gap-1 text-gray-600">
              <RefreshCw className="h-3 w-3 animate-spin" style={{ animationDuration: '3s' }} />
              {t('lastUpdated')}: <span className="font-semibold text-gray-800">{bus.lastUpdated.toLocaleTimeString()}</span>
            </span>
            <Button variant="ghost" size="sm" className="h-6 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 rounded-lg">
              {t('refresh')}
            </Button>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
