"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitch } from "./language-switch";
import { Bus, MapPin, Menu, Star, Home, Bell, User, LogOut, Settings, Zap, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface HeaderProps {
  onLogout?: () => void;
  onNavigate?: (section: string) => void;
  activeSection?: string;
}

export function Header({ onLogout, onNavigate, activeSection = 'home' }: HeaderProps) {
  const { t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, text: "Bus 500D arriving in 2 mins", time: "Just now", type: "arrival" },
    { id: 2, text: "Route 335E delayed by 10 mins", time: "5 mins ago", type: "delay" },
    { id: 3, text: "New route available: 401", time: "1 hour ago", type: "new" },
  ];

  const handleNavClick = (section: string) => {
    onNavigate?.(section);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-red-400/30 bg-gradient-to-r from-red-700 via-rose-600 to-red-700 shadow-lg shadow-red-500/20">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/20">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] bg-gradient-to-b from-red-50 to-rose-50 border-r-2 border-red-300">
              <nav className="flex flex-col gap-3 mt-8">
                <button 
                  onClick={() => handleNavClick('home')} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === 'home' 
                      ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md' 
                      : 'hover:bg-red-100 text-gray-700 hover:translate-x-1'
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span className="font-semibold">{t('home')}</span>
                </button>
                <button 
                  onClick={() => handleNavClick('routes')} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === 'routes' 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md' 
                      : 'hover:bg-rose-100 text-gray-700 hover:translate-x-1'
                  }`}
                >
                  <Bus className="h-5 w-5" />
                  <span>{t('routes')}</span>
                </button>
                <button 
                  onClick={() => handleNavClick('stops')} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === 'stops' 
                      ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md' 
                      : 'hover:bg-pink-100 text-gray-700 hover:translate-x-1'
                  }`}
                >
                  <MapPin className="h-5 w-5" />
                  <span>{t('stops')}</span>
                </button>
                <button 
                  onClick={() => handleNavClick('favorites')} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === 'favorites' 
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md' 
                      : 'hover:bg-red-100 text-gray-700 hover:translate-x-1'
                  }`}
                >
                  <Star className="h-5 w-5" />
                  <span>{t('favorites')}</span>
                </button>
                <div className="mt-6 px-3">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-red-100 to-rose-100 border border-red-300">
                    <LanguageSwitch />
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          
          <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg group-hover:scale-110 transition-transform animate-glow-throb">
                <Bus className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-white leading-none flex items-center gap-1">
                Bus<span className="text-red-200">Mate</span>
                <Zap className="h-4 w-4 text-red-200 animate-pulse" />
              </h1>
              <p className="text-xs text-red-100">{t('tagline')}</p>
            </div>
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { name: t('home'), icon: Home, color: "from-red-500 to-rose-500", section: 'home' },
            { name: t('routes'), icon: Bus, color: "from-rose-500 to-pink-500", section: 'routes' },
            { name: t('stops'), icon: MapPin, color: "from-pink-500 to-red-500", section: 'stops' },
            { name: t('favorites'), icon: Star, color: "from-red-600 to-rose-600", section: 'favorites' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(item.section)}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all group overflow-hidden ${
                activeSection === item.section 
                  ? 'text-white' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              <span className={`absolute inset-0 bg-gradient-to-r ${item.color} ${
                activeSection === item.section ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              } transition-opacity rounded-xl`} />
              <span className="relative flex items-center gap-1.5">
                <item.icon className="h-4 w-4" />
                {item.name}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 relative"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse" />
            </Button>
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border-2 border-red-200 overflow-hidden z-50">
                <div className="p-4 bg-gradient-to-r from-red-500 to-rose-500 text-white flex items-center justify-between">
                  <h3 className="font-bold flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </h3>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3 border-b border-gray-100 hover:bg-red-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notif.type === 'arrival' ? 'bg-green-500' :
                          notif.type === 'delay' ? 'bg-red-500' : 'bg-blue-500'
                        }`} />
                        <div>
                          <p className="text-sm text-gray-800">{notif.text}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="w-full p-3 text-center text-sm text-green-600 font-medium hover:bg-green-50 transition-colors"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>

          {/* Language Switch */}
          <div className="hidden sm:block">
            <LanguageSwitch />
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                J
              </div>
            </Button>
            {showProfile && (
              <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-2xl border-2 border-green-200 overflow-hidden z-50">
                <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <p className="font-bold">Hello, J Sreevatsa!</p>
                  <p className="text-sm text-green-100">jsreevatsa@busmate.in</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => setShowProfile(false)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-green-50 text-gray-700 transition-colors"
                  >
                    <User className="h-4 w-4 text-green-600" />
                    <span className="text-sm">My Profile</span>
                  </button>
                  <button 
                    onClick={() => setShowProfile(false)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-yellow-50 text-gray-700 transition-colors"
                  >
                    <Settings className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Settings</span>
                  </button>
                  <hr className="my-2" />
                  <button 
                    onClick={() => {
                      setShowProfile(false);
                      onLogout?.();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
