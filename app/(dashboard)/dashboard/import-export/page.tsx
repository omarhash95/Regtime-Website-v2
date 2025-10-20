"use client";

import { Upload, Download, FileSpreadsheet } from 'lucide-react';

export default function ImportExportPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#111111]">Import / Export</h2>
        <p className="text-[#636363] mt-1">Import data from Excel or export reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[#9CB2BC]/20 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-[#78C7EA]/10 p-3 rounded-lg">
              <Upload className="h-6 w-6 text-[#78C7EA]" />
            </div>
            <div>
              <h3 className="font-bold text-[#111111]">Import Data</h3>
              <p className="text-sm text-[#636363]">Upload Excel files</p>
            </div>
          </div>

          <div className="border-2 border-dashed border-[#9CB2BC] rounded-lg p-8 text-center hover:border-[#78C7EA] transition-colors cursor-pointer">
            <FileSpreadsheet className="h-12 w-12 text-[#9CB2BC] mx-auto mb-3" />
            <p className="text-sm font-medium text-[#111111] mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-[#636363]">Excel files (.xlsx, .xls)</p>
          </div>

          <button className="w-full bg-[#78C7EA] hover:bg-[#496671] text-white px-4 py-2 rounded-lg transition-colors duration-200">
            Import File
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#9CB2BC]/20 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-[#78C7EA]/10 p-3 rounded-lg">
              <Download className="h-6 w-6 text-[#78C7EA]" />
            </div>
            <div>
              <h3 className="font-bold text-[#111111]">Export Data</h3>
              <p className="text-sm text-[#636363]">Download reports</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 border border-[#9CB2BC] rounded-lg hover:border-[#78C7EA] hover:bg-[#DEEDF4]/30 transition-all">
              <p className="font-medium text-[#111111]">All Projects</p>
              <p className="text-xs text-[#636363]">Export all project data</p>
            </button>

            <button className="w-full text-left px-4 py-3 border border-[#9CB2BC] rounded-lg hover:border-[#78C7EA] hover:bg-[#DEEDF4]/30 transition-all">
              <p className="font-medium text-[#111111]">Compliance Records</p>
              <p className="text-xs text-[#636363]">Export compliance data</p>
            </button>

            <button className="w-full text-left px-4 py-3 border border-[#9CB2BC] rounded-lg hover:border-[#78C7EA] hover:bg-[#DEEDF4]/30 transition-all">
              <p className="font-medium text-[#111111]">Property Analysis</p>
              <p className="text-xs text-[#636363]">Export property reports</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
