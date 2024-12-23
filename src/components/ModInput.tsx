import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus } from 'lucide-react';

interface ModInputProps {
  onModAdd: (workshopId: string, modId: string, mapFolder?: string) => void;
}

export const ModInput = ({ onModAdd }: ModInputProps) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const workshopMatch = input.match(/Workshop\s*ID:?\s*(\d+)/i);
      const modMatch = input.match(/Mod\s*ID:?\s*([^\s\n]+)/i);
      const mapFolderMatch = input.match(/Map\s*Folder:?\s*([^\s\n]+)/i);
      
      if (!workshopMatch || !modMatch) {
        toast.error("Could not find Workshop ID or Mod ID in the text. Please make sure to include both.");
        return;
      }

      const workshopId = workshopMatch[1];
      const modId = modMatch[1];
      const mapFolder = mapFolderMatch ? mapFolderMatch[1] : undefined;

      onModAdd(workshopId, modId, mapFolder);
      setInput('');
      toast.success("Mod information added successfully!");
    } catch (error) {
      console.error("Error processing mod input:", error);
      toast.error("Error processing the input");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste text containing Workshop ID, Mod ID, and optionally Map Folder..."
        className="flex-1"
        disabled={loading}
      />
      <Button 
        type="submit" 
        className="bg-gaming-600 hover:bg-gaming-700"
        disabled={loading}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Mod
      </Button>
    </form>
  );
};