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
      <Languages className="h-4 w-4 text-muted-foreground" />
      <Select value={language} onValueChange={(val) => setLanguage(val as 'en' | 'kn')}>
        <SelectTrigger className="w-[120px] h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">
            <span className="flex items-center gap-2">
              <Globe className="h-3 w-3" />
              English
            </span>
          </SelectItem>
          <SelectItem value="kn">
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
