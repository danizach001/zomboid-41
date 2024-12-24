import { Input } from "@/components/ui/input";
import { Search, Home } from 'lucide-react';
import { useState } from "react";
import { ModCounter } from "./mod/ModCounter";
import { ModActions } from "./mod/ModActions";
import { ModCard } from "./mod/ModCard";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface Mod {
  workshopId: string;
  modId: string;
  mapFolder?: string;
}

interface ModListProps {
  mods: Mod[];
  onRemoveMod: (index: number) => void;
}

export const ModList = ({ mods, onRemoveMod }: ModListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredMods = mods.filter(mod => 
    mod.modId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mod.workshopId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (mod.mapFolder && mod.mapFolder.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (mods.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-8">
        No mods added yet. Paste text containing Workshop ID and Mod ID to get started.
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="hover:bg-gaming-700/10"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Added Mods <ModCounter count={mods.length} />
          </h2>
        </div>
        <ModActions mods={mods} />
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search mods..."
          className="pl-10"
        />
      </div>

      <div className="space-y-3">
        {filteredMods.map((mod, index) => (
          <ModCard
            key={index}
            mod={mod}
            index={index}
            onRemove={() => onRemoveMod(index)}
          />
        ))}
      </div>
    </div>
  );
};