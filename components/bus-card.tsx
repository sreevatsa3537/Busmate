"use client";

import { Bus, getCrowdColor } from "@/lib/bus-data";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Clock, 
  Users, 
  Navigation,
  ChevronRight,
  Gauge,
  Sparkles,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BusCardProps {
  bus: Bus;
  onTrack?: (bus: Bus) => void;
}

export function BusCard({ bus, onTrack }: BusCardProps) {
  const { language, t } = useLanguage();

  const getCrowdText = (level: Bus['crowdLevel']) => {
    const texts: Record<Bus['crowdLevel'], string> = {
      empty: t('empty'),
      fewSeats: t('fewSeats'),
      standingRoom: t('standingRoom'),
      crowded: t('crowded'),
      veryCrowded: t('veryCrowded'),
    };
    return texts[level];
  };

  const getStatusConfig = (status: Bus['status']) => {
    const configs = {
      onTime: { bg: 'bg-gradient-to-r from-green-400 to-emerald-500', text: t('onTime'), emoji: '✅' },
      delayed: { bg: 'bg-gradient-to-r from-yellow-400 to-orange-500', text: t('delayed'), emoji: '⏳' },
      cancelled: { bg: 'bg-gradient-to-r from-red-400 to-pink-500', text: t('cancelled'), emoji: '❌' },
    };
    return configs[status];
  };

  const getCrowdGradient = (level: Bus['crowdLevel']) => {
    const gradients = {
      empty: 'from-green-400 to-emerald-500',
      fewSeats: 'from-lime-400 to-green-500',
      standingRoom: 'from-yellow-400 to-orange-500',
      crowded: 'from-orange-400 to-red-500',
      veryCrowded: 'from-red-500 to-pink-600',
    };
    return gradients[level];
  };

  const statusConfig = getStatusConfig(bus.status);

  return (
    <Card className="overflow-hidden hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 hover:scale-[1.02] border-2 border-green-200 bg-white/90 backdrop-blur rounded-2xl group">
      <CardHeader className="pb-2 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white font-black text-lg shadow-lg shadow-green-500/30 group-hover:shadow-xl group-hover:shadow-green-500/40 transition-all">
              {bus.number}
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <p className="font-bold text-sm text-green-800">
                {language === 'kn' ? bus.fromKn : bus.from} → {language === 'kn' ? bus.toKn : bus.to}
              </p>
              <p className="text-xs text-green-600">
                {t('via')}: {language === 'kn' ? bus.viaKn : bus.via}
              </p>
            </div>
          </div>
          <Badge className={`${statusConfig.bg} text-white border-0 shadow-md px-3 py-1`}>
            {statusConfig.emoji} {statusConfig.text}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {/* Crowd Level Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-green-700 font-medium">
              <div className="p-1 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500">
                <Users className="h-3 w-3 text-white" />
              </div>
              {t('crowdLevel')}
            </span>
            <span className={`font-bold bg-gradient-to-r ${getCrowdGradient(bus.crowdLevel)} bg-clip-text text-transparent`}>
              {getCrowdText(bus.crowdLevel)}
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className={cn(
                "h-full transition-all duration-500 rounded-full bg-gradient-to-r",
                getCrowdGradient(bus.crowdLevel)
              )}
              style={{ 
                width: `${
                  bus.crowdLevel === 'empty' ? 20 :
                  bus.crowdLevel === 'fewSeats' ? 40 :
                  bus.crowdLevel === 'standingRoom' ? 60 :
                  bus.crowdLevel === 'crowded' ? 80 : 100
                }%` 
              }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-green-600">😊 {t('empty')}</span>
            <span className="text-red-600">{t('veryCrowded')} 😰</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-yellow-700">{t('estimatedArrival')}</p>
              <p className="font-black text-lg text-yellow-800">{bus.estimatedArrival} <span className="text-xs font-medium">{t('minutes')}</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500">
              <Gauge className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-blue-700">Speed</p>
              <p className="font-black text-lg text-blue-800">{bus.speed} <span className="text-xs font-medium">km/h</span></p>
            </div>
          </div>
        </div>

        {/* Track Button */}
        <Button 
          className="w-full gap-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 rounded-xl h-12 text-base" 
          onClick={() => onTrack?.(bus)}
        >
          <Zap className="h-5 w-5" />
          {t('trackBus')}
          <ChevronRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
