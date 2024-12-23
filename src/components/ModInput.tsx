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
      // Extract Workshop ID and Mod ID from URL or text
      const workshopMatch = url.match(/WORKSHOP\s*ID\s*:\s*(\d+)/i);
      const modMatch = url.match(/MOD\s*ID\s*:\s*([^\s]+)/i);

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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste Steam Workshop URL or text containing Workshop ID and Mod ID..."
        className="flex-1"
      />
      <Button type="submit" className="bg-gaming-600 hover:bg-gaming-700">
        <Plus className="w-4 h-4 mr-2" />
        Add Mod
      </Button>
    </form>
  );
};