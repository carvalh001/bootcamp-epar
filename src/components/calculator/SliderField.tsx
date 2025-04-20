
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SliderFieldProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  unit?: string;
  infoTooltip?: string;
  formatDisplay?: (value: number) => string;
  required?: boolean;
  allowTextInput?: boolean;
}

const SliderField = ({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit = '',
  infoTooltip,
  formatDisplay,
  required = false,
  allowTextInput = false
}: SliderFieldProps) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!allowTextInput) return;
    
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Only update parent component if value is valid
    const numValue = Number(newValue);
    if (!isNaN(numValue)) {
      // Allow typing values higher than max (they'll be clamped on blur)
      onChange(numValue);
    }
  };

  const handleInputBlur = () => {
    if (!allowTextInput) return;
    
    // Validate and correct input when field loses focus
    let numValue = Number(inputValue);
    
    if (isNaN(numValue)) {
      numValue = value; // Revert to previous valid value
    } else {
      // Clamp to min/max range
      numValue = Math.max(min, Math.min(max, numValue));
    }
    
    setInputValue(numValue.toString());
    onChange(numValue);
  };
  
  // Update local state when parent value changes
  useEffect(() => {
    setInputValue(formatDisplay ? formatDisplay(value) : value.toString());
  }, [value, formatDisplay]);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor={id} className="text-gray-700 font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {infoTooltip && (
          <div className="group relative">
            <Info className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
              {infoTooltip}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Slider
          id={id}
          min={min}
          max={max}
          step={step}
          value={[Math.min(value, max)]} // Ensure slider doesn't exceed max
          onValueChange={(values) => onChange(values[0])}
          className="flex-1"
        />
        <Input
          type="text" 
          inputMode="numeric"
          value={formatDisplay ? formatDisplay(value) : inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={`min-w-12 w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${!allowTextInput ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          readOnly={!allowTextInput}
        />
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>
    </div>
  );
};

export default SliderField;
