import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Trash2 } from 'lucide-react';
import { toast } from "sonner";

interface Mod {
  workshopId: string;
  modId: string;
}

interface ModListProps {
  mods: Mod[];
  onRemoveMod: (index: number) => void;
}

export const ModList = ({ mods, onRemoveMod }: ModListProps) => {
  const copyModList = () => {
    const modText = mods
      .map(mod => `Workshop ID: ${mod.workshopId}\nMod ID: ${mod.modId}`)
      .join('\n\n');
    
    navigator.clipboard.writeText(modText);
    toast.success("Mod list copied to clipboard!");
  };

  if (mods.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-8">
        No mods added yet. Paste a Steam Workshop URL to get started.
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Added Mods ({mods.length})</h2>
        <Button 
          variant="outline" 
          onClick={copyModList}
          className="hover:bg-gaming-700/10"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy All
        </Button>
      </div>
      <div className="space-y-3">
        {mods.map((mod, index) => (
          <Card key={index} className="p-4 bg-background/50 backdrop-blur">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-mono text-sm">
                  <span className="text-gaming-400">Workshop ID:</span> {mod.workshopId}
                </p>
                <p className="font-mono text-sm">
                  <span className="text-gaming-400">Mod ID:</span> {mod.modId}
                </p>
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