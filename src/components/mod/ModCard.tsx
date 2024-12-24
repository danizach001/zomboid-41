import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from 'lucide-react';

interface Mod {
  workshopId: string;
  modId: string;
  mapFolder?: string;
}

interface ModCardProps {
  mod: Mod;
  index: number;
  onRemove: () => void;
}

export const ModCard = ({ mod, index, onRemove }: ModCardProps) => (
  <Card className="p-4 bg-background/50 backdrop-blur">
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
        onClick={onRemove}
        className="text-destructive hover:text-destructive/90"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  </Card>
);