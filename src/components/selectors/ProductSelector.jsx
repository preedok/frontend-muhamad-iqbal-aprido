import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import { Loader2, Package } from 'lucide-react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useStore from '../../stores/useStore';

export const ProductSelector = () => {
  const { products, selectedProduct, selectedPort, loading } = useStore();
  const productList = selectedPort ? products[selectedPort] || [] : [];

  const options = useMemo(() => productList.map(product => ({
    ...product,
    label: product.nama_barang,
    value: product.id_barang.toString()
  })), [productList]);

  const selectedProductData = productList.find(
    p => p.id_barang.toString() === selectedProduct
  );


  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const { fetchProductDetailById } = useStore.actions;

const handleChange = async (_event, newValue) => {
  if (newValue) {
    await fetchProductDetailById(newValue.value);
  }
};
  if (!selectedPort) return null;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-white animate-in slide-in-from-right">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-green-700">
          <Package className="w-5 h-5" />
          Pilih Barang
          {selectedProductData && (
            <Badge variant="secondary" className="ml-2">
              {selectedProductData.nama_barang}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Label className="text-sm font-medium">BARANG</Label>

          <Autocomplete
            fullWidth
            options={options}
            value={options.find(opt => opt.value === selectedProduct) || null}
            onChange={handleChange}
            getOptionLabel={(option) =>
              `${option.nama_barang} (#${option.id_barang})`
            }
            loading={loading.products}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cari atau pilih barang"
                placeholder="Contoh: Kopi, Teh..."
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
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 2,
                  py: 1
                }}
              >
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    {option.nama_barang}{' '}
                    <span className="text-gray-500">#{option.id_barang}</span>
                  </Typography>
                  {option.description && (
                    <Typography variant="caption" color="text.secondary">
                      {option.description}
                    </Typography>
                  )}
                </Box>
                <Box textAlign="right">
                  <Typography variant="body2" color="green">
                    {formatPrice(option.harga)}
                  </Typography>
                  {option.diskon > 0 && (
                    <Typography variant="caption" color="orange">
                      Diskon {option.diskon}%
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          />

          {loading.products && (
            <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Memuat data barang...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
