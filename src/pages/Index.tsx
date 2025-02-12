import { useState } from 'react';
import { ModInput } from '@/components/ModInput';
import { ModList } from '@/components/ModList';

interface Mod {
  workshopId: string;
  modId: string;
  mapFolder?: string;
}

const Index = () => {
  const [mods, setMods] = useState<Mod[]>([]);

  const handleAddMod = (workshopId: string, modId: string, mapFolder?: string) => {
    setMods([...mods, { workshopId, modId, mapFolder }]);
  };

  const handleRemoveMod = (index: number) => {
    setMods(mods.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gaming-900 to-background p-8">
      <div className="max-w-4xl mx-auto space-y-4 pt-16">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gaming-100">
            Project Zomboid Mod Manager
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Paste your Steam Workshop URLs or text containing mod information below. 
            The tool will automatically extract Workshop IDs, Mod IDs, and Map Folders.
          </p>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <ModInput onModAdd={handleAddMod} />
          <ModList mods={mods} onRemoveMod={handleRemoveMod} />
        </div>
      </div>
    </div>
  );
};

export default Index;