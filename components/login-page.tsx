"use client";

import { useState } from "react";
import { Bus, MapPin, Users, Zap, Eye, EyeOff, ArrowRight, Sparkles, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const features = [
    { icon: MapPin, title: "Live Tracking", desc: "Real-time GPS", color: "from-red-400 to-rose-500" },
    { icon: Users, title: "Crowd Info", desc: "Know the rush", color: "from-rose-400 to-pink-500" },
    { icon: Zap, title: "Fast Updates", desc: "Instant alerts", color: "from-pink-400 to-red-500" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-950 via-rose-900 to-red-900">
      {/* Meteor shower & bottom fumes background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Meteors with trails */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`meteor-${i}`}
            className="absolute animate-meteor"
            style={{
              left: `${10 + Math.random() * 90}%`,
              top: '-100px',
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {/* Meteor head */}
            <div className="w-1 h-1 bg-red-300 rounded-full shadow-[0_0_6px_2px_rgba(252,165,165,0.8)]" />
            {/* Trail */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-t from-transparent via-red-400/20 to-red-300/60"
              style={{ height: `${80 + Math.random() * 60}px` }}
            />
          </div>
        ))}

        {/* Bottom glow layer */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-red-600/30 via-red-500/10 to-transparent animate-glow-rise" />
        <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t from-rose-500/20 via-rose-400/5 to-transparent animate-glow-rise" style={{ animationDelay: '-2s' }} />

        {/* Rising fumes/smoke */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`fume-${i}`}
            className="absolute bottom-0 animate-fume"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          >
            <div 
              className="rounded-full bg-red-500/20 blur-2xl"
              style={{ 
                width: `${60 + Math.random() * 80}px`,
                height: `${60 + Math.random() * 80}px`,
              }}
            />
          </div>
        ))}

        {/* Rising embers */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`ember-${i}`}
            className="absolute bottom-0 w-1 h-1 rounded-full bg-red-400/70 shadow-[0_0_4px_rgba(248,113,113,0.6)] animate-ember"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Ambient glow spots */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Right Side - Form (moved to right) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:order-2">
          <Card className="w-full max-w-md bg-red-900/40 backdrop-blur-xl border border-red-400/30 shadow-2xl shadow-red-900/50 rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              {/* Logo at top of form */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/30 animate-glow-throb">
                  <Bus className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white">BusMate</h1>
                  <p className="text-xs text-red-200">Bangalore Transit</p>
                </div>
              </div>

              {/* Tab buttons - rearranged as pills */}
              <div className="flex gap-2 mb-6 bg-red-950/50 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                    activeTab === "login"
                      ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md"
                      : "text-red-200 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab("signup")}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                    activeTab === "signup"
                      ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md"
                      : "text-red-200 hover:text-white"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === "signup" && (
                  <div>
                    <label className="block text-sm font-semibold text-red-100 mb-1.5">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      className="h-12 rounded-xl border-0 bg-red-950/50 text-white placeholder:text-red-300/50 focus:ring-2 focus:ring-red-400/50"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-red-100 mb-1.5">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 rounded-xl border-0 bg-red-950/50 text-white placeholder:text-red-300/50 focus:ring-2 focus:ring-red-400/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-100 mb-1.5">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-12 rounded-xl border-0 bg-red-950/50 text-white placeholder:text-red-300/50 focus:ring-2 focus:ring-red-400/50 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-300 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {activeTab === "login" && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-red-400/30 bg-red-950/50 text-red-500 focus:ring-red-500" />
                      <span className="text-sm text-red-200">Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-red-300 hover:text-white font-medium">
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-red-600 hover:from-red-600 hover:via-rose-600 hover:to-red-700 text-white font-bold text-base shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 animate-heartbeat" />
                      <span>Please wait...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{activeTab === "login" ? "Sign In" : "Create Account"}</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-red-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-red-400">or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-xl border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all"
                    onClick={onLogin}
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                      <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                      <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                      <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-xl border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all"
                    onClick={onLogin}
                  >
                    <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>

                {/* Skip Login for Demo */}
                <button
                  type="button"
                  onClick={onLogin}
                  className="w-full mt-4 text-sm text-gray-400 hover:text-red-600 transition-colors"
                >
                  Skip for now →
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Left Side - Branding (moved to left) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 lg:order-1">
          {/* Feature cards - rearranged vertically on left */}
          <div className="space-y-4 mb-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg animate-pulse`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{feature.title}</h3>
                  <p className="text-sm text-red-200">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main branding */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-red-200 text-sm font-medium mb-6 animate-pulse">
              <Sparkles className="h-4 w-4" />
              Real-time Transit Tracking
            </div>
            
            <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg">
              <span className="blood-shine">BusMate</span>
            </h1>
            
            <p className="text-xl text-red-200 font-medium mb-8">
              Navigate Bangalore with Ease
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-heartbeat">
                <Heart className="h-6 w-6 text-red-300" fill="currentColor" />
              </div>
              <p className="text-red-300 text-sm">Made with love for Bengaluru</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-red-950/50">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"/>
        </svg>
      </div>
    </div>
  );
}
