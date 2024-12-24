import { Input } from "@/components/ui/input";
import { Search, Home, Download } from 'lucide-react';
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
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="hover:bg-gaming-700/10"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          <div className="ml-4 font-semibold">Project Zomboid Mod Manager</div>
        </div>
      </div>

      {/* Main content with top padding to account for navbar */}
      <div className="pt-16 space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Added Mods <ModCounter count={mods.length} />
            </h2>
            <Button
              variant="outline"
              onClick={() => {}} // This will be handled by ModActions
              className="hover:bg-gaming-700/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <ModActions mods={mods} />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search mods..."
              className="pl-10"
            />
          </div>
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
    </div>
  );
};