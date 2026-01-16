"use client";

import { useLanguage } from "@/lib/language-context";
import { Globe, Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-red-200" />
      <Select value={language} onValueChange={(val) => setLanguage(val as 'en' | 'kn')}>
        <SelectTrigger className="w-[120px] h-8 bg-white/10 border-none text-white hover:bg-white/20 focus:ring-0 focus:ring-offset-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-red-900 border-red-700">
          <SelectItem value="en" className="text-white hover:bg-red-800 focus:bg-red-800 focus:text-white">
            <span className="flex items-center gap-2">
              <Globe className="h-3 w-3" />
              English
            </span>
          </SelectItem>
          <SelectItem value="kn" className="text-white hover:bg-red-800 focus:bg-red-800 focus:text-white">
            <span className="flex items-center gap-2">
              <Globe className="h-3 w-3" />
              ಕನ್ನಡ
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
