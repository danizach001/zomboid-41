import { Button } from "@/components/ui/button";
import { Copy, Download } from 'lucide-react';
import { toast } from "sonner";

interface Mod {
  workshopId: string;
  modId: string;
  mapFolder?: string;
}

interface ModActionsProps {
  mods: Mod[];
}

export const ModActions = ({ mods }: ModActionsProps) => {
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

  const exportMods = () => {
    let content = `Workshop ID: ${mods.map(mod => mod.workshopId).join(';')};\n\n`;
    content += `Mod ID: ${mods.map(mod => mod.modId).join(';')};\n\n`;
    
    if (mods.some(mod => mod.mapFolder)) {
      content += `Map Folder: ${mods.filter(mod => mod.mapFolder).map(mod => mod.mapFolder).join(';')};\n`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zomboid-mods.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Mods exported successfully!");
  };

  const hasMapFolders = mods.some(mod => mod.mapFolder);

  return (
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
      <Button 
        variant="outline" 
        onClick={exportMods}
        className="hover:bg-gaming-700/10"
      >
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>
    </div>
  );
};