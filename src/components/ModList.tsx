import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Trash2, Search } from 'lucide-react';
import { toast } from "sonner";
import { useState } from "react";

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

  const copyWorkshopIds = () => {
    const workshopIds = mods.map(mod => mod.workshopId).join(';') + ';';
    navigator.clipboard.writeText(workshopIds);
    toast.success("Workshop IDs copied to clipboard!");
  };

  const copyModIds = () => {
    const modIds = mods.map(mod => mod.modId).join(';') + ';';
    navigator.clipboard.writeText(modIds);
    toast.success("Mod IDs copied to clipboard!");
  };

  const copyMapFolders = () => {
    const mapFolders = mods
      .filter(mod => mod.mapFolder)
      .map(mod => mod.mapFolder)
      .join(';') + ';';
    navigator.clipboard.writeText(mapFolders);
    toast.success("Map folders copied to clipboard!");
  };

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

  const hasMapFolders = mods.some(mod => mod.mapFolder);

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Added Mods ({mods.length})</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={copyWorkshopIds}
            className="hover:bg-gaming-700/10"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Workshop IDs
          </Button>
          <Button 
            variant="outline" 
            onClick={copyModIds}
            className="hover:bg-gaming-700/10"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Mod IDs
          </Button>
          {hasMapFolders && (
            <Button 
              variant="outline" 
              onClick={copyMapFolders}
              className="hover:bg-gaming-700/10"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Map Folders
            </Button>
          )}
        </div>
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
          <Card key={index} className="p-4 bg-background/50 backdrop-blur">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-mono text-sm">
                  <span className="text-gaming-400">Workshop ID:</span> {mod.workshopId}
                </p>
                <p className="font-mono text-sm">
                  <span className="text-gaming-400">Mod ID:</span> {mod.modId}
                </p>
                {mod.mapFolder && (
                  <p className="font-mono text-sm">
                    <span className="text-gaming-400">Map Folder:</span> {mod.mapFolder}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveMod(index)}
                className="text-destructive hover:text-destructive/90"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};