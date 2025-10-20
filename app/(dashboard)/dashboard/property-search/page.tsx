"use client";

import { useState } from 'react';
import { Search, Building2, MapPin } from 'lucide-react';

export default function PropertySearchPage() {
  const [searchType, setSearchType] = useState<'bbl' | 'address'>('bbl');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#111111]">Property Search</h2>
        <p className="text-[#636363] mt-1">Search NYC properties by BBL or address</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-[#9CB2BC]/20 space-y-6">
        <div className="flex space-x-4 border-b border-[#EBEBEB]">
          <button
            onClick={() => setSearchType('bbl')}
            className={`pb-3 px-4 font-medium transition-all ${
              searchType === 'bbl'
                ? 'text-[#78C7EA] border-b-2 border-[#78C7EA]'
                : 'text-[#636363] hover:text-[#111111]'
            }`}
          >
            Search by BBL
          </button>
          <button
            onClick={() => setSearchType('address')}
            className={`pb-3 px-4 font-medium transition-all ${
              searchType === 'address'
                ? 'text-[#78C7EA] border-b-2 border-[#78C7EA]'
                : 'text-[#636363] hover:text-[#111111]'
            }`}
          >
            Search by Address
          </button>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#111111]">
              {searchType === 'bbl' ? 'BBL (Borough-Block-Lot)' : 'Property Address'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={
                  searchType === 'bbl'
                    ? 'e.g., 1-00123-0001 or 1001230001'
                    : 'e.g., 123 Main St, Brooklyn, NY'
                }
                className="w-full px-4 py-3 pl-10 border border-[#9CB2BC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78C7EA] focus:border-transparent"
              />
              {searchType === 'bbl' ? (
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#636363]" />
              ) : (
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#636363]" />
              )}
            </div>
            {searchType === 'bbl' && (
              <p className="text-xs text-[#636363]">
                Format: Borough-Block-Lot (e.g., 1-00123-0001) or without dashes
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !searchValue}
            className="w-full flex items-center justify-center space-x-2 bg-[#78C7EA] hover:bg-[#496671] text-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="h-5 w-5" />
            <span>{loading ? 'Searching...' : 'Search Property'}</span>
          </button>
        </form>
      </div>

      <div className="bg-[#78C7EA]/5 border border-[#78C7EA]/20 rounded-xl p-6">
        <h3 className="font-semibold text-[#111111] mb-2">How to use Property Search</h3>
        <ul className="space-y-2 text-sm text-[#636363]">
          <li className="flex items-start space-x-2">
            <span className="text-[#78C7EA] mt-1">•</span>
            <span>BBL (Borough-Block-Lot) is a unique identifier for NYC properties</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-[#78C7EA] mt-1">•</span>
            <span>Borough codes: 1=Manhattan, 2=Bronx, 3=Brooklyn, 4=Queens, 5=Staten Island</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-[#78C7EA] mt-1">•</span>
            <span>Search results will display zoning, lot size, building details, and compliance data</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
