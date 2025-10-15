"use client";

import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function FARCalculatorPage() {
  const [lotSize, setLotSize] = useState('');
  const [farRatio, setFarRatio] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const lot = parseFloat(lotSize);
    const far = parseFloat(farRatio);
    if (!isNaN(lot) && !isNaN(far)) {
      setResult(lot * far);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#111111]">FAR Calculator</h2>
        <p className="text-[#636363] mt-1">Calculate floor area ratio for development projects</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-[#9CB2BC]/20">
        <form onSubmit={handleCalculate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#111111]">
                Lot Size (sq ft)
              </label>
              <input
                type="number"
                value={lotSize}
                onChange={(e) => setLotSize(e.target.value)}
                placeholder="10000"
                className="w-full px-4 py-3 border border-[#9CB2BC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78C7EA] focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#111111]">
                FAR Ratio
              </label>
              <input
                type="number"
                step="0.01"
                value={farRatio}
                onChange={(e) => setFarRatio(e.target.value)}
                placeholder="2.0"
                className="w-full px-4 py-3 border border-[#9CB2BC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78C7EA] focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-[#78C7EA] hover:bg-[#496671] text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <Calculator className="h-5 w-5" />
            <span>Calculate</span>
          </button>
        </form>

        {result !== null && (
          <div className="mt-6 p-6 bg-[#78C7EA]/5 border border-[#78C7EA]/20 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-[#636363] mb-2">Maximum Floor Area</p>
              <p className="text-4xl font-bold text-[#78C7EA]">
                {result.toLocaleString()} sq ft
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-[#78C7EA]/5 border border-[#78C7EA]/20 rounded-xl p-6">
        <h3 className="font-semibold text-[#111111] mb-2">About FAR</h3>
        <p className="text-sm text-[#636363] mb-4">
          Floor Area Ratio (FAR) is the ratio of a building&apos;s total floor area to the size of the lot on which it is built. It&apos;s a key zoning regulation that controls building density.
        </p>
        <p className="text-sm text-[#636363]">
          <strong className="text-[#111111]">Example:</strong> A 10,000 sq ft lot with a FAR of 2.0 allows for a maximum of 20,000 sq ft of floor space across all floors.
        </p>
      </div>
    </div>
  );
}
