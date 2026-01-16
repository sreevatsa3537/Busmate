"use client";

import { useState } from "react";
import { X, Sparkles, Bus, MapPin, Users, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;
  
  return (
    <div className="relative bg-gradient-to-r from-red-600 via-rose-500 to-red-600 p-6 rounded-2xl shadow-2xl shadow-red-500/30 mb-6 overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-rose-300 rounded-full blur-3xl animate-heartbeat" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-red-200 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-5 w-5" />
      </Button>

      {/* Banner Content */}
      <div className="relative max-w-4xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-xl blur-md opacity-60" />
            <div className="relative p-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl animate-glow-throb">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-white">
            Welcome to BusMate! 
            <span className="inline-block ml-2 animate-bounce">🚌</span>
          </h2>
        </div>
        
        <p className="text-lg text-white/90 mb-5 max-w-2xl">
          Track BMTC buses in real-time, check crowd levels, and plan your perfect journey across Bengaluru.
        </p>

        {/* Quick Stats - Rearranged in a row at bottom */}
        <div className="flex flex-wrap gap-4 mb-5">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-xl hover:bg-white/30 transition-all cursor-pointer">
            <Bus className="h-5 w-5 text-white" />
            <span className="text-white font-semibold">50+ Live Buses</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-xl hover:bg-white/30 transition-all cursor-pointer">
            <MapPin className="h-5 w-5 text-white" />
            <span className="text-white font-semibold">100+ Stops</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-xl hover:bg-white/30 transition-all cursor-pointer">
            <Users className="h-5 w-5 text-white" />
            <span className="text-white font-semibold">Live Crowd Info</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-xl hover:bg-white/30 transition-all cursor-pointer">
            <Zap className="h-5 w-5 text-white" />
            <span className="text-white font-semibold">5s Updates</span>
          </div>
        </div>

        {/* Action buttons - Rearranged */}
        <div className="flex flex-wrap gap-3">
          <Link href="/track">
            <Button 
              className="bg-white text-red-600 hover:bg-red-50 font-bold shadow-lg shadow-red-500/30 hover:shadow-xl rounded-xl px-6 transition-all hover:-translate-y-0.5 hover:scale-105"
            >
              <span>Start Tracking</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
          <Link href="/routes">
            <Button 
              className="bg-red-50 text-red-600 hover:bg-white font-bold shadow-lg shadow-red-500/20 hover:shadow-xl rounded-xl px-6 transition-all hover:-translate-y-0.5 hover:scale-105 border-2 border-white/40"
            >
              View All Routes
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10">
        <Bus className="w-full h-full text-white" />
      </div>
    </div>
  );
}
