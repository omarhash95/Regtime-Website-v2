"use client";

import { Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const sampleMilestones = [
  {
    id: 1,
    title: 'Initial Site Assessment',
    status: 'completed',
    dueDate: '2025-09-15',
    project: 'Brooklyn Heights Development',
  },
  {
    id: 2,
    title: 'Zoning Compliance Review',
    status: 'in-progress',
    dueDate: '2025-10-20',
    project: 'Brooklyn Heights Development',
  },
  {
    id: 3,
    title: 'DOB Permit Application',
    status: 'pending',
    dueDate: '2025-11-01',
    project: 'Manhattan Commercial Conversion',
  },
  {
    id: 4,
    title: 'Environmental Assessment',
    status: 'pending',
    dueDate: '2025-11-15',
    project: 'Queens Residential Complex',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'in-progress':
      return <Clock className="h-5 w-5 text-[#78C7EA]" />;
    default:
      return <AlertCircle className="h-5 w-5 text-[#9CB2BC]" />;
  }
};

const getStatusBadge = (status: string) => {
  const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
  switch (status) {
    case 'completed':
      return `${baseClasses} bg-green-50 text-green-700`;
    case 'in-progress':
      return `${baseClasses} bg-[#78C7EA]/10 text-[#78C7EA]`;
    default:
      return `${baseClasses} bg-[#9CB2BC]/10 text-[#636363]`;
  }
};

export default function ProjectManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#111111]">Project Management</h2>
        <p className="text-[#636363] mt-1">Track milestones and timelines</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-[#9CB2BC]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#636363]">Completed</span>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-[#111111]">4</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#9CB2BC]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#636363]">In Progress</span>
            <Clock className="h-5 w-5 text-[#78C7EA]" />
          </div>
          <p className="text-3xl font-bold text-[#111111]">3</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#9CB2BC]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#636363]">Pending</span>
            <AlertCircle className="h-5 w-5 text-[#9CB2BC]" />
          </div>
          <p className="text-3xl font-bold text-[#111111]">5</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#9CB2BC]/20">
        <div className="p-6 border-b border-[#EBEBEB]">
          <h3 className="text-lg font-bold text-[#111111]">Upcoming Milestones</h3>
        </div>

        <div className="divide-y divide-[#EBEBEB]">
          {sampleMilestones.map((milestone) => (
            <div key={milestone.id} className="p-6 hover:bg-[#DEEDF4]/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {getStatusIcon(milestone.status)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#111111] mb-1">
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-[#636363] mb-2">{milestone.project}</p>
                    <div className="flex items-center space-x-4 text-xs text-[#636363]">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className={getStatusBadge(milestone.status)}>
                  {milestone.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
