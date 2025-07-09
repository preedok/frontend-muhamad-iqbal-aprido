import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { 
  Globe, 
  Loader2,
  MapPin,
} from 'lucide-react';
import useStore from '../../stores/useStore'


export const CountrySelector = () => {
    const { countries, selectedCountry, loading } = useStore();
    const { fetchCountries, selectCountry } = useStore.actions;
  
    useEffect(() => {
      fetchCountries();
    }, []);
  
    const selectedCountryData = countries.find(c => c.id_negara.toString() === selectedCountry);
  
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
            <Globe className="w-5 h-5" />
            Pilih Negara
            {selectedCountryData && (
              <Badge variant="secondary" className="ml-2">
                {selectedCountryData.kode_negara}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="text-sm font-medium">NEGARA</Label>
            <Select value={selectedCountry} onValueChange={selectCountry} disabled={loading.countries}>
              <SelectTrigger className="w-full h-12 border-2 border-blue-200 focus:border-blue-500 transition-colors">
                <SelectValue placeholder="🇮🇩 ID - INDONESIA" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.id_negara} value={country.id_negara.toString()}>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {country.kode_negara} - {country.nama_negara}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {loading.countries && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                Memuat data negara...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  
