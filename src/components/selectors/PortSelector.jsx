import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { 
  Ship, 
  Loader2,
} from 'lucide-react';
import useStore from '../../stores/useStore'


 export const PortSelector = () => {
    const { ports, selectedPort, selectedCountry, loading } = useStore();
    const { selectPort } = useStore.actions;
  
    if (!selectedCountry) return null;
  
    const selectedPortData = ports.find(p => p.id_pelabuhan.toString() === selectedPort);
  
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-white animate-in slide-in-from-right">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-purple-700">
            <Ship className="w-5 h-5" />
            Pilih Pelabuhan
            {selectedPortData && (
              <Badge variant="secondary" className="ml-2">
                {selectedPortData.nama_pelabuhan}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="text-sm font-medium">PELABUHAN</Label>
            <Select value={selectedPort} onValueChange={selectPort} disabled={loading.ports}>
              <SelectTrigger className="w-full h-12 border-2 border-purple-200 focus:border-purple-500 transition-colors">
                <SelectValue placeholder="🚢 Tanjung Perak" />
              </SelectTrigger>
              <SelectContent>
                {ports.map((port) => (
                  <SelectItem key={port.id_pelabuhan} value={port.id_pelabuhan.toString()}>
                    <div className="flex items-center gap-2">
                      <Ship className="w-4 h-4" />
                      {port.nama_pelabuhan}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {loading.ports && (
              <div className="flex items-center gap-2 text-sm text-purple-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                Memuat data pelabuhan...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  