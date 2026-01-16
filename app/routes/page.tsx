"use client";

import { useState } from "react";
import { routes, Bus, generateMockBuses } from "@/lib/bus-data";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bus as BusIcon, 
  Search, 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Sparkles,
  Filter,
  Star,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function RoutesPage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const buses = generateMockBuses();

  const filteredRoutes = routes.filter((route) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      route.number.toLowerCase().includes(query) ||
      route.from.toLowerCase().includes(query) ||
      route.to.toLowerCase().includes(query) ||
      route.via.toLowerCase().includes(query);
    
    const matchesType = !selectedType || route.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const routeTypes = [
    { id: 'ordinary', name: 'Ordinary', color: 'from-green-400 to-emerald-500', emoji: '🚌' },
    { id: 'volvo', name: 'Volvo AC', color: 'from-blue-400 to-cyan-500', emoji: '❄️' },
    { id: 'vajra', name: 'Vajra', color: 'from-purple-400 to-pink-500', emoji: '⚡' },
    { id: 'vayu', name: 'Vayu', color: 'from-yellow-400 to-orange-500', emoji: '🌬️' },
  ];

  const toggleFavorite = (routeId: string) => {
    setFavorites(prev => 
      prev.includes(routeId) 
        ? prev.filter(id => id !== routeId)
        : [...prev, routeId]
    );
  };

  const getRouteTypeConfig = (type: string) => {
    return routeTypes.find(t => t.id === type) || routeTypes[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-rose-900 to-red-900 relative overflow-hidden">
      {/* Background - Meteor Shower & Bottom Fumes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Meteors with trails */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`meteor-${i}`}
            className="absolute animate-meteor"
            style={{
              left: `${5 + Math.random() * 95}%`,
              top: '-100px',
              animationDuration: `${4 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 7}s`,
            }}
          >
            <div className="w-1 h-1 bg-red-300 rounded-full shadow-[0_0_6px_2px_rgba(252,165,165,0.7)]" />
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-t from-transparent via-red-400/15 to-red-300/50"
              style={{ height: `${80 + Math.random() * 70}px` }}
            />
          </div>
        ))}

        {/* Bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-red-600/25 via-red-500/8 to-transparent animate-glow-rise" />
        <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-rose-500/15 to-transparent animate-glow-rise" style={{ animationDelay: '-2s' }} />

        {/* Rising fumes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`fume-${i}`}
            className="absolute bottom-0 animate-fume"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          >
            <div 
              className="rounded-full bg-red-500/15 blur-2xl"
              style={{ width: `${70 + Math.random() * 90}px`, height: `${70 + Math.random() * 90}px` }}
            />
          </div>
        ))}

        {/* Embers */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`ember-${i}`}
            className="absolute bottom-0 w-1 h-1 rounded-full bg-red-400/60 shadow-[0_0_3px_rgba(248,113,113,0.5)] animate-ember"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}

        {/* Ambient glow */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 shadow-lg shadow-red-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur rounded-xl animate-glow-throb">
                  <BusIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white">All Routes</h1>
                  <p className="text-red-100 text-sm">{routes.length} routes available</p>
                </div>
              </div>
            </div>
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10">
        {/* Search & Filter */}
        <Card className="mb-6 bg-white/10 backdrop-blur-xl border-2 border-red-400/30 rounded-2xl overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-400" />
                <Input
                  placeholder="Search routes by number, from, to..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/10 border-2 border-red-400/30 rounded-xl text-white placeholder:text-red-200/50 focus:border-red-400 focus:ring-red-400/30"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={() => setSelectedType(null)}
                  className={`rounded-xl transition-all ${
                    !selectedType 
                      ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg' 
                      : 'bg-white/10 text-red-200 hover:bg-white/20'
                  }`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  All
                </Button>
                {routeTypes.map((type) => (
                  <Button
                    key={type.id}
                    onClick={() => setSelectedType(type.id === selectedType ? null : type.id)}
                    className={`rounded-xl transition-all ${
                      selectedType === type.id 
                        ? `bg-gradient-to-r ${type.color} text-white shadow-lg` 
                        : 'bg-white/10 text-red-200 hover:bg-white/20'
                    }`}
                  >
                    {type.emoji} {type.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoutes.map((route) => {
            const typeConfig = getRouteTypeConfig(route.type);
            const activeBuses = buses.filter(b => b.routeId === route.id);
            const isFavorite = favorites.includes(route.id);

            return (
              <Card 
                key={route.id} 
                className="bg-white/10 backdrop-blur-xl border-2 border-red-400/20 rounded-2xl overflow-hidden hover:border-red-400/50 hover:shadow-xl hover:shadow-red-500/20 transition-all hover:-translate-y-1 group"
              >
                <CardHeader className={`pb-3 bg-gradient-to-r ${typeConfig.color}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur text-white font-black text-xl">
                        {route.number}
                      </div>
                      <div>
                        <Badge className="bg-white/20 text-white border-0 mb-1">
                          {typeConfig.emoji} {typeConfig.name}
                        </Badge>
                        <p className="text-white/80 text-xs">{activeBuses.length} buses active</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(route.id)}
                      className="text-white hover:bg-white/20 rounded-xl"
                    >
                      <Star className={`h-5 w-5 ${isFavorite ? 'fill-red-300 text-red-300' : ''}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-100">
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <span className="font-semibold">{language === 'kn' ? route.fromKn : route.from}</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-200/70 text-sm pl-1">
                      <ArrowRight className="h-3 w-3" />
                      <span>via {language === 'kn' ? route.viaKn : route.via}</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-100">
                      <div className="w-3 h-3 rounded-full bg-rose-400" />
                      <span className="font-semibold">{language === 'kn' ? route.toKn : route.to}</span>
                    </div>
                  </div>
                  <Link href={`/track?route=${route.id}`}>
                    <Button className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 mt-2">
                      <Zap className="h-4 w-4 mr-2" />
                      Track Buses
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-red-500/20 mb-6">
              <BusIcon className="h-12 w-12 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-100 mb-2">No routes found</h3>
            <p className="text-red-200/60">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
}
