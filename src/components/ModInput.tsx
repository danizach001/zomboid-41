import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus } from 'lucide-react';

interface ModInputProps {
  onModAdd: (workshopId: string, modId: string) => void;
}

export const ModInput = ({ onModAdd }: ModInputProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Extract Workshop ID and Mod ID from text
      // Looking for patterns like "Workshop ID: 2392709985" and "Mod ID: tsarslib"
      const workshopMatch = url.match(/Workshop\s*ID:?\s*(\d+)/i);
      const modMatch = url.match(/Mod\s*ID:?\s*([^\s\n]+)/i);

      if (!workshopMatch || !modMatch) {
        toast.error("Could not find Workshop ID or Mod ID in the provided text");
        return;
      }

      const workshopId = workshopMatch[1];
      const modId = modMatch[1];

      onModAdd(workshopId, modId);
      setUrl('');
      toast.success("Mod information extracted successfully!");
    } catch (error) {
      toast.error("Error processing the input");
      console.error("Error processing mod input:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste text containing Workshop ID and Mod ID..."
        className="flex-1"
      />
      <Button type="submit" className="bg-gaming-600 hover:bg-gaming-700">
        <Plus className="w-4 h-4 mr-2" />
        Add Mod
      </Button>
    </form>
  );
};