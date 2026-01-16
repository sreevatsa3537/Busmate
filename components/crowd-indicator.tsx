"use client";

import { CrowdLevel } from "@/lib/bus-data";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

interface CrowdIndicatorProps {
  level: CrowdLevel;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function CrowdIndicator({ level, showLabel = true, size = "md" }: CrowdIndicatorProps) {
  const { t } = useLanguage();

  const getLevelConfig = (level: CrowdLevel) => {
    const configs = {
      empty: { 
        color: "bg-teal-500", 
        textColor: "text-teal-600",
        bgLight: "bg-teal-50",
        percentage: 20,
        icon: "😊"
      },
      fewSeats: { 
        color: "bg-sky-500", 
        textColor: "text-sky-600",
        bgLight: "bg-sky-50",
        percentage: 40,
        icon: "🙂"
      },
      standingRoom: { 
        color: "bg-amber-500", 
        textColor: "text-amber-600",
        bgLight: "bg-amber-50",
        percentage: 60,
        icon: "😐"
      },
      crowded: { 
        color: "bg-orange-500", 
        textColor: "text-orange-600",
        bgLight: "bg-orange-50",
        percentage: 80,
        icon: "😟"
      },
      veryCrowded: { 
        color: "bg-rose-500", 
        textColor: "text-rose-600",
        bgLight: "bg-rose-50",
        percentage: 100,
        icon: "😰"
      },
    };
    return configs[level];
  };

  const config = getLevelConfig(level);
  
  const sizeClasses = {
    sm: {
      container: "gap-1.5",
      bar: "h-1.5 w-24",
      text: "text-xs",
      icon: "h-3 w-3",
    },
    md: {
      container: "gap-2",
      bar: "h-2 w-32",
      text: "text-sm",
      icon: "h-4 w-4",
    },
    lg: {
      container: "gap-3",
      bar: "h-3 w-40",
      text: "text-base",
      icon: "h-5 w-5",
    },
  };

  const sizes = sizeClasses[size];

  return (
    <div className={cn("flex flex-col", sizes.container)}>
      {showLabel && (
        <div className={cn("flex items-center gap-2", sizes.text)}>
          <Users className={cn(sizes.icon, config.textColor)} />
          <span className={cn("font-medium", config.textColor)}>
            {t(level as keyof typeof t)} {config.icon}
          </span>
        </div>
      )}
      <div className={cn("rounded-full bg-secondary overflow-hidden", sizes.bar)}>
        <div 
          className={cn("h-full rounded-full transition-all duration-500", config.color)}
          style={{ width: `${config.percentage}%` }}
        />
      </div>
    </div>
  );
}

export function CrowdLegend() {
  const { t } = useLanguage();
  
  const levels: { level: CrowdLevel; icon: string; }[] = [
    { level: 'empty', icon: '😊' },
    { level: 'fewSeats', icon: '🙂' },
    { level: 'standingRoom', icon: '😐' },
    { level: 'crowded', icon: '😟' },
    { level: 'veryCrowded', icon: '😰' },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 p-4 bg-red-900/40 backdrop-blur-sm rounded-2xl border border-red-400/30 shadow-lg shadow-red-900/20">
      {levels.map(({ level, icon }) => {
        const config = {
          empty: { color: "bg-gradient-to-br from-teal-400 to-cyan-500", label: t('empty'), shadow: "shadow-teal-500/30" },
          fewSeats: { color: "bg-gradient-to-br from-sky-400 to-blue-500", label: t('fewSeats'), shadow: "shadow-sky-500/30" },
          standingRoom: { color: "bg-gradient-to-br from-amber-400 to-yellow-500", label: t('standingRoom'), shadow: "shadow-amber-500/30" },
          crowded: { color: "bg-gradient-to-br from-orange-400 to-amber-600", label: t('crowded'), shadow: "shadow-orange-500/30" },
          veryCrowded: { color: "bg-gradient-to-br from-rose-400 to-pink-500", label: t('veryCrowded'), shadow: "shadow-rose-500/30" },
        }[level];
        
        return (
          <div key={level} className="flex flex-col items-center gap-2 text-center group cursor-pointer">
            <div className={cn("w-8 h-8 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-110", config.color, config.shadow)}>
              {icon}
            </div>
            <span className="text-xs font-medium text-red-100/80 leading-tight">{config.label}</span>
          </div>
        );
      })}
    </div>
  );
}
