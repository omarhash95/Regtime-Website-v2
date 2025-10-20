"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Calendar, MapPin } from 'lucide-react';

const sampleProjects = [
  {
    id: '1',
    name: 'Brooklyn Heights Development',
    address: '123 Main St, Brooklyn, NY',
    bbl: '3-00123-0001',
    status: 'active',
    progress: 65,
    lastUpdated: '2 days ago',
  },
  {
    id: '2',
    name: 'Manhattan Commercial Conversion',
    address: '456 Park Ave, Manhattan, NY',
    bbl: '1-00456-0002',
    status: 'active',
    progress: 40,
    lastUpdated: '1 week ago',
  },
  {
    id: '3',
    name: 'Queens Residential Complex',
    address: '789 Queens Blvd, Queens, NY',
    bbl: '4-00789-0003',
    status: 'planning',
    progress: 15,
    lastUpdated: '3 days ago',
  },
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#111111]">Projects</h2>
          <p className="text-[#636363] mt-1">Manage your development projects</p>
        </div>
        <button className="flex items-center space-x-2 bg-[#78C7EA] hover:bg-[#496671] text-white px-4 py-2 rounded-lg transition-colors duration-200">
          <Plus className="h-5 w-5" />
          <span>New Project</span>
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 border border-[#9CB2BC]/20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#636363]" />
          <input
            type="text"
            placeholder="Search projects by name, address, or BBL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-[#9CB2BC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78C7EA] focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sampleProjects.map((project) => (
          <Link
            key={project.id}
            href={`/dashboard/projects/${project.id}`}
            className="bg-white rounded-xl p-6 border border-[#9CB2BC]/20 hover:border-[#78C7EA] hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#78C7EA] transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-[#636363]">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{project.address}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">BBL:</span>
                    <span>{project.bbl}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'active'
                      ? 'bg-[#78C7EA]/10 text-[#78C7EA]'
                      : 'bg-[#9CB2BC]/10 text-[#636363]'
                  }`}
                >
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
                <div className="flex items-center space-x-1 text-xs text-[#636363]">
                  <Calendar className="h-3 w-3" />
                  <span>{project.lastUpdated}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#636363]">Progress</span>
                <span className="font-medium text-[#111111]">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-[#DEEDF4] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#78C7EA] rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
