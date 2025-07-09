import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Ship, Loader2 } from 'lucide-react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useStore from '../../stores/useStore';

export const PortSelector = () => {
  const { ports, selectedPort, selectedCountry, loading } = useStore();
  const { selectPort } = useStore.actions;

  const options = useMemo(
    () =>
      ports.map(port => ({
        ...port,
        label: port.nama_pelabuhan,
        value: port.id_pelabuhan.toString()
      })),
    [ports]
  );

  const selectedPortData = ports.find(p => p.id_pelabuhan.toString() === selectedPort);

  if (!selectedCountry) return null;

  const handleChange = (_event, newValue) => {
    if (newValue) {
      selectPort(newValue.value);
    }
  };

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
        <div className="space-y-3">
          <Label className="text-sm font-medium">PELABUHAN</Label>

          <Autocomplete
            fullWidth
            options={options}
            value={options.find(opt => opt.value === selectedPort) || null}
            onChange={handleChange}
            getOptionLabel={option => option.nama_pelabuhan || ''}
            loading={loading.ports}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cari atau pilih pelabuhan"
                placeholder="Contoh: Tanjung Perak"
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
                <Ship className="w-4 h-4 text-purple-600" />
                <Typography variant="body2">{option.nama_pelabuhan}</Typography>
              </Box>
            )}
          />

          {loading.ports && (
            <div className="flex items-center gap-2 text-sm text-purple-600 mt-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Memuat data pelabuhan...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
