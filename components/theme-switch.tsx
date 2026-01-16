"use client";

import { Moon, Zap, Crown } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "neon", icon: Zap, label: "Neon" },
    { name: "gold", icon: Crown, label: "Gold" },
  ] as const;

  return (
    <div className="flex gap-2">
      {themes.map(({ name, icon: Icon, label }) => (
        <Button
          key={name}
          variant={theme === name ? "default" : "outline"}
          size="sm"
          onClick={() => setTheme(name)}
          className={`
            relative transition-all duration-300
            ${theme === name ? "scale-105" : ""}
            ${
              name === "dark"
                ? theme === name
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "hover:bg-slate-100"
                : ""
            }
            ${
              name === "neon"
                ? theme === name
                  ? "bg-black border-cyan-500 text-cyan-400 hover:bg-black shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  : "hover:bg-slate-100"
                : ""
            }
            ${
              name === "gold"
                ? theme === name
                  ? "bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 shadow-[0_0_15px_rgba(217,119,6,0.5)]"
                  : "hover:bg-slate-100"
                : ""
            }
          `}
        >
          <Icon className="h-4 w-4 mr-1" />
          {label}
        </Button>
      ))}
    </div>
  );
}
