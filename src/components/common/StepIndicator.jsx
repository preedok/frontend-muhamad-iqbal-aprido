import React from 'react';
import { Globe, Ship, Package, CheckCircle, ArrowRight } from 'lucide-react';
import useStore from '../../stores/useStore';

export const StepIndicator = () => {
  const { step } = useStore();

  const steps = [
    { number: 1, title: 'Negara', icon: Globe },
    { number: 2, title: 'Pelabuhan', icon: Ship },
    { number: 3, title: 'Barang', icon: Package },
    { number: 4, title: 'Selesai', icon: CheckCircle }
  ];

  return (
    <div className="flex justify-center mb-8 px-2">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {steps.map((stepItem, index) => {
          const Icon = stepItem.icon;
          const isActive = step >= stepItem.number;
          const isCurrent = step === stepItem.number;

          return (
            <React.Fragment key={stepItem.number}>
              <div
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'}
                  ${isCurrent ? 'scale-105 shadow-xl' : ''}
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                  {stepItem.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight
                  className={`w-4 h-4 transition-colors ${
                    step > stepItem.number ? 'text-blue-500' : 'text-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
