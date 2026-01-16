"use client";

import { Route, getRouteTypeColor } from "@/lib/bus-data";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, Clock, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface RouteCardProps {
  route: Route;
  onSelect?: (route: Route) => void;
}

export function RouteCard({ route, onSelect }: RouteCardProps) {
  const { language, t } = useLanguage();

  const getRouteConfig = (type: Route['type']) => {
    const configs: Record<Route['type'], { label: string; gradient: string; badgeBg: string; badgeText: string }> = {
      ordinary: { 
        label: 'Ordinary', 
        gradient: 'from-green-400 to-emerald-500',
        badgeBg: 'bg-green-100',
        badgeText: 'text-green-700'
      },
      volvo: { 
        label: 'Volvo AC', 
        gradient: 'from-blue-400 to-indigo-500',
        badgeBg: 'bg-blue-100',
        badgeText: 'text-blue-700'
      },
      vajra: { 
        label: 'Vajra', 
        gradient: 'from-purple-400 to-violet-500',
        badgeBg: 'bg-purple-100',
        badgeText: 'text-purple-700'
      },
      vayu: { 
        label: 'Vayu', 
        gradient: 'from-yellow-400 to-orange-500',
        badgeBg: 'bg-yellow-100',
        badgeText: 'text-yellow-700'
      },
    };
    return configs[type];
  };

  const config = getRouteConfig(route.type);

  return (
    <Card 
      className="overflow-hidden hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-green-300 bg-white/80 backdrop-blur rounded-xl"
      onClick={() => onSelect?.(route)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex h-14 w-14 items-center justify-center rounded-xl text-white font-black text-lg shrink-0 shadow-lg transition-transform group-hover:scale-105",
            `bg-gradient-to-br ${config.gradient}`
          )}>
            {route.number}
          </div>
          
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <span className="truncate">{language === 'kn' ? route.fromKn : route.from}</span>
              <ArrowRight className="h-4 w-4 text-green-500 shrink-0" />
              <span className="truncate">{language === 'kn' ? route.toKn : route.to}</span>
            </div>
            
            <p className="text-xs text-gray-500">
              {t('via')}: {language === 'kn' ? route.viaKn : route.via}
            </p>
            
            <div className="flex items-center gap-3">
              <Badge className={cn("text-xs border-0", config.badgeBg, config.badgeText)}>
                {config.label}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                <Clock className="h-3 w-3" />
                Every {route.frequency} min
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <Zap className="h-4 w-4" />
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-green-500 transition-colors shrink-0" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
