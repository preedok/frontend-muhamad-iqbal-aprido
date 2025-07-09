import React from 'react';
import { ProductDetails } from "./components/details/ProductDetails";
import { CountrySelector } from "./components/selectors/CountrySelector";
import { PortSelector } from "./components/selectors/PortSelector";
import { ProductSelector } from "./components/selectors/ProductSelector";
import { StepIndicator } from "./components/common/StepIndicator";
import { Alert, AlertDescription } from "./components/ui/alert";
import { AlertCircle } from "lucide-react";
import useStore from './stores/useStore';

const App = () => {
  const { error , selectedProduct} = useStore()
  const isProductSelected = selectedProduct !== '';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 container max-w-screen-xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            FRONTEND-MUHAMAD-IQBAL-APRIDO
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Sistem manajemen produk ekspor-impor yang modern dan interaktif
          </p>
        </div>

        <StepIndicator />

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50 animate-in slide-in-from-top">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        <div className={`grid gap-6 md:gap-8 ${isProductSelected ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
  <div className={`space-y-6`}>
    <CountrySelector />
    <PortSelector />
    <ProductSelector />
  </div>

  {isProductSelected && (
    <div className="space-y-6">
      <ProductDetails />
    </div>
  )}
</div>

        <div className="mt-12 text-center text-gray-500">
          <p className="text-sm">
            Dibuat Oleh Muhamad Iqbal Aprido | ReactJS, Zustand, dan Shadcn UI
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
