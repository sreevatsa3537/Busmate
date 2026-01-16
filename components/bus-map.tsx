"use client";

import { useEffect, useRef } from "react";
import { Bus, BusStop, busStops } from "@/lib/bus-data";
import { useLanguage } from "@/lib/language-context";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface BusMapProps {
  buses: Bus[];
  selectedBus?: Bus | null;
  onBusSelect?: (bus: Bus) => void;
  onStopSelect?: (stop: BusStop) => void;
}

export function BusMap({ buses, selectedBus, onBusSelect, onStopSelect }: BusMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ buses: L.Marker[]; stops: L.Marker[] }>({ buses: [], stops: [] });
  const { language } = useLanguage();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Bangalore with smooth settings
    const map = L.map(mapRef.current, {
      center: [12.9716, 77.5946],
      zoom: 12,
      zoomControl: true,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
    });

    // Add colorful tile layer - CartoDB Voyager for vibrant colors
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update bus markers with colorful design
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove old bus markers
    markersRef.current.buses.forEach((marker) => marker.remove());
    markersRef.current.buses = [];

    // Add bus markers with vibrant colors
    buses.forEach((bus) => {
      const crowdColors: { [key: string]: { bg: string, glow: string, text: string } } = {
        empty: { bg: 'linear-gradient(135deg, #22c55e, #16a34a)', glow: '#22c55e', text: 'Empty' },
        fewSeats: { bg: 'linear-gradient(135deg, #84cc16, #65a30d)', glow: '#84cc16', text: 'Few Seats' },
        standingRoom: { bg: 'linear-gradient(135deg, #eab308, #ca8a04)', glow: '#eab308', text: 'Standing' },
        crowded: { bg: 'linear-gradient(135deg, #f97316, #ea580c)', glow: '#f97316', text: 'Crowded' },
        packed: { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', glow: '#ef4444', text: 'Packed' },
      };

      const colors = crowdColors[bus.crowdLevel] || crowdColors.empty;

      const busIcon = L.divIcon({
        className: "custom-bus-marker",
        html: `
          <div style="
            background: ${colors.bg};
            color: white;
            padding: 8px 14px;
            border-radius: 12px;
            font-weight: 800;
            font-size: 13px;
            box-shadow: 0 4px 15px ${colors.glow}80, 0 2px 8px rgba(0,0,0,0.2);
            border: 3px solid white;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.3s ease;
            cursor: pointer;
            animation: pulse-marker 2s ease-in-out infinite;
          "
          onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 8px 25px ${colors.glow}'"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 15px ${colors.glow}80'"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M8 6v6m4-6v6m4-6v6M4 20h16a2 2 0 0 0 2-2v-8a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2Zm4 0v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1m14 0v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1"/>
            </svg>
            ${bus.number}
          </div>
          <style>
            @keyframes pulse-marker {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.85; }
            }
          </style>
        `,
        iconSize: [90, 36],
        iconAnchor: [45, 18],
      });

      const marker = L.marker([bus.currentLat, bus.currentLng], { icon: busIcon })
        .addTo(mapInstanceRef.current!);

      const stopName = busStops.find(s => s.id === bus.nextStopId);
      const nextStopName = language === 'kn' ? stopName?.nameKn : stopName?.name;

      marker.bindPopup(`
        <div style="min-width: 240px; padding: 0; border-radius: 16px; overflow: hidden;">
          <div style="background: ${colors.bg}; padding: 16px; color: white;">
            <h3 style="font-weight: 900; margin: 0; font-size: 20px; display: flex; align-items: center; gap: 8px;">
              🚌 Bus ${bus.number}
            </h3>
            <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">${colors.text} • ${bus.speed} km/h</p>
          </div>
          <div style="padding: 16px; background: white;">
            <div style="display: grid; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="background: #dcfce7; color: #166534; padding: 6px; border-radius: 8px; font-size: 14px;">📍</span>
                <div>
                  <p style="margin: 0; font-size: 11px; color: #9ca3af;">From</p>
                  <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">${language === 'kn' ? bus.fromKn : bus.from}</p>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="background: #fee2e2; color: #991b1b; padding: 6px; border-radius: 8px; font-size: 14px;">🎯</span>
                <div>
                  <p style="margin: 0; font-size: 11px; color: #9ca3af;">To</p>
                  <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">${language === 'kn' ? bus.toKn : bus.to}</p>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="background: #fef3c7; color: #92400e; padding: 6px; border-radius: 8px; font-size: 14px;">⏱️</span>
                <div>
                  <p style="margin: 0; font-size: 11px; color: #9ca3af;">Next Stop in</p>
                  <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">${bus.estimatedArrival} min - ${nextStopName || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `, { className: 'custom-popup', closeButton: true, maxWidth: 280 });

      marker.on("click", () => {
        onBusSelect?.(bus);
      });

      markersRef.current.buses.push(marker);
    });
  }, [buses, language, onBusSelect]);

  // Update stop markers with colorful design
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove old stop markers
    markersRef.current.stops.forEach((marker) => marker.remove());
    markersRef.current.stops = [];

    // Add stop markers
    busStops.forEach((stop) => {
      const stopIcon = L.divIcon({
        className: "custom-stop-marker",
        html: `
          <div style="
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.5), 0 2px 6px rgba(0,0,0,0.2);
            border: 3px solid white;
            transition: all 0.3s ease;
            cursor: pointer;
          "
          onmouseover="this.style.transform='scale(1.2)'; this.style.boxShadow='0 8px 25px rgba(59, 130, 246, 0.7)'"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 15px rgba(59, 130, 246, 0.5)'"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([stop.lat, stop.lng], { icon: stopIcon })
        .addTo(mapInstanceRef.current!);

      marker.bindPopup(`
        <div style="min-width: 200px; padding: 0; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 14px; color: white;">
            <h3 style="font-weight: 800; margin: 0; font-size: 16px;">📍 ${language === 'kn' ? stop.nameKn : stop.name}</h3>
            <p style="margin: 4px 0 0 0; font-size: 11px; opacity: 0.9;">Code: ${stop.code}</p>
          </div>
          <div style="padding: 14px; background: white;">
            <p style="margin: 0; font-size: 12px; color: #6b7280;">Available Routes:</p>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
              ${stop.routes.map(r => `<span style="background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700;">${r}</span>`).join('')}
            </div>
          </div>
        </div>
      `, { className: 'custom-popup', closeButton: true, maxWidth: 250 });

      marker.on("click", () => {
        onStopSelect?.(stop);
      });

      markersRef.current.stops.push(marker);
    });
  }, [language, onStopSelect]);

  // Focus on selected bus with smooth animation
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedBus) return;
    
    mapInstanceRef.current.setView([selectedBus.currentLat, selectedBus.currentLng], 15, {
      animate: true,
      duration: 1,
      easeLinearity: 0.25,
    });
  }, [selectedBus]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-2xl overflow-hidden shadow-inner"
      style={{ minHeight: "400px" }}
    />
  );
}
