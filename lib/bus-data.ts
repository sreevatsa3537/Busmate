export type CrowdLevel = 'empty' | 'fewSeats' | 'standingRoom' | 'crowded' | 'veryCrowded';

export interface BusStop {
  id: string;
  name: string;
  nameKn: string;
  code: string;
  lat: number;
  lng: number;
  routes: string[];
}

export interface Bus {
  id: string;
  number: string;
  routeId: string;
  from: string;
  fromKn: string;
  to: string;
  toKn: string;
  via: string;
  viaKn: string;
  currentLat: number;
  currentLng: number;
  crowdLevel: CrowdLevel;
  status: 'onTime' | 'delayed' | 'cancelled';
  nextStopId: string;
  estimatedArrival: number; // minutes
  lastUpdated: Date;
  speed: number; // km/h
}

export interface Route {
  id: string;
  number: string;
  from: string;
  fromKn: string;
  to: string;
  toKn: string;
  via: string;
  viaKn: string;
  stops: string[];
  frequency: number; // minutes
  firstBus: string;
  lastBus: string;
  type: 'ordinary' | 'volvo' | 'vajra' | 'vayu';
}

// Bangalore Bus Stops Data
export const busStops: BusStop[] = [
  { id: 'stop1', name: 'Majestic Bus Station', nameKn: 'ಮೆಜೆಸ್ಟಿಕ್ ಬಸ್ ನಿಲ್ದಾಣ', code: 'MJS', lat: 12.9767, lng: 77.5713, routes: ['500', '201', '401', '335'] },
  { id: 'stop2', name: 'Koramangala', nameKn: 'ಕೋರಮಂಗಲ', code: 'KRM', lat: 12.9352, lng: 77.6245, routes: ['500', '201C', '314'] },
  { id: 'stop3', name: 'Electronic City', nameKn: 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ', code: 'ELC', lat: 12.8456, lng: 77.6603, routes: ['500', '500D', '356'] },
  { id: 'stop4', name: 'Whitefield', nameKn: 'ವೈಟ್‌ಫೀಲ್ಡ್', code: 'WTF', lat: 12.9698, lng: 77.7500, routes: ['500E', '335', '411'] },
  { id: 'stop5', name: 'Jayanagar 4th Block', nameKn: 'ಜಯನಗರ 4ನೇ ಬ್ಲಾಕ್', code: 'JN4', lat: 12.9250, lng: 77.5938, routes: ['201', '201C', '410'] },
  { id: 'stop6', name: 'Indiranagar', nameKn: 'ಇಂದಿರಾನಗರ', code: 'IND', lat: 12.9784, lng: 77.6408, routes: ['314', '335', 'V365'] },
  { id: 'stop7', name: 'Banashankari', nameKn: 'ಬನಶಂಕರಿ', code: 'BNS', lat: 12.9255, lng: 77.5468, routes: ['201', '401', '356'] },
  { id: 'stop8', name: 'Yeshwanthpur', nameKn: 'ಯಶವಂತಪುರ', code: 'YSH', lat: 13.0280, lng: 77.5386, routes: ['401', '411', 'V500'] },
  { id: 'stop9', name: 'KR Market', nameKn: 'ಕೆ.ಆರ್. ಮಾರುಕಟ್ಟೆ', code: 'KRM', lat: 12.9630, lng: 77.5785, routes: ['500', '201', '401'] },
  { id: 'stop10', name: 'Shivajinagar', nameKn: 'ಶಿವಾಜಿನಗರ', code: 'SVN', lat: 12.9857, lng: 77.6057, routes: ['314', '335', '410'] },
  { id: 'stop11', name: 'Marathahalli', nameKn: 'ಮಾರಾಠಹಳ್ಳಿ', code: 'MRT', lat: 12.9591, lng: 77.7010, routes: ['500E', '335', 'V365'] },
  { id: 'stop12', name: 'HSR Layout', nameKn: 'ಎಚ್.ಎಸ್.ಆರ್ ಲೇಔಟ್', code: 'HSR', lat: 12.9116, lng: 77.6389, routes: ['500', '356', '314'] },
  { id: 'stop13', name: 'BTM Layout', nameKn: 'ಬಿ.ಟಿ.ಎಂ ಲೇಔಟ್', code: 'BTM', lat: 12.9166, lng: 77.6101, routes: ['500', '201C', '356'] },
  { id: 'stop14', name: 'Hebbal', nameKn: 'ಹೆಬ್ಬಾಳ', code: 'HBL', lat: 13.0358, lng: 77.5970, routes: ['401', '411', 'V500'] },
  { id: 'stop15', name: 'Silk Board', nameKn: 'ಸಿಲ್ಕ್ ಬೋರ್ಡ್', code: 'SLK', lat: 12.9172, lng: 77.6227, routes: ['500', '500D', '356'] },
  { id: 'stop16', name: 'MG Road', nameKn: 'ಎಂ.ಜಿ. ರಸ್ತೆ', code: 'MGR', lat: 12.9756, lng: 77.6070, routes: ['314', '335', 'V365'] },
  { id: 'stop17', name: 'Brigade Road', nameKn: 'ಬ್ರಿಗೇಡ್ ರಸ್ತೆ', code: 'BRG', lat: 12.9716, lng: 77.6072, routes: ['314', '335', '410'] },
  { id: 'stop18', name: 'Madiwala', nameKn: 'ಮಡಿವಾಳ', code: 'MDW', lat: 12.9222, lng: 77.6167, routes: ['500', '201C', '356'] },
  { id: 'stop19', name: 'Kengeri', nameKn: 'ಕೆಂಗೇರಿ', code: 'KNG', lat: 12.9089, lng: 77.4816, routes: ['401', '356', '410'] },
  { id: 'stop20', name: 'Peenya', nameKn: 'ಪೀಣ್ಯ', code: 'PNY', lat: 13.0297, lng: 77.5185, routes: ['401', '411', '500'] },
];

// Bus Routes Data
export const routes: Route[] = [
  { id: 'r1', number: '500', from: 'Majestic', fromKn: 'ಮೆಜೆಸ್ಟಿಕ್', to: 'Electronic City', toKn: 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ', via: 'Silk Board', viaKn: 'ಸಿಲ್ಕ್ ಬೋರ್ಡ್', stops: ['stop1', 'stop9', 'stop5', 'stop13', 'stop15', 'stop18', 'stop12', 'stop3'], frequency: 10, firstBus: '05:30', lastBus: '23:00', type: 'ordinary' },
  { id: 'r2', number: '201', from: 'Banashankari', fromKn: 'ಬನಶಂಕರಿ', to: 'Shivajinagar', toKn: 'ಶಿವಾಜಿನಗರ', via: 'Jayanagar', viaKn: 'ಜಯನಗರ', stops: ['stop7', 'stop5', 'stop1', 'stop9', 'stop10'], frequency: 8, firstBus: '05:00', lastBus: '23:30', type: 'ordinary' },
  { id: 'r3', number: '335', from: 'Whitefield', fromKn: 'ವೈಟ್‌ಫೀಲ್ಡ್', to: 'Majestic', toKn: 'ಮೆಜೆಸ್ಟಿಕ್', via: 'Indiranagar', viaKn: 'ಇಂದಿರಾನಗರ', stops: ['stop4', 'stop11', 'stop6', 'stop16', 'stop10', 'stop1'], frequency: 12, firstBus: '05:30', lastBus: '22:30', type: 'ordinary' },
  { id: 'r4', number: '401', from: 'Kengeri', fromKn: 'ಕೆಂಗೇರಿ', to: 'Hebbal', toKn: 'ಹೆಬ್ಬಾಳ', via: 'Majestic', viaKn: 'ಮೆಜೆಸ್ಟಿಕ್', stops: ['stop19', 'stop7', 'stop1', 'stop8', 'stop14'], frequency: 15, firstBus: '05:00', lastBus: '23:00', type: 'ordinary' },
  { id: 'r5', number: 'V500', from: 'Majestic', fromKn: 'ಮೆಜೆಸ್ಟಿಕ್', to: 'Electronic City', toKn: 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ', via: 'Silk Board', viaKn: 'ಸಿಲ್ಕ್ ಬೋರ್ಡ್', stops: ['stop1', 'stop15', 'stop3'], frequency: 20, firstBus: '06:00', lastBus: '22:00', type: 'volvo' },
  { id: 'r6', number: '314', from: 'Koramangala', fromKn: 'ಕೋರಮಂಗಲ', to: 'MG Road', toKn: 'ಎಂ.ಜಿ. ರಸ್ತೆ', via: 'Indiranagar', viaKn: 'ಇಂದಿರಾನಗರ', stops: ['stop2', 'stop12', 'stop6', 'stop16', 'stop17'], frequency: 10, firstBus: '06:00', lastBus: '22:00', type: 'ordinary' },
  { id: 'r7', number: '411', from: 'Peenya', fromKn: 'ಪೀಣ್ಯ', to: 'Whitefield', toKn: 'ವೈಟ್‌ಫೀಲ್ಡ್', via: 'Yeshwanthpur', viaKn: 'ಯಶವಂತಪುರ', stops: ['stop20', 'stop8', 'stop14', 'stop10', 'stop11', 'stop4'], frequency: 18, firstBus: '05:30', lastBus: '22:00', type: 'ordinary' },
  { id: 'r8', number: 'V365', from: 'Indiranagar', fromKn: 'ಇಂದಿರಾನಗರ', to: 'Marathahalli', toKn: 'ಮಾರಾಠಹಳ್ಳಿ', via: 'MG Road', viaKn: 'ಎಂ.ಜಿ. ರಸ್ತೆ', stops: ['stop6', 'stop16', 'stop11'], frequency: 15, firstBus: '07:00', lastBus: '21:00', type: 'vajra' },
];

// Generate mock buses with live positions
export function generateMockBuses(): Bus[] {
  const crowdLevels: CrowdLevel[] = ['empty', 'fewSeats', 'standingRoom', 'crowded', 'veryCrowded'];
  const statuses: ('onTime' | 'delayed' | 'cancelled')[] = ['onTime', 'onTime', 'onTime', 'delayed'];
  
  return routes.flatMap((route) => {
    return Array.from({ length: 3 }, (_, busIndex) => {
      const stopIndex = (busIndex * 2) % route.stops.length;
      const currentStop = busStops.find(s => s.id === route.stops[stopIndex]);
      const nextStopIdx = Math.min(stopIndex + 1, route.stops.length - 1);
      
      // Add some randomness to position
      const latOffset = (Math.random() - 0.5) * 0.01;
      const lngOffset = (Math.random() - 0.5) * 0.01;
      
      return {
        id: `bus-${route.id}-${busIndex}`,
        number: route.number,
        routeId: route.id,
        from: route.from,
        fromKn: route.fromKn,
        to: route.to,
        toKn: route.toKn,
        via: route.via,
        viaKn: route.viaKn,
        currentLat: (currentStop?.lat || 12.9716) + latOffset,
        currentLng: (currentStop?.lng || 77.5946) + lngOffset,
        crowdLevel: crowdLevels[Math.floor(Math.random() * crowdLevels.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        nextStopId: route.stops[nextStopIdx],
        estimatedArrival: Math.floor(Math.random() * 20) + 1,
        lastUpdated: new Date(),
        speed: Math.floor(Math.random() * 30) + 10,
      };
    });
  });
}

export function getCrowdColor(level: CrowdLevel): string {
  const colors = {
    empty: 'bg-green-500',
    fewSeats: 'bg-lime-500',
    standingRoom: 'bg-yellow-500',
    crowded: 'bg-orange-500',
    veryCrowded: 'bg-red-500',
  };
  return colors[level];
}

export function getCrowdBadgeVariant(level: CrowdLevel): 'default' | 'secondary' | 'destructive' | 'outline' {
  const variants: Record<CrowdLevel, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    empty: 'default',
    fewSeats: 'secondary',
    standingRoom: 'outline',
    crowded: 'destructive',
    veryCrowded: 'destructive',
  };
  return variants[level];
}

export function getRouteTypeColor(type: Route['type']): string {
  const colors = {
    ordinary: 'bg-blue-500',
    volvo: 'bg-purple-600',
    vajra: 'bg-red-600',
    vayu: 'bg-green-600',
  };
  return colors[type];
}
