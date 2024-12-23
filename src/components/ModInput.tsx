import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus } from 'lucide-react';
import axios from 'axios';

interface ModInputProps {
  onModAdd: (workshopId: string, modId: string) => void;
}

export const ModInput = ({ onModAdd }: ModInputProps) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.includes('steamcommunity.com/sharedfiles/filedetails')) {
      toast.error("Please enter a valid Steam Workshop URL");
      return;
    }

    setLoading(true);

    try {
      // Due to CORS restrictions, we'll need to use a proxy or backend service
      // For now, we'll extract the Workshop ID from the URL itself
      const workshopId = url.match(/id=(\d+)/)?.[1];
      
      if (!workshopId) {
        toast.error("Could not find Workshop ID in the URL");
        return;
      }

      // Note: Due to CORS restrictions, we cannot directly fetch the Steam page content
      // In a production environment, this would require a backend proxy or Steam API
      // For now, we'll show a message explaining the limitation
      toast.error("Due to Steam's security restrictions, we cannot automatically fetch mod details. Please paste the Workshop ID and Mod ID text directly.");
      
      setUrl('');
    } catch (error) {
      console.error("Error processing mod URL:", error);
      toast.error("Error processing the Steam Workshop URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste Steam Workshop URL..."
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