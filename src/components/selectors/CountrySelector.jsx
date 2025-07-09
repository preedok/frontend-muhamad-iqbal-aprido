import { useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Globe, Loader2, MapPin } from 'lucide-react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useStore from '../../stores/useStore';

export const CountrySelector = () => {
  const { countries, selectedCountry, loading } = useStore();
  const { fetchCountries, selectCountry } = useStore.actions;

  useEffect(() => {
    fetchCountries();
  }, []);

  const options = useMemo(
    () =>
      countries.map(country => ({
        ...country,
        label: `${country.kode_negara} - ${country.nama_negara}`,
        value: country.id_negara.toString()
      })),
    [countries]
  );

  const selectedCountryData = countries.find(c => c.id_negara.toString() === selectedCountry);

  const handleChange = (_event, newValue) => {
    if (newValue) {
      selectCountry(newValue.value);
    }
  };

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
        <div className="space-y-3">
          <Label className="text-sm font-medium">NEGARA</Label>

          <Autocomplete
            fullWidth
            options={options}
            value={options.find(opt => opt.value === selectedCountry) || null}
            onChange={handleChange}
            getOptionLabel={(option) => option.label || ''}
            loading={loading.countries}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cari atau pilih negara"
                placeholder="Contoh: ID - Indonesia"
                variant="outlined"
              />
            )}
            renderOption={(props, option) => (
              <Box
                component="li"
                {...props}
                key={option.value}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1
                }}
              >
                <MapPin className="w-4 h-4 text-blue-600" />
                <Typography variant="body2">
                  {option.kode_negara} - {option.nama_negara}
                </Typography>
              </Box>
            )}
          />

          {loading.countries && (
            <div className="flex items-center gap-2 text-sm text-blue-600 mt-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Memuat data negara...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
