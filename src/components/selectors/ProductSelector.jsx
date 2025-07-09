import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { 
  Package, 
  Loader2,
} from 'lucide-react';
import useStore from '../../stores/useStore'


 export const ProductSelector = () => {
    const { products, selectedProduct, selectedPort, loading } = useStore();
    const { selectProduct } = useStore.actions;
  
    if (!selectedPort) return null;
  
    const selectedProductData = products.find(p => p.id_barang.toString() === selectedProduct);
  
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
          <div className="space-y-2">
            <Label className="text-sm font-medium">BARANG</Label>
            <Select value={selectedProduct} onValueChange={selectProduct} disabled={loading.products}>
              <SelectTrigger className="w-full h-12 border-2 border-green-200 focus:border-green-500 transition-colors">
                <SelectValue placeholder="📦 17 - SEPEDA" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id_barang} value={product.id_barang.toString()}>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      {product.id_barang} - {product.nama_barang}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {loading.products && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                Memuat data barang...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };