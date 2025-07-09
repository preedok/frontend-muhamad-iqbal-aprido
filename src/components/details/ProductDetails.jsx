import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { 
  Package, 
  Calculator, 
  Percent,
  DollarSign,
  Sparkles,
  Star
} from 'lucide-react';
import useStore from '../../stores/useStore';


export const ProductDetails = () => {
    const { selectedProduct, productDescription, discount, price, total } = useStore();
  
    if (!selectedProduct) return null;
  
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(amount);
    };
  
    const savings = price * (discount / 100);
  
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-white animate-in slide-in-from-bottom">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-orange-700">
            <Star className="w-5 h-5" />
            Detail Produk
            <Badge variant="outline" className="ml-2">
              <Sparkles className="w-3 h-3 mr-1" />
              Promo {discount}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Package className="w-4 h-4" />
              DESCRIPTION
            </Label>
            <Textarea
              value={productDescription}
              readOnly
              className="min-h-[120px] bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 resize-none"
              placeholder="Deskripsi produk akan muncul di sini..."
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Percent className="w-4 h-4" />
                DISCOUNT
              </Label>
              <div className="relative">
                <Input
                  value={discount}
                  readOnly
                  className="pr-8 h-12 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 text-red-700 font-bold text-center"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 font-bold">%</span>
              </div>
            </div>
  
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                HARGA ASLI
              </Label>
              <Input
                value={formatCurrency(price)}
                readOnly
                className="h-12 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 text-blue-700 font-bold text-center"
              />
            </div>
          </div>
  
          {savings > 0 && (
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-2 border-yellow-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-yellow-800">Hemat:</span>
                <span className="text-lg font-bold text-yellow-700">{formatCurrency(savings)}</span>
              </div>
            </div>
          )}
  
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              TOTAL PEMBAYARAN
            </Label>
            <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl border-0 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {formatCurrency(total)}
                </div>
                <div className="text-sm text-green-100">
                  Sudah termasuk diskon {discount}%
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 text-center">
              Total = Harga × (1 - Diskon/100)
            </div>
          </div>
  
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline"
              className="w-full h-12 border-2 border-gray-300 hover:border-gray-400 transition-colors"
              onClick={() => useStore.actions.resetForm()}
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  